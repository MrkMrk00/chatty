let lorem: string[] | null = null;
let abortController: AbortController | null = null;

const AVG_WORDS_PER_SENTENCE = 15;

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

    let insideSentence = false;

    let responseLength = randomInt(200) + 100;
    while (responseLength-- > 0) {
        await waitFor(randomInt(100));

        let token = lorem[randomInt(lorem.length - 1)];
        if (!insideSentence) {
            token = ucfirst(token);
            insideSentence = true;
        }

        yield token;

        const shouldEndSentence = Math.random() < 1 / AVG_WORDS_PER_SENTENCE;
        if (shouldEndSentence || responseLength === 0) {
            yield '.';
            insideSentence = false;
        }

        yield ' ';
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

function ucfirst(str: string) {
    return str[0].toUpperCase() + str.slice(1);
}
