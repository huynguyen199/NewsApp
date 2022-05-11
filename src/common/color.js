import {DarkTheme, DefaultTheme} from "@react-navigation/native"

const darkColor = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: "#000000",
    orange: "#ffa500",
    black: "#fff",
    white: "#000000",
    ghostWhite: "#f8f8ff",
    grey: "#CFCFCF",
    blue: "#6495ed",
    red: "#ff0000",
    lightRed: "rgb(255, 45, 85)",
    yellow: "#ffff00",
    greenYellow: "#adff2f",
    green: "#008000",
    lightGrey: "#d3d3d3",
  },
}

const lightColor = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#fff",
    orange: "#ffa500",
    black: "#000000",
    white: "#fff",
    ghostWhite: "#f8f8ff",
    grey: "#CFCFCF",
    blue: "#6495ed",
    red: "#ff0000",
    lightRed: "rgb(255, 45, 85)",
    yellow: "#ffff00",
    greenYellow: "#adff2f",
    green: "#008000",
    lightGrey: "#d3d3d3",
    whiteSmoke: "#f5f5f5",
  },
}

// primary: "#fff",
//     orange: "#ffa500",
//     black: "#000000",
//     white: "#fff",
//     ghostWhite: "#f8f8ff",
//     grey: "#CFCFCF",
//     blue: "#6495ed",
//     red: "#ff0000",
//     redLight: "rgb(255, 45, 85)",
//     yellow: "#ffff00",
//     greenYellow: "#adff2f",
//     green: "#008000",
//     lightGrey: "#d3d3d3",

export {lightColor, darkColor}
