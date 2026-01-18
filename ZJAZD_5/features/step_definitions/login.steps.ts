import { Given } from "@cucumber/cucumber";
import { By, until } from "selenium-webdriver";
import {CustomWorld} from "../../support/world.js";

Given(
    "I am logged in to {string} as {string} with password {string}",
    async function (this: CustomWorld, url: string, username: string, password: string) {
        await this.driver.get(url);

        await this.driver.wait(until.elementLocated(By.id("username")), 30000);
        await this.driver.findElement(By.id("username")).sendKeys(username);
        await this.driver.findElement(By.id("password")).sendKeys(password);
        await this.driver.findElement(By.css("button[type='submit']")).click();

        const messageEl = await this.driver.wait(until.elementLocated(By.id("flash")), 30000);
        const message = await messageEl.getText();

        if (!message.includes("You logged into a secure area!")) {
            throw new Error(`Login precondition failed: ${message}`);
        }
    }
);
