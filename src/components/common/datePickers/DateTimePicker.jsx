import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);
dayjs.locale('es');

const DateTimePicker = ({
    value,
    onChange,
    placeholder = 'Selecciona fecha y hora',
    format = 'DD MMM YYYY h:mm a',
    showTime = true,
    size = 'large',
    disabled = false,
    ...props
}) => {
    const defaultValue = dayjs();

    const handleChange = (date) => {
        if (onChange) {
            onChange(date);
        }
    };

    return (
        <DatePicker
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
            format={format}
            showTime={showTime ? { 
                format: 'h:mm a', 
                use12Hours: true,
                defaultValue: dayjs()
            } : false}
            size={size}
            disabled={disabled}
            style={{ width: '100%' }}
            defaultValue={defaultValue}
            {...props}
        />
    );
};

export default DateTimePicker;