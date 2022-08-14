import { FETCH_ACTIONS } from 'constants/action-types';

import * as module from 'queries/weather';

import { testWeatherData } from 'stub';

import { getWeatherInfo } from './weather';

describe('weather actions', () => {
    const dispatch = jest.fn((action) => action);

    describe('getWeatherInfo', () => {
        it('should dispatch FETCH_START and FETCH_SUCCESS if getWeather returns weather data', async () => {
            const action_1 = { type: FETCH_ACTIONS.FETCH_START };
            const action_2 = { type: FETCH_ACTIONS.FETCH_SUCCESS, payload: testWeatherData };

            jest.spyOn(module, 'getWeather').mockImplementation(() => Promise.resolve(testWeatherData));
            await getWeatherInfo(dispatch)('appid', 1, 1, 'metric');

            expect(dispatch).toHaveBeenCalledWith(action_1);
            expect(dispatch).toHaveBeenCalledWith(action_2);
        });

        it('should dispatch FETCH_START and FETCH_ERROR if getWeather fails', async () => {
            const action_1 = { type: FETCH_ACTIONS.FETCH_START };
            const action_2 = { type: FETCH_ACTIONS.FETCH_ERROR, payload: 'error' };

            jest.spyOn(module, 'getWeather').mockImplementation(() => Promise.reject(new Error('error')));
            await getWeatherInfo(dispatch)('appid', 1, 1, 'metric');

            expect(dispatch).toHaveBeenCalledWith(action_1);
            expect(dispatch).toHaveBeenCalledWith(action_2);
        });
    });
});
