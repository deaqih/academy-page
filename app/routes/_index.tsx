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
import { supabase, type Article } from "~/utils/supabase.server";

export const meta: MetaFunction = () => {
  return [
    { title: "Ikram Academy - Tingkatkan Keahlian, Wujudkan Impian" },
    { name: "description", content: "Pusat pengembangan sumber daya manusia yang menghasilkan tenaga kerja profesional dan berkualitas" },
  ];
};

export const links = () => [...navbarLinks(), ...heroLinks()];

export const loader: LoaderFunction = async () => {
  const { data: articles, error } = await supabase
    .from('articles')
    .select('*')
    .order('publish_date', { ascending: false })
    .limit(3);

  if (error) {
    throw new Error('Error fetching articles');
  }

  return json({ articles });
};

export default function Index() {
  const { articles } = useLoaderData<{ articles: Article[] }>();
  
  return (
    <main>
      <Navbar />
      <Hero />
      <Services articles={articles} />
      <Footer />
    </main>
  );
}
