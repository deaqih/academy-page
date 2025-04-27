import styles from "~/styles/hero.css";
import { Link, Form } from "@remix-run/react";
import { useState, useEffect } from "react";

export const links = () => [{ rel: "stylesheet", href: styles }];

interface HeroProps {
  currentBanner: number;
  banners: Array<{
    id: number;
    title: string;
    description: string;
    image: string;
    backgroundColor?: string;
    textColor?: string;
    imageBgColor?: string;
  }>;
}

export default function Hero({ currentBanner, banners }: HeroProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [slideDirection, setSlideDirection] = useState<'next' | 'prev'>('next');
  const [activeIndex, setActiveIndex] = useState(0);
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

  const handleSubmit = (direction: 'next' | 'prev') => () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setSlideDirection(direction);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  const banner = banners[currentBanner];

  return (
    <>
      <section 
        className={`hero ${isMobile ? 'mobile-friendly' : ''}`}
        style={{ 
          backgroundColor: banner.backgroundColor, 
          color: banner.textColor
        }}
        data-banner-id={banner.id}
      >
        <div className="particles">
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
        </div>
        
        <div className="container hero-container">
          <div className="hero-content">
            <div className={`banner-content ${isAnimating ? `slide-out-${slideDirection}` : ''}`}>
              <h1 dangerouslySetInnerHTML={{ __html: banner.title.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
              <p>{banner.description}</p>
            </div>
            <div className="hero-actions">
              <Link to="/about" className="btn btn-outline-light">
                <span>Tentang Ikram</span>
                <svg className="nav-arrow-right" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M4.16669 8334M15.8334 10L10.8334 5M15.8334 10L10.8334 15" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </div>
            <div className="banner-navigation">
              <Form method="post" onSubmit={handleSubmit('prev')}>
                <input type="hidden" name="currentBanner" value={currentBanner} />
                <input type="hidden" name="action" value="prev" />
                <button 
                  type="submit"
                  className="nav-button prev" 
                  aria-label="Previous banner"
                  disabled={isAnimating}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </Form>
           
              <Form method="post" onSubmit={handleSubmit('next')}>
                <input type="hidden" name="currentBanner" value={currentBanner} />
                <input type="hidden" name="action" value="next" />
                <button 
                  type="submit"
                  className="nav-button next" 
                  aria-label="Next banner"
                  disabled={isAnimating}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </Form>
            </div>
          </div>
          
          <div className="hero-image">
            <img 
              src={banner.image} 
              alt="Ikram Academy Team"
              className={isAnimating ? `slide-in-${slideDirection}` : ''}
              loading="eager"
              style={{ backgroundColor: banner.imageBgColor }}
            />
          </div>
        </div>
      </section>

      <section className="stats-section">
        <div className="stats-container">
          <div className="stat-item">
            <div className="stat-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M3 21H21M3 18H21M8 18V13M16 18V13M4 13H20C20.5523 13 21 12.5523 21 12V5C21 4.44772 20.5523 4 20 4H4C3.44772 4 3 4.44772 3 5V12C3 12.5523 3.44772 13 4 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="stat-content">
              <span className="stat-label">Perusahaan Multi-Nasional</span>
            </div>
          </div>
          <div className="stat-item">
            <div className="stat-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M20 7H4C2.89543 7 2 7.89543 2 9V19C2 20.1046 2.89543 21 4 21H20C21.1046 21 22 20.1046 22 19V9C22 7.89543 21.1046 7 20 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 21V5C16 3.89543 15.1046 3 14 3H10C8.89543 3 8 3.89543 8 5V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="12" cy="14" r="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <div className="stat-content">
              <span className="stat-label">Tenaga Ahli Berpengalaman</span>
            </div>
          </div>
          <div className="stat-item">
            <div className="stat-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M14.5 9.50002L9 15.0001M7.5 12.5C7.5 13.8807 6.38071 15 5 15C3.61929 15 2.5 13.8807 2.5 12.5C2.5 11.1193 3.61929 10 5 10C6.38071 10 7.5 11.1193 7.5 12.5ZM15 16.5C15 17.8807 13.8807 19 12.5 19C11.1193 19 10 17.8807 10 16.5C10 15.1193 11.1193 14 12.5 14C13.8807 14 15 15.1193 15 16.5ZM21.5 12.5C21.5 13.8807 20.3807 15 19 15C17.6193 15 16.5 13.8807 16.5 12.5C16.5 11.1193 17.6193 10 19 10C20.3807 10 21.5 11.1193 21.5 12.5ZM15 8.5C15 9.88071 13.8807 11 12.5 11C11.1193 11 10 9.88071 10 8.5C10 7.11929 11.1193 6 12.5 6C13.8807 6 15 7.11929 15 8.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
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