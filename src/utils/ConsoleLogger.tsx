import ILogger from "./ILogger";

class ConsoleLogger implements ILogger {
    private logger: Console 

    private constructor() { 
        this.logger = console;
    }

    private static instance: ConsoleLogger = new ConsoleLogger();
    static getInstance(): ConsoleLogger {
        return this.instance;
    }

    error(message: string): void {
        this.logger.error(message);
    }

    warn(message: string): void {
        this.logger.warn(message);
    }
}
export default ConsoleLogger;