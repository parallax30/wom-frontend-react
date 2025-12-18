
import Link from 'next/link'
import React from 'react'

const Page404: React.FC = () => (
  <div className="nc-Page404">
    <div className="relative container py-16 lg:py-20">
      {/* HEADER */}
      <header className="mx-auto max-w-2xl space-y-7 text-center">
        <h2 className="text-7xl md:text-8xl">🪔</h2>
        <h1 className="text-8xl font-semibold tracking-widest md:text-9xl">404</h1>
        <span className="block text-sm font-medium tracking-wider text-neutral-800 sm:text-base dark:text-neutral-200">
          {`THE PAGE YOU WERE LOOKING FOR DOESN'T EXIST.`}
        </span>
        <Link href="/" className="mt-4 inline-block rounded-md bg-[#E92070] text-white px-4 py-2 hover:bg-[#c81c62]">
          Return Home Page
        </Link>
      </header>
    </div>
  </div>
)

export default Page404
