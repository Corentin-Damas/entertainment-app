import { useMovies } from "../data/getMovies";
import RecommendationItem from "./RecommendationItem";

function Recommendation() {
  const { isLoading } = useMovies();
  return (
    <div>
      <div className="recommendation">
        <h1 className="section-title">Recommendation</h1>
        <div className="recommendation__grid">
          {!isLoading && <RecommendationItem />}
        </div>
      </div>
    </div>
  );
}

export default Recommendation;
