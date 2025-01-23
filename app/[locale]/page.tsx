"use client";
import { ThemeSwitcher } from "@/components/switchers/ThemeSwitcher";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import React from "react"; // Import React to use React.use()

export default function Home({ params }: { params: { locale: string } }) {

  const t = useTranslations("Index");
  const session = useSession();

  const logoutHandler = () => {
    signOut({
      callbackUrl: `${window.location.origin}/sign-in`,
    });
  };

  return (
    <>
      <Button onClick={logoutHandler}>Logout</Button>
      <ThemeSwitcher />
    </>
  );
}