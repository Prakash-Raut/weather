import type { WeatherData } from "@/types";
import { Droplets, Thermometer, Wind } from "lucide-react";

interface CurrentWeatherProps {
	data: WeatherData;
}

export const CurrentWeather: React.FC<CurrentWeatherProps> = ({ data }) => {
	return (
		<div className="bg-white rounded-xl p-6 shadow-lg">
			<h2 className="text-2xl font-bold text-gray-800 mb-2">
				{data.sys.country} - {data.name}
			</h2>
			<div className="flex items-center justify-between">
				<div className="flex items-center">
					<img
						src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
						alt={data.base}
						className="w-20 h-20"
					/>
					<div className="ml-4">
						<div className="text-4xl font-bold text-gray-800">
						{(data.main.temp / 10).toFixed(2)}°C
						</div>
						<div className="text-gray-600 capitalize">
							{data.weather[0].description}
						</div>
					</div>
				</div>
				<div className="space-y-2">
					<div className="flex items-center text-gray-600">
						<Thermometer className="w-5 h-5 mr-2" />
						<span>Feels like {(data.main.temp / 10).toFixed(2)}°C</span>
					</div>
					<div className="flex items-center text-gray-600">
						<Droplets className="w-5 h-5 mr-2" />
						<span>Humidity {data.main.humidity}%</span>
					</div>
					<div className="flex items-center text-gray-600">
						<Wind className="w-5 h-5 mr-2" />
						<span>Wind {data.wind.speed} km/h</span>
					</div>
				</div>
			</div>
		</div>
	);
};
