export const CommandType = {
    rename: "rename",
    clear: "clear",
} as const;

export type RenameCommand = {
    type: typeof CommandType.rename;
    tabName: string;
};

export type ClearCommand = {
    type: typeof CommandType.clear;
};

export type Command = { error: false } & (RenameCommand | ClearCommand);

export type CommandError = {
    error: true;
    type: "not_a_command" | "invalid_command" | "invalid_args";
    message: string;
};

export function parseCommand(line: string): CommandError | Command {
    // Replace multiple spaces by a single space -> tokenize into "words"
    const tokens = line
        .replaceAll(/\s{1,}/g, " ")
        .trim()
        .split(" ");

    // invalid command
    if (tokens.length < 1) {
        return {
            error: true,
            type: "not_a_command",
            message: "could not parse the command",
        };
    }

    let [commandTypeRaw, ...args] = tokens;
    if (commandTypeRaw[0] !== "/") {
        return {
            error: true,
            type: "not_a_command",
            message: "supplied message is not a command",
        };
    }
    commandTypeRaw = commandTypeRaw.slice(1);

    if (!(commandTypeRaw in CommandType)) {
        return {
            error: true,
            type: "invalid_command",
            message: "supplied message is not a command",
        };
    }

    const commandType = CommandType[commandTypeRaw as keyof typeof CommandType];

    switch (commandType) {
        case CommandType.rename: {
            if (args.length < 1) {
                return {
                    error: true,
                    type: "invalid_args",
                    message: "the /rename command accepts a single argument",
                };
            }

            let newTabName = args[0];

            // try to parse the name as a quoted string ("something")
            if (args.length > 1) {
                newTabName = args.join(" ");

                if (newTabName[0] !== '"' || newTabName[newTabName.length - 1] !== '"') {
                    return {
                        error: true,
                        type: "invalid_args",
                        message: "the /rename command accepts a single argument",
                    };
                }

                newTabName = newTabName.slice(1, newTabName.length - 1);
            }

            return {
                error: false,
                type: commandType,
                tabName: newTabName,
            };
        }

        case CommandType.clear: {
            return {
                error: false,
                type: CommandType.clear,
            };
        }

        default:
            return null as never;
    }
}
