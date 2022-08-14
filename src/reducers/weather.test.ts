import { FETCH_ACTIONS, TEST_ACTIONS } from "constants/action-types";

import { IFetchWeatherAction, IWeatherState } from "types/weather";

import { weather } from "state/weather";

import { testWeatherData } from "stub";

import weatherReducer from "./weather";

describe('weather reducer', () => {
    describe('FETCH_START', () => {
        let initialState: IWeatherState;
        let expectedState: IWeatherState;

        beforeAll(() => {
            initialState = {
                loading: false,
                weatherData: weather.weatherData,
                errors: ['error 1'],
            };
            expectedState = {
                loading: true,
                weatherData: weather.weatherData,
                errors: [],
            };
        });

        it('should set "loading" to true\nshould set "errors" to empty array\nshould not change "weatherData"', () => {
            const updateAction: IFetchWeatherAction = { type: FETCH_ACTIONS.FETCH_START };
            const updatedState: IWeatherState = weatherReducer(initialState, updateAction);

            expect(updatedState).toEqual(expectedState);
        });

        it('should not add new properties to state if it recieves any payload', () => {
            const updateAction: IFetchWeatherAction = { type: FETCH_ACTIONS.FETCH_START, payload: 'corrupted' };
            const updatedState: IWeatherState = weatherReducer(initialState, updateAction);

            expect(updatedState).toEqual(expectedState);
        });
    });

    describe('FETCH_SUCCESS', () => {
        it('should set "loading" to false\nshould set "errors" to empty array\nshould set "weatherData" to value from payload', () => {
            const initialState: IWeatherState = {
                loading: true,
                weatherData: null,
                errors: ['error 1'],
            };

            const expectedState: IWeatherState = {
                loading: false,
                weatherData: testWeatherData,
                errors: [],
            };
            const updateAction: IFetchWeatherAction = { type: FETCH_ACTIONS.FETCH_SUCCESS, payload: testWeatherData };
            const updatedState: IWeatherState = weatherReducer(initialState, updateAction);

            expect(updatedState).toEqual(expectedState);
        });

        it('should not update weatherData if it receives no payload', () => {
            const initialState: IWeatherState = {
                loading: false,
                weatherData: testWeatherData,
                errors: [],
            };
            const updateAction: IFetchWeatherAction = { type: FETCH_ACTIONS.FETCH_SUCCESS };
            const updatedState: IWeatherState = weatherReducer(initialState, updateAction);

            expect(updatedState).toEqual(initialState);
        });
    });

    describe('FETCH_ERROR', () => {
        let initialState: IWeatherState;

        beforeAll(() => {
            initialState = {
                loading: false,
                weatherData: weather.weatherData,
                errors: ['error 1'],
            };
        });

        it('should add payload error to current error state\nshould set "loading" to false\nshould not change "weatherData"', () => {
            const testError: string = 'error 2';
            const expectedState: IWeatherState = {
                loading: false,
                weatherData: weather.weatherData,
                errors: ['error 1', testError],
            };
            const updateAction: IFetchWeatherAction = { type: FETCH_ACTIONS.FETCH_ERROR, payload: testError };
            const updatedState: IWeatherState = weatherReducer(initialState, updateAction);

            expect(updatedState).toEqual(expectedState);
        });

        it('should not update errors if it receives no payload', () => {
            const expectedState: IWeatherState = {
                loading: false,
                weatherData: weather.weatherData,
                errors: ['error 1'],
            };
            const updateAction: IFetchWeatherAction = { type: FETCH_ACTIONS.FETCH_ERROR };
            const updatedState: IWeatherState = weatherReducer(initialState, updateAction);

            expect(updatedState).toEqual(expectedState);
        });
    });

    describe('TEST_ACTION', () => {
        it('should return unchanged state if random action is passed', () => {
            const initialState: IWeatherState = weather;
            const updateAction: IFetchWeatherAction = { type: TEST_ACTIONS.TEST_ACTION, payload: 'corrupted' };
            const updatedState: IWeatherState = weatherReducer(initialState, updateAction);

            expect(updatedState).toEqual(initialState);
        });
    });
});
