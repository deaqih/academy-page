import styles from "~/styles/hero.css";
import { useState, useEffect } from "react";

export const links = () => [{ rel: "stylesheet", href: styles }];

interface Banner {
  id: number;
  title: string;
  description: string;
  image: string;
  backgroundColor?: string;
  textColor?: string;
  imageBgColor?: string;
}

interface HeroProps {
  currentBanner: number;
  banners: Banner[];
}

export default function Hero({ currentBanner, banners }: HeroProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [slideDirection, setSlideDirection] = useState<'next' | 'prev'>('next');
  const [activeIndex, setActiveIndex] = useState(currentBanner);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Auto slider setiap 5 detik
  useEffect(() => {
    const interval = setInterval(() => {
      handleNavigation('next');
    }, 5000);
    
    return () => clearInterval(interval);
  }, [activeIndex]);

  const handleNavigation = (direction: 'next' | 'prev') => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setSlideDirection(direction);
    
    if (direction === 'next') {
      setActiveIndex((prev) => (prev + 1) % banners.length);
    } else {
      setActiveIndex((prev) => (prev - 1 + banners.length) % banners.length);
    }
    
    setTimeout(() => setIsAnimating(false), 500);
  };

  const goToSlide = (index: number) => {
    if (isAnimating || index === activeIndex) return;
    
    setIsAnimating(true);
    setSlideDirection(index > activeIndex ? 'next' : 'prev');
    setActiveIndex(index);
    
    setTimeout(() => setIsAnimating(false), 500);
  };

  if (!banners || banners.length === 0) {
    return null;
  }

  const banner = banners[activeIndex];

  if (!banner) {
    return null;
  }

  console.log('Banner image path:', banner.image);
  
  return (
    <>
      <section 
        className={`hero ${isMobile ? 'mobile-friendly modern-mobile-hero' : ''}`}
        data-banner-id={banner.id}
      >
        <div className="hero-slider-container">
          <div className="slider-navigation left">
            <button 
              type="button"
              className="nav-button prev" 
              aria-label="Previous banner"
              disabled={isAnimating}
              onClick={() => handleNavigation('prev')}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
          
          <div className="hero-background">
            <div className="hero-image-container">
              <img 
                src={`${banner.image}`} 
                alt="Ikram Academy Banner"
                className={`hero-background-image ${isAnimating ? `slide-in-${slideDirection}` : ''}`}
                loading="eager"
                width="1920"
                height="779"
              />
            </div>
          </div>
          
          <div className="slider-navigation right">
            <button 
              type="button"
              className="nav-button next" 
              aria-label="Next banner"
              disabled={isAnimating}
              onClick={() => handleNavigation('next')}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
          
          <div className="slider-indicators">
            {banners.map((_, index) => (
              <button 
                key={index}
                type="button"
                className={`indicator-dot ${index === activeIndex ? 'active' : ''}`}
                aria-label={`Go to slide ${index + 1}`}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>
        </div>
      </section>

      <section className={`stats-section ${isMobile ? 'modern-mobile-stats' : ''}`}>
        <div className="stats-container">
          <div className="stat-item">
            <div className="stat-icon">
              <img src="/images/icon/perusahaan.svg" alt="Perusahaan" width="24" height="24" />
            </div>
            <div className="stat-content">
              <span className="stat-label">Perusahaan Multi-Nasional</span>
            </div>
          </div>
          <div className="stat-item">
            <div className="stat-icon">
              <img src="/images/icon/tenaga.svg" alt="Tenaga Ahli" width="24" height="24" />
            </div>
            <div className="stat-content">
              <span className="stat-label">Tenaga Ahli Berpengalaman</span>
            </div>
          </div>
          <div className="stat-item">
            <div className="stat-icon">
              <img src="/images/icon/mitra.svg" alt="Mitra" width="24" height="24" />
            </div>
            <div className="stat-content">
              <span className="stat-label">Mitra Terpercaya</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
} 