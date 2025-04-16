import styles from "~/styles/about.css";
import { links as navbarLinks } from "~/components/Navbar";
import Footer from "~/components/Footer";
import Navbar from "~/components/Navbar";
import { useEffect } from "react";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getTrainingPrograms4 } from "~/utils/supabase.server";
import type { TrainingProgram } from "~/utils/supabase.server";

export const links = () => [{ rel: "stylesheet", href: styles }];

const truncateText = (text: string, maxLength: number = 120) => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
};

export async function loader({ request }: LoaderFunctionArgs) {
  const { programs: trainings } = await getTrainingPrograms4();
  return json({ trainings });
}

type LoaderData = {
  trainings: TrainingProgram[];
};

export default function About() {
  const { trainings } = useLoaderData<typeof loader>() as LoaderData;

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
              <img src="/images/about.png" alt="About Ikram" />
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
            <li><a href="#sejarah">Sejarah</a></li>
            <li><a href="#mitra">Klien & Mitra</a></li>
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
          <div className="title-underline"></div>
          <div className="expert-content">
            <div className="expert-image">
              <img src="/images/followership.png" alt="CEO Ikram Academy" />
            </div>
            <div className="expert-text">
              <h3>Menjadi Mitra Pilihan Terbaik Anda!</h3>
              <p>
                ​Kami berkomitmen menjadi mitra terpercaya dalam mewujudkan pendidikan berkualitas yang menghasilkan individu unggul, berdaya saing, dan berdampak positif bagi masyarakat. Melalui pelatihan, konsultasi, dan asesmen inovatif yang mudah diakses, kami membangun ekosistem pendidikan yang mendorong daya juang, pemikiran kritis, serta inovasi. Program kami dirancang untuk membentuk karakter mulia, profesional, dan berintegritas, mempersiapkan individu kompeten yang siap bersaing di dunia industri.
              </p>
              <div className="expert-signature">
                <h4>CEO of Ikram Academy Indonesia</h4>
                {/* <span>CEO of Ikram Academy Indonesia</span> */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="programs" id="program">
        <div className="container">
          <h2>Program Ikram</h2>
          <div className="title-underline"></div>
          <h3>Program Pelatihan Terbaik untuk Pengembangan Diri</h3>

          <div className="programs-grid">
            {trainings && trainings.slice(0, 4).map((training: TrainingProgram, index: number) => (
              <div key={training.id} className="program-card">
                <div className="program-image">
                  <img src={training.image_url} alt={training.title} />
                </div>
                <div className="program-content">
                  <span className="program-number">{String(index + 1).padStart(2, '0')}</span>
                  <h4>{training.title}</h4>
                  <p>{truncateText(training.description, 120)}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="programs-note">
            Dengan berbagai program dan kegiatan tersebut, Ikram Academy Indonesia berkomitmen untuk membantu individu dan organisasi dalam mengembangkan keterampilan serta pengetahuan yang diperlukan untuk mencapai keunggulan dalam berbagai bidang.
          </p>
        </div>
      </section>

      {/* History Section */}
      <section className="history" id="sejarah">
        <div className="container">
          <div className="history-header">
            <h2>Sejarah Ikram</h2>
            <div className="title-underline"></div>
            <h3>Ikram Academy lahir dari komitmen untuk memberdayakan individu dan organisasi melalui pendidikan berkualitas. Berawal dari kebutuhan akan pelatihan yang relevan dan terstruktur, kami berkembang menjadi pusat pembelajaran yang menghubungkan tenaga ahli dengan para profesional, pebisnis, dan komunitas pembelajar.</h3>
          </div>

          <div className="timeline">
            <div className="timeline-items">
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-date">2023</div>
                <div className="timeline-content">
                  <div className="timeline-image">
                    <img src="/images/2023_WM.png" alt="Timeline 2023" />
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
                    <img src="/images/2024_WM.png" alt="Timeline 2024" />
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
                    <img src="/images/2025_WM.png" alt="Timeline 2025" />
                  </div>
                  <h3>Konsistensi dan Keberlanjutan</h3>
                  <p>IKRAM tetap dipercaya oleh Garudafood untuk proyek Champion Trainee dan mendapatkan kepercayaan dari Bank Indonesia untuk proyek yang lebih besar. Ini menunjukan bahwa IKRAM terus berkembang dan memberikan solusi inovatif.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="portfolio" id="mitra">
        <div className="container">
          <div className="portfolio-header">
            <span className="subtitle">Klien & Mitra</span>
            <h2>Kemitraan Berkelanjutan – Membangun hubungan strategis untuk hasil maksimal</h2>
            <p>Klien kami berasal dari beragam sektor—pemerintah, swasta, sekolah, hingga organisasi non-profit—dengan satu tujuan yang sama: membangun organisasi yang lebih unggul melalui peningkatan kompetensi SDM.</p>
          </div>

          <div className="partners-section">
            <div className="section-title">
              <h3>Mitra Kami</h3>
              <div className="red-line"></div>
            </div>
            <div className="partners-grid">
              <div className="partners-image">
                <img src="/images/partners/Mitra.png" alt="Semua Mitra Ikram Academy" />
              </div>
            </div>
          </div>

          <div className="agenda-section">
            <div className="section-title">
              <h3>Implementasi Agenda Ikram</h3>
              <div className="red-line"></div>
            </div>

            <div className="year-section">
              <h4>2025</h4>
              <div className="agenda-grid">
                <div className="agenda-item">
                  <div className="agenda-image"></div>
                  <div className="agenda-number">01</div>
                  <h5>Lorem ipsum dolor</h5>
                  <p>Penelitian Leadership dan Peningkatan Kualitas Mutu Pendidikan di Lingkungan Penyusunan Program ini bertujuan untuk meningkatkan kepemimpinan kepemimpinan dan kualitas layanan di perpustakaan.</p>
                </div>
                <div className="agenda-item">
                  <div className="agenda-image"></div>
                  <div className="agenda-number">02</div>
                  <h5>Lorem ipsum dolor</h5>
                  <p>Penelitian Development and Empowering Service Excellence Program Tahun 2024. Penelitian ini difokuskan untuk pengembangan dan pemberdayaan layanan prima bagi peserta.</p>
                </div>
                <div className="agenda-item">
                  <div className="agenda-image"></div>
                  <div className="agenda-number">03</div>
                  <h5>Lorem ipsum dolor</h5>
                  <p>Penelitian Leadership dan Peningkatan Kualitas Mutu Pendidikan di Lingkungan Penyusunan Program ini bertujuan untuk meningkatkan kepemimpinan.</p>
                </div>
                <div className="agenda-item">
                  <div className="agenda-image"></div>
                  <div className="agenda-number">04</div>
                  <h5>Lorem ipsum dolor</h5>
                  <p>Penelitian Development and Empowering Service Excellence Program Tahun 2024. Penelitian ini difokuskan untuk pengembangan dan pemberdayaan layanan prima.</p>
                </div>
              </div>
            </div>

            <div className="year-section">
              <h4>2024</h4>
              <div className="agenda-grid">
                <div className="agenda-item">
                  <div className="agenda-image"></div>
                  <div className="agenda-number">01</div>
                  <h5>Lorem ipsum dolor</h5>
                  <p>Penelitian Leadership dan Peningkatan Kualitas Mutu Pendidikan di Lingkungan Penyusunan Program ini bertujuan untuk meningkatkan kepemimpinan.</p>
                </div>
                <div className="agenda-item">
                  <div className="agenda-image"></div>
                  <div className="agenda-number">02</div>
                  <h5>Lorem ipsum dolor</h5>
                  <p>Penelitian Development and Empowering Service Excellence Program Tahun 2024. Penelitian ini difokuskan untuk pengembangan dan pemberdayaan layanan prima.</p>
                </div>
                <div className="agenda-item">
                  <div className="agenda-image"></div>
                  <div className="agenda-number">03</div>
                  <h5>Lorem ipsum dolor</h5>
                  <p>Penelitian Leadership dan Peningkatan Kualitas Mutu Pendidikan di Lingkungan Penyusunan Program ini bertujuan untuk meningkatkan kepemimpinan.</p>
                </div>
                <div className="agenda-item">
                  <div className="agenda-image"></div>
                  <div className="agenda-number">04</div>
                  <h5>Lorem ipsum dolor</h5>
                  <p>Penelitian Development and Empowering Service Excellence Program Tahun 2024. Penelitian ini difokuskan untuk pengembangan dan pemberdayaan layanan prima.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
} 