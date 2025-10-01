import { useEffect } from "react";
import { createPortal } from "react-dom";
import styles from "./MovieModal.module.css";
import type { Movie } from "../../types/movie";

interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}

export default function MovieModal({ movie, onClose }: MovieModalProps) {
  // Закрытие по ESC и блокировка скролла
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden"; // блокируем скролл

    // cleanup при закрытии модалки
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "auto"; // восстанавливаем скролл
    };
  }, [onClose]);

  return createPortal(
    <div
      className={styles.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={onClose} // клик вне модалки
    >
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()} // не закрывать при клике внутри
      >
        <button
          className={styles.closeButton}
          aria-label="Close modal"
          onClick={onClose}
        >
          &times;
        </button>
        <img
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={movie.title}
          className={styles.image}
        />
        <div className={styles.content}>
          <h2>{movie.title}</h2>
          <p>{movie.overview}</p>
          <p>
            <strong>Release Date:</strong> {movie.release_date}
          </p>
          <p>
            <strong>Rating:</strong> {movie.vote_average}/10
          </p>
        </div>
      </div>
    </div>,
    document.body
  );
}
