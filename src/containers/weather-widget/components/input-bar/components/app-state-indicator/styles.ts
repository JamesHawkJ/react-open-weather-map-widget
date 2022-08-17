import styled, { keyframes } from 'styled-components';

export const Container = styled.div`
    position: absolute;
    right: 0.2em;
    top: 0;
    width: 1.5em;
    height: 1.5em;
    z-index: 1;
`;

const loading = keyframes`
    0%   {transform: rotate(0deg);}
    100% {transform: rotate(360deg);}
`;

export const Spinner = styled.div`
    display: inline-block;
    
    :after {
        content: " ";
        display: block;
        width: 0.75em;
        height: 0.75em;
        margin: 0.4em;
        border-radius: 50%;
        border: 0.15em solid ${props => props.theme.palette.common.white};
        border-color: ${props => props.theme.palette.common.white} transparent ${props => props.theme.palette.common.white} transparent;
        animation: ${loading} 1.2s linear infinite;
    }
`;
