import { act, cleanup, render, waitFor, screen } from "@testing-library/react";
import * as React from "react";
import { unmountComponentAtNode } from "react-dom";
import App from "../src/components/app";
import AppVersion from "../src/components/app-version";

afterEach(cleanup);

it("returns content from meta tag with name 'version'", async () => {
    const expectedValue = "0.1.2-test+q1w2e34";

    // arrange
    // inject meta tag 
    let metaVersion = document.createElement('meta');
    metaVersion.name = "version";
    metaVersion.content = expectedValue;
    document.getElementsByTagName('head')[0].appendChild(metaVersion);
    render(<AppVersion />);

    // act
    const validVersion = /^(\d.\d.\d)(-[A-Za-z0-9\.]+)?(\+[A-Za-z0-9]+)?/i;
    await waitFor(() => screen.getByText(validVersion));

    // assert
    expect(screen.getByText(validVersion).textContent).toEqual(expectedValue);
});

it("returns 'n/a' if meta tag is not present in HTML head", async () => {
    // arrange
    // clear meta tags
    let metaVersion = document.getElementsByTagName("meta");
    if(metaVersion.length > 0) {
        for(let i=0; i<metaVersion.length; i++) {
            document.getElementsByTagName('head')[0].removeChild(metaVersion.item(i));
        }
    }
    render(<AppVersion />);

    // act 
    const expectedValue = "N/A";
    let resultElement: HTMLElement = null;
    await waitFor(() => {
        resultElement = screen.getByText(expectedValue);    // gets the element by the expected string value
    });

    // assert
    expect(resultElement).not.toBeFalsy();
});
