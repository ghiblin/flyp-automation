import { Builder, By } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome";
import { COUNTRIES, GENDERS } from "../../utils";

function _typeText(driver) {
  return async function (name, value) {
    const element = await driver.findElement(By.name(name));
    await element.sendKeys(value);
  };
}

function _openDropdown(driver) {
  return async function (name) {
    const selector = await driver.findElement(
      By.css(`[name=${name}] .dropdown__selector`)
    );
    await selector.click();
  };
}

function _selectDropdown(driver) {
  return async function (name, idx) {
    const element = await driver.findElement(
      By.css(
        `[name=${name}] .dropdown__menu__item:nth-child(${idx}) .dropdown__link`
      )
    );
    await element.click();
  };
}

function _clickButton(driver) {
  return async function (action) {
    const button = await driver.findElement(By.css(`[data-et-name=${action}]`));
    await button.click();
  };
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405, "Method Not Allowed").send();
  }
  const { firstName, lastName, email, userName, password, gender, country } =
    req.body;

  let options = new chrome.Options();
  let driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(options)
    .build();

  const typeText = _typeText(driver);
  const openDropdown = _openDropdown(driver);
  const selectDropdown = _selectDropdown(driver);
  const clickButton = _clickButton(driver);

  await driver.get("https://poshmark.com/signup");

  await typeText("firstName", firstName);
  await typeText("lastName", lastName);
  await typeText("email", email);
  await typeText("userName", userName);
  await typeText("password", password);

  // Select gender
  await openDropdown("gender");
  await selectDropdown("gender", GENDERS.findIndex((g) => g === gender) + 1);

  // Select country
  await openDropdown("country");
  await selectDropdown(
    "country",
    COUNTRIES.findIndex((c) => c === country) + 1
  );

  // Click button
  await clickButton("create_account");

  res
    .status(200)
    .json({ firstName, lastName, userName, password, gender, country });
}
