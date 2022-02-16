import * as React from "react";

import logo from "../assets/logo.png";

export const APP_LOGO_TESTID = "app-logo";


const AppLogo : React.FunctionComponent = (() => {
    return (
        <img data-testid={APP_LOGO_TESTID} src={logo} alt="Pixelated image of a Super Nintendo controller plugged into the HTML5 logo through a black cable" />
    );
});
export default AppLogo;