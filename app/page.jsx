import Image from 'next/image'
import Hero from '../components/Hero/Hero'



export default function Home() {
  return (
    <main className="flex flex-col items-center px-10 2xl:px-28 my-8 ">
      <Hero />
    </main>
  )
}
