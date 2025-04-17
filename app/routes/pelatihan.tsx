import { useState, useEffect } from "react";
import { json, LoaderFunctionArgs } from "@remix-run/node";
import { Link, useLoaderData, useSearchParams } from "@remix-run/react";
import { createClient } from "@supabase/supabase-js";
import styles from "~/styles/pelatihan.css";
import Navbar from "~/components/Navbar";
import Footer from "~/components/Footer";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const categoryParam = url.searchParams.get("category");
  
  const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!);
  
  let query = supabase
    .from('trainings')
    .select('*')
    .order('created_at', { ascending: false });
    
  // Filter by category if provided
  if (categoryParam) {
    query = query.eq('category', categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1));
  }
  
  const { data: trainings, error } = await query;

  if (error) {
    throw new Error('Failed to fetch trainings');
  }

  return json({ trainings, selectedCategory: categoryParam });
}

type CategoryType = "All" | "Training" | "Consulting" | "Assessment";

export default function Pelatihan() {
  const { trainings, selectedCategory } = useLoaderData<typeof loader>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isCategoryOpen, setIsCategoryOpen] = useState(true);
  const [activeCategory, setActiveCategory] = useState<CategoryType>(
    selectedCategory 
      ? (selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)) as CategoryType
      : "All"
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("default");
  const itemsPerPage = 6;

  const categories: CategoryType[] = ["All", "Training", "Consulting", "Assessment"];
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    Training: false,
    Consulting: false,
    Assessment: false
  });

  // Update URL when category changes
  useEffect(() => {
    if (activeCategory === "All") {
      const newParams = new URLSearchParams(searchParams);
      newParams.delete("category");
      setSearchParams(newParams);
    } else {
      setSearchParams({ category: activeCategory.toLowerCase() });
    }
  }, [activeCategory, setSearchParams, searchParams]);

  const toggleCategory = (category: string) => {
    setExpandedCategories({
      ...expandedCategories,
      [category]: !expandedCategories[category]
    });
  };

  const handleCategoryChange = (category: CategoryType) => {
    setActiveCategory(category);
    setCurrentPage(1);
  };

  const filteredTrainings = trainings
    .filter(training => 
      searchQuery 
        ? training.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          training.description.toLowerCase().includes(searchQuery.toLowerCase())
        : true
    );

  const sortedTrainings = [...filteredTrainings].sort((a, b) => {
    if (sortOrder === "newest") {
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    } else if (sortOrder === "oldest") {
      return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
    }
    return 0;
  });

  const totalPages = Math.ceil(sortedTrainings.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTrainings = sortedTrainings.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const truncateText = (text: string, maxLength: number = 120): string => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength).trim() + '...';
  };

  const handlePageChange = (page: number): void => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <Navbar />
      <main className="pelatihan">
        <div className="hero-section">
          <span className="subtitle">Pelatihan</span>
          <h1>Pelatihan {activeCategory !== "All" ? activeCategory : ""}</h1>
        </div>

        <div className="content-section">
          <div className="program-header">
            <h2>Program Pelatihan Kami</h2>
            <p>Tingkatkan keterampilan dan kompetensi Anda dengan program pelatihan terbaik dari Ikram Academy!</p>
          </div>

          <div className="top-filters">
            <div className="top-search">
              <input 
                type="text" 
                placeholder="Cari" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="top-filter-button">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M4 21V14M4 10V3M12 21V12M12 8V3M20 21V16M20 12V3M1 14H7M9 8H15M17 16H23" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Filter</span>
            </div>
            <div className="top-sort-filter">
              <select 
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="default">Sort By: Default</option>
                <option value="newest">Terbaru</option>
                <option value="oldest">Terlama</option>
              </select>
            </div>
          </div>

          <div className="pelatihan-content">
            <div className="categories-sidebar">
              <div className="categories-section">
                <div 
                  className={`categories-header ${!isCategoryOpen ? 'collapsed' : ''}`}
                  onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                >
                  <h3>Categories</h3>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className={`categories-content ${!isCategoryOpen ? 'collapsed' : ''}`}>
                  <ul className="categories-list">
                    {categories.map((category) => (
                      <li 
                        key={category}
                        className={`category-item-sidebar ${activeCategory === category ? 'active' : ''}`} 
                        onClick={() => handleCategoryChange(category)}
                      >
                        <div className="category-name">
                          {category}
                        </div>
                        {category !== 'All' && (
                          <span onClick={(e) => {
                            e.stopPropagation();
                            toggleCategory(category);
                          }}>
                            {expandedCategories[category] ? '-' : '+'}
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="training-content">
              <div className="training-grid">
                {paginatedTrainings.length > 0 ? (
                  paginatedTrainings.map((training) => (
                    <Link 
                      to={`/pelatihans/${training.slug}`} 
                      key={training.id} 
                      className="training-card"
                    >
                      <img src={training.image_url} alt={training.title} />
                      <div className="card-content">
                        <span className="category">{training.category}</span>
                        <h3>{training.title}</h3>
                        <p>{truncateText(training.description, 120)}</p>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="no-results">
                    <p>Tidak ada pelatihan yang ditemukan.</p>
                  </div>
                )}
              </div>

              {paginatedTrainings.length > 0 && (
                <div className="pagination">
                  <div className="pagination-info">
                    Menampilkan: {currentPage * itemsPerPage - itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, filteredTrainings.length)} dari {filteredTrainings.length}
                  </div>
                  <div className="pagination-controls">
                    <button 
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="prev-next"
                    >
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    
                    {Array.from({ length: totalPages }).map((_, index) => (
                      <button
                        key={index}
                        onClick={() => handlePageChange(index + 1)}
                        className={currentPage === index + 1 ? 'active' : ''}
                      >
                        {index + 1}
                      </button>
                    ))}
                    
                    <button 
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="prev-next"
                    >
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M7.5 5L12.5 10L7.5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
} 