import {
    createContext,
    useContext,
    useEffect,
    useReducer,
  } from "react";
  
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
  
    return (
      <AppContext.Provider
        value={{
          movies,
          isLoading,
          error,
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
  