import { cleanup, fireEvent, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { ThemeProvider } from 'styled-components';
import _ from 'lodash';
import '@testing-library/jest-dom/extend-expect';

import { lightTheme } from '../../../../../../theme';

import { TEST_ID } from '../../../../../../constants/test-ids';

import { IWidgetState } from '../../../../../../types/widget';

import { WidgetContext } from '../../../../../../context/widget';
import { GeocodingContext } from '../../../../../../context/geocoding';

import * as useDebouncedValueModule from '../../../../../../hooks/use-debounced-value';

import { widgetContext } from '../../../../../../state/widget';
import { geocodingContext } from '../../../../../../state/geocoding';

import { CityForm } from './city-form';

describe('City Form Component', () => {
    const testCity = 'city';

    const useDebouncedValueSpy = jest.spyOn(useDebouncedValueModule, 'useDebouncedValue');

    let storedWidgetContext = _.cloneDeep(widgetContext);
    let storedGeocodingContext = _.cloneDeep(geocodingContext);

    let testWidgetContext = { ...widgetContext };
    let testGeocodingContext = { ...geocodingContext };

    afterEach(() => {
        cleanup();

        testWidgetContext = _.cloneDeep(storedWidgetContext); //while structuredClone(); still undefined in jest
        testGeocodingContext = _.cloneDeep(storedGeocodingContext); //while structuredClone(); still undefined in jest
    });

    it('should always render', () => {
        const component = render(
            <ThemeProvider theme={lightTheme}>
                <WidgetContext.Provider value={widgetContext}>
                    <GeocodingContext.Provider value={testGeocodingContext}>
                        <CityForm />
                    </GeocodingContext.Provider>
                </WidgetContext.Provider>
            </ThemeProvider >
        );

        expect(component.queryByTestId(TEST_ID.CITY_FORM)).toBeInTheDocument();
    });

    it('should have value set to defaultCity value from widget state', () => {
        testWidgetContext.state = { defaultCity: testCity } as IWidgetState;

        const component = render(
            <ThemeProvider theme={lightTheme}>
                <WidgetContext.Provider value={testWidgetContext}>
                    <GeocodingContext.Provider value={testGeocodingContext}>
                        <CityForm />
                    </GeocodingContext.Provider>
                </WidgetContext.Provider>
            </ThemeProvider >
        );

        expect(component.queryByTestId(TEST_ID.CITY_FORM)).toHaveValue(testCity);
    });

    it('should change value after manual input', async () => {
        const component = render(
            <ThemeProvider theme={lightTheme}>
                <WidgetContext.Provider value={widgetContext}>
                    <GeocodingContext.Provider value={testGeocodingContext}>
                        <CityForm />
                    </GeocodingContext.Provider>
                </WidgetContext.Provider>
            </ThemeProvider >
        );

        const input = await component.findByTestId(TEST_ID.CITY_FORM);

        expect(input).toHaveValue('');

        await userEvent.type(input, testCity);

        expect(input).toHaveValue(testCity);
    });

    it('should call useDebonucedValue with testCity and 800ms delay as params after input', async () => {
        const component = render(
            <ThemeProvider theme={lightTheme}>
                <WidgetContext.Provider value={widgetContext}>
                    <GeocodingContext.Provider value={geocodingContext}>
                        <CityForm />
                    </GeocodingContext.Provider>
                </WidgetContext.Provider>
            </ThemeProvider >
        );

        const input = await component.findByTestId(TEST_ID.CITY_FORM);

        expect(input).toHaveValue('');

        fireEvent.change(input, { target: { value: testCity } });

        expect(useDebouncedValueSpy).toHaveBeenLastCalledWith(testCity, 800);
    });

    it('should call getLocationCoords action after manual input', async () => {
        testWidgetContext.state = { appid: 'test' } as IWidgetState;

        useDebouncedValueSpy.mockImplementation((value) => value);

        const getLocationCoordsMock = jest.fn(() => () => null);

        testGeocodingContext.getLocationCoords = getLocationCoordsMock;

        const component = render(
            <ThemeProvider theme={lightTheme}>
                <WidgetContext.Provider value={testWidgetContext}>
                    <GeocodingContext.Provider value={testGeocodingContext}>
                        <CityForm />
                    </GeocodingContext.Provider>
                </WidgetContext.Provider>
            </ThemeProvider >
        );

        const input = await component.findByTestId(TEST_ID.CITY_FORM);

        expect(input).toHaveValue('');

        act(() => {
            fireEvent.change(input, { target: { value: testCity } });
        });

        expect(input).toHaveValue(testCity);

        expect(getLocationCoordsMock).toHaveBeenCalledTimes(1);
    });
});
