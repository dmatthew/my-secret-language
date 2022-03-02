import '../styles/global.css'
import { AppProps } from 'next/app'
import { AppProvider } from '../contexts/word-context'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <Component {...pageProps} />
    </AppProvider>
  )
}
