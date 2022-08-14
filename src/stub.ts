import { IGeocodingData } from "./types/geocoding";
import { IWeatherData } from "./types/weather";

export const testWeatherData: IWeatherData = {
    coord: { lon: 1, lat: 1 },
    weather: [{
        id: 0,
        main: '',
        description: '',
        icon: '',
    }],
    base: '',
    main: {
        temp: 0,
        feels_like: 0,
        temp_min: 0,
        temp_max: 0,
        pressure: 0,
        humidity: 0,
        sea_level: 0,
        grnd_level: 0,
    },
    dt: 0,
    sys: {
        type: 0,
        id: 0,
        message: 0,
        country: '',
        sunrise: 0,
        sunset: 0,
    },
    timezone: 0,
    id: 0,
    name: '',
    cod: 0,
    visibility: 0,
    wind: {
        speed: 0,
        deg: 0,
        gust: 0,
    },
    rain: {
        '1h': 0,
        '3h': 0,
    },
    snow: {
        '1h': 0,
        '3h': 0,
    },
    clouds: {
        all: 0,
    },
};

export const testGeocodingData: IGeocodingData = {
    name: '',
    local_names: {},
    lat: 1,
    lon: 1,
    country: '',
};
