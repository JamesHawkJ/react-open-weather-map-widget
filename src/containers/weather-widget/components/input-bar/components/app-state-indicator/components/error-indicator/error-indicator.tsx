import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC, useState } from "react";
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';

import { TEST_ID } from "constants/test-ids";

import { Container, Icon } from "./styles";
import { Tooltip } from "./components";


export const ErrorIndicator: FC = () => {
    const [showTooltip, setShowTooltip] = useState<boolean>(false);

    return (
        <Container data-testid={TEST_ID.ERROR_INDICATOR} onMouseEnter={() => setShowTooltip(true)} onMouseLeave={() => setShowTooltip(false)}>
            <Icon><FontAwesomeIcon icon={faCircleExclamation} /></Icon>
            <Tooltip showTooltip={showTooltip} setShowTooltip={setShowTooltip} />
        </Container>
    );
};
