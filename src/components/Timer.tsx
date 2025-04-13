import { useEffect } from 'react';
import { Progress } from '@/components/ui/progress';

interface TimerProps {
  timeRemaining: number;
  onTimeUp: () => void;
}

export function Timer({ timeRemaining, onTimeUp }: TimerProps) {
  useEffect(() => {
    if (timeRemaining === 0) {
      onTimeUp();
    }
  }, [timeRemaining, onTimeUp]);

  return (
    <div className="w-full space-y-2">
      <div className="flex justify-between text-sm">
        <span>Time Remaining</span>
        <span>{timeRemaining}s</span>
      </div>
      <Progress value={(timeRemaining / 30) * 100} className="h-2" />
    </div>
  );
}