import { Builder, By } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome";
import URL from "url";
import { validateURL } from "../../utils";

async function getName(driver) {
  const element = await driver.findElement(
    By.css(".closet__header__info .closet__header__info__user-details h1")
  );
  const name = await element.getText();

  return name.split("\n").join(" ");
}

async function getListing(driver) {
  const element = await driver.findElement(
    By.css("nav.closet__header__info__user-details__nav li:nth-child(1) a")
  );

  const listingText = await element.getText();
  // I parse listing. I need to remove number formatting (I know it's an integer)
  const listing = parseInt(listingText.split("\n")[0].replace(/[\.,]/g, ""));

  return listing;
}

async function getProfilePic(driver) {
  const element = await driver.findElement(By.css(".closet__header__info img"));
  const profilePic = await element.getAttribute("src");

  return profilePic;
}

/**
 * Handle API request
 *
 * @param {Request} req
 * @param {Response} res
 * @returns
 */
export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405, "Method Not Allowed");
  }

  const queryObject = URL.parse(req.url, true).query;
  console.log(queryObject);

  if (!queryObject["url"]) {
    return res.status(400).json({ error: "Missing `url` parameter." });
  }

  const url = queryObject["url"];
  if (!validateURL(url)) {
    return res.status(400).json({ error: "Invalid `url`" });
  }

  let options = new chrome.Options();

  // Setup Webdriver to run headless (a.k.a. without show a browser window)
  options.headless();
  let driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(options)
    .build();

  await driver.get(url);

  const name = await getName(driver);
  const listing = await getListing(driver);
  const profilePic = await getProfilePic(driver);

  // Close browser after scraping
  driver.close();

  return res.status(200).json({ name, listing, profilePic });
}
