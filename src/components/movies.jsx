import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import Like from './common/like';
import Pagination from './common/pagination';
import { paginate } from '../utils/paginate';
import ListGroup from './common/listGroup';
import { getGenres } from '../services/fakeGenreService';
class Movies extends Component {
  state = { 
    movies: [],
    genres: [],
    currentPage: 1,
    pageSize: 4
  }

  // Called when an instance of the component is rendered in the dom
  componentDidMount() {
    this.setState({ movies: getMovies(), genres: getGenres() });
  }

  handleDelete = (movie) => {
    const movies = this.state.movies.filter(m => m._id !== movie._id);
    this.setState({ movies });
  }

  handleLike = (movie) => {
    // cloning object so you dont amend original object
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  }

  handlePageChange = page => {
    this.setState({ currentPage: page });
  }

  handleGenreSelect = genre => {
    this.setState({ selectedGenre: genre })
  }

  render() { 
    const { length: count } = this.state.movies;
    const { pageSize, currentPage, selectedGenre, movies: allMovies } = this.state;

    if (count === 0)
      return <p>There are no movies in the database.</p>

    const filtered = selectedGenre 
      ? allMovies.filter(m => m.genre._id === selectedGenre._id) 
      : allMovies;
    // if count is not 0, create new array, paginate data, store in constant
    // need to apply genre filter before pagination as the number of pages depends upon results
    const movies = paginate(filtered, currentPage, pageSize);

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup 
            items={this.state.genres} 
            onItemSelect={this.handleGenreSelect} 
            selectedItem={this.state.selectedGenre}
          />
        </div>
        <div className="col">
          <p>Show {filtered.length} movies in the database.</p>
          <table className="table">
            <thread>
              <tr>
                <th>Title</th>
                <th>Genre</th>
                <th>Stock</th>
                <th>Rate</th>
                <th />
                <th />
              </tr>
            </thread>
            <tbody>
              {movies.map(movie => (
              <tr key={movie._id}>
                <td>{movie.title}</td>
                <td>{movie.genre.name}</td>
                <td>{movie.numberInStock}</td>
                <td>{movie.dailyRentalRate}</td>
                <td>
                  <Like liked={movie.liked} onClick={() => this.handleLike(movie)} />
                </td>
                <td>
                  <button onClick={() => this.handleDelete(movie)} className="btn btn-danger btn-sm">Delete</button>
                </td>
              </tr>       
              ))}
            </tbody>
          </table>
          <Pagination 
            itemsCount={filtered.length} 
            pageSize={pageSize} 
            currentPage={currentPage}
            onPageChange={this.handlePageChange} 
          />
        </div> 
      </div>
    );
  }
}
 
export default Movies;