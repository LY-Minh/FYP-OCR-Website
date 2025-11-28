import Image from "next/image";

export default function Purpose() {
  const content = [
    {
      title: "Accelerating Khmer LLM Development",
      description:
        "High-quality Khmer text is essential for training large language models, but most existing datasets are tiny or inconsistent. Our OCR pipeline helps generate cleaner, larger corpora so Khmer can be supported by the same advanced AI technologies available in other languages.",
      image: "/purpose1.jpg", // Using placeholder as requested
      reverse: false, // Image Left, Text Right
    },
    {
      title: "Research and Development",
      description:
        "This page is part of an ongoing project to improve Khmer OCR performance. We’re experimenting with different models, datasets, and layouts to see what works best for real users. Your uploads and feedback help us understand where the system succeeds—and where we still need to improve.",
      image: "/purpose2.png", // Using placeholder as requested
      reverse: true, // Text Left, Image Right
    },
  ];

  return (
    <section className="bg-black text-white py-24 md:py-32" id="about">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center mb-20 md:mb-32 space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            Our <span className="text-blue-500">Purpose</span>
          </h2>
          <div className="h-1 w-20 bg-blue-600 mx-auto rounded-full" />
        </div>

        {/* Content Rows */}
        <div className="space-y-24 md:space-y-32">
          {content.map((item, index) => (
            <div
              key={index}
              className={`flex flex-col md:flex-row items-center gap-12 md:gap-20 ${
                item.reverse ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Image Side */}
              <div className="flex-1 w-full flex justify-center">
                <div className="relative w-full max-w-lg aspect-[4/3] bg-gray-900/50 rounded-2xl overflow-hidden border border-gray-800 shadow-2xl shadow-blue-900/10 p-8">
                  <div className="relative w-full h-full">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>

              {/* Text Side */}
              <div className="flex-1 space-y-6 text-center md:text-left">
                <h3 className="text-2xl md:text-4xl font-bold leading-tight">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-lg leading-relaxed">
                  {item.description}
                </p>
                
                {/* Optional Decorative Line for text side */}
                <div 
                    className={`h-px w-full max-w-[100px] bg-gradient-to-r from-blue-600 to-transparent mt-6 mx-auto ${
                        item.reverse ? "md:ml-0" : "md:ml-0" // Keeps it aligned left on desktop
                    }`} 
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
// src\app\components\structure\Purpose.tsx