import { HelloWorld } from "./hello";

describe("HelloWorld", () => {
    it("should return a greeting", (done) => {
        let h = new HelloWorld();

        h.greet().then((greeting) => {
            expect(greeting).toBe("Hello world!");
            done();
        }).catch((error) => done.fail());
    });
});
