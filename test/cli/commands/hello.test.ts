import HelloCommand from "../../../src/cli/commands/hello";

let consoleSwap;
beforeEach(()=> {
    consoleSwap = console;
    console.log = jest.fn().mockImplementation(consoleSwap.log);
});

it("writes 'hello' to the console", ()=> {
    // arrange & act
    HelloCommand();

    // assert
    expect(console.log).toBeCalledTimes(1);
    expect(console.log).toBeCalledWith("Hello");
});