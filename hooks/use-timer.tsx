"use client";

import { useCallback, useEffect, useState } from "react";

type TimerMode = "focus" | "break";

// Set Duration
const focusTime = 25;
const breakTime = 5;

export default function useTimer() {
  const [mode, setMode] = useState<TimerMode>("focus");
  const [timeLeft, setTimeLeft] = useState(focusTime * 60); // Covert to Seconds
  const [isActive, setIsActive] = useState<boolean>(false);
  const [sessions, setSessions] = useState(0);

  const getDuration = useCallback((timerMode: TimerMode) => {
    return timerMode === "focus" ? focusTime * 60 : breakTime * 60;
  }, []);

  const resetTime = () => {
    setIsActive(false);
    setTimeLeft(getDuration(mode));
  };

  const toggleTimer = () => {
    setIsActive((prev) => !prev);
  };

  const switchMode = useCallback(() => {
    const newMode = mode === "focus" ? "break" : "focus";
    setMode(newMode);
    setTimeLeft(getDuration(newMode));
    setIsActive(false);

    // Session Increment Logic
    if (mode === "focus") {
        setSessions((prev) => prev + 1);
    }

  }, [mode, getDuration]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          return prev - 1;
        });
      }, 1000);
    } else if (interval) {
      clearInterval(interval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive]);

  // Auto-switch Mode When Timer Reaches 0
  useEffect(() => {
    if (timeLeft === 0) {
      switchMode();
    }
  }, [timeLeft, switchMode]);

  return {
    mode,
    timeLeft,
    toggleTimer,
    isActive,
    resetTime,
    switchMode,
    sessions,
  };
}
