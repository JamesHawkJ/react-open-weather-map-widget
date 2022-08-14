import { render } from "@testing-library/react";
import React from "react";

import { WeatherWidget } from "./weather-widget";

describe('Weather Widget Component', () => {
    it('should convert seperate showWidgetField props into one object', () => {
        const setStateMock = jest.fn();

        const useStateMock: any = (useState: any) => [useState, setStateMock];

        jest.spyOn(React, "useState").mockImplementation(useStateMock);

        render(
            <WeatherWidget
                appid=''
                showRain={true}
                showSnow={true}
            />
        );

        expect(setStateMock).toBeCalledWith({
            weatherCondition: true,
            mainTemperature: true,
            feltTemperature: false,
            pressure: true,
            humidity: true,
            minimalTemperature: false,
            maximalTemperature: false,
            seaLevelPressure: false,
            groundLevelPressure: false,
            visibility: false,
            wind: false,
            clouds: false,
            rain: true,
            snow: true,
        });
    });
});
