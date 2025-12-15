import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Refer = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("rp_userId") || "UU518475254";
  const referralLink = `https://redpay.com.co/?ref=${userId}`;

  const shareMessages = [
    { label: "🔗 Share (Quick & Casual)", variant: "red" as const },
    { label: "🔗 Share (Friendly Pitch)", variant: "dark" as const },
    { label: "🔗 Share (Short & Urgent)", variant: "dark" as const },
  ];

  const handleShare = async () => {
    const message = `Join RedPay and earn ₦5,000 instantly! Sign up using my referral link: ${referralLink}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "RedPay Referral",
          text: message,
          url: referralLink,
        });
      } catch {
        // Share cancelled
      }
    } else {
      await navigator.clipboard.writeText(referralLink);
      toast.success("Referral link copied to clipboard!");
    }
  };

  return (
    <main className="min-h-screen bg-[#1a0000] p-5 text-foreground">
      <div className="mx-auto max-w-[450px]">
        {/* Back Button */}
        <button
          onClick={() => navigate("/dashboard")}
          className="mb-4 text-2xl text-white/70 hover:text-white"
        >
          ←
        </button>

        <h1 className="mb-2 text-center text-3xl font-bold">Refer & Earn</h1>
        <p className="mb-5 text-center text-muted-foreground">
          Invite friends and earn rewards
        </p>

        {/* Stats */}
        <div className="mb-6 flex justify-between gap-3">
          <div className="flex-1 rounded-[15px] border border-[#550000] bg-[#2a0000] p-5 text-center">
            <div className="mb-2.5 text-4xl opacity-90">👥</div>
            <div className="my-1.5 text-2xl font-bold">0</div>
            <div className="text-sm text-muted-foreground">Total Referrals</div>
          </div>
          <div className="flex-1 rounded-[15px] border border-[#550000] bg-[#2a0000] p-5 text-center">
            <div className="mb-2.5 text-4xl opacity-90">🎁</div>
            <div className="my-1.5 text-2xl font-bold">₦0</div>
            <div className="text-sm text-muted-foreground">Total Earnings</div>
          </div>
        </div>

        {/* Referral Link Box */}
        <div className="mb-6 rounded-[15px] border border-[#550000] bg-[#330000] p-5">
          <p>Share your link and earn ₦5,000 per referral</p>
          <div className="mt-2.5 break-all text-[15px] font-bold text-primary">
            {referralLink}
          </div>
        </div>

        {/* How It Works */}
        <div className="mb-6 rounded-[15px] border border-[#550000] bg-[#2b0000] p-5">
          <h2 className="mb-4 text-xl font-bold">How It Works</h2>

          <div className="mb-4 leading-relaxed">
            <span className="mr-2.5 inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
              1
            </span>
            <strong>Share Your Code</strong>
            <br />
            <span className="ml-9 text-muted-foreground">
              Send your referral link to friends and family.
            </span>
          </div>

          <div className="mb-4 leading-relaxed">
            <span className="mr-2.5 inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
              2
            </span>
            <strong>They Sign Up</strong>
            <br />
            <span className="ml-9 text-muted-foreground">
              Your friend registers and purchases the RPC.
            </span>
          </div>

          <div className="leading-relaxed">
            <span className="mr-2.5 inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
              3
            </span>
            <strong>Earn Rewards</strong>
            <br />
            <span className="ml-9 text-muted-foreground">
              Get ₦5,000 credited to your wallet instantly.
            </span>
          </div>
        </div>

        {/* Share Buttons */}
        {shareMessages.map((msg, idx) => (
          <button
            key={idx}
            onClick={handleShare}
            className={`mb-4 flex w-full items-center justify-center gap-2.5 rounded-xl border border-[#550000] px-4 py-4 text-lg font-medium text-white transition-opacity hover:opacity-80 ${
              msg.variant === "red" ? "bg-primary" : "bg-black"
            }`}
          >
            {msg.label}
          </button>
        ))}
      </div>
    </main>
  );
};

export default Refer;
