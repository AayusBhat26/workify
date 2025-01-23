import Image from "next/image";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { SignUpContent } from "./SignUpContent";
import { SignInContent } from "./SignInContent";

interface Props {
  signInCard?: boolean;
}
export const AuthCard = ({ signInCard }: Props) => {
  const t = useTranslations("AUTH");
  return (
    <>
      <Card className="w-full  sm:min-w-[28rem] sm:w-auto">
        <CardHeader>
          <Image
          priority
            src={"https:github.com/shadcn.png"}
            width={50}
            height={50}
            alt="test image"
            className="rounded-full object-cover self-center"
          />
          <CardTitle>
            {signInCard ? `${t("SIGN_IN.TITLE")}` : t("SIGN_UP.TITLE")}
          </CardTitle>
          <CardDescription>
            {signInCard ? `${t("SIGN_IN.MESSAGE")}` : t("SIGN_UP.MESSAGE")}
          </CardDescription>
        </CardHeader>
        {signInCard ? <SignInContent/>: <SignUpContent />}
      </Card>
      <p className="text-sm">
        {signInCard
          ? `${t("SIGN_IN.DONT_HAVE_ACCOUNT.FIRST")}`
          : t("SIGN_UP.HAVE_ACCOUNT.FIRST")
          }
        <Link
          className="text-primary m-2"
          href={signInCard ? "/sign-up" : "/signin"}
        >
            {signInCard
          ? `${t("SIGN_IN.DONT_HAVE_ACCOUNT.SECOND")}`
          : t("SIGN_UP.HAVE_ACCOUNT.SECOND")
          }
        </Link>
      </p>
    </>
  );
};
