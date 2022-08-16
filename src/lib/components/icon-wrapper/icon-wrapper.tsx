import { FC, useContext } from 'react';

import { WidgetContext } from '../../context/widget';

import { IIconWrapperProps } from './types';
import { StyledIconWrapper } from './styles';

export const IconWrapper: FC<IIconWrapperProps> = ({ children, size }) => {
    const { state: widgetState } = useContext(WidgetContext);

    return (
        <StyledIconWrapper isCard={widgetState.flavor === 'card'} size={size}>
            {children}
        </StyledIconWrapper>
    );
};
