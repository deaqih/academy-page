import { Link, useLocation, useSearchParams } from "@remix-run/react";
import { useState, useEffect } from "react";
import navbarStyles from "~/styles/navbar.css";

export const links = () => [
  { rel: "stylesheet", href: navbarStyles }
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const location = useLocation();
  const [searchParams] = useSearchParams();

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

  // Handle Desktop dropdown toggle
  const toggleDesktopDropdown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Close dropdown when changing route
  useEffect(() => {
    setIsDropdownOpen(false);
    setMobileDropdownOpen(false);
  }, [location.pathname, location.search]);
  
  // Add global click handler to close dropdown when clicking outside
  useEffect(() => {    
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.dropdown-container')) {
        setIsDropdownOpen(false);
      }
    };
    
    document.addEventListener('click', handleClickOutside);
    
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  // Dropdown menu styling
  const dropdownMenuStyle = {
    display: isDropdownOpen ? 'block' : 'none',
    position: 'absolute' as const,
    top: 'calc(100% + 8px)',
    left: '0',
    backgroundColor: '#fff',
    minWidth: '180px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    padding: '12px 0',
    zIndex: 9999
  };

  // Dropdown menu link styling
  const dropdownLinkStyle = {
    display: 'block',
    padding: '8px 16px',
    color: '#4A5568',
    textDecoration: 'none',
    transition: 'background-color 0.3s ease, color 0.3s ease'
  };

  // Dropdown menu active link styling
  const dropdownActiveLinkStyle = {
    ...dropdownLinkStyle,
    backgroundColor: '#f5f8fa',
    color: '#FF4D6D'
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
            <Link to="/artikel" className={isActive("/artikel") ? "active" : ""}>Artikel</Link>
            <Link to="https://wa.me/6285183198360" className="btn btn-outline desktop-only">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 3C2 2.44772 2.44772 2 3 2H5.15287C5.64171 2 6.0589 2.35341 6.13927 2.8356L6.87858 7.27147C6.95075 7.70451 6.73206 8.13397 6.3394 8.3303L4.79126 9.10437C5.90756 11.8783 8.12168 14.0924 10.8956 15.2087L11.6697 13.6606C11.866 13.2679 12.2955 13.0492 12.7285 13.1214L17.1644 13.8607C17.6466 13.9411 18 14.3583 18 14.8471V17C18 17.5523 17.5523 18 17 18H15C7.8203 18 2 12.1797 2 5V3Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Hubungi Kami</span>
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
            <div className="mobile-dropdown">
              <div 
                className="mobile-dropdown-header" 
                onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '16px 20px',
                  fontSize: '16px',
                  color: '#4A5568',
                  cursor: 'pointer'
                }}
              >
                <span className={isPelatihanActive() ? "active" : ""}>Pelatihan</span>
                <svg 
                  width="12" 
                  height="12" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg" 
                  style={{ 
                    transform: mobileDropdownOpen ? 'rotate(180deg)' : 'rotate(0)',
                    transition: 'transform 0.3s ease'
                  }}
                >
                  <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              {mobileDropdownOpen && (
                <div style={{
                  backgroundColor: '#f5f8fa',
                  padding: '8px 0'
                }}>
                  <Link 
                    to="/pelatihan" 
                    style={{
                      display: 'block',
                      padding: '12px 32px',
                      color: isPelatihanActive() && !searchParams.get('category') ? '#FF4D6D' : '#4A5568',
                      textDecoration: 'none'
                    }}
                  >
                    Semua Pelatihan
                  </Link>
                  <Link 
                    to="/pelatihan?category=training" 
                    style={{
                      display: 'block',
                      padding: '12px 32px',
                      color: isCategoryActive("training") ? '#FF4D6D' : '#4A5568',
                      textDecoration: 'none'
                    }}
                  >
                    Training
                  </Link>
                  <Link 
                    to="/pelatihan?category=consulting" 
                    style={{
                      display: 'block',
                      padding: '12px 32px',
                      color: isCategoryActive("consulting") ? '#FF4D6D' : '#4A5568',
                      textDecoration: 'none'
                    }}
                  >
                    Consulting
                  </Link>
                  <Link 
                    to="/pelatihan?category=assessment" 
                    style={{
                      display: 'block',
                      padding: '12px 32px',
                      color: isCategoryActive("assessment") ? '#FF4D6D' : '#4A5568',
                      textDecoration: 'none'
                    }}
                  >
                    Assessment
                  </Link>
                </div>
              )}
            </div>
            <Link to="/about" className={isActive("/about") ? "active" : ""}>Tentang Ikram</Link>
            <Link to="/artikel" className={isActive("/artikel") ? "active" : ""}>Artikel</Link>
            <Link to="https://wa.me/6285183198360" className="mobile-contact">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 3C2 2.44772 2.44772 2 3 2H5.15287C5.64171 2 6.0589 2.35341 6.13927 2.8356L6.87858 7.27147C6.95075 7.70451 6.73206 8.13397 6.3394 8.3303L4.79126 9.10437C5.90756 11.8783 8.12168 14.0924 10.8956 15.2087L11.6697 13.6606C11.866 13.2679 12.2955 13.0492 12.7285 13.1214L17.1644 13.8607C17.6466 13.9411 18 14.3583 18 14.8471V17C18 17.5523 17.5523 18 17 18H15C7.8203 18 2 12.1797 2 5V3Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Hubungi Kami</span>
            </Link>
          </div>
        )}
      </nav>
    </div>
  );
} 