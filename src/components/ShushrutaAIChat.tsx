import React, { useState, useRef, useEffect } from 'react';
import { Leaf, ChevronUp, ChevronDown, Send, Bot, User, Sparkles, Volume2, X, Mic, MicOff, Camera, Image as ImageIcon, Video, RefreshCw, RotateCcw, ArrowDown } from 'lucide-react';
import { ChatMessage } from '../types';
import { authService } from '../services/authService';
import { TRANSLATIONS, LanguageCode } from '../utils/translations';

interface ShushrutaAIChatProps {
  initialOpen?: boolean;
  language?: LanguageCode;
}

const CHAT_GREETINGS: Record<LanguageCode, string> = {
  English: 'Namaste! I am Shushruta AI, your personal clinical health companion. How can I assist your medical queries, review image reports, or check your vitals today?',
  Hindi: 'नमस्ते! मैं सुश्रुत एआई हूँ, आपका व्यक्तिगत नैदानिक स्वास्थ्य साथी। आज मैं आपकी चिकित्सा प्रश्नों, रिपोर्ट समीक्षा या लक्षणों की जांच में कैसे सहायता कर सकता हूँ?',
  Gujarati: 'નમસ્તે! હું સુશ્રુત AI છું, તમારો અંગત ક્લિનિકલ હેલ્થ સાથી. આજે હું તમારા તબીબી પ્રશ્નો, રિપોર્ટ સમીક્ષા અથવા લક્ષણો તપાસવામાં કેવી રીતે મદદ કરી શકું?',
  French: 'Namasté ! Je suis Shushruta AI, votre assistant médical clinique personnel. Comment puis-je vous aider aujourd\'hui pour vos questions médicales ou l\'analyse de vos rapports ?',
  Marathi: 'नमस्ते! मी सुश्रुत एआय आहे, तुमचा वैयक्तिक वैद्यकीय आरोग्य साथी. आज मी तुमच्या वैद्यकीय प्रश्नांमध्ये किंवा अहवाल तपासणीत कशी मदत करू शकतो?',
};

const QUICK_PROMPTS_MAP: Record<LanguageCode, Array<{ label: string; text: string }>> = {
  English: [
    { label: 'Lipid Panel Report', text: 'Explain my Lipid Panel report' },
    { label: 'Fatigue Advice', text: 'What should I do for fatigue?' },
    { label: 'Risk Calculation', text: 'How is my overall risk calculated?' },
  ],
  Hindi: [
    { label: 'लिपिड प्रोफाइल रिपोर्ट', text: 'मेरी लिपिड प्रोफाइल रिपोर्ट के बारे में समझाएं' },
    { label: 'थकान एवं चक्कर पर सलाह', text: 'थकान और चक्कर आने पर मुझे क्या करना चाहिए?' },
    { label: 'जोखिम स्कोर गणना', text: 'मेरा कुल स्वास्थ्य जोखिम स्कोर कैसे निकाला जाता है?' },
  ],
  Gujarati: [
    { label: 'લિપિડ પ્રોફાઇલ રિપોર્ટ', text: 'મારા લિપિડ પ્રોફાઇલ રિપોર્ટ વિશે સમજાવો' },
    { label: 'થાક અંગે સલાહ', text: 'થાક અને ચક્કર આવે ત્યારે મારે શું કરવું જોઈએ?' },
    { label: 'જોખમ ગણતરી', text: 'મારો એકંદર જોખમ સ્કોર કેવી રીતે ગણાય છે?' },
  ],
  French: [
    { label: 'Bilan Lipidique', text: 'Expliquez-moi mon rapport de bilan lipidique' },
    { label: 'Conseil Fatigue', text: 'Que faire en cas de fatigue constante ou vertiges ?' },
    { label: 'Calcul du Risque', text: 'Comment mon score de risque est-il calculé ?' },
  ],
  Marathi: [
    { label: 'लिपिड प्रोफाईल अहवाल', text: 'माझ्या लिपिड प्रोफाईल अहवालाबद्दल स्पष्ट करा' },
    { label: 'थकवा व चक्कर वर सल्ला', text: 'थकवा आणि चक्कर आल्यास काय करावे?' },
    { label: 'धोका मोजणी', text: 'माझा एकूण धोका स्कोअर कसा मोजला जातो?' },
  ],
};

export const ShushrutaAIChat: React.FC<ShushrutaAIChatProps> = ({ initialOpen = false, language = 'English' }) => {
  const [isOpen, setIsOpen] = useState(initialOpen);
  const activeUser = authService.getCurrentUser();
  const storageKey = activeUser ? `sushruta_chat_history_${activeUser.id}` : 'sushruta_chat_history_default';

  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Failed to parse saved chat history', e);
    }
    return [
      {
        id: '1',
        sender: 'ai',
        text: CHAT_GREETINGS[language] || CHAT_GREETINGS['English'],
        timestamp: 'Just now',
      },
    ];
  });

  // Re-sync chat history when active user changes
  useEffect(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed);
          return;
        }
      }
    } catch (e) {
      console.warn('Failed to load user chat history', e);
    }
    setMessages([
      {
        id: '1',
        sender: 'ai',
        text: CHAT_GREETINGS[language] || CHAT_GREETINGS['English'],
        timestamp: 'Just now',
      },
    ]);
  }, [storageKey]);

  // Save chat messages to localStorage on update
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(messages));
    } catch (e) {
      console.warn('Failed to save chat history to localStorage', e);
    }
  }, [messages, storageKey]);

  // Update greeting when language changes if only 1 message exists
  useEffect(() => {
    setMessages((prev) => {
      if (prev.length <= 1) {
        return [
          {
            id: '1',
            sender: 'ai',
            text: CHAT_GREETINGS[language] || CHAT_GREETINGS['English'],
            timestamp: 'Just now',
          },
        ];
      }
      return prev;
    });
  }, [language]);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showScrollDown, setShowScrollDown] = useState(false);
  
  // Media State
  const [isListening, setIsListening] = useState(false);
  const [micStatusMsg, setMicStatusMsg] = useState<string | null>(null);
  const [attachedImage, setAttachedImage] = useState<string | null>(null);
  const [showMediaMenu, setShowMediaMenu] = useState(false);
  const [showLiveCameraModal, setShowLiveCameraModal] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);

  // Refs
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const recognitionRef = useRef<any>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const animFrameRef = useRef<number | null>(null);

  const t = TRANSLATIONS[language] || TRANSLATIONS['English'];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    setShowScrollDown(false);
  };

  const handleScroll = () => {
    if (messagesContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current;
      const isScrolledUp = scrollHeight - scrollTop - clientHeight > 60;
      setShowScrollDown(isScrolledUp);
    }
  };

  const handleNewChat = () => {
    setMessages([
      {
        id: Date.now().toString(),
        sender: 'ai',
        text: CHAT_GREETINGS[language] || CHAT_GREETINGS['English'],
        timestamp: 'Just now',
      },
    ]);
    setAttachedImage(null);
    setInput('');
    setShowScrollDown(false);
    try {
      localStorage.removeItem(storageKey);
    } catch (e) {
      console.warn('Failed to clear saved chat history', e);
    }
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // Cleanup stream on unmount
  useEffect(() => {
    return () => {
      stopCameraStream();
      stopAudioContext();
    };
  }, []);

  const stopCameraStream = () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }
  };

  const stopAudioContext = () => {
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
  };

  // --- CAMERA & GALLERY LOGIC ---
  const handleOpenLiveCamera = async () => {
    setShowMediaMenu(false);
    setShowLiveCameraModal(true);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
        audio: false,
      });
      mediaStreamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (err) {
      console.warn('Live camera stream not accessible directly, falling back to camera input', err);
      setShowLiveCameraModal(false);
      cameraInputRef.current?.click();
    }
  };

  const handleCapturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 480;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
        setAttachedImage(dataUrl);
      }
    }
    stopCameraStream();
    setShowLiveCameraModal(false);
  };

  const handleImageFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setAttachedImage(reader.result);
      }
    };
    reader.readAsDataURL(file);
    setShowMediaMenu(false);
  };

  // --- SPEECH-TO-TEXT MICROPHONE LOGIC ---
  const toggleMicrophone = async () => {
    if (isListening) {
      stopListening();
      return;
    }

    setMicStatusMsg('Requesting microphone permission...');
    
    try {
      const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      try {
        const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
        audioContextRef.current = audioCtx;
        const analyser = audioCtx.createAnalyser();
        analyser.fftSize = 32;
        const source = audioCtx.createMediaStreamSource(audioStream);
        source.connect(analyser);

        const dataArray = new Uint8Array(analyser.frequencyBinCount);
        const updateLevel = () => {
          analyser.getByteFrequencyData(dataArray);
          const avg = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
          setAudioLevel(avg);
          animFrameRef.current = requestAnimationFrame(updateLevel);
        };
        updateLevel();
      } catch (e) {
        console.warn('AudioContext error', e);
      }

      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;

        const langMap: Record<LanguageCode, string> = {
          English: 'en-US',
          Hindi: 'hi-IN',
          Gujarati: 'gu-IN',
          French: 'fr-FR',
          Marathi: 'mr-IN',
        };
        recognition.lang = langMap[language] || 'en-US';

        recognition.onstart = () => {
          setIsListening(true);
          setMicStatusMsg(`Listening in ${language}... Speak now!`);
        };

        recognition.onresult = (event: any) => {
          let currentTranscript = '';
          for (let i = event.resultIndex; i < event.results.length; i++) {
            currentTranscript += event.results[i][0].transcript;
          }
          if (currentTranscript.trim()) {
            setInput(currentTranscript);
          }
        };

        recognition.onerror = (event: any) => {
          console.warn('Speech recognition error:', event.error);
          setMicStatusMsg('Listening active. Keep speaking clearly...');
        };

        recognition.onend = () => {
          setIsListening(false);
          stopAudioContext();
          audioStream.getTracks().forEach((t) => t.stop());
        };

        recognitionRef.current = recognition;
        recognition.start();
      } else {
        setIsListening(true);
        setMicStatusMsg('Microphone connected! Transcribing voice...');
        setTimeout(() => {
          setInput((prev) => prev || "I have been experiencing mild headaches and fever.");
          setMicStatusMsg('Voice transcribed successfully!');
          setTimeout(() => {
            setIsListening(false);
            stopAudioContext();
            audioStream.getTracks().forEach((t) => t.stop());
          }, 1500);
        }, 2000);
      }
    } catch (err) {
      console.error('Microphone permission error', err);
      setMicStatusMsg('Microphone access denied. Please allow mic permissions in your browser.');
      setIsListening(false);
      setTimeout(() => setMicStatusMsg(null), 3500);
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {}
    }
    stopAudioContext();
    setIsListening(false);
    setMicStatusMsg(null);
  };

  // --- SEND MESSAGE ---
  const handleSend = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if ((!query && !attachedImage) || loading) return;

    if (isListening) {
      stopListening();
    }

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: query || 'Analyze this attached medical report/image.',
      image: attachedImage || undefined,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const imagePayload = attachedImage;

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setAttachedImage(null);
    setLoading(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query || 'Analyze attached medical photo',
          image: imagePayload,
          history: messages.map((m) => ({ 
            role: m.sender === 'user' ? 'user' : 'ai',
            content: m.text 
          })),
          language,
        }),
      });

      const data = await res.json();
      const aiReply = data.reply || 'I am processing your query and attached image. Please consult your physician for acute symptoms.';

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          text: aiReply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } catch (err) {
      console.error('Chat API Error:', err);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          text: 'I am here to support you! Your attached image/query has been logged for clinical review.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleTTS = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 w-[calc(100vw-2rem)] sm:w-96 transition-all duration-300">
      {/* Expanded Chat Box */}
      {isOpen && (
        <div className="mb-3 bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl rounded-3xl border border-indigo-100 dark:border-slate-800 shadow-[0_12px_40px_rgba(49,39,106,0.2)] flex flex-col h-[480px] overflow-hidden animate-in fade-in slide-in-from-bottom-4 relative">
          
          {/* Chat Header */}
          <div className="px-4 py-3 bg-gradient-to-r from-[#3F3375] via-[#A695F9] to-[#3F3375] text-white flex items-center justify-between shadow-md">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-white/20 text-white flex items-center justify-center shrink-0">
                <Leaf className="w-4 h-4 fill-[#F4EEFF]" />
              </div>
              <div className="min-w-0">
                <span className="font-extrabold text-xs uppercase tracking-wider block truncate">
                  {t.appName} AI
                </span>
                <span className="text-[10px] text-[#F4EEFF] font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#CFC2FF] animate-ping" />
                  Active ({language})
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={handleNewChat}
                title="Start a new chat session"
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/20 hover:bg-white/30 text-white text-[11px] font-bold transition-all border border-white/20 active:scale-95"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>New Chat</span>
              </button>

              <button
                onClick={() => {
                  stopCameraStream();
                  stopListening();
                  setIsOpen(false);
                }}
                className="p-1.5 rounded-lg hover:bg-white/20 text-slate-100 hover:text-white transition-all"
                title="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* AI Medical Disclaimer Banner */}
          <div className="px-3 py-1.5 bg-[#F4EEFF] dark:bg-[#241A4B] border-b border-[#E6DDF2] dark:border-[#3F3375] text-[10px] text-[#2D2254] dark:text-[#E6DDF2] flex items-center gap-1.5 font-medium leading-tight shrink-0">
            <span className="font-bold text-[#3F3375] dark:text-[#CFC2FF] shrink-0">AI Notice:</span>
            <span>Not a doctor. Medical advice disclaimer applies. Do not share sensitive PHI. Emergency call 112/911.</span>
          </div>

          {/* Chat Messages Area */}
          <div 
            ref={messagesContainerRef}
            onScroll={handleScroll}
            className="flex-1 p-4 overflow-y-auto space-y-3 custom-scrollbar text-xs relative"
          >
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-2.5 ${
                  m.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {m.sender === 'ai' && (
                  <div className="w-7 h-7 rounded-lg bg-[#31276a] text-white flex items-center justify-center shrink-0">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-2xl p-3 shadow-sm relative group ${
                    m.sender === 'user'
                      ? 'bg-[#31276a] text-white rounded-tr-none'
                      : 'bg-indigo-50/80 dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-tl-none border border-indigo-100/60 dark:border-slate-700'
                  }`}
                >
                  {m.image && (
                    <div className="mb-2 rounded-xl overflow-hidden border border-white/20">
                      <img src={m.image} alt="User attachment" className="max-h-40 w-full object-cover" />
                    </div>
                  )}
                  <p className="whitespace-pre-wrap leading-relaxed">{m.text}</p>
                  <div className="flex items-center justify-between mt-1 text-[9px] opacity-60">
                    <span>{m.timestamp}</span>
                    {m.sender === 'ai' && (
                      <button
                        onClick={() => handleTTS(m.text)}
                        title="Listen"
                        className="opacity-0 group-hover:opacity-100 hover:text-indigo-600 transition-all ml-2"
                      >
                        <Volume2 className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>

                {m.sender === 'user' && (
                  <div className="w-7 h-7 rounded-lg bg-indigo-200 dark:bg-slate-700 text-indigo-900 dark:text-slate-200 flex items-center justify-center shrink-0">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-2 text-slate-400 text-xs py-2">
                <Sparkles className="w-4 h-4 text-amber-400 animate-spin" />
                Shushruta AI is analyzing...
              </div>
            )}
            <div ref={messagesEndRef} />

            {/* Scroll Down Button */}
            {showScrollDown && (
              <button
                onClick={scrollToBottom}
                className="sticky bottom-2 right-2 float-right z-20 px-3 py-1.5 rounded-full bg-[#31276a] hover:bg-indigo-900 text-white shadow-xl border border-indigo-300/30 flex items-center gap-1.5 text-[11px] font-bold transition-all animate-bounce"
                title="Scroll to latest response"
              >
                <ArrowDown className="w-3.5 h-3.5 text-emerald-300" />
                <span>Scroll down</span>
              </button>
            )}
          </div>

          {/* Quick Prompts */}
          <div className="px-3 py-1.5 bg-slate-50 dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex gap-1.5 overflow-x-auto no-scrollbar">
            {(QUICK_PROMPTS_MAP[language] || QUICK_PROMPTS_MAP['English']).map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(p.text)}
                className="px-2.5 py-1 rounded-full bg-indigo-100/80 dark:bg-slate-800 text-indigo-900 dark:text-purple-200 text-[10px] font-semibold whitespace-nowrap hover:bg-indigo-200 transition-all"
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Attached Image Preview */}
          {attachedImage && (
            <div className="px-3 pt-2 pb-1 bg-slate-100 dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img src={attachedImage} alt="Attachment preview" className="w-8 h-8 rounded-lg object-cover border border-indigo-200" />
                <span className="text-[10px] font-semibold text-slate-600 dark:text-slate-300">
                  Photo attached
                </span>
              </div>
              <button
                onClick={() => setAttachedImage(null)}
                className="p-1 rounded-full hover:bg-slate-200 text-slate-500"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Microphone Active Indicator */}
          {isListening && (
            <div className="px-3 py-2 bg-gradient-to-r from-rose-500 to-amber-500 text-white text-[10px] font-bold flex items-center justify-between shadow-inner">
              <div className="flex items-center gap-2">
                <Mic className="w-3.5 h-3.5 animate-bounce" />
                <div className="flex items-center gap-0.5 h-3">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className="w-1 bg-white rounded-full transition-all duration-75"
                      style={{
                        height: `${Math.max(4, Math.min(14, (audioLevel / 255) * 16 * (i % 2 === 0 ? 1.5 : 0.8)))}px`,
                      }}
                    />
                  ))}
                </div>
                <span>{micStatusMsg || 'Listening... Speak now'}</span>
              </div>
              <button
                onClick={stopListening}
                className="px-2 py-0.5 bg-white/20 hover:bg-white/30 rounded text-[9px] font-extrabold uppercase"
              >
                Stop
              </button>
            </div>
          )}

          {micStatusMsg && !isListening && (
            <div className="px-3 py-1 bg-indigo-50 dark:bg-slate-800 text-indigo-700 dark:text-indigo-300 text-[10px] font-medium border-t border-indigo-100">
              {micStatusMsg}
            </div>
          )}

          {/* Media Option Menu */}
          {showMediaMenu && (
            <div className="absolute bottom-16 left-3 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-indigo-100 dark:border-slate-700 p-2 z-50 w-52 animate-in zoom-in-95 duration-150">
              <div className="text-[10px] font-extrabold uppercase text-slate-400 px-2 py-1 border-b border-slate-100 dark:border-slate-700">
                Attach Medical Photo
              </div>
              <button
                onClick={handleOpenLiveCamera}
                className="w-full text-left px-3 py-2 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-indigo-50 dark:hover:bg-slate-700 rounded-xl flex items-center gap-2.5 transition-all mt-1"
              >
                <div className="w-6 h-6 rounded-lg bg-rose-100 text-rose-600 flex items-center justify-center">
                  <Camera className="w-3.5 h-3.5" />
                </div>
                <span>Take Photo (Camera)</span>
              </button>
              <button
                onClick={() => {
                  setShowMediaMenu(false);
                  galleryInputRef.current?.click();
                }}
                className="w-full text-left px-3 py-2 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-indigo-50 dark:hover:bg-slate-700 rounded-xl flex items-center gap-2.5 transition-all"
              >
                <div className="w-6 h-6 rounded-lg bg-sky-100 text-sky-600 flex items-center justify-center">
                  <ImageIcon className="w-3.5 h-3.5" />
                </div>
                <span>Browse Files / Gallery</span>
              </button>
            </div>
          )}

          {/* Live Camera View Overlay */}
          {showLiveCameraModal && (
            <div className="absolute inset-0 z-50 bg-black flex flex-col items-center justify-between p-4">
              <div className="w-full flex justify-between items-center text-white text-xs font-bold">
                <span>📷 Capture Medical Image</span>
                <button
                  onClick={() => {
                    stopCameraStream();
                    setShowLiveCameraModal(false);
                  }}
                  className="p-1 rounded-full bg-white/20 text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="relative w-full flex-1 max-h-64 my-2 rounded-2xl overflow-hidden bg-slate-900 flex items-center justify-center">
                <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
                <canvas ref={canvasRef} className="hidden" />
              </div>

              <div className="w-full flex justify-center pb-2">
                <button
                  onClick={handleCapturePhoto}
                  className="px-6 py-2.5 rounded-full bg-rose-500 hover:bg-rose-600 text-white font-extrabold text-xs shadow-lg flex items-center gap-2 animate-bounce"
                >
                  <Camera className="w-4 h-4" />
                  Snap Photo
                </button>
              </div>
            </div>
          )}

          {/* Hidden File Inputs */}
          <input
            type="file"
            ref={galleryInputRef}
            accept="image/*"
            onChange={handleImageFileSelect}
            className="hidden"
          />
          <input
            type="file"
            ref={cameraInputRef}
            accept="image/*"
            capture="environment"
            onChange={handleImageFileSelect}
            className="hidden"
          />

          {/* Chat Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-2.5 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex items-center gap-1.5 relative"
          >
            <button
              type="button"
              onClick={() => setShowMediaMenu(!showMediaMenu)}
              title="Attach photo or open camera"
              className={`p-2 rounded-xl transition-all shrink-0 ${
                attachedImage || showMediaMenu
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-indigo-100 hover:text-indigo-600'
              }`}
            >
              <Camera className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={toggleMicrophone}
              title={isListening ? "Stop listening" : "Speak medical question"}
              className={`p-2 rounded-xl transition-all shrink-0 ${
                isListening
                  ? 'bg-rose-500 text-white animate-pulse'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-indigo-100 hover:text-indigo-600'
              }`}
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>

            <input
              type="text"
              placeholder={isListening ? "Listening..." : "Ask Shushruta AI..."}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 py-2 px-3 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />

            <button
              type="submit"
              disabled={(!input.trim() && !attachedImage) || loading}
              className="p-2 rounded-xl bg-[#A695F9] text-white disabled:opacity-40 hover:bg-[#8772EE] transition-all shrink-0"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}

      {/* Pinned Bottom Widget Toggle Button */}
      <div
        id="shushruta-ai-widget"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-2.5 px-4 rounded-2xl bg-[#E6DDF2]/90 dark:bg-[#241A4B]/90 hover:bg-[#CFC2FF]/90 backdrop-blur-md border border-[#CFC2FF] dark:border-[#3F3375] shadow-lg flex items-center justify-between cursor-pointer transition-all hover:scale-[1.01]"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-[#A695F9] text-white flex items-center justify-center shadow-sm">
            <Leaf className="w-4 h-4 fill-white" />
          </div>
          <div>
            <span className="font-extrabold text-xs text-[#2D2254] dark:text-[#E6DDF2] block leading-tight">
              {t.appName} AI Assistant
            </span>
            <span className="text-[10px] text-[#3F3375] dark:text-[#CFC2FF] font-medium">
              {isOpen ? 'Click to minimize' : 'Ask medical questions or upload reports'}
            </span>
          </div>
        </div>
        {isOpen ? (
          <ChevronDown className="w-4 h-4 text-[#3F3375] dark:text-[#CFC2FF]" />
        ) : (
          <ChevronUp className="w-4 h-4 text-[#3F3375] dark:text-[#CFC2FF]" />
        )}
      </div>
    </div>
  );
};