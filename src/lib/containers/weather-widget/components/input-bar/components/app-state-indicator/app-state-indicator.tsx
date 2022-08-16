import { FC, useContext } from 'react';

import { TEST_ID } from '../../../../../../constants/test-ids';

import { GeocodingContext } from '../../../../../../context/geocoding';
import { WeatherContext } from '../../../../../../context/weather';

import { Container, Spinner } from './styles';
import { ErrorIndicator } from './components';


export const AppStateIndicator: FC = () => {
    const { state: geocodingState } = useContext(GeocodingContext);
    const { state: weatherState } = useContext(WeatherContext);

    return (
        <Container>
            {
                geocodingState.errors.length || weatherState.errors.length ?
                    <ErrorIndicator /> :
                    geocodingState.loading || weatherState.loading ?
                        <Spinner data-testid={TEST_ID.SPINNER} /> :
                        null
            }
        </Container>
    );
};
