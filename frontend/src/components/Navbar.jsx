// import { NAV_LINKS } from "../data/content";
// import { useAuth } from "../context/AuthContext";

// const { user, logout } = useAuth();

// export default function Navbar({ menuOpen, setMenuOpen }) {
//     return (
//         <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100 shadow-sm">
//             <div className="max-w-5xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
//                 <span className="text-blue-600 font-bold text-xl tracking-tight">Glynostic</span>

//                 <div className="hidden md:flex items-center gap-7">
//                     {NAV_LINKS.map((link) => (
//                         <a
//                             key={link}
//                             href={
//                                 link === "FAQ"
//                                     ? "#faq"
//                                     : link === "90-Day Program"
//                                         ? "#program"
//                                         : link === "Home"
//                                             ? "#top"
//                                             : "#"
//                             }
//                             onClick={(e) => {
//                                 if (link === "FAQ" || link === "90-Day Program") {
//                                     e.preventDefault();

//                                     const id = link === "FAQ" ? "faq" : "program";

//                                     document.getElementById(id)?.scrollIntoView({
//                                         behavior: "smooth",
//                                     });
//                                 }
//                             }}
//                             className={`text-sm font-medium transition-colors ${link === "Home"
//                                     ? "text-blue-600 border-b-2 border-blue-600 pb-0.5"
//                                     : "text-gray-600 hover:text-blue-600"
//                                 }`}
//                         >
//                             {link}
//                         </a>
//                     ))}
//                 </div>

//                 <div className="hidden md:flex items-center gap-3">
//                     <button className="text-sm text-gray-500 hover:text-blue-600 transition-colors">🌐</button>
//                     <button className="bg-blue-600 text-white text-sm font-semibold px-5 py-2 rounded-full hover:bg-blue-700 transition-colors">
//                         Get Started
//                     </button>
//                 </div>

//                 <button className="md:hidden text-gray-600" onClick={() => setMenuOpen(!menuOpen)}>
//                     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
//                         />
//                     </svg>
//                 </button>
//             </div>

//             {menuOpen && (
//                 <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 flex flex-col gap-4">
//                     {NAV_LINKS.map((link) => (
//                         <a key={link} href="#" className="text-sm font-medium text-gray-700 hover:text-blue-600">
//                             {link}
//                         </a>
//                     ))}
//                     <button className="bg-blue-600 text-white text-sm font-semibold px-5 py-2 rounded-full w-fit hover:bg-blue-700">
//                         Get Started
//                     </button>
//                 </div>
//             )}
//         </nav>
//     );
// }






import { NAV_LINKS } from "../data/content";
import { useAuth } from "../context/AuthContext";
import Login from "./Login";

export default function Navbar({ menuOpen, setMenuOpen }) {
  const { user, logout } = useAuth(); // ✅ moved inside component

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100 shadow-sm">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        <span className="text-blue-600 font-bold text-xl tracking-tight">
          Glynostic
        </span>

        {/* NAV LINKS */}
        <div className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href={
                link === "FAQ"
                  ? "#faq"
                  : link === "90-Day Program"
                  ? "#program"
                  : link === "Home"
                  ? "#top"
                  : "#"
              }
              onClick={(e) => {
                if (link === "FAQ" || link === "90-Day Program") {
                  e.preventDefault();

                  const id = link === "FAQ" ? "faq" : "program";

                  document
                    .getElementById(id)
                    ?.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className={`text-sm font-medium transition-colors ${
                link === "Home"
                  ? "text-blue-600 border-b-2 border-blue-600 pb-0.5"
                  : "text-gray-600 hover:text-blue-600"
              }`}
            >
              {link}
            </a>
          ))}
        </div>

        {/* RIGHT SECTION (UPDATED WITH AUTH) */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              <img
                src={user.picture}
                alt="user"
                className="w-8 h-8 rounded-full"
              />
              <button
                onClick={logout}
                className="text-sm text-gray-600 hover:text-red-500"
              >
                Logout
              </button>
            </>
          ) : (
            <Login />
          )}
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          className="md:hidden text-gray-600"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={
                menuOpen
                  ? "M6 18L18 6M6 6l12 12"
                  : "M4 6h16M4 12h16M4 18h16"
              }
            />
          </svg>
        </button>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 flex flex-col gap-4">
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href="#"
              className="text-sm font-medium text-gray-700 hover:text-blue-600"
            >
              {link}
            </a>
          ))}

          {user ? (
            <button
              onClick={logout}
              className="text-sm text-red-500 font-semibold"
            >
              Logout
            </button>
          ) : (
            <Login />
          )}
        </div>
      )}
    </nav>
  );
}