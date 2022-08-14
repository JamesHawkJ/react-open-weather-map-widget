import {
    faCloud,
    faTemperatureHalf,
    faDroplet,
    faTemperatureArrowUp,
    faTemperatureArrowDown,
    faGaugeHigh,
    faUmbrella,
    faSnowflake,
    faEyeLowVision,
    faWind,
} from '@fortawesome/free-solid-svg-icons';

import { IMainWeatherData, IWeatherData, IWeatherState } from 'types/weather';
import { IWidgetField, IWidgetState } from 'types/widget';
import { IIndicatorFieldProps } from 'containers/weather-widget/components/indicator-field/types';

import { testWeatherData } from 'stub';

import { mapThroughWidgetFields } from './map-through-widget-fields';

describe('mapThroughWidgetFields function', function () {
    it('returns an empty array if showWidgetField object has all entries set to false', function () {
        const testWidgetState: IWidgetState = { showWidgetField: { mainTemperature: false, } as IWidgetField, } as IWidgetState;

        const testWeatherState: IWeatherState = {} as IWeatherState;

        expect(mapThroughWidgetFields(testWidgetState, testWeatherState)).toEqual([]);
    });

    it('returns array with IIndicatorFieldProps object for Temperature if showWidgetField.mainTemperature is true and data is available', function () {
        const testWidgetState: IWidgetState = { showWidgetField: { mainTemperature: true, } as IWidgetField, } as IWidgetState;

        const testWeatherState: IWeatherState = { weatherData: testWeatherData, } as IWeatherState;

        const expectedResult: IIndicatorFieldProps[] = [{
            icon: faTemperatureHalf,
            label: 'Temperature',
            value: `${testWeatherData.main.temp} \u00B0`,
        }];

        expect(mapThroughWidgetFields(testWidgetState, testWeatherState)).toEqual(expectedResult);
    });

    it('returns array with IIndicatorFieldProps object for Felt Temperature if showWidgetField.feltTemperature is true and data is available', function () {
        const testWidgetState: IWidgetState = { showWidgetField: { feltTemperature: true, } as IWidgetField, } as IWidgetState;

        const testWeatherState: IWeatherState = { weatherData: testWeatherData, } as IWeatherState;

        const expectedResult: IIndicatorFieldProps[] = [{
            icon: faTemperatureHalf,
            label: 'Felt Temperature',
            value: `${testWeatherData.main.feels_like} \u00B0`,
        }];

        expect(mapThroughWidgetFields(testWidgetState, testWeatherState)).toEqual(expectedResult);
    });

    it('returns array with IIndicatorFieldProps object for Pressure if showWidgetField.pressure is true and data is available', function () {
        const testWidgetState: IWidgetState = { showWidgetField: { pressure: true, } as IWidgetField, } as IWidgetState;

        const testWeatherState: IWeatherState = { weatherData: testWeatherData, } as IWeatherState;

        const expectedResult: IIndicatorFieldProps[] = [{
            icon: faGaugeHigh,
            label: 'Pressure',
            value: `${testWeatherData.main.pressure} hPa`,
        }];

        expect(mapThroughWidgetFields(testWidgetState, testWeatherState)).toEqual(expectedResult);
    });

    it('returns array with IIndicatorFieldProps object for Humidity if showWidgetField.humidity is true and data is available', function () {
        const testWidgetState: IWidgetState = { showWidgetField: { humidity: true, } as IWidgetField, } as IWidgetState;

        const testWeatherState: IWeatherState = { weatherData: testWeatherData, } as IWeatherState;

        const expectedResult: IIndicatorFieldProps[] = [{
            icon: faDroplet,
            label: 'Humidity',
            value: `${testWeatherData.main.humidity} %`,
        }];

        expect(mapThroughWidgetFields(testWidgetState, testWeatherState)).toEqual(expectedResult);
    });

    it('returns array with IIndicatorFieldProps object for Minimal Temperature if showWidgetField.minimalTemperature is true and data is available', function () {
        const testWidgetState: IWidgetState = { showWidgetField: { minimalTemperature: true, } as IWidgetField, } as IWidgetState;

        const testWeatherState: IWeatherState = { weatherData: testWeatherData, } as IWeatherState;

        const expectedResult: IIndicatorFieldProps[] = [{
            icon: faTemperatureArrowDown,
            label: 'Minimal Temperature',
            value: `${testWeatherData.main.temp_min} \u00B0`,
        }];

        expect(mapThroughWidgetFields(testWidgetState, testWeatherState)).toEqual(expectedResult);
    });

    it('returns array with IIndicatorFieldProps object for Maximal Temperature if showWidgetField.maximalTemperature is true and data is available', function () {
        const testWidgetState: IWidgetState = { showWidgetField: { maximalTemperature: true, } as IWidgetField, } as IWidgetState;

        const testWeatherState: IWeatherState = { weatherData: testWeatherData, } as IWeatherState;

        const expectedResult: IIndicatorFieldProps[] = [{
            icon: faTemperatureArrowUp,
            label: 'Maximal Temperature',
            value: `${testWeatherData.main.temp_max} \u00B0`,
        }];

        expect(mapThroughWidgetFields(testWidgetState, testWeatherState)).toEqual(expectedResult);
    });

    it('returns array with IIndicatorFieldProps object for Sea Level Pressure if showWidgetField.seaLevelPressure is true and data is available', function () {
        const testWidgetState: IWidgetState = { showWidgetField: { seaLevelPressure: true, } as IWidgetField, } as IWidgetState;

        const testWeatherState: IWeatherState = { weatherData: testWeatherData, } as IWeatherState;

        const expectedResult: IIndicatorFieldProps[] = [{
            icon: faGaugeHigh,
            label: 'Sea Level Pressure',
            value: `${testWeatherData.main.sea_level} \u00B0`,
        }];

        expect(mapThroughWidgetFields(testWidgetState, testWeatherState)).toEqual(expectedResult);
    });

    it('returns array with IIndicatorFieldProps object for Ground Level Pressure if showWidgetField.groundLevelPressure is true and data is available', function () {
        const testWidgetState: IWidgetState = { showWidgetField: { groundLevelPressure: true, } as IWidgetField, } as IWidgetState;

        const testWeatherState: IWeatherState = { weatherData: testWeatherData, } as IWeatherState;

        const expectedResult: IIndicatorFieldProps[] = [{
            icon: faGaugeHigh,
            label: 'Ground Level Pressure',
            value: `${testWeatherData.main.grnd_level} \u00B0`,
        }];

        expect(mapThroughWidgetFields(testWidgetState, testWeatherState)).toEqual(expectedResult);
    });

    it('returns array with IIndicatorFieldProps object for Visibility if showWidgetField.visibility is true and data is available', function () {
        const testWidgetState: IWidgetState = { showWidgetField: { visibility: true, } as IWidgetField, } as IWidgetState;

        const testWeatherState: IWeatherState = { weatherData: testWeatherData, } as IWeatherState;

        const expectedResult: IIndicatorFieldProps[] = [{
            icon: faEyeLowVision,
            label: 'Visibility',
            value: `${testWeatherData.visibility} %`,
        }];

        expect(mapThroughWidgetFields(testWidgetState, testWeatherState)).toEqual(expectedResult);
    });

    it('returns array with IIndicatorFieldProps object for Wind if showWidgetField.wind is true and data is available', function () {
        const testWidgetState: IWidgetState = { showWidgetField: { wind: true, } as IWidgetField, } as IWidgetState;

        const testWeatherState: IWeatherState = { weatherData: testWeatherData, } as IWeatherState;

        const expectedResult: IIndicatorFieldProps[] = [{
            icon: faWind,
            label: 'Wind',
            value: `${testWeatherData.wind?.speed} m/s`,
        }];

        expect(mapThroughWidgetFields(testWidgetState, testWeatherState)).toEqual(expectedResult);
    });

    it('returns array with IIndicatorFieldProps object for Clouds if showWidgetField.clouds is true and data is available', function () {
        const testWidgetState: IWidgetState = { showWidgetField: { clouds: true, } as IWidgetField, } as IWidgetState;

        const testWeatherState: IWeatherState = { weatherData: testWeatherData, } as IWeatherState;

        const expectedResult: IIndicatorFieldProps[] = [{
            icon: faCloud,
            label: 'Clouds',
            value: `${testWeatherData.clouds?.all} %`,
        }];

        expect(mapThroughWidgetFields(testWidgetState, testWeatherState)).toEqual(expectedResult);
    });

    it('returns array with IIndicatorFieldProps object for Rain if showWidgetField.rain is true and data is available', function () {
        const testWidgetState: IWidgetState = { showWidgetField: { rain: true, } as IWidgetField, } as IWidgetState;

        const testWeatherState: IWeatherState = { weatherData: testWeatherData, } as IWeatherState;

        const expectedResult: IIndicatorFieldProps[] = [{
            icon: faUmbrella,
            label: 'Rain',
            value: `${testWeatherData.rain?.['1h']} mm/h`,
        }];

        expect(mapThroughWidgetFields(testWidgetState, testWeatherState)).toEqual(expectedResult);
    });

    it('returns array with IIndicatorFieldProps object for Snow if showWidgetField.snow is true and data is available', function () {
        const testWidgetState: IWidgetState = { showWidgetField: { snow: true, } as IWidgetField, } as IWidgetState;

        const testWeatherState: IWeatherState = { weatherData: testWeatherData, } as IWeatherState;

        const expectedResult: IIndicatorFieldProps[] = [{
            icon: faSnowflake,
            label: 'Snow',
            value: `${testWeatherData.snow?.['1h']} mm/h`,
        }];

        expect(mapThroughWidgetFields(testWidgetState, testWeatherState)).toEqual(expectedResult);
    });

    it('returns cropped array if showWidgetFields has fields set to true but not all data is available', function () {
        const testWidgetState: IWidgetState = {
            showWidgetField: {
                mainTemperature: true,
                snow: true,
            } as IWidgetField,
        } as IWidgetState;

        const testWeatherState: IWeatherState = {
            loading: false,
            errors: [],
            weatherData: { main: { temp: 0, } as IMainWeatherData } as IWeatherData,
        };

        const expectedResult: IIndicatorFieldProps[] = [{
            icon: faTemperatureHalf,
            label: 'Temperature',
            value: `${testWeatherData.main.temp} \u00B0`,
        }];

        expect(mapThroughWidgetFields(testWidgetState, testWeatherState)).toEqual(expectedResult);
    });

    it('excludes weather condition data from the resulting array', function () {
        const testWidgetState: IWidgetState = {
            showWidgetField: {
                mainTemperature: true,
                weatherCondition: true,
            } as IWidgetField,
        } as IWidgetState;

        const testWeatherState: IWeatherState = { weatherData: testWeatherData, } as IWeatherState;

        expect(mapThroughWidgetFields(testWidgetState, testWeatherState).length).toEqual(1);
    });
});
