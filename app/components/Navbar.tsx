import { Link, useLocation, useSearchParams } from "@remix-run/react";
import { useState, useEffect, useRef } from "react";
import styles from "~/styles/navbar.css";

export const links = () => [{ rel: "stylesheet", href: styles }];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const location = useLocation();
  
  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && 
          buttonRef.current && 
          !menuRef.current.contains(e.target as Node) && 
          !buttonRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Navigation links data
  const navLinks = [
    { path: "/", label: "Beranda" },
    { path: "/pelatihan", label: "Layanan" },
    { path: "/about", label: "Tentang Ikram" },
    { path: "/artikel", label: "Artikel" }
  ];

  const isActive = (path: string) => 
    path === "/" 
      ? location.pathname === path 
      : location.pathname.startsWith(path);

  return (
    <div className="navbar-wrapper">
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="logo">
            <img src="/images/logo.png" alt="Ikram Academy" />
          </Link>

          {/* Desktop Navigation */}
          <div className="nav-links">
            {navLinks.map(link => (
              <Link 
                key={link.path} 
                to={link.path} 
                className={isActive(link.path) ? "active" : ""}
              >
                {link.label}
              </Link>
            ))}
            
            <Link to="https://wa.me/6285183198360" className="btn btn-outline desktop-only">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M2 3C2 2.44772 2.44772 2 3 2H5.15287C5.64171 2 6.0589 2.35341 6.13927 2.8356L6.87858 7.27147C6.95075 7.70451 6.73206 8.13397 6.3394 8.3303L4.79126 9.10437C5.90756 11.8783 8.12168 14.0924 10.8956 15.2087L11.6697 13.6606C11.866 13.2679 12.2955 13.0492 12.7285 13.1214L17.1644 13.8607C17.6466 13.9411 18 14.3583 18 14.8471V17C18 17.5523 17.5523 18 17 18H15C7.8203 18 2 12.1797 2 5V3Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>Hubungi Kami</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            ref={buttonRef}
            className={`mobile-menu-button ${isMenuOpen ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <div className="hamburger-lines">
              <span className="line line1"></span>
              <span className="line line2"></span>
              <span className="line line3"></span>
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div 
          ref={menuRef}
          className={`mobile-menu ${isMenuOpen ? 'active' : ''}`}
        >
          {navLinks.map(link => (
            <Link 
              key={link.path} 
              to={link.path} 
              className={isActive(link.path) ? "active" : ""}
            >
              <span>{link.label}</span>
              <svg className="nav-arrow" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M4.16669 10H15.8334M15.8334 10L10.8334 5M15.8334 10L10.8334 15" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          ))}
          
          <Link to="https://wa.me/6285183198360" className="mobile-contact">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M2 3C2 2.44772 2.44772 2 3 2H5.15287C5.64171 2 6.0589 2.35341 6.13927 2.8356L6.87858 7.27147C6.95075 7.70451 6.73206 8.13397 6.3394 8.3303L4.79126 9.10437C5.90756 11.8783 8.12168 14.0924 10.8956 15.2087L11.6697 13.6606C11.866 13.2679 12.2955 13.0492 12.7285 13.1214L17.1644 13.8607C17.6466 13.9411 18 14.3583 18 14.8471V17C18 17.5523 17.5523 18 17 18H15C7.8203 18 2 12.1797 2 5V3Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Hubungi Kami</span>
          </Link>
        </div>
      </nav>
    </div>
  );
} 