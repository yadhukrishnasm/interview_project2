import { Calendar } from "../components/ui/calendar";
import { ContinuousCalendar } from "../components/continousCalender";
import { useEffect, useState } from "react";
import { appointments } from "../assets/data/data";
import { XIcon } from "lucide-react";
import AddEditDialog from "../components/addEdit-dialog";

type Appointment = {
  doctorName: string;
  patientName: string;
  date: string;
  time: string;
};

export default function DashboardPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [allAppointments, setAllAppointments] =
    useState<Appointment[]>(appointments); // full list
  const [todaysAppointments, setTodaysAppointments] = useState<Appointment[]>(
    []
  );
  const [showDialog, setShowDialog] = useState(false);
  const [selectedDate, setSelelectedDate] = useState<string>("");

  const now = new Date();
  const formattedDate =
    now.getFullYear() +
    "-" +
    String(now.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(now.getDate()).padStart(2, "0");

  const handleDeleteAppointment = (index: number) => {
    const deletedItem = todaysAppointments[index];
    setAllAppointments((prev) =>
      prev.filter(
        (appt) =>
          !(
            appt.date === deletedItem.date &&
            appt.doctorName === deletedItem.doctorName &&
            appt.patientName === deletedItem.patientName &&
            appt.time === deletedItem.time
          )
      )
    );
  };

  const handleDayClick = (day: number, month: number, year: number) => {
    const selectedDateFormatted = `${year}-${String(month).padStart(
      2,
      "0"
    )}-${String(day).padStart(2, "0")}`;
    setSelelectedDate(selectedDateFormatted);
    setShowDialog(true);
  };

  useEffect(() => {
    const filtered = allAppointments.filter(
      (appointment) => appointment.date === formattedDate
    );
    setTodaysAppointments(filtered);
  }, [formattedDate, allAppointments]);

  return (
    <div className="p-4 h-full relative">
      {/* Main grid Container */}
      <div className="md:grid grid-cols-10 h-full gap-2">
        {/* Left Sidebar includes small calender view and today's tsk */}
        <div className="col-span-2 h-full border rounded-xl p-3 shadow  border-zinc-300 bg-white dark:bg-black dark:border-black md:block hidden">
          <div className=" h-full ">
            {/* small calender View */}
            <div className=" ">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(val) => {
                  setDate(val);
                  console.log(val);
                  const formatted = val
                    ? `${val.getFullYear()}-${String(
                        val.getMonth() + 1
                      ).padStart(2, "0")}-${String(val.getDate()).padStart(
                        2,
                        "0"
                      )}`
                    : "";
                  console.log(formatted);
                  setSelelectedDate(formatted || "");
                  setShowDialog(true);
                }}
                className="w-full"
              />
            </div>

            {/* ===================================================================================================================
                                        Today's appointments
=====================================================================================================================*/}
            <div className="p-3 space-y-3">
              <p className="font-semibold text-lg">Appointments Today</p>
              <div>
                {todaysAppointments.map((appointment, index) => (
                  <div
                    key={index}
                    className="mb-2 w-full  transition-all  py-2 px-4"
                  >
                    <div className="flex gap-5 items-center">
                      <p className="">{appointment.time}</p>
                      <div className="text-center flex-1">
                        <p className="font-semibold text-xl">
                          {appointment.patientName}
                        </p>
                        <p className="text-lg">{appointment.doctorName}</p>
                      </div>
                      <button
                        className="hover:scale-110"
                        onClick={() => {
                          handleDeleteAppointment(index);
                        }}
                      >
                        <XIcon className=" text-red-500 hover:scale-105" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/*===================Main Calender View============== */}
        <div className="col-span-8  h-full shadow  border-zinc-300 rounded-xl relative ">
          <div className="overflow-scroll h-[91vh] rounded-xl">
            <ContinuousCalendar
              onClick={(_day, _month, _year) => {
                handleDayClick(_day, _month + 1, _year);
              }}
            />
          </div>
        </div>
      </div>
      {!!selectedDate && (
        <AddEditDialog
          isOpen={showDialog}
          setIsOpen={setShowDialog}
          selectedDate={selectedDate}
        />
      )}
    </div>
  );
}
