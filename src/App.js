import React from "react";
import Axios from "axios";
import Movie from './Movie';
import Header from './Header';
import './App.css';

class App extends React.Component {
  state = {
    isLoading: true,
    movies: [],
  };

  getMovies = async () => {
    const {
      data: {
        data: {movies},
      },
    } = await axios.get('http://yts-proxy.now.sh/list_movies.json?sort_by=rating');
    this.setState({movies, isLoading: false});
  }
  componentDidMount() {
    // 영화 데이터 로딩!
    this.getMovies();
  }
  render() {
    const { isLoading, movies } = this.state;
    return (
      <section className="container">
        {isLoading ? (
          <div class="loader">
            <span className="loader__text">Loading...</span>
          </div>
        ) : (
          <div className = "movies">
            <div className = "header">
            <Header />
          </div>
            {movies.map(movie => (
              <Movie
                key={movie.id}
                id={movie.id}
                year={movie.year}
                title={movie.title}
                summary={movie.summary}
                poster={movie.large_cover_image}
                genres={movie.genres}
              />
            ))}
          </div>
        )}
      </section>
    )
  }
}

export default App;
