import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC, memo, useContext, useState } from 'react';

import { WidgetContext } from '../../../../context/widget';

import { IconWrapper } from '../../../../components';

import { Container, Label, Value } from './styles';
import { IIndicatorFieldProps } from './types';

const IndicatorField: FC<IIndicatorFieldProps> = ({ icon, label, value }) => {
    const { state: widgetState } = useContext(WidgetContext);
    const [cellSize] = useState<string>('2em');

    return (
        <Container isCard={widgetState.flavor === 'card'} cellSize={cellSize}>
            <IconWrapper size={cellSize}>
                <FontAwesomeIcon icon={icon} />
            </IconWrapper>
            {widgetState.flavor === 'card' && <Label>{label}</Label>}
            <Value isCard={widgetState.flavor === 'card'}>{value}</Value>
        </Container>
    );
};

const MemoizedIndicatorField = memo(IndicatorField);

export {
    MemoizedIndicatorField as IndicatorField
};
