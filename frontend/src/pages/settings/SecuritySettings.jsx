import { useState } from "react";

export default function SecuritySettings() {
  const [loading, setLoading] = useState(false);

  const handlePasswordChange = (e) => {
    e.preventDefault();
    setLoading(true);

    // MOCK — Supabase logic will go here
    setTimeout(() => {
      alert("Password updated (mock)");
      setLoading(false);
    }, 1200);
  };

  const handleSignOutAll = () => {
    // MOCK — Supabase revoke sessions later
    alert("Signed out from all devices (mock)");
  };

  return (
    <div className="space-y-8">

      {/* PAGE TITLE */}
      <div>
        <h1 className="text-2xl font-semibold">Security</h1>
        <p className="text-white/60 mt-1">
          Manage your password, sessions, and account safety.
        </p>
      </div>

      {/* CHANGE PASSWORD */}
      <section
        className="
          p-6 rounded-3xl
          bg-white/10 backdrop-blur-xl
          border border-white/20
        "
      >
        <h2 className="text-lg font-semibold mb-4">Change Password</h2>

        <form onSubmit={handlePasswordChange} className="space-y-4 max-w-md">
          <input
            type="password"
            placeholder="Current password"
            className="w-full px-4 py-2 rounded-xl bg-black/30 border border-white/20 focus:outline-none"
            required
          />

          <input
            type="password"
            placeholder="New password"
            className="w-full px-4 py-2 rounded-xl bg-black/30 border border-white/20 focus:outline-none"
            required
          />

          <input
            type="password"
            placeholder="Confirm new password"
            className="w-full px-4 py-2 rounded-xl bg-black/30 border border-white/20 focus:outline-none"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="
              px-5 py-2 rounded-xl
              bg-cyan-500/30 hover:bg-cyan-500/50
              transition-all
              disabled:opacity-50
            "
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>
      </section>

      {/* SESSIONS */}
      <section
        className="
          p-6 rounded-3xl
          bg-white/10 backdrop-blur-xl
          border border-white/20
        "
      >
        <h2 className="text-lg font-semibold mb-2">Sessions</h2>
        <p className="text-white/60 mb-4">
          You are currently logged in on this device.
        </p>

        <button
          onClick={handleSignOutAll}
          className="
            px-5 py-2 rounded-xl
            bg-white/10 hover:bg-white/20
            transition-all
          "
        >
          Sign out from all devices
        </button>
      </section>

      {/* DANGER ZONE */}
      <section
        className="
          p-6 rounded-3xl
          bg-red-500/10 backdrop-blur-xl
          border border-red-500/30
        "
      >
        <h2 className="text-lg font-semibold text-red-400 mb-2">
          Danger Zone
        </h2>

        <p className="text-white/60 mb-4">
          Permanently delete your account and all associated data.
        </p>

        <button
          disabled
          className="
            px-5 py-2 rounded-xl
            bg-red-500/30
            cursor-not-allowed
            opacity-60
          "
        >
          Delete Account (Coming Soon)
        </button>
      </section>

    </div>
  );
}
