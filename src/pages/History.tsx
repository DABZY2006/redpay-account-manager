import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

interface Transaction {
  title: string;
  amount: number;
  type: "credit" | "debit";
  date: string;
}

const History = () => {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("transactions");
    if (stored) {
      setTransactions(JSON.parse(stored));
    }
  }, []);

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

        <h1 className="mb-2 text-center text-[28px] font-bold">Transaction History</h1>
        <p className="mb-5 text-center text-muted-foreground">
          View all your recent transactions
        </p>

        {transactions.length === 0 ? (
          <p className="text-center text-muted-foreground">No transactions yet</p>
        ) : (
          transactions.map((tx, idx) => (
            <div
              key={idx}
              className="mb-4 flex items-center justify-between rounded-[15px] border border-[#550000] bg-[#2a0000] p-4"
            >
              <div>
                <div className="text-base font-bold">{tx.title}</div>
                <div className="text-xs text-muted-foreground">{tx.date}</div>
              </div>
              <div
                className={`text-lg font-bold ${
                  tx.type === "credit" ? "text-[#00ff00]" : "text-[#ff3333]"
                }`}
              >
                {tx.type === "credit" ? "+" : "-"} ₦{tx.amount.toLocaleString()}
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
};

export default History;
