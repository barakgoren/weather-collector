import axios from 'axios';
import { WeatherModel } from '../models/weather.model';
import dotenv from 'dotenv';
dotenv.config();

const API_KEY = process.env.WEATHER_API_KEY!;
const CITY    = 'Tel Aviv';

export const fetchAndSaveWeather = async () => {
  try {
    const { data } = await axios.get(
      'https://api.openweathermap.org/data/2.5/weather',
      { params: { q: CITY, appid: API_KEY, units: 'metric' } }
    );

    const weather = new WeatherModel({
      city:        data.name,
      temperature: data.main.temp,
      humidity:    data.main.humidity,
      description: data.weather[0].description,
      timestamp:   new Date(),
    });

    await weather.save();
    console.log(`🕒 [${new Date().toISOString()}] Weather saved: ${weather.temperature}°C, ${weather.description}`);
  } catch (err) {
    console.error('❌ fetchAndSaveWeather error:', err);
  }
};
