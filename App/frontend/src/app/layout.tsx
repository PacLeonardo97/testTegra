import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import StyledComponentsRegistry from '../lib/registry'
import SocketProvider from '@/context/socket'
import Header from '@/components/Layout/Header'
import Layout from '@/components/Layout'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Pokemon do Pacheco',
  description: 'Generated by create next app'
}
interface IProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: IProps) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StyledComponentsRegistry>
          <SocketProvider>
            <Layout>
              {children}
              </Layout>
          </SocketProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
