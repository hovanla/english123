import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));

describe("Groq key pool", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
    vi.resetModules();
  });

  it("moves to the next account key after a 429 response", async () => {
    vi.stubEnv("GROQ_API_KEY", "");
    vi.stubEnv("GROQ_API_KEYS", "key-one,key-two,key-one");
    const requests: string[] = [];
    vi.stubGlobal("fetch", vi.fn(async (_url: string | URL | Request, init?: RequestInit) => {
      const authorization = new Headers(init?.headers).get("Authorization") || "";
      requests.push(authorization);
      if (authorization === "Bearer key-one") {
        return new Response(JSON.stringify({ error: "limited" }), { status: 429, headers: { "retry-after": "3600" } });
      }
      return new Response(JSON.stringify({ choices: [{ message: { content: "Hello!" } }] }), { status: 200, headers: { "Content-Type": "application/json" } });
    }));

    const { groqApiKeys, requestGroqChat } = await import("./groq");
    expect(groqApiKeys()).toEqual(["key-one", "key-two"]);
    await expect(requestGroqChat([{ role: "user", content: "Hello" }])).resolves.toMatchObject({ status: 200, text: "Hello!" });
    expect(requests).toEqual(["Bearer key-one", "Bearer key-two"]);
  });
});
