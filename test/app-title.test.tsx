import { act, cleanup, render, waitFor, screen } from "@testing-library/react";
import * as React from "react";
import { unmountComponentAtNode } from "react-dom";

import AppTitle from "../src/components/app-title";

afterEach(cleanup);

it.todo("displays the title provided");

it.todo("displays the version number");

it.todo("displays a default title if none is provided");