import { setWorldConstructor, World } from "@cucumber/cucumber";
import { WebDriver } from "selenium-webdriver";

export type BrowserName = "chrome" | "firefox";

export class CustomWorld extends World {
    driver!: WebDriver;
    browser!: BrowserName;
}

setWorldConstructor(CustomWorld);
