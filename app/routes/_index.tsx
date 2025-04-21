import type { MetaFunction } from "@remix-run/node";
import Navbar from "~/components/Navbar";
import Hero from "~/components/Hero";
import Services from "~/components/Services";
import Footer from "~/components/Footer";
import { links as navbarLinks } from "~/components/Navbar";
import { links as heroLinks } from "~/components/Hero";
import { json, redirect } from "@remix-run/node";
import type { LoaderFunction, ActionFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { supabase, type Article, type TrainingProgram } from "~/utils/supabase.server";

export const meta: MetaFunction = () => {
  return [
    { title: "Ikram Academy - Tingkatkan Keahlian, Wujudkan Impian" },
    { name: "description", content: "Pusat pengembangan sumber daya manusia yang menghasilkan tenaga kerja profesional dan berkualitas" },
  ];
};

export const links = () => [...navbarLinks(), ...heroLinks()];

export interface Banner {
  id: number;
  title: string;
  description: string;
  image: string;
}

export type LoaderData = {
  articles: Article[];
  trainings: TrainingProgram[];
  totalCount: number;
  currentBanner: number;
  banners: Banner[];
};

const BANNERS: Banner[] = [
  {
    id: 2,
    title: "Tingkatkan **Keahlian**, Wujudkan **Impian**!",
    description: "Ikram Academy hadir sebagai tempat pelatihan terbaik untuk membantumu meningkatkan keahlian dan mewujudkan impian. Dengan program pembelajaran yang terarah dan instruktur berpengalaman, kami siap mendampingi setiap langkahmu menuju masa depan yang lebih cerah.",
    image: "/images/hero-image2.png"
  },
  {
    id: 1,
    title: "Unggul dalam Akhlak, Produktif dalam ilmu pengetahuan dan teknologi",
    description: "",
    image: "/images/hero-image.png"
  }
];

export const loader: LoaderFunction = async ({ request }) => {
  // Get current banner index from URL
  const url = new URL(request.url);
  const currentBanner = parseInt(url.searchParams.get("banner") || "0");

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

  return json<LoaderData>({ 
    articles,
    trainings: trainings || [],
    totalCount: count || 0,
    currentBanner,
    banners: BANNERS
  });
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const action = formData.get("action");
  const currentBanner = parseInt(formData.get("currentBanner") as string);

  let nextBanner;
  if (action === "next") {
    nextBanner = (currentBanner + 1) % BANNERS.length;
  } else {
    nextBanner = (currentBanner - 1 + BANNERS.length) % BANNERS.length;
  }

  return redirect(`/?banner=${nextBanner}`);
};

export default function Index() {
  const { articles, trainings, totalCount, currentBanner, banners } = useLoaderData<LoaderData>();
  
  return (
    <main>
      <Navbar />
      <Hero currentBanner={currentBanner} banners={banners} />
      <Services articles={articles} trainings={trainings} totalCount={totalCount} />
      <Footer />
    </main>
  );
}
