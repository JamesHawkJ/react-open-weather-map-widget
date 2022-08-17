import styled, { css, keyframes } from 'styled-components';

import { IIconWrapper } from './types';

const frames = keyframes`
    0%   {top: 100%; opacity: 1;}
    5%   {top: 0%; opacity: 1;}
    20%   {top: 0%; opacity: 1;}
    25%  {top: 0%; opacity: 0;}
    30%  {top: -100%;}
    100% {top: -100%;}
`;

const animation = () => css`${frames} infinite ease-in-out;`;

export const Container = styled.div<IIconWrapper>`
    font-size: ${props => props.theme.rootFontSize};
    background: ${props => props.theme.palette.primary.main};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    ${props => props.isCard && 'padding-top: 1em;'}
    position: absolute;
    width: 100%;
    ${props => props.animate && 'top: 100%;'}
    animation: ${animation};
    ${props => props.animate && 'animation-duration:' + props.animationSpeed + 's;'}
    ${props => props.animate && 'animation-delay: ' + props.animationDelay + 's;'}
`;

export const Description = styled.div`
    font-weight: bold;
    color: ${props => props.theme.palette.primary.contrastText};
`;
