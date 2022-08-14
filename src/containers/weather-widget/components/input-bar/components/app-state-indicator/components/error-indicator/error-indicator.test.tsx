import { cleanup, fireEvent, render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

import { lightTheme } from "theme";

import { TEST_ID } from 'constants/test-ids';

import { ErrorIndicator } from './error-indicator';

describe('Error Indicator Component', () => {
    afterEach(() => {
        cleanup();
    });

    it('should show tooltip on mouseEnter event and hide tooltip on mouseLeave event', async () => {
        const component = render(
            <ThemeProvider theme={lightTheme}>
                <ErrorIndicator />
            </ThemeProvider >
        );

        const errorIndicator = await component.findByTestId(TEST_ID.ERROR_INDICATOR);
        const tooltip = await component.findByTestId(TEST_ID.TOOLTIP);

        expect(tooltip).not.toBeVisible();

        fireEvent.mouseEnter(errorIndicator);

        expect(tooltip).toBeVisible();

        fireEvent.mouseLeave(errorIndicator);

        expect(tooltip).not.toBeVisible();
    });
});
