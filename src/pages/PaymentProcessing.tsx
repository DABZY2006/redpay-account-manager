import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PaymentProcessing = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/transaction-failed");
    }, 7000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <main className="min-h-screen bg-[radial-gradient(circle,#300000,#0a0000)] flex flex-col items-center justify-center p-5 text-foreground">
      <div className="w-[90%] max-w-[400px] rounded-[18px] border border-primary/20 bg-[rgba(20,20,20,0.7)] p-8 text-center shadow-[0_0_20px_rgba(255,0,0,0.3)]">
        {/* Spinning Loader */}
        <div className="mx-auto h-20 w-20 animate-spin rounded-full border-4 border-primary/30 border-t-primary"></div>

        <h2 className="mt-6 text-xl font-bold">Verifying Payment...</h2>

        <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
          Please wait while we confirm your transaction. This may take a few moments.
        </p>

        <div className="mt-6 flex items-center justify-center gap-1">
          <div className="h-2 w-2 animate-pulse rounded-full bg-primary" style={{ animationDelay: "0s" }}></div>
          <div className="h-2 w-2 animate-pulse rounded-full bg-primary" style={{ animationDelay: "0.2s" }}></div>
          <div className="h-2 w-2 animate-pulse rounded-full bg-primary" style={{ animationDelay: "0.4s" }}></div>
        </div>
      </div>
    </main>
  );
};

export default PaymentProcessing;
