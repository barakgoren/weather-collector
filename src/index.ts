import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db';
import { startScheduler } from './scheduler';
import { WeatherModel } from './models/weather.model';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (_req, res) => {
  res.send('🌤️ Weather Cron App is running');
});

// Optional: fetch last 10 records
app.get('/weather', async (_req, res) => {
  try {
    const recent = await WeatherModel.find()
      .sort({ timestamp: -1 })
      .limit(10);
    res.json(recent);
  } catch (err) {
    res.status(500).json({ error: 'Failed to load weather data' });
  }
});

const start = async () => {
  await connectDB();
  startScheduler();
  app.listen(PORT, () => {
    console.log(`📡 Server listening on http://localhost:${PORT}`);
    console.log(`ℹ️ API Version: 1.1`);
  });
};

start();
