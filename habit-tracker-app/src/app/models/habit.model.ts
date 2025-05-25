export interface Habit {
  id: number;
  name: string;
  description?: string;
  icon?: string;
  color?: string;
  daysOfWeek?: string[];
  progress: boolean[]; 
  goal: number;      
  isActive: boolean;
  isExpired: boolean;
  createdAt: Date;
  updatedAt: Date;
}
