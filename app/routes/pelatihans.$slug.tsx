import { json, LoaderFunctionArgs } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { createClient } from "@supabase/supabase-js";
import styles from "~/styles/pelatihan-detail.css";
import Navbar from "~/components/Navbar";
import Footer from "~/components/Footer";
import { useState } from "react";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

type Training = {
  id: string;
  title: string;
  slug: string;
  description: string;
  duration: string;
  level: string;
  participants: number;
  language: string;
  instructor: {
    name: string;
    title: string;
    avatar: string;
  };
  curriculum: {
    title: string;
    duration: string;
  }[];
  image: string;
};

export async function loader({ params }: LoaderFunctionArgs) {
  const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!);
  
  const { data: training, error } = await supabase
    .from('trainings')
    .select(`
      *,
      instructor:instructors(*),
      curriculum:curriculum_items(
        id,
        title,
        duration,
        order_number
      )
    `)
    .eq('slug', params.slug)
    .single();

  if (error || !training) {
    throw new Response("Not Found", { status: 404 });
  }

  // Sort curriculum items by order_number
  training.curriculum.sort((a: any, b: any) => a.order_number - b.order_number);

  return json({ training });
}

export default function TrainingDetail() {
  const [activeTab, setActiveTab] = useState("overview");
  const { training } = useLoaderData<typeof loader>();

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="overview-section">
            <div className="about-section">
              <h2 className="section-title">About</h2>
              <p>{training.description}</p>
            </div>
          </div>
        );
      case "curriculum":
        return (
          <div className="curriculum-section">
            <h2 className="section-title">Curriculum</h2>
            {training.curriculum.map((item: { title: string; duration: string }, index: number) => (
              <div key={index} className="curriculum-item">
                <div className="curriculum-header">
                  <h3 className="curriculum-title">{item.title}</h3>
                  <span className="curriculum-meta">{item.duration}</span>
                </div>
              </div>
            ))}
          </div>
        );
      case "instructor":
        return (
          <div className="instructor-section">
            <h2 className="section-title">Instructor</h2>
            <div className="instructor-info">
              <img 
                src={training.instructor.avatar} 
                alt={training.instructor.name}
                className="instructor-avatar"
              />
              <div>
                <h3 className="instructor-name">{training.instructor.name}</h3>
                <p className="instructor-title">{training.instructor.title}</p>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="pelatihan-detail">
      <Navbar />
      
      <section className="training-hero">
        <div className="training-hero-content">
          <div className="training-breadcrumb">
            <Link to="/pelatihan">Pelatihan</Link>
            <span className="training-breadcrumb-separator">/</span>
            <Link to="/pelatihan">Training</Link>
            <span className="training-breadcrumb-separator">/</span>
            <span>Detail Pelatihan</span>
          </div>
          <h1 className="training-hero-title">{training.title}</h1>
        </div>
      </section>

      <div className="training-detail">
        <div className="tabs-navigation">
          <button 
            className={`tab-button ${activeTab === "overview" ? "active" : ""}`}
            onClick={() => setActiveTab("overview")}
          >
            Overview
          </button>
          <button 
            className={`tab-button ${activeTab === "curriculum" ? "active" : ""}`}
            onClick={() => setActiveTab("curriculum")}
          >
            Curriculum
          </button>
          <button 
            className={`tab-button ${activeTab === "instructor" ? "active" : ""}`}
            onClick={() => setActiveTab("instructor")}
          >
            Instructor
          </button>
        </div>

        <div className="training-content-layout">
          <div className="left-column">
            {activeTab === "instructor" && (
              <div className="instructor-section">
                <div className="tab-section-title">
                  <div className="tab-indicator"></div>
                  <h2>Public Speaking</h2>
                </div>
                
                <div className="instructor-content">
                  <div className="instructor-header">
                    <img src="/images/avatar-default.jpg" alt="Instructor" className="instructor-avatar" />
                    <div className="instructor-name">Instruktur Ikram Academy</div>
                  </div>
                  
                  <div className="instructor-bio">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "overview" && (
              <div className="about-section">
                <div className="tab-section-title">
                  <div className="tab-indicator"></div>
                  <h2>About</h2>
                </div>
                <div className="about-content">
                  <p>{training.description}</p>
                </div>
              </div>
            )}

            {activeTab === "curriculum" && (
              <div className="curriculum-section">
                <div className="tab-section-title">
                  <div className="tab-indicator"></div>
                  <h2>Curriculum</h2>
                </div>
                <div className="curriculum-content">
                  <p>Content for curriculum will appear here.</p>
                </div>
              </div>
            )}
          </div>

          <div className="right-column">
            <div className="training-image">
              <img src={training.image || "/images/public-speaking.png"} alt={training.title} />
            </div>
            
            <div className="training-category">Training</div>
            <h2 className="training-card-title">Public Speaking</h2>
            
            <div className="training-meta">
              <div className="meta-item">
                <span className="meta-label">Durasi Pelatihan</span>
                <span className="meta-value">20 Jam</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Level Pelatihan</span>
                <span className="meta-value">Pemula</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Jumlah Peserta</span>
                <span className="meta-value">100 Peserta</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Bahasa</span>
                <span className="meta-value">Indonesia</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Sertifikat</span>
                <span className="meta-value">Sertifikat Ikram Academy</span>
              </div>
            </div>

            <a href="#" className="enroll-button">
              Enroll Pelatihan Ini
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
} 