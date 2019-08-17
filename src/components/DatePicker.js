import React, { useState } from "react";
import DateFnsUtils from "@date-io/date-fns"; // choose your lib
import {
  DatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";

export default function DP() {
  const [selectedDate, handleDateChange] = useState(new Date());

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <DatePicker value={selectedDate} onChange={handleDateChange} />
    </MuiPickersUtilsProvider>
  );
}