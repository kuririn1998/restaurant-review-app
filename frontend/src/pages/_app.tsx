import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import '@/styles/globals.css';

const ThemeProviderClient = dynamic(
  () => import('@/contexts/ThemeContext').then(mod => mod.ThemeProvider),
  { ssr: false }
);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProviderClient>
      <Component {...pageProps} />
    </ThemeProviderClient>
  );
}

export default MyApp;
