import ILogger from "./ILogger";

class ConsoleLogger implements ILogger {
    private log: Console;

    private constructor(c: Console = console) { 
        this.log = c;
    }

    private static instance: ConsoleLogger = new ConsoleLogger();
    static getInstance(c: Console = console): ConsoleLogger {
        if(c) {
            this.instance = new ConsoleLogger(c);
        }

        return this.instance;
    }

    error(message: string): void {
        this.log.error(message);
    }

    warn(message: string): void {
        this.log.warn(message);
    }
}
export default ConsoleLogger;