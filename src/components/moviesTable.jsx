import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Table from './common/table';
import Like from './common/like';
class MoviesTable extends Component {
  columns = [
    { 
      path: 'title', 
      label: 'Title', 
      // to is a template literal
      content: movie => <Link to={`/movies/${movie._id}`}>{movie.title}</Link> 
    },
    { path: 'genre.name', label: 'Genre' },
    { path: 'numberInStock', label: 'Stock' },
    { path: 'dailyRentalRate', label: 'Rate' },
    { 
      key: 'like', 
      // function takes a parameter like movie and returns a react element
      content: movie => <Like liked={movie.liked} onClick={() => this.props.onLike(movie)} /> 
    },
    { 
      key: 'delete', 
      content: movie => (
        <button 
          onClick={() => this.props.onDelete(movie)} 
          className="btn btn-danger btn-sm"
        >
          Delete
        </button> 
      )}
  ];

  render() { 
    const { movies, onSort, sortColumn } = this.props;

  return ( 
    <Table 
      columns={this.columns} 
      data={movies} 
      sortColumn={sortColumn} 
      onSort={onSort} 
    />
  );
  }
}
 
export default MoviesTable;