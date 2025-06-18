export default function KoshefHomePage() {
  return (
    <main className="min-h-screen bg-[#FDF6EC] text-gray-900 p-6">
      <header className="flex justify-between items-center mb-10">
        <div className="flex items-center space-x-4">
          <img src="/Koshef-2.jpg" alt="Koshef Logo" className="h-14 w-auto" />
          <h1 className="text-4xl font-bold tracking-tight text-[#7A9E7E]">Koshef.ai</h1>
        </div>
        <nav className="space-x-6 text-lg text-[#7A9E7E]">
          <a href="#about" className="hover:underline">About</a>
          <a href="#recipes" className="hover:underline">Recipes</a>
          <a href="#submit" className="hover:underline">Submit</a>
          <a href="#contact" className="hover:underline">Contact</a>
        </nav>
      </header>

      <section className="text-center mb-20">
        <h2 className="text-5xl font-semibold mb-4 text-[#C1694F]">Discover, Rate, and Share Recipes with Ease</h2>
        <p className="text-xl max-w-2xl mx-auto text-[#7A9E7E]">Kosher food made smarter. Upload, browse, and enjoy recipes with trusted community ratings and AI-powered recommendations.</p>
      </section>

      <section id="about" className="mb-20">
        <h3 className="text-3xl font-semibold mb-4 text-[#C1694F]">About Koshef.ai</h3>
        <p className="text-lg max-w-3xl text-[#7A9E7E]">
          Koshef.ai is your go-to platform for finding kosher recipes, submitting your own, and discovering the highest-rated meals across categories. With seamless image uploads, recipe validation, and smart suggestions, cooking kosher has never been so intuitive.
        </p>
      </section>

      <section id="recipes" className="mb-20">
        <h3 className="text-3xl font-semibold mb-4 text-[#C1694F]">Top Recipes</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-2xl shadow-md p-4 bg-white">
              <div className="h-48 bg-gray-200 rounded-xl mb-4"></div>
              <h4 className="text-xl font-semibold mb-1 text-[#7A9E7E]">Recipe Title</h4>
              <p className="text-sm text-gray-600">Brief description of the recipe...</p>
            </div>
          ))}
        </div>
      </section>

      <section id="submit" className="mb-20">
        <h3 className="text-3xl font-semibold mb-4 text-[#C1694F]">Submit Your Recipe</h3>
        <p className="mb-4 text-[#7A9E7E]">Have a great recipe? Upload it along with a photo and let the community try it out.</p>
        <form className="space-y-4 max-w-xl">
          <input type="text" placeholder="Recipe Name" className="w-full border p-3 rounded-xl" />
          <textarea placeholder="Instructions" className="w-full border p-3 rounded-xl h-32"></textarea>
          <input type="file" className="w-full" />
          <button type="submit" className="bg-[#7A9E7E] text-white px-6 py-3 rounded-xl shadow hover:bg-opacity-90">Submit</button>
        </form>
      </section>

      <section id="contact" className="mb-20">
        <h3 className="text-3xl font-semibold mb-4 text-[#C1694F]">Contact Us</h3>
        <p className="text-[#7A9E7E]">Email us at <a href="mailto:info@koshef.ai" className="underline">info@koshef.ai</a> for support or feedback.</p>
      </section>

      <footer className="text-center text-sm text-gray-500 mt-10">
        &copy; {new Date().getFullYear()} Koshef.ai. All rights reserved.
      </footer>
    </main>
  );
}
