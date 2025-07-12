import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { appointments, doctorNames, patientNames } from "../assets/data/data";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { Edit, XIcon } from "lucide-react";

interface Props {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  selectedDate: string;
}

type Appointment = {
  doctorName: string;
  patientName: string;
  date: string;
  time: string;
};

export default function AddEditDialog({
  isOpen,
  setIsOpen,
  selectedDate,
}: Props) {
  const [filteredAppointments, setFilteredAppointments] =
    useState<Appointment[]>([]);
  const [doctor, setDoctor] = useState("");
  const [patient, setPatient] = useState("");
  const [time, setTime] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  useEffect(() => {
    if (selectedDate) {
      const filtered = appointments.filter(
        (appointment) => appointment.date === selectedDate
      );
      setFilteredAppointments(filtered);
    }
  }, [selectedDate]);

  const resetForm = () => {
    setDoctor("");
    setPatient("");
    setTime("");
    setIsEditing(false);
    setEditingIndex(null);
  };

  const handleDeleteAppointment = (index: number) => {
    const updated = filteredAppointments.filter((_, i) => i !== index);
    setFilteredAppointments(updated);
    resetForm();
  };

  const handleEditAppointment = (index: number) => {
    const appointment = filteredAppointments[index];
    setDoctor(appointment.doctorName);
    setPatient(appointment.patientName);
    setTime(appointment.time);
    setEditingIndex(index);
    setIsEditing(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!doctor || !patient || !time) return;

    const updatedAppointment: Appointment = {
      doctorName: doctor,
      patientName: patient,
      time,
      date: selectedDate,
    };

    if (isEditing && editingIndex !== null) {
      // Update
      const updatedList = [...filteredAppointments];
      updatedList[editingIndex] = updatedAppointment;
      setFilteredAppointments(updatedList);
    } else {
      // Add
      setFilteredAppointments((prev) => [...prev, updatedAppointment]);
    }

    resetForm();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(val) => { setIsOpen(val); resetForm(); }}>
      <DialogContent className="md:h-[60vh] h-[80vh] flex flex-col overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-3xl sm:my-5">Appointments on {selectedDate}</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col md:flex-row gap-2 w-full justify-evenly my-3"
        >
          {/* Doctor names */}
          <Select value={doctor} onValueChange={setDoctor}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Doctor" />
            </SelectTrigger>
            <SelectContent>
              {doctorNames.map((doctor, index) => (
                <SelectItem key={index} value={doctor}>
                  {doctor}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Patient names */}
          <Select value={patient} onValueChange={setPatient}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Patient" />
            </SelectTrigger>
            <SelectContent>
              {patientNames.map((patient, index) => (
                <SelectItem key={index} value={patient}>
                  {patient}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Time input */}
          <Input
            value={time}
            onChange={(e) => setTime(e.target.value)}
            placeholder={`e.g. 9:30 PM`}
            className="w-full"
          />

          {/* submit button */}
          <Button size="lg" className="h-12 text-lg" type="submit">
            {isEditing ? "Update" : "Add"}
          </Button>
        </form>

        <div className="my-5  max-h-[40vh] overflow-scroll">
          {filteredAppointments.length === 0 ? (
            <p className="text-center text-zinc-500">No appointments</p>
          ) : (
            filteredAppointments.map((appointment, index) => (
              <div
                key={index}
                className="mb-3 w-full transition-all py-2 px-4 rounded-md hover:bg-accent"
              >
                <div className="flex w-full justify-evenly items-center">
                  <p className="text-lg text-left w-full">
                    {appointment.doctorName}
                  </p>
                  <p className="text-lg text-left w-full">
                    {appointment.patientName}
                  </p>
                  <p className="text-left w-full text-lg">{appointment.time}</p>
                  <div className="flex gap-5">
                    <button
                      type="button"
                      className="hover:scale-110"
                      onClick={() => handleEditAppointment(index)}
                    >
                      <Edit className="text-green-500 hover:scale-105 size-7" />
                    </button>
                    <button
                      type="button"
                      className="hover:scale-110"
                      onClick={() => handleDeleteAppointment(index)}
                    >
                      <XIcon className="text-red-500 hover:scale-105 size-7" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
