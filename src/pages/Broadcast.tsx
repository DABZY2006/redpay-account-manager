import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { broadcastSchema } from "@/lib/validation";

const Broadcast = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const numAmount = parseFloat(amount) || 0;

    // Validate form data
    const result = broadcastSchema.safeParse({
      phone,
      amount: numAmount,
    });

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      toast.error("Please fix the errors in the form");
      return;
    }

    setIsProcessing(true);

    // Simulate processing
    setTimeout(() => {
      toast.success("Broadcast sent successfully!");
      setPhone("");
      setAmount("");
      setIsProcessing(false);
    }, 2000);
  };

  return (
    <main className="min-h-screen bg-[#0a0000] p-5 text-foreground">
      <div className="mx-auto max-w-[500px]">
        <button
          onClick={() => navigate("/dashboard")}
          className="mb-4 text-2xl text-white/70 hover:text-white"
        >
          ←
        </button>

        <h1 className="mb-1.5 text-center text-2xl font-bold">Broadcast</h1>
        <p className="mb-6 text-center text-muted-foreground">
          Send airtime or data to any phone number
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="rounded-xl border border-primary/20 bg-[#1a0000] p-4">
            <label className="mb-1.5 block text-sm text-muted-foreground">
              Phone Number
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+234 or 080..."
              maxLength={14}
              className={`w-full rounded-lg bg-[#250000] p-3 text-foreground placeholder:text-muted-foreground ${
                errors.phone ? "border border-red-500" : ""
              }`}
            />
            {errors.phone && (
              <p className="mt-1 text-xs text-red-500">{errors.phone}</p>
            )}
          </div>

          <div className="rounded-xl border border-primary/20 bg-[#1a0000] p-4">
            <label className="mb-1.5 block text-sm text-muted-foreground">
              Amount (₦)
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              min="1"
              max="10000000"
              className={`w-full rounded-lg bg-[#250000] p-3 text-foreground placeholder:text-muted-foreground ${
                errors.amount ? "border border-red-500" : ""
              }`}
            />
            {errors.amount && (
              <p className="mt-1 text-xs text-red-500">{errors.amount}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isProcessing}
            className="w-full rounded-xl bg-primary p-4 text-lg font-bold transition-colors hover:bg-primary/80 disabled:opacity-50"
          >
            {isProcessing ? "Processing..." : "Send Broadcast"}
          </button>
        </form>
      </div>
    </main>
  );
};

export default Broadcast;
