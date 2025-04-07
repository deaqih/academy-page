import styles from "~/styles/sejarah.css";
import { links as navbarLinks } from "~/components/Navbar";
import Footer from "~/components/Footer";
import Navbar from "~/components/Navbar";

export const links = () => [
  { rel: "stylesheet", href: styles },
  ...navbarLinks()
];

export default function Sejarah() {
  return (
    <main className="sejarah">
      <Navbar />
      
      <section className="sejarah-hero">
        <div className="hero-header">
          <span className="subtitle">Sejarah Ikram</span>
          <h1>Sejarah Ikram Academy: Dari<br />Visi ke Transformasi</h1>
        </div>
      </section>

      <section className="timeline">
        <div className="container">
          <div className="timeline-items">
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-date">2023</div>
              <div className="timeline-content">
                <div className="timeline-image">
                  <img src="/images/followership.png" alt="Timeline 2023" />
                </div>
                <h3>Awal yang Kuat</h3>
                <p>IKRAM Academy Indonesia memulai perjalanan dengan mendapatkan klien pertama, Masyarakat Metrologi Indonesia (MMI), dan proyek bersama Kementerian Dalam Negeri ini menandai fondasi yang solid dalam membangun reputasi sebagai penyedia layanan yang dapat diandalkan.</p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-date">2024</div>
              <div className="timeline-content">
                <div className="timeline-image">
                  <img src="/images/followership.png" alt="Timeline 2024" />
                </div>
                <h3>Pertumbuhan dan Kepercayaan</h3>
                <p>IKRAM menunjukan pertumbuhan pesat dengan mendapatkan kepercayaan dari Persada untuk bekerja sama dengan Bank Indonesia. Selain itu, penambahan klien baru, Garudafood mencerminkan kepercayaan yang meningkat dari berbagai sektor.</p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-date">2025</div>
              <div className="timeline-content">
                <div className="timeline-image">
                  <img src="/images/followership.png" alt="Timeline 2025" />
                </div>
                <h3>Konsistensi dan Keberlanjutan</h3>
                <p>IKRAM tetap dipercaya oleh Garudafood untuk proyek Champion Trainee dan mendapatkan kepercayaan dari Bank Indonesia untuk proyek yang lebih besar. Ini menunjukan bahwa IKRAM terus berkembang dan memberikan solusi inovatif.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
} 