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
  americanMovieIds = ["tt0116282", "tt0061722", "tt0077416", "tt0094291","tt5052448","tt0166924"]
  movies: Movie[] = [];
  chosenID!: string;
  alternativeIDs: string[] = [];
  chosenMovie: Movie;
  chosenAlternatives: Movie[] = [];

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
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.country = this.getCountry(params.get('country'));
      this.generateMovies(this.country, ()=>{
        this.randomiseMovie(this.movies);
        this.randomiseAlternatives(3);
      });
    });
    }

  getCountry(country: string | null): Countries {
    if(country !== null){
      switch(country){
        case "american":
          return Countries.USA;
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
        throw new Error ("Movies for "+ country +" not implemented")
        //info = italianInfo;
        break;
      case Countries.Scotland:
        throw new Error ("Movies for "+ country +" not implemented")
        //info = scottishInfo;
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
}

// this.http.get('/api').subscribe(j => console.log(j));
