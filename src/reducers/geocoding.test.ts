import { FETCH_ACTIONS, GEOCODING_ACTIONS, TEST_ACTIONS } from "constants/action-types";

import { ICoords, IFetchGeocodingAction, IGeocodingAction, IGeocodingState } from "types/geocoding";

import { geocoding } from "state/geocoding";

import geocodingReducer from "./geocoding";

describe('geocoding reducer', () => {
    describe('FETCH_START', () => {
        let initialState: IGeocodingState;
        let expectedState: IGeocodingState;

        beforeAll(() => {
            initialState = geocoding;
            expectedState = {
                loading: true,
                coords: null,
                errors: [],
            };
        });

        it('should set "loading" to true\nshould set "errors" to empty array\nshould set "coords" to null', () => {
            const updateAction: IFetchGeocodingAction = { type: FETCH_ACTIONS.FETCH_START };
            const updatedState: IGeocodingState = geocodingReducer(initialState, updateAction);

            expect(updatedState).toEqual(expectedState);
        });

        it('should not add new properties to state if it recieves any payload', () => {
            const updateAction: IFetchGeocodingAction = { type: FETCH_ACTIONS.FETCH_START, payload: 'corrupted' };
            const updatedState: IGeocodingState = geocodingReducer(initialState, updateAction);

            expect(updatedState).toEqual(expectedState);
        });
    });

    describe('FETCH_SUCCESS', () => {
        const testCoords: ICoords = {
            lon: 1,
            lat: 1,
        };
        const testState: IGeocodingState = {
            loading: false,
            coords: testCoords,
            errors: [],
        };

        it('should set "loading" to false\nshould set "errors" to empty array\nshould set "coords" to value from payload', () => {
            const initialState: IGeocodingState = {
                loading: true,
                coords: null,
                errors: ['error'],
            };
            const updateAction: IFetchGeocodingAction = { type: FETCH_ACTIONS.FETCH_SUCCESS, payload: testCoords };
            const updatedState: IGeocodingState = geocodingReducer(initialState, updateAction);

            expect(updatedState).toEqual(testState);
        });

        it('should not update coords if it receives no payload', () => {
            const updateAction: IFetchGeocodingAction = { type: FETCH_ACTIONS.FETCH_SUCCESS };
            const updatedState: IGeocodingState = geocodingReducer(testState, updateAction);

            expect(updatedState).toEqual(testState);
        });
    });

    describe('FETCH_ERROR', () => {
        let initialState: IGeocodingState;

        it('should add payload error to current error state\nshould set "loading" to false\nshould set "coords" to null', () => {
            initialState = {
                loading: true,
                coords: { lon: 1, lat: 1 },
                errors: ['error 1'],
            };
            const testError: string = 'error 2';
            const expectedState: IGeocodingState = {
                loading: false,
                coords: null,
                errors: ['error 1', testError],
            };
            const updateAction: IFetchGeocodingAction = { type: FETCH_ACTIONS.FETCH_ERROR, payload: testError };
            const updatedState: IGeocodingState = geocodingReducer(initialState, updateAction);

            expect(updatedState).toEqual(expectedState);
        });

        it('should not update errors if it receives no payload', () => {
            initialState = {
                loading: false,
                coords: null,
                errors: ['error 1'],
            };
            const updateAction: IFetchGeocodingAction = { type: FETCH_ACTIONS.FETCH_ERROR };
            const updatedState: IGeocodingState = geocodingReducer(initialState, updateAction);

            expect(updatedState).toEqual(initialState);
        });
    });

    describe('CLEAR_COORDS', () => {
        const initialState: IGeocodingState = {
            loading: true,
            coords: { lat: 1, lon: 1 },
            errors: ['error'],
        };

        it('should set "coords" to null\nshould set "loading" to false\nshould set "errors" to empty arra', () => {
            const updateAction: IGeocodingAction = { type: GEOCODING_ACTIONS.CLEAR_COORDS };
            const updatedState: IGeocodingState = geocodingReducer(initialState, updateAction);

            expect(updatedState.coords).toEqual(null);
        });

        it('should not add new properties to state if it recieves any payload', () => {
            const expectedState: IGeocodingState = {
                loading: false,
                coords: null,
                errors: [],
            };
            const updateAction: IGeocodingAction = { type: GEOCODING_ACTIONS.CLEAR_COORDS, payload: 'corrupted' };
            const updatedState: IGeocodingState = geocodingReducer(initialState, updateAction);

            expect(updatedState).toEqual(expectedState);
        });
    });

    describe('TEST_ACTION', () => {
        it('should return unchanged state if random action is passed', () => {
            const initialState: IGeocodingState = geocoding;
            const updateAction: IFetchGeocodingAction = { type: TEST_ACTIONS.TEST_ACTION, payload: 'corrupted' };
            const updatedState: IGeocodingState = geocodingReducer(initialState, updateAction);

            expect(updatedState).toEqual(initialState);
        });
    });
});
