import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const banks = [
  "Access Bank", "Ecobank", "FCMB", "Fidelity Bank", "First Bank", "GTBank",
  "Heritage Bank", "Keystone Bank", "Polaris Bank", "Stanbic IBTC", "Sterling Bank",
  "Union Bank", "UBA", "Wema Bank", "Zenith Bank", "Opay", "Palmpay", "Moniepoint",
  "ALAT by Wema", "Carbon", "Paystack", "Rubiks Bank", "VFD Microfinance Bank", "Providus Bank"
];

const Withdraw = () => {
  const navigate = useNavigate();
  const [balance, setBalance] = useState(0);
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");
  const [bank, setBank] = useState("");
  const [amount, setAmount] = useState("5000");
  const [rpc, setRpc] = useState("");
  const [error, setError] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const storedBalance = localStorage.getItem("rp_balance");
    setBalance(storedBalance ? Number(storedBalance) : 0);
  }, []);

  const formatNaira = (n: number) => "₦" + n.toLocaleString();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const amountNum = Math.floor(Number(amount));
    const min = 1000;

    if (!accountNumber || !accountName || !bank) {
      setError("Please fill all account details and choose a bank.");
      return;
    }
    if (!rpc) {
      setError("Access (RPC) code is required.");
      return;
    }
    if (rpc !== "RPC200420") {
      toast.error("⚠️ Please purchase your RPC CODE to access your withdrawal.", {
        duration: 3000,
      });
      return;
    }
    if (isNaN(amountNum) || amountNum < min) {
      setError("Enter a valid amount (minimum ₦1,000).");
      return;
    }
    if (amountNum > balance) {
      setError(`Insufficient balance. You can withdraw up to ${formatNaira(balance)}.`);
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      const newBalance = balance - amountNum;
      localStorage.setItem("rp_balance", String(newBalance));
      navigate(`/withdraw/success?amount=${amountNum}`);
    }, 5000);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#070707] to-[#120808] flex items-start justify-center p-7">
      <div className="w-full max-w-[480px]">
        {/* Back Button */}
        <button
          onClick={() => navigate("/dashboard")}
          className="mb-4 flex items-center gap-2 text-sm text-muted-foreground hover:text-white transition-colors"
        >
          ← Back to Dashboard
        </button>

        <div className="rounded-[20px] border border-white/[0.03] bg-gradient-to-b from-white/[0.02] to-black/15 p-[22px] shadow-[0_10px_40px_rgba(0,0,0,0.6)]">
          <h1 className="mb-1.5 text-center text-[28px] font-extrabold text-white">Withdraw Funds</h1>
          <p className="mb-[18px] text-center text-muted-foreground">Transfer money to your bank account</p>

          {/* Balance Card */}
          <div className="mb-[18px] rounded-2xl border border-primary/10 bg-primary/[0.06] p-[18px] text-center">
            <div className="text-[13px] text-muted-foreground">Available Balance</div>
            <div className="mt-1.5 text-[28px] font-extrabold text-primary">{formatNaira(balance)}</div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
            <div>
              <label className="mb-1.5 block text-[13px] text-muted-foreground">Account Number</label>
              <input
                type="text"
                inputMode="numeric"
                pattern="\d*"
                placeholder="1234567890"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                className="w-full rounded-xl border border-white/[0.04] bg-[#0f0f10] p-3.5 text-base text-white outline-none"
                required
              />
            </div>

            <div>
              <label className="mb-1.5 block text-[13px] text-muted-foreground">Account Name</label>
              <input
                type="text"
                placeholder="John Doe"
                value={accountName}
                onChange={(e) => setAccountName(e.target.value)}
                className="w-full rounded-xl border border-white/[0.04] bg-[#0f0f10] p-3.5 text-base text-white outline-none"
                required
              />
            </div>

            <div>
              <label className="mb-1.5 block text-[13px] text-muted-foreground">Select Bank</label>
              <select
                value={bank}
                onChange={(e) => setBank(e.target.value)}
                className="w-full rounded-xl border border-white/[0.04] bg-[#0f0f10] p-3.5 text-base text-white outline-none"
                required
              >
                <option value="">Choose bank</option>
                {banks.map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1.5 block text-[13px] text-muted-foreground">Amount (₦)</label>
              <input
                type="number"
                min="1000"
                step="1"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full rounded-xl border border-white/[0.04] bg-[#0f0f10] p-3.5 text-base text-white outline-none"
                required
              />
              <div className="mt-1.5 text-[13px] text-muted-foreground">Minimum: ₦1,000</div>
            </div>

            <div>
              <label className="mb-1.5 block text-[13px] text-muted-foreground">Enter RPC Code</label>
              <input
                type="password"
                placeholder="••••••"
                value={rpc}
                onChange={(e) => setRpc(e.target.value)}
                className="w-full rounded-xl border border-white/[0.04] bg-[#0f0f10] p-3.5 text-base text-white outline-none"
                required
              />
              <div className="mt-1.5 text-[13px] text-[#ffb4b4]">⚠ Access code is required for withdrawal</div>
            </div>

            {error && <div className="text-[13px] text-[#ff8a80]">{error}</div>}

            <div className="mt-[18px]">
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full rounded-[14px] bg-gradient-to-r from-primary to-[#b71c1c] py-3.5 text-base font-bold text-white disabled:opacity-70"
              >
                {isProcessing ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="text-xl">⏳</span> Processing...
                  </span>
                ) : (
                  "Withdraw Funds"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Withdraw;
