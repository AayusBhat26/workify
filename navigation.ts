import {
  createLocalizedPathnamesNavigation,
  Pathnames,
} from "next-intl/navigation";
//   import { locales } from './i18n';
const locales = ["en", "hi"];
export const localePrefix = "always"; // Or 'as-needed'

export const pathnames = {
  // Add your pathnames here
  "/": "/",
  "/about": "/about",
} satisfies Pathnames<typeof locales>;

export const { Link, redirect, usePathname, useRouter } =
  createLocalizedPathnamesNavigation({ locales, localePrefix, pathnames });
