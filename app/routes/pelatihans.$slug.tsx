import { json, LoaderFunctionArgs } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { createClient } from "@supabase/supabase-js";
import styles from "~/styles/pelatihan-detail.css";
import Navbar from "~/components/Navbar";
import Footer from "~/components/Footer";
import { useState, useEffect } from "react";

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
  const [activeTab, setActiveTab] = useState("overview");
  const { training } = useLoaderData<typeof loader>();
  
  // Debugging dengan useEffect
  useEffect(() => {
    console.log("Current tab:", activeTab);
  }, [activeTab]);

  const handleTabChange = (tab: string) => {
    console.log(`Changing to tab: ${tab}`);
    setActiveTab(tab);
  };

  // Render konten tab berdasarkan activeTab
  const renderTabContent = () => {
    switch(activeTab) {
      case "overview":
        return (
          <div className="tab-content active">
            <div className="training-image">
              <img src={training.image_url || "/images/public-speaking.png"} alt={training.title} />
            </div>
            <div className="overview-section">
              <div className="about-section">
                <h3>About</h3>
                <p>{training.description}</p>
              </div>
            </div>
          </div>
        );
      case "curriculum":
        return (
          <div className="tab-content active">
            <div className="curriculum-section">
              <h3>Curriculum</h3>
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
                  <p>Belum ada kurikulum tersedia untuk pelatihan ini.</p>
                )}
              </div>
            </div>
          </div>
        );
      case "instructor":
        return (
          <div className="tab-content active">
            <div className="instructor-section">
              <div className="instructor-title-box">
                <h2>{training.title}</h2>
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
                    {training.instructor?.title || "Pengajar Profesional"}
                  </div>
                </div>
                
                <div className="instructor-about">
                  <h3>About</h3>
                  <p>{training.instructor?.bio || "Instruktur profesional dengan pengalaman bertahun-tahun di bidangnya."}</p>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return <div>No content available</div>;
    }
  };

  return (
    <>
      <Navbar />
      
      <main className="pelatihan-detail">
        <div className="training-hero">
          <div className="training-hero-content">
            <div className="training-breadcrumb">
              <Link to="/pelatihan">Pelatihan</Link>
              <span className="training-breadcrumb-separator">/</span>
              <span>{training.title}</span>
            </div>
            <h1 className="training-hero-title">{training.title}</h1>
          </div>
        </div>

        <div className="container">
          <div className="training-detail">
            <div className="tabs-navigation">
              <button 
                className={`tab-button ${activeTab === "overview" ? "active" : ""}`}
                onClick={() => handleTabChange("overview")}
              >
                Overview
              </button>
              <button 
                className={`tab-button ${activeTab === "curriculum" ? "active" : ""}`}
                onClick={() => handleTabChange("curriculum")}
              >
                Curriculum
              </button>
              <button 
                className={`tab-button ${activeTab === "instructor" ? "active" : ""}`}
                onClick={() => handleTabChange("instructor")}
              >
                Instructor
              </button>
            </div>

            <div className="training-content-layout">
              <div className="left-column">
                {/* Render content dengan fungsi */}
                {renderTabContent()}
              </div>

              <div className="right-column">
                <div className="sidebar-training-card">
                  <div className="sidebar-training-image">
                    <img src={training.image_url || "/images/public-speaking.png"} alt={training.title} />
                  </div>
                  
                  <div className="training-card-content">
                    <span className="training-category">{training.category || "Training"}</span>
                    <h2 className="training-title">{training.title}</h2>
                    
                    <div className="training-stats">
                      <div className="stat-row">
                        <div className="stat-label">Durasi Pelatihan</div>
                        <div className="stat-value">{training.duration || "20 Jam"}</div>
                      </div>
                      <div className="stat-row">
                        <div className="stat-label">Level Pelatihan</div>
                        <div className="stat-value">{training.level || "Pemula"}</div>
                      </div>
                      <div className="stat-row">
                        <div className="stat-label">Jumlah Peserta</div>
                        <div className="stat-value">{training.participants || "100 Peserta"}</div>
                      </div>
                      <div className="stat-row">
                        <div className="stat-label">Bahasa</div>
                        <div className="stat-value">{training.language || "Indonesia"}</div>
                      </div>
                      <div className="stat-row">
                        <div className="stat-label">Sertifikat</div>
                        <div className="stat-value">Sertifikat Ikram Academy</div>
                      </div>
                    </div>

                    <a href={`https://wa.me/6285183198360?text=Halo, saya ingin mengikuti pelatihan ${training.title}`} className="enroll-button">
                      Enroll Pelatihan Ini
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </a>
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