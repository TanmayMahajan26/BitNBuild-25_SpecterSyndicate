from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
from transformers import BlipProcessor, BlipForConditionalGeneration
from dotenv import load_dotenv
import os
import google.generativeai as genai
import asyncio
from concurrent.futures import ThreadPoolExecutor

# Load environment variables
load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

# Initialize BLIP processor & model
processor = BlipProcessor.from_pretrained("Salesforce/blip-image-captioning-base")
blip_model = BlipForConditionalGeneration.from_pretrained("Salesforce/blip-image-captioning-base")

# Thread pool for blocking operations
executor = ThreadPoolExecutor(max_workers=2)

# Initialize FastAPI app
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health_check():
    return {"status": "Backend running with BLIP + Gemini!"}

# Run blocking BLIP in thread
def generate_description(image):
    inputs = processor(images=image, return_tensors="pt")
    output = blip_model.generate(**inputs)
    description = processor.decode(output[0], skip_special_tokens=True)
    return description

@app.post("/analyze-image")
async def analyze_image(file: UploadFile = File(...)):
    try:
        image = Image.open(file.file).convert("RGB")

        # Run BLIP in thread to avoid blocking async
        loop = asyncio.get_event_loop()
        description = await loop.run_in_executor(executor, generate_description, image)

        # Gemini generation
        model = genai.GenerativeModel("models/gemini-2.5-flash")
        prompt = f"""
        Analyze the image description and generate:
        1. Mood (happy, sad, neutral, etc.)
        2. 4 captions (witty, inspirational, casual, professional)
        3. Hashtags: high-reach and niche

        Return as JSON like:
        {{
            "mood": "",
            "captions": {{"witty":"", "inspirational":"", "casual":"", "professional":""}},
            "hashtags": {{"high_reach": [], "niche": []}}
        }}

        Description: {description}
        """
        response = model.generate_content(prompt)

        return {
            "description": description,
            "gemini_response": response.text
        }

    except Exception as e:
        return {"error": str(e)}
import uvicorn

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port)
