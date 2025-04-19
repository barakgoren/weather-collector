import cron from 'node-cron';
import { fetchAndSaveWeather } from './services/weather.service';

// Runs at minute 0 of hours 7, 13 and 19 every day (Israel time)
cron.schedule('0 7,13,19 * * *', () => {
  console.log('🔄 Running scheduled weather fetch…');
  fetchAndSaveWeather();
}, {
  timezone: 'Asia/Jerusalem'
});

export const startScheduler = () => {
  console.log('🚀 Scheduler started (07:00, 13:00, 19:00 IST)');
};
