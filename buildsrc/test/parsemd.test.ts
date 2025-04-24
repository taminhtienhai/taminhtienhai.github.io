import { describe, it } from "bun:test"
import MdParser from "../src/mdparser";


describe("marked shiki", () => {
    it("parse rust lang", async () => {
        const parser = MdParser();


        const rust = `
fn main() {
    // We can use this function here, and define it somewhere later
    fizzbuzz_to(100);
}`;
        const codeblock = "```\n"+ rust +"\n```"
        const html = await parser.parse(codeblock, { async: true });

        console.log(html);
    });
});