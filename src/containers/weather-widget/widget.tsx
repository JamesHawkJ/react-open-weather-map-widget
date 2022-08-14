import { FC, memo, useCallback, useContext, useEffect, useState } from "react";
import { StyledComponent } from "styled-components";

import { TEST_ID } from "constants/test-ids";

import { IWidgetField, IWidgetFieldUpdatePayload } from "types/widget";

import { GeocodingContext } from "context/geocoding";
import { WeatherContext } from "context/weather";
import { WidgetContext } from "context/widget";

import { mapThroughWidgetFields } from "functions/map-through-widget-fields";

import { IWidgetProps } from "./types";
import { IIndicatorFieldProps } from "./components/indicator-field/types";

import { Bar, Card } from "./styles";

import { IndicatorField, InputBar, WeatherCondition } from "./components";

const Widget: FC<IWidgetProps> = ({ appid, flavor, defaultCity, showWidgetField, updateSpeed }) => {
    const [Container] = useState<StyledComponent<"div", any>>(flavor === 'card' ? Card : Bar);

    const {
        state: widgetState,
        dispatch: widgetDispatch,
        setAppId,
        setFlavor,
        setDefaultCity,
        setShowWidgetField,
    } = useContext(WidgetContext);

    const { state: geocodingState } = useContext(GeocodingContext);

    const {
        state: weatherState,
        dispatch: weatherDispatch,
        getWeatherInfo,
    } = useContext(WeatherContext);

    const [intervalID, setIntervalID] = useState<NodeJS.Timeout | undefined>(undefined);
    const [indicatorFields, setIndicatorFields] = useState<IIndicatorFieldProps[]>([]);

    useEffect(() => {
        for (const [key, value] of Object.entries<boolean>({ ...showWidgetField })) {
            if (widgetState.showWidgetField[key as keyof IWidgetField] !== value) {
                const fieldUpdate: IWidgetFieldUpdatePayload = {
                    fieldKey: key,
                    value
                };
                setShowWidgetField(widgetDispatch)(fieldUpdate);
            }
        }
    }, [showWidgetField]);

    useEffect(() => {
        setDefaultCity(widgetDispatch)(defaultCity);
    }, [defaultCity]);

    useEffect(() => {
        setFlavor(widgetDispatch)(flavor);
    }, [flavor]);

    useEffect(() => {
        setAppId(widgetDispatch)(appid);
    }, [appid]);

    const fetchWeather = useCallback(() => {
        if (geocodingState.coords) getWeatherInfo(weatherDispatch)(appid, geocodingState.coords.lon, geocodingState.coords.lat);
        // eslint-disable-next-line
    }, [geocodingState.coords]);

    useEffect(() => {
        if (geocodingState.coords && !intervalID) {
            fetchWeather();
            const id = setInterval(fetchWeather, updateSpeed);
            setIntervalID(id);
        } else {
            clearInterval(intervalID);
            setIntervalID(undefined);
        }
        return () => {
            clearInterval(intervalID);
        }
        // eslint-disable-next-line
    }, [geocodingState.coords]);

    useEffect(() => {
        if (widgetState.showWidgetField
            && !weatherState.loading
            && weatherState.weatherData) setIndicatorFields(mapThroughWidgetFields(widgetState, weatherState));
    }, [widgetState.showWidgetField, weatherState.weatherData]);

    return (
        <Container data-testid={TEST_ID.WIDGET}>
            <WeatherCondition />
            <InputBar />
            {
                indicatorFields?.length
                    ? indicatorFields
                        .map(item => <IndicatorField key={item.label} icon={item.icon} label={item.label} value={item.value} />)
                    : null
            }
        </Container>
    );
};

const MemoizedWidget = memo(Widget);

export {
    MemoizedWidget as Widget
};
