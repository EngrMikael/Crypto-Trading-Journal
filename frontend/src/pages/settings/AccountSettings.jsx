import { useAuth } from "../../context/AuthContext";

export default function AccountSettings() {
  const { user } = useAuth();

  return (
    <div className="space-y-8">

      {/* PAGE HEADER */}
      <div>
        <h1 className="text-2xl font-semibold">Account</h1>
        <p className="text-white/60 mt-1">
          View and manage your account information.
        </p>
      </div>

      {/* ACCOUNT INFO */}
      <section
        className="
          p-6 rounded-3xl
          bg-white/10 backdrop-blur-xl
          border border-white/20
        "
      >
        <h2 className="text-lg font-semibold mb-4">Account Information</h2>

        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-white/60">Email</span>
            <span>{user?.email || "user@email.com"}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-white/60">Account Status</span>
            <span className="text-green-400">Active</span>
          </div>

          <div className="flex justify-between">
            <span className="text-white/60">Email Verified</span>
            <span className="text-yellow-300">Pending</span>
          </div>

          <div className="flex justify-between">
            <span className="text-white/60">Member Since</span>
            <span>—</span>
          </div>
        </div>
      </section>

      {/* EMAIL CHANGE (LOCKED FOR NOW) */}
      <section
        className="
          p-6 rounded-3xl
          bg-white/10 backdrop-blur-xl
          border border-white/20
        "
      >
        <h2 className="text-lg font-semibold mb-2">Email Address</h2>
        <p className="text-white/60 mb-4">
          Changing email requires verification.
        </p>

        <button
          disabled
          className="
            px-5 py-2 rounded-xl
            bg-white/10
            cursor-not-allowed
            opacity-60
          "
        >
          Change Email (Coming Soon)
        </button>
      </section>

      {/* ACCOUNT METADATA */}
      <section
        className="
          p-6 rounded-3xl
          bg-white/10 backdrop-blur-xl
          border border-white/20
        "
      >
        <h2 className="text-lg font-semibold mb-2">Account Metadata</h2>

        <p className="text-white/60 text-sm">
          This information is used internally for analytics and personalization.
        </p>

        <ul className="mt-3 text-sm space-y-1 text-white/70">
          <li>• Trader type: Not set</li>
          <li>• Strategy profile: Not analyzed yet</li>
          <li>• Risk score: Pending</li>
        </ul>
      </section>

    </div>
  );
}
