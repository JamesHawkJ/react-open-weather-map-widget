import _ from "lodash";

import { FETCH_ACTIONS } from "constants/action-types";

import { IFetchWeatherAction, IWeatherData, IWeatherState } from "types/weather";

const weatherReducer = (state: IWeatherState, action: IFetchWeatherAction): IWeatherState => {
    switch (action.type) {
        case FETCH_ACTIONS.FETCH_START:
            return {
                ...state,
                loading: true,
                errors: [],
            }
        case FETCH_ACTIONS.FETCH_SUCCESS:
            return {
                weatherData: (action.payload && !_.isEqual(action.payload, state.weatherData)) ? action.payload as IWeatherData : state.weatherData,
                loading: false,
                errors: [],
            }
        case FETCH_ACTIONS.FETCH_ERROR:
            return {
                ...state,
                loading: false,
                errors: action.payload ? [...state.errors, action.payload as string] : state.errors,
            }
        default:
            return {
                ...state
            }
    }
};

export default weatherReducer;
