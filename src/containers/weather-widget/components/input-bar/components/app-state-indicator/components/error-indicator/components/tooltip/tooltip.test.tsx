import { cleanup, fireEvent, render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { FC, useState } from 'react';
import _ from 'lodash';

import { lightTheme } from "theme";

import { TEST_ID } from 'constants/test-ids';

import { IWeatherState } from 'types/weather';
import { IGeocodingState } from 'types/geocoding';

import { GeocodingContext } from 'context/geocoding';
import { WeatherContext } from 'context/weather';

import { geocodingContext } from 'state/geocoding';
import { weatherContext } from 'state/weather';

import { Tooltip } from './tooltip';

describe('Tooltip Component', () => {
    let storedGeocodingContext = _.cloneDeep(geocodingContext);
    let storedWeatherContext = _.cloneDeep(weatherContext);

    let testGeocodingContext = { ...geocodingContext };
    let testWeatherContext = { ...weatherContext };

    afterEach(() => {
        cleanup();

        testGeocodingContext = _.cloneDeep(storedGeocodingContext); //while structuredClone(); still undefined in jest
        testWeatherContext = _.cloneDeep(storedWeatherContext); //while structuredClone(); still undefined in jest
    });

    it('should not render when created', () => {
        testGeocodingContext.state = { errors: [] as string[] } as IGeocodingState;
        testWeatherContext.state = { errors: [] as string[] } as IWeatherState;

        const component = render(
            <ThemeProvider theme={lightTheme}>
                <GeocodingContext.Provider value={testGeocodingContext}>
                    <WeatherContext.Provider value={testWeatherContext}>
                        <Tooltip showTooltip={false} setShowTooltip={() => null} />
                    </WeatherContext.Provider>
                </GeocodingContext.Provider>
            </ThemeProvider >
        );

        expect(component.queryByTestId(TEST_ID.TOOLTIP)).not.toBeVisible();
    });

    it('should render if showTooltip is set to true', () => {
        testGeocodingContext.state = { errors: [] as string[] } as IGeocodingState;
        testWeatherContext.state = { errors: [] as string[] } as IWeatherState;

        const component = render(
            <ThemeProvider theme={lightTheme}>
                <GeocodingContext.Provider value={testGeocodingContext}>
                    <WeatherContext.Provider value={testWeatherContext}>
                        <Tooltip showTooltip={true} setShowTooltip={() => null} />
                    </WeatherContext.Provider>
                </GeocodingContext.Provider>
            </ThemeProvider >
        );

        expect(component.queryByTestId(TEST_ID.TOOLTIP)).toBeVisible();
    });

    it('should render a list of errors if showTooltip is set to true', async () => {
        const testGeocodingError: string = 'geocoding error';
        const testWeatherError: string = 'weather error';

        testGeocodingContext.state = { errors: [testGeocodingError] } as IGeocodingState;
        testWeatherContext.state = { errors: [testWeatherError] } as IWeatherState;

        const component = render(
            <ThemeProvider theme={lightTheme}>
                <GeocodingContext.Provider value={testGeocodingContext}>
                    <WeatherContext.Provider value={testWeatherContext}>
                        <Tooltip showTooltip={true} setShowTooltip={() => null} />
                    </WeatherContext.Provider>
                </GeocodingContext.Provider>
            </ThemeProvider >
        );

        const testGeocodingErrorText = '\u2b24 ' + testGeocodingError;
        const testWeatherErrorText = '\u2b24 ' + testWeatherError;

        expect(await component.findByText(testGeocodingErrorText)).toBeVisible();
        expect(await component.findByText(testWeatherErrorText)).toBeVisible();
    });

    it('should hide tooltip after setting showTooltip to false', async () => {
        testGeocodingContext.state = { errors: [] as string[] } as IGeocodingState;
        testWeatherContext.state = { errors: [] as string[] } as IWeatherState;

        const Wrapper: FC = () => {
            const [tooltip, setTooltip] = useState<boolean>(true);

            return (
                <Tooltip showTooltip={tooltip} setShowTooltip={setTooltip} />
            );
        };

        const component = render(
            <ThemeProvider theme={lightTheme}>
                <GeocodingContext.Provider value={testGeocodingContext}>
                    <WeatherContext.Provider value={testWeatherContext}>
                        <Wrapper />
                    </WeatherContext.Provider>
                </GeocodingContext.Provider>
            </ThemeProvider >
        );

        const tooltip = await component.findByTestId(TEST_ID.TOOLTIP);

        expect(tooltip).toBeVisible();

        fireEvent.mouseLeave(tooltip);

        expect(tooltip).not.toBeVisible();
    });
});
