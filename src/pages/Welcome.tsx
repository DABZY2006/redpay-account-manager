import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Welcome = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem("username") || "User";

  return (
    <main className="flex min-h-screen items-center justify-center p-5">
      <div className="glass-card w-full max-w-[420px] rounded-[28px] p-7 text-center">
        {/* Icon */}
        <div className="mx-auto mb-5 flex h-[72px] w-[72px] items-center justify-center rounded-full bg-gradient-to-br from-[hsl(0,100%,61%)] to-[hsl(0,100%,24%)]">
          <svg viewBox="0 0 24 24" className="h-[34px] w-[34px] fill-white">
            <path d="M2 22l14-10L2 2v20zm15.5-5.5L21 12l-3.5-4.5" />
          </svg>
        </div>

        {/* Text */}
        <h1 className="text-[30px] font-bold text-foreground">
          Welcome, {username}!
        </h1>
        <p className="mt-1.5 text-[15px] text-muted-foreground">
          Your account is ready to go
        </p>

        {/* Bonus Card */}
        <div className="my-7 rounded-[24px] bg-gradient-to-br from-[hsl(0,100%,8%)] to-[hsl(0,100%,4%)] p-6 shadow-[0_0_30px_rgba(255,0,0,0.15)]">
          <div className="mb-2 text-[15px] text-foreground/80">Welcome Bonus</div>
          <div className="mb-1.5 text-[42px] font-extrabold text-primary">
            ₦160,000
          </div>
          <div className="text-[14px] text-foreground/70">
            has been added to your wallet 🎉
          </div>
        </div>

        <Button onClick={() => navigate("/dashboard")} className="w-full">
          Go to Dashboard
        </Button>

        <p className="mt-5 text-[14px] text-muted-foreground">
          Start exploring RedPay and enjoy seamless payments
        </p>
      </div>
    </main>
  );
};

export default Welcome;
