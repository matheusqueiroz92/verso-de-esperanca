import { useState, useEffect } from "react";

export default function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-black/50 backdrop-blur rounded-lg p-4 text-center">
      <p className="text-lg text-white/90">{time.toLocaleDateString()}</p>
      <p className="text-2xl text-white">{time.toLocaleTimeString()}</p>
    </div>
  );
}
