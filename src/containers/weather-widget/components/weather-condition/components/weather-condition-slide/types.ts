import { IWeatherConditionCode } from 'types/weather';

export interface IIconWrapper {
    isCard: boolean;
    animationSpeed: number;
    animationDelay: number;
    animate: boolean;
};

export interface IWeatherConditionSlideProps {
    condition: IWeatherConditionCode;
    animationSpeed: number;
    animationDelay: number;
    animate: boolean;
};
