import { TEST_ACTIONS, WIDGET_ACTIONS } from '../constants/action-types';

export interface IWidgetState {
    appid: string;
    showWidgetField: IWidgetField;
    flavor: string;
    defaultCity: string;
};

export interface IWidgetField {
    weatherCondition: boolean;
    mainTemperature: boolean;
    feltTemperature: boolean;
    pressure: boolean;
    humidity: boolean;
    minimalTemperature: boolean;
    maximalTemperature: boolean;
    seaLevelPressure: boolean;
    groundLevelPressure: boolean;
    visibility: boolean;
    wind: boolean;
    clouds: boolean;
    rain: boolean;
    snow: boolean;
};

export interface IControlWidgetAction {
    type: WIDGET_ACTIONS | TEST_ACTIONS;
    payload: IWidgetFieldUpdatePayload | boolean | string | Flavor;
};

export interface IWidgetFieldUpdatePayload {
    fieldKey: string;
    value: boolean;
};

export type Flavor = 'card' | 'bar';

export interface IWidgetContext {
    state: IWidgetState;
    dispatch: (action: IControlWidgetAction) => void;
    setAppId: StringAction;
    setFlavor: FlavorAction;
    setDefaultCity: StringAction;
    setShowWidgetField: WidgetFieldUpdateAction;
};

export type StringAction = (dispatch: ({ type, payload }: IControlWidgetAction) => void) => (value: string) => void;

export type WidgetFieldUpdateAction =
    (dispatch: ({ type, payload }: IControlWidgetAction) => void) => (value: IWidgetFieldUpdatePayload) => void;

export type FlavorAction = (dispatch: ({ type, payload }: IControlWidgetAction) => void) => (value: Flavor) => void;
