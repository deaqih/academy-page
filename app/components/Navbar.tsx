import { Link, useLocation, useSearchParams } from "@remix-run/react";
import { useState, useEffect, useRef } from "react";
import navbarStyles from "~/styles/navbar.css";

export const links = () => [
  { rel: "stylesheet", href: navbarStyles }
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);
  const location = useLocation();
  const [searchParams] = useSearchParams();
  // const mobileMenuRef = useRef<HTMLDivElement>(null);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const isPelatihanActive = () => {
    return location.pathname.startsWith('/pelatihan');
  };

  const isCategoryActive = (category: string) => {
    const urlCategory = searchParams.get('category');
    return urlCategory === category.toLowerCase();
  };

  // Handle Mobile Menu Toggle
  const toggleMobileMenu = () => {
    setIsMenuOpen((prev) => !prev);
    setIsMobileDropdownOpen(false); // tutup dropdown saat buka/tutup menu
  };

  // Saat komponen dimuat, reset menu state
  useEffect(() => {
    console.log("Component mounted: resetting menu state");
    setIsMenuOpen(false);
    // setMobileDropdownOpen(false);
  }, []);

  // Handle click outside of mobile menu
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        !(event.target as Element).closest('.mobile-menu-button')) {
        setIsMenuOpen(false);
      }
    }
  
    useEffect(() => {
      setIsMenuOpen(false);
      setIsMobileDropdownOpen(false);
    }, [location.pathname, location.search]);
    

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Close dropdown when changing route
  useEffect(() => {
    // setIsDropdownOpen(false);
    // setMobileDropdownOpen(false);
    setIsMenuOpen(false);
  }, [location.pathname, location.search]);

  // Handler untuk menutup menu mobile saat link diklik
  const handleLinkClick = () => {
    setIsMenuOpen(false);
    // setMobileDropdownOpen(false);
  };

  return (
    <div className="navbar-wrapper">
      <nav className="navbar">
        <div className="container navbar-container">
          <Link to="/" className="logo">
            <img src="/images/logo.png" alt="Ikram Academy" />
          </Link>

          <div className="nav-links">
            <Link to="/" className={isActive("/") ? "active" : ""}>Beranda</Link>
            <Link to="/pelatihan" className={isPelatihanActive() ? "active" : ""}>Pelatihan</Link>
            <Link to="/about" className={isActive("/about") ? "active" : ""}>Tentang Ikram</Link>
            <Link to="/artikel" className={isActive("/artikel") ? "active" : ""}>Artikel</Link>
            <Link to="https://wa.me/6285183198360" className="btn btn-outline desktop-only">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 3C2 2.44772 2.44772 2 3 2H5.15287C5.64171 2 6.0589 2.35341 6.13927 2.8356L6.87858 7.27147C6.95075 7.70451 6.73206 8.13397 6.3394 8.3303L4.79126 9.10437C5.90756 11.8783 8.12168 14.0924 10.8956 15.2087L11.6697 13.6606C11.866 13.2679 12.2955 13.0492 12.7285 13.1214L17.1644 13.8607C17.6466 13.9411 18 14.3583 18 14.8471V17C18 17.5523 17.5523 18 17 18H15C7.8203 18 2 12.1797 2 5V3Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>Hubungi Kami</span>
            </Link>
          </div>

          <button
            className="mobile-menu-button"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="mobile-menu active">
            <Link to="/" className={isActive("/") ? "active" : ""} onClick={handleLinkClick}>Beranda</Link>
            <div className="mobile-dropdown">
              {isMobileDropdownOpen && (
                <div className="mobile-dropdown-menu">
                  <Link
                    to="/pelatihan"
                    className={isPelatihanActive() && !searchParams.get('category') ? "active" : ""}
                    onClick={handleLinkClick}
                  >
                    Semua Pelatihan
                  </Link>
                  <Link
                    to="/pelatihan?category=training"
                    className={isCategoryActive("training") ? "active" : ""}
                    onClick={handleLinkClick}
                  >
                    Training
                  </Link>
                  <Link
                    to="/pelatihan?category=consulting"
                    className={isCategoryActive("consulting") ? "active" : ""}
                    onClick={handleLinkClick}
                  >
                    Consulting
                  </Link>
                  <Link
                    to="/pelatihan?category=assessment"
                    className={isCategoryActive("assessment") ? "active" : ""}
                    onClick={handleLinkClick}
                  >
                    Assessment
                  </Link>
                </div>
              )}

            </div>
            <Link to="/about" className={isActive("/about") ? "active" : ""} onClick={handleLinkClick}>Tentang Ikram</Link>
            <Link to="/artikel" className={isActive("/artikel") ? "active" : ""} onClick={handleLinkClick}>Artikel</Link>
            <Link to="https://wa.me/6285183198360" className="mobile-contact" onClick={handleLinkClick}>

              <span>Hubungi Kami</span>
            </Link>
          </div>
        )}
      </nav>
    </div>
  );
} 