import { IWeatherData } from "types/weather";

import { testWeatherData } from "stub";

import { getWeather } from "./weather";

describe('get weather query', () => {
    it('should return weatherData from fetch response', async () => {
        jest.spyOn(global, "fetch").mockImplementation(jest.fn(() => Promise.resolve({ status: 200, json: () => Promise.resolve(testWeatherData) })) as jest.Mock);

        const weatherInfo: IWeatherData = await getWeather({ lat: '1', lon: '1', appid: 'appid', units: 'metric' });

        expect(weatherInfo).toEqual(testWeatherData);
    });

    it(`should throw "Weather API didn't return any results." error on empty response`, async () => {
        jest.spyOn(global, "fetch").mockImplementation(jest.fn(() => Promise.resolve({ status: 200, json: () => Promise.resolve({}) })) as jest.Mock);

        try {
            await getWeather({ lat: '1', lon: '1', appid: 'appid', units: 'metric' });
        } catch (error) {
            expect((error as Error).message).toEqual("Weather API didn't return any results.");
        }
    });

    it(`should throw "The API request didn't return any results." error on empty response`, async () => {
        jest.spyOn(global, "fetch").mockImplementation(jest.fn(() => Promise.resolve({ status: 404 })) as jest.Mock);

        try {
            await getWeather({ lat: '1', lon: '1', appid: 'appid', units: 'metric' });
        } catch (error) {
            expect((error as Error).message).toEqual("The API request didn't return any results.");
        }
    });

    it(`should throw error on bad response`, async () => {
        jest.spyOn(global, "fetch").mockImplementation(jest.fn(() => Promise.reject(new Error('fetch error'))) as jest.Mock);

        try {
            await getWeather({ lat: '1', lon: '1', appid: 'appid', units: 'metric' });
        } catch (error) {
            expect((error as Error).message).toEqual('fetch error');
        }
    });
});