import { Theme } from "styled-components";
import { Flavor, IWidgetField } from "types/widget";

export interface IWeatherWidgetProps {
    appid: string;
    flavor?: Flavor;
    showWeatherCondition?: boolean;
    showMainTemperature?: boolean;
    showFeltTemperature?: boolean;
    showPressure?: boolean;
    showHumidity?: boolean;
    showMinimalTemperature?: boolean;
    showMaximalTemperature?: boolean;
    showSeaLevelPressure?: boolean;
    showGroundLevelPressure?: boolean;
    showVisibility?: boolean;
    showWind?: boolean;
    showClouds?: boolean;
    showRain?: boolean;
    showSnow?: boolean;
    theme?: 'light' | 'dark';
    updateSpeed?: number;
    defaultCity?: string;
    style?: Theme;
};

export interface IWidgetProps {
    appid: string;
    flavor: Flavor;
    defaultCity: string;
    showWidgetField: IWidgetField;
    updateSpeed: number;
}
