import {extendTheme} from "@chakra-ui/react";

export const colors = {
    white: 'rgb(255, 255, 255)',
    black: 'rgb(0, 0, 0)',
    gray: {
        50: 'rgb(249,250,252)',  //  gray
        100: 'rgb(243,245,248)', // bgGray
        200: 'rgb(225,226,228)', // borderGray
        500: 'rgb(201,202,204)', // darkGray
        900: 'gray',             // textGray
    },
    primary: {
        500: 'rgb(65, 63, 140)',
    },
    secondary: {
        500: 'rgb(0, 0, 0)',
    },
    success: {
        500: 'rgb(0, 128, 0)',
    },
    danger: {
        500: 'rgb(255, 0, 0)',
    },
    warning: {
        500: 'rgb(255, 255, 0)',
    },
    info: {
        500: 'rgb(0, 0, 255)',
    },
    light: 'rgb(255, 255, 255)',
    dark: 'rgb(0, 0, 0)',
    transparent: 'rgba(0, 0, 0, 0)',
    current: 'currentColor',
};

export const radius = {
    small: '4px',
    medium: '8px',
    large: '12px',
};


export const chakraTheme = extendTheme({
    colors,
    radii: {
        sm: '4px',
        md: '8px',
        lg: '12px',
    },
    space: {
        gutter: {
            x: '16px',
            y: '16px',
        },
    },
});

