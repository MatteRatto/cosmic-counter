tailwind.config = {
  theme: {
    extend: {
      colors: {
        neon: "#0ff",
        "bg-dark": "#000013",
      },
      animation: {
        "star-travel": "starTravel var(--duration) linear infinite",
        float: "floatEffect 8s ease-in-out infinite",
        "hex-move": "hexMove 20s linear infinite",
        "glow-pulse": "glowPulse 2s ease-in-out infinite",
        "plasma-move": "plasmaMove 15s linear infinite",
        "rings-rotate": "ringsRotate 20s linear infinite",
        "number-change": "numberChange 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
      },
      keyframes: {
        starTravel: {
          from: { transform: "translateZ(0) translateX(100vw)" },
          to: { transform: "translateZ(1000px) translateX(-100vw)" },
        },
        floatEffect: {
          "0%, 100%": { transform: "translateY(0) scale(1)" },
          "50%": { transform: "translateY(-20px) scale(1.02)" },
        },
        hexMove: {
          from: { transform: "translate(-50%, -50%) rotate(0deg)" },
          to: { transform: "translate(-50%, -50%) rotate(360deg)" },
        },
        glowPulse: {
          "0%, 100%": { opacity: "0.5", transform: "scale(1.05)" },
          "50%": { opacity: "1", transform: "scale(0.95)" },
        },
        plasmaMove: {
          "0%": { transform: "translate(-50%, -50%) rotate(0deg) scale(1)" },
          "50%": {
            transform: "translate(-50%, -50%) rotate(180deg) scale(1.2)",
          },
          "100%": {
            transform: "translate(-50%, -50%) rotate(360deg) scale(1)",
          },
        },
        ringsRotate: {
          from: { transform: "rotateX(60deg) rotateZ(0deg)" },
          to: { transform: "rotateX(60deg) rotateZ(360deg)" },
        },
        numberChange: {
          "0%": { transform: "scale(1) translateZ(0) rotate(0deg)" },
          "50%": { transform: "scale(1.2) translateZ(50px) rotate(5deg)" },
          "100%": { transform: "scale(1) translateZ(0) rotate(0deg)" },
        },
      },
    },
  },
};
