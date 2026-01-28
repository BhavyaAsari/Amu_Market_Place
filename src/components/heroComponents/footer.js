 export default function Footer() {

    return (

        <>
        
        <footer className="w-full border-t border-white/10
        text-black bg-purple-900/90">
            <div className="max-w-7xl px-6 py-6
            flex flex-col md:flex-row
            items-center justify-between gap-4"> 


            <p className="text-sm text-white">
                  © {new Date().getFullYear()} AMU Laptops. All rights reserved.
            </p>

            {/* Right */}
        <ul className="flex items-center gap-4 text-sm">
          <li className="hover:text-white transition cursor-pointer">
            Privacy Policy
          </li>
          <li className="hover:text-white transition cursor-pointer">
            Terms
          </li>
          <li className="hover:text-white transition cursor-pointer">
            Support
          </li>
        </ul>

            </div>

        </footer>
        </>
    );
 }