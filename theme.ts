import { createTheme } from '@material-ui/core'

export const theme = createTheme({
    breakpoints: {
        values: {
            xs: 375,
            sm: 768,
            md: 1000,
            lg: 1200,
            xl: 1440,
        },
    },

    palette: {
        primary: {
            main: '#5022ed',
        },
        secondary: {
            main: 'rgb(23, 224, 181)',
        },

        common: {
            black: '#000',
            white: '#fff',
        },

        grey: {
            '100': '#b5b5b5',
            '200': '#7f88a0',
        },
    },

    typography: {
        h1: {
            color: 'white',
            fontSize: '2.75rem',
            lineHeight: '3rem',
        },

        body1: {
            fontSize: '1rem',
            color: 'black',
        },

        body2: {
            color: 'white',
            fontSize: '17px',
            lineHeight: '1.5rem',
        },

        subtitle1: {
            fontSize: '0.875rem',
        },
    },

    overrides: {
        MuiOutlinedInput: {
            root: {
                '&&& $input': {
                    padding: '0.8rem 0',
                },
            },
        },

        MuiSelect: {
            root: {
                display: 'flex !important',
                alignItems: 'center',
                gap: '1rem',
            },
        },

        MuiDivider: {
            root: {
                margin: '1rem !important',
            },
        },
    },
})
