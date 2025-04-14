import styles from "~/styles/portofolio.css";
import { links as navbarLinks } from "~/components/Navbar";
import Footer from "~/components/Footer";
import Navbar from "~/components/Navbar";

export const links = () => [
  { rel: "stylesheet", href: styles },
  ...navbarLinks()
];

export default function Portofolio() {
  return (
    <main className="portofolio">
      <Navbar />
      
      <section className="hero-section">
        <div className="hero-content">
        <span className="subtitle">Klien & Mitra</span>
          <h1>Kemitraan Berkelanjutan –<br />Membangun hubungan strategis<br />untuk hasil maksimal</h1>
          <p>Klien - klien kami memiliki latar belakang yang beragam, mulai dari pemerintah, perusahaan swasta nasional, sekolah, hingga organisasi non-profit. Kesamaan diantara mereka di mana semua ingin membangun organisasi yang jauh lebih baik dari aspek apapun termasuk keahlian dan kemampuan para pegawainya.</p>
        </div>
      </section>

      <section className="partners-section">
        <div className="section-title">
          <h2>Mitra Kami</h2>
          <div className="red-line"></div>
        </div>
        <div className="partners-grid">
          <div className="partners-image">
            <img src="/images/partners/Mitra.png" alt="Semua Mitra Ikram Academy" />
          </div>
        </div>
      </section>

      <section className="agenda-section">
        <div className="section-title">
          <h2>Implementasi Agenda Ikram</h2>
          <div className="red-line"></div>
        </div>
        <div className="year-section">
          <h3>2025</h3>
          <div className="agenda-grid">
            <div className="agenda-item">
              <div className="agenda-image"></div>
              <div className="agenda-number">01</div>
              <h4>Lorem ipsum dolor</h4>
              <p>Penelitian Leadership dan Peningkatan Kualitas Mutu Pendidikan di Lingkungan Penyusunan Program ini bertujuan untuk meningkatkan kepemimpinan kepemimpinan dan kualitas layanan di perpustakaan.</p>
            </div>
            <div className="agenda-item">
              <div className="agenda-image"></div>
              <div className="agenda-number">02</div>
              <h4>Lorem ipsum dolor</h4>
              <p>Penelitian Development and Empowering Service Excellence Program Tahun 2024. Penelitian ini difokuskan untuk pengembangan dan pemberdayaan layanan prima bagi peserta.</p>
            </div>
            <div className="agenda-item">
              <div className="agenda-image"></div>
              <div className="agenda-number">03</div>
              <h4>Lorem ipsum dolor</h4>
              <p>Penelitian Leadership dan Peningkatan Kualitas Mutu Pendidikan di Lingkungan Penyusunan Program ini bertujuan untuk meningkatkan kepemimpinan.</p>
            </div>
            <div className="agenda-item">
              <div className="agenda-image"></div>
              <div className="agenda-number">04</div>
              <h4>Lorem ipsum dolor</h4>
              <p>Penelitian Development and Empowering Service Excellence Program Tahun 2024. Penelitian ini difokuskan untuk pengembangan dan pemberdayaan layanan prima.</p>
            </div>
          </div>
        </div>

        <div className="year-section">
          <h3>2024</h3>
          <div className="agenda-grid">
            <div className="agenda-item">
              <div className="agenda-image"></div>
              <div className="agenda-number">01</div>
              <h4>Lorem ipsum dolor</h4>
              <p>Penelitian Leadership dan Peningkatan Kualitas Mutu Pendidikan di Lingkungan Penyusunan Program ini bertujuan untuk meningkatkan kepemimpinan.</p>
            </div>
            <div className="agenda-item">
              <div className="agenda-image"></div>
              <div className="agenda-number">02</div>
              <h4>Lorem ipsum dolor</h4>
              <p>Penelitian Development and Empowering Service Excellence Program Tahun 2024. Penelitian ini difokuskan untuk pengembangan dan pemberdayaan layanan prima.</p>
            </div>
            <div className="agenda-item">
              <div className="agenda-image"></div>
              <div className="agenda-number">03</div>
              <h4>Lorem ipsum dolor</h4>
              <p>Penelitian Leadership dan Peningkatan Kualitas Mutu Pendidikan di Lingkungan Penyusunan Program ini bertujuan untuk meningkatkan kepemimpinan.</p>
            </div>
            <div className="agenda-item">
              <div className="agenda-image"></div>
              <div className="agenda-number">04</div>
              <h4>Lorem ipsum dolor</h4>
              <p>Penelitian Development and Empowering Service Excellence Program Tahun 2024. Penelitian ini difokuskan untuk pengembangan dan pemberdayaan layanan prima.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
} 