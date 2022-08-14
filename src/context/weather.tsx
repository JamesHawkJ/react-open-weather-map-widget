import { createContext, FC, ReactNode, useReducer, useMemo } from 'react';

import { IWeatherContext } from 'types/weather';

import { weatherActions } from 'actions';

import weatherReducer from 'reducers/weather';

import { weather, weatherContext } from 'state/weather';


const WeatherContext = createContext<IWeatherContext>(weatherContext);

const WeatherProvider: FC<{ children: ReactNode; }> = ({ children }) => {
    const [state, dispatch] = useReducer(weatherReducer, weather);

    const memoizedProviderValue = useMemo(() => ({
        state: { ...state },
        dispatch,
        getWeatherInfo: weatherActions.getWeatherInfo,
    }), [state, dispatch, weatherActions]);

    return (
        <WeatherContext.Provider value={memoizedProviderValue}>
            {children}
        </WeatherContext.Provider>
    );
};

export { WeatherContext, WeatherProvider };
