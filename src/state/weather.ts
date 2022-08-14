import { IWeatherContext, IWeatherState } from "types/weather";

export const weather: IWeatherState = {
    weatherData: null,
    loading: false,
    errors: [],
};

export const weatherContext: IWeatherContext = {
    state: weather,
    dispatch: () => null,
    getWeatherInfo: () => () => null,
};
