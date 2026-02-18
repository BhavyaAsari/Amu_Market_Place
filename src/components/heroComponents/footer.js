"use client";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-purple-900/90 text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Company Info */}
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-semibold text-purple-200">AMU Laptops</h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              Your trusted marketplace for quality laptops and electronics.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-3">
            <h3 className="text-lg font-semibold text-purple-200">Quick Links</h3>
            <ul className="flex flex-col gap-2 text-sm">
              <li>
                <a href="#" className="text-gray-300 hover:text-purple-300 transition">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-purple-300 transition">
                  Products
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-purple-300 transition">
                  About Us
                </a>
              </li>
            </ul>
          </div>

          {/* Support & Legal */}
          <div className="flex flex-col gap-3">
            <h3 className="text-lg font-semibold text-purple-200">Support</h3>
            <ul className="flex flex-col gap-2 text-sm">
              <li>
                <a href="#" className="text-gray-300 hover:text-purple-300 transition">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-purple-300 transition">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-purple-300 transition">
                  Contact Support
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 text-sm">
          <p className="text-gray-400">
            © {new Date().getFullYear()} AMU Laptops. All rights reserved.
          </p>
          <p className="text-gray-400">
            Made with ❤️ by AMU Team
          </p>
        </div>
      </div>
    </footer>
  );
}
