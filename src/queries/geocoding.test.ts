import { IGeocodingData } from '../types/geocoding';

import { testGeocodingData } from '../stub';

import { getCoords } from './geocoding';

describe('get coords query', () => {
    it('should return weatherData from fetch response', async () => {
        jest.spyOn(global, 'fetch').mockImplementation(jest.fn(() => Promise.resolve({ status: 200, json: () => Promise.resolve([testGeocodingData]) })) as jest.Mock);

        const geocodingData: IGeocodingData = await getCoords({ q: 'city', appid: 'appid', limit: '1' });

        expect(geocodingData).toEqual(testGeocodingData);
    });

    it(`should throw "The API couldn't retrieve coordinates for "<city>"." error on empty response body`, async () => {
        jest.spyOn(global, 'fetch').mockImplementation(jest.fn(() => Promise.resolve({ status: 200, json: () => Promise.resolve([]) })) as jest.Mock);
        const cityName = 'city';

        try {
            await getCoords({ q: cityName, appid: 'appid', limit: '1' });
        } catch (error) {
            expect((error as Error).message).toEqual(`The API couldn't retrieve coordinates for "${cityName}".`);
        }
    });

    it(`should throw "The API request didn't return any results." error on 404 response`, async () => {
        jest.spyOn(global, 'fetch').mockImplementation(jest.fn(() => Promise.resolve({ status: 404 })) as jest.Mock);

        try {
            await getCoords({ q: 'city', appid: 'appid', limit: '1' });
        } catch (error) {
            expect((error as Error).message).toEqual("The API request didn't return any results.");
        }
    });

    it(`should throw error on bad response`, async () => {
        jest.spyOn(global, 'fetch').mockImplementation(jest.fn(() => Promise.reject(new Error('fetch error'))) as jest.Mock);

        try {
            await getCoords({ q: 'city', appid: 'appid', limit: '1' });
        } catch (error) {
            expect((error as Error).message).toEqual('fetch error');
        }
    });
});
