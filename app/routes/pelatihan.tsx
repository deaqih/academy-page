import { useState, useEffect } from "react";
import { json, LoaderFunctionArgs, redirect } from "@remix-run/node";
import { Link, useLoaderData, useSearchParams, useNavigate, Form } from "@remix-run/react";
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
  const queryParam = url.searchParams.get("query") || "";
  const sortParam = url.searchParams.get("sort") || "default";
  
  const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!);
  
  let query = supabase
    .from('trainings')
    .select('*');
    
  // Filter by category if provided
  if (categoryParam && categoryParam !== 'all') {
    // Convert first letter to uppercase for proper category matching
    const formattedCategory = categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1);
    console.log("Filtering by category:", formattedCategory);
    query = query.eq('category', formattedCategory);
  }
  
  // Apply text search if query is provided
  if (queryParam) {
    query = query.or(`title.ilike.%${queryParam}%,description.ilike.%${queryParam}%`);
  }
  
  // Apply sorting
  if (sortParam === "newest") {
    query = query.order('created_at', { ascending: false });
  } else if (sortParam === "oldest") {
    query = query.order('created_at', { ascending: true });
  } else {
    query = query.order('created_at', { ascending: false }); // Default sort
  }
  
  const { data: trainings, error } = await query;

  if (error) {
    console.error("Error fetching trainings:", error);
    throw new Error('Failed to fetch trainings');
  }

  // Log filtered results count
  console.log(`Found ${trainings?.length || 0} trainings for category: ${categoryParam || 'All'}`);

  return json({ 
    trainings, 
    selectedCategory: categoryParam,
    searchQuery: queryParam,
    sortOrder: sortParam
  });
}

export async function action({ request }: LoaderFunctionArgs) {
  const formData = await request.formData();
  const category = formData.get("category") as string;
  
  // Redirect ke halaman dengan parameter kategori yang sesuai
  if (category === "All") {
    return redirect("/pelatihan");
  } else {
    return redirect(`/pelatihan?category=${category.toLowerCase()}`);
  }
}

type CategoryType = "All" | "Training" | "Consulting" | "Assessment";

export default function Pelatihan() {
  const { trainings, selectedCategory, searchQuery: initialSearchQuery, sortOrder: initialSortOrder } = useLoaderData<typeof loader>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isCategoryOpen, setIsCategoryOpen] = useState(true);
  const [activeCategory, setActiveCategory] = useState<CategoryType>(
    selectedCategory 
      ? (selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)) as CategoryType
      : "All"
  );
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery || "");
  const [sortOrder, setSortOrder] = useState(initialSortOrder || "default");
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const itemsPerPage = 6;

  const categories: CategoryType[] = ["All", "Training", "Consulting", "Assessment"];
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    Training: false,
    Consulting: false,
    Assessment: false
  });

  const navigate = useNavigate();

  // Update search params when filters change
  useEffect(() => {
    const newParams = new URLSearchParams(searchParams);
    
    if (activeCategory === "All") {
      newParams.delete("category");
    } else {
      newParams.set("category", activeCategory.toLowerCase());
    }
    
    if (searchQuery) {
      newParams.set("query", searchQuery);
    } else {
      newParams.delete("query");
    }
    
    if (sortOrder !== "default") {
      newParams.set("sort", sortOrder);
    } else {
      newParams.delete("sort");
    }
    
    // Only update the URL if we aren't currently typing in the search box
    if (!isSearching) {
      setSearchParams(newParams);
    }
    
    // Reset to page 1 when filters change
    setCurrentPage(1);
  }, [activeCategory, searchQuery, sortOrder, searchParams, setSearchParams, isSearching]);

  // Separate useEffect to update URL params to avoid excessive reloads
  useEffect(() => {
    if (isSearching) return; // Don't update URL while user is typing
    
    const newParams = new URLSearchParams();
    
    if (activeCategory !== "All") {
      newParams.set("category", activeCategory.toLowerCase());
    }
    
    if (searchQuery) {
      newParams.set("query", searchQuery);
    }
    
    if (sortOrder !== "default") {
      newParams.set("sort", sortOrder);
    }
    
    // Compare if params actually changed before updating
    const currentParamsString = searchParams.toString();
    const newParamsString = newParams.toString();
    
    if (currentParamsString !== newParamsString) {
      setSearchParams(newParams);
    }
  }, [activeCategory, searchQuery, sortOrder, isSearching, setSearchParams, searchParams]);

  const toggleCategory = (category: string) => {
    setExpandedCategories({
      ...expandedCategories,
      [category]: !expandedCategories[category]
    });
  };

  const handleCategoryClick = (category: CategoryType) => {
    setActiveCategory(category);
    setCurrentPage(1);
    
    if (category === "All") {
      navigate("/pelatihan");
    } else {
      navigate(`/pelatihan?category=${category.toLowerCase()}`);
    }
    
    if (isFilterVisible) {
      setIsFilterVisible(false);
    }
  };

  const toggleFilterVisibility = () => {
    setIsFilterVisible(!isFilterVisible);
  };
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setIsSearching(true);
  };
  
  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setIsSearching(false);
    }
  };
  
  const handleSearchBlur = () => {
    setIsSearching(false);
  };
  
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value);
  };

  // Calculate pagination
  const totalPages = Math.ceil(trainings.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTrainings = trainings.slice(startIndex, startIndex + itemsPerPage);

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
                onChange={handleSearchChange}
                onKeyDown={handleSearchKeyDown}
                onBlur={handleSearchBlur}
              />
              <div className="search-icon">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.16667 15.8333C12.8486 15.8333 15.8333 12.8486 15.8333 9.16667C15.8333 5.48477 12.8486 2.5 9.16667 2.5C5.48477 2.5 2.5 5.48477 2.5 9.16667C2.5 12.8486 5.48477 15.8333 9.16667 15.8333Z" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M17.5 17.5L13.875 13.875" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            <div 
              className={`top-filter-button ${activeCategory !== "All" ? "active" : ""}`}
              onClick={toggleFilterVisibility}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M4 21V14M4 10V3M12 21V12M12 8V3M20 21V16M20 12V3M1 14H7M9 8H15M17 16H23" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Filter {activeCategory !== "All" ? `(${activeCategory})` : ""}</span>
            </div>
            <div className="top-sort-filter">
              <select 
                value={sortOrder}
                onChange={handleSortChange}
              >
                <option value="default">Sort By: Default</option>
                <option value="newest">Terbaru</option>
                <option value="oldest">Terlama</option>
              </select>
            </div>
          </div>

          <div className="pelatihan-content">
            <div className={`categories-sidebar ${isFilterVisible ? 'mobile-visible' : ''}`}>
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
                      >
                        <Form method="post">
                          <input type="hidden" name="category" value={category} />
                          <button 
                            type="submit"
                            className="category-link"
                            onClick={() => {
                              // Update state lokal juga untuk immediate feedback
                              setActiveCategory(category);
                              
                              // Close mobile filter if open
                              if (isFilterVisible) {
                                setIsFilterVisible(false);
                              }
                            }}
                          >
                            <div className="category-name">
                              {category === "All" && (
                                <svg className="category-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                              )}
                              {category === "Training" && (
                                <svg className="category-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M12 6.25278V19.2528M12 6.25278C10.8321 5.47686 9.24649 5 7.5 5C5.75351 5 4.16789 5.47686 3 6.25278V19.2528C4.16789 18.4769 5.75351 18 7.5 18C9.24649 18 10.8321 18.4769 12 19.2528M12 6.25278C13.1679 5.47686 14.7535 5 16.5 5C18.2465 5 19.8321 5.47686 21 6.25278V19.2528C19.8321 18.4769 18.2465 18 16.5 18C14.7535 18 13.1679 18.4769 12 19.2528" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                              )}
                              {category === "Consulting" && (
                                <svg className="category-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M8 9H16M8 13H14M12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                              )}
                              {category === "Assessment" && (
                                <svg className="category-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15M9 5C9 6.10457 9.89543 7 11 7H13C14.1046 7 15 6.10457 15 5M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5M12 12H15M12 16H15M9 12H9.01M9 16H9.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                              )}
                              {category}
                            </div>
                            {category !== "All" && (
                              <span 
                                className="category-expand" 
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  toggleCategory(category);
                                }}
                              >
                                {expandedCategories[category as Exclude<CategoryType, "All">] ? '-' : '+'}
                              </span>
                            )}
                          </button>
                        </Form>
                      </li>
                    ))}
                  </ul>
                  
                  {isFilterVisible && (
                    <div className="mobile-filter-actions">
                      <button 
                        className="apply-filter-btn"
                        onClick={() => setIsFilterVisible(false)}
                      >
                        Terapkan Filter
                      </button>
                      <button 
                        className="cancel-filter-btn"
                        onClick={() => setIsFilterVisible(false)}
                      >
                        Batal
                      </button>
                    </div>
                  )}
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
                        <span className="category" data-category={training.category || "Training"}>
                          {training.category || "Training"}
                        </span>
                        <h3>{training.title}</h3>
                        <p>{truncateText(training.description, 120)}</p>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="no-results">
                    <p>Tidak ada pelatihan yang ditemukan.</p>
                    <button 
                      className="reset-filter-btn"
                      onClick={() => {
                        setSearchQuery("");
                        setActiveCategory("All");
                        setSortOrder("default");
                        setSearchParams({});
                      }}
                    >
                      Reset Filter
                    </button>
                  </div>
                )}
              </div>

              {paginatedTrainings.length > 0 && (
                <div className="pagination">
                  <div className="pagination-info">
                    Menampilkan: {currentPage * itemsPerPage - itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, trainings.length)} dari {trainings.length}
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