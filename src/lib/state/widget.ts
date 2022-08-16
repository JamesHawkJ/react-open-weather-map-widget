import { IWidgetContext, IWidgetState } from '../types/widget';

export const widget: IWidgetState = {
    appid: '',
    showWidgetField: {
        weatherCondition: true,
        mainTemperature: true,
        feltTemperature: false,
        pressure: true,
        humidity: true,
        minimalTemperature: false,
        maximalTemperature: false,
        seaLevelPressure: false,
        groundLevelPressure: false,
        visibility: false,
        wind: false,
        clouds: false,
        rain: false,
        snow: false,
    },
    flavor: 'bar',
    defaultCity: '',
};

export const widgetContext: IWidgetContext = {
    state: widget,
    dispatch: () => null,
    setAppId: () => () => null,
    setFlavor: () => () => null,
    setDefaultCity: () => () => null,
    setShowWidgetField: () => () => null,
};
