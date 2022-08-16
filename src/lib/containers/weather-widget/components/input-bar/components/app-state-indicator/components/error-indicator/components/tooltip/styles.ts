import styled from 'styled-components';

import { IContainerProps } from './types';

export const Container = styled.div<IContainerProps>`
    display: ${props => props.showTooltip ? 'flex;' : 'none;'}
    z-index: 2;
    min-width: 10em;
    width: fit-content;
    padding: 0.2em 0.5em;
    font-size: calc(0.7 * ${props => props.theme.rootFontSize});
    border-radius: ${props => props.theme.borderRadius};
    background: ${props => props.theme.palette.primary.main};
    color: ${props => props.theme.palette.error.contrastText};
    border: 0.6em solid ${props => props.theme.palette.error.main};
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    box-shadow: ${props => props.theme.palette.common.black} 0 calc(3em / 16) 0.5em;
    position: relative;
    right: ${props => props.widthOffset};
`;
