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
                <h3>Awal Perjalanan</h3>
                <p>Ikram Academy didirikan dengan visi menjadi lembaga pelatihan terkemuka yang fokus pada pengembangan SDM berkualitas melalui pendekatan inovatif dan teknologi modern.</p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-date">2024</div>
              <div className="timeline-content">
                <div className="timeline-image">
                  <img src="/images/followership.png" alt="Timeline 2024" />
                </div>
                <h3>Ekspansi Program</h3>
                <p>Mengembangkan berbagai program pelatihan baru dan menjalin kerjasama strategis dengan berbagai institusi pendidikan dan industri untuk memperluas jangkauan layanan.</p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-date">2025</div>
              <div className="timeline-content">
                <div className="timeline-image">
                  <img src="/images/followership.png" alt="Timeline 2025" />
                </div>
                <h3>Transformasi Digital</h3>
                <p>Melakukan transformasi digital menyeluruh dengan mengintegrasikan teknologi terkini dalam setiap program pelatihan untuk memberikan pengalaman belajar yang lebih efektif.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
} 