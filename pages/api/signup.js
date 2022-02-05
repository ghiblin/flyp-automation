import chrome from "selenium-webdriver/chrome";

const { Builder } = require("selenium-webdriver");

export default async function handler(req, res) {
  // const service = new chrome.ServiceBuilder(
  //   "/Users/alex/Projects/flyp-automation/chromedriver"
  // ).build();
  // const driver = await new Builder()
  //   .forBrowser("chrome")
  //   .setChromeService(service)
  //   .build();
  let options = new chrome.Options();
  let driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(options)
    .build();

  await driver.get("https://poshmark.com/signup");

  // await driver.quit();

  res.status(200).json({ name: "John Doe" });
}
