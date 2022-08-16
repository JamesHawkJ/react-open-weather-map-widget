import { FC, useContext, useState } from 'react';

import { TEST_ID } from '../../../../constants/test-ids';

import { WeatherContext } from '../../../../context/weather';
import { WidgetContext } from '../../../../context/widget';

import WeatherConditionSlide from './components/weather-condition-slide';
import { WeatherConditionSlider } from './styles';

export const WeatherCondition: FC = () => {
    const { state: widgetState } = useContext(WidgetContext);
    const { state: weatherState } = useContext(WeatherContext);

    const [animationSpeed] = useState<number>(20);

    return (
        <>
            {
                widgetState.showWidgetField.weatherCondition &&
                weatherState.weatherData?.weather &&
                <WeatherConditionSlider data-testid={TEST_ID.WEATHER_CONDITION} isCard={widgetState.flavor === 'card'} size={'7em'}>
                    {
                        weatherState.weatherData?.weather
                            .map((condition, index) => <WeatherConditionSlide
                                key={condition.id}
                                animationSpeed={animationSpeed}
                                animationDelay={animationSpeed * index / (weatherState.weatherData?.weather.length || 1)}
                                condition={condition}
                                animate={weatherState.weatherData?.weather.length as number > 1}
                            />)
                    }
                </WeatherConditionSlider>
            }
        </>
    );
};
