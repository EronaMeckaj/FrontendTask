import { Theme } from "../theme.models";

export const darkTheme: Theme = {
  name: 'dark',
  properties: {
    '--background': '#1F2125',
    '--on-background': '#fff',
    '--primary': '#B3261E',
    '--on-primary': '#000',
    '--active-color': 'red',
    '--font-family': 'Roboto',
    '--on-box-shadow': '0.5',
    '--navbar-background': '#1F2125',
    '--icon-left': 'url("../../../../assets/left-arrow-white.png")',
    '--icon-right': 'url("../../../../assets/right-arrow-white.png")'
  },
};
