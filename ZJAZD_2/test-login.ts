import { Builder, By, until, WebDriver } from "selenium-webdriver";
import "chromedriver";
import "geckodriver";
import { after, before, describe, it } from "node:test";

const BROWSERS: Array<"chrome" | "firefox"> = ["chrome", "firefox"];

for (const browser of BROWSERS) {
    describe(`Login – E2E (${browser})`, () => {
        let driver: WebDriver;

        before(async () => {
            driver = await new Builder()
                .forBrowser(browser)
                .build();
        });

        after(async () => {
            await driver.quit();
        });

        it("TC-001: Should login with valid credentials", async () => {
            await driver.get("https://the-internet.herokuapp.com/login");

            await driver.wait(until.elementLocated(By.id("username")), 10000);
            await driver.findElement(By.id("username")).sendKeys("tomsmith");
            await driver.findElement(By.id("password")).sendKeys("SuperSecretPassword!");
            await driver.findElement(By.css("button[type='submit']")).click();

            const messageEl = await driver.wait(
                until.elementLocated(By.id("flash")),
                10000
            );

            const message = await messageEl.getText();

            if (!message.includes("You logged into a secure area!")) {
                throw new Error(`Login failed: ${message}`);
            }
        });

        it("TC-002: Should logout correctly", async () => {
            const logoutBtn = await driver.wait(
                until.elementLocated(By.css('a[href="/logout"]')),
                10000
            );

            await logoutBtn.click();

            await driver.wait(until.urlContains("/login"), 10000);

            const url = await driver.getCurrentUrl();
            if (!url.includes("/login")) {
                throw new Error(`Logout failed, bad redirect: ${url}`);
            }
        });
    });
}
