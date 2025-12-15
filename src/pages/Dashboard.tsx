import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Dashboard = () => {
  const navigate = useNavigate();
  const [balance, setBalance] = useState(160000);
  const [userId] = useState(() => {
    const stored = localStorage.getItem("rp_userId");
    if (stored) return stored;
    const id = Math.floor(10000000000 + Math.random() * 89999999999).toString();
    localStorage.setItem("rp_userId", id);
    return id;
  });
  const [isClaimed, setIsClaimed] = useState(false);
  const [countdown, setCountdown] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);

  const username = localStorage.getItem("username") || "User";
  const initials = username.length >= 2 
    ? (username[0] + username[username.length - 1]).toUpperCase()
    : username.slice(0, 2).toUpperCase();

  // Initialize balance from localStorage
  useEffect(() => {
    const storedBalance = localStorage.getItem("rp_balance");
    if (storedBalance) {
      setBalance(Number(storedBalance));
    } else {
      localStorage.setItem("rp_balance", "160000");
    }
  }, []);

  // Check if already claimed
  useEffect(() => {
    if (localStorage.getItem("rp_claimed")) {
      setIsClaimed(true);
      let t = 24 * 60 * 60;
      const interval = setInterval(() => {
        const h = String(Math.floor(t / 3600)).padStart(2, "0");
        const m = String(Math.floor((t % 3600) / 60)).padStart(2, "0");
        const s = String(t % 60).padStart(2, "0");
        setCountdown(`${h}:${m}:${s}`);
        t--;
        if (t < 0) {
          clearInterval(interval);
          setIsClaimed(false);
          setCountdown("");
          localStorage.removeItem("rp_claimed");
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, []);

  // Auto-slide carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleClaim = () => {
    if (isClaimed) return;
    
    localStorage.setItem("rp_claimed", "1");
    const newBalance = balance + 30000;
    setBalance(newBalance);
    localStorage.setItem("rp_balance", String(newBalance));
    setIsClaimed(true);
    
    toast.success("₦30,000 claimed successfully!");

    let t = 24 * 60 * 60;
    const interval = setInterval(() => {
      const h = String(Math.floor(t / 3600)).padStart(2, "0");
      const m = String(Math.floor((t % 3600) / 60)).padStart(2, "0");
      const s = String(t % 60).padStart(2, "0");
      setCountdown(`${h}:${m}:${s}`);
      t--;
      if (t < 0) {
        clearInterval(interval);
        setIsClaimed(false);
        setCountdown("");
        localStorage.removeItem("rp_claimed");
      }
    }, 1000);
  };

  const gridItems = [
    { id: "buyRpc", icon: "🛍️", label: "BuyRPC", bg: "rgba(229,57,53,0.1)", color: "#e53935" },
    { id: "broadcast", icon: "📡", label: "Broadcast", bg: "rgba(98,0,238,0.1)", color: "#6a1b9a" },
    { id: "refer", icon: "🎁", label: "Refer&Earn", bg: "rgba(33,150,243,0.1)", color: "#1976d2" },
    { id: "community", icon: "👥", label: "Community", bg: "rgba(76,175,80,0.1)", color: "#2e7d32" },
    { id: "history", icon: "⟲", label: "History", bg: "rgba(255,152,0,0.1)", color: "#ef6c00" },
    { id: "support", icon: "🎧", label: "Support", bg: "rgba(229,57,53,0.06)", color: "#e53935" },
  ];

  const slides = [
    { bg: "#e53935", title: "Transact & Win", subtitle: "Locations: Cheers Gold Crest Mall | ChrisMar Hotel", text: "All customers who pay with PayGo stand a chance to win great prizes." },
    { bg: "#2196F3", title: "NASDEC Complex Lusaka", subtitle: "August 27–28", badges: ["Airtel Money", "MTN", "Zamtel"] },
    { bg: "#4CAF50", title: "Winners of K20 Airtime", subtitle: "Patience Ng'andwe, Phiri John", text: "🎉 Congratulations!" },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#120606] to-[#060404] p-[18px] text-foreground">
      <div className="mx-auto w-full max-w-[420px]">
        {/* Top Bar */}
        <div className="mb-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-white text-xl font-bold text-primary">
              R
            </div>
            <span className="font-bold opacity-95">RedPay</span>
          </div>
          <div 
            onClick={() => navigate("/profile")}
            className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/5 bg-primary/10 text-sm font-bold transition-transform hover:scale-105"
          >
            {initials}
          </div>
        </div>

        {/* Balance Card */}
        <section className="mb-5 rounded-[18px] bg-gradient-to-b from-[#e53935] to-[#b71c1c] p-[18px] shadow-[0_12px_24px_rgba(0,0,0,0.5)]">
          <div className="mb-2 flex items-center justify-between">
            <div className="text-sm font-bold opacity-95">Total Balance</div>
            <div className="rounded-[10px] bg-white/10 px-2.5 py-1.5 text-[13px] font-bold">
              Video
            </div>
          </div>
          <div className="my-1.5 text-4xl font-extrabold">
            ₦{balance.toLocaleString()}
          </div>
          <div className="text-xs opacity-85">ID: {userId}</div>

          <div className="mt-3 flex gap-3">
            <button
              onClick={handleClaim}
              disabled={isClaimed}
              className="flex-1 rounded-[10px] bg-white/10 px-3 py-2.5 text-sm font-bold text-white disabled:opacity-70"
            >
              🎁 {isClaimed ? countdown : "Claim ₦30,000"}
            </button>
            <button 
              onClick={() => navigate("/withdraw")}
              className="flex-1 rounded-[10px] bg-white/5 px-3 py-2.5 text-sm font-bold text-white"
            >
              ✈️ Withdraw
            </button>
          </div>
        </section>

        <hr className="my-[18px] border-0 h-px bg-white/5" />

        {/* Grid Menu */}
        <div className="grid grid-cols-3 gap-3.5">
          {gridItems.map((item) => (
            <div
              key={item.id}
            onClick={() => {
                if (item.id === "buyRpc") navigate("/buy-rpc");
                if (item.id === "broadcast") navigate("/broadcast");
                if (item.id === "refer") navigate("/refer");
                if (item.id === "community") navigate("/community");
                if (item.id === "support") navigate("/support");
                if (item.id === "history") navigate("/history");
              }}
              className="flex min-h-[84px] cursor-pointer flex-col items-center justify-center rounded-xl border border-white/5 bg-white/[0.02] p-[18px_10px] text-center transition-transform hover:scale-105"
            >
              <div
                className="mb-2 flex h-11 w-11 items-center justify-center rounded-[10px] text-lg font-bold"
                style={{ backgroundColor: item.bg, color: item.color }}
              >
                {item.icon}
              </div>
              <span className="text-[13px] text-muted-foreground">{item.label}</span>
            </div>
          ))}
        </div>

        {/* Promo Carousel */}
        <div className="relative mt-[18px] h-40 overflow-hidden rounded-[18px] bg-black shadow-[0_8px_24px_rgba(0,0,0,0.5)]">
          <div
            className="flex h-full transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {slides.map((slide, idx) => (
              <div
                key={idx}
                className="relative flex min-w-full items-center justify-center p-[18px]"
              >
                <div
                  className="absolute inset-0 brightness-[0.4]"
                  style={{ backgroundColor: slide.bg }}
                />
                <div className="relative z-10 max-w-[90%] text-center">
                  <h3 className="mb-1.5 text-lg font-bold">{slide.title}</h3>
                  <p className="mb-2 text-[13px] opacity-90">{slide.subtitle}</p>
                  {slide.text && <p className="text-xs opacity-80">{slide.text}</p>}
                  {slide.badges && (
                    <div className="mt-2 flex flex-wrap justify-center gap-2">
                      {slide.badges.map((badge) => (
                        <span
                          key={badge}
                          className="rounded-md bg-white/15 px-2 py-1 text-[11px] font-semibold"
                        >
                          {badge}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Arrows */}
          <button
            onClick={() => setCurrentSlide((prev) => (prev - 1 + 3) % 3)}
            className="absolute left-2.5 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-black/30 text-lg text-white"
          >
            ‹
          </button>
          <button
            onClick={() => setCurrentSlide((prev) => (prev + 1) % 3)}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-black/30 text-lg text-white"
          >
            ›
          </button>

          {/* Dots */}
          <div className="absolute bottom-2.5 left-1/2 flex -translate-x-1/2 gap-1.5">
            {[0, 1, 2].map((i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`h-2 w-2 rounded-full border-0 ${
                  currentSlide === i ? "bg-white" : "bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="h-[60px]" />
      </div>
    </main>
  );
};

export default Dashboard;
