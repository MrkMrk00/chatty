import { describe, expect, it } from "vitest";
import { CommandType, type RenameCommand, parseCommand } from "../utils/commands";

describe("Command parsing", () => {
    it("parses a clear command correctly", () => {
        const result = parseCommand("   /clear ");

        expect(result.error).toBe(false);
        expect(result.type).toBe(CommandType.clear);
    });

    it("parses a rename command correctly (quoted string)", () => {
        const name = "test Long name with spaces";

        const result = parseCommand(` /rename "${name}"`);

        expect(result.error).toBe(false);
        expect(result.type).toBe(CommandType.rename);

        expect((result as RenameCommand).tabName as string).toBe(name);
    });

    it("requires an argument for rename command", () => {
        const result = parseCommand("/rename   ");

        expect(result.error).toBe(true);
        expect((result as CommandError).type).toBe("invalid_args");
    });

    it("requires an single argument for rename command and reject more", () => {
        const result = parseCommand("/rename first second third");

        expect(result.error).toBe(true);
        expect((result as CommandError).type).toBe("invalid_args");
    });

    it("recognizes a non-command", () => {
        const result = parseCommand("asfliudgjhsdfjklghdsfgg");

        expect(result.error).toBe(true);
        expect((result as CommandError).type).toBe("not_a_command");
    });

    it("recognizes a non-existent command", () => {
        const result = parseCommand("/asfliudgjhsdfjklghdsfgg");

        expect(result.error).toBe(true);
        expect((result as CommandError).type).toBe("invalid_command");
    });
});
