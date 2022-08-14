import { WIDGET_ACTIONS } from "constants/action-types";

import {
    Flavor,
    FlavorAction,
    IControlWidgetAction,
    IWidgetFieldUpdatePayload,
    StringAction,
    WidgetFieldUpdateAction
} from "types/widget";

export const setAppId: StringAction = (dispatch: ({ type, payload }: IControlWidgetAction) => void) => (value: string) => {
    dispatch({ type: WIDGET_ACTIONS.SET_APPID, payload: value });
};

export const setShowWidgetField: WidgetFieldUpdateAction = (dispatch: ({ type, payload }: IControlWidgetAction) => void) => (value: IWidgetFieldUpdatePayload) => {
    dispatch({ type: WIDGET_ACTIONS.SET_SHOW_WIDGET_FIELD, payload: value });
};

export const setFlavor: FlavorAction = (dispatch: ({ type, payload }: IControlWidgetAction) => void) => (value: Flavor) => {
    dispatch({ type: WIDGET_ACTIONS.SET_FLAVOR, payload: value });
};

export const setDefaultCity: StringAction = (dispatch: ({ type, payload }: IControlWidgetAction) => void) => (value: string) => {
    dispatch({ type: WIDGET_ACTIONS.SET_DEFAULT_CITY, payload: value });
};
