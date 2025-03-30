import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen h-full bg-gray-950 text-gray-100">
      <header className="min-h-[100vh] flex flex-col justify-center items-center text-center overflow-hidden">
       
        <div className="">
          <h1 className="text-8xl font-extrabold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            P i x l y
          </h1>
          <p className="text-2xl mb-8 max-w-2xl mx-auto leading-relaxed px-5">
          Helping Indie Developers Find Perfect Images & GIFs for Their Websites sections.
          </p>
          <Link href="/main">
            <button className="cursor-pointer bg-gradient-to-r from-blue-500 to-purple-500 text-white px-12 py-4 rounded-full shadow-lg hover:scale-105 transition transform">
              Get Started
            </button>
          </Link>
        </div>
      </header>

      <section className="py-28 px-12 bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold text-center mb-16 text-white">
            Why P i x l y?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                title: "Auto-Matching Pairs",
                description:
                  "Instantly get perfectly paired images and GIFs for any website section.",
                color: "from-blue-400 to-purple-400",
              },
              {
                title: "API-Powered",
                description:
                  "Fetch dynamic content from Unsplash and Giphy without manual uploads.",
                color: "from-purple-400 to-pink-400",
              },
              {
                title: "No Login Needed",
                description:
                  "Use Pixly instantly without account creation or sign-ins.",
                color: "from-pink-400 to-orange-400",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className={`p-10 bg-gray-800 rounded-3xl shadow-lg hover:shadow-2xl transition border border-gray-700 relative overflow-hidden group`}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-10 transition group-hover:opacity-30`}
                ></div>
                <h3 className="text-3xl font-semibold mb-5 text-white relative z-10">
                  {feature.title}
                </h3>
                <p className="text-lg relative z-10">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="from-gray-900 to-black text-white text-center py-20">
        <h2 className="text-6xl font-extrabold mb-8">Start Matching Today</h2>
        <p className="text-xl mb-10">
          Find the perfect visuals for your website sections in seconds.
        </p>
        <Link href="/main">
          <button className="cursor-pointer bg-white text-gray-900 px-12 py-4 rounded-full shadow-lg hover:scale-105 transition transform">
            Get Started
          </button>
        </Link>
      </section>
    </div>
  );
}


  