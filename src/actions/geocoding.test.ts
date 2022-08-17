import { FETCH_ACTIONS, GEOCODING_ACTIONS } from '../constants/action-types';

import * as module from '../queries/geocoding';

import { testGeocodingData } from '../stub';

import { clearLocationCoords, getLocationCoords } from './geocoding';

describe('geocoding actions', () => {
    const dispatch = jest.fn((action) => action);

    describe('getLocationCoords', () => {
        it('should dispatch FETCH_START and FETCH_SUCCESS if getCoords returns coords', async () => {
            const action_1 = { type: FETCH_ACTIONS.FETCH_START };
            const action_2 = { type: FETCH_ACTIONS.FETCH_SUCCESS, payload: { lat: testGeocodingData.lat, lon: testGeocodingData.lon } };

            jest.spyOn(module, 'getCoords').mockImplementation(() => Promise.resolve(testGeocodingData));
            await getLocationCoords(dispatch)('appid', 'city', '1');

            expect(dispatch).toHaveBeenCalledWith(action_1);
            expect(dispatch).toHaveBeenCalledWith(action_2);
        });

        it('should dispatch FETCH_START and FETCH_ERROR if getCoords fails', async () => {
            const action_1 = { type: FETCH_ACTIONS.FETCH_START };
            const action_2 = { type: FETCH_ACTIONS.FETCH_ERROR, payload: 'error' };

            jest.spyOn(module, 'getCoords').mockImplementation(() => Promise.reject(new Error('error')));
            await getLocationCoords(dispatch)('appid', 'city', '1');

            expect(dispatch).toHaveBeenCalledWith(action_1);
            expect(dispatch).toHaveBeenCalledWith(action_2);
        });
    });

    describe('clearLocationCoords', () => {
        it('should dispatch CLEAR_COORDS action', () => {
            const action = { type: GEOCODING_ACTIONS.CLEAR_COORDS };

            clearLocationCoords(dispatch)();

            expect(dispatch).toHaveBeenCalledWith(action);
        });
    });
});
