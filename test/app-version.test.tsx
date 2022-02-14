import { act, cleanup, render, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import * as React from "react";
import AppVersion, { APP_VERSION_TESTID } from "../src/components/app-version";

import packageJson from "../package.json";

const expectedValue = "videogamelibrary@0.1.2-test+q1w2e34";
beforeEach(()=> {
    let metaVersion = document.createElement('meta');
    metaVersion.name = "version";
    metaVersion.content = expectedValue;
    document.getElementsByTagName('head')[0].appendChild(metaVersion);
});
afterEach(()=> {
    cleanup();
});

it("returns content from meta tag with name 'version'", async () => {
    // arrange
    render(<AppVersion />);

    // act
    const validVersion = /^(\w*\d*\@)(\d.\d.\d)(-[A-Za-z0-9\.]+)?(\+[A-Za-z0-9]+)?/i;
    await waitFor(() => screen.getByText(validVersion));

    // assert
    expect(screen.getByText(validVersion).textContent).toEqual(expectedValue);
});

it("returns 'unknown value' if meta tag is not present in HTML head", async () => {
    // arrange
    // clear meta tags
    let metaVersion = document.querySelectorAll("meta[name='version']");
    metaVersion.forEach((el)=> {
        el.remove();
    });
    render(<AppVersion />);

    // act 
    const expectedValue = "unknown@0.0.0-unknown";
    let resultElement: HTMLElement = null;
    await waitFor(() => {
        resultElement = screen.getByTestId(APP_VERSION_TESTID);    // gets the element by the expected string value
    });

    // assert
    expect(resultElement).toHaveTextContent(expectedValue);
});

it("displays package name by default", async ()=> {
    // arrange
    const packageName = packageJson.name;
    render(<AppVersion />);

    // act
    let testTarget;
    await waitFor(()=> {
        testTarget = screen.getByTestId(APP_VERSION_TESTID);
    });

    // assert
    expect(testTarget).toHaveTextContent(packageJson.name);
    expect(testTarget).toHaveTextContent(/^(\w*\d*\@)/i);
});

it("removes the library name if flag is set", async ()=> {
    // arrange
    const packageName = packageJson.name;
    render(<AppVersion includeName={false} />);

    // act
    let testTarget;
    await waitFor(()=> {
        testTarget = screen.getByTestId(APP_VERSION_TESTID);
    });

    // assert
    expect(testTarget).not.toHaveTextContent(packageJson.name);
    expect(testTarget).not.toHaveTextContent(/^(\w*\d*\@)/i);
});