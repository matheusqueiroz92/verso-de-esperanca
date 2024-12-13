import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Clock as ClockIcon } from "lucide-react";

export default function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <Card className="bg-black/30 backdrop-blur border-white/10">
      <div className="p-4 flex flex-col items-center space-y-1">
        <div className="flex items-center gap-2 text-white/70">
          <ClockIcon className="h-4 w-4" />
          {time.toLocaleDateString("pt-BR", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </div>
        <p className="text-2xl font-bold text-white">
          {time.toLocaleTimeString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          })}
        </p>
      </div>
    </Card>
  );
}
