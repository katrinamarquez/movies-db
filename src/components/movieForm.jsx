import React from 'react';
import Joi from 'joi-browser';
import Form from './common/form';
import { getMovie, saveMovie } from '../services/fakeMovieService'; 
import { getGenres, genres } from '../services/fakeGenreService'; 

class MovieForm extends Form {
  state = { 
    data: {
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: ""
    },
    genres: [],
    errors: {}
   };

   schema = {
    _id: Joi.string(),
    title: Joi.string()
      .required()
      .label('Title'),
    genreId: Joi.string()
      .required()
      .label('Genre'),
    numberInStock: Joi.number()
      .required()
      .min(0)
      .max(100)
      .label('Number in Stock'),
    dailyRentalRate: Joi.number()
      .required()
      .min(0)
      .max(10)
      .label('Daily Rental Rate')
   };

   componentDidMount = () => {
    const genres = getGenres();
    this.setState({ genres });
    
    // get id pramaeter in the route 
    const movieId = this.props.match.params.id;
    // return immediately as do not need to populate form with an existing object
    if (movieId === 'new') return;

    const movie = getMovie(movieId);
      // use replace rather than push as it would return user to page with invalid movie id
      if (!movie) return this.props.history.replace ("/not-found");

    // what you want to display on the page is a different to structure of data
    this.setState({ data: this.mapToViewModel(movie) });
   };

   mapToViewModel = () => {
     // new object 
      return {
        _id: movie._id,
        title: movie.title,
        genreId: movie.genre._id,
        numberInStock: movie.numberInStock,
        dailyRentalRate: movie.dailyRentalRate
    }
   };

   doSubmit = () => {
      saveMovie(this.state.data);

      // redirect the user to movies
      this.props.history.push("/movies");
   };

  render() { 
    return ( 
      <div>
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('title', 'Title')}
          {this.renderSelect('genreId', 'Genre', this.state.genres)}
          {this.renderInput('numberInStock', 'Number in Stock')}
          {this.renderInput('dailyRentalRate', 'Daily Rental Rate')}
        </form>
      </div>
    );
  }
}
 
export default MovieForm;