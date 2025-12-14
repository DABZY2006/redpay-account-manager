import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Broadcast = () => {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [rpcCode, setRpcCode] = useState("");

  const handlePurchase = () => {
    navigate("/buy-rpc");
  };

  return (
    <main className="min-h-screen bg-[#1a0000] p-5 text-foreground">
      <div className="mx-auto max-w-[420px]">
        <h1 className="mt-[30px] text-center text-[28px] font-bold">Broadcast</h1>
        <p className="mb-5 text-center text-muted-foreground">Purchase airtime or data</p>

        {/* Balance Box */}
        <div className="mb-5 rounded-[15px] border-2 border-[#550000] bg-[#330000] p-5 text-center">
          <span className="mb-2.5 block text-base text-muted-foreground">
            Purchase your affordable airtime and data at a very cheap price
          </span>
        </div>

        {/* Toggle Box */}
        <div className="mb-5 flex justify-center gap-5">
          <div className="cursor-pointer rounded-[20px] border border-[#550000] bg-[#2a0000] px-[15px] py-[5px] text-lg">
            Airtime
          </div>
        </div>

        {/* Red Icon */}
        <div className="mb-5 flex justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#550000]">
            <span className="text-[40px]">📞</span>
          </div>
        </div>

        {/* Form */}
        <div className="space-y-4">
          <div>
            <label className="mb-1.5 block text-base">Phone Number</label>
            <input
              type="number"
              placeholder="08012345678"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full rounded-[10px] border border-[#550000] bg-[#2a0000] p-3 text-base text-foreground placeholder:text-muted-foreground"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-base">Amount (₦)</label>
            <input
              type="number"
              placeholder="1000"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full rounded-[10px] border border-[#550000] bg-[#2a0000] p-3 text-base text-foreground placeholder:text-muted-foreground"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-base">Enter RPC Code</label>
            <input
              type="password"
              placeholder="••••••"
              value={rpcCode}
              onChange={(e) => setRpcCode(e.target.value)}
              className="w-full rounded-[10px] border border-[#550000] bg-[#2a0000] p-3 text-base text-foreground placeholder:text-muted-foreground"
            />
          </div>

          <p className="text-sm text-yellow-400">⚠ Access code is required to proceed</p>

          <button
            onClick={handlePurchase}
            className="w-full rounded-xl bg-primary p-[15px] text-lg font-bold text-foreground transition-colors hover:bg-primary/80"
          >
            Purchase Airtime
          </button>
        </div>
      </div>
    </main>
  );
};

export default Broadcast;
