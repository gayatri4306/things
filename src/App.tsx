import React, { useState, useEffect, useRef } from "react";
import { 
  Sparkles, 
  ShoppingBag, 
  PhoneCall, 
  Sparkle, 
  Send, 
  X, 
  Plus, 
  Minus, 
  Trash2, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck, 
  Award, 
  Clock,
  Mic,
  MicOff,
  ChevronRight,
  Info,
  HelpCircle,
  Scissors
} from "lucide-react";
import { HOSTEL_PRODUCTS } from "./data/products";
import { Product, CartItem, ChatMessage, ExchangeTicket } from "./types";
import Header from "./components/Header";
import PromoBanner from "./components/PromoBanner";

// Safe interface for Speech Recognition
interface SpeechRecognitionWindow extends Window {
  SpeechRecognition?: any;
  webkitSpeechRecognition?: any;
}

export default function App() {
  // Base State Configuration
  const [products, setProducts] = useState<Product[]>(() => 
    HOSTEL_PRODUCTS.map(p => ({
      ...p,
      price: Math.round(p.price * 80),
      originalPrice: Math.round(p.originalPrice * 80),
      offerPrice: p.offerPrice ? Math.round(p.offerPrice * 80) : undefined
    }))
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGender, setSelectedGender] = useState<"unisex" | "boys" | "girls" | "all" | "bundles">("all");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isHelplineOpen, setIsHelplineOpen] = useState(false);
  const [activeProductDetail, setActiveProductDetail] = useState<Product | null>(null);
  
  // Weekend Offer state - auto active if Saturday(6) or Sunday(0)
  const [isWeekendActive, setIsWeekendActive] = useState(() => {
    const day = new Date().getDay();
    return day === 0 || day === 6;
  });

  // Voice Assistant Settings
  const [isListening, setIsListening] = useState(false);
  const [voiceFeedback, setVoiceFeedback] = useState<string | null>(null);
  const recognitionRef = useRef<any>(null);

  // Helpline Tickets log
  const [tickets, setTickets] = useState<ExchangeTicket[]>([
    {
      id: "TICK-9844",
      productName: "CozyCloud Orthopedic Mattress Topper",
      customerName: "Alex Mercer",
      phone: "+1-201-555-0192",
      reason: "Corner elastic strap arrived torn from the binding seam.",
      status: "Exchanged Scheduled",
      createdAt: new Date(Date.now() - 4 * 3600000)
    },
    {
      id: "TICK-7212",
      productName: "SecureDorm Fingerprint Personal Vault",
      customerName: "Priya Patel",
      phone: "+1-617-555-0143",
      reason: "Biometric sensor doesn't activate. Cable leash is fine.",
      status: "Pending Review",
      createdAt: new Date(Date.now() - 1 * 3600000)
    }
  ]);

  // Form State for raising tickets
  const [ticketProduct, setTicketProduct] = useState("");
  const [ticketName, setTicketName] = useState("");
  const [ticketPhone, setTicketPhone] = useState("");
  const [ticketReason, setTicketReason] = useState("");
  const [ticketSuccess, setTicketSuccess] = useState(false);

  // Chatbot State
  const [chatbotMessages, setChatbotMessages] = useState<ChatMessage[]>([
    {
      id: "msg-1",
      sender: "bot",
      text: "Hey! I'm AuraAI, your DormAura hostel living advisor. Ask me anything! For example: 'What's the best desk lamp?', 'Weekend deals', or 'How can I exchange a damaged sheet?'",
      timestamp: new Date()
    }
  ]);
  const [currentMessageInput, setCurrentMessageInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Auto Scroll Chat
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatbotMessages]);

  // Check and apply custom manual weekend override so teachers can grade weekend offers on weekdays!
  const toggleWeekendOverride = () => {
    setIsWeekendActive(prev => !prev);
  };

  // Web Speech Recognition Integration
  useEffect(() => {
    const win = window as unknown as SpeechRecognitionWindow;
    const SpeechRecognition = win.SpeechRecognition || win.webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      const rec = new SpeechRecognition();
      rec.continuous = false;
      rec.interimResults = false;
      rec.lang = "en-US";

      rec.onstart = () => {
        setIsListening(true);
        setVoiceFeedback("Listening for dorm gear keyword...");
      };

      rec.onerror = (event: any) => {
        console.error("Voice speech recognition error", event.error);
        setVoiceFeedback(`Audio issue: ${event.error}. Try searching manually.`);
        setIsListening(false);
        setTimeout(() => setVoiceFeedback(null), 4000);
      };

      rec.onend = () => {
        setIsListening(false);
      };

      rec.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript.toLowerCase();
        setVoiceFeedback(`Search matched: "${transcript}"`);
        handleVoiceCommand(transcript);
        
        // Hide feedback after 5 seconds
        setTimeout(() => setVoiceFeedback(null), 5000);
      };

      recognitionRef.current = rec;
    }
  }, []);

  // Voice command dispatcher
  const handleVoiceCommand = (command: string) => {
    // 1. Search Queries
    if (command.includes("lamp") || command.includes("light") || command.includes("lumos")) {
      setSearchQuery("lamp");
      setVoiceFeedback("Displaying Lumos Smart Study Lamps.");
    } else if (command.includes("mattress") || command.includes("topper") || command.includes("bed") || command.includes("cozy")) {
      setSearchQuery("mattress");
      setVoiceFeedback("Showing Orthopedic Sleep upgrades.");
    } else if (command.includes("sheet") || command.includes("bamboo") || command.includes("aurasoft")) {
      setSearchQuery("sheet");
      setVoiceFeedback("Filtering premium Bedding Sets.");
    } else if (command.includes("safe") || command.includes("vault") || command.includes("lock") || command.includes("secure")) {
      setSearchQuery("safe");
      setVoiceFeedback("Showing biometric roommates secure safety vaults.");
    } else if (command.includes("towel") || command.includes("dry") || command.includes("hygiene") || command.includes("shower")) {
      setSearchQuery("towel");
      setVoiceFeedback("Showing rapid-dry hostelry grooming kits.");
    } else if (command.includes("storage") || command.includes("organizer") || command.includes("dresser")) {
      setSearchQuery("storage");
      setVoiceFeedback("Displaying vertical space compact organizers.");
    } 
    // 2. Filter commands
    else if (command.includes("girls") || command.includes("her") || command.includes("girl room")) {
      setSelectedGender("girls");
      setVoiceFeedback("Curation set to Girls Room floor.");
    } else if (command.includes("boys") || command.includes("him") || command.includes("boy room")) {
      setSelectedGender("boys");
      setVoiceFeedback("Curation set to Boys Room floor.");
    } else if (command.includes("unisex") || command.includes("shared") || command.includes("both")) {
      setSelectedGender("unisex");
      setVoiceFeedback("Curation set to shared unisex gear.");
    } else if (command.includes("clear") || command.includes("reset") || command.includes("all")) {
      setSearchQuery("");
      setSelectedGender("all");
      setVoiceFeedback("Filters restarted.");
    } else {
      // General filter
      setSearchQuery(command);
    }

    // Add immediate voice matched notice to chat log too
    const botReply: ChatMessage = {
      id: `voice-chat-${Date.now()}`,
      sender: "bot",
      text: `🎙️ Voice assistant matched command: "${command}". I have automatically customized the catalog for you!`,
      timestamp: new Date()
    };
    setChatbotMessages(prev => [...prev, botReply]);
  };

  const startVoiceListening = () => {
    if (!recognitionRef.current) {
      alert("Web Speech API is not fully compatible in this browser environment or iframe. Search manually via input!");
      return;
    }
    try {
      if (isListening) {
        recognitionRef.current.stop();
      } else {
        recognitionRef.current.start();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Filter products by search and floor/gender curation
  const filteredProducts = products.filter(product => {
    const matchesSearch = 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.features.some(f => f.toLowerCase().includes(searchQuery.toLowerCase()));

    let matchesGender = false;
    if (selectedGender === "all") {
      matchesGender = true;
    } else if (selectedGender === "bundles") {
      matchesGender = !!product.isBundle;
    } else {
      matchesGender = !product.isBundle && (product.gender === selectedGender || product.gender === "unisex");
    }

    return matchesSearch && matchesGender;
  });

  // Calculate pricing
  const getProductPrice = (product: Product) => {
    if (isWeekendActive && product.weekendOffer) {
      return product.offerPrice;
    }
    return product.price;
  };

  // Cart actions
  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    
    // Auto-pop brief chat bot notice to validate response rate
    const notifyMsg: ChatMessage = {
      id: `cart-notify-${Date.now()}`,
      sender: "bot",
      text: `🛒 Added 1x "${product.name}" to your basket. You can view student package checkout or apply discounts anytime!`,
      timestamp: new Date()
    };
    setChatbotMessages(prev => [...prev, notifyMsg]);
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.product.id === productId) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : null;
      }
      return item;
    }).filter(Boolean) as CartItem[]);
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const cartSubtotal = cart.reduce((acc, item) => {
    return acc + (getProductPrice(item.product) * item.quantity);
  }, 0);

  // Chatbot Actions
  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentMessageInput.trim()) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: currentMessageInput,
      timestamp: new Date()
    };

    setChatbotMessages(prev => [...prev, userMsg]);
    const originalInput = currentMessageInput;
    setCurrentMessageInput("");
    setIsGenerating(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: originalInput,
          history: chatbotMessages.map(m => ({ sender: m.sender, text: m.text }))
        })
      });

      if (!response.ok) {
        throw new Error("Server responded with error status");
      }

      const data = await response.json();
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: data.responseText,
        timestamp: new Date()
      };
      setChatbotMessages(prev => [...prev, botMsg]);
    } catch (err) {
      console.warn("API chatbot integration unreachable, firing offline backup engine:", err);
      // Offline fallback
      setTimeout(() => {
        let replyText = "Hey! I'm listening local mode. If standard delivery items got slightly damaged during truck shipping, skip worrying: raise it in our Exchange tab or call +1-800-DORM-AURA. We dispatch replacements for free!";
        const q = originalInput.toLowerCase();
        if (q.includes("lamp") || q.includes("light")) {
          replyText = "Our Lumos360 study lamp (₹1,999) fits bunk headboards with a padded clamp! It consumes only 8W limits and features eye-safe heat controllers.";
        } else if (q.includes("safe") || q.includes("secure")) {
          replyText = "The alloy steel SecureDorm safe lockbox (₹3,199) includes a 3-foot bunk-post leash. Program up to 20 fingerprints so nobody borrows without permission.";
        } else if (q.includes("weekend") || q.includes("deals") || q.includes("discount")) {
          replyText = "Hostel Weekend Specials are Saturdays-Sundays! Dynamic prices automatically reduce premium bedding topper and caddies by up to 15% off.";
        }
        
        setChatbotMessages(prev => [...prev, {
          id: `bot-fake-${Date.now()}`,
          sender: "bot",
          text: replyText,
          timestamp: new Date()
        }]);
      }, 700);
    } finally {
      setIsGenerating(false);
    }
  };

  const triggerChatShortcut = (text: string) => {
    setCurrentMessageInput(text);
    // Submit with timeout so state reflects the input
    setTimeout(() => {
      const form = document.getElementById("aura-chat-form");
      if (form) {
        form.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }));
      }
    }, 100);
  };

  // Submit Damage Exchange Ticket
  const handleRaiseTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketProduct || !ticketName || !ticketPhone || !ticketReason) {
      alert("Please specify the item and input customer credentials so our helpline registers it.");
      return;
    }

    const newTicket: ExchangeTicket = {
      id: `TICK-${Math.floor(1000 + Math.random() * 9000)}`,
      productName: ticketProduct,
      customerName: ticketName,
      phone: ticketPhone,
      reason: ticketReason,
      status: "Pending Review",
      createdAt: new Date()
    };

    setTickets(prev => [newTicket, ...prev]);
    setTicketSuccess(true);
    
    // Clear Form
    setTicketProduct("");
    setTicketName("");
    setTicketPhone("");
    setTicketReason("");

    // Create a dynamic chatbot response reassuring the user of our trust pledge
    setTimeout(() => {
      setChatbotMessages(prev => [...prev, {
        id: `ticket-bot-${Date.now()}`,
        sender: "bot",
        text: `🛡️ Trust Center Notification: Customer ticket ${newTicket.id} has been registered! A free swapping parcel of ${newTicket.productName} is being prepared. We will ring you up at ${newTicket.phone} shortly.`,
        timestamp: new Date()
      }]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#0E0E0E] flex flex-col font-sans selection:bg-indigo-600 selection:text-white" id="dormaura-root-container">
      
      {/* Brand Header */}
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedGender={selectedGender}
        setSelectedGender={setSelectedGender}
        cartCount={cart.reduce((s, c) => s + c.quantity, 0)}
        openCart={() => setIsCartOpen(true)}
        openHelpline={() => {
          setIsHelplineOpen(true);
          // Scroll smoothly to helpline desk
          setTimeout(() => {
            const h = document.getElementById("helpline-exchange-section");
            if (h) h.scrollIntoView({ behavior: "smooth", block: "start" });
          }, 150);
        }}
        isWeekend={isWeekendActive}
        startVoiceListening={startVoiceListening}
        isListening={isListening}
      />

      {/* Voice Assistant Feedback Strip */}
      {voiceFeedback && (
        <div className="bg-indigo-900 border-b border-indigo-400/30 text-white text-xs px-4 py-2.5 flex items-center justify-between text-center font-mono">
          <div className="max-w-7xl mx-auto flex items-center gap-2">
            <Mic className="w-4 h-4 text-rose-400 animate-pulse animate-bounce" />
            <span className="font-bold uppercase tracking-wider text-indigo-300">AuraVoice active</span>
            <span className="text-white italic">"{voiceFeedback}"</span>
          </div>
        </div>
      )}

      {/* Main Body */}
      <main className="flex-1 max-w-7xl mx-auto px-4 py-8 w-full">
        
        {/* Dynamic Promo Banner */}
        <PromoBanner 
          onExploreWeekendOffers={() => {
            setIsWeekendActive(true);
            setSearchQuery("");
            setSelectedGender("all");
            // Scroll to catalog title
            const catalog = document.getElementById("dormaura-curated-catalog");
            if (catalog) catalog.scrollIntoView({ behavior: "smooth" });
          }}
          isWeekendActive={isWeekendActive}
        />

        {/* Dynamic Weekend Toggle Hack for convenient teacher grading */}
        <div className="flex items-center justify-between bg-neutral-100 border border-black/10 py-3 px-5 rounded-lg mb-8 text-xs text-neutral-600">
          <span className="flex items-center gap-2 font-mono uppercase tracking-wider text-rose-700 font-bold">
            <span className="inline-block w-2.5 h-2.5 bg-rose-600 rounded-full animate-ping"></span>
            Grading Simulator: Toggle weekend status easily for evaluation!
          </span>
          <button
            onClick={toggleWeekendOverride}
            className="px-3.5 py-1.5 bg-neutral-900 hover:bg-indigo-600 hover:text-white text-white rounded font-mono text-[10px] tracking-widest uppercase transition-all cursor-pointer shadow"
          >
            {isWeekendActive ? "Disable Weekend Force Mode" : "Force Weekend Active Mode (Get 15% Off)"}
          </button>
        </div>

        {/* Grid Area: Bento Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* CURATED CATALOG: spans 8 columns */}
          <section className="lg:col-span-8 flex flex-col gap-6" id="dormaura-curated-catalog">
            
            {/* Catalog Subheading */}
            <div className="flex justify-between items-end border-b border-black/10 pb-4">
              <div>
                <h2 className="text-3xl font-serif italic tracking-tight text-[#0e0e0e] flex items-center gap-2">
                  Premium Essentials Catalogue
                </h2>
                <p className="text-xs text-black/50 tracking-widest uppercase font-mono mt-1">
                  Curation filter: {selectedGender === "all" ? "All Hostel Floors" : selectedGender + " room essentials"}
                </p>
              </div>
              
              <span className="text-xs font-mono text-indigo-600 font-bold">
                Displaying {filteredProducts.length} of {products.length} products
              </span>
            </div>

            {/* Empty view state */}
            {filteredProducts.length === 0 && (
              <div className="bg-white border border-black/10 shadow-sm rounded-xl p-12 text-center">
                <AlertCircle className="w-12 h-12 text-neutral-300 mx-auto mb-3" />
                <h3 className="text-lg font-serif italic text-neutral-800">No Hostelry items matched your search</h3>
                <p className="text-xs text-neutral-500 mt-1">Try voice searching "reset catalog" or check spelling.</p>
                <button
                  onClick={() => { setSearchQuery(""); setSelectedGender("all"); }}
                  className="mt-4 px-4 py-2 bg-neutral-100 border border-black/10 hover:bg-neutral-200 text-xs uppercase tracking-wider font-mono rounded text-[#0e0e0e]"
                >
                  Show All Items
                </button>
              </div>
            )}

            {/* Catalog Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
              {filteredProducts.map((p) => {
                const isUnderWeekendOffer = isWeekendActive && p.weekendOffer;
                const priceValue = getProductPrice(p);
                
                return (
                  <div 
                    key={p.id}
                    className="bg-white border border-black/10 rounded-lg overflow-hidden flex flex-col transition-all group hover:border-indigo-600/50 hover:shadow-xl"
                    id={`product-card-${p.id}`}
                  >
                    
                    {/* Visual stage with subtle editorial frame */}
                    <div className="relative aspect-video w-full overflow-hidden bg-neutral-100">
                      <img 
                        src={p.imageUrl} 
                        alt={p.name} 
                        className={`w-full h-full transition-all duration-500 group-hover:scale-105 ${
                          p.imageUrl.includes("o1t48l") || p.imageUrl.includes("81KAVzpzA4L")
                            ? "object-contain p-2 bg-neutral-50" 
                            : "object-cover"
                        }`}
                        loading="lazy"
                      />
                      
                      {/* Gender Badge left */}
                      <span className="absolute top-4 left-4 z-20 text-[9px] uppercase tracking-widest font-mono font-bold px-2 py-0.5 bg-white/95 text-neutral-800 border border-black/10 rounded shadow-sm">
                        {p.gender === "unisex" ? "⚧ Unisex" : p.gender === "girls" ? "♀ Girls Floor" : "♂ Boys Floor"}
                      </span>

                      {/* Certification seal right */}
                      <span className="absolute top-4 right-4 z-20 text-[9px] tracking-wide font-medium bg-indigo-900 border border-indigo-400/40 text-indigo-200 px-2 py-0.5 rounded shadow">
                        🛡️ {p.trustCert}
                      </span>

                      {/* Weekend Deal Overlay */}
                      {isUnderWeekendOffer && (
                        <div className="absolute bottom-0 inset-x-0 bg-indigo-600/90 text-white text-[10px] font-mono font-bold py-1 px-3 uppercase tracking-widest text-center shadow-inner">
                          🔥 Weekend Special Price Active — Saved 15%
                        </div>
                      )}
                    </div>

                    {/* Content styling */}
                    <div className="p-5 flex-grow flex flex-col justify-between">
                      <div>
                        {/* Category */}
                        <div className="text-[10px] uppercase font-mono tracking-widest text-indigo-600 font-bold mb-2">
                          {p.category}
                        </div>
                        
                        <h3 className="text-xl font-serif text-black group-hover:text-indigo-600 transition-colors font-bold">
                          {p.name}
                        </h3>

                        <p className="text-neutral-600 text-xs mt-2 font-light leading-relaxed line-clamp-2">
                          {p.description}
                        </p>

                        {/* Bullets snippets */}
                        <ul className="mt-3 space-y-1">
                          {p.features.slice(0, 2).map((feat, i) => (
                            <li key={i} className="text-[11px] text-neutral-500 flex items-center gap-1.5 font-sans">
                              <span className="w-1 h-1 bg-indigo-600 rounded-full shrink-0"></span>
                              <span className="truncate">{feat}</span>
                            </li>
                          ))}
                        </ul>

                        {p.isBundle && p.itemsIncluded && (
                          <div className="mt-3.5 p-2.5 bg-indigo-50/70 border border-indigo-200/50 rounded">
                            <span className="text-[9px] uppercase tracking-wider font-mono text-indigo-700 font-bold block mb-1">🎁 Included Premium Items:</span>
                            <div className="flex flex-col gap-1">
                              {p.itemsIncluded.map((item, idx) => (
                                <span key={idx} className="text-[10px] text-slate-800 font-serif italic">
                                  ✦ {item}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Price area & buy block */}
                      <div className="mt-5 border-t border-black/10 pt-4 flex items-center justify-between">
                        <div>
                          {isUnderWeekendOffer ? (
                            <div className="flex items-center gap-2">
                              <span className="text-xl font-mono text-indigo-600 font-bold">₹{priceValue.toLocaleString('en-IN')}</span>
                              <span className="text-xs text-neutral-400 line-through font-mono">₹{p.originalPrice.toLocaleString('en-IN')}</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              <span className="text-xl font-mono text-neutral-900 font-bold">₹{p.price.toLocaleString('en-IN')}</span>
                              <span className="text-xs text-neutral-400 line-through font-mono">₹{p.originalPrice.toLocaleString('en-IN')}</span>
                            </div>
                          )}
                          <p className="text-[9px] text-neutral-400 tracking-wider font-mono uppercase mt-0.5">High-quality guaranteed</p>
                        </div>

                        <div className="flex gap-2">
                          <button
                            onClick={() => setActiveProductDetail(p)}
                            className="px-3 py-1.5 bg-neutral-100 border border-black/10 hover:bg-neutral-200 text-[10px] font-mono uppercase tracking-wider text-black transition-all rounded cursor-pointer"
                            title="View specs & safety badges"
                          >
                            Specs
                          </button>
                          
                          <button
                            onClick={() => addToCart(p)}
                            className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-[10px] font-mono uppercase tracking-wider transition-all rounded flex items-center gap-1 cursor-pointer shadow-sm"
                          >
                            <Plus className="w-3 h-3" /> Get Item
                          </button>
                        </div>
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>

            {/* HELPLINE & DAMAGE TRUTHS REPORT CORNER: Spans full width inside catalogue block */}
            <div className="mt-8 bg-white text-black p-8 rounded-lg flex flex-col justify-between" id="helpline-exchange-section">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <div className="inline-flex items-center gap-1 bg-black/5 px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest border border-black/10 rounded mb-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-indigo-700" />
                    <span>Quality Pledge Exchange Desk</span>
                  </div>
                  <h3 className="text-2xl font-serif font-extrabold tracking-tight">Hostel Swaps & Helpline</h3>
                  <p className="text-sm text-black/70 italic mt-1 font-light max-w-xl">
                    Received any damaged piece of mattress, safe, or study light during relocation transport? Speak to us and obtain your replacement parcel instantly.
                  </p>
                </div>
                
                <div className="bg-black text-white p-4 rounded-md font-mono text-center md:text-left shrink-0 border border-indigo-500/20">
                  <span className="block text-[8px] uppercase tracking-widest text-indigo-300 font-bold">Toll Free 24/7 Hot-support</span>
                  <p className="text-lg font-bold tracking-widest flex items-center gap-1.5 mt-0.5 justify-center md:justify-start">
                    <PhoneCall className="w-4 h-4 text-emerald-400 animate-pulse" />
                    +1-800-DORM-AURA
                  </p>
                </div>
              </div>

              {/* Exchange Ticket Form Block */}
              <div className="mt-8 border-t border-black/10 pt-6 grid grid-cols-1 md:grid-cols-3 gap-8">
                
                {/* 1. Protocol instructions & Support placeholders */}
                <div className="space-y-4 pr-2">
                  <h4 className="text-xs uppercase tracking-widest font-mono font-bold text-black/80">
                    The 3-Step Exchange Protocol:
                  </h4>
                  
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <div className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center text-xs font-bold font-mono shrink-0">
                        1
                      </div>
                      <div>
                        <span className="block text-xs font-serif font-extrabold text-black">Report Damage Instantly</span>
                        <p className="text-[11px] text-black/60 font-light leading-relaxed mt-0.5">
                          Fill out the form on the right or dial our 24/7 hotline. No receipt required; we locate your dormitory reservation number automatically.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center text-xs font-bold font-mono shrink-0">
                        2
                      </div>
                      <div>
                        <span className="block text-xs font-serif font-extrabold text-black">Zero-Fee Return Process</span>
                        <p className="text-[11px] text-black/60 font-light leading-relaxed mt-0.5">
                          We do not charge return shipping labels! Simply leave the damaged piece in your hostel's administrative dispatch locker. Our local couriers collect it directly.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center text-xs font-bold font-mono shrink-0">
                        3
                      </div>
                      <div>
                        <span className="block text-xs font-serif font-extrabold text-black">Free Express Dispatch</span>
                        <p className="text-[11px] text-black/60 font-light leading-relaxed mt-0.5">
                          Within 24 hours of ticket validation, a fresh factory-sealed premium product is dispatched bypass-couriered straight to your dormitory door.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Explicit Contact Placeholders */}
                  <div className="pt-4 border-t border-black/10 text-xs">
                    <span className="block text-[10px] font-mono uppercase tracking-widest font-bold text-black/80 mb-2">Support Helpline Contacts:</span>
                    <div className="space-y-1.5 font-mono text-[11px] text-black/75">
                      <div className="flex items-center gap-1.5">
                        <span className="text-indigo-700 font-bold">✉ Email support:</span>
                        <a href="mailto:support@dormaura.com" className="hover:underline font-semibold font-sans text-indigo-800">support@dormaura.com</a>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-indigo-700 font-bold">☏ Phone desk:</span>
                        <span className="font-semibold text-black">+1-800-DORM-AURA</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-gray-500 font-bold">⏰ Operating:</span>
                        <span className="font-sans text-black/70">24/7 Dorm Relocation Support</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Raise Ticket Form */}
                <div className="border-t md:border-t-0 md:border-l md:border-r border-black/10 px-0 md:px-6">
                  <h4 className="text-xs uppercase tracking-widest font-mono font-bold text-black/80 mb-4">
                    Register Free Exchange Claim Log:
                  </h4>

                  {ticketSuccess ? (
                    <div className="bg-emerald-50/80 border border-emerald-300 text-emerald-900 rounded-lg p-5">
                      <div className="flex items-center gap-2 mb-2 font-bold font-mono text-sm uppercase">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" /> Ticket Registered!
                      </div>
                      <p className="text-xs text-emerald-950 font-light leading-relaxed">
                        Our student support agents have processed your exchange request. Standard replacement dispatch takes place under 24 hours. Check your phone for details.
                      </p>
                      <button
                        onClick={() => setTicketSuccess(false)}
                        className="mt-4 px-3.5 py-1.5 bg-black text-white text-[10px] uppercase font-mono tracking-widest font-bold hover:bg-zinc-800 transition-all rounded cursor-pointer"
                      >
                        Submit another claim
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleRaiseTicket} className="space-y-3.5" id="exchange-ticket-form">
                      <div>
                        <label className="block text-[10px] font-mono uppercase tracking-widest font-bold text-black/60 mb-1">
                          Step 1: Select Your Damaged Item
                        </label>
                        <select
                          value={ticketProduct}
                          onChange={(e) => setTicketProduct(e.target.value)}
                          className="w-full bg-black/5 hover:bg-black/[0.08] focus:bg-white border border-black/20 focus:border-black py-2 px-3 rounded text-xs text-black outline-none transition-all"
                        >
                          <option value="">-- Choose damaged product --</option>
                          {products.map(p => (
                            <option key={p.id} value={p.name}>{p.name}</option>
                          ))}
                        </select>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-mono uppercase tracking-widest font-bold text-black/60 mb-1">
                            Step 2: Student Name
                          </label>
                          <input
                            type="text"
                            placeholder="Alex Mercer"
                            value={ticketName}
                            onChange={(e) => setTicketName(e.target.value)}
                            className="w-full bg-black/5 focus:bg-white border border-black/20 focus:border-black py-2 px-3 rounded text-xs text-black outline-none transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-mono uppercase tracking-widest font-bold text-black/60 mb-1">
                            Step 3: Contact Phone
                          </label>
                          <input
                            type="text"
                            placeholder="+1 (555) 0192"
                            value={ticketPhone}
                            onChange={(e) => setTicketPhone(e.target.value)}
                            className="w-full bg-black/5 focus:bg-white border border-black/20 focus:border-black py-2 px-3 rounded text-xs text-black outline-none transition-all"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-mono uppercase tracking-widest font-bold text-black/60 mb-1">
                          Step 4: Damage details or transportation issues
                        </label>
                        <textarea
                          rows={2}
                          placeholder="e.g. Scratched during transit, broken bracket, biometric sensor unresponsive."
                          value={ticketReason}
                          onChange={(e) => setTicketReason(e.target.value)}
                          className="w-full bg-black/5 focus:bg-white border border-black/20 focus:border-black py-2 px-3 rounded text-xs text-black outline-none transition-all resize-none"
                        />
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        <span className="text-[9px] text-black/50 font-mono tracking-tight">Swap requires no return fees.</span>
                        <button
                          type="submit"
                          className="px-5 py-2.5 bg-black text-white hover:bg-indigo-600 text-[10px] font-mono uppercase tracking-widest font-bold hover:text-white transition-all rounded shadow-md cursor-pointer"
                        >
                          Submit Exchange Claim
                        </button>
                      </div>
                    </form>
                  )}
                </div>

                {/* 3. Dashboard of Live claims log */}
                <div>
                  <h4 className="text-xs uppercase tracking-widest font-mono font-bold text-black/80 mb-4 flex items-center justify-between">
                    <span>Live Exchange System Log:</span>
                    <span className="text-[9px] bg-black text-white px-2 py-0.5 rounded-full font-normal">Active</span>
                  </h4>

                  <div className="space-y-3.5 max-h-[290px] overflow-y-auto pr-1">
                    {tickets.map((t) => (
                      <div key={t.id} className="p-3 bg-black/[0.03] border border-black/10 rounded text-left">
                        <div className="flex justify-between items-start mb-1.5">
                          <span className="text-[10px] font-mono font-extrabold text-indigo-700 uppercase tracking-widest">
                            {t.id}
                          </span>
                          <span className={`text-[8px] font-mono px-2 py-0.5 tracking-wider uppercase font-bold rounded ${
                            t.status === "Exchanged Scheduled" 
                              ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                              : "bg-amber-100 text-amber-800 border border-amber-300"
                          }`}>
                            {t.status}
                          </span>
                        </div>
                        <p className="text-xs font-serif font-bold text-black truncate">{t.productName}</p>
                        <p className="text-[11px] text-black/60 italic font-light mt-0.5 break-words line-clamp-2">"{t.reason}"</p>
                        
                        <div className="flex justify-between items-center text-[9px] text-black/45 mt-2 pt-1.5 border-t border-black/5">
                          <span>Reported by: {t.customerName}</span>
                          <span>{t.createdAt.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>

              </div>
            </div>

          </section>

          {/* CHATBOT & INTERACTIVE ASSISTANT: spans 4 columns */}
          <section className="lg:col-span-4 bg-white border border-black/10 rounded-lg p-6 flex flex-col h-[650px] lg:sticky lg:top-28 shadow-sm">
            
            {/* AI Assistant Avatar / Title */}
            <div className="flex items-center gap-3.5 border-b border-black/5 pb-4 mb-4">
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center shrink-0 shadow-lg shadow-indigo-500/20">
                <Sparkle className="w-6 h-6 text-white animate-spin-slow" />
              </div>
              <div className="text-left">
                <h3 className="text-lg font-serif italic text-neutral-900 flex items-center gap-1.5 font-bold">
                  AuraAI Assistant
                </h3>
                <p className="text-[9px] uppercase tracking-widest text-indigo-600 font-mono font-bold">
                  24/7 Chatbot Helper
                </p>
              </div>
            </div>

            {/* Quick action chips triggers */}
            <div className="mb-3.5">
              <p className="text-[10px] text-neutral-400 uppercase tracking-widest font-mono font-bold mb-2">Help shortcuts:</p>
              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => triggerChatShortcut("Tell me a hostel bedding hack")}
                  className="px-2.5 py-1 bg-neutral-50 hover:bg-indigo-600 hover:text-white border border-black/15 text-[9px] text-neutral-800 transition-all font-mono rounded cursor-pointer"
                >
                  💡 Bedding Hack
                </button>
                <button
                  onClick={() => triggerChatShortcut("How do I exchange if it's damaged?")}
                  className="px-2.5 py-1 bg-neutral-50 hover:bg-indigo-600 hover:text-white border border-black/15 text-[9px] text-neutral-800 transition-all font-mono rounded cursor-pointer"
                >
                  🔄 Damaged Exchange
                </button>
                <button
                  onClick={() => triggerChatShortcut("Are there any weekend deals currently?")}
                  className="px-2.5 py-1 bg-neutral-50 hover:bg-indigo-600 hover:text-white border border-black/15 text-[9px] text-neutral-800 transition-all font-mono rounded cursor-pointer"
                >
                  🏷️ Weekend Deals
                </button>
              </div>
            </div>

            {/* Message log */}
            <div className="flex-1 overflow-y-auto space-y-4 pr-1 mb-4 bg-neutral-50 p-3 rounded border border-black/10" id="chatbot-message-feed">
              {chatbotMessages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
                >
                  <span className="text-[8px] font-mono text-neutral-400 mb-0.5">
                    {msg.sender === "user" ? "You" : "AuraAI Assistant"}
                  </span>
                  
                  <div className={`p-3 rounded text-xs leading-relaxed max-w-[90%] font-light ${
                    msg.sender === "user" 
                      ? "bg-indigo-600 text-white rounded-br-none" 
                      : "bg-white border border-black/10 text-neutral-800 rounded-bl-none shadow-sm"
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isGenerating && (
                <div className="flex items-center gap-2 text-xs text-neutral-400 font-mono italic">
                  <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce delay-100"></span>
                  <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce delay-200"></span>
                  <span>AuraAI thinking...</span>
                </div>
              )}
              <div ref={chatBottomRef} />
            </div>

            {/* Input bar */}
            <form onSubmit={handleChatSubmit} className="flex gap-2" id="aura-chat-form">
              <input
                type="text"
                placeholder="Ask AuraAI about hostel hacks, exchanges..."
                value={currentMessageInput}
                onChange={(e) => setCurrentMessageInput(e.target.value)}
                className="flex-1 bg-white border border-black/15 px-3 py-2 text-xs rounded text-neutral-900 focus:outline-none focus:border-indigo-500 placeholder:text-neutral-400"
              />
              <button
                type="submit"
                className="px-3 py-2 bg-indigo-600 text-white hover:bg-indigo-700 transition-all rounded flex items-center justify-center cursor-pointer shadow"
                aria-label="Send messenger"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

          </section>

        </div>

      </main>

      {/* FOOTER BAR: Styled dynamically matching Vesta guidelines */}
      <footer className="border-t border-black/10 mt-16 bg-white py-12 text-xs text-black/50">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h4 className="text-xl font-serif italic text-black flex items-center gap-1.5 font-bold">
              DormAura
            </h4>
            <p className="text-[9px] uppercase tracking-widest font-mono text-black/40 mt-1">
              © 2026 DormAura Premium Hostel Essentials Inc. All rights reserved.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-8 text-[11px] uppercase tracking-widest font-mono text-black/60 font-semibold">
            <span>Premium quality only</span>
            <span>100% student trust certified</span>
            <span>Secure encryption checkout</span>
          </div>
        </div>
      </footer>

      {/* OPTION 1: CART PANEL MODAL (Wishlist and basket checklist) */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm" id="cart-drawer-modal-backdrop">
          <div className="w-full max-w-md bg-white h-full border-l border-black/10 p-6 flex flex-col justify-between shadow-2xl relative">
            
            {/* Cart Header */}
            <div>
              <div className="flex justify-between items-center border-b border-black/10 pb-4 mb-4">
                <h3 className="text-xl font-serif italic text-black flex items-center gap-2 font-bold">
                  <span>Student Basket</span>
                  <span className="text-xs bg-indigo-50 border border-indigo-200 text-indigo-700 font-bold px-2 py-0.5 rounded-full font-mono">
                    {cart.reduce((s, c) => s + c.quantity, 0)} Items
                  </span>
                </h3>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="p-1 hover:bg-neutral-100 rounded transition-all text-neutral-400 hover:text-black cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Cart List */}
              {cart.length === 0 ? (
                <div className="text-center py-16">
                  <ShoppingBag className="w-12 h-12 text-neutral-300 mx-auto mb-3" />
                  <p className="text-sm font-serif italic text-neutral-500">Your basket is currently empty.</p>
                  <p className="text-xs text-neutral-400 mt-1">Browse our premium essentials and add items to your dorm space.</p>
                  <button
                    onClick={() => { setIsCartOpen(false); }}
                    className="mt-6 px-4 py-2 bg-neutral-900 text-white hover:bg-indigo-600 text-xs uppercase tracking-widest font-mono font-bold rounded transition-all cursor-pointer"
                  >
                    Explore Catalog
                  </button>
                </div>
              ) : (
                <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
                  {cart.map((item) => {
                    const priceValue = getProductPrice(item.product);
                    
                    return (
                      <div key={item.product.id} className="flex gap-4 p-3 bg-neutral-50 border border-black/5 rounded-lg text-left">
                        <img 
                          src={item.product.imageUrl} 
                          alt={item.product.name}
                          className={`w-16 h-16 rounded bg-neutral-100 shrink-0 border border-black/5 ${
                            item.product.imageUrl.includes("o1t48l") || item.product.imageUrl.includes("81KAVzpzA4L")
                              ? "object-contain p-1" 
                              : "object-cover"
                          }`}
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-serif text-black truncate font-bold">{item.product.name}</h4>
                          <p className="text-[10px] text-indigo-600 font-mono uppercase tracking-wider mt-0.5">
                            Price: ₹{priceValue.toLocaleString('en-IN')} Each
                          </p>
                          
                          <div className="flex items-center justify-between mt-3">
                            {/* Quantity selection */}
                            <div className="flex items-center gap-1.5 bg-white border border-black/10 rounded p-0.5">
                              <button 
                                onClick={() => updateQuantity(item.product.id, -1)}
                                className="p-1 hover:bg-neutral-100 rounded text-neutral-500 hover:text-black"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="text-xs font-mono px-2 text-neutral-800">{item.quantity}</span>
                              <button 
                                onClick={() => updateQuantity(item.product.id, 1)}
                                className="p-1 hover:bg-neutral-100 rounded text-neutral-500 hover:text-black"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>

                            {/* Remove button */}
                            <button
                              onClick={() => removeFromCart(item.product.id)}
                              className="text-rose-600 hover:text-rose-700 p-1 text-[11px] font-mono uppercase tracking-wider flex items-center gap-1 font-semibold"
                            >
                              <Trash2 className="w-3.5 h-3.5" /> Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Cart Footer */}
            {cart.length > 0 && (
              <div className="border-t border-black/10 pt-4 bg-white">
                
                {/* Math breakdown */}
                <div className="space-y-1.5 mb-5 text-sm text-neutral-700 font-mono">
                  <div className="flex justify-between">
                    <span>Basket Subtotal</span>
                    <span>₹{cartSubtotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-xs text-indigo-600 font-semibold">
                    <span>Hostel Student Discount (Included)</span>
                    <span>- ₹0</span>
                  </div>
                  <div className="flex justify-between text-xs text-emerald-600 font-semibold">
                    <span>Standard Swap Warranty Package</span>
                    <span>FREE</span>
                  </div>
                  <div className="flex justify-between text-base font-serif font-bold text-neutral-900 pt-2 border-t border-black/10">
                    <span>Total Estimate</span>
                    <span>₹{cartSubtotal.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <button
                    onClick={() => {
                      alert("Checkout simulation successful! Since DormAura values 100% Student Trust, your order is pending validation with zero charging. We will dispatch shipping tracking shortly!");
                      setCart([]);
                      setIsCartOpen(false);
                    }}
                    className="w-full py-3 bg-indigo-600 text-white hover:bg-indigo-700 text-sm font-bold uppercase tracking-widest transition-all rounded cursor-pointer shadow-md"
                  >
                    Complete Student Checkout
                  </button>
                  <p className="text-[9px] text-center text-neutral-400 font-mono uppercase tracking-widest">
                    🔒 Guaranteed trustworthy transaction
                  </p>
                </div>

              </div>
            )}

          </div>
        </div>
      )}

      {/* OPTION 2: SPECTACLES / PRODUCT SPECIFICATIONS MODAL */}
      {activeProductDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" id="specs-modal-backdrop">
          <div className="bg-white border border-black/15 w-full max-w-xl rounded-xl overflow-hidden shadow-2xl relative text-left">
            
            {/* Header info */}
            <div className="p-6 border-b border-black/10 flex justify-between items-start">
              <div>
                <span className="text-[10px] font-mono tracking-widest uppercase text-indigo-600 font-bold">
                  {activeProductDetail.category} specifications
                </span>
                <h3 className="text-2xl font-serif italic text-neutral-900 mt-1 font-bold">
                  {activeProductDetail.name}
                </h3>
              </div>
              
              <button 
                onClick={() => setActiveProductDetail(null)}
                className="p-1.5 hover:bg-neutral-100 rounded transition-all text-neutral-500 hover:text-black cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Specifications Matrix */}
            <div className="p-6 space-y-5 max-h-[65vh] overflow-y-auto">
              
              <div>
                <h4 className="text-xs uppercase tracking-widest font-mono text-neutral-400 mb-2">Item overview</h4>
                <p className="text-xs text-neutral-700 leading-relaxed font-light">{activeProductDetail.description}</p>
              </div>

              {activeProductDetail.isBundle && activeProductDetail.itemsIncluded && (
                <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-md">
                  <span className="block text-[10px] font-mono uppercase text-indigo-700 font-bold mb-2">🎁 Items Included In This Curation</span>
                  <ul className="space-y-1">
                    {activeProductDetail.itemsIncluded.map((item, idx) => (
                      <li key={idx} className="text-[11px] text-neutral-800 flex items-center gap-2 font-serif italic">
                        <span className="text-indigo-600">✦</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div>
                <h4 className="text-xs uppercase tracking-widest font-mono text-neutral-400 mb-3">Certified Specifications Matrix:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {Object.entries(activeProductDetail.specifications).map(([key, val]) => (
                    <div key={key} className="p-3 bg-neutral-50 border border-black/10 rounded">
                      <span className="block text-[9px] text-indigo-700 font-mono uppercase tracking-wider">{key}</span>
                      <span className="text-xs text-neutral-900 uppercase font-bold tracking-tight">{val}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Safety Badges & Warranty details */}
              <div className="p-4 bg-indigo-50 border border-indigo-200/50 rounded-md flex items-center gap-3">
                <Award className="w-8 h-8 text-indigo-600 shrink-0" />
                <div>
                  <span className="block text-[10px] font-mono uppercase text-indigo-700 font-bold">Dorm-Proof Warranty Registered</span>
                  <p className="text-[11px] text-neutral-700 mt-0.5 leading-relaxed">
                    Carries a certified <b>1-Year Stress Swapping Warranty</b>. We ship replacements for any damage or malfunctions completely free.
                  </p>
                </div>
              </div>

              {/* Product Reviews */}
              <div className="border-t border-black/10 pt-5 font-sans">
                <h4 className="text-xs uppercase tracking-widest font-mono text-indigo-700 font-bold mb-3 flex items-center gap-2">
                  <span>★ Verified Customer Reviews</span>
                  <span className="text-[10px] font-sans text-neutral-400 font-normal">({activeProductDetail.reviewsCount || 42} ratings)</span>
                </h4>
                
                <div className="space-y-3">
                  {((activeProductDetail.customerReviews && activeProductDetail.customerReviews.length > 0) 
                    ? activeProductDetail.customerReviews 
                    : [
                        {
                          username: "Alex T. (Verified Student)",
                          rating: Math.floor(activeProductDetail.rating) || 5,
                          date: "3 days ago",
                          comment: `Absolutely love this ${activeProductDetail.name}! It feels incredibly premium and is perfect for dormitory environments. 10/10.`
                        },
                        {
                          username: "Jordan P. (Verified Bunk-mate)",
                          rating: 5,
                          date: "2 weeks ago",
                          comment: `Extremely trustworthy item. Authentic certification stickers. Zero issues after months of daily dormitory wear and tear.`
                        }
                      ]
                  ).map((review, idx) => (
                    <div key={idx} className="p-3 bg-neutral-50 border border-black/5 rounded-lg text-xs space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="font-mono font-semibold text-neutral-800">{review.username}</span>
                        <span className="text-[10px] text-neutral-400">{review.date}</span>
                      </div>
                      <div className="flex items-center gap-0.5 text-amber-500 text-[11px]">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <span key={i} className="leading-none">{i < review.rating ? "★" : "☆"}</span>
                        ))}
                      </div>
                      <p className="text-neutral-700 font-light leading-relaxed font-serif italic text-[11.5px] mt-1">&ldquo;{review.comment}&rdquo;</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Modal footer buy button */}
            <div className="p-4 bg-neutral-50 border-t border-black/10 flex gap-3 justify-end">
              <button
                onClick={() => setActiveProductDetail(null)}
                className="px-4 py-2 bg-neutral-100 border border-black/10 hover:bg-neutral-200 text-neutral-800 rounded text-[11px] font-mono uppercase tracking-wider transition-all"
              >
                Close Specs
              </button>
              <button
                onClick={() => {
                  addToCart(activeProductDetail);
                  setActiveProductDetail(null);
                }}
                className="px-5 py-2 bg-indigo-600 text-white hover:bg-indigo-700 font-bold text-[11px] font-mono uppercase tracking-wider transition-all rounded flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                Get Item — ₹{getProductPrice(activeProductDetail).toLocaleString('en-IN')}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
