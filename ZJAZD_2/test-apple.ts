import { Builder, By, until, WebDriver } from "selenium-webdriver";
import "chromedriver";
import {after, before, describe, it} from "node:test";

const BROWSERS: Array<"chrome" | "firefox"> = ["chrome", "firefox"];

for (const browser of BROWSERS) {
    describe("Apple Homepage – E2E (TS)", () => {
        let driver: WebDriver;

        before(async () => {
            driver = await new Builder().forBrowser(browser).build();
        });

        after(async () => {
            await driver.quit();
        });

        it("TC-001: Should load homepage and validate title", async () => {
            await driver.get("https://www.apple.com");

            const title = await driver.getTitle();
            if (!title.includes("Apple")) {
                throw new Error(`Invalid title: ${title}`);
            }
        });

        it("TC-002: Should open iPhone 17 Pro buy page", async () => {
            const buyButton = await driver.wait(
                until.elementLocated(By.css('a[aria-label="Buy, iPhone 17 Pro"]')),
                10000
            );

            await buyButton.click();

            await driver.wait(until.urlContains("iphone-17-pro"), 10000);

            const url = await driver.getCurrentUrl();
            if (!url.includes("iphone-17-pro")) {
                throw new Error(`Bad redirect: ${url}`);
            }
        });
    });
}
