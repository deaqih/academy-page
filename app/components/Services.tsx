import type { Article, TrainingProgram } from "~/utils/supabase.server";
import styles from "~/styles/services.css";
import { Link } from "@remix-run/react";

export const links = () => [{ rel: "stylesheet", href: styles }];

interface ServicesProps {
  articles: Article[];
  trainings: TrainingProgram[];
  totalCount: number;
}

export default function Services({ articles, trainings, totalCount }: ServicesProps) {
  return (
    <>
      <section className="services">
        <div className="container">
          <div className="services-header">
            <h2>
              Selalu <span>Siap Menjadi Solusi</span>
              <br />
              Kebutuhan Anda
            </h2>
          </div>

          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  {/* Training icon */}
                  <circle cx="24" cy="24" r="24" fill="#E6F3FF"/>
                  <path d="M32 19H16M32 19L28 15M32 19L28 23M16 29H32M16 29L20 25M16 29L20 33" stroke="#0056B3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Training</h3>
              <p>Pelatihan untuk meningkatkan keterampilan, pengetahuan, dan kompetensi individu atau tim dalam suatu organisasi.</p>
            </div>

            <div className="service-card">
              <div className="service-icon">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  {/* Consulting icon */}
                  <circle cx="24" cy="24" r="24" fill="#E6F3FF"/>
                  <path d="M24 32C28.4183 32 32 28.4183 32 24C32 19.5817 28.4183 16 24 16C19.5817 16 16 19.5817 16 24C16 28.4183 19.5817 32 24 32Z" stroke="#0056B3" strokeWidth="2"/>
                  <path d="M24 20V24L26 26" stroke="#0056B3" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <h3>Consulting</h3>
              <p>Layanan yang secara efektif membimbing individu dan organisasi dengan saran, strategi, dan solusi untuk meningkatkan kinerja secara signifikan.</p>
            </div>

            <div className="service-card">
              <div className="service-icon">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  {/* Assessment icon */}
                  <circle cx="24" cy="24" r="24" fill="#E6F3FF"/>
                  <path d="M32 20L22 30L16 24" stroke="#0056B3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Assessment</h3>
              <p>Proses evaluasi untuk mengukur kemampuan, kompetensi, atau efektivitas baik individu maupun organisasi.</p>
            </div>
          </div>

          <div className="programs">
            <div className="programs-header">
              <h2>Program Pelatihan Kami</h2>
              <Link to="/pelatihan" className="all-programs-btn">
                Semua Pelatihan
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M4.16669 8334M15.8334 10L10.8334 5M15.8334 10L10.8334 15" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </div>

            <div className="programs-grid">
              {trainings && trainings.length > 0 ? (
                trainings.map((training) => (
                  <Link 
                    key={training.id} 
                    to={`/pelatihans/${training.slug}`}
                    className="program-card"
                  >
                    <img src={training.image_url} alt={training.title} />
                    <div className="program-content">
                      <span className="program-tag">{training.category}</span>
                      <h3>{training.title}</h3>
                      <div className="program-details">
                        {/* <span className="program-level">{training.level}</span>
                        <span className="program-duration">{training.duration}</span>
                        <span className="program-language">{training.language}</span> */}
                      </div>
                      <p className="program-description">{training.description}</p>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="no-programs">Tidak ada program pelatihan tersedia</div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="services-highlight">
        <div className="container">
          <div className="highlight-content">
            <div className="highlight-text">
              <h2>Tentang Ikram</h2>
              <p>
                PT Insan Kreasi Semesta Mulia (IKRAM) merupakan perusahaan nasional yang 
                bergerak di bidang Pelatihan, Konsultasi, Assesment Program.
              </p>
              <p>
                Berfokus pada pengembangan akhlak, ilmu pengetahuan dan teknologi. 
                Kami hadir untuk membantu anda tumbuh dan berkembang dengan 
                beragam pelatihan pilihan yang dapat disesuaikan dengan kebutuhan 
                klien.
              </p>
              <button className="button primary-red">
                <span>Selengkapnya</span>
                <svg className="nav-arrow-right" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M4.16669 8334M15.8334 10L10.8334 5M15.8334 10L10.8334 15" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            <div className="highlight-image">
              <img src="/images/about.png" alt="Training Session at Ikram Academy" />
            </div>
          </div>
        </div>
      </section>

      <section className="expert-staff">
        <div className="container">
          <div className="expert-staff-header">
            <h2>Menyediakan Tenaga Ahli<br /><span>No. 1 dan Berintegritas</span></h2>
          </div>

          <div className="expert-staff-content">
            <h3>Tenaga Ahli</h3>
            
            <div className="expert-staff-grid">
              <div className="expert-staff-image">
                <img src="/images/ahli.png" alt="CEO Ikram Academy Indonesia" />
              </div>
              <div className="expert-staff-info">
                <h4>Menjadi Mitra Pilihan Terbaik Anda!</h4>
                <p>
                  ​Kami berkomitmen menjadi mitra terpercaya dalam mewujudkan 
                  pendidikan berkualitas yang menghasilkan individu unggul, berdaya 
                  saing, dan berdampak positif bagi masyarakat. Melalui pelatihan, 
                  konsultasi, dan asesmen inovatif yang mudah diakses, kami membangun 
                  ekosistem pendidikan yang mendorong daya juang, pemikiran kritis, 
                  serta inovasi. Program kami dirancang untuk membentuk karakter 
                  mulia, profesional, dan berintegritas, mempersiapkan individu 
                  kompeten yang siap bersaing di dunia industri.
                </p>
                <div className="expert-staff-signature">
                  <h5>CEO of Ikram Academy Indonesia</h5>
                  {/* <span>CEO of Ikram Academy Indonesia</span> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="articles">
        <div className="container">
          <div className="articles-header">
            <h2>Artikel</h2>
          </div>

          <div className="articles-grid">
            {articles.map((article) => (
              <Link
                key={article.id}
                to={`/artikels/${article.slug}`}
                className="article-card"
              >
                <img src={article.image_url} alt={article.title} />
                <div className="article-content">
                  <div className="article-author">
                    <div className="author-profile-icon">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                    </div>
                    <span>{article.author}</span>
                  </div>
                  <h3>{article.title}</h3>
                  <span className="article-date">
                    {new Date(article.publish_date).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="articles-footer">
            <Link to="/artikel" className="button outline-white">
              <span>Semua Artikel</span>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M4.16669 8334M15.8334 10L10.8334 5M15.8334 10L10.8334 15" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <section className="partners">
        <div className="container">
          <div className="partners-header">
            <h2>Mitra Kami</h2>
          </div>

          <div className="partners-grid">
            <div className="partner-logo">
              <img src="/images/partners/Mitra.png" alt="Mitra" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
} 