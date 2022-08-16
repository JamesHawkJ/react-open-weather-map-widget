import styled from 'styled-components';

import { IContainerProps, IStyleProps } from './types';

export const Container = styled.div<IContainerProps>`
    font-size: ${props => props.theme.rootFontSize};
    display: grid;
    ${props => !props.isCard && 'grid-auto-flow: column;'}
    ${props => !props.isCard && 'column-gap: 1em;'}
    grid-template-columns: ${props => props.isCard ? props.cellSize + ' auto auto;' : 'repeat(auto-fill, ' + props.cellSize + ' auto);'}
    align-items: center;
    ${props => !props.isCard && 'justify-content: space-around;'}
    justify-items: 'center';
    ${props => props.isCard && 'width: 100%;'}
    min-width: ${props => props.isCard ? '16em;' : '1em;'}
    ${props => props.isCard && 'padding-bottom: 1em;'}
`;


const StyledText = styled.div`
    font-weight: bold;
    color: ${props => props.theme.palette.primary.contrastText};
`;

export const Label = styled(StyledText)``;

export const Value = styled(StyledText) <IStyleProps>`
    ${props => props.isCard && 'justify-self: end;'}
    ${props => !props.isCard && 'margin-right: 1em;'}
`;
