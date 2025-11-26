import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-black via-gray-900 to-blue-950 border-t border-white/10 pt-16 pb-8 text-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Column */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <div className="p-2 rounded-lg inline-block">
                 <Image src="/ocr.jpg" alt="Logo" width={100} height={30} className="object-contain" />
              </div>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
              Unlocking Khmer Script through advanced OCR technology.
            </p>
          </div>

          {/* Links Columns */}
          <div>
            <h3 className="font-bold text-white mb-4 tracking-wide">About</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="#" className="hover:text-blue-400 transition-colors">Project Overview</Link></li>
              <li><Link href="#" className="hover:text-blue-400 transition-colors">How It Works</Link></li>
              <li><Link href="#" className="hover:text-blue-400 transition-colors">Team</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white mb-4 tracking-wide">Resources</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="#" className="hover:text-blue-400 transition-colors">Documentation</Link></li>
              <li><Link href="#" className="hover:text-blue-400 transition-colors">API Reference</Link></li>
              <li><Link href="#" className="hover:text-blue-400 transition-colors">Tutorials</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white mb-4 tracking-wide">Community</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="#" className="hover:text-blue-400 transition-colors">Contribute</Link></li>
              <li><Link href="#" className="hover:text-blue-400 transition-colors">Contact Us</Link></li>
              <li><Link href="#" className="hover:text-blue-400 transition-colors">Support</Link></li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-white/10 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} FYP OCR Project. All rights reserved.
        </div>
      </div>
    </footer>
  );
}