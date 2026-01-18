import { Given, When, Then } from "@cucumber/cucumber";
import { By, until } from "selenium-webdriver";
import {CustomWorld} from "../../support/world.js";

Given("I open url {string}", async function (this: CustomWorld, url: string) {
    await this.driver.get(url);
});

Then("page title should include {string}", async function (this: CustomWorld, expected: string) {
    const title = await this.driver.getTitle();
    if (!title.includes(expected)) {
        throw new Error(`Invalid title. Expected to include "${expected}", got "${title}"`);
    }
});

When("I click element css {string}", async function (this: CustomWorld, selector: string) {
    const el = await this.driver.wait(until.elementLocated(By.css(selector)), 30000);
    await el.click();
});

When(
    "I type {string} into element id {string}",
    async function (this: CustomWorld, value: string, id: string) {
        const el = await this.driver.wait(until.elementLocated(By.id(id)), 30000);
        await el.clear();
        await el.sendKeys(value);
    }
);

Then("url should contain {string}", async function (this: CustomWorld, part: string) {
    await this.driver.wait(until.urlContains(part), 30000);
    const url = await this.driver.getCurrentUrl();
    if (!url.includes(part)) {
        throw new Error(`Bad redirect. Expected url to include "${part}", got "${url}"`);
    }
});

Then(
    "element id {string} should contain text {string}",
    async function (this: CustomWorld, id: string, expected: string) {
        const el = await this.driver.wait(until.elementLocated(By.id(id)), 30000);
        const text = await el.getText();
        if (!text.includes(expected)) {
            throw new Error(`Bad message. Expected to include "${expected}", got "${text}"`);
        }
    }
);
