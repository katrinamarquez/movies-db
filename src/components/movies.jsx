import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import MoviesTable from './moviesTable';
import Pagination from './common/pagination';
import { paginate } from '../utils/paginate';
import ListGroup from './common/listGroup';
import { getGenres } from '../services/fakeGenreService';
import _ from 'lodash';

class Movies extends Component {
  state = { 
    movies: [],
    genres: [],
    currentPage: 1,
    pageSize: 4,
    sortColumn: { path: 'title', order: 'asc' }
  }

  // Called when an instance of the component is rendered in the dom
  componentDidMount() {
    const genres = [{ _id: "", name: 'All Genres' },...getGenres()]

    this.setState({ movies: getMovies(), genres });
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
    // current page. from first page if you navigate to another genre that does not have >3 movies.
    // it will remain on the first page. Thus, reset the state per click.
    this.setState({ selectedGenre: genre, currentPage: 1 })
  }

  handleSort = path => {
    const sortColumn = {...this.state.sortColumn};
    if (sortColumn.path === path)
      sortColumn.order = (sortColumn.order === 'asc') ? 'desc' : 'asc';
    else {
      sortColumn.path = path;
      sortColumn.order = 'asc';
    }
    this.setState({ sortColumn });
  };

  render() { 
    const { length: count } = this.state.movies;
    const { 
      pageSize, 
      currentPage,
      sortColumn, 
      selectedGenre, 
      movies: allMovies } = this.state;

    if (count === 0)
      return <p>There are no movies in the database.</p>

    const filtered = selectedGenre && selectedGenre._id
      ? allMovies.filter(m => m.genre._id === selectedGenre._id) 
      : allMovies;
    // if count is not 0, create new array, paginate data, store in constant
    // need to apply genre filter before pagination as the number of pages depends upon results
    // sorting after filtering data

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order])

    const movies = paginate(sorted, currentPage, pageSize);

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
          <MoviesTable 
            movies={movies} 
            onLike={this.handleLike} 
            onDelete={this.handleDelete} 
            onSort={this.handleSort}
          />
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