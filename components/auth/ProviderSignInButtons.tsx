"use client";
import { useTranslations } from "next-intl";
import { ProviderSignInButton } from "./ProviderSignInButton";
import { GoogleLogo } from "../svg/GoogleLogo";
import { AppleLogo } from "../svg/AppleLogo";
import { GithubLogo } from "../svg/GithubLogo";

export const ProviderSignInButtons = ({
  signInCard,
  disabled,
}: {
  signInCard?: boolean;
  disabled?: boolean;
}) => {
  const t = useTranslations("AUTH");

  return (
    <div className="flex flex-col gap-3">
      {/* Google Button */}
      <ProviderSignInButton
        disabled={disabled}
        className="flex w-full items-center justify-center rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700 sm:text-base"
      >
        <GoogleLogo className="mr-3 h-5 w-5" />
        {signInCard
          ? t("SIGN_IN.PROVIDERS.GOOGLE")
          : t("SIGN_UP.PROVIDERS.GOOGLE")}
      </ProviderSignInButton>

      {/* Apple Button */}
      <ProviderSignInButton
        disabled={disabled}
        className="flex w-full items-center justify-center rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700 sm:text-base"
      >
        <AppleLogo className="mr-3 h-5 w-5" />
        {signInCard
          ? t("SIGN_IN.PROVIDERS.APPLE")
          : t("SIGN_UP.PROVIDERS.APPLE")}
      </ProviderSignInButton>

      {/* GitHub Button */}
      <ProviderSignInButton
        disabled={disabled}
        className="flex w-full items-center justify-center rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700 sm:text-base"
      >
        <GithubLogo className="mr-3 h-5 w-5" />
        {signInCard
          ? t("SIGN_IN.PROVIDERS.GITHUB")
          : t("SIGN_UP.PROVIDERS.GITHUB")}
      </ProviderSignInButton>
    </div>
  );
};