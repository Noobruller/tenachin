"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface UseMotionSensorProps {
  onStep: () => void;
}

export function useMotionSensor({ onStep }: UseMotionSensorProps) {
  const [sensorAvail,  setSensorAvail]  = useState(false);
  const [sensorActive, setSensorActive] = useState(false);
  const accelBuf   = useRef<number[]>([]);
  const lastStepTs = useRef<number>(0);

  const handleMotion = useCallback(
    (e: DeviceMotionEvent) => {
      const acc = e.accelerationIncludingGravity ?? e.acceleration;
      if (!acc) return;
      const mag = Math.sqrt(
        (acc.x ?? 0) ** 2 + (acc.y ?? 0) ** 2 + (acc.z ?? 0) ** 2
      );
      accelBuf.current.push(mag);
      if (accelBuf.current.length > 10) accelBuf.current.shift();
      const avg =
        accelBuf.current.reduce((a, b) => a + b, 0) / accelBuf.current.length;
      const now = Date.now();
      if (mag > avg + 3.5 && now - lastStepTs.current > 350) {
        lastStepTs.current = now;
        onStep();
      }
    },
    [onStep]
  );

  const startSensor = useCallback(() => {
    if (typeof DeviceMotionEvent === "undefined") return;
    const go = () => {
      window.addEventListener("devicemotion", handleMotion, true);
      setSensorActive(true);
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (typeof (DeviceMotionEvent as any).requestPermission === "function") {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (DeviceMotionEvent as any)
        .requestPermission()
        .then((r: string) => { if (r === "granted") go(); })
        .catch(() => {});
    } else {
      go();
    }
  }, [handleMotion]);

  const stopSensor = useCallback(() => {
    window.removeEventListener("devicemotion", handleMotion, true);
    setSensorActive(false);
  }, [handleMotion]);

  useEffect(() => {
    setSensorAvail(typeof DeviceMotionEvent !== "undefined");
    return () => window.removeEventListener("devicemotion", handleMotion, true);
  }, [handleMotion]);

  return { sensorAvail, sensorActive, startSensor, stopSensor };
}
