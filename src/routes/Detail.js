import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./Detail.module.css";

function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  const getMovie = async () => {
    try {
      const response = await fetch(
        `https://yts.mx/api/v2/movie_details.json?movie_id=${id}`
      );
      const json = await response.json();
      setMovie(json.data.movie);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch movie details:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getMovie();
  }, []);

  return (
    <div className={styles.container}>
      {loading ? (
        <h1 className={styles.title}>Loading...</h1>
      ) : (
        <>
          <h1 className={styles.title}>{movie.title}</h1>
          <img
            src={movie.medium_cover_image}
            alt={movie.title}
            className={styles.image}
          />
          <p className={styles.description}>{movie.description_full}</p>
          <ul className={styles.genres}>
            {movie.genres.map((genre) => (
              <li key={genre} className={styles.genre}>
                {genre}
              </li>
            ))}
          </ul>
          <button className={styles.button} onClick={() => navigate(-1)}>
            Go Back
          </button>
        </>
      )}
    </div>
  );
}

export default Detail;
