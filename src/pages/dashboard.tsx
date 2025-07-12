import { Calendar } from "../components/ui/calendar";
import { ContinuousCalendar } from "../components/continousCalender";
import { useState } from "react";

export default function DashboardPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  return (
    <div className="p-4 h-full relative">
      {/* Main grid Container */}
      <div className="grid grid-cols-10 h-full gap-2">
        {/* Left Sidebar includes small calender view and today's tsk */}
        <div className="col-span-2 h-full border rounded-xl p-3 shadow  border-zinc-300 bg-white">
          <div className=" h-full ">
            {/* small calender View */}
            <div className=" ">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="w-full"
              />
            </div>
            {/* Today's Task */}
            <div className="p-4">
              <p className="font-semibold text-lg">Appointments Today</p>
              <div>
                
              </div>
            </div>
          </div>
        </div>

        {/*===================Main View for doctors and appointments============== */}
        <div className="col-span-8  h-full shadow  border-zinc-300 rounded-xl relative ">
          <div className="overflow-scroll h-[91vh] rounded-xl">
            <ContinuousCalendar />
          </div>
        </div>
      </div>
    </div>
  );
}
