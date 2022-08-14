import { IWeatherData, GetWeatherParams } from "types/weather";

import { handleResponse } from "functions/handle-response";

export const getWeather = async (params: GetWeatherParams): Promise<IWeatherData> => {
    const query = new URLSearchParams(params).toString();
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?${query}`, { method: 'GET' });
        const body: IWeatherData = await handleResponse<IWeatherData>(response);
        if (!body.main) {
            throw new Error(`Weather API didn't return any results.`);
        }
        return body;
    } catch (error) {
        throw error;
    };
};


