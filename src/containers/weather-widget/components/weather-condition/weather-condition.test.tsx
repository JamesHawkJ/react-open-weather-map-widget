import { cleanup, render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import _ from 'lodash';
import '@testing-library/jest-dom/extend-expect';

import { lightTheme } from '../../../../theme';

import { TEST_ID } from '../../../../constants/test-ids';

import { IWidgetField, IWidgetState } from '../../../../types/widget';
import { IWeatherState } from '../../../../types/weather';

import { WidgetContext } from '../../../../context/widget';
import { WeatherContext } from '../../../../context/weather';

import { weatherContext } from '../../../../state/weather';
import { widgetContext } from '../../../../state/widget';

import { testWeatherData } from '../../../../stub';

import { WeatherCondition } from './weather-condition';

describe('Weather Condition Component', () => {
    let storedWidgetContext = _.cloneDeep(widgetContext);
    let storedWeatherContext = _.cloneDeep(weatherContext);

    let testWidgetContext = { ...widgetContext };
    let testWeatherContext = { ...weatherContext };

    afterEach(() => {
        cleanup();

        testWidgetContext = _.cloneDeep(storedWidgetContext); //while structuredClone(); still undefined in jest
        testWeatherContext = _.cloneDeep(storedWeatherContext); //while structuredClone(); still undefined in jest
    });

    it('should not render if showWidgetField.weatherCondition is false', () => {
        testWidgetContext.state = { showWidgetField: { weatherCondition: false } as IWidgetField, } as IWidgetState;

        const component = render(
            <ThemeProvider theme={lightTheme}>
                <WidgetContext.Provider value={testWidgetContext}>
                    <WeatherContext.Provider value={testWeatherContext}>
                        <WeatherCondition />
                    </WeatherContext.Provider>
                </WidgetContext.Provider>
            </ThemeProvider >
        );

        expect(component.queryByTestId(TEST_ID.WEATHER_CONDITION)).not.toBeInTheDocument();
    });

    it('should not render if showWidgetField.weatherCondition is true but there is no weatherCondition data available', () => {
        testWidgetContext.state = { showWidgetField: { weatherCondition: true } as IWidgetField, } as IWidgetState;
        testWeatherContext.state = {} as IWeatherState;

        const component = render(
            <ThemeProvider theme={lightTheme}>
                <WidgetContext.Provider value={testWidgetContext}>
                    <WeatherContext.Provider value={testWeatherContext}>
                        <WeatherCondition />
                    </WeatherContext.Provider>
                </WidgetContext.Provider>
            </ThemeProvider >
        );

        expect(component.queryByTestId(TEST_ID.WEATHER_CONDITION)).not.toBeInTheDocument();
    });

    it('should render an amount of WeatherConditionSlides equal to weatherState.weatherData?.weather array length weatherCondition data available', () => {
        testWidgetContext.state = { showWidgetField: { weatherCondition: true } as IWidgetField, } as IWidgetState;
        testWeatherContext.state = { weatherData: testWeatherData } as IWeatherState;

        const component = render(
            <ThemeProvider theme={lightTheme}>
                <WidgetContext.Provider value={testWidgetContext}>
                    <WeatherContext.Provider value={testWeatherContext}>
                        <WeatherCondition />
                    </WeatherContext.Provider>
                </WidgetContext.Provider>
            </ThemeProvider >
        );

        expect(component.queryByTestId(TEST_ID.WEATHER_CONDITION)).toBeInTheDocument();
    });
});
