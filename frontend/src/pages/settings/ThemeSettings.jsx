import { useEffect, useState } from "react";

const ACCENTS = [
  { name: "Cyan", value: "cyan" },
  { name: "Emerald", value: "emerald" },
  { name: "Violet", value: "violet" },
  { name: "Rose", value: "rose" },
];

export default function ThemeSettings() {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "dark"
  );
  const [accent, setAccent] = useState(
    localStorage.getItem("accent") || "cyan"
  );

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("accent", accent);
    document.documentElement.dataset.accent = accent;
  }, [accent]);

  return (
    <div className="space-y-8">

      {/* PAGE HEADER */}
      <div>
        <h1 className="text-2xl font-semibold">Appearance</h1>
        <p className="text-white/60 mt-1">
          Customize how the app looks and feels.
        </p>
      </div>

      {/* THEME MODE */}
      <section
        className="
          p-6 rounded-3xl
          bg-white/10 backdrop-blur-xl
          border border-white/20
        "
      >
        <h2 className="text-lg font-semibold mb-4">Theme Mode</h2>

        <div className="flex gap-4">
          {["dark", "light"].map((mode) => (
            <button
              key={mode}
              onClick={() => setTheme(mode)}
              className={`
                px-5 py-2 rounded-xl transition-all
                ${theme === mode
                  ? "bg-white/30"
                  : "bg-white/10 hover:bg-white/20"}
              `}
            >
              {mode === "dark" ? "Dark" : "Light"}
            </button>
          ))}
        </div>
      </section>

      {/* ACCENT COLOR */}
      <section
        className="
          p-6 rounded-3xl
          bg-white/10 backdrop-blur-xl
          border border-white/20
        "
      >
        <h2 className="text-lg font-semibold mb-4">Accent Color</h2>

        <div className="flex gap-4 flex-wrap">
          {ACCENTS.map((a) => (
            <button
              key={a.value}
              onClick={() => setAccent(a.value)}
              className={`
                px-4 py-2 rounded-xl text-sm transition-all
                ${accent === a.value
                  ? "bg-white/30"
                  : "bg-white/10 hover:bg-white/20"}
              `}
            >
              {a.name}
            </button>
          ))}
        </div>
      </section>

      {/* PREVIEW */}
      <section
        className="
          p-6 rounded-3xl
          bg-white/10 backdrop-blur-xl
          border border-white/20
        "
      >
        <h2 className="text-lg font-semibold mb-2">Preview</h2>
        <p className="text-white/60 text-sm mb-4">
          Accent color preview (static for now).
        </p>

        <button
          className="
            px-6 py-2 rounded-xl
            bg-cyan-500/80 hover:bg-cyan-500
            text-black font-medium
          "
        >
          Sample Button
        </button>
      </section>

    </div>
  );
}
