import { MyProvider } from "./data/getMovies";
import NavBar from "./components/NavBar";
import SearchBar from "./components/SearchBar";
import Trending from "./components/Trending";
import Recommendation from "./components/Recommendation";

function App() {
  
  return (
    <div className="app__container">
      <MyProvider>
        <NavBar />
        <div className="app__content">
          <SearchBar />
          <Trending />
          <Recommendation />
        </div>
      </MyProvider>
    </div>
  );
}

export default App;
