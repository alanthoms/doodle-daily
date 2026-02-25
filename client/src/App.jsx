import React, { useState, useEffect } from "react";
import { Timer, Camera, Lock, CheckCircle } from "lucide-react";

function App() {
  const [secondsLeft, setSecondsLeft] = useState(300); // 5 minutes
  const [isActive, setIsActive] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0) {
      setIsFinished(true);
      setIsActive(false);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, secondsLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 font-sans">
      {/* Daily Prompt Header */}
      <div className="text-center mb-12">
        <p className="text-slate-500 uppercase tracking-widest text-sm font-bold">
          Today's Prompt
        </p>
        <h1 className="text-4xl font-black text-slate-900 mt-2">
          "A Lonely Coffee Cup"
        </h1>
      </div>

      {/* The Big Timer Circle */}
      <div
        className={`w-64 h-64 rounded-full border-8 flex flex-col items-center justify-center transition-all duration-500 ${isActive ? "border-blue-500 bg-white shadow-xl" : "border-slate-200 bg-slate-100"}`}
      >
        <Timer
          size={32}
          className={
            isActive ? "text-blue-500 animate-pulse" : "text-slate-400"
          }
        />
        <span className="text-5xl font-mono font-bold text-slate-800 mt-2">
          {formatTime(secondsLeft)}
        </span>
      </div>

      {/* Action Buttons */}
      <div className="mt-12 w-full max-w-xs space-y-4">
        {!isActive && !isFinished && (
          <button
            onClick={() => setIsActive(true)}
            className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold text-lg hover:bg-slate-800 transition-transform active:scale-95"
          >
            Start Drawing
          </button>
        )}

        {isActive && (
          <p className="text-center text-slate-500 font-medium animate-bounce">
            Keep going! Don't stop yet.
          </p>
        )}

        {isFinished ? (
          <button className="w-full bg-green-500 text-white py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-green-600 transition-all">
            <Camera size={24} />
            Upload Your Sketch
          </button>
        ) : (
          <div className="flex items-center justify-center gap-2 text-slate-400 text-sm italic">
            <Lock size={14} />
            Upload unlocks after 5 minutes
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
