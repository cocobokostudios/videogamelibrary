import ILogger from "./ILogger";

class ConsoleLogger implements ILogger {
    private log: Console;

    private constructor() { 
        this.log = console;
    }

    private static instance: ConsoleLogger;
    static getInstance(): ConsoleLogger {
        if(!this.instance) {
            this.instance = new ConsoleLogger();
        }

        return this.instance;
    }

    static error(message: string): void {
        return ConsoleLogger.getInstance().error(message);
    }

    static warn(message: string): void {
        return ConsoleLogger.getInstance().warn(message);
    }

    error(message: string): void {
        this.log.error(message);
    }

    warn(message: string): void {
        this.log.warn(message);
    }
}
export default ConsoleLogger;