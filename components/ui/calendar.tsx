"use client";

import * as React from "react";
import { DayPicker } from "react-day-picker";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({ className, showOutsideDays = true, ...props }: CalendarProps) {
  const [month, setMonth] = React.useState(new Date());

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const years = Array.from({ length: 130 }, (_, i) => new Date().getFullYear() - 110 + i);

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      month={month}
      onMonthChange={setMonth}
      className={cn("p-3", className)}
      classNames={{
        caption: "flex justify-center items-center space-x-2",
        table: "w-full border-collapse",
        head_row: "flex",
        head_cell: "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: cn(
          "relative p-0 text-center text-sm focus-within:relative focus-within:z-20",
          "[&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50"
        ),
        day: cn(buttonVariants({ variant: "ghost" }), "h-8 w-8 p-0 font-normal aria-selected:opacity-100"),
        day_outside: "text-gray-400", // grey out outside days
      }}
      components={{
        Caption: ({ displayMonth }) => (
          <div className="flex space-x-2 mb-2">
            {/* Month Dropdown */}
            <select
              className="border rounded-md px-2 py-1 text-sm"
              value={displayMonth.getMonth()}
              onChange={(e) => setMonth(new Date(displayMonth.getFullYear(), Number(e.target.value))) }
            >
              {months.map((monthName, index) => (
                <option key={monthName} value={index}>
                  {monthName}
                </option>
              ))}
            </select>
            {/* Year Dropdown */}
            <select
              className="border rounded-md px-2 py-1 text-sm"
              value={displayMonth.getFullYear()}
              onChange={(e) => setMonth(new Date(Number(e.target.value), displayMonth.getMonth())) }
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        ),
      }}
      {...props}
    />
  );
}

Calendar.displayName = "Calendar";

export { Calendar };
