import styled from "styled-components";

import { IStyledIconWrapperProps } from "./types";

export const StyledIconWrapper = styled.div<IStyledIconWrapperProps>`
    ${props => props.isCard ? 'height: ' + props.size ? props.size : '1em;' : ''}
    ${props => props.isCard ? 'width: ' + props.size ? props.size : '1em;' : ''}
    display: grid;
    align-items: center;
    justify-items: center;
    color: ${props => props.theme.palette.primary.contrastText};
`;
