import cron from 'node-cron';
import { fetchAndSaveWeather } from './services/weather.service';
import dotenv from 'dotenv';

dotenv.config();

const CRON_SCHEDULE = process.env.CRON_SCHEDULE || '0 7,13,19 * * *';

// Runs at minute 0 of hours 7, 13 and 19 every day (Israel time)
cron.schedule(CRON_SCHEDULE, () => {

    console.log('🔄 Running scheduled weather fetch…');
    fetchAndSaveWeather();
}, {
    timezone: 'Asia/Jerusalem'
});

export const startScheduler = () => {
    console.log('🕒 Scheduler status: ', CRON_SCHEDULE);
    console.log('🚀 Scheduler started (07:00, 13:00, 19:00 IST)');
};
