import { format } from "date-fns";

export function generateTimeSlots(start: string, end: string): string[] {
  const [startHour, startMinute] = start.split(":").map(Number);
  const [endHour, endMinute] = end.split(":").map(Number);

  const slots: string[] = [];
  const current = new Date();
  current.setHours(startHour, startMinute, 0, 0);

  const endTime = new Date();
  endTime.setHours(endHour, endMinute, 0, 0);

  while (current < endTime) {
    slots.push(format(current, "h:mm a"));
    current.setMinutes(current.getMinutes() + 30);
  }
  return slots;
}
