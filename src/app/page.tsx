"use client";

import { CurrentWeather } from "@/components/current-weather";
import { SearchBar } from "@/components/search-bar";
import { getWeatherByCity, getWeatherByCoordinates } from "@/lib/api";
import type { Coordinates, WeatherData } from "@/types";
import { CloudSun } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

export default function Home() {
	const [weather, setWeather] = useState<WeatherData | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);

	const handleSearch = async (city: string) => {
		try {
			setLoading(true);
			setError(null);
			const data = await getWeatherByCity(city);
			setWeather(data);
		} catch (err) {
			setError("Failed to fetch weather data. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	const getCurrentLocation = useCallback(() => {
		if ("geolocation" in navigator) {
			navigator.geolocation.getCurrentPosition(
				async (position) => {
					const coords: Coordinates = {
						lat: position.coords.latitude,
						lon: position.coords.longitude,
					};
					try {
						setLoading(true);
						setError(null);
						const data = await getWeatherByCoordinates(coords);
						setWeather(data);
					} catch (err) {
						setError("Failed to fetch weather data. Please try again.");
					} finally {
						setLoading(false);
					}
				},
				() => {
					setError(
						"Unable to get your location. Please search for a city instead.",
					);
				},
			);
		}
	}, []);

	useEffect(() => {
		getCurrentLocation();
	}, [getCurrentLocation]);

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 py-8 px-4">
			<div className="max-w-4xl mx-auto">
				<div className="flex items-center justify-center mb-8">
					<CloudSun className="w-10 h-10 text-blue-600 mr-2" />
					<h1 className="text-3xl font-bold text-gray-800">Weather Forecast</h1>
				</div>

				<div className="flex justify-center mb-8">
					<SearchBar onSearch={handleSearch} />
				</div>

				{loading && (
					<div className="text-center text-gray-600">
						Loading weather data...
					</div>
				)}

				{error && (
					<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-center">
						{error}
					</div>
				)}

				{weather && !loading && (
					<div className="space-y-6">
						<CurrentWeather data={weather} />
					</div>
				)}
			</div>
		</div>
	);
}
