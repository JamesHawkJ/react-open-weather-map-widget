import { WIDGET_ACTIONS } from '../constants/action-types';

import { Flavor, IControlWidgetAction, IWidgetFieldUpdatePayload } from '../types/widget';

import { setAppId, setShowWidgetField, setDefaultCity, setFlavor } from './widget';

describe('widget actions', () => {
    let dispatch: (({ type, payload }: IControlWidgetAction) => void);

    beforeAll(() => {
        dispatch = jest.fn((action) => action);
    });

    describe('setAppId', () => {
        it('should dispatch action SET_APP_ID with "appid" as payload', () => {
            const payload: string = 'appid';
            const action = { type: WIDGET_ACTIONS.SET_APPID, payload };

            setAppId(dispatch)(payload);

            expect(dispatch).toHaveBeenCalled();
            expect(dispatch).toHaveBeenCalledWith(action);
        });
    });

    describe('setShowWidgetField', () => {
        it('should dispatch action SET_SHOW_WIDGET_FIELD with fieldKey and boolean value as payload', () => {
            const payload: IWidgetFieldUpdatePayload = { fieldKey: 'property', value: true };
            const action = { type: WIDGET_ACTIONS.SET_SHOW_WIDGET_FIELD, payload };

            setShowWidgetField(dispatch)(payload);

            expect(dispatch).toHaveBeenCalled();
            expect(dispatch).toHaveBeenCalledWith(action);
        });
    });

    describe('setFlavor', () => {
        it('should dispatch action SET_FLAVOR with flavor string as payload', () => {
            const payload: Flavor = 'bar';
            const action = { type: WIDGET_ACTIONS.SET_FLAVOR, payload };

            setFlavor(dispatch)(payload);

            expect(dispatch).toHaveBeenCalled();
            expect(dispatch).toHaveBeenCalledWith(action);
        });
    });

    describe('setDefaultCity', () => {
        it('should dispatch action SET_DEFAULT_CITY with city string as payload', () => {
            const payload: string = 'city';
            const action = { type: WIDGET_ACTIONS.SET_DEFAULT_CITY, payload };

            setDefaultCity(dispatch)(payload);

            expect(dispatch).toHaveBeenCalled();
            expect(dispatch).toHaveBeenCalledWith(action);
        });
    });
});
