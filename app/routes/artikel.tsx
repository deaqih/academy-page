import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { Link, useLoaderData, useSearchParams } from "@remix-run/react";
import { supabase, type Article } from "~/utils/supabase.server";
import styles from "~/styles/artikel.css";
import { links as navbarLinks } from "~/components/Navbar";
import Footer from "~/components/Footer";
import Navbar from "~/components/Navbar";

export const links = () => [
  { rel: "stylesheet", href: styles },
  ...navbarLinks()
];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page") || "1");
  const perPage = 9;
  const start = (page - 1) * perPage;
  const end = start + perPage - 1;

  // Get total count
  const { count } = await supabase
    .from('articles')
    .select('*', { count: 'exact', head: true });

  // Fetch paginated articles
  const { data: articles, error } = await supabase
    .from('articles')
    .select('*')
    .order('publish_date', { ascending: false })
    .range(start, end);

  if (error) {
    throw new Error('Error fetching articles');
  }

  return json({
    articles,
    totalPages: Math.ceil((count || 0) / perPage),
    currentPage: page
  });
};

export default function Artikel() {
  const { articles, totalPages, currentPage } = useLoaderData<typeof loader>();
  const [searchParams] = useSearchParams();

  const renderPagination = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      const isActive = i === currentPage;
      pages.push(
        <Link
          key={i}
          to={`/artikel?page=${i}`}
          className={`pagination-link ${isActive ? 'active' : ''}`}
          prefetch="intent"
        >
          {i}
        </Link>
      );
    }
    return pages;
  };

  return (
    <main className="artikel">
      <Navbar />
      
      <section className="artikel-hero">
        <div className="hero-content">
          <span className="subtitle">Artikel</span>
          <h1>Artikel</h1>
        </div>
      </section>

      <section className="artikel-grid">
        <div className="container">
          <div className="articles">
            {articles.map((article) => (
              <Link
                key={article.id}
                to={`/artikels/${article.slug}`}
                className="article-card"
              >
                <div className="article-image">
                  <img src={article.image_url} alt={article.title} />
                </div>
                <div className="article-content">
                  <div className="article-meta">
                    <span className="author">{article.author}</span>
                    <span className="date">
                      {new Date(article.publish_date).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                  <h3>{article.title}</h3>
                </div>
              </Link>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="pagination">
              {currentPage > 1 && (
                <Link
                  to={`/artikel?page=${currentPage - 1}`}
                  className="pagination-link prev"
                  prefetch="intent"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              )}
              
              {renderPagination()}
              
              {currentPage < totalPages && (
                <Link
                  to={`/artikel?page=${currentPage + 1}`}
                  className="pagination-link next"
                  prefetch="intent"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              )}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
} 