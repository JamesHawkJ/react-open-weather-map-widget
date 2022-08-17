import styled from 'styled-components';

import { IWeatherConditionSliderProps } from './types';

export const WeatherConditionSlider = styled.div<IWeatherConditionSliderProps>`
    position: relative;
    ${props => props.isCard ? 'height: ' + (props.size ? props.size + ';' : '1em;') : ''}
    width: ${props => props.isCard ? '100%;' : '2em;'}
    ${props => !props.isCard && 'height: 3em;'}
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
`;
