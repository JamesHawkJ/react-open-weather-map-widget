import { FC, memo, useEffect, useState } from 'react';
import { ThemeProvider } from 'styled-components';

import { lightTheme, darkTheme } from '../../theme';

import { IWidgetField } from '../../types/widget';

import { WeatherProvider } from '../../context/weather';
import { GeocodingProvider } from '../../context/geocoding';
import { WidgetProvider } from '../../context/widget';

import { IWeatherWidgetProps } from './types';

import { Widget } from './widget';

const WeatherWidget: FC<IWeatherWidgetProps> = ({
    appid,
    flavor = 'bar',
    showWeatherCondition = true,
    showMainTemperature = true,
    showFeltTemperature = false,
    showPressure = true,
    showHumidity = true,
    showMinimalTemperature = false,
    showMaximalTemperature = false,
    showSeaLevelPressure = false,
    showGroundLevelPressure = false,
    showVisibility = false,
    showWind = false,
    showClouds = false,
    showRain = false,
    showSnow = false,
    theme = 'light',
    updateSpeed = 30000,
    defaultCity = '',
    style = undefined,
}: IWeatherWidgetProps) => {
    const [chosenTheme] = useState(style ? style : theme === 'light' ? lightTheme : darkTheme);
    const [showWidgetField, setShowWidgetField] = useState<IWidgetField>({
        weatherCondition: showWeatherCondition,
        mainTemperature: showMainTemperature,
        feltTemperature: showFeltTemperature,
        pressure: showPressure,
        humidity: showHumidity,
        minimalTemperature: showMinimalTemperature,
        maximalTemperature: showMaximalTemperature,
        seaLevelPressure: showSeaLevelPressure,
        groundLevelPressure: showGroundLevelPressure,
        visibility: showVisibility,
        wind: showWind,
        clouds: showClouds,
        rain: showRain,
        snow: showSnow,
    });

    useEffect(() => {
        setShowWidgetField({
            weatherCondition: showWeatherCondition,
            mainTemperature: showMainTemperature,
            feltTemperature: showFeltTemperature,
            pressure: showPressure,
            humidity: showHumidity,
            minimalTemperature: showMinimalTemperature,
            maximalTemperature: showMaximalTemperature,
            seaLevelPressure: showSeaLevelPressure,
            groundLevelPressure: showGroundLevelPressure,
            visibility: showVisibility,
            wind: showWind,
            clouds: showClouds,
            rain: showRain,
            snow: showSnow,
        });
    },
        [
            showWeatherCondition,
            showMainTemperature,
            showFeltTemperature,
            showPressure,
            showHumidity,
            showMinimalTemperature,
            showMaximalTemperature,
            showSeaLevelPressure,
            showGroundLevelPressure,
            showVisibility,
            showWind,
            showClouds,
            showRain,
            showSnow,
        ]
    );

    return (
        <WidgetProvider>
            <GeocodingProvider>
                <WeatherProvider>
                    <ThemeProvider theme={chosenTheme}>
                        <Widget
                            appid={appid}
                            flavor={flavor}
                            showWidgetField={showWidgetField}
                            updateSpeed={updateSpeed}
                            defaultCity={defaultCity}
                        />
                    </ThemeProvider>
                </WeatherProvider>
            </GeocodingProvider>
        </WidgetProvider>
    );
};

const MemoizedWeatherWidget = memo(WeatherWidget);

export {
    MemoizedWeatherWidget as WeatherWidget
};
