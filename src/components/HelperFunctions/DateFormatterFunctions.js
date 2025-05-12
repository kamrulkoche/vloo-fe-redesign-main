export function DateFormatterType1Function(dateString) {
  if (!dateString) return "Invalid date";

  const date = new Date(dateString);
  if (isNaN(date)) return "Invalid date";

  const options = { weekday: "long", month: "short", day: "2-digit" };
  return date.toLocaleDateString("en-US", options);
}

export function DateFormatterType2Function(dateString) {
  if (!dateString) return "Invalid date";

  const date = new Date(dateString);
  if (isNaN(date)) return "Invalid date";

  const options = { day: "2-digit", month: "short", year: "numeric" };
  return date.toLocaleDateString("en-US", options).replace(",", "");
}
