import * as React from 'react';                   
import dayjs from 'dayjs';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { useState } from 'react';

export default function MaterialUIPickers() {
  const [value, setValue] = useState(dayjs([]));
  const [x, setX] = useState(dayjs([]));

  const time = (e) => {
    setValue(e);
    // console.log("e value",e)
    console.log("date is ",e)
  };
  const date=(e)=>{
    setX(e);
    console.log("time is",e)
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack spacing={3}>
        <DesktopDatePicker
          label="Date"
          inputFormat="DD/MM/YYYY"
          value={value}
          onChange={time}
          renderInput={(params) => <TextField {...params} />}
        />
        
        <TimePicker
          label="Time"
          value={x}
          onChange={date}
          renderInput={(params) => <TextField {...params} />}
        />
        
      </Stack>
    </LocalizationProvider>
  );
}