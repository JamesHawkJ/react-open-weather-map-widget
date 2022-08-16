import { FETCH_ACTIONS, GEOCODING_ACTIONS } from '../constants/action-types';

import { CoordsAction, IFetchGeocodingAction, IGeocodingAction, VoidAction } from '../types/geocoding';

import { getCoords } from '../queries/geocoding';


export const getLocationCoords: CoordsAction =
    (dispatch: ({ type, payload }: IFetchGeocodingAction) => void) => async (appid: string, cityName: string, limit: string = '1') => {
        try {
            dispatch({ type: FETCH_ACTIONS.FETCH_START });
            const { lat, lon } = await getCoords({ q: cityName, limit, appid });
            dispatch({ type: FETCH_ACTIONS.FETCH_SUCCESS, payload: { lat, lon } });
        } catch (error: unknown) {
            dispatch({ type: FETCH_ACTIONS.FETCH_ERROR, payload: (error as Error).message });
        }
    };

export const clearLocationCoords: VoidAction = (dispatch: ({ type }: IGeocodingAction) => void) => () => {
    dispatch({ type: GEOCODING_ACTIONS.CLEAR_COORDS });
};
