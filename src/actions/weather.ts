import { FETCH_ACTIONS } from '../constants/action-types';

import { IFetchWeatherAction, IWeatherData, WeatherDataAction } from '../types/weather';

import { getWeather } from '../queries/weather';

export const getWeatherInfo: WeatherDataAction =
    (dispatch: ({ type, payload }: IFetchWeatherAction) => void) => async (appid: string, lon: number, lat: number, units: string = 'metric') => {
        try {
            dispatch({ type: FETCH_ACTIONS.FETCH_START });
            const weatherInfo: IWeatherData = await getWeather({ lat: lat.toString(), lon: lon.toString(), appid, units });
            dispatch({ type: FETCH_ACTIONS.FETCH_SUCCESS, payload: weatherInfo });
        } catch (error: unknown) {
            dispatch({ type: FETCH_ACTIONS.FETCH_ERROR, payload: (error as Error).message });
        }
    };
