import React, { useState, useCallback, useRef } from 'react';
import { Camera, Upload, Zap, Hash, Copy, Check, Sparkles, Brain, Heart, MessageCircle, Briefcase, TrendingUp, Target } from 'lucide-react';

const ImageAnalyzer = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [copiedItems, setCopiedItems] = useState(new Set());
  const fileInputRef = useRef(null);

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFileSelect = (file) => {
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target.result);
      reader.readAsDataURL(file);
      setResults(null);
    }
  };

  const analyzeImage = async () => {
    if (!selectedFile) return;
    
    setLoading(true);
    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await fetch('http://localhost:8000/analyze-image', {
        method: 'POST',
        body: formData,
      });
      
      const data = await response.json();
      
      if (data.gemini_response) {
        try {
          // Clean up the response to extract JSON
          const jsonMatch = data.gemini_response.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            const parsedResponse = JSON.parse(jsonMatch[0]);
            setResults({
              description: data.description,
              analysis: parsedResponse
            });
          } else {
            throw new Error('No JSON found in response');
          }
        } catch (parseError) {
          // Fallback if JSON parsing fails
          setResults({
            description: data.description,
            analysis: {
              mood: "neutral",
              captions: {
                witty: "AI couldn't parse the mood, but this image is worth a thousand words!",
                inspirational: "Every image tells a story worth sharing.",
                casual: "Just dropped this pic - what do you think?",
                professional: "Sharing insights through visual storytelling."
              },
              hashtags: {
                high_reach: ["#photography", "#visual", "#ai", "#tech"],
                niche: ["#imageanalysis", "#aitools", "#hackathon"]
              }
            },
            rawResponse: data.gemini_response
          });
        }
      }
    } catch (error) {
      console.error('Analysis failed:', error);
      setResults({
        error: 'Analysis failed. Please try again.',
        description: 'Error occurred during processing'
      });
    }
    
    setLoading(false);
  };

  const copyToClipboard = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedItems(prev => new Set([...prev, key]));
    setTimeout(() => {
      setCopiedItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(key);
        return newSet;
      });
    }, 2000);
  };

  const moodEmojis = {
    happy: "😊",
    sad: "😢",
    neutral: "😐",
    excited: "🤩",
    calm: "😌",
    energetic: "⚡",
    mysterious: "🤔",
    romantic: "💕",
    professional: "💼",
    creative: "🎨"
  };

  const getMoodEmoji = (mood) => {
    return moodEmojis[mood?.toLowerCase()] || "🤖";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4 p-3 rounded-full bg-white/10 backdrop-blur-sm">
            <Brain className="w-8 h-8 text-purple-400" />
            <Sparkles className="w-6 h-6 text-yellow-400 animate-pulse" />
          </div>
          <h1 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
            Social Spark
          </h1>
          <p className="text-xl text-purple-200 max-w-2xl mx-auto">
            Your own Content Assistant
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Upload Section */}
            <div className="space-y-6">
              <div 
                className={`relative border-2 border-dashed rounded-2xl p-8 transition-all duration-300 backdrop-blur-sm ${
                  dragActive 
                    ? 'border-purple-400 bg-purple-500/20 scale-105' 
                    : 'border-purple-300/50 bg-white/10 hover:bg-white/15'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileSelect(e.target.files[0])}
                  className="hidden"
                />
                
                {preview ? (
                  <div className="text-center space-y-4">
                    <img 
                      src={preview} 
                      alt="Preview" 
                      className="max-w-full h-64 object-cover rounded-xl mx-auto shadow-2xl"
                    />
                    <div className="flex gap-3 justify-center">
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors flex items-center gap-2"
                      >
                        <Upload className="w-4 h-4" />
                        Change Image
                      </button>
                      <button
                        onClick={analyzeImage}
                        disabled={loading}
                        className="px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:scale-100 flex items-center gap-2"
                      >
                        {loading ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            Analyzing...
                          </>
                        ) : (
                          <>
                            <Zap className="w-4 h-4" />
                            Analyze Image
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div 
                    className="text-center cursor-pointer"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                      <Camera className="w-12 h-12 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      Upload Your Image
                    </h3>
                    <p className="text-purple-200 mb-4">
                      Drag and drop or click to select an image
                    </p>
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors">
                      <Upload className="w-4 h-4" />
                      Choose File
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Results Section */}
            <div className="space-y-6">
              {results && !results.error ? (
                <div className="space-y-6 animate-in slide-in-from-right duration-500">
                  {/* Description */}
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                    <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                      <Brain className="w-5 h-5 text-purple-400" />
                      AI Description
                    </h3>
                    <p className="text-purple-100 leading-relaxed">{results.description}</p>
                  </div>

                  {/* Mood Analysis */}
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                    <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                      <Heart className="w-5 h-5 text-pink-400" />
                      Mood Analysis
                    </h3>
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{getMoodEmoji(results.analysis?.mood)}</span>
                      <span className="text-xl font-medium text-white capitalize">
                        {results.analysis?.mood || 'Unknown'}
                      </span>
                    </div>
                  </div>

                  {/* Captions */}
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                      <MessageCircle className="w-5 h-5 text-blue-400" />
                      Generated Captions
                    </h3>
                    <div className="grid gap-3">
                      {Object.entries(results.analysis?.captions || {}).map(([type, caption]) => {
                        const icons = {
                          witty: Sparkles,
                          inspirational: Heart,
                          casual: MessageCircle,
                          professional: Briefcase
                        };
                        const Icon = icons[type] || MessageCircle;
                        const copyKey = `caption-${type}`;
                        
                        return (
                          <div key={type} className="bg-white/5 rounded-lg p-3">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <Icon className="w-4 h-4 text-purple-400" />
                                <span className="text-sm font-medium text-purple-300 capitalize">{type}</span>
                              </div>
                              <button
                                onClick={() => copyToClipboard(caption, copyKey)}
                                className="p-1 hover:bg-white/10 rounded transition-colors"
                              >
                                {copiedItems.has(copyKey) ? (
                                  <Check className="w-4 h-4 text-green-400" />
                                ) : (
                                  <Copy className="w-4 h-4 text-purple-400" />
                                )}
                              </button>
                            </div>
                            <p className="text-purple-100 text-sm leading-relaxed">{caption}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Hashtags */}
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                      <Hash className="w-5 h-5 text-green-400" />
                      Optimized Hashtags
                    </h3>
                    <div className="space-y-4">
                      {/* High Reach */}
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <TrendingUp className="w-4 h-4 text-orange-400" />
                          <span className="text-sm font-medium text-orange-300">High Reach</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {(results.analysis?.hashtags?.high_reach || []).map((tag, index) => (
                            <button
                              key={index}
                              onClick={() => copyToClipboard(tag, `high-${index}`)}
                              className="px-3 py-1 bg-orange-500/20 text-orange-300 rounded-full text-sm hover:bg-orange-500/30 transition-colors flex items-center gap-1"
                            >
                              {tag}
                              {copiedItems.has(`high-${index}`) ? (
                                <Check className="w-3 h-3" />
                              ) : (
                                <Copy className="w-3 h-3" />
                              )}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Niche */}
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Target className="w-4 h-4 text-blue-400" />
                          <span className="text-sm font-medium text-blue-300">Niche</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {(results.analysis?.hashtags?.niche || []).map((tag, index) => (
                            <button
                              key={index}
                              onClick={() => copyToClipboard(tag, `niche-${index}`)}
                              className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm hover:bg-blue-500/30 transition-colors flex items-center gap-1"
                            >
                              {tag}
                              {copiedItems.has(`niche-${index}`) ? (
                                <Check className="w-3 h-3" />
                              ) : (
                                <Copy className="w-3 h-3" />
                              )}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : results?.error ? (
                <div className="bg-red-500/10 backdrop-blur-sm rounded-2xl p-6 border border-red-500/20">
                  <p className="text-red-400">{results.error}</p>
                </div>
              ) : (
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-purple-500/20 rounded-full flex items-center justify-center">
                    <Brain className="w-8 h-8 text-purple-400" />
                  </div>
                  <p className="text-purple-200">Upload an image to see AI analysis results</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageAnalyzer;