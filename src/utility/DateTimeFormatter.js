import { format, parseISO } from 'date-fns';
import {  fromZonedTime,toZonedTime} from 'date-fns-tz';

//const MyDatePicker = () => {
 // const [selectedDate, setSelectedDate] = useState(null);
  //const timeZone = 'Europe/Paris'; // Adjust for GMT+1

//   const handleDateChange = (date) => {
//     // Convert the selected date to the desired timezone
//     const utcDate = zonedTimeToUtc(date, timeZone);
//     setSelectedDate(utcDate);
//   };

  
    
    //   <DatePicker
    //     selected={selectedDate ? utcToZonedTime(selectedDate, timeZone) : null}
    //     onChange={handleDateChange}
    //     showTimeSelect
    //     timeFormat="HH:mm"
    //     timeIntervals={15}
    //     dateFormat="yyyy-MM-dd HH:mm"
    //     placeholderText="Select date"
    //   />
     
 



export const timeZone=  Intl.DateTimeFormat().resolvedOptions().timeZone;

/**
 * returns the equivalent Date in the current system time zone and the equivalent UTC time internally
 */
export const convertZonedTimeToUTC =(selectedDate )=>{

    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const dateInUTC=   fromZonedTime(selectedDate, timeZone)

    const formatedDate = format(dateInUTC , 'dd-MM-yyyy HH:mm' , {timeZone});

    return formatedDate;
};

export const convertUtcToZonedTime=(selectedDate)=>{
     
     const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
     const zonedTime = toZonedTime(selectedDate, timeZone);

     const formatedDate = format(zonedTime , 'dd-MM-yyyy HH:mm' , {timeZone});

    return formatedDate;
}

// console.log(convertZonedTimeToUTC(new Date('28-10-2024').getTime()))