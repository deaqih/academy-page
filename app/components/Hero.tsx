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
  }>;
}

export default function Hero({ currentBanner, banners }: HeroProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [slideDirection, setSlideDirection] = useState<'next' | 'prev'>('next');

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
      <section className="hero">
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
            />
          </div>
        </div>
      </section>

      <section className="stats-section">
        <div className="stats-container">
          <div className="stat-item">
            <div className="stat-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 15C15.3137 15 18 12.3137 18 9C18 5.68629 15.3137 3 12 3C8.68629 3 6 5.68629 6 9C6 12.3137 8.68629 15 12 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3 20.25C3.95725 18.6165 5.29306 17.2607 6.89205 16.3229C8.49104 15.3851 10.2999 14.8962 12.1455 14.9C13.9911 14.9038 15.7982 15.4002 17.3934 16.3445C18.9886 17.2888 20.3189 18.6502 21.27 20.2875" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="stat-content">
              <span className="stat-number">5K++</span>
              <span className="stat-label">Peserta Pelatihan</span>
            </div>
          </div>
          <div className="stat-item">
            <div className="stat-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M17 20H22V18C22 16.3431 20.6569 15 19 15C18.0444 15 17.1931 15.4468 16.6438 16.1429M17 20H7M17 20V18C17 17.3438 16.8736 16.717 16.6438 16.1429M7 20H2V18C2 16.3431 3.34315 15 5 15C5.95561 15 6.80686 15.4468 7.35625 16.1429M7 20V18C7 17.3438 7.12642 16.717 7.35625 16.1429M7.35625 16.1429C8.0935 14.301 9.89482 13 12 13C14.1052 13 15.9065 14.301 16.6438 16.1429M15 7C15 8.65685 13.6569 10 12 10C10.3431 10 9 8.65685 9 7C9 5.34315 10.3431 4 12 4C13.6569 4 15 5.34315 15 7ZM21 10C21 11.1046 20.1046 12 19 12C17.8954 12 17 11.1046 17 10C17 8.89543 17.8954 8 19 8C20.1046 8 21 8.89543 21 10ZM7 10C7 11.1046 6.10457 12 5 12C3.89543 12 3 11.1046 3 10C3 8.89543 3.89543 8 5 8C6.10457 8 7 8.89543 7 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="stat-content">
              <span className="stat-number">100++</span>
              <span className="stat-label">Mitra Kerja</span>
            </div>
          </div>
          <div className="stat-item">
            <div className="stat-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M9 12L11 14L15 10M20.6179 5.98434C20.4132 5.99472 20.2072 5.99997 20 5.99997C16.9265 5.99997 14.123 4.84453 11.9999 2.94434C9.87691 4.84446 7.07339 5.99997 4 5.99997C3.79277 5.99997 3.58678 5.99472 3.38213 5.98434C3.1327 6.94783 3 7.95842 3 9.00001C3 14.5915 6.82432 19.2898 12 20.622C17.1757 19.2898 21 14.5915 21 9.00001C21 7.95847 20.8673 6.94791 20.6179 5.98434Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="stat-content">
              <span className="stat-number">500++</span>
              <span className="stat-label">Tenaga Ahli</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
} 