import type { MetaFunction } from "@remix-run/node";
import Navbar from "~/components/Navbar";
import Hero from "~/components/Hero";
import Services from "~/components/Services";
import Footer from "~/components/Footer";
import { links as navbarLinks } from "~/components/Navbar";
import { links as heroLinks } from "~/components/Hero";
import { json } from "@remix-run/node";
import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { supabase, type Article, type TrainingProgram } from "~/utils/supabase.server";

export const meta: MetaFunction = () => {
  return [
    { title: "Ikram Academy - Tingkatkan Keahlian, Wujudkan Impian" },
    { name: "description", content: "Pusat pengembangan sumber daya manusia yang menghasilkan tenaga kerja profesional dan berkualitas" },
  ];
};

export const links = () => [...navbarLinks(), ...heroLinks()];

export const loader: LoaderFunction = async () => {
  // Fetch articles
  const { data: articles, error: articlesError } = await supabase
    .from('articles')
    .select('*')
    .order('publish_date', { ascending: false })
    .limit(3);

  if (articlesError) {
    throw new Error('Error fetching articles');
  }

  // Fetch training programs
  const { data: trainings, error: trainingsError, count } = await supabase
    .from('trainings')
    .select(`
      id,
      title,
      slug,
      description,
      duration,
      level,
      participants,
      language,
      image_url,
      category,
      created_at,
      instructor_id
    `, { count: 'exact' })
    .order('created_at', { ascending: false })
    .limit(3);

  if (trainingsError) {
    throw new Error('Error fetching training programs');
  }

  return json({ 
    articles,
    trainings: trainings || [],
    totalCount: count || 0
  });
};

export default function Index() {
  const { articles, trainings, totalCount } = useLoaderData<{ 
    articles: Article[],
    trainings: TrainingProgram[],
    totalCount: number
  }>();
  
  return (
    <main>
      <Navbar />
      <Hero />
      <Services articles={articles} trainings={trainings} totalCount={totalCount} />
      <Footer />
    </main>
  );
}
