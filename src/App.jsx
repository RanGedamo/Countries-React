import { useEffect, useState } from "react";
import "../src/assets/css/common.css";
import "../src/assets/css/details.css";
import "../src/assets/css/main.css";
import "../src/assets/scss/common.scss";
import Home from "./pages/Home";
import { getCountries } from "./services/countries.services";
import Header from "./components/Header/Header";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getCountries().then((res) => setData(res));
  }, []);

  return (
    <div className="app">
      <Header />
      <Home data={data} />
    </div>
  );
}

export default App;
