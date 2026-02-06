import Image from "next/image";
import { Trending } from "@/components/trending/trending";

export default function Home() {
  return (
      <main className='mx-auto max-w-3xl p-6'>
          <Trending />
      </main>
  )
}
