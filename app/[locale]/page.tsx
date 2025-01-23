import { useTranslations } from 'next-intl';

export default async function Home({
  params,
}: {
  params: { locale: string };
}) {
  // Await the locale from params
  const { locale } = params;

  const t = useTranslations('home'); 
  return (
    <div>
      <h1>{t('title')}</h1>
      <p>{t('message')}</p>
    </div>
  );
}