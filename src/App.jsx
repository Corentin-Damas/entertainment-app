import { MyProvider } from "./data/getMovies";
import NavBar from "./components/NavBar";
import SearchBar from "./components/SearchBar";
import Trending from "./components/Trending";
import Recommendation from "./components/Recommendation";
import { useState } from "react";

function App() {
  const [category, setCategory] = useState("all");

  return (
    <div className="app__container">
      <MyProvider>
        <NavBar category={category} setCategory={setCategory} />
        <div className="app__content">
          <SearchBar />
          {category==="all" && <Trending />}
          <Recommendation category={category} />
        </div>
      </MyProvider>
    </div>
  );
}

export default App;
