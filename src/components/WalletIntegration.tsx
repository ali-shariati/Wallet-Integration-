'use client';

import { useState, useEffect } from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { JsonRpcProvider, formatEther } from 'ethers';

export default function WalletIntegration() {
    const { connectAsync, connectors } = useConnect();
    const { disconnect } = useDisconnect();
    const { isConnected, address } = useAccount();

    const [balance, setBalance] = useState<string | null>(null);
    const [loadingBalance, setLoadingBalance] = useState(false);
    const [connecting, setConnecting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Connect handler
    const handleConnect = async () => {
        setError(null);
        setConnecting(true);
        try {
            const { accounts, chainId } = await connectAsync({
                connector: connectors[0],
            });
            console.log('✅ Connected', { account: accounts[0], chainId });
        } catch (err: any) {
            console.error(err);
            setError(err.message || 'Connection failed');
        } finally {
            setConnecting(false);
        }
    };

    // Fetch BNB balance once connected
    useEffect(() => {
        if (!isConnected || !address) return;

        (async () => {
            setLoadingBalance(true);
            setError(null);
            try {
                const provider = new JsonRpcProvider('https://bsc-dataseed.binance.org/');
                const raw = await provider.getBalance(address);
                setBalance(formatEther(raw));
            } catch (err: any) {
                console.error(err);
                setError('Error fetching balance');
            } finally {
                setLoadingBalance(false);
            }
        })();
    }, [isConnected, address]);

    // Render
    if (!isConnected) {
        return (
            <div className="space-y-2 text-center">
                <button
                    onClick={handleConnect}
                    disabled={connecting}
                    className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
                >
                    {connecting ? 'Connecting…' : 'Connect MetaMask'}
                </button>
                {error && <p className="text-red-500">{error}</p>}
            </div>
        );
    }

    return (
        <div className="p-6 border border-sky-500 rounded space-y-4  gap-4">
            <p className='text-black'>
                Wallet :{' '}
                <span className="font-mono text-gray-600">
                     {address!.slice(0, 6)}…{address!.slice(-4)}
                </span>
            </p>
            <p className='text-black'>
                BNB Balance :{' '}
                <span className="font-mono text-gray-600">
                     {loadingBalance ? 'Loading…' : balance ? `${balance} BNB` : '—'}
                </span>
            </p>
            {error && <p className="text-red-500">{error}</p>}
            <button
                onClick={() => {
                    console.log('Disconnect clicked');
                    disconnect();
                }}
                className="px-3 py-1 bg-gray-400 rounded"
            >
                Disconnect
            </button>
        </div>
    );
}
