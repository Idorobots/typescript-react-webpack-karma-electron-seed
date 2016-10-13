import { App } from "./containers/app";
import * as React from "react"; // tslint:disable-line
import * as ReactTestUtils from "react-addons-test-utils";

describe("App", () => {
    it("should be runnable", () => {
        let a = new App();
        expect(a.run).toBeDefined();
    });

    it("should be renderable", () => {
        let root = ReactTestUtils.renderIntoDocument(<App/>);
        expect(root).toBeDefined();
    });
});
