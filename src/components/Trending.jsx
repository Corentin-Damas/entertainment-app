import { useMovies } from "../data/getMovies";
import CarouselItem from "./CarouselItem";

function Trending() {
  const { isLoading } = useMovies();

  return (
    <>
      <div className="trending">
        <h1 className="section-title">Trending</h1>
        <div className="carousel">{!isLoading && <CarouselItem />}</div>
      </div>
    </>
  );
}

export default Trending;
