import { ChangeEvent, FC, useEffect, useContext, useState, useCallback } from "react";

import { TEST_ID } from "constants/test-ids";

import { GeocodingContext } from "context/geocoding";
import { WidgetContext } from "context/widget";

import { useDebouncedValue } from "hooks/use-debounced-value";

import { Input } from "./styles";

export const CityForm: FC = () => {
    const { state: widgetState } = useContext(WidgetContext);
    const {
        dispatch: geocodingDispatch,
        getLocationCoords,
        clearLocationCoords,
    } = useContext(GeocodingContext);

    const [city, setCity] = useState<string>(widgetState.defaultCity || '');
    const debouncedCity = useDebouncedValue<string>(city, 800);

    useEffect(() => {
        if (widgetState.defaultCity) setCity(widgetState.defaultCity);
    }, [widgetState.defaultCity]);

    const fetchCallback = useCallback(() => {
        getLocationCoords(geocodingDispatch)(widgetState.appid, debouncedCity);
    }, [debouncedCity]);

    useEffect(() => {
        if (debouncedCity && widgetState.appid) {
            fetchCallback();
        } else {
            clearLocationCoords(geocodingDispatch)();
        }
        return () => {
            clearLocationCoords(geocodingDispatch)();
        }
    }, [debouncedCity, widgetState.appid]);

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        setCity(e.target.value);
    };

    return (
        <Input
            data-testid={TEST_ID.CITY_FORM}
            type={'text'}
            value={city}
            onChange={handleOnChange}
            placeholder={"Type your City's name..."}
        />
    );
};
