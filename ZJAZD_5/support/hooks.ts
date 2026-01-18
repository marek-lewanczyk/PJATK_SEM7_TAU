import { After, Before, setDefaultTimeout } from "@cucumber/cucumber";
import { Builder } from "selenium-webdriver";
import {BrowserName, CustomWorld} from "./world.js";

setDefaultTimeout(30000);

Before(async function (this: CustomWorld) {
    const browser = (process.env.BROWSER as BrowserName) || "chrome";
    this.browser = browser;

    this.driver = await new Builder().forBrowser(browser).build();
});

After(async function (this: CustomWorld) {
    if (this.driver) {
        await this.driver.quit();
    }
});
