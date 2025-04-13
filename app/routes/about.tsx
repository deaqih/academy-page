import styles from "~/styles/about.css";
import { links as navbarLinks } from "~/components/Navbar";
import Footer from "~/components/Footer";
import Navbar from "~/components/Navbar";
import { useEffect } from "react";

export const links = () => [{ rel: "stylesheet", href: styles }];

export default function About() {
  useEffect(() => {
    const sections = ['nilai-ikram', 'tenaga-ahli', 'program'];
    const navLinks = document.querySelectorAll<HTMLAnchorElement>('.values-nav a');

    // Handle scroll
    const handleScroll = () => {
      sections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        const link = document.querySelector(`.values-nav a[href="#${sectionId}"]`);
        
        if (section && link) {
          const rect = section.getBoundingClientRect();
          const isInView = rect.top <= 150 && rect.bottom >= 150;
          
          if (isInView) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        }
      });
    };

    // Handle click
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const href = link.getAttribute('href');
        if (href) {
          const targetId = href.replace('#', '');
          const targetSection = document.getElementById(targetId);
          if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
          }
        }
      });
    });

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <main className="about">
      <Navbar />
      {/* Hero Section */}
      <section className="about-hero">
        <div className="hero-header">
          <span className="subtitle">Tentang Ikram</span>
          <h1>
            Dari Akhlak hingga Teknologi:
            <br />
            Pelatihan Terintegrasi untuk
            <br />
            Pertumbuhan Optimal
          </h1>
        </div>
      </section>
      
      <div className="about-content">
        <div className="container">
          <div className="content-wrapper">
            <div className="content-text">
              <h2>Tentang Ikram</h2>
              <p>
                PT Insan Kreasi Semesta Mulia (IKRAM) merupakan perusahaan nasional yang bergerak di bidang Pelatihan, Konsultasi, Assessment Program.
              </p>
              <p>
                Berfokus pada pengembangan akhlak, ilmu pengetahuan dan teknologi. Kami hadir untuk membantu anda tumbuh dan berkembang dengan beragam pelatihan pilihan yang dapat disesuaikan dengan kebutuhan klien.
              </p>
            </div>
            <div className="content-image">
              <img src="/images/followership.png" alt="About Ikram" />
            </div>
          </div>
        </div>
      </div>

      <div className="values-nav">
        <nav>
          <ul>
            <li><a href="#nilai-ikram">Nilai Ikram</a></li>
            <li><a href="#tenaga-ahli">Tenaga Ahli</a></li>
            <li><a href="#program">Program</a></li>
          </ul>
        </nav>
      </div>

      {/* Values Section */}
      <section className="values" id="nilai-ikram">
        <div className="container">
          <div className="values-header">
            <h2>Nilai Ikram</h2>
            <div className="title-underline"></div>
            <h3>
              Membangun Generasi Unggul
              <br />
              Melalui Pendidikan Berkualitas
              <br />
              dan Inovatif
            </h3>
          </div>

          <div className="values-content">
            <div className="visi-section">
              <h4>Visi Ikram</h4>
              <div className="visi-card">
                <div className="card-icon">
                  <img 
                    src="/images/icon/visi.png" 
                    alt="Check Circle Icon" 
                    width="64" 
                    height="64"
                    style={{
                      borderRadius: '50%',
                      objectFit: 'cover'
                    }}
                  />
                </div>
                  <h5>Kualitas unggul dan berdaya saing</h5>
                  <p>Mewujudkan pendidikan yang berkualitas guna mencetak generasi mulia, unggul, berdaya saing dan berdampak bagi masyarakat</p>
              </div>
            </div>

            <div className="misi-section">
              <h4>Misi Ikram</h4>
              <div className="misi-grid">
                <div className="misi-card">
                  <div className="card-icon">
                    <img 
                      src="/images/icon/misi-1.png" 
                      alt="Check Circle Icon" 
                      width="64" 
                      height="64"
                      style={{
                        borderRadius: '50%',
                        objectFit: 'cover'
                      }}
                    />
                  </div>
                  <h5>Menyediakan Pelatihan Inovatif</h5>
                  <p>Menyelenggarakan pelatihan pendidikan, konsultasi, dan asesmen yang inovatif, mudah diakses, dan inspiratif</p>
                </div>

                <div className="misi-card">
                  <div className="card-icon">
                    <img 
                      src="/images/icon/misi-2.png" 
                      alt="Check Circle Icon" 
                      width="64" 
                      height="64"
                      style={{
                        borderRadius: '50%',
                        objectFit: 'cover'
                      }}
                    />
                  </div>
                  <h5>Mencetak Individu Produktif</h5>
                  <p>Membantu mencetak individu yang produktif, kompeten, dan siap bersaing di dunia industri</p>
                </div>

                <div className="misi-card">
                  <div className="card-icon">
                    <img 
                      src="/images/icon/misi-3.png" 
                      alt="Check Circle Icon" 
                      width="64" 
                      height="64"
                      style={{
                        borderRadius: '50%',
                        objectFit: 'cover'
                      }}
                    />
                  </div>
                  <h5>Daya Juang dan Pemikiran Kritis</h5>
                  <p>Membangun ekosistem pendidikan yang mendorong daya juang, pemikiran kritis, serta inovasi</p>
                </div>
                <div className="misi-card">
                  <div className="card-icon">
                    <img 
                      src="/images/icon/misi-4.png" 
                      alt="Check Circle Icon" 
                      width="64" 
                      height="64"
                      style={{
                        borderRadius: '50%',
                        objectFit: 'cover'
                      }}
                    />
                  </div>
                  <h5>Karakter Profesional dan Berintegritas</h5>
                  <p>Mengembangkan program yang membentuk karakter mulia, unggul, profesional, dan berintegritas</p>
                </div>

                <div className="misi-card">
                  <div className="card-icon">
                    <img 
                      src="/images/icon/misi-5.png" 
                      alt="Check Circle Icon" 
                      width="64" 
                      height="64"
                      style={{
                        borderRadius: '50%',
                        objectFit: 'cover'
                      }}
                    />
                  </div>
                  <h5>Kolaborasi Pendidikan yang Solutif</h5>
                  <p>Berkolaborasi untuk menciptakan solusi pendidikan yang berdampak luas</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="quote">
        <div className="container">
          <blockquote>
            <p>"The future belongs to those who learn more skills and combine them in creative ways."</p>
            <cite>(Robert Greene, 2012)</cite>
          </blockquote>
        </div>
      </section>

      {/* Expert Section */}
      <section className="expert" id="tenaga-ahli">
        <div className="container">
          <h2>Tenaga Ahli</h2>
          <div className="expert-content">
            <div className="expert-image">
              <img src="/images/followership.png" alt="CEO Ikram Academy" />
            </div>
            <div className="expert-text">
              <h3>Menjadi Mitra Pilihan Terbaik Anda!</h3>
              <p>
                Ikram Academy Indonesia di tahun 2025 bermimpi menjadi mitra terpercaya dan terbaik di Regional. Untuk itu, kami mendorong seluruh Tenaga Ahli kami—termasuk coach, trainer, konsultan, asesor, dan dosen—untuk terus meningkatkan kompetensi mereka melalui pendidikan berjenjang serta sertifikasi keahlian berskala nasional maupun internasional.
              </p>
              <div className="expert-signature">
                <h4>Muhammad Roby Ashari</h4>
                <span>CEO of Ikram Academy Indonesia</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="programs" id="program">
        <div className="container">
          <h2>Program Ikram</h2>
          <h3>Lorem Ipsum dolor sit amet</h3>

          <div className="programs-grid">
            <div className="program-card">
              <div className="program-image">
                <img src="/images/public-speaking.png" alt="Program 1" />
              </div>
              <div className="program-content">
                <span className="program-number">01</span>
                <h4>Lorem Ipsum dolor</h4>
                <p>Pelatihan Leadership dan Peningkatan Kualitas Mutu Pendidikan di Lingkungan Perpustakaan: Program ini bertujuan untuk meningkatkan keterampilan kepemimpinan dan kualitas layanan di perpustakaan.</p>
              </div>
            </div>

            <div className="program-card">
              <div className="program-image">
                <img src="/images/leadership.png" alt="Program 2" />
              </div>
              <div className="program-content">
                <span className="program-number">02</span>
                <h4>Lorem Ipsum dolor</h4>
                <p>Pelatihan Refreshment and Empowering Service Excellence Program Tahun 2024: Pelatihan ini difokuskan pada penyegaran dan pemberdayaan layanan prima bagi peserta.</p>
              </div>
            </div>

            <div className="program-card">
              <div className="program-image">
                <img src="/images/leadership.png" alt="Program 3" />
              </div>
              <div className="program-content">
                <span className="program-number">03</span>
                <h4>Lorem Ipsum dolor</h4>
                <p>Tes Psikologi untuk Siswa: Bekerja sama dengan SMKN 33 Jakarta, Ikram Academy Indonesia menyelenggarakan tes psikologi untuk siswa pada 14 Maret 2024, guna membantu siswa memahami potensi diri mereka.</p>
              </div>
            </div>

            <div className="program-card">
              <div className="program-image">
                <img src="/images/leadership.png" alt="Program 4" />
              </div>
              <div className="program-content">
                <span className="program-number">04</span>
                <h4>Lorem Ipsum dolor</h4>
                <p>Talkshow Beasiswa dan Pendidikan Berbasis Teknologi: Bersama Yayasan Al-Jihad, Ikram Academy Indonesia mengadakan talkshow yang membahas peluang beasiswa dan penerapan teknologi dalam pendidikan pada Februari 2025.</p>
              </div>
            </div>
          </div>

          <p className="programs-note">
            Dengan berbagai program dan kegiatan tersebut, Ikram Academy Indonesia berkomitmen untuk membantu individu dan organisasi dalam mengembangkan keterampilan serta pengetahuan yang diperlukan untuk mencapai keunggulan dalam berbagai bidang.
          </p>
        </div>
      </section>
      <Footer />
    </main>
  );
} 