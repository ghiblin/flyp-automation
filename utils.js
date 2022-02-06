export const GENDERS = ["Male", "Female", "Unspecified"];
export const COUNTRIES = ["United States", "Canada", "Australia", "India"];

const URL_REGEX = /^https:\/\/(?:www\.)?posh(mark\.com\/closet|\.mk)\/\w+$/;

export function validateURL(url) {
  return URL_REGEX.test(url);
}
