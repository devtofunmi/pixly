"use client";

import { useState } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import PairCard from "../components/PairCard";

export default function Home() {
  const [query, setQuery] = useState("");
  const [pairs, setPairs] = useState<{ image: string; gif: string }[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchPairs = async () => {
    if (!query) return;
    setLoading(true);

    try {
      const res = await axios.get(`/api/fetchPairs?query=${query}`);
      setPairs((prev) => [...prev, res.data]);
    } catch (error) {
      console.error("Error fetching pairs:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-gray-100 flex flex-col items-center justify-center px-6 py-12">
      {/* Main Container */}
      <div className="w-full max-w-4xl bg-black/70  rounded-3xl shadow-2xl p-10 transition transform hover:scale-105">
        <h1 className="text-5xl font-extrabold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
          Pixly - Image & GIF Matching
        </h1>


        <div className="flex gap-4 mb-8">
          <input
            type="text"
            placeholder="Enter section (e.g., hero, footer)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full px-5 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-blue-500 transition outline-none"
          />
          <button
            onClick={fetchPairs}
            className="cursor-pointer bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-lg shadow-lg hover:scale-105 transition transform"
          >
            Search
          </button>
        </div>

        {loading && (
          <div className="flex justify-center py-6">
            <Loader />
          </div>
        )}

      
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {pairs.map((pair, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition transform hover:scale-105 overflow-hidden"
            >
              <PairCard image={pair.image} gif={pair.gif} />
            </div>
          ))}
        </div>

        
        {!loading && pairs.length === 0 && (
          <p className="text-center text-gray-400 mt-8">
            No matching pairs found. Try another keyword.
          </p>
        )}
      </div>
    </div>
  );
}
