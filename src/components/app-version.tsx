import * as React from "react";

/**
 * 
 * @returns {string} Version content stored in html meta tag 'version'
 */
const NOT_APPLICABLE = "N/A"
const readVersion = () => {
    const metaTags = document.getElementsByTagName("meta");
    return metaTags.namedItem("version")?.content || NOT_APPLICABLE;
}

const AppVersion : React.FunctionComponent = (() => {
    const versionValue : string = readVersion();

    return (
        <span>{versionValue}</span>
    );
});
export default AppVersion;