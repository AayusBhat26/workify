// we will handle all types of errors while login or signup

import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useToast } from "./use-toast";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

export const useProviderLoginError = (showLoggedInfo: boolean) => {
  const params = useSearchParams();
  const session = useSession();
  const messages = useTranslations("MESSAGES");
  const { toast } = useToast();
  const router = useRouter(); 
  useEffect(() => {
    const error = params.get("error");
    if (error && session.status == "authenticated") {
      switch (error) {
        case "OAuthAccountNotLinked":
          toast({
            title: messages("ERRORS.EMAIL_EXISTS"),
            variant: "destructive",
          });
          break;

        case "OAuthCreateAccount":
          toast({
            title: messages("ERRORS.USERNAME_EXISTS"),
            variant: "destructive",
          });
          break;

        case "Callback":
          toast({
            title: messages("ERRORS.DEFAULT"),
            variant: "destructive",
          });
          break;
        default:
          toast({
            title: messages("ERRORS.DEFAULT"),
            variant: "destructive",
          });
          break;
      }

      const timer = setTimeout(()=>{
        router.replace("/sign-in");
      }, 2000);

      // clearing the set timeout.
      return () =>{
        clearTimeout(timer);
      }
    }
    if(session.status == "authenticated" && showLoggedInfo){
        toast({
            title:  messages("SUCCESS.SIGN_IN"),
            variant: "default"
        });
    }
  }, [params, toast, session, router, messages, showLoggedInfo]);
};
