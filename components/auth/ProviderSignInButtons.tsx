"use client";
import { useTranslations } from "next-intl";
import { ProviderSignInButton } from "./ProviderSignInButton";

export const ProviderSignInButtons = ({
  signInCard,
}: {
  signInCard?: boolean;
}) => {
  const t = useTranslations("AUTH");
  return (
    <div className="flex flex-col gap-2 ">
      <ProviderSignInButton className="w-full rounded-[2rem] border bg-black/90 text-white dark:bg-black/70 hover:bg-black/80 dark:hover:bg-black/40">
        {signInCard
          ? t("SIGN_IN.PROVIDERS.GOOGLE") 
          : t("SIGN_UP.PROVIDERS.GOOGLE")}
      </ProviderSignInButton>
      {/* apple */}
      <ProviderSignInButton className="w-full rounded0[2rem] border">
        {signInCard
          ? t("SIGN_IN.PROVIDERS.APPLE") 
          : t("SIGN_UP.PROVIDERS.APPLE")}
      </ProviderSignInButton>
      {/* github */}
      <ProviderSignInButton className="w-full rounded0[2rem] border">
        {signInCard
          ? t("SIGN_IN.PROVIDERS.GITHUB") 
          : t("SIGN_UP.PROVIDERS.GITHUB")}
      </ProviderSignInButton>

    </div>
  );
};
