import * as React from "react";
import AppVersion from "./app-version";

export const APP_TITLE_TESTID = "app-title";
const DEFAULT_TITLE = "Video Game Library";

interface AppTitleProps {
    title?: string
}

const AppTitle : React.FunctionComponent<AppTitleProps> = ((props) => {
    const displayTitle = (props.title) ? props.title : DEFAULT_TITLE;
    return (
        <h1 data-testid={APP_TITLE_TESTID}>{displayTitle} [<AppVersion includeName={false} />]</h1>
    );
});
export default AppTitle;