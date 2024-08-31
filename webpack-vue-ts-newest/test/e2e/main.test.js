import { Selector } from "testcafe";

fixture`Getting Started`.page`http://localhost:8080/`;
test("First test", async t => {
    const text = await Selector("h1").innerText;
    await t.expect(text).eql("Welcome to Your Vue.js App");
});
