import { mock } from "jest-mock-extended";
import ConsoleLogger from "../../src/utils/ConsoleLogger";

let warnSpy;
let errorSpy;
beforeEach(()=> {
    warnSpy = jest.spyOn(console, "warn").mockImplementation(jest.fn(()=> {}));
    errorSpy = jest.spyOn(console, "error").mockImplementation(jest.fn(()=> {}));;
});

it("logs errors to the console", ()=> {
    // arrange
    const target = ConsoleLogger.getInstance();
    const errorMessage = "This is an error message.";

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

    // act
    target.warn(warnMessage);

    // assert
    expect(warnSpy).toBeCalledTimes(1);
    expect(warnSpy).toBeCalledWith(warnMessage);
});

it("defaults to using JavaScript console object", ()=> {
    // arrange
    const errorMessage = "error";
    const warnMessage = "warn";
    const target = ConsoleLogger.getInstance();

    // act
    target.error(errorMessage);
    target.warn(warnMessage);

    // assert
    expect(warnSpy).toBeCalledTimes(1);
    expect(warnSpy).toBeCalledWith(warnMessage);
    expect(errorSpy).toBeCalledTimes(1);
    expect(errorSpy).toBeCalledWith(errorMessage);
});