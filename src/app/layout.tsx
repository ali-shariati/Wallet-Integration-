import './globals.css';
import { WagmiProvider } from '@/context/WagmiProvider'; // Import the provider from the context folder

export const metadata = {
    title: 'Wallet Integration',
    description: 'Next wallet',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="fa" dir="rtl">
        <body>
        <WagmiProvider>
            {children}
        </WagmiProvider>
        </body>
        </html>
    );
}
