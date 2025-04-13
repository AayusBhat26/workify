"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { hi, enIN } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
interface Props{
  onUpdateForm: (e:DateRange |undefined) =>void;
}
export function TaskCalendar({
  className, onUpdateForm
}: React.HTMLAttributes<HTMLDivElement> & Props) {
  const [date, setDate] = useState<DateRange | undefined>(undefined);
  const onSelectDateChange = (date: DateRange | undefined)=>{
    setDate(date);
    onUpdateForm(date);
  }
  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button id="date" size="sm" variant="outline" className={cn("w-fit h-fit text-xs justify-start text-left font-normal px-2.5 py-0.5")}>
            <CalendarIcon size={16} className="mr-2 w-3 h-3" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "dd LLL y", { locale: enIN })} --{" "}
                  {format(date.to, "dd LLL y", { locale: hi })}
                </>
              ) : (
                format(date.from, "dd LLL y", { locale: hi })
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="center">
          <Calendar initialFocus mode="range" defaultMonth={date?.from} selected={date} onSelect={onSelectDateChange} locale={enIN} numberOfMonths={1}/>
        </PopoverContent>
      </Popover>
    </div>
  );
}
