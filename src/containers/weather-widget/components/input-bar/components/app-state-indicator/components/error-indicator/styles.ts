import styled from 'styled-components';

export const Container = styled.div`
    margin-top: 0.4em;
    color: ${props => props.theme.palette.common.white};
`;

export const Icon = styled.span`
    color: ${props => props.theme.palette.error.main};
`;
