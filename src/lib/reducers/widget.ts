import { WIDGET_ACTIONS } from '../constants/action-types';

import {
    Flavor,
    IControlWidgetAction,
    IWidgetFieldUpdatePayload,
    IWidgetState
} from '../types/widget';

const widgetReducer = (state: IWidgetState, action: IControlWidgetAction): IWidgetState => {
    switch (action.type) {
        case WIDGET_ACTIONS.SET_APPID:
            return {
                ...state,
                appid: action.payload as string,
            }
        case WIDGET_ACTIONS.SET_SHOW_WIDGET_FIELD:
            const fieldUpdate = action.payload as IWidgetFieldUpdatePayload;
            if (!Object.keys(state.showWidgetField).includes(fieldUpdate.fieldKey)) return { ...state };
            return {
                ...state,
                showWidgetField: { ...state.showWidgetField, [fieldUpdate.fieldKey]: fieldUpdate.value },
            }
        case WIDGET_ACTIONS.SET_FLAVOR:
            return {
                ...state,
                flavor: action.payload as Flavor,
            }
        case WIDGET_ACTIONS.SET_DEFAULT_CITY:
            return {
                ...state,
                defaultCity: action.payload as string,
            }
        default:
            return {
                ...state
            }
    };
};

export default widgetReducer;
