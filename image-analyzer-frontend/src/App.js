import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Camera, Upload, Zap, Hash, Copy, Check, Sparkles, Brain, Heart, MessageCircle, Briefcase, TrendingUp, Target, User, Lock, Mail, ArrowRight, Eye, EyeOff, LogOut, Image as ImageIcon, Palette, Wand2, Stars } from 'lucide-react';

const LoginPage = ({ onLogin }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onLogin(formData.name || formData.email.split('@')[0]);
    }, 1500);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-black">
      {/* Animated gradient background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-600 via-purple-800 to-indigo-900 opacity-50"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-pink-500 via-transparent to-cyan-500 opacity-30 animate-pulse"></div>
      </div>

      {/* Floating orbs */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500 rounded-full filter blur-[120px] opacity-30 animate-float"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-pink-500 rounded-full filter blur-[120px] opacity-30 animate-float-delayed"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500 rounded-full filter blur-[150px] opacity-20 animate-pulse"></div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIwLjUiIG9wYWNpdHk9IjAuMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-50"></div>

      <div className="relative z-10 flex min-h-screen items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="mb-8 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-500 to-pink-500 shadow-2xl shadow-purple-500/25 mb-4 animate-bounce-slow">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-black text-white mb-2">Social Spark</h1>
            <p className="text-purple-200">Ignite Your Content Creation</p>
          </div>

          {/* Form Container */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl blur-xl opacity-50"></div>
            <div className="relative bg-black/40 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-6">
                {isSignUp ? 'Create Account' : 'Welcome Back'}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-5">
                {isSignUp && (
                  <div className="relative group">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400 transition-colors group-focus-within:text-purple-300" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-500 focus:bg-white/10 transition-all duration-300"
                      required={isSignUp}
                    />
                  </div>
                )}

                <div className="relative group">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400 transition-colors group-focus-within:text-purple-300" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email address"
                    className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-500 focus:bg-white/10 transition-all duration-300"
                    required
                  />
                </div>

                <div className="relative group">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400 transition-colors group-focus-within:text-purple-300" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    className="w-full pl-11 pr-12 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-500 focus:bg-white/10 transition-all duration-300"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/25 transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:hover:transform-none"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Processing...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      {isSignUp ? 'Sign Up' : 'Sign In'}
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  )}
                </button>
              </form>

              <div className="mt-6 text-center">
                <button
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="text-purple-300 hover:text-white transition-colors"
                >
                  {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          33% { transform: translateY(-20px) rotate(120deg); }
          66% { transform: translateY(10px) rotate(240deg); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          33% { transform: translateY(20px) rotate(-120deg); }
          66% { transform: translateY(-10px) rotate(-240deg); }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 20s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 25s ease-in-out infinite;
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

const ImageAnalyzer = ({ userName, onLogout }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [copiedItems, setCopiedItems] = useState(new Set());
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const fileInputRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

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
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Dynamic background */}
      <div className="fixed inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"></div>
        
        {/* Animated mesh gradient */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500 rounded-full filter blur-[128px] animate-blob"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-pink-500 rounded-full filter blur-[128px] animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-blue-500 rounded-full filter blur-[128px] animate-blob animation-delay-4000"></div>
        </div>

        {/* Cursor follower */}
        <div 
          className="pointer-events-none fixed w-64 h-64 bg-purple-500 rounded-full filter blur-[100px] opacity-20 transition-transform duration-1000 ease-out"
          style={{
            transform: `translate(${mousePosition.x - 128}px, ${mousePosition.y - 128}px)`
          }}
        />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="bg-black/20 backdrop-blur-xl border-b border-white/5">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/20">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Social Spark
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-purple-200">Hey, {userName}! 👋</span>
              <button
                onClick={onLogout}
                className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-purple-200 hover:text-white transition-all duration-300 flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6">
              <Stars className="w-5 h-5 text-purple-400 animate-pulse" />
              <span className="text-purple-300 text-sm font-medium">AI-Powered Content Creation</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-white mb-4 leading-tight">
              Transform Your
              <span className="block bg-gradient-to-r from-violet-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient">
                Visual Stories
              </span>
            </h2>
            <p className="text-xl text-purple-200/80 max-w-2xl mx-auto">
              Upload any image and watch as AI crafts perfect captions, hashtags, and mood analysis in seconds
            </p>
          </div>

          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Upload Section */}
              <div className="space-y-6">
                <div 
                  className={`relative rounded-3xl overflow-hidden transition-all duration-500 ${
                    dragActive 
                      ? 'scale-105 rotate-1' 
                      : 'hover:scale-[1.02]'
                  }`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-sm"></div>
                  <div className="absolute inset-0 bg-black/30"></div>
                  <div 
                    className="relative border-2 border-dashed border-purple-400/30 rounded-3xl p-8"
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
                      <div className="space-y-6">
                        <div className="relative group">
                          <img 
                            src={preview} 
                            alt="Preview" 
                            className="w-full h-80 object-cover rounded-2xl shadow-2xl"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                        <div className="flex gap-3 justify-center">
                          <button
                            onClick={() => fileInputRef.current?.click()}
                            className="px-5 py-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white rounded-xl transition-all duration-300 flex items-center gap-2 border border-white/10"
                          >
                            <ImageIcon className="w-4 h-4" />
                            Change
                          </button>
                          <button
                            onClick={analyzeImage}
                            disabled={loading}
                            className="px-8 py-2.5 bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-700 hover:to-pink-700 text-white rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:scale-100 flex items-center gap-2 shadow-lg shadow-purple-500/25"
                          >
                            {loading ? (
                              <>
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                Analyzing Magic...
                              </>
                            ) : (
                              <>
                                <Wand2 className="w-4 h-4" />
                                Generate Content
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div 
                        className="text-center py-12 cursor-pointer group"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <div className="w-32 h-32 mx-auto mb-6 relative">
                          <div className="absolute inset-0 bg-gradient-to-br from-violet-500 to-pink-500 rounded-3xl rotate-6 group-hover:rotate-12 transition-transform duration-300"></div>
                          <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl flex items-center justify-center">
                            <Camera className="w-16 h-16 text-white" />
                          </div>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">
                          Drop Your Masterpiece
                        </h3>
                        <p className="text-purple-200/70 mb-6">
                          Drag & drop or click to select
                        </p>
                        <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300">
                          <Upload className="w-5 h-5" />
                          Browse Files
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Features */}
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { icon: Palette, title: "Smart Analysis", color: "from-purple-500 to-violet-500" },
                    { icon: MessageCircle, title: "4 Captions", color: "from-pink-500 to-rose-500" },
                    { icon: Hash, title: "Viral Tags", color: "from-blue-500 to-cyan-500" }
                  ].map((feature, index) => (
                    <div 
                      key={index}
                      className="relative group"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br opacity-20 group-hover:opacity-30 rounded-2xl transition-opacity duration-300"
                        style={{ backgroundImage: `linear-gradient(to bottom right, var(--tw-gradient-stops))` }}
                      ></div>
                      <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10 text-center">
                        <div className={`w-10 h-10 mx-auto mb-2 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center`}>
                          <feature.icon className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-sm text-purple-200">{feature.title}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Results Section */}
              <div className="space-y-6">
                {results && !results.error ? (
                  <div className="space-y-6 animate-in slide-in-from-right duration-700">
                    {/* Description */}
                    <div className="group relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-pink-600/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                      <div className="relative bg-black/40 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                        <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                          <Brain className="w-5 h-5 text-purple-400" />
                          AI Vision
                        </h3>
                        <p className="text-purple-100/90 leading-relaxed">{results.description}</p>
                      </div>
                    </div>

                    {/* Mood */}
                    <div className="group relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-pink-600/10 to-purple-600/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                      <div className="relative bg-black/40 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                        <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                          <Heart className="w-5 h-5 text-pink-400" />
                          Vibe Check
                        </h3>
                        <div className="flex items-center gap-4">
                          <span className="text-4xl animate-bounce-slow">{getMoodEmoji(results.analysis?.mood)}</span>
                          <div>
                            <span className="text-2xl font-bold text-white capitalize">
                              {results.analysis?.mood || 'Unknown'}
                            </span>
                            <p className="text-purple-300/70 text-sm">Current mood detected</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Captions */}
                    <div className="group relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-600/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                      <div className="relative bg-black/40 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                          <MessageCircle className="w-5 h-5 text-blue-400" />
                          Caption Magic
                        </h3>
                        <div className="space-y-3">
                          {Object.entries(results.analysis?.captions || {}).map(([type, caption]) => {
                            const styles = {
                              witty: { icon: Sparkles, gradient: "from-yellow-400 to-orange-400" },
                              inspirational: { icon: Heart, gradient: "from-pink-400 to-red-400" },
                              casual: { icon: MessageCircle, gradient: "from-blue-400 to-cyan-400" },
                              professional: { icon: Briefcase, gradient: "from-purple-400 to-indigo-400" }
                            };
                            const style = styles[type] || styles.casual;
                            const Icon = style.icon;
                            const copyKey = `caption-${type}`;
                            
                            return (
                              <div key={type} className="group/item relative">
                                <div className="absolute inset-0 bg-gradient-to-r opacity-5 group-hover/item:opacity-10 rounded-xl transition-opacity duration-300"
                                  style={{ backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))` }}
                                ></div>
                                <div className="relative bg-white/5 rounded-xl p-4 border border-white/5 hover:border-white/10 transition-all duration-300">
                                  <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                      <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${style.gradient} flex items-center justify-center`}>
                                        <Icon className="w-4 h-4 text-white" />
                                      </div>
                                      <span className="text-sm font-medium text-purple-300 capitalize">{type}</span>
                                    </div>
                                    <button
                                      onClick={() => copyToClipboard(caption, copyKey)}
                                      className="p-2 hover:bg-white/10 rounded-lg transition-all duration-300"
                                    >
                                      {copiedItems.has(copyKey) ? (
                                        <Check className="w-4 h-4 text-green-400" />
                                      ) : (
                                        <Copy className="w-4 h-4 text-purple-400" />
                                      )}
                                    </button>
                                  </div>
                                  <p className="text-purple-100/80 text-sm leading-relaxed">{caption}</p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Hashtags */}
                    <div className="group relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-green-600/10 to-purple-600/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                      <div className="relative bg-black/40 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                          <Hash className="w-5 h-5 text-green-400" />
                          Hashtag Strategy
                        </h3>
                        <div className="space-y-4">
                          {/* High Reach */}
                          <div>
                            <div className="flex items-center gap-2 mb-3">
                              <TrendingUp className="w-4 h-4 text-orange-400" />
                              <span className="text-sm font-medium text-orange-300">Trending Now</span>
                              <span className="px-2 py-0.5 bg-orange-500/20 text-orange-300 text-xs rounded-full">High Reach</span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {(results.analysis?.hashtags?.high_reach || []).map((tag, index) => (
                                <button
                                  key={index}
                                  onClick={() => copyToClipboard(tag, `high-${index}`)}
                                  className="group/tag px-3 py-1.5 bg-gradient-to-r from-orange-500/10 to-yellow-500/10 hover:from-orange-500/20 hover:to-yellow-500/20 text-orange-300 rounded-full text-sm transition-all duration-300 flex items-center gap-1.5 border border-orange-500/20"
                                >
                                  <span>{tag}</span>
                                  {copiedItems.has(`high-${index}`) ? (
                                    <Check className="w-3 h-3 opacity-0 group-hover/tag:opacity-100 transition-opacity" />
                                  ) : (
                                    <Copy className="w-3 h-3 opacity-0 group-hover/tag:opacity-100 transition-opacity" />
                                  )}
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Niche */}
                          <div>
                            <div className="flex items-center gap-2 mb-3">
                              <Target className="w-4 h-4 text-blue-400" />
                              <span className="text-sm font-medium text-blue-300">Niche Focus</span>
                              <span className="px-2 py-0.5 bg-blue-500/20 text-blue-300 text-xs rounded-full">Targeted</span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {(results.analysis?.hashtags?.niche || []).map((tag, index) => (
                                <button
                                  key={index}
                                  onClick={() => copyToClipboard(tag, `niche-${index}`)}
                                  className="group/tag px-3 py-1.5 bg-gradient-to-r from-blue-500/10 to-purple-500/10 hover:from-blue-500/20 hover:to-purple-500/20 text-blue-300 rounded-full text-sm transition-all duration-300 flex items-center gap-1.5 border border-blue-500/20"
                                >
                                  <span>{tag}</span>
                                  {copiedItems.has(`niche-${index}`) ? (
                                    <Check className="w-3 h-3 opacity-0 group-hover/tag:opacity-100 transition-opacity" />
                                  ) : (
                                    <Copy className="w-3 h-3 opacity-0 group-hover/tag:opacity-100 transition-opacity" />
                                  )}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : results?.error ? (
                  <div className="relative">
                    <div className="absolute inset-0 bg-red-500/20 rounded-2xl blur-xl"></div>
                    <div className="relative bg-black/40 backdrop-blur-xl rounded-2xl p-6 border border-red-500/20">
                      <p className="text-red-400">{results.error}</p>
                    </div>
                  </div>
                ) : (
                  <div className="relative">
                    <div className="absolute inset-0 bg-purple-600/10 rounded-2xl blur-xl animate-pulse"></div>
                    <div className="relative bg-black/40 backdrop-blur-xl rounded-2xl p-12 border border-white/10 text-center">
                      <div className="w-24 h-24 mx-auto mb-6 relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl rotate-6 animate-pulse"></div>
                        <div className="absolute inset-0 bg-gradient-to-br from-violet-600 to-purple-600 rounded-2xl flex items-center justify-center">
                          <Wand2 className="w-12 h-12 text-white" />
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">Ready to Create Magic?</h3>
                      <p className="text-purple-200/70">Upload an image to generate AI-powered content</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-blob {
          animation: blob 20s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  );
};

// Main App Component
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

  const handleLogin = (name) => {
    setUserName(name);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName('');
  };

  return isLoggedIn ? (
    <ImageAnalyzer userName={userName} onLogout={handleLogout} />
  ) : (
    <LoginPage onLogin={handleLogin} />
  );
};

export default App;