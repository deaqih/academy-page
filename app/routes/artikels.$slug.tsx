import { json, LoaderFunctionArgs } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { supabase, type Article } from "~/utils/supabase.server";
import styles from "~/styles/artikel-detail.css";
import { links as navbarLinks } from "~/components/Navbar";
import Navbar from "~/components/Navbar";
import Footer from "~/components/Footer";

export const links = () => [
  { rel: "stylesheet", href: styles },
  ...navbarLinks()
];

export async function loader({ params }: LoaderFunctionArgs) {
  const { slug } = params;
  console.log("Loading article with slug:", slug);

  try {
    // Fetch main article
    const { data: article, error } = await supabase
      .from("articles")
      .select("*")
      .eq("slug", slug)
      .single();

    console.log("Article data:", article);
    console.log("Error:", error);

    if (error) throw error;
    if (!article) throw new Error("Article not found");

    // Fetch related articles (excluding current article)
    const { data: relatedArticles, error: relatedError } = await supabase
      .from("articles")
      .select("id, title, image_url, author, publish_date, slug")
      .neq("slug", slug)
      .limit(6);

    console.log("Related articles:", relatedArticles);
    console.log("Related error:", relatedError);

    if (relatedError) throw relatedError;

    return json({ article, relatedArticles });
  } catch (error) {
    console.error("Error fetching article:", error);
    throw new Response("Article not found", { status: 404 });
  }
}

export default function ArticleDetail() {
  const { article, relatedArticles } = useLoaderData<typeof loader>();

  return (
    <div>
      <Navbar />
      
      <main className="article-detail">
        <section 
          className="article-hero"
          style={{
            '--article-hero-bg': `url(${article.image_url})`
          } as React.CSSProperties}
        >
          <div className="article-header">
            <div className="breadcrumb">
              <Link to="/">Beranda</Link>
              <span>/</span>
              <Link to="/artikel">Artikel</Link>
              <span>/</span>
              <span>Detail Artikel</span>
            </div>
            <h1>{article.title}</h1>
          </div>
        </section>

        <div className="article-container">
          <article className="article-main">
            <div className="article-image">
              <img src={article.image_url} alt={article.title} />
            </div>
            
            <div className="article-meta">
              <div className="author">
                <svg 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                <span>{article.author}</span>
              </div>
              <div className="date">
                {new Date(article.publish_date).toLocaleDateString('id-ID', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </div>
            </div>

            <div className="article-content">
              <div className="content-title">
                <h2>{article.title}</h2>
              </div>
              <div 
                className="content-text"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />
            </div>
          </article>

          <aside className="article-sidebar">
            <div className="related-articles">
              <h2>Artikel Lainnya</h2>
              <div className="related-list">
                {relatedArticles.map((related) => (
                  <Link 
                    key={related.id} 
                    to={`/artikels/${related.slug}`} 
                    className="article-card"
                  >
                    <img src={related.image_url} alt={related.title} />
                    <div>
                      <div className="article-info">
                        <div className="article-author">
                          <svg 
                            width="16" 
                            height="16" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                          >
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                            <circle cx="12" cy="7" r="4" />
                          </svg>
                          <span>{related.author}</span>
                        </div>
                        <span className="article-date">
                          {new Date(related.publish_date).toLocaleDateString('id-ID', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                          })}
                        </span>
                      </div>
                      <h3>{related.title}</h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
} 