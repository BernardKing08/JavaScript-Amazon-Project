import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

export default function isWeekend(date) {
    const dayOfWeek = date.format('dddd');
    return dayOfWeek === 'Saturday' || dayOfWeek === 'Sunday';
}