import { cleanup, render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import _ from 'lodash';

import { lightTheme } from '../../../../../../theme';

import { TEST_ID } from '../../../../../../constants/test-ids';

import { IWeatherState } from '../../../../../../types/weather';
import { IGeocodingState } from '../../../../../../types/geocoding';

import { GeocodingContext } from '../../../../../../context/geocoding';
import { WeatherContext } from '../../../../../../context/weather';

import { geocodingContext } from '../../../../../../state/geocoding';
import { weatherContext } from '../../../../../../state/weather';

import { AppStateIndicator } from './app-state-indicator';

describe('App State Indicator Component', () => {
    let storedGeocodingContext = _.cloneDeep(geocodingContext);
    let storedWeatherContext = _.cloneDeep(weatherContext);

    let testGeocodingContext = { ...geocodingContext };
    let testWeatherContext = { ...weatherContext };

    afterEach(() => {
        cleanup();

        testGeocodingContext = _.cloneDeep(storedGeocodingContext); //while structuredClone(); still undefined in jest
        testWeatherContext = _.cloneDeep(storedWeatherContext); //while structuredClone(); still undefined in jest
    });

    it('should not render if there are no errors and api\'s are not loading', () => {
        testGeocodingContext.state = { errors: [] as string[], loading: false } as IGeocodingState;
        testWeatherContext.state = { errors: [] as string[], loading: false } as IWeatherState;

        const component = render(
            <ThemeProvider theme={lightTheme}>
                <GeocodingContext.Provider value={testGeocodingContext}>
                    <WeatherContext.Provider value={testWeatherContext}>
                        <AppStateIndicator />
                    </WeatherContext.Provider>
                </GeocodingContext.Provider>
            </ThemeProvider >
        );

        expect(component.queryByTestId(TEST_ID.ERROR_INDICATOR)).toBeNull();
        expect(component.queryByTestId(TEST_ID.SPINNER)).toBeNull();
    });

    it('should render error indicator if there are geocoding errors', () => {
        testGeocodingContext.state = { errors: ['error 1'] as string[] } as IGeocodingState;
        testWeatherContext.state = { errors: [] as string[] } as IWeatherState;

        const component = render(
            <ThemeProvider theme={lightTheme}>
                <GeocodingContext.Provider value={testGeocodingContext}>
                    <WeatherContext.Provider value={testWeatherContext}>
                        <AppStateIndicator />
                    </WeatherContext.Provider>
                </GeocodingContext.Provider>
            </ThemeProvider >
        );

        expect(component.queryByTestId(TEST_ID.ERROR_INDICATOR)).toBeDefined();
        expect(component.queryByTestId(TEST_ID.SPINNER)).toBeNull();
    });

    it('should render error indicator if there are weather errors', () => {
        testGeocodingContext.state = { errors: [] as string[] } as IGeocodingState;
        testWeatherContext.state = { errors: ['error 1'] as string[] } as IWeatherState;

        const component = render(
            <ThemeProvider theme={lightTheme}>
                <GeocodingContext.Provider value={testGeocodingContext}>
                    <WeatherContext.Provider value={testWeatherContext}>
                        <AppStateIndicator />
                    </WeatherContext.Provider>
                </GeocodingContext.Provider>
            </ThemeProvider >
        );

        expect(component.queryByTestId(TEST_ID.ERROR_INDICATOR)).toBeDefined();
        expect(component.queryByTestId(TEST_ID.SPINNER)).toBeNull();
    });

    it('should render spinner if geocoding is loading', () => {
        testGeocodingContext.state = { errors: [] as string[], loading: true } as IGeocodingState;
        testWeatherContext.state = { errors: [] as string[] } as IWeatherState;

        const component = render(
            <ThemeProvider theme={lightTheme}>
                <GeocodingContext.Provider value={testGeocodingContext}>
                    <WeatherContext.Provider value={testWeatherContext}>
                        <AppStateIndicator />
                    </WeatherContext.Provider>
                </GeocodingContext.Provider>
            </ThemeProvider >
        );

        expect(component.queryByTestId(TEST_ID.ERROR_INDICATOR)).toBeNull();
        expect(component.queryByTestId(TEST_ID.SPINNER)).toBeDefined();
    });

    it('should render spinner if weather is loading', () => {
        testGeocodingContext.state = { errors: [] as string[] } as IGeocodingState;
        testWeatherContext.state = { errors: [] as string[], loading: true } as IWeatherState;

        const component = render(
            <ThemeProvider theme={lightTheme}>
                <GeocodingContext.Provider value={testGeocodingContext}>
                    <WeatherContext.Provider value={testWeatherContext}>
                        <AppStateIndicator />
                    </WeatherContext.Provider>
                </GeocodingContext.Provider>
            </ThemeProvider >
        );

        expect(component.queryByTestId(TEST_ID.ERROR_INDICATOR)).toBeNull();
        expect(component.queryByTestId(TEST_ID.SPINNER)).toBeDefined();
    });
});
