import { json, LoaderFunctionArgs } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { createClient } from "@supabase/supabase-js";
import styles from "~/styles/pelatihan-detail.css";
import Navbar from "~/components/Navbar";
import Footer from "~/components/Footer";
import { useEffect, useRef } from "react";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

type CurriculumItem = {
  id: string;
  training_id: string;
  title: string;
  duration: string;
  order_number: number;
};

type Instructor = {
  id: string;
  name: string;
  title: string;
  bio: string;
  avatar: string;
};

type Training = {
  id: string;
  title: string;
  slug: string;
  description: string;
  duration: string;
  level: string;
  participants: number;
  language: string;
  instructor_id: string;
  image_url: string;
  category: string;
  created_at: string;
  instructor: Instructor;
  curriculum: CurriculumItem[];
};

export async function loader({ params }: LoaderFunctionArgs) {
  const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!);
  
  const { data: training, error } = await supabase
    .from('trainings')
    .select(`
      *,
      instructor:instructors(*),
      curriculum:curriculum_items(*)
    `)
    .eq('slug', params.slug)
    .single();

  if (error || !training) {
    throw new Response("Not Found", { status: 404 });
  }

  // Ambil detail kurikulum dari tabel curriculum_items
  const { data: curriculumItems, error: curriculumError } = await supabase
    .from('curriculum_items')
    .select('*')
    .eq('training_id', training.id)
    .order('order_number', { ascending: true });

  if (curriculumError) {
    console.error("Error fetching curriculum:", curriculumError);
  }

  // Ambil detail instruktur dari tabel instructors
  const { data: instructor, error: instructorError } = await supabase
    .from('instructors')
    .select('*')
    .eq('id', training.instructor_id)
    .single();

  if (instructorError) {
    console.error("Error fetching instructor:", instructorError);
  }

  // Update training object dengan data yang benar
  training.curriculum = curriculumItems || [];
  training.instructor = instructor || {};

  return json({ training });
}

export default function TrainingDetail() {
  const { training } = useLoaderData<typeof loader>();
  const overviewRef = useRef<HTMLInputElement>(null);
  
  // Set overview tab sebagai default yang aktif saat halaman dimuat
  useEffect(() => {
    if (overviewRef.current) {
      overviewRef.current.checked = true;
    }
  }, []);

  return (
    <>
      <Navbar />
      
      <main className="pelatihan-detail">
        <div className="training-hero">
          <div className="training-hero-content">
            <div className="training-breadcrumb">
              <Link to="/pelatihan">Pelatihan / Training / Detail Pelatihan</Link>
            </div>
            <h1 className="training-hero-title">{training.title}</h1>
          </div>
        </div>

        {/* Hidden radio inputs for tab control - moved outside training-detail */}
        <input type="radio" id="overview" name="tabs" className="tab-input" ref={overviewRef} defaultChecked />
        <input type="radio" id="curriculum" name="tabs" className="tab-input" />
        <input type="radio" id="instructor" name="tabs" className="tab-input" />

        <div className="container">
          <div className="training-detail">
            {/* Mobile-only sidebar for small screens */}
            {/* <div className="mobile-sidebar">
              <div className="mobile-category-badge">
                <span className="training-category" data-category={training.category}>{training.category || "Training"}</span>
              </div>
            </div> */}

            <div className="tabs-navigation mobile-friendly-tabs">
              <div className="mobile-tabs-indicator"></div>
              <label htmlFor="overview" className="tab-button">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M12 16v-4M12 8h.01"></path>
                </svg>
                <span className="tab-label">Overview</span>
              </label>
              <label htmlFor="curriculum" className="tab-button">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path>
                </svg>
                <span className="tab-label">Curriculum</span>
              </label>
              <label htmlFor="instructor" className="tab-button">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                <span className="tab-label">Instructor</span>
              </label>
            </div>

            <div className="training-content-layout">
              <div className="left-column">
                <div className="tab-content-container">
                  {/* Overview Tab */}
                  <div className="tab-content">
                    <div className="training-image">
                      <img src={training.image_url || "/images/public-speaking.png"} alt={training.title} />
                    </div>
                    <div className="overview-section">
                      <div className="about-section">
                        <h3>Overview</h3>
                        <p>{training.description || "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."}</p>
                      </div>
                      
                      {/* <div className="training-highlights">
                        <h3>What You'll Learn</h3>
                        <div className="highlights-grid">
                          <div className="highlight-item">
                            <div className="highlight-icon">
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10"></circle>
                                <polyline points="12 6 12 12 16 14"></polyline>
                              </svg>
                            </div>
                            <div className="highlight-content">
                              <h4>Real-World Skills</h4>
                              <p>Develop practical skills that are immediately applicable to your career</p>
                            </div>
                          </div>
                          
                          <div className="highlight-item">
                            <div className="highlight-icon">
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                                <path d="M2 17l10 5 10-5M2 12l10 5 10-5"></path>
                              </svg>
                            </div>
                            <div className="highlight-content">
                              <h4>Comprehensive Learning</h4>
                              <p>From fundamentals to advanced concepts, everything covered step by step</p>
                            </div>
                          </div>
                          
                          <div className="highlight-item">
                            <div className="highlight-icon">
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                <polyline points="22 4 12 14.01 9 11.01"></polyline>
                              </svg>
                            </div>
                            <div className="highlight-content">
                              <h4>Expert-Led Sessions</h4>
                              <p>Learn from industry professionals with years of practical experience</p>
                            </div>
                          </div>
                          
                          <div className="highlight-item">
                            <div className="highlight-icon">
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
                                <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
                                <line x1="6" y1="1" x2="6" y2="4"></line>
                                <line x1="10" y1="1" x2="10" y2="4"></line>
                                <line x1="14" y1="1" x2="14" y2="4"></line>
                              </svg>
                            </div>
                            <div className="highlight-content">
                              <h4>Certification Included</h4>
                              <p>Receive a professional certificate upon successful completion of the course</p>
                            </div>
                          </div>
                        </div>
                      </div> */}
                    </div>
                  </div>
                  
                  {/* Curriculum Tab */}
                  <div className="tab-content">
                    <div className="curriculum-section">
                      <h3>Course Curriculum</h3>
                      <div className="curriculum-content">
                        {training.curriculum && training.curriculum.length > 0 ? (
                          <div className="curriculum-items">
                            {training.curriculum.map((item: CurriculumItem, index: number) => (
                              <div key={item.id} className="curriculum-item">
                                <div className="curriculum-item-header">
                                  <div className="curriculum-item-number">{index + 1}</div>
                                  <div className="curriculum-item-info">
                                    <h4>{item.title}</h4>
                                    <div className="curriculum-item-meta">
                                      <span>{item.duration || "1 jam"}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="curriculum-empty">
                            <div className="empty-illustration">
                              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                                <path d="M2 17l10 5 10-5M2 12l10 5 10-5"></path>
                              </svg>
                            </div>
                            <p>Belum ada kurikulum tersedia untuk pelatihan ini.</p>
                            <p className="empty-subtitle">Silahkan hubungi kami untuk informasi lebih lanjut tentang materi pelatihan.</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Instructor Tab */}
                  <div className="tab-content">
                    <div className="instructor-section">
                      <div className="instructor-title-box">
                        <h2>Instructor</h2>
                      </div>
                      
                      <div className="instructor-content">
                        <div className="instructor-profile">
                          <img 
                            src={training.instructor?.avatar || "/images/avatar-default.jpg"} 
                            alt={training.instructor?.name || "Instructor"} 
                            className="instructor-avatar" 
                          />
                          <div className="instructor-name">
                            {training.instructor?.name || "Instruktur Ikram Academy"}
                          </div>
                          <div className="instructor-title">
                            {training.instructor?.title || "Expert Trainer"}
                          </div>
                        </div>
                        
                        <div className="instructor-about">
                          <h3>About {training.instructor?.name?.split(' ')[0] || "Instruktur"}</h3>
                          <p>{training.instructor?.bio || "Instruktur profesional dengan pengalaman bertahun-tahun di bidangnya. Memiliki keahlian mendalam dalam menyampaikan materi secara efektif dan membantu peserta mencapai potensi maksimal mereka."}</p>
                        </div>
                        
                        <div className="instructor-stats">
                          <div className="instructor-stat-item">
                            <div className="stat-number">10+</div>
                            <div className="stat-label">Years Experience</div>
                          </div>
                          <div className="instructor-stat-item">
                            <div className="stat-number">50+</div>
                            <div className="stat-label">Courses Taught</div>
                          </div>
                          <div className="instructor-stat-item">
                            <div className="stat-number">1000+</div>
                            <div className="stat-label">Students</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="right-column">
                <div className="sidebar-training-card">
                  <div className="sidebar-training-image">
                    <img src={training.image_url || "/images/public-speaking.png"} alt={training.title} />
                  </div>
                  
                  <div className="training-card-content">
                    <div className="training-card-header">
                      <h2 className="training-title">{training.title}</h2>
                      <span className="training-category" data-category={training.category}>{training.category || "Training"}</span>
                    </div>
                    
                    <div className="training-stats">
                      <div className="stat-row">
                        <div className="stat-label">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12 6 12 12 16 14"></polyline>
                          </svg>
                          Durasi Pelatihan
                        </div>
                        <div className="stat-value">{training.duration || "20 Jam"}</div>
                      </div>
                      <div className="stat-row">
                        <div className="stat-label">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                          </svg>
                          Level Pelatihan
                        </div>
                        <div className="stat-value">{training.level || "Pemula"}</div>
                      </div>
                      <div className="stat-row">
                        <div className="stat-label">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                            <circle cx="9" cy="7" r="4"></circle>
                            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                          </svg>
                          Jumlah Peserta
                        </div>
                        <div className="stat-value">{training.participants || "100 Peserta"}</div>
                      </div>
                      <div className="stat-row">
                        <div className="stat-label">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                          </svg>
                          Bahasa
                        </div>
                        <div className="stat-value">{training.language || "Indonesia"}</div>
                      </div>
                      <div className="stat-row">
                        <div className="stat-label">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                            <line x1="16" y1="2" x2="16" y2="6"></line>
                            <line x1="8" y1="2" x2="8" y2="6"></line>
                            <line x1="3" y1="10" x2="21" y2="10"></line>
                          </svg>
                          Sertifikat
                        </div>
                        <div className="stat-value">Sertifikat Ikram Academy</div>
                      </div>
                    </div>

                    {/* <div className="price-section">
                      <div className="original-price">Rp 2.500.000</div>
                      <div className="discount-price">Rp 1.800.000</div>
                      <div className="discount-badge">Save 28%</div>
                    </div> */}

                    <a href={`https://wa.me/6285183198360?text=Halo, saya ingin mengikuti pelatihan ${training.title}`} className="enroll-button">
                      Enroll Pelatihan Ini
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </a>
                    
                    {/* <div className="guarantee-note">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                      </svg>
                      <span>Garansi 100% uang kembali dalam 7 hari jika tidak puas</span>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
} 