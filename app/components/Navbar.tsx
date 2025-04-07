import { Link, useLocation } from "@remix-run/react";
import { useState } from "react";
import styles from "~/styles/navbar.css";

export const links = () => [{ rel: "stylesheet", href: styles }];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
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
            <Link to="/pelatihan" className={isActive("/pelatihan") ? "active" : ""}>Pelatihan</Link>
            <Link to="/about" className={isActive("/about") ? "active" : ""}>Tentang Ikram</Link>
            <Link to="/sejarah" className={isActive("/sejarah") ? "active" : ""}>Sejarah</Link>
            <Link to="/portofolio" className={isActive("/portofolio") ? "active" : ""}>Klien & Mitra</Link>
            <Link to="/artikel" className={isActive("/artikel") ? "active" : ""}>Artikel</Link>
            <Link to="/hubungi-kami" className="btn btn-outline desktop-only">
              Hubungi Kami
            </Link>
          </div>

          <button 
            className="mobile-menu-button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
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

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="mobile-menu">
            <Link to="/" className={isActive("/") ? "active" : ""}>Beranda</Link>
            <Link to="/pelatihan" className={isActive("/pelatihan") ? "active" : ""}>Pelatihan</Link>
            <Link to="/about" className={isActive("/about") ? "active" : ""}>Tentang Ikram</Link>
            <Link to="/sejarah" className={isActive("/sejarah") ? "active" : ""}>Sejarah</Link>
            <Link to="/klien-mitra" className={isActive("/klien-mitra") ? "active" : ""}>Klien & Mitra</Link>
            <Link to="/artikel" className={isActive("/artikel") ? "active" : ""}>Artikel</Link>
            <Link to="/hubungi-kami" className="mobile-contact">
              Hubungi Kami
            </Link>
          </div>
        )}
      </nav>
    </div>
  );
} 