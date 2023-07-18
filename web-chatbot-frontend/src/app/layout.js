import './globals.css'

export const metadata = {
  title: 'Web Chatbot',
  description: 'web chatbot to help you',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
          {children}
      </body>
    </html>
  )
}
