import * as React from "react";
import dayjs, { Dayjs } from "dayjs";
import Badge from "@mui/material/Badge";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import {
  PickersDay,
  type PickersDayProps,
} from "@mui/x-date-pickers/PickersDay";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import "../../index.css";

/** Custom Day component */
interface ServerDayProps extends Omit<PickersDayProps, "day"> {
  day: Dayjs;
  highlightedDays?: string[];
  onDayClick?: (day: Dayjs) => void;
}

function ServerDay(props: ServerDayProps) {
  const {
    highlightedDays = [],
    day,
    outsideCurrentMonth,
    onDayClick,
    ...other
  } = props;

  const formattedDate = day.format("YYYY-MM-DD");
  const isHighlighted =
    !outsideCurrentMonth && highlightedDays.includes(formattedDate);
  const isToday = day.isSame(dayjs(), "day");
  const isSelected = isHighlighted || isToday;

  return (
    <Badge
      key={formattedDate}
      //overlap="circular"
      badgeContent={
        isHighlighted ? <DoneAllIcon sx={{ color: "#563A9C" }} /> : undefined
      }
    >
      <PickersDay
        {...other}
        day={day}
        outsideCurrentMonth={outsideCurrentMonth}
        onClick={() => onDayClick?.(day)}
        selected={isSelected} // <-- important to tell MUI this day is selected
        sx={{
          ...(isSelected && {
            backgroundColor: "#563A9C !important",
            color: "#fff !important",
            fontWeight: 500,
            "&:hover": {
              backgroundColor: "#563A9C !important",
            },
          }),
        }}
      />
    </Badge>
  );
}

/** Main Calendar Component */
export default function DateCalendarServerRequest() {
  const [highlightedDays, setHighlightedDays] = React.useState<string[]>([]);

  /** Handle click to toggle highlight */
  const handleDayClick = (day: Dayjs) => {
    const formatted = day.format("YYYY-MM-DD");
    setHighlightedDays((prev) =>
      prev.includes(formatted)
        ? prev.filter((d) => d !== formatted)
        : [...prev, formatted]
    );
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        defaultValue={dayjs()}
        slots={{
          day: ServerDay,
        }}
        slotProps={{
          day: {
            highlightedDays,
            onDayClick: handleDayClick,
          } as Partial<ServerDayProps>,
        }}
      />
    </LocalizationProvider>
  );
}