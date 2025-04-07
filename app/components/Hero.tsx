import styles from "~/styles/hero.css";
import { Link } from "@remix-run/react";

export const links = () => [{ rel: "stylesheet", href: styles }];

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-background">
      </div>
      <div className="container hero-container">
        <div className="hero-content">
          <h1>
            Tingkatkan Keahlian,
            <br />
            Wujudkan Impian!
          </h1>
          <p>
            Selamat datang di Ikram Academy, tempat terbaik
            untuk mengembangkan diri dan meningkatkan
            kompetensi di berbagai bidang.
          </p>
          <Link to="/tentang-ikram" className="btn btn-outline-light">
            <span>Tentang Ikram</span>
            <svg className="nav-arrow-right" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M4.16669 8334M15.8334 10L10.8334 5M15.8334 10L10.8334 15" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
        
        <div className="hero-image">
          <img src="/images/hero-image.png" alt="Ikram Academy Team"/>
        </div>
      </div>
      
      <div className="stats-section">
        <div className="container">
          <div className="stats-container">
            <div className="stat-item">
              <span className="stat-number">999</span>
              <span className="stat-label">Peserta Pelatihan</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">899</span>
              <span className="stat-label">Alumni Tersertifikasi</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">999</span>
              <span className="stat-label">Mitra Kerja</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">999</span>
              <span className="stat-label">Tenaga Ahli</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 