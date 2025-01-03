import React, { useState } from "react";
import Country from "../components/Country";

const Home = ({ data }) => {
  //  console.log(data);
const [isOpen,setIsOpen] = useState(false);

const regionMenu = ()=>{
    setIsOpen(!isOpen);
    console.log(isOpen);
}
  return (
    <div className="home">
      <section className="filters">
        <div className="container">
          <div className="search-wrapper">
            <i className="fa-regular fa-magnifying-glass search-icon"></i>
            <input
              type="text"
              className="search-input"
              placeholder="Search for a country..."
            />
          </div>
          <div className={isOpen?"dropdown-wrapper open":"dropdown-wrapper"}>
            <div
              className="dropdown-header  flex flex-jc-sb flex-ai-c"
              onClick={regionMenu}
            >
              <span>Filter by Region</span>
              <i className="fa-regular fa-chevron-down icon"></i>
            </div>
            <div
              className="dropdown-body "
              onClick={()=>console.log(123)}
              
            >
              <ul>
                <li data-region="all">All</li>
                <li data-region="africa">Africa</li>
                <li data-region="americas">America</li>
                <li data-region="asia">Asia</li>
                <li data-region="europe">Europe</li>
                <li data-region="oceania">Oceania</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <main className="main">
        <div className="container">
          <section
            className="countries-grid"
            
          >
            <Country country={data} />
          </section>
        </div>
      </main>
    </div>
    // <div>
    //   {data.map((element) => {
    //     console.log(element);
    //   })}
    // </div>
  );
};

export default Home;
