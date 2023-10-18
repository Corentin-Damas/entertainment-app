import { useMovies } from "../data/getMovies";
import RecommendationItem from "./RecommendationItem";
import FilteredItem from "./FilteredItem";

function Recommendation({ category }) {
  const { isLoading } = useMovies();
  return (
    <div>
      <div className="recommendation">
        {category === "all" && (
          <>
            <h1 className="section-title">Recommendation</h1>
            <div className="recommendation__grid">
              {!isLoading && <RecommendationItem />}
            </div>
          </>
        )}

        {category === "movie" && <h1 className="section-title">Movies</h1>}
        {category === "tv" && <h1 className="section-title">TV Series</h1>}
        {category !== "all" && category!=="marked" && (
          <div className="recommendation__grid">
            {!isLoading && <FilteredItem category={category} />}
          </div>
        )}


        {category === "marked" && <h1 className="section-title">BookMarked Movie</h1>}
        {category==="marked" && (
          <div className="recommendation__grid">
            {!isLoading && <FilteredItem category={category}>Movie</FilteredItem>}
          </div>
        )}
        {category === "marked" && <h1 className="section-title u-top-margin-s">BookMarked TV Series</h1>}
        {category==="marked" && (
          <div className="recommendation__grid">
            {!isLoading && <FilteredItem category={category}>TV Series</FilteredItem>}
          </div>
        )}
      </div>
    </div>
  );
}

export default Recommendation;
