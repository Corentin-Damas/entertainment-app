import { createContext, useContext, useEffect, useReducer } from "react";

const AppContext = createContext();

const initialState = {
  movies: {},
  isLoading: true,
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "movies/loaded":
      return { ...state, isLoading: false, movies: action.payload };
    case "movie/updated":
      return { ...state, isLoading: false, movies: action.payload };
    case "rejected":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
  }
}

function MyProvider({ children }) {
  const [{ movies, isLoading, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    async function getMovies() {
      dispatch({ type: "loading" });

      try {
        const res = await fetch("http://localhost:9000/data");
        const data = await res.json();
        dispatch({ type: "movies/loaded", payload: data });
      } catch {
        dispatch({
          type: "rejected",
          payload: "There was an error loading movies...",
        });
      }
    }
    getMovies();
  }, []);

  async function updateBookmark(title, patch) {
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`http://localhost:9000/data?title=${title}`, {
        method: "PATCH",
        body: JSON.stringify(patch),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      dispatch({ type: "movie/updated", payload: data });

      if (!res.ok) throw Error();
      // We don't need the data, so we don't return anything
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error loading movies...",
      });
    }
  }

  return (
    <AppContext.Provider
      value={{
        movies,
        isLoading,
        error,
        updateBookmark,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

function useMovies() {
  const context = useContext(AppContext);
  if (context === undefined)
    throw new Error("Movie Context was used outside the movies Provider");
  return context;
}

export { MyProvider, useMovies };
