'use client';

import { WagmiConfig, createConfig, http } from 'wagmi';
import { bsc } from 'wagmi/chains';
import { injected } from '@wagmi/connectors';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Create a React Query client
const queryClient = new QueryClient();

// Create the Wagmi config (auto-connect + BSC + injected connector)
const config = createConfig({
    autoConnect: true,
    chains: [bsc],
    transports: {
        [bsc.id]: http('https://bsc-dataseed.binance.org/'),
    },
    connectors: [
        injected({ shimDisconnect: true }),
    ],
});

// Export a provider that wraps both React Query and Wagmi
export function WagmiProvider({ children }: { children: React.ReactNode }) {
    return (
        <QueryClientProvider client={queryClient}>
            <WagmiConfig config={config}>
                {children}
            </WagmiConfig>
        </QueryClientProvider>
    );
}
