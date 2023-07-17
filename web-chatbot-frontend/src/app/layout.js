import './globals.css'
import { ContextProvider } from '../context/context'

export const metadata = {
  title: 'Web Chatbot',
  description: 'web chatbot to help you',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ContextProvider>
          {children}
        </ContextProvider>
      </body>
    </html>
  )
}
