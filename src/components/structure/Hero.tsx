"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Play, X } from "lucide-react";

export default function Hero() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <section className="relative bg-black text-white min-h-screen flex items-center pt-20 md:pt-0 overflow-hidden">
      {/* Background Gradient/Glow Effect (Optional for modern look) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-900/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center gap-12 md:gap-20 relative z-10">
        
        {/* Left Column: Text & Actions */}
        <div className="flex-1 space-y-8 text-center md:text-left">
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1]">
              UNLOCKING THE <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
                KHMER SCRIPT
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-400 max-w-xl mx-auto md:mx-0 leading-relaxed">
              Transform your Khmer documents into editable text instantly. 
              Our advanced OCR engine preserves formatting with 99% accuracy.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start w-full sm:w-auto">
            {/* Primary Action: High Contrast */}
            <Link
              href="/ocr"
              className="px-8 py-4 bg-white text-black text-lg font-bold rounded-full hover:bg-gray-200 hover:scale-105 transition-all shadow-lg shadow-white/10 text-center"
            >
              Try OCR Now
            </Link>

            {/* Secondary Action: Demo Video */}
            <button
              onClick={() => setIsVideoOpen(true)}
              className="group flex items-center justify-center gap-3 px-8 py-4 border border-gray-700 bg-gray-900/50 hover:bg-gray-800 text-white text-lg font-medium rounded-full transition-all"
            >
              <span className="w-8 h-8 flex items-center justify-center bg-blue-600 rounded-full group-hover:bg-blue-500 transition-colors">
                <Play className="w-4 h-4 fill-white text-white" />
              </span>
              Watch Demo
            </button>
          </div>
        </div>

        {/* Right Column: Hero Image */}
        <div className="flex-1 w-full max-w-lg md:max-w-xl relative">
          {/* Decorative ring */}
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse" />
          
          <div className="relative aspect-square md:aspect-[4/3]">
            <Image
              src="/img1.jpg" // Ensure this image exists in your public folder
              alt="OCR Scanner App Interface"
              fill
              className="object-contain drop-shadow-2xl"
              priority
            />
          </div>
        </div>
      </div>

      {/* Video Modal Overlay */}
      {isVideoOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-gray-800">
            <button
              onClick={() => setIsVideoOpen(false)}
              className="absolute top-4 right-4 z-10 p-2 bg-black/50 text-white rounded-full hover:bg-red-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/HD8lzvPAYYA?autoplay=1&mute=1&rel=0"
              title="OCR Demo Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </section>
  );
}

// src\app\components\structure\Hero.tsx