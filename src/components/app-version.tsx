import * as React from "react";

interface AppVersionProps {
    includeName? : boolean
}


/**
 * @param {boolean} includeName Defaults to true, flag to include package name as prefix (e.g. videogamelibrary@0.0.1)
 * @returns {string} Version content stored in html meta tag 'version'
 */
export const APP_VERSION_TESTID = "app-version";
const UNKNOWN_PACKAGE = "unknown";
const UNKNOWN_VERSION = "0.0.0-unknown";
const readVersion = (includeName : boolean = true) => {
    const metaTags = document.getElementsByTagName("meta");
    
    let versionString = `${UNKNOWN_PACKAGE}@${UNKNOWN_VERSION}`;
    if(metaTags.namedItem("version")?.content) {
        if(includeName) {
            versionString = metaTags.namedItem("version")?.content;
        }
        else {
            versionString = metaTags.namedItem("version")?.content.replace(/^(\w*\d*\@)/i,"");
        }
    }

    return versionString;
}

const AppVersion : React.FunctionComponent<AppVersionProps> = ((props) => {
    
    const versionValue : string = readVersion(props.includeName);

    return (
        <span data-testid={APP_VERSION_TESTID}>{versionValue}</span>
    );
});
export default AppVersion;