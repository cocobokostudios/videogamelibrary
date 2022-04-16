import HelloCommand from "./commands/hello";
import { LoginCommand } from "./commands/login";

const argv = process.argv.slice(2);
const command = argv[0];
const commandInput = argv.slice(1);

switch(command) {
    case "login":
        await LoginCommand(commandInput);
        break;
    default:
        console.log(`Unknown command ${command}`);
        break;
}