import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async ({ requestLocale }) => {
  
  const locale = await requestLocale;
  if (!locale) {
    throw new Error("Locale is undefined");
  }
  let messages = {};
  try {
messages = (await import(`./messages/${locale}.json`)).default;
} catch (error) {
    console.error(`Error loading messages for locale ${locale}:`, error);
    // Fallback to an empty messages object.
    messages = {};
  }
  return {
    locale,
    messages,
  };
});