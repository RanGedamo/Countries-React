import { useEffect, useRef, useState } from "react";
import { Country } from "../index";
import { fetchCountries } from "../services/countriesServices";

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const dropdownRef = useRef(null);

  useEffect(() => {
    fetchCountries()
      .then((res) => {
        setCountries(res);
        setFilteredCountries(res);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Error fetching countries. Please try again later.");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  const handleOpenDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    filterCountries(selectedRegion, term);
    setCurrentPage(1);
  };

  const handleRegionChange = (e) => {
    const region = e.target.innerHTML.toLowerCase();
    setSelectedRegion(region);
    filterCountries(region, searchTerm);
    setCurrentPage(1);
    setIsOpen(false);
  };

  const filterCountries = (region, term) => {
    let filtered = countries;

    if (region !== "all") {
      filtered = filtered.filter(
        (country) => country.region.toLowerCase() === region
      );
    }
    if (term) {
      filtered = filtered.filter((country) =>
        country.name.common.toLowerCase().includes(term)
      );
    }
    setFilteredCountries(filtered);
  };

  const handleNext = () => {
    const totalPages = Math.ceil(filteredCountries.length / itemsPerPage);
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo(0, 0);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCountries = filteredCountries.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  if (loading) {
    return (
      <div className="loader">
        <div className="spinner">
          <i className="fa-regular fa-circle-notch fa-spin icon"></i>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="home">
      <section className="filters">
        <div className="container">
          <div className="search-wrapper">
            <i className="fa-regular fa-magnifying-glass search-icon"></i>
            <input
              onInput={handleSearch}
              type="text"
              className="search-input"
              placeholder="Search for a country..."
            />
          </div>
          <div
            ref={dropdownRef}
            className={isOpen ? "dropdown-wrapper open" : "dropdown-wrapper"}
          >
            <div
              className="dropdown-header  flex flex-jc-sb flex-ai-c"
              onClick={handleOpenDropdown}
            >
              <span>Filter by Region</span>
              <i className="fa-regular fa-chevron-down icon"></i>
            </div>
            <div className="dropdown-body ">
              <ul>
                <li onClick={handleRegionChange}>All</li>
                <li onClick={handleRegionChange}>Africa</li>
                <li onClick={handleRegionChange}>America</li>
                <li onClick={handleRegionChange}>Asia</li>
                <li onClick={handleRegionChange}>Europe</li>
                <li onClick={handleRegionChange}>Oceania</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <main className="main">
        <div className="container">
          {currentCountries.length > 0 ? (
            <section className="countries-grid">
              {currentCountries.map((country, index) => (
                <Country key={index} data={country} />
              ))}
            </section>
          ) : (
            <div className="no-results">No countries found.</div>
          )}

          <div className="pagination">
            <button onClick={handlePrevious} disabled={currentPage === 1}>
              Previous
            </button>
            <h3>
              Page {currentPage} of{" "}
              {Math.ceil(filteredCountries.length / itemsPerPage)}
            </h3>
            <button
              onClick={handleNext}
              disabled={
                currentPage === Math.ceil(countries.length / itemsPerPage)
              }
            >
              Next
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
