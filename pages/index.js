import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F6F0E5] text-[#3C3C3C]">
      <header className="flex items-center justify-between p-4 shadow-md bg-white">
        <div className="flex items-center space-x-3">
          <Image src="/Koshef-2.jpg" alt="Koshef Logo" width={60} height={60} />
          <h1 className="text-2xl font-bold text-[#7A9E7E]">Koshef</h1>
        </div>
        <nav className="space-x-4">
          <Link href="#" className="hover:text-[#C1694F]">Home</Link>
          <Link href="#about" className="hover:text-[#C1694F]">About</Link>
          <Link href="#recipes" className="hover:text-[#C1694F]">Recipes</Link>
          <Link href="#submit" className="hover:text-[#C1694F]">Submit</Link>
          <Link href="#rate" className="hover:text-[#C1694F]">Rate</Link>
          <Link href="#upload" className="hover:text-[#C1694F]">Upload Image</Link>
          <Link href="#contact" className="hover:text-[#C1694F]">Contact</Link>
        </nav>
      </header>

      <section id="about" className="p-12 text-center">
        <h2 className="text-3xl font-semibold text-[#C1694F]">About Koshef</h2>
        <p className="mt-4 max-w-2xl mx-auto">
          Koshef is a community-driven kosher recipe collection platform where you can share, explore,
          and rate delicious dishes while staying true to dietary values.
        </p>
      </section>

      <section id="recipes" className="p-12 bg-[#FFFBEF]">
        <h2 className="text-2xl font-semibold text-[#7A9E7E] mb-6">Explore Recipes</h2>
        <p className="text-gray-700">Search and explore user-submitted recipes here... (data loading coming soon)</p>
      </section>

      <section id="submit" className="p-12">
        <h2 className="text-2xl font-semibold text-[#C1694F] mb-6">Submit a Recipe</h2>
        <form className="space-y-4 max-w-xl mx-auto">
          <input type="text" placeholder="Recipe Name" className="w-full p-2 border" />
          <textarea placeholder="Ingredients (one per line)" className="w-full p-2 border h-24" />
          <textarea placeholder="Instructions (one per line)" className="w-full p-2 border h-24" />
          <textarea placeholder="Notes (optional)" className="w-full p-2 border h-16" />
          <button type="submit" className="bg-[#7A9E7E] text-white px-4 py-2 rounded hover:bg-[#638a68]">
            Submit Recipe
          </button>
        </form>
      </section>

      <section id="rate" className="p-12 bg-[#FFFBEF]">
        <h2 className="text-2xl font-semibold text-[#7A9E7E] mb-4">Rate a Recipe</h2>
        <p className="text-gray-700">This section will allow users to rate recipes (integration coming soon).</p>
      </section>

      <section id="upload" className="p-12">
        <h2 className="text-2xl font-semibold text-[#C1694F] mb-6">Upload an Image</h2>
        <form className="space-y-4 max-w-xl mx-auto">
          <input type="text" placeholder="Recipe ID" className="w-full p-2 border" />
          <input type="email" placeholder="Email Address" className="w-full p-2 border" />
          <input type="file" className="w-full" />
          <button type="submit" className="bg-[#C1694F] text-white px-4 py-2 rounded hover:bg-[#a5513e]">
            Upload
          </button>
        </form>
      </section>

      <section id="contact" className="p-12 text-center bg-[#FFFBEF]">
        <h2 className="text-2xl font-semibold text-[#7A9E7E]">Contact Us</h2>
        <p className="mt-2">Questions? Suggestions? Contact us at support@koshef.ai</p>
      </section>

      <footer className="text-center py-6 text-sm text-gray-500">&copy; 2025 Koshef.ai. All rights reserved.</footer>
    </main>
  );
}
