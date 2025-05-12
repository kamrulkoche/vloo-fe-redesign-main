// Encode function: Converts spaces to hyphens and lowercases the text
export function encodeCityName(cityName) {
  return cityName.toLowerCase().replace(/\s+/g, "-");
}

// Decode function: Converts hyphens back to spaces and capitalizes each word
export function decodeCityName(encodedCityName) {
  return encodedCityName
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
