export interface Habit {
  id: number;
  name: string;
  description?: string;
  icon: string;
  color: string;
  progress: boolean[];
  goal: number;
  group: string;
  isActive: boolean;
  isExpired: boolean;
  startDate: Date;
  endDate: Date | null;
}