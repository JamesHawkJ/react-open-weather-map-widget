import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

import { IWeatherState } from "types/weather";
import { IWidgetField, IWidgetState } from "types/widget";
import { IIndicatorFieldProps } from "containers/weather-widget/components/indicator-field/types";

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


export const mapThroughWidgetFields: (widgetState: IWidgetState, weatherState: IWeatherState) => IIndicatorFieldProps[] = (widgetState, weatherState) => {
    const labelMap = new Map<string, string>([
        ['clouds', 'Clouds'],
        ['feltTemperature', 'Felt Temperature'],
        ['groundLevelPressure', 'Ground Level Pressure'],
        ['humidity', 'Humidity'],
        ['mainTemperature', 'Temperature'],
        ['maximalTemperature', 'Maximal Temperature'],
        ['minimalTemperature', 'Minimal Temperature'],
        ['pressure', 'Pressure'],
        ['rain', 'Rain'],
        ['seaLevelPressure', 'Sea Level Pressure'],
        ['snow', 'Snow'],
        ['visibility', 'Visibility'],
        ['wind', 'Wind'],
    ]);

    const iconMap = new Map<string, IconDefinition>([
        ['clouds', faCloud],
        ['feltTemperature', faTemperatureHalf],
        ['groundLevelPressure', faGaugeHigh],
        ['humidity', faDroplet],
        ['mainTemperature', faTemperatureHalf],
        ['maximalTemperature', faTemperatureArrowUp],
        ['minimalTemperature', faTemperatureArrowDown],
        ['pressure', faGaugeHigh],
        ['rain', faUmbrella],
        ['seaLevelPressure', faGaugeHigh],
        ['snow', faSnowflake],
        ['visibility', faEyeLowVision],
        ['wind', faWind],
    ]);

    const valueMap = new Map<string, string>([
        ['clouds', `${weatherState.weatherData?.clouds?.all} %`],
        ['feltTemperature', `${weatherState.weatherData?.main.feels_like} \u00B0`],
        ['groundLevelPressure', `${weatherState.weatherData?.main.grnd_level} \u00B0`],
        ['humidity', `${weatherState.weatherData?.main.humidity} %`],
        ['mainTemperature', `${weatherState.weatherData?.main.temp} \u00B0`],
        ['maximalTemperature', `${weatherState.weatherData?.main.temp_max} \u00B0`],
        ['minimalTemperature', `${weatherState.weatherData?.main.temp_min} \u00B0`],
        ['pressure', `${weatherState.weatherData?.main.pressure} hPa`],
        ['rain', `${weatherState.weatherData?.rain?.["1h"]} mm/h`],
        ['seaLevelPressure', `${weatherState.weatherData?.main.sea_level} \u00B0`],
        ['snow', `${weatherState.weatherData?.snow?.["1h"]} mm/h`],
        ['visibility', `${weatherState.weatherData?.visibility} %`],
        ['wind', `${weatherState.weatherData?.wind?.speed} m/s`],
    ]);


    const fieldsToMap = Object.keys(widgetState.showWidgetField).reduce((acc: string[], field: string): string[] => {
        let newAcc = [...acc];
        if (widgetState.showWidgetField[field as keyof IWidgetField] && field !== 'weatherCondition') newAcc.push(field);
        return newAcc;
    }, []);

    const indicatorFields: IIndicatorFieldProps[] = fieldsToMap.reduce((acc: IIndicatorFieldProps[], field: string): IIndicatorFieldProps[] => {
        let newAcc = [...acc];
        if (!(valueMap.get(field) as string).includes('undefined')) newAcc.push({
            icon: iconMap.get(field) as IconDefinition,
            label: labelMap.get(field) as string,
            value: valueMap.get(field) as string,
        });
        return newAcc;
    }, []);

    return indicatorFields;
};
