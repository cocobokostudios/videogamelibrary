import yargs from "yargs/yargs";

import HelloCommand from "./commands/hello";

const argv = yargs(process.argv.slice(2))
    .version()
    .usage("Usage: vgl-cli <command> [options]")
    .help("help")
    .alias("help", "h")
    .command("hello", "Say hello", HelloCommand)
    .argv;