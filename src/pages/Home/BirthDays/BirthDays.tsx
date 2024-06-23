import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { useAppSelector } from '../../../hooks/useRedux/useAppRedux';
import { RootState } from '../../../store';
import moment from 'moment';

const BirthDays = () => {
  const { users } = useAppSelector((state: RootState) => state.application);
  const [upcomingBirthdays, setUpcomingBirthdays] = useState<string[]>([]);

  useEffect(() => {
    const momentDates: moment.Moment[] = users.map(dateStr => moment(dateStr.DateOfBirth));

    const today: moment.Moment = moment();

    const getNextBirthday = (birthday: moment.Moment): moment.Moment => {
      const thisYearBirthday = birthday.clone().year(today.year());
      if (thisYearBirthday.isBefore(today)) {
        thisYearBirthday.add(1, 'year');
      }
      return thisYearBirthday;
    };

    const sortedBirthdays = momentDates.sort((a, b) => {
      const nextA = getNextBirthday(a);
      const nextB = getNextBirthday(b);
      return nextA.diff(today) - nextB.diff(today);
    });

    const sortedBirthdayStrings: string[] = sortedBirthdays.map(date => date.toISOString());

    setUpcomingBirthdays(sortedBirthdayStrings);
  }, [users]);
  console.log("upcomingBirthdays",upcomingBirthdays);
  
  return (
    <Box sx={{ alignItems: "center", minWidth: 300, maxWidth: 350, pl: 2, pr: 2, display: 'flex', flexGrow: 1, flexDirection: 'column', alignContent: 'center'}}>
      BirthDays
    </Box>
  );
};

export default BirthDays;
