import { Theme } from 'styled-components';

export const lightTheme: Theme = {
    rootFontSize: '16px',
    borderRadius: '4px',
    palette: {
        common: {
            black: '#1E1E24',
            white: '#f8f9fa',
        },
        primary: {
            main: '#C7C7A6',
            contrastText: '#363020',
        },
        secondary: {
            main: '#827d69',
            contrastText: '#363020',
        },
        error: {
            main: '#c7b9a6',
            contrastText: '#7a3c37',
        },
    }
};

export const darkTheme: Theme = {
    rootFontSize: '16px',
    borderRadius: '4px',
    palette: {
        common: {
            black: '#1E1E24',
            white: '#f8f9fa',
        },
        primary: {
            main: '#150050',
            contrastText: '#f8f9fa',
        },
        secondary: {
            main: '#3F0071',
            contrastText: '#f8f9fa',
        },
        error: {
            main: '#71001c',
            contrastText: '#170071',
        },
    }
};
