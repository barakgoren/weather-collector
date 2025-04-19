import { Schema, model, Document } from 'mongoose';

export interface IWeather extends Document {
  city: string;
  temperature: number;
  humidity: number;
  description: string;
  timestamp: Date;
}

const weatherSchema = new Schema<IWeather>({
  city:        { type: String,  required: true },
  temperature: { type: Number,  required: true },
  humidity:    { type: Number,  required: true },
  description: { type: String,  required: true },
  timestamp:   { type: Date,    required: true, default: Date.now },
});

export const WeatherModel = model<IWeather>('Weather', weatherSchema);
