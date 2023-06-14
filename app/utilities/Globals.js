import { Dimensions } from "react-native";

export const WINDOW_WIDTH = Dimensions.get('window').width;
export const WINDOW_HEIGHT = Dimensions.get('window').height;
export const MAIN_CARDWIDTH = WINDOW_WIDTH*0.85;

export const AppFonts = {
    regular:'Poppins-Regular',
    medium:'Poppins-Medium',
    bold:'Poppins-Bold',
}

export const FontSize = {
    small:WINDOW_HEIGHT*0.015,
    normal:WINDOW_HEIGHT*0.02,
    big:WINDOW_HEIGHT*0.028,
    thirty:WINDOW_HEIGHT*0.032
}

export const AppColors={
    black:'#000',
    white:'#FFF',
    primary:'#1CC2E9',
    secondary:'#D0F5FC',
    blackLight:'rgba(0 ,0, 0 ,0.3)',
    blackExtraLight:'rgba(0 ,0, 0 ,0.1)',
    gray:'#A9A9A9',
    darkgray:'#7A7A7A',

}