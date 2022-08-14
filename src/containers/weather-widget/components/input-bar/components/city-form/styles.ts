import styled from "styled-components";

export const Input = styled.input`
    padding: 0.3em 0;
    border: none;
    text-align: center;
    height: calc(${props => props.theme.rootFontSize} * 1.2);
    font-size: ${props => props.theme.rootFontSize};
    border-radius: ${props => props.theme.borderRadius}; 
    background: ${props => props.theme.palette.secondary.main};
    color: ${props => props.theme.palette.common.white};
    ::placeholder {
        opacity: 0.5;
        color: ${props => props.theme.palette.common.white};
    }
    cursor: pointer;
    width: 100%;
`;
