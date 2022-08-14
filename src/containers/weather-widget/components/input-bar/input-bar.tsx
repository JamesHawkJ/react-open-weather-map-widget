import { FC, useContext } from "react";

import { WidgetContext } from "context/widget";

import { AppStateIndicator, CityForm } from "./components";
import { Container } from './styles';

export const InputBar: FC = () => {
    const { state: widgetState } = useContext(WidgetContext);

    return (
        <Container isCard={widgetState.flavor === 'card'}>
            <CityForm />
            <AppStateIndicator />
        </Container>
    );
};
