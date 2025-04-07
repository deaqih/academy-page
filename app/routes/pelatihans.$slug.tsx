import { json, LoaderFunctionArgs } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { createClient } from "@supabase/supabase-js";
import styles from "~/styles/pelatihan-detail.css";
import Navbar from "~/components/Navbar";
import Footer from "~/components/Footer";

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
  const { training } = useLoaderData<typeof loader>();

  return (
    <div className="pelatihan-detail">
      <Navbar />
      
      <div className="breadcrumb">
        <div className="breadcrumb-container">
          <ul className="breadcrumb-list">
            <li className="breadcrumb-item">
              <Link to="/pelatihan">Pelatihan</Link>
              <span className="breadcrumb-separator">/</span>
            </li>
            <li className="breadcrumb-item">
              <Link to="/pelatihan">Training</Link>
              <span className="breadcrumb-separator">/</span>
            </li>
            <li className="breadcrumb-item">Detail Pelatihan</li>
          </ul>
        </div>
      </div>

      <div className="training-detail">
        <div className="training-header">
          <h1 className="training-title">{training.title}</h1>
          
          <div className="detail-tabs">
            <div className="tab-item active">Overview</div>
            <div className="tab-item">Curriculum</div>
            <div className="tab-item">Instructor</div>
          </div>
        </div>

        <div className="training-content">
          <div className="main-content">
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

            <div className="about-section">
              <h2 className="section-title">About</h2>
              <p>{training.description}</p>
            </div>

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
          </div>

          <div className="training-info">
            <div className="training-meta">
              <div className="meta-item">
                <span className="meta-label">Durasi Pelatihan</span>
                <span className="meta-value">{training.duration}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Level Peserta</span>
                <span className="meta-value">{training.level}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Jumlah Peserta</span>
                <span className="meta-value">{training.participants} Peserta</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Bahasa</span>
                <span className="meta-value">{training.language}</span>
              </div>
            </div>

            <button className="enroll-button">
              Enroll Pelatihan ini
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
} 