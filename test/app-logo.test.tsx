import { act, cleanup, render, waitFor, screen, within } from "@testing-library/react";
import "@testing-library/jest-dom";
import * as React from "react";

import AppLogo, { APP_LOGO_TESTID } from "../src/components/app-logo";

it("app logo has alt defined", async ()=> {
    // arrange
    render(<AppLogo />);

    // act
    await waitFor(() => screen.getAllByRole("img"));

    // assert
    expect(screen.getByTestId(APP_LOGO_TESTID)).toHaveAttribute("alt");
});