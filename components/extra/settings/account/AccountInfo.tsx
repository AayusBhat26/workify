'use client';

import { AddUserImage } from '@/components/onboarding/common/AddUserImage';
import { Card, CardContent } from '@/components/ui/card';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { accountInfo, AccountInfoSettingsSchema } from '@/schema/accountInfo';
import { zodResolver } from '@hookform/resolvers/zod';
import { Session } from 'next-auth';
import { useLocale, useTranslations } from 'next-intl';
import { Form, useForm } from 'react-hook-form';

interface Props {
  session: Session;
}
export const AccountInfo = ({
  session: {
    user: { image, name, surname, username },
  },
}: Props) => {
  const t = useTranslations('SETTINGS');
  const locale = useLocale();
  const form = useForm<AccountInfoSettingsSchema>({
    resolver: zodResolver(accountInfo),
    defaultValues: {
      username: username!,
      language: locale,
      name: name ? name : '',
      surname: surname ? surname : '',
    },
  });
  return (
    <Card>
      <CardContent>
        <div>
          <p>{t('ACCOUNT.IMAGE')}</p>
          <AddUserImage />
        </div>
        <Form {...form}>
          <form>
            <div>
              <div>
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem className="w-full sm:w-1/2">
                      <FormLabel className="text-muted-foreground uppercase text-xs">
                        {t('ACCOUNT.USERNAME')}
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="bg-muted"
                          placeholder={t('ACCOUNT.USERNAME_PLACEHOLDER')}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="w-full sm:w-1/2">
                      <FormLabel className="text-muted-foreground text-xs uppercase">
                        {t('ACCOUNT.FIRST_NAME')}
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="bg-muted"
                          placeholder={t('ACCOUNT.FIRST_NAME_PLACEHOLDER')}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="surname"
                  render={({ field }) => (
                    <FormItem className="w-full sm:w-1/2">
                      <FormLabel className="text-muted-foreground text-xs uppercase">
                        {t('ACCOUNT.SURNAME')}
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="bg-muted"
                          placeholder={t('ACCOUNT.SURNAME.   PLACEHOLDER')}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
