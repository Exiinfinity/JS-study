// import original module declarations
import 'styled-components';

declare module 'styled-components'{
    export interface DefaultTheme{
        boxColor:string;
        textColor: string;
        bgColor: string;
        accentColor: string;
    }
    export interface lightTheme{
        boxColor:string;
        textColor: string;
        bgColor: string;
        accentColor: string;
    }
}