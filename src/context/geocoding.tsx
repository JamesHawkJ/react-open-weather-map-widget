import { createContext, FC, ReactNode, useReducer, useMemo } from 'react';

import { IGeocodingContext } from 'types/geocoding';

import { geocodingActions } from 'actions';

import geocodingReducer from 'reducers/geocoding';

import { geocoding, geocodingContext } from 'state/geocoding';


const GeocodingContext = createContext<IGeocodingContext>(geocodingContext);

const GeocodingProvider: FC<{ children: ReactNode; }> = ({ children }) => {
    const [state, dispatch] = useReducer(geocodingReducer, geocoding);

    const memoizedProviderValue = useMemo(() => ({
        state: { ...state },
        dispatch,
        getLocationCoords: geocodingActions.getLocationCoords,
        clearLocationCoords: geocodingActions.clearLocationCoords,
    }), [state, dispatch, geocodingActions]);

    return (
        <GeocodingContext.Provider value={memoizedProviderValue}>
            {children}
        </GeocodingContext.Provider>
    );
};

export { GeocodingContext, GeocodingProvider };
