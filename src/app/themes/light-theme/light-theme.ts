import { Theme } from "../theme.models";

export const lightTheme: Theme = {
  name: 'light',
  properties: {
    '--background': '#fff',
    '--on-background': '#000',
    '--primary': '#B3261E',
    '--on-primary': '#000',
    '--active-color': 'red',
    '--font-family': 'Roboto',
    '--on-box-shadow': '1',
    '--navbar-background': 'white',
    '--icon-left': 'url("../../../../assets/arrow-left.png")',
    '--icon-right': 'url("../../../../assets/right-arrow.png")'
  },
};
