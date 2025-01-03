import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Detail.css";

function Detail() {
  const { id } = useParams(); // URL에서 영화 ID 가져오기
  const navigate = useNavigate(); // 뒤로 가기 버튼에 사용
  const [movie, setMovie] = useState(null); // 영화 데이터 상태
  const [loading, setLoading] = useState(true); // 로딩 상태

  useEffect(() => {
    // 영화 데이터 가져오기
    const fetchMovie = async () => {
      try {
        const response = await fetch(
          `https://yts.mx/api/v2/movie_details.json?movie_id=${id}`
        );
        const json = await response.json();
        setMovie(json.data.movie); // 영화 데이터 설정
        setLoading(false); // 로딩 완료
      } catch (error) {
        console.error("Error fetching movie details:", error);
        navigate("/"); // 오류 발생 시 홈으로 이동
      }
    };

    fetchMovie();
  }, [id, navigate]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="detail-container">
      <button className="back-button" onClick={() => navigate(-1)}>
        Go Back
      </button>
      <h1 className="movie-title">{movie.title}</h1>
      <img
        src={movie.medium_cover_image}
        alt={movie.title}
        className="movie-image"
      />
      <p className="movie-description">{movie.description_full}</p>
      <ul className="movie-genres">
        {movie.genres.map((genre) => (
          <li key={genre} className="genre-item">
            {genre}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Detail;
