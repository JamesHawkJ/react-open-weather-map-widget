import { createContext, FC, ReactNode, useReducer, useMemo } from 'react';

import { IWidgetContext } from '../types/widget';

import { widgetActions } from '../actions';

import widgetReducer from '../reducers/widget';

import { widget, widgetContext } from '../state/widget';


const WidgetContext = createContext<IWidgetContext>(widgetContext);

const WidgetProvider: FC<{ children: ReactNode; }> = ({ children }) => {
    const [state, dispatch] = useReducer(widgetReducer, widget);

    const memoizedProviderValue = useMemo(
        () => ({
            state: { ...state },
            dispatch,
            setAppId: widgetActions.setAppId,
            setFlavor: widgetActions.setFlavor,
            setDefaultCity: widgetActions.setDefaultCity,
            setShowWidgetField: widgetActions.setShowWidgetField,
        }),
        // eslint-disable-next-line
        [state, dispatch, widgetActions]
    );

    return (
        <WidgetContext.Provider value={memoizedProviderValue}>
            {children}
        </WidgetContext.Provider>
    );
};

export { WidgetContext, WidgetProvider };
