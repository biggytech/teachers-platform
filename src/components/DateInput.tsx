import React, {
  useState,
} from "react";
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import TextField from '@mui/material/TextField';

interface DateInputProps {
  label: string;
  value: any;
  name: string;
}

const DateInput: React.FC<DateInputProps> = ({ label, value, name }) => {
  const [innerValue, setInnerValue] = useState(value)

  return <LocalizationProvider dateAdapter={AdapterDateFns}><DesktopDatePicker
    label={label}
    inputFormat="MM/dd/yyyy"
    value={innerValue}
    onChange={setInnerValue}
    renderInput={(params) => <TextField {...params} inputProps={{
      ...(params.inputProps ?? {}),
      'data-input-name': name,
      'name': name,
    }} />}

  /></LocalizationProvider>
}

export default DateInput