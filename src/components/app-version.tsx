import * as React from "react";

/**
 * 
 * @returns {string} Version content stored in html meta tag 'version'
 */
export const APP_VERSION_TESTID = "app-version";
const UNKNOWN_VERSION = "0.0.0-unknown"
const readVersion = () => {
    const metaTags = document.getElementsByTagName("meta");
    return metaTags.namedItem("version")?.content || UNKNOWN_VERSION;
}

const AppVersion : React.FunctionComponent = (() => {
    const versionValue : string = readVersion();

    return (
        <span data-testid={APP_VERSION_TESTID}>{versionValue}</span>
    );
});
export default AppVersion;