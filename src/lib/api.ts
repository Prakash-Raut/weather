import type { Coordinates, WeatherData } from "@/types";
import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export const getWeatherByCity = async (city: string): Promise<WeatherData> => {
	try {
		const geoResponse = await axios.get(
			`${BASE_URL}/weather?q=${city}&appid=${API_KEY}`,
		);

		if (!geoResponse.data) {
			throw new Error("City not found");
		}

		const { lat, lon } = geoResponse.data.coord;

		console.log("COORD::", lat, lon);

		return getWeatherByCoordinates({ lat, lon });
	} catch (error) {
		throw new Error("Failed to fetch weather data");
	}
};

export const getWeatherByCoordinates = async ({
	lat,
	lon,
}: Coordinates): Promise<WeatherData> => {
	try {
		const response = await axios.get(
			`${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`,
		);

		console.log("Weather Data::", response.data);

		return response.data;
	} catch (error) {
		throw new Error("Failed to fetch weather data");
	}
};
