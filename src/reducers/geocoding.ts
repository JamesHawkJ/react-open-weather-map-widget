import _ from 'lodash';

import { FETCH_ACTIONS, GEOCODING_ACTIONS } from '../constants/action-types';

import { ICoords, IFetchGeocodingAction, IGeocodingAction, IGeocodingState } from '../types/geocoding';

const geocodingReducer = (state: IGeocodingState, action: IFetchGeocodingAction | IGeocodingAction): IGeocodingState => {
    switch (action.type) {
        case FETCH_ACTIONS.FETCH_START:
            return {
                coords: null,
                loading: true,
                errors: [],
            }
        case FETCH_ACTIONS.FETCH_SUCCESS:
            return {
                coords: (action.payload && !_.isEqual(action.payload, state.coords)) ? action.payload as ICoords : state.coords,
                loading: false,
                errors: [],
            }
        case GEOCODING_ACTIONS.CLEAR_COORDS:
            return {
                coords: null,
                loading: false,
                errors: [],
            }
        case FETCH_ACTIONS.FETCH_ERROR:
            return {
                coords: null,
                loading: false,
                errors: action.payload ? [...state.errors, action.payload as string] : state.errors,
            }
        default:
            return {
                ...state
            }
    }
};

export default geocodingReducer;
