import React from 'react';
import './Main.css';
import MovieList from '../components/MovieList';
import Preloader from '../components/Preloader';
import Search from '../components/Search';

class Main extends React.Component
{
	state =
		{
			movies: [],
			count:0
		}
	componentDidMount()
	{
		fetch('https://www.omdbapi.com/?s=The%20Transporter&apikey=47170fd4')
			.then(response => response.json())
			.then(data => this.setState({movies:data.Search, count: data.totalResults}))
	}
	searchMovie = (str, type='all', page) =>
	{
		fetch(`https://www.omdbapi.com/?s=${str}${type !== 'all' ? `&type=${type}` : ''}${`&page=${page}`}&apikey=47170fd4`)
			.then(response => response.json())
			.then(data => this.setState({ movies: data.Search, count: data.totalResults }))

	}
	render()
	{
		console.log();
		return (
			<main className={this.state.movies == null ? <h1>Введите поисковый запрос</h1> : this.state.movies.length === 0 ? "main-loading" : "main-loaded"}>
				<Search searchMovie={this.searchMovie} totalItems={ this.state.count } />
				{
						this.state.movies == null ? <h1>Введите поисковый запрос</h1>:
						this.state.movies.length === 0 ?
						<Preloader /> :
						<MovieList movies={this.state.movies} />
				}
			</main>
		)
	}
}
export default Main;