"use client";
import React, { useState, useEffect, useRef } from "react";
import { FaSpinner, FaSearch } from "react-icons/fa"; // Spinner + Search icon
import PairCard from "../components/PairCard";

const Home = () => {
  const [section, setSection] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [gifs, setGifs] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);

  const fetchImagesAndGifs = async () => {
    if (!section.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const [unsplashRes, giphyRes] = await Promise.all([
        fetch(`https://api.unsplash.com/search/photos?query=${section}&per_page=6&client_id=${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`),
        fetch(`https://api.giphy.com/v1/gifs/search?api_key=${process.env.NEXT_PUBLIC_GIPHY_API_KEY}&q=${section}&limit=6`)
      ]);

      if (!unsplashRes.ok || !giphyRes.ok) {
        throw new Error("Failed to fetch data. Please try again.");
      }

      const unsplashData = await unsplashRes.json();
      const giphyData = await giphyRes.json();

      const imageUrls = unsplashData.results.map((img: any) => img.urls.regular);
      const gifUrls = giphyData.data.map((gif: any) => gif.images.original.url);

      setImages(imageUrls);
      setGifs(gifUrls);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const lazyLoad = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("opacity-100");
          entry.target.classList.remove("opacity-0");
        }
      });
    };

    observer.current = new IntersectionObserver(lazyLoad, {
      threshold: 0.2,
    });

    const images = document.querySelectorAll(".lazy-load");
    images.forEach((img) => {
      if (observer.current) observer.current.observe(img);
    });

    return () => observer.current?.disconnect();
  }, [images, gifs]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-8">
      {/* Search Section */}
      <div className="max-w-4xl mx-auto mb-12">
        <h1 className="text-4xl font-bold mb-4 text-center">Find Matching Images & GIFs</h1>
        <div className="flex items-center gap-4">
          <div className="relative w-full">
            <input
              type="text"
              // placeholder="Enter here(e.g,hero,footer,faq)"
              value={section}
              onChange={(e) => setSection(e.target.value)}
              className="w-full p-4 rounded-lg bg-gray-800 text-white shadow-md transition focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <FaSearch className="absolute right-4 top-4 text-gray-400" />
          </div>
          <button
            onClick={fetchImagesAndGifs}
            className="bg-blue-600 hover:bg-blue-500 transition duration-300 px-6 py-4 rounded-lg shadow-lg flex items-center justify-center gap-2"
            disabled={loading}
          >
            {loading ? <FaSpinner className="animate-spin" /> : "Search"}
          </button>
        </div>
      </div>

      {/* Error Handling */}
      {error && (
        <div className="bg-red-500 text-white p-4 rounded-lg shadow-md mb-8 max-w-2xl mx-auto">
          {error}
        </div>
      )}

      {/* Loading Spinner */}
      {loading ? (
        <div className="flex justify-center items-center min-h-[300px]">
          <FaSpinner className="text-5xl text-blue-500 animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {images.map((url, index) => (
            <div
              key={`img-${index}`}
              className="lazy-load opacity-0 transition-opacity duration-700 transform hover:scale-105 hover:shadow-xl rounded-lg overflow-hidden bg-gray-800"
            >
              <PairCard imgSrc={url} gifSrc={gifs[index % gifs.length]} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;



