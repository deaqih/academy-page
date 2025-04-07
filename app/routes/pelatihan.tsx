import { useState, useEffect } from "react";
import { json, LoaderFunctionArgs } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { createClient } from "@supabase/supabase-js";
import styles from "~/styles/pelatihan.css";
import Navbar from "~/components/Navbar";
import Footer from "~/components/Footer";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export async function loader() {
  const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!);
  
  const { data: trainings, error } = await supabase
    .from('trainings')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error('Failed to fetch trainings');
  }

  return json({ trainings });
}

export default function Pelatihan() {
  const { trainings } = useLoaderData<typeof loader>();
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Training");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("default");
  const itemsPerPage = 6;

  const categories = ["Training", "Consulting", "Assessment"];

  // Filter trainings based on category and search query
  const filteredTrainings = trainings
    .filter(training => training.category === selectedCategory)
    .filter(training => 
      training.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      training.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

  // Sort trainings
  const sortedTrainings = [...filteredTrainings].sort((a, b) => {
    if (sortOrder === "newest") {
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    } else if (sortOrder === "oldest") {
      return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
    }
    return 0;
  });

  // Calculate pagination
  const totalPages = Math.ceil(sortedTrainings.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTrainings = sortedTrainings.slice(startIndex, startIndex + itemsPerPage);

  // Generate page numbers array
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  // Reset to first page when category or search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery]);

  return (
    <>
      <Navbar />
      <main className="pelatihan">
        <div className="hero-section">
          <span className="subtitle">Pelatihan</span>
          <h1>Pelatihan</h1>
        </div>

        <div className="content-section">
          <div className="program-header">
            <h2>Program Pelatihan Kami</h2>
            <p>Tingkatkan keterampilan dan kompetensi Anda dengan program pelatihan terbaik dari Irsam Academy!</p>
          </div>

          <div className="filters">
            <div className="search-filter">
              <input 
                type="text" 
                placeholder="Cari" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="category-dropdown">
              <button 
                className="category-button"
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
              >
                <span>Categories: {selectedCategory}</span>
                <svg 
                  width="20" 
                  height="20" 
                  viewBox="0 0 20 20" 
                  fill="none"
                  style={{ transform: isCategoryOpen ? 'rotate(180deg)' : 'rotate(0)' }}
                >
                  <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              {isCategoryOpen && (
                <div className="category-menu">
                  {categories.map((category) => (
                    <button
                      key={category}
                      className={`category-item ${category === selectedCategory ? 'active' : ''}`}
                      onClick={() => {
                        setSelectedCategory(category);
                        setIsCategoryOpen(false);
                      }}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="sort-filter">
              <select 
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="default">Default</option>
                <option value="newest">Terbaru</option>
                <option value="oldest">Terlama</option>
              </select>
            </div>
          </div>

          <div className="training-grid">
            {paginatedTrainings.map((training) => (
              <Link 
                to={`/pelatihans/${training.slug}`} 
                key={training.id} 
                className="training-card"
              >
                <img src={training.image_url} alt={training.title} />
                <div className="card-content">
                  <span className="category">{training.category}</span>
                  <h3>{training.title}</h3>
                  <p>{training.description}</p>
                </div>
              </Link>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="pagination">
              <button 
                className="prev-page" 
                aria-label="Previous page"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <div className="page-numbers">
                {pageNumbers.map((number) => (
                  <span
                    key={number}
                    className={number === currentPage ? 'active' : ''}
                    onClick={() => setCurrentPage(number)}
                  >
                    {number}
                  </span>
                ))}
              </div>
              <button 
                className="next-page" 
                aria-label="Next page"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
} 