let lorem: string[] | null = null;
let abortController: AbortController | null = null;

export async function* generateMockResponse(): AsyncGenerator<string> {
    if (abortController) {
        abortController.abort();
    }

    if (lorem === null) {
        abortController = new AbortController();
        let rawLorem: string;

        try {
            rawLorem = await fetch("/lorem.txt", { signal: abortController.signal }).then((r) => r.text());
        } catch (e: unknown) {
            if (e instanceof Error && e.name === "AbortError") {
                yield "";

                return;
            }

            throw e;
        }

        lorem = rawLorem
            .replaceAll('.', '')
            .replaceAll(',', '')
            .toLowerCase()
            .split(' ');
    }

    let responseLength = randomInt(150);
    while (--responseLength > 0) {
        await waitFor(randomInt(100));

        yield lorem[randomInt(lorem.length - 1)];
    }
}

function waitFor(timeoutMs: number) {
    const { promise, resolve } = Promise.withResolvers();
    setTimeout(resolve, timeoutMs);

    return promise;
}

function randomInt(max: number) {
    return Math.floor(Math.random() * max);
}

