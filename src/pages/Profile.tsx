import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  
  const firstName = localStorage.getItem("firstName") || "User";
  const lastName = localStorage.getItem("lastName") || "";
  
  const avatar = firstName.charAt(0).toUpperCase() + (lastName.charAt(0) || firstName.charAt(1) || "").toUpperCase();
  const fullName = lastName ? `${firstName} ${lastName}` : firstName;

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#2b0000] to-black p-5 text-white">
      <div className="mx-auto w-full max-w-[420px]">
        {/* Back Button */}
        <button
          onClick={() => navigate("/dashboard")}
          className="mb-6 flex items-center gap-2 text-sm text-muted-foreground hover:text-white transition-colors"
        >
          ← Back to Dashboard
        </button>

        {/* Profile Card */}
        <div className="rounded-[28px] bg-black/45 p-7 text-center backdrop-blur-[14px]">
          {/* Avatar */}
          <div
            id="profileAvatar"
            className="mx-auto mb-5 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-[#ff3b3b] to-[#7a0000] text-3xl font-bold"
          >
            {avatar}
          </div>

          {/* Full Name */}
          <h1 id="fullName" className="mb-2 text-2xl font-bold">
            {fullName}
          </h1>
          <p className="mb-8 text-sm text-muted-foreground">RedPay Member</p>

          {/* Menu Items */}
          <div className="space-y-3 text-left">
            <div className="flex items-center gap-4 rounded-xl bg-white/5 p-4">
              <span className="text-xl">👤</span>
              <span>Account Settings</span>
            </div>
            <div className="flex items-center gap-4 rounded-xl bg-white/5 p-4">
              <span className="text-xl">🔒</span>
              <span>Security</span>
            </div>
            <div className="flex items-center gap-4 rounded-xl bg-white/5 p-4">
              <span className="text-xl">🔔</span>
              <span>Notifications</span>
            </div>
            <div className="flex items-center gap-4 rounded-xl bg-white/5 p-4">
              <span className="text-xl">❓</span>
              <span>Help & Support</span>
            </div>
          </div>

          {/* Logout Button */}
          <button
            id="logoutBtn"
            onClick={handleLogout}
            className="mt-8 w-full rounded-[22px] bg-primary py-4 text-lg font-semibold text-white transition-transform active:scale-[0.98]"
          >
            Logout
          </button>
        </div>
      </div>
    </main>
  );
};

export default Profile;
