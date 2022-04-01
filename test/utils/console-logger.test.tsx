import { mock } from "jest-mock-extended";
import ConsoleLogger from "../../src/utils/ConsoleLogger";

it("logs errors to the console", ()=> {
    // arrange
    const target = ConsoleLogger.getInstance();
    const errorMessage = "This is an error message.";
    const errorSpy = jest.spyOn(console, "error");

    // act
    target.error(errorMessage);

    // assert
    expect(errorSpy).toBeCalledTimes(1);
    expect(errorSpy).toBeCalledWith(errorMessage);
});

it("logs warnings to the console", ()=> {
    // arrange
    const target = ConsoleLogger.getInstance();
    const warnMessage = "This is an warning message.";
    const warnSpy = jest.spyOn(console, "warn");

    // act
    target.warn(warnMessage);

    // assert
    expect(warnSpy).toBeCalledTimes(1);
    expect(warnSpy).toBeCalledWith(warnMessage);
});
