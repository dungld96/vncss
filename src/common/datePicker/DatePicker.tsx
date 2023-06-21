import * as React from 'react';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker as DatePickerBase } from '@mui/x-date-pickers/DatePicker';
import { Box, Typography } from '@mui/material';
import 'dayjs/locale/en';

const reformatDateString = (s: string) => {
  var b = s.split(/\D/);
  return b.reverse().join('-');
};

interface Props {
  fullWidth?: boolean;
  minDate?: any;
  maxDate?: any;
  date: string | null;
  topLable?: string;
  format?: string;
  onChange?: (date: any) => void;
  showError?: boolean;
  error?: string;
  [key: string]: any;
}

const DatePickers: React.FC<Props> = (props) => {
  const { date, maxDate, minDate, format = 'DD/MM/YYYY', error, onChange, showError, topLable, style, ...rest } = props;

  const [isTouched, setIsTouched] = React.useState(false);
  const touched = React.useRef(false);

  React.useEffect(() => {
    if (showError) touched.current = true;
  }, [showError]);

  const helperText = (touched.current || isTouched) && !!error ? error : undefined;

  return (
    <Box>
      {topLable && (
        <Typography
          sx={{
            fontWeight: 400,
            fontSize: '12px',
            lineHeight: '20px',
            padding: 0,
            marginTop: '20px',
            marginBottom: '8px',
          }}
        >
          {topLable}
        </Typography>
      )}
      <LocalizationProvider adapterLocale="en" dateAdapter={AdapterDayjs}>
        <DatePickerBase
          {...rest}
          closeOnSelect
          value={date ? dayjs(reformatDateString(date)) : null}
          onChange={(e) => {
            onChange?.(dayjs(e).format(format));
          }}
          format={format}
          onSelectedSectionsChange={(e) => {
            setIsTouched(e === null);
          }}
          onClose={() => setIsTouched(true)}
          onOpen={() => setIsTouched(false)}
          slotProps={{
            textField: {
              helperText: helperText,
            },
          }}
          sx={{
            ...style,
            '& .MuiOutlinedInput-notchedOutline': {
              border: '1px solid #d9d9d9',
              '&.Mui-error': {
                borderColor: '#EEF2FA !important',
              },
            },
            '& .MuiInputBase-root': {
              borderRadius: '8px',
              height: '44px',
              color: '#1E2323',
              fontWeight: '500',
              fontSize: '14px',
            },
            '& .MuiFormHelperText-root': {
              color: '#ec0e0e',
            },
            input: {
              '&::placeholder': {
                color: '#777777',
              },
              '&:-webkit-autofill': {
                transition: ' background-color 5000s ease-in-out 0s',
              },
            },
          }}
        />
      </LocalizationProvider>
    </Box>
  );
};

export default DatePickers;
