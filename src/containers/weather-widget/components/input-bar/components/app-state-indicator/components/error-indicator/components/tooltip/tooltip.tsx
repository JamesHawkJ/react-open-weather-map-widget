import { FC, memo, useContext, useRef, useState, useEffect } from 'react';

import { TEST_ID } from '../../../../../../../../../../constants/test-ids';

import { GeocodingContext } from '../../../../../../../../../../context/geocoding';
import { WeatherContext } from '../../../../../../../../../../context/weather';

import { IErrorProps, ITootltipProps } from './types';
import { Container } from './styles';

const Tooltip: FC<ITootltipProps> = ({ showTooltip, setShowTooltip }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [widthOffset, setWidthOffset] = useState<number>(0);

    useEffect(() => {
        if (containerRef.current) setWidthOffset(containerRef.current.getBoundingClientRect().width);
    }, []);

    const { state: geocodingState } = useContext(GeocodingContext);
    const { state: weatherState } = useContext(WeatherContext);

    const Error: FC<IErrorProps> = memo(({ error }) => <span>{`\u2b24  ` + error}</span>);

    return (
        <Container
            data-testid={TEST_ID.TOOLTIP}
            showTooltip={showTooltip}
            onMouseLeave={() => setShowTooltip(false)}
            ref={containerRef}
            widthOffset={`${widthOffset ? widthOffset + 'px' : '10em'}`}
        >
            {
                geocodingState.errors
                    .concat(weatherState.errors)
                    .map((error, index) => <Error key={index} error={error} />)
            }
        </Container>
    );
};

const MemoizedTooltip = memo(Tooltip);

export {
    MemoizedTooltip as Tooltip
};
