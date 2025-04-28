import Image from "next/image";
import WalletIntegration from "@/components/WalletIntegration";

export default function Home() {
  return (
      <div className='bg-white'>
          <main className="flex items-center justify-center h-screen">
              <WalletIntegration/>
          </main>
      </div>
  );
}
