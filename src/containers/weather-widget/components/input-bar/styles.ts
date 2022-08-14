import styled from "styled-components";

import { IInputStyleProps } from "./types";

export const Container = styled.div<IInputStyleProps>`
    position: relative;
    margin: 1em 1em;
    ${props => props.isCard && 'width: 100%;'}
`;
