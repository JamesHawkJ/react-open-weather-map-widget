import { cleanup, render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import _ from 'lodash';

import { lightTheme } from '../../theme';

import { IWidgetField, IWidgetState } from '../../types/widget';

import { WidgetContext } from '../../context/widget';
import { WeatherContext } from '../../context/weather';
import { GeocodingContext } from '../../context/geocoding';

import { widgetContext } from '../../state/widget';
import { geocodingContext } from '../../state/geocoding';
import { weatherContext } from '../../state/weather';

import * as functions from '../../functions/map-through-widget-fields';

import { testWeatherData } from '../../stub';

import { Widget } from './widget';

describe('Widget Component', () => {
    const mapThroughWidgetFieldsSpy = jest.spyOn(functions, 'mapThroughWidgetFields');

    let storedWidgetContext = _.cloneDeep(widgetContext);
    let storedGeocodingContext = _.cloneDeep(geocodingContext);
    let storedWeatherContext = _.cloneDeep(weatherContext);

    let testWidgetContext = { ...widgetContext };
    let testGeocodingContext = { ...geocodingContext };
    let testWeatherContext = { ...weatherContext };

    afterEach(() => {
        cleanup();

        testWidgetContext = _.cloneDeep(storedWidgetContext); //while structuredClone(); still undefined in jest
        testGeocodingContext = _.cloneDeep(storedGeocodingContext); //while structuredClone(); still undefined in jest
        testWeatherContext = _.cloneDeep(storedWeatherContext); //while structuredClone(); still undefined in jest
    });

    it('should trigger [setAppId, setFlavor, setDefaultCity] actions after receiving props', () => {
        const setAppIdMock = jest.fn(() => () => null);
        const setFlavorMock = jest.fn(() => () => null);
        const setDefaultCityMock = jest.fn(() => () => null);

        testWidgetContext.setAppId = setAppIdMock;
        testWidgetContext.setFlavor = setFlavorMock;
        testWidgetContext.setDefaultCity = setDefaultCityMock;

        render(
            <ThemeProvider theme={lightTheme}>
                <WidgetContext.Provider value={testWidgetContext}>
                    <GeocodingContext.Provider value={testGeocodingContext}>
                        <WeatherContext.Provider value={testWeatherContext}>
                            <Widget
                                appid='appid'
                                flavor='bar'
                                defaultCity='city'
                                updateSpeed={1}
                                showWidgetField={{} as IWidgetField}
                            />
                        </WeatherContext.Provider>
                    </GeocodingContext.Provider>
                </WidgetContext.Provider>
            </ThemeProvider >
        );

        expect(setAppIdMock).toHaveBeenCalledTimes(1);
        expect(setFlavorMock).toHaveBeenCalledTimes(1);
        expect(setDefaultCityMock).toHaveBeenCalledTimes(1);

        setAppIdMock.mockClear();
        setFlavorMock.mockClear();
        setDefaultCityMock.mockClear();
    });

    it('should not trigger [setShowWidgetField] action if showWidgetField prop is an empty object', () => {
        const setShowWidgetFieldMock = jest.fn(() => () => null);

        testWidgetContext.setShowWidgetField = setShowWidgetFieldMock;

        render(
            <ThemeProvider theme={lightTheme}>
                <WidgetContext.Provider value={testWidgetContext}>
                    <GeocodingContext.Provider value={testGeocodingContext}>
                        <WeatherContext.Provider value={testWeatherContext}>
                            <Widget
                                appid=''
                                flavor='bar'
                                defaultCity=''
                                updateSpeed={1}
                                showWidgetField={{} as IWidgetField}
                            />
                        </WeatherContext.Provider>
                    </GeocodingContext.Provider>
                </WidgetContext.Provider>
            </ThemeProvider >
        );

        expect(setShowWidgetFieldMock).not.toHaveBeenCalled();

        setShowWidgetFieldMock.mockClear();
    });

    it('should not trigger [setShowWidgetField] action if showWidgetField prop has same values as widget state', () => {
        const setShowWidgetFieldMock = jest.fn(() => () => null);

        const testShowWidgetField: IWidgetField = {
            weatherCondition: true,
            mainTemperature: true,
        } as IWidgetField;

        testWidgetContext.state = {
            showWidgetField: testShowWidgetField
        } as IWidgetState;

        testWidgetContext.setShowWidgetField = setShowWidgetFieldMock;

        render(
            <ThemeProvider theme={lightTheme}>
                <WidgetContext.Provider value={testWidgetContext}>
                    <GeocodingContext.Provider value={testGeocodingContext}>
                        <WeatherContext.Provider value={testWeatherContext}>
                            <Widget
                                appid=''
                                flavor='bar'
                                defaultCity=''
                                updateSpeed={1}
                                showWidgetField={testShowWidgetField as IWidgetField}
                            />
                        </WeatherContext.Provider>
                    </GeocodingContext.Provider>
                </WidgetContext.Provider>
            </ThemeProvider >
        );

        expect(setShowWidgetFieldMock).not.toHaveBeenCalled();

        setShowWidgetFieldMock.mockClear();
    });

    it('should trigger [setShowWidgetField] action if showWidgetField prop has different values from widget state', () => {
        const setShowWidgetFieldMock = jest.fn(() => () => null);

        const testShowWidgetField: IWidgetField = {
            weatherCondition: true,
            mainTemperature: true,
        } as IWidgetField;

        testWidgetContext.state.showWidgetField = testShowWidgetField;

        testWidgetContext.setShowWidgetField = setShowWidgetFieldMock;



        render(
            <ThemeProvider theme={lightTheme}>
                <WidgetContext.Provider value={testWidgetContext}>
                    <GeocodingContext.Provider value={testGeocodingContext}>
                        <WeatherContext.Provider value={testWeatherContext}>
                            <Widget
                                appid=''
                                flavor='bar'
                                defaultCity=''
                                updateSpeed={1}
                                showWidgetField={{
                                    weatherCondition: true,
                                    mainTemperature: false,
                                } as IWidgetField}
                            />
                        </WeatherContext.Provider>
                    </GeocodingContext.Provider>
                </WidgetContext.Provider>
            </ThemeProvider >
        );

        expect(setShowWidgetFieldMock).toHaveBeenCalled();

        setShowWidgetFieldMock.mockClear();
    });

    it('should not trigger [getWeatherInfo] action if coords are not set in state', () => {
        const getWeatherInfoMock = jest.fn(() => () => null);

        testWeatherContext.getWeatherInfo = getWeatherInfoMock;

        render(
            <ThemeProvider theme={lightTheme}>
                <WidgetContext.Provider value={testWidgetContext}>
                    <GeocodingContext.Provider value={testGeocodingContext}>
                        <WeatherContext.Provider value={testWeatherContext}>
                            <Widget
                                appid=''
                                flavor='bar'
                                defaultCity=''
                                updateSpeed={1}
                                showWidgetField={{} as IWidgetField}
                            />
                        </WeatherContext.Provider>
                    </GeocodingContext.Provider>
                </WidgetContext.Provider>
            </ThemeProvider >
        );

        expect(getWeatherInfoMock).not.toHaveBeenCalled();
        getWeatherInfoMock.mockClear();
    });

    it('should trigger [getWeatherInfo] action if coords are set in state and no interval is running', () => {
        const getWeatherInfoMock = jest.fn(() => () => null);

        testGeocodingContext.state.coords = { lat: 1, lon: 1 };

        testWeatherContext.getWeatherInfo = getWeatherInfoMock;

        render(
            <ThemeProvider theme={lightTheme}>
                <WidgetContext.Provider value={testWidgetContext}>
                    <GeocodingContext.Provider value={testGeocodingContext}>
                        <WeatherContext.Provider value={testWeatherContext}>
                            <Widget
                                appid=''
                                flavor='bar'
                                defaultCity=''
                                updateSpeed={1}
                                showWidgetField={{} as IWidgetField}
                            />
                        </WeatherContext.Provider>
                    </GeocodingContext.Provider>
                </WidgetContext.Provider>
            </ThemeProvider >
        );

        expect(getWeatherInfoMock).toHaveBeenCalledTimes(1);
        getWeatherInfoMock.mockClear();
    });

    it('should trigger [getWeatherInfo] action continuously once in each tick est in updateSpeed prop if coords are set in state', () => {
        const getWeatherInfoMock = jest.fn(() => () => null);

        testGeocodingContext.state.coords = { lat: 1, lon: 1 };

        testWeatherContext.getWeatherInfo = getWeatherInfoMock;

        jest.useFakeTimers();

        render(
            <ThemeProvider theme={lightTheme}>
                <WidgetContext.Provider value={testWidgetContext}>
                    <GeocodingContext.Provider value={testGeocodingContext}>
                        <WeatherContext.Provider value={testWeatherContext}>
                            <Widget
                                appid=''
                                flavor='bar'
                                defaultCity=''
                                updateSpeed={10}
                                showWidgetField={{} as IWidgetField}
                            />
                        </WeatherContext.Provider>
                    </GeocodingContext.Provider>
                </WidgetContext.Provider>
            </ThemeProvider >
        );

        expect(getWeatherInfoMock).toHaveBeenCalledTimes(1);

        jest.advanceTimersByTime(12);

        expect(getWeatherInfoMock).toHaveBeenCalledTimes(2);

        jest.advanceTimersByTime(12);

        expect(getWeatherInfoMock).toHaveBeenCalledTimes(3);

        getWeatherInfoMock.mockClear();
    });

    it('should not trigger [mapThroughWidgetFields] action if weather is loading', () => {
        testWeatherContext.state.weatherData = testWeatherData;
        testWeatherContext.state.loading = true;

        render(
            <ThemeProvider theme={lightTheme}>
                <WidgetContext.Provider value={testWidgetContext}>
                    <GeocodingContext.Provider value={testGeocodingContext}>
                        <WeatherContext.Provider value={testWeatherContext}>
                            <Widget
                                appid=''
                                flavor='bar'
                                defaultCity=''
                                updateSpeed={1}
                                showWidgetField={{} as IWidgetField}
                            />
                        </WeatherContext.Provider>
                    </GeocodingContext.Provider>
                </WidgetContext.Provider>
            </ThemeProvider >
        );

        expect(mapThroughWidgetFieldsSpy).not.toHaveBeenCalled();
    });

    it('should trigger [mapThroughWidgetFields] function if weatherData is in state', () => {
        testWeatherContext.state.weatherData = testWeatherData;

        render(
            <ThemeProvider theme={lightTheme}>
                <WidgetContext.Provider value={testWidgetContext}>
                    <GeocodingContext.Provider value={testGeocodingContext}>
                        <WeatherContext.Provider value={testWeatherContext}>
                            <Widget
                                appid=''
                                flavor='bar'
                                defaultCity=''
                                updateSpeed={1}
                                showWidgetField={{} as IWidgetField}
                            />
                        </WeatherContext.Provider>
                    </GeocodingContext.Provider>
                </WidgetContext.Provider>
            </ThemeProvider >
        );

        expect(mapThroughWidgetFieldsSpy).toHaveBeenCalledTimes(1);
        expect(mapThroughWidgetFieldsSpy).toHaveBeenCalledWith(testWidgetContext.state, testWeatherContext.state);
    });
});
