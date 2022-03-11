import '../styles/global.css'
import { AppProps } from 'next/app'
import { WordContextProvider } from '../contexts/word-context'
import { NoteContextProvider } from '../contexts/note-context'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WordContextProvider>
      <NoteContextProvider>
        <Component {...pageProps} />
      </NoteContextProvider>
    </WordContextProvider>
  )
}
