import { useState } from "react";

export default function ProfileSettings() {
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [name, setName] = useState("John Doe");
  const [bio, setBio] = useState("");
  const [traderType, setTraderType] = useState("Swing Trader");

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="space-y-10">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-semibold">Profile Settings</h1>
        <p className="text-white/60 text-sm">
          Manage your personal information and public profile.
        </p>
      </div>

      {/* AVATAR CARD */}
      <div className="
        flex items-center gap-6 p-6 rounded-2xl
        bg-white/10 backdrop-blur-xl
        border border-white/20 shadow-lg
      ">
        <div className="relative">
          <div className="
            w-24 h-24 rounded-full overflow-hidden
            bg-white/20 flex items-center justify-center
            border border-white/30
          ">
            {avatarPreview ? (
              <img
                src={avatarPreview}
                alt="Avatar Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-white/50 text-sm">No Image</span>
            )}
          </div>
        </div>

        <div>
          <label className="block">
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="hidden"
            />
            <span className="
              cursor-pointer inline-block
              px-4 py-2 rounded-xl
              bg-white/20 hover:bg-white/30
              transition text-sm
            ">
              Change Avatar
            </span>
          </label>

          <p className="text-xs text-white/50 mt-2">
            JPG, PNG — max 2MB (mock upload)
          </p>
        </div>
      </div>

      {/* PROFILE INFO */}
      <div className="
        grid grid-cols-1 md:grid-cols-2 gap-6
        p-6 rounded-2xl
        bg-white/10 backdrop-blur-xl
        border border-white/20 shadow-lg
      ">
        {/* DISPLAY NAME */}
        <div>
          <label className="block text-sm text-white/70 mb-1">
            Display Name
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="
              w-full px-4 py-2 rounded-xl
              bg-white/20 border border-white/30
              focus:outline-none focus:ring-2 focus:ring-cyan-400/40
            "
          />
        </div>

        {/* EMAIL */}
        <div>
          <label className="block text-sm text-white/70 mb-1">
            Email
          </label>
          <input
            value="youremail@example.com"
            disabled
            className="
              w-full px-4 py-2 rounded-xl
              bg-white/10 border border-white/20
              text-white/50 cursor-not-allowed
            "
          />
        </div>

        {/* BIO */}
        <div className="md:col-span-2">
          <label className="block text-sm text-white/70 mb-1">
            Bio
          </label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={4}
            placeholder="Tell us about your trading style..."
            className="
              w-full px-4 py-2 rounded-xl
              bg-white/20 border border-white/30
              focus:outline-none focus:ring-2 focus:ring-cyan-400/40
              resize-none
            "
          />
        </div>

        {/* TRADER TYPE (FUTURE FEATURE) */}
        <div>
          <label className="block text-sm text-white/70 mb-1">
            Trader Type
          </label>
          <select
            value={traderType}
            disabled
            className="
              w-full px-4 py-2 rounded-xl
              bg-white/10 border border-white/20
              text-white/50 cursor-not-allowed
            "
          >
            <option>Swing Trader</option>
            <option>Day Trader</option>
            <option>Scalper</option>
            <option>Position Trader</option>
          </select>
          <p className="text-xs text-white/40 mt-1">
            Available once analytics is enabled
          </p>
        </div>
      </div>

      {/* ACTIONS */}
      <div className="flex justify-end">
        <button
          disabled
          className="
            px-6 py-2 rounded-xl
            bg-cyan-500/40 text-white/70
            cursor-not-allowed
          "
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
