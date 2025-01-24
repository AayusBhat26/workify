// ProviderSignInButtons.tsx
"use client";
import { useTranslations } from "next-intl";
import { ProviderSignInButton } from "./ProviderSignInButton";
import { GoogleLogo } from "../svg/GoogleLogo";
import { GithubLogo } from "../svg/GithubLogo";

export const ProviderSignInButtons = ({
  disabled,
  onLoading,
}: {
  disabled?: boolean;
  onLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div className="flex gap-3 justify-center">
      <ProviderSignInButton
        onLoading={onLoading}
        disabled={disabled}
        providerName="google"
        className="p-2.5 rounded-full bg-background hover:bg-accent border transition-colors"
      >
        <GoogleLogo className="h-5 w-5" />
      </ProviderSignInButton>

      <ProviderSignInButton
        onLoading={onLoading}
        disabled={disabled}
        providerName="github"
        className="p-2.5 rounded-full bg-background hover:bg-accent border transition-colors"
      >
        <GithubLogo className="h-5 w-5" />
      </ProviderSignInButton>
    </div>
  );
};