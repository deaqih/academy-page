import styles from "~/styles/about.css";
// import { links as navbarLinks } from "~/components/Navbar";
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
    const sections = ['nilai-ikram', 'tenaga-ahli', 'program', 'sejarah', 'mitra'];
    const navLinks = document.querySelectorAll<HTMLAnchorElement>('.values-nav a');
    const sliderItems = document.querySelectorAll<HTMLAnchorElement>('.slider-item');

    // Handle scroll
    const handleScroll = () => {
      sections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        const desktopLink = document.querySelector(`.values-nav a[href="#${sectionId}"]`);
        const mobileLink = document.querySelector(`.slider-item[href="#${sectionId}"]`);

        if (section) {
          const rect = section.getBoundingClientRect();
          const isInView = rect.top <= 150 && rect.bottom >= 150;

          if (isInView) {
            desktopLink?.classList.add('active');
            mobileLink?.classList.add('active');

            // Scroll into view for mobile slider
            if (mobileLink && window.innerWidth <= 768) {
              const sliderContainer = document.querySelector('.mobile-nav-slider');
              if (sliderContainer) {
                sliderContainer.scrollLeft = (mobileLink as HTMLElement).offsetLeft - sliderContainer.clientWidth / 2 + (mobileLink as HTMLElement).clientWidth / 2;
              }
            }
          } else {
            desktopLink?.classList.remove('active');
            mobileLink?.classList.remove('active');
          }
        }
      });
    };

    // Handle click
    const handleLinkClick = (e: MouseEvent, links: NodeListOf<HTMLAnchorElement>) => {
      e.preventDefault();
      const target = e.currentTarget as HTMLAnchorElement;
      const href = target.getAttribute('href');
      if (href) {
        const targetId = href.replace('#', '');
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
          targetSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    navLinks.forEach(link => {
      link.addEventListener('click', (e) => handleLinkClick(e, navLinks));
    });

    sliderItems.forEach(item => {
      item.addEventListener('click', (e) => handleLinkClick(e, sliderItems));
    });

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll);

      navLinks.forEach(link => {
        link.removeEventListener('click', (e) => handleLinkClick(e, navLinks));
      });

      sliderItems.forEach(item => {
        item.removeEventListener('click', (e) => handleLinkClick(e, sliderItems));
      });
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

      <div className="values-nav desktop-nav">
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

      {/* Mobile Slider Navigation */}
      <div className="mobile-nav-slider">
        <div className="slider-container">
          <div className="slider-track">
            <a href="#nilai-ikram" className="slider-item">Nilai Ikram</a>
            <a href="#tenaga-ahli" className="slider-item">Tenaga Ahli</a>
            <a href="#program" className="slider-item">Program</a>
            <a href="#sejarah" className="slider-item">Sejarah</a>
            <a href="#mitra" className="slider-item">Klien & Mitra</a>
          </div>
        </div>
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
              </div>

              <div className="misi-grid misi-grid-centered">
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
              <img src="/images/ceo-ikram.jpg" alt="CEO Ikram Academy" />
            </div>
            <div className="expert-text">
              <h3>Profesional Bersertifikasi, Solusi Pelatihan Terpercaya</h3>
              <p>
                Didukung oleh tenaga ahli bersertifikasi dan berpengalaman, kami hadir untuk memberikan pelatihan berkualitas tinggi yang relevan dengan kebutuhan dunia industri dan profesional masa kini. Setiap program dirancang secara komprehensif, memadukan teori dan praktik untuk menghasilkan peserta yang siap bersaing dan unggul di bidangnya.
                <br /> <br />
                Dengan pendekatan yang interaktif, materi yang terstruktur, serta komitmen pada hasil nyata, kami menjadi pilihan tepat bagi individu maupun institusi yang mencari mitra pengembangan SDM yang handal, terpercaya, dan visioner.
              </p>
              <div className="expert-signature">
                <h4>Ikram Academy Indonesia</h4>
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
                  <div className="agenda-image" style={{ backgroundImage: "url('/images/agenda2025-01.jpg')" }}></div>
                  <div className="agenda-number">01</div>
                  <h5>Pelatihan Service Excellence Refreshment & Empowering Bank Indonesia</h5>
                  <p>Pelatihan Service Excellence Refreshment and Empowering yang diselenggarakan oleh Bank Indonesia pada semester 1 tahun 2025 bertujuan memperbarui pengetahuan dan meningkatkan keterampilan pegawai dalam memberikan pelayanan terbaik di wilayah Kalimantan, Balinusa, dan Sulampua.</p>
                </div>
                <div className="agenda-item">
                  <div className="agenda-image" style={{ backgroundImage: "url('/images/agenda2025-02.jpg')" }}></div>
                  <div className="agenda-number">02</div>
                  <h5>Champion Trainee Goes To Actions 2025</h5>
                  <p>Champion Trainee Goes to Actions 2025 adalah program pengembangan profesional yang mengubah trainee menjadi pemimpin perubahan. Program ini memberikan pengalaman langsung untuk menerapkan pengetahuan dan keterampilan dalam proyek nyata.</p>
                </div>
              </div>
            </div>

            <div className="year-section">
              <h4>2024</h4>
              <div className="agenda-grid">
                <div className="agenda-item">
                  <div className="agenda-image" style={{ backgroundImage: "url('/images/agenda2024-01.jpg')" }}></div>
                  <div className="agenda-number">01</div>
                  <h5>Pelatihan Service Excellent Bank Indonesia Wilayah Timur Tahun 2024</h5>
                  <p>Pelatihan ini bertujuan untuk meningkatkan kualitas layanan dengan membangun keterampilan komunikasi, empati, dan profesionalisme dalam melayani pelanggan di Bank Indonesia Wilayah Timur. Mencakup 19 Titik Kantor Perwakilan Wilayah Bank Indonesia Wilayah Timur.</p>
                </div>
                <div className="agenda-item">
                  <div className="agenda-image" style={{ backgroundImage: "url('/images/agenda2024-02.jpg')" }}></div>
                  <div className="agenda-number">02</div>
                  <h5>Champion Trainee and Champion Pool 2024 Goes to Actions</h5>
                  <p>Program ini dirancang untuk membentuk individu unggul dengan keterampilan, mindset, dan kesiapan untuk menghadapi tantangan nyata di dunia profesional. Dilaksanakan bersama Garudafood pada 3-4 Februari 2024.</p>
                </div>
                <div className="agenda-item">
                  <div className="agenda-image" style={{ backgroundImage: "url('/images/agenda2024-03.jpg')" }}></div>
                  <div className="agenda-number">03</div>
                  <h5>Berbuka Berbagi Bahagia Bersama</h5>
                  <p>Kegiatan ini merupakan momen spesial untuk berbagi kebahagiaan di bulan penuh berkah. Dilaksanakan bersama TUV Rheinland Indonesia pada 22 Maret 2024 untuk merayakan kebersamaan dan berbagi kebaikan.</p>
                </div>
                <div className="agenda-item">
                  <div className="agenda-image" style={{ backgroundImage: "url('/images/agenda2024-04.jpg')" }}></div>
                  <div className="agenda-number">04</div>
                  <h5>Graduation CT (Champion Trainee) 2024</h5>
                  <p>Graduation CT merupakan momen istimewa untuk merayakan keberhasilan para peserta yang telah menyelesaikan program Champion Trainee dengan dedikasi dan semangat luar biasa. Dilaksanakan bersama Garudafood pada 4 Mei 2024.</p>
                </div>
                <div className="agenda-item">
                  <div className="agenda-image" style={{ backgroundImage: "url('/images/agenda2024-05.jpg')" }}></div>
                  <div className="agenda-number">05</div>
                  <h5>Pelatihan Service Excellent Bank Indonesia Wilayah Pulau Jawa Tahun 2024</h5>
                  <p>Pelatihan ini bertujuan untuk meningkatkan kualitas layanan dengan membangun keterampilan komunikasi, empati, dan profesionalisme dalam melayani pelanggan di Bank Indonesia Wilayah Pulau Jawa. Mencakup 16 Titik Kantor Perwakilan Bank Indonesia di Jawa.</p>
                </div>
                <div className="agenda-item">
                  <div className="agenda-image" style={{ backgroundImage: "url('/images/agenda2024-06.jpg')" }}></div>
                  <div className="agenda-number">06</div>
                  <h5>Peningkatan Kinerja PTSP dan Percepatan Perizinan Berusaha</h5>
                  <p>Program pengembangan kapasitas bagi aparatur pemerintah daerah untuk mengoptimalkan pelayanan terpadu satu pintu serta mempercepat proses perizinan berusaha, guna mendukung iklim investasi yang lebih kondusif. Kerjasama dengan Kementerian Investasi/BKPM.</p>
                </div>
                <div className="agenda-item">
                  <div className="agenda-image" style={{ backgroundImage: "url('/images/agenda2024-07.jpg')" }}></div>
                  <div className="agenda-number">07</div>
                  <h5>Peningkatan Kapasitas Aparatur Pemerintah Desa 2024</h5>
                  <p>Program penguatan kompetensi aparatur desa dan pengurus kelembagaan desa guna meningkatkan tata kelola pemerintahan desa yang lebih efektif dan profesional di Provinsi Maluku. Kerjasama dengan Kementerian Dalam Negeri, berlangsung 21 Agustus - 24 September 2024.</p>
                </div>
                <div className="agenda-item">
                  <div className="agenda-image" style={{ backgroundImage: "url('/images/agenda2024-08.jpg')" }}></div>
                  <div className="agenda-number">08</div>
                  <h5>Training of Trainer (ToT) Pelatihan PKAD Berbasis LMS</h5>
                  <p>Program pelatihan bagi calon pelatih dalam pengelolaan keuangan desa dan perencanaan pembangunan desa menggunakan Learning Management System (LMS). Mencakup wilayah Jambi, Sumatera Selatan, Lampung, Bengkulu, dan Kepulauan Bangka Belitung.</p>
                </div>
                <div className="agenda-item">
                  <div className="agenda-image" style={{ backgroundImage: "url('/images/agenda2024-09.jpg')" }}></div>
                  <div className="agenda-number">09</div>
                  <h5>ISO 27001:2022</h5>
                  <p>Implementasi standar internasional untuk Sistem Manajemen Keamanan Informasi (ISMS) yang bertujuan melindungi informasi dari ancaman seperti kebocoran, akses tidak sah, dan serangan siber. Kerjasama dengan PT Angan Kreasi Semesta pada 16 September 2024.</p>
                </div>
                <div className="agenda-item">
                  <div className="agenda-image" style={{ backgroundImage: "url('/images/agenda2024-10.jpg')" }}></div>
                  <div className="agenda-number">10</div>
                  <h5>Personal Branding SMKN 47 Jakarta</h5>
                  <p>Pelatihan proses membangun dan memperkuat identitas diri agar dikenal sesuai dengan keahlian, nilai, dan karakter unik yang dimiliki. Dilaksanakan di SMKN 47 Jakarta pada 14-17 Mei 2024 untuk membekali siswa dengan keterampilan personal branding.</p>
                </div>
                <div className="agenda-item">
                  <div className="agenda-image" style={{ backgroundImage: "url('/images/agenda2024-11.jpg')" }}></div>
                  <div className="agenda-number">11</div>
                  <h5>Pelatihan Menjadi Konten Kreator Profesional</h5>
                  <p>Pelatihan ini dirancang untuk membekali peserta dengan keterampilan dalam menciptakan konten digital yang kreatif, menarik, dan berkualitas. Dilaksanakan di SMKN 25 Jakarta pada 14 Juni 2024.</p>
                </div>
              </div>
            </div>

            <div className="year-section">
              <h4>2023</h4>
              <div className="agenda-grid">
                <div className="agenda-item">
                  <div className="agenda-image" style={{ backgroundImage: "url('/images/mmi.jpg')" }}></div>
                  <div className="agenda-number">01</div>
                  <h5>Masyarakat Metrologi Indonesia Tahun 2023</h5>
                  <p>Rapat Umum Anggota (RUA) adalah forum tertinggi dalam suatu organisasi yang diselenggarakan secara berkala untuk membahas, mengevaluasi, serta menetapkan kebijakan strategis organisasi. RUA menjadi wadah bagi seluruh anggota untuk berpartisipasi dalam pengambilan keputusan.</p>
                </div>
                <div className="agenda-item">
                  <div className="agenda-image" style={{ backgroundImage: "url('/images/iso-9001.png')" }}></div>
                  <div className="agenda-number">02</div>
                  <h5>ISO 9001:2015</h5>
                  <p>ISO 9001:2015 adalah standar internasional untuk sistem manajemen mutu yang bertujuan memastikan suatu organisasi mampu menyediakan produk atau layanan yang memenuhi kebutuhan pelanggan serta peraturan yang berlaku.</p>
                </div>
                <div className="agenda-item">
                  <div className="agenda-image" style={{ backgroundImage: "url('/images/agenda2023-03.jpg')" }}></div>
                  <div className="agenda-number">03</div>
                  <h5>Peningkatan Kapasitas Aparatur Pemerintah Desa</h5>
                  <p>Peningkatan Kapasitas Aparatur Pemerintah Desa dan Pengurus Kelembagaan Desa 2023 di Provinsi Lampung adalah program penguatan kompetensi aparatur desa dan pengurus kelembagaan desa guna meningkatkan tata kelola pemerintahan desa yang lebih efektif.</p>
                </div>
                <div className="agenda-item">
                  <div className="agenda-image" style={{ backgroundImage: "url('/images/agenda2023-04.jpg')" }}></div>
                  <div className="agenda-number">04</div>
                  <h5>FGD dan Konsinyering Divisi Logistik PT Kereta Api Indonesia</h5>
                  <p>FGD dan Konsinyering Divisi Logistik 2023 PT Kereta Api Indonesia (Persero) adalah forum diskusi dan penyusunan strategi yang melibatkan para pemangku kepentingan untuk meningkatkan efektivitas operasional serta pengelolaan logistik perusahaan.</p>
                </div>
                <div className="agenda-item">
                  <div className="agenda-image" style={{ backgroundImage: "url('/images/agenda2023-05.jpg')" }}></div>
                  <div className="agenda-number">05</div>
                  <h5>Job Fair SMK 33 Jakarta</h5>
                  <p>Job Fair di sekolah adalah acara yang diselenggarakan untuk mempertemukan siswa dengan berbagai perusahaan dan lembaga penyedia lapangan kerja. Kegiatan ini bertujuan untuk memberikan wawasan kepada siswa mengenai dunia kerja, peluang karier, serta keterampilan yang dibutuhkan.</p>
                </div>
                <div className="agenda-item">
                  <div className="agenda-image" style={{ backgroundImage: "url('/images/agenda2023-06.jpg')" }}></div>
                  <div className="agenda-number">06</div>
                  <h5>Pelatihan Leadership dan Peningkatan Mutu Pendidikan</h5>
                  <p>Pelatihan leadership adalah program yang dirancang untuk mengembangkan keterampilan kepemimpinan seseorang agar mampu memimpin dengan efektif, mengambil keputusan yang tepat, serta menginspirasi dan memotivasi tim.</p>
                </div>
                <div className="agenda-item">
                  <div className="agenda-image" style={{ backgroundImage: "url('/images/agenda2023-07.jpg')" }}></div>
                  <div className="agenda-number">07</div>
                  <h5>IHT Kurikulum Merdeka</h5>
                  <p>In-House Training (IHT) Kurikulum Merdeka adalah program pelatihan yang diselenggarakan di tingkat satuan pendidikan untuk membekali pendidik dan tenaga kependidikan dengan pemahaman mendalam mengenai konsep, prinsip, serta penerapan Kurikulum Merdeka.</p>
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