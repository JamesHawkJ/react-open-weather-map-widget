import { FETCH_ACTIONS, TEST_ACTIONS } from "constants/action-types";

import { ICoords } from "./geocoding";

export interface IFetchWeatherAction {
    type: FETCH_ACTIONS | TEST_ACTIONS;
    payload?: IWeatherData | string;
};

export interface IWeatherQuery {
    city: string;
    appid: string;
};

export interface IWeatherState {
    weatherData: IWeatherData | null;
    loading: boolean;
    errors: string[];
};

export interface IWeatherData {
    coord: ICoords;
    weather: IWeatherConditionCode[];
    base: string;
    main: IMainWeatherData;
    visibility?: number; // Visibility, meter. The maximum value of the visibility is 10km
    wind?: IWindData;
    clouds?: ICloudData;
    dt: number; // Time of data calculation, unix, UTC
    sys: ISysData;
    timezone: number; // hift in seconds from UTC
    id: number; // City ID
    name: string; // City name
    cod: number;
    rain?: IRainSnowData;
    snow?: IRainSnowData;
};

interface IRainSnowData {
    '1h': number; // Rain/Snow volume for the last 1 hour, mm
    '3h': number; // Rain/Snow volume for the last 3 hours, mm
};

interface ISysData {
    type: number;
    id: number;
    message: number;
    country: string; //  Country code (GB, JP etc.)
    sunrise: number; // Sunrise time, unix, UTC
    sunset: number; // Sunset time, unix, UTC
};

interface ICloudData {
    all: number; // Cloudiness, %
};

interface IWindData {
    speed: number; // Wind speed. Unit Default: meter/sec, Metric: meter/sec, Imperial: miles/hour.
    deg: number; // Wind direction, degrees (meteorological)
    gust?: number; // Wind gust. Unit Default: meter/sec, Metric: meter/sec, Imperial: miles/hour.
};

export interface IMainWeatherData {
    temp: number; // Temperature. Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit.
    feels_like: number; // Temperature. This temperature parameter accounts for the human perception of weather. Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit.
    temp_min: number; // Minimum temperature at the moment. This is minimal currently observed temperature (within large megalopolises and urban areas). Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit.
    temp_max: number; // Maximum temperature at the moment. This is maximal currently observed temperature (within large megalopolises and urban areas). Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit.
    pressure: number; // Atmospheric pressure (on the sea level, if there is no sea_level or grnd_level data), hPa
    humidity: number; // Humidity, %
    sea_level?: number; // Atmospheric pressure on the sea level, hPa
    grnd_level?: number; // Atmospheric pressure on the ground level, hPa
};

export interface IWeatherConditionCode {
    id: number;
    main: string;
    description: string;
    icon: string;
};

export interface IWeatherContext {
    state: IWeatherState;
    dispatch: (action: IFetchWeatherAction) => void;
    getWeatherInfo: WeatherDataAction;
};

export type GetWeatherParams = Record<'lat' | 'lon' | 'appid' | 'units', string>;

export type WeatherDataAction = (dispatch: ({ type, payload }: IFetchWeatherAction) => void) => (appid: string, lon: number, lat: number, units?: string) => void;
