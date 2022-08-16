import styled from 'styled-components';

const CoreStyle = styled.div`
    font-size: ${props => props.theme.rootFontSize};
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: ${props => props.theme.borderRadius};
    box-sizing: border-box;
    box-shadow: ${props => props.theme.palette.common.black} 0 calc(3em / 16) 0.5em;
    background: ${props => props.theme.palette.primary.main};
`;

export const Card = styled(CoreStyle)`
    flex-direction: column;
    padding: 1em;
`;

export const Bar = styled(CoreStyle)`
    flex-direction: row;
    padding: 0 1em;
`;
