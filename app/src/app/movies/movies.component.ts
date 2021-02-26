import { Movie } from './../../util/movie';
import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Countries } from '../../util/countries';
import { map } from 'rxjs/operators';
// import movieIds

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  @Input() country!: Countries;
  ids: string[] = [];

  // Hårdkodade
  // Fargo, Mandomsprovet, Deer Hunter, Wall Street, Get Out, Mulholland Drive
  americanMovieIds = ["tt0116282", "tt0061722", "tt0077416", "tt0094291","tt5052448","tt0166924"] //återkomsten, stalker, diamond hands, krig o fred, italienaren
  movies: Movie[] = [];
  chosenID!: string;
  alternativeIDs: string[] = [];
  chosenMovie: Movie;
  chosenAlternatives: Movie[] = [];

  placeholderMovie:Movie = {
    Poster:"Placeholder",
    Title:"Placeholder",
    Year:"Placeholder",
    Rating:"Placeholder",
    Director:"Placeholder",
    Plot:"Placeholder",
    imdbID:"Placeholder"
  };


  constructor(private http: HttpClient) {
    this.chosenMovie = this.placeholderMovie;
    this.chosenAlternatives = [this.placeholderMovie, this.placeholderMovie, this.placeholderMovie]
  }

  ngOnInit(): void{
      this.generateMovies(this.country, ()=>{
        this.randomiseMovie(this.movies);
        console.log("Chosen i init");
        console.log(this.chosenMovie)
        this.randomiseAlternatives(3);
      });
    }

    /*
  Laddar in alla filmer som tillhär landet från cachen
  anrop av callback gör så att slumpningen går igång
  */
 // motsvarar generateDishesCache obs
  generateMovies(country:Countries, callback:Function = ()=>{}) {
    this.ids = this.generateIds(country);
    this.getMoviesFromIDs(this.ids, (movies:Movie[])=>{
      this.movies = movies;
      callback()
    })
  }

  getMoviesFromIDs(ids:string[], callback:Function = ()=>{}){
    let movieArr: Movie[] = [];
    for(let i = 0; i < this.ids.length; i++){
      let requestURL = 'http://www.omdbapi.com/?apikey=c9d44329&i=' + ids[i]
      this.http.get(requestURL)
        .pipe(map(res => JSON.parse(JSON.stringify(res))))
        .subscribe(
          (data) => {
            movieArr.push(data);
          },
          (error) => {
            console.error("Request failed with error")
          },
          () => {
            if(movieArr.length === ids.length){
              callback(movieArr);
            }
          }
        )
    }
  }



  extractMovie(response: Object, callback:Function = ()=>{}): void {
    // let movie: Movie = this.initMovie;
    let movie = {
      title: '',
      id: '',
      year:'',
      rating:'',
      director:'',
      plot:'',
      poster: ''
    }
    Object.entries(response).forEach(
      ([key, value]) => {
        //console.log( key + value)
      }
    );
    callback(movie);
  }

  generateIds(country:Countries){
    let ids: string[] = [];
    switch(country){
      case Countries.USA:
        ids = this.americanMovieIds;
        break;
      case Countries.Italy:
        throw new Error ("Movies for "+ country +" not implemented")
        //info = italianInfo;
        break;
      case Countries.Scotland:
        throw new Error ("Movies for "+ country +" not implemented")
        //info = scottishInfo;
        break;
      default:
        ids = this.americanMovieIds;
        break;
        //throw new Error ("Movies for "+ country +" not implemented")
    }
    return ids;
  }

  /*
  Väljer en ny film från de inladdade filmerna
  Anropas av knapp
  */
  randomiseMovie(movies:Movie[]) {
    this.chosenMovie = this.randomChoiceFromArray<Movie>(this.movies);
  }

  /*
  Hanterar randomiseringen av alternativa filmer
  */
  randomiseAlternatives(nbrAlternatives: number) {
    this.chosenAlternatives = [];
    let candidates: Movie[] = this.movies.filter((movie)=>movie.imdbID !== this.chosenMovie.imdbID);
    let k = Math.min(nbrAlternatives, candidates.length);
    let movie: Movie;

    for (let i = 0; i < k; i++) {
      movie = this.randomChoiceFromArray(candidates);
      candidates = candidates.filter(obj => obj !== movie); // funkar detta? ska det vara dish.något?
      this.chosenAlternatives.push(movie);
    }
  }

  /*
  Returnerar filmen som har det valda IDt
  Om det inte finns någon film med angivet så kastas ett fel.
  */
  getMovieFromArray(id: string, movies: Movie[]): Movie {
    let movie: Movie;
    //console.log("Inuti getMovieFromArray: ")
    movie = movies.filter((m) => m.imdbID === id)[0]
    //movie = movies.find((m)=> m.id === id)
    if(movie === undefined){
    throw new Error("Movie not found in array");
    }
    return movie;
  }

  /*
  Returnerar ett objekt från den givna vektorn
  */
  randomChoiceFromArray<T>(array:T[]):T {
    return array[this.getRandomInt(array.length)]
  }

  getRandomInt(max:number):number {
    return Math.floor(Math.random() * Math.floor(max));
  }
}

// this.http.get('/api').subscribe(j => console.log(j));
