import { ReactNode } from 'react'
import { Footer } from '@modules/footer'
import { Header } from '@modules/header'

import '@styles/global.scss'

import localFont from 'next/font/local'
import { Provider } from '@service/provider'



const dm_sans = localFont({
  src: [
    {
      path: './fonts/dm-sans-v15-latin_latin-ext-regular.woff2',
      weight: '400',
      style: 'normal'
    }
  ],
  variable: '--font-dm-sans'
})

const unbounded = localFont({
  src: [
    {
      path: './fonts/unbounded-v8-cyrillic_cyrillic-ext_latin_latin-ext-regular.woff2',
      weight: '400',
      style: 'normal'
    },
    {
      path: './fonts/unbounded-v8-cyrillic_cyrillic-ext_latin_latin-ext-700.woff2',
      weight: '700',
      style: 'normal'
    }
  ],
  variable: '--font-unbounded'
})

const roboto = localFont({
  src: [
    {
      path: './fonts/roboto-v32-latin-regular.woff2',
      weight: '400',
      style: 'normal'
    },
    {
      path: './fonts/roboto-v32-latin-300.woff2',
      weight: '300',
      style: 'normal'
    }
  ],
  variable: '--font-roboto'
})

const montserrat = localFont({
  src: [
    {
      path: './fonts/montserrat-v26-cyrillic_cyrillic-ext_latin_latin-ext-500.woff2',
      weight: '500',
      style: 'normal'
    }
  ],
  variable: '--font-montserrat'
})



export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="ru">
      <body className={`${dm_sans.variable} ${unbounded.variable} ${roboto.variable} ${montserrat.variable}`}>
        <Provider>
          <div id="root">
            <Header />
            {children}
            <Footer />
          </div>

          <div id="modal-root" />
        </Provider>
      </body>
    </html>
  )
}
