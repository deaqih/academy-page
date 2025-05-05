import { json, type LoaderFunction, type MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Hero from "~/components/Hero";
import Services from "~/components/Services";
import Navbar from "~/components/Navbar";
import Footer from "~/components/Footer";
import { supabase } from "~/utils/supabase.server";

// Import types for Banner
export interface Banner {
  id: number;
  title: string;
  description: string;
  image: string;
  backgroundColor?: string;
  textColor?: string;
  imageBgColor?: string;
}

// Declare import types for services
export async function getArticles({ limit }: { limit: number }) {
  const { data } = await supabase
    .from('articles')
    .select('*')
    .order('publish_date', { ascending: false })
    .limit(limit);
  return data || [];
}

export async function getTrainingPrograms({ limit }: { limit: number }) {
  const { data, count } = await supabase
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
    .limit(limit);
  return { data: data || [], count: count || 0 };
}

export async function getPartners() {
  const { data } = await supabase
    .from('partners')
    .select('*')
    .order('order_number', { ascending: true })
    .eq('is_active', true);
  return data || [];
}

export const meta: MetaFunction = () => {
  return [
    { title: "Ikram Academy Indonesia" },
    { name: "description", content: "Ikram Academy Indonesia - Training, Consulting, and Assessment" },
  ];
};

interface LoaderData {
  articles: any[];
  trainings: any[];
  totalCount: number;
  currentBanner: number;
  banners: Banner[];
  partners: any[];
}

export const loader: LoaderFunction = async ({ request }) => {
  try {
    // Get current banner index from URL
    const url = new URL(request.url);
    const currentBanner = parseInt(url.searchParams.get("banner") || "0");

    // Fetch banners
    const { data: banners, error: bannersError } = await supabase
      .from('banner')
      .select('*')
      .order('order_number', { ascending: true });

    if (bannersError) {
      throw new Error('Error fetching banners');
    }

    const [articles, trainings, partners] = await Promise.all([
      getArticles({ limit: 3 }),
      getTrainingPrograms({ limit: 3 }),
      getPartners()
    ]);

    return json<LoaderData>({
      articles: articles || [],
      trainings: trainings?.data || [],
      totalCount: trainings?.count || 0,
      currentBanner,
      banners: banners || [],
      partners: partners || []
    });
  } catch (error) {
    console.error("Error in homepage loader:", error);
    return json<LoaderData>({
      articles: [],
      trainings: [],
      totalCount: 0,
      currentBanner: 0,
      banners: [],
      partners: []
    });
  }
};

export default function Index() {
  const { articles, trainings, totalCount, currentBanner, banners, partners } = useLoaderData<LoaderData>();
  
  return (
    <main>
      <Navbar />
      <Hero currentBanner={currentBanner} banners={banners} />
      <Services 
        articles={articles} 
        trainings={trainings} 
        totalCount={totalCount} 
        partners={partners} 
      />
      <Footer />
    </main>
  );
}
