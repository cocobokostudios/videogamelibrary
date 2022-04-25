import { mock } from "jest-mock-extended";
import ConsoleLogger from "../../src/utils/ConsoleLogger";

let mockConsole: Console;

beforeEach(()=> {
    mockConsole = mock<Console>();
    mockConsole.error = jest.fn();
    mockConsole.warn = jest.fn();
});

it("logs errors to the console", ()=> {
    // arrange
    const target = ConsoleLogger.getInstance(mockConsole);
    const errorMessage = "This is an error message.";

    // act
    target.error(errorMessage);

    // assert
    expect(mockConsole.error).toBeCalledTimes(1);
    expect(mockConsole.error).toBeCalledWith(errorMessage);
});

it("logs warnings to the console", ()=> {
    // arrange
    const target = ConsoleLogger.getInstance(mockConsole);
    const warnMessage = "This is an warning message.";

    // act
    target.warn(warnMessage);

    // assert
    expect(mockConsole.warn).toBeCalledTimes(1);
    expect(mockConsole.warn).toBeCalledWith(warnMessage);
});

it("defaults to using JavaScript console object", ()=> {
    // arrange
    const errorMessage = "error";
    const warnMessage = "warn";
    const target = ConsoleLogger.getInstance();
    const warnSpy = jest.spyOn(console, "warn");
    const errorSpy = jest.spyOn(console, "error");

    // act
    target.error(errorMessage);
    target.warn(warnMessage);

    // assert
    expect(warnSpy).toBeCalledTimes(1);
    expect(warnSpy).toBeCalledWith(warnMessage);
    expect(errorSpy).toBeCalledTimes(1);
    expect(errorSpy).toBeCalledWith(errorMessage);
});