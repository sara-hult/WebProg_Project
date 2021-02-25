import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Countries } from '../../util/countries';
import { map } from 'rxjs/operators';
import { Movie } from '../../util/movie'
// import movieIds

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  @Input() country!: Countries;
  ids: string[] = [];
  initMovie: Movie = {
    poster: '',
    title: '',
    year:'',
    rating:'',
    director:'',
    plot:'',
    id: ''
  }
  
  // Hårdkodade
  // Fargo, Mandomsprovet, Deer Hunter, Wall Street, Get Out, Mulholland Drive
  americanMovieIds = ["tt0116282", "tt0061722", "tt0077416", "tt0094291","tt5052448","tt0166924"] //återkomsten, stalker, diamond hands, krig o fred, italienaren
  movies: Movie[] = [];
  chosenID!: string;
  alternativeIDs: string[] = [];
  chosenMovie: Movie;
  chosenAlternatives: Movie[] = [];
  

  constructor(private http: HttpClient) { 
    this.chosenMovie = this.initMovie;
    this.chosenAlternatives = [this.initMovie, this.initMovie, this.initMovie]
  }

  ngOnInit(): void{
      this.generateMovies(this.country, ()=>{
        this.randomiseMovie();
        this.randomiseAlternatives(3);
      });
    }
  
    /*
  Laddar in alla filmer som tillhär landet från cachen
  anrop av callback gör så att slumpningen går igång
  */
 // motsvarar generateDishesCache obs
  async generateMovies(country:Countries, callback:Function = ()=>{}) {
    // switch-case
    this.ids = this.generateIds(country);
    var tempMovie: Movie;
    /**for(var i = 0; i < this.ids.length; i++){
      var requestUrl = 'http://www.omdbapi.com/?apikey=c9d44329&i=' + this.ids[i]
      this.http.get(requestUrl)
        .pipe(map(res => JSON.parse(JSON.stringify(res))))
        .subscribe(data => {
          // Lägg in i ett Movie-objekt
          tempMovie = {
            poster: data.Poster,
            title: data.Title,
            year: data.Year,
            rating: data.imdbRating,
            director: data.Director,
            plot: data.Plot,
            id: data.imdbID
          }
          this.movies.push(tempMovie)
        });
      }
      **/
    this.chosenMovie = this.initMovie;
    this.chosenAlternatives = [this.initMovie, this.initMovie, this.initMovie]
    let promiseArray = []
    for(var i = 0; i < this.ids.length; i++){
      var requestURL = 'http://www.omdbapi.com/?apikey=c9d44329&i=' + this.ids[i]
      this.http.get(requestURL)
        .pipe(map(res => JSON.parse(JSON.stringify(res))))
        .subscribe(
          (data) => {
            // Lägg in i ett Movie-objekt
            tempMovie = {
              poster: data.Poster,
              title: data.Title,
              year: data.Year,
              rating: data.imdbRating,
              director: data.Director,
              plot: data.Plot,
              id: data.imdbID
            }
          },
          (error) => { 
            console.error("Request failed with error")
          },
          () => {}
        )
    }

    console.log("Inuti GenerateMovies")
    console.log(this.movies)
    callback(this.movies)
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
    console.log("RESPONSE")
    console.log(response)
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
  randomiseMovie() {
    this.chosenID = this.randomChoiceFromArray(this.ids);
    this.chosenMovie = this.getMovieFromArray(this.chosenID, this.movies)
  }

  /*
  Hanterar randomiseringen av alternativa filmer
  */
  randomiseAlternatives(nbrAlternatives: number) {
    this.chosenAlternatives = [];
    let candidates: Movie[] = this.movies.filter((movie)=>movie.id !== this.chosenMovie.id);
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
    movie = movies.filter((m) => m.id === id)[0]
    //movie = movies.find((m)=> m.id === id)
    if(movie === undefined){
    throw new Error("Movie not found in array");
    }
    return movie;
  }

  /*
  Returnerar ett objekt från den givna vektorn
  */
  randomChoiceFromArray(array:any[]):any {
    return array[this.getRandomInt(array.length)]
  }

  getRandomInt(max:number):number {
    return Math.floor(Math.random() * Math.floor(max));
  }
}

// this.http.get('/api').subscribe(j => console.log(j)); 