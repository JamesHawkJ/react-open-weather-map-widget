import { FC, memo, useContext } from "react";

import { WidgetContext } from "context/widget";

import { IconWrapper } from "components";

import { Container, Description } from "./styles";
import { IWeatherConditionSlideProps } from "./types";

const WeatherConditionSlide: FC<IWeatherConditionSlideProps> = ({ animationSpeed, animationDelay, condition, animate }) => {
    const { state: widgetState } = useContext(WidgetContext);

    return (
        <Container
            isCard={widgetState.flavor === 'card'}
            animationSpeed={animationSpeed}
            animationDelay={animationDelay}
            animate={animate}
        >
            <IconWrapper size={'4em'}>
                <img
                    src={`https://openweathermap.org/img/wn/${condition.icon}.png`}
                    alt={`${condition.icon}.png`}
                    height='100%'
                />
            </IconWrapper>
            {widgetState.flavor === 'card' && <Description>{condition.description}</Description>}
        </Container>
    );
};

const MemoizedWeatherConditionSlide = memo(WeatherConditionSlide);

export {
    MemoizedWeatherConditionSlide as WeatherConditionSlide
};
