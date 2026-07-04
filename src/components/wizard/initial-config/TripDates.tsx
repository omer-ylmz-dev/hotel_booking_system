import Input from '../../common/Input';

interface TripDatesProps {
  startDate: string;
  durationDays: number;
  onStartDateChange: (startDate: string) => void;
  onDurationChange: (durationDays: number) => void;
  durationInvalid?: boolean;
  errorId?: string;
}

export default function TripDates({
  startDate,
  durationDays,
  onStartDateChange,
  onDurationChange,
  durationInvalid = false,
  errorId
}: TripDatesProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Input
        id="start-date"
        name="startDate"
        label="Start Date"
        type="date"
        value={startDate}
        onChange={(e) => onStartDateChange(e.target.value)}
        required
      />
      <Input
        id="duration-days"
        name="durationDays"
        label="Number of Days"
        type="number"
        min={1}
        max={14}
        value={durationDays}
        onChange={(e) => onDurationChange(parseInt(e.target.value) || 0)}
        required
        aria-invalid={durationInvalid || undefined}
        aria-describedby={durationInvalid ? errorId : undefined}
      />
    </div>
  );
}
