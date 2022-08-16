import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export interface IStyleProps {
    isCard: boolean;
};

export interface IContainerProps extends IStyleProps {
    cellSize: string;
};

export interface IIndicatorFieldProps {
    icon: IconDefinition;
    label: string;
    value: string;
};
