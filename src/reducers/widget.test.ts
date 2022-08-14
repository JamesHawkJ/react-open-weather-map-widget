import { TEST_ACTIONS, WIDGET_ACTIONS } from "constants/action-types";

import { Flavor, IControlWidgetAction, IWidgetFieldUpdatePayload, IWidgetState } from "types/widget";

import { widget } from "state/widget";

import widgetReducer from "./widget";

describe('widget reducer', () => {
    describe('SET_APPID', () => {
        it('should set "appid" to value from payload', () => {
            const testAppID: string = 'appid';
            const initialState: IWidgetState = widget;
            const updateAction: IControlWidgetAction = { type: WIDGET_ACTIONS.SET_APPID, payload: testAppID };
            const updatedState: IWidgetState = widgetReducer(initialState, updateAction);

            expect(updatedState.appid).toEqual(testAppID);
        });
    });

    describe('SET_SHOW_WIDGET_FIELD', () => {
        it('should update showWidgetField property with value from payload', () => {
            const fieldUpdate: IWidgetFieldUpdatePayload = { fieldKey: 'weatherCondition', value: false };
            const initialState: IWidgetState = widget;
            const updateAction: IControlWidgetAction = { type: WIDGET_ACTIONS.SET_SHOW_WIDGET_FIELD, payload: fieldUpdate };
            const updatedState: IWidgetState = widgetReducer(initialState, updateAction);

            expect(updatedState.showWidgetField.weatherCondition).toEqual(fieldUpdate.value);
        });

        it('should not update showWidgetField property after receiving action with fieldKey from payload not matching state properties', () => {
            const fieldUpdate: IWidgetFieldUpdatePayload = { fieldKey: 'corrupted', value: false };
            const initialState: IWidgetState = widget;
            const updateAction: IControlWidgetAction = { type: WIDGET_ACTIONS.SET_SHOW_WIDGET_FIELD, payload: fieldUpdate };
            const updatedState: IWidgetState = widgetReducer(initialState, updateAction);

            expect(updatedState).toEqual(initialState);
        });
    });

    describe('SET_FLAVOR', () => {
        it('should update flavor property with value from payload', () => {
            const testFlavor: Flavor = 'bar';
            const initialState: IWidgetState = widget;
            const updateAction: IControlWidgetAction = { type: WIDGET_ACTIONS.SET_FLAVOR, payload: testFlavor };
            const updatedState: IWidgetState = widgetReducer(initialState, updateAction);

            expect(updatedState.flavor).toEqual(testFlavor);
        });
    });

    describe('SET_DEFAULT_CITY', () => {
        it('should update defaultCity property with value from payload', () => {
            const testCity: string = 'city';
            const initialState: IWidgetState = widget;
            const updateAction: IControlWidgetAction = { type: WIDGET_ACTIONS.SET_DEFAULT_CITY, payload: testCity };
            const updatedState: IWidgetState = widgetReducer(initialState, updateAction);

            expect(updatedState.defaultCity).toEqual(testCity);
        });
    });

    describe('TEST_ACTION', () => {
        it('should return unchanged state if random action is passed', () => {
            const initialState: IWidgetState = widget;
            const updateAction: IControlWidgetAction = { type: TEST_ACTIONS.TEST_ACTION, payload: 'corrupted' };
            const updatedState: IWidgetState = widgetReducer(initialState, updateAction);

            expect(updatedState).toEqual(initialState);
        });
    });
});
