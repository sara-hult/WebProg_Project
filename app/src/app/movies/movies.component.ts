import { Movie } from './../../util/movie';
import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Countries } from '../../util/countries';
import { map } from 'rxjs/operators';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
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
  americanMovieIds = ["tt0116282", "tt0061722", "tt0077416", "tt0094291","tt5052448","tt0166924","tt0062622", "tt0072684", "tt0368794"]
  // nostalgia, roma, gudfadern 2, livetär underbart
  italianMovieIds = ["tt0086022", "tt0069191", "tt0071562", "tt0118799"]
  // Braveheart, Trainspotting, last king of scotland, highlander
  scottishMovieIds = ["tt0112573", "tt0117951", "tt0455590", "tt0091203"]
  movies: Movie[] = [];
  chosenID!: string;
  alternativeIDs: string[] = [];
  chosenMovie: Movie;
  chosenAlternatives: Movie[] = [];
  changedCountry: boolean = false;

  placeholderMovie:Movie = {
    Poster:"Placeholder",
    Title:"Placeholder",
    Year:"Placeholder",
    imdbRating:"Placeholder",
    Director:"Placeholder",
    Plot:"Placeholder",
    imdbID:"Placeholder",
    Runtime:"Placeholder"
  };


  constructor(private http: HttpClient, private route: ActivatedRoute) {
    this.chosenMovie = this.placeholderMovie;
    this.chosenAlternatives = [this.placeholderMovie, this.placeholderMovie, this.placeholderMovie]
  }

  ngOnInit(): void{
    /*this.route.paramMap.subscribe((params: ParamMap) => {
      this.country = this.getCountry(params.get('country'));
      this.generateMovies(this.country, ()=>{
        if(this.changedCountry){
          this.randomiseMovie(this.movies);
        } else {
          this.chosenMovie = JSON.parse(localStorage.getItem("chosenMovie")!);
        }
        this.randomiseAlternatives(3);
      });
    });*/
    this.chosenMovie = JSON.parse(localStorage.getItem("chosenMovie")!);
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.country = this.getCountry(params.get('country'));
      this.generateMovies(this.country, ()=>{
        this.randomiseAlternatives(3);
      });
    });
    }

  getCountry(country: string | null): Countries {
    if(country !== null){
      this.changedCountry = (country !== localStorage.getItem("country"));
      switch(country){
        case "american":
          return Countries.USA;
        case "italian":
          return Countries.Italy;
        case "scottish":
          return Countries.Scotland
        default:
          throw new Error('404 Country not implemented')
      }
    }else{
        throw new Error('404 Ett land måste anges ex: american');
      }
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

  generateIds(country:Countries){
    let ids: string[] = [];
    switch(country){
      case Countries.USA:
        ids = this.americanMovieIds;
        break;
      case Countries.Italy:
        ids = this.italianMovieIds;
        break;
      case Countries.Scotland:
        ids = this.scottishMovieIds;
        break;
      default:
        throw new Error ("Movies for "+ country +" not implemented")
    }
    return ids;
  }

  /*
  Väljer en ny film från de inladdade filmerna
  Anropas av knapp
  */
  randomiseMovie(movies:Movie[]) {
    this.chosenMovie = this.randomChoiceFromArray<Movie>(this.movies);
    localStorage.setItem("chosenMovie", JSON.stringify(this.chosenMovie));
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
      candidates = candidates.filter(obj => obj !== movie);
      this.chosenAlternatives.push(movie);
    }
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

  getRandomMovie() {
    this.randomiseMovie(this.movies);
  }

  setMovie(): void {
    localStorage.setItem("chosenMovie", JSON.stringify(this.chosenMovie));
  }

  switchSelectedMovie(id:string) {
    this.chosenMovie = this.getMovieFromArray(id, this.chosenAlternatives);
    this.setMovie();
    //this.randomiseAlternatives(3);
  }

  getMovieFromArray(movieID: string, movies: Movie[]): Movie{
    let movie: Movie;
    movie = movies.filter((tempMovie) => tempMovie.imdbID === movieID)[0];
    if(movie === undefined) {
      throw new Error("Movie not found in array");
    }
    return movie;
  }
}

// this.http.get('/api').subscribe(j => console.log(j));
