import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async ({ requestLocale }) => {
  
  const locale = await requestLocale;
  if (!locale) {
    throw new Error("Locale is undefined");
  }
  const messages = (await import(`./messages/${locale}.json`)).default;
  return {
    locale,
    messages,
  };
});