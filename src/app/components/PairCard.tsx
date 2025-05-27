import React from "react";
import Image from "next/image";

interface Props {
  imgSrc: string;
  gifSrc: string;
}

const PairCard: React.FC<Props> = ({ imgSrc, gifSrc }) => {
  const isValidImage = imgSrc && imgSrc.startsWith("http");
  const isValidGif = gifSrc && gifSrc.startsWith("http");

  return (
    <div className="relative group rounded-3xl overflow-hidden bg-gray-800 shadow-lg hover:shadow-2xl transition transform hover:scale-105">
      <div className="grid grid-cols-2">
        <div className="relative h-72">
          {isValidImage ? (
            <Image
              src={imgSrc}
              alt="Matched Image"
              fill
              style={{ objectFit: "cover" }}
              className="transition transform group-hover:scale-110"
            />
          ) : (
            <p className="text-white">No Image Availablee</p>
          )}
        </div>

        <div className="relative h-72 border-l border-gray-700">
          {isValidGif ? (
            <img
              src={gifSrc}
              alt="Matched GIF"
              className="w-full h-full object-cover transition transform group-hover:scale-110"
            />
          ) : (
            <h1 className="text-white">No GIF Available</h1>
          )}
        </div>
      </div>

      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
        <p className="text-white text-lg font-semibold">Image & GIFF Pair</p>
      </div>

      <div className="absolute bottom-4 right-4 flex gap-3 opacity-0 group-hover:opacity-100 transition">
        {isValidImage && (
          <a
            href={imgSrc}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition"
          >
            Download Image
          </a>
        )}
        {isValidGif && (
          <a
            href={gifSrc}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-purple-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-purple-600 transition"
          >
            Download GIF
          </a>
        )}
      </div>
    </div>
  );
};

export default PairCard;




