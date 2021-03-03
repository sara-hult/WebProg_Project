import { Injectable } from '@angular/core';
import { Countries } from '../util/countries';
import { Movie } from '../util/movie';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MovieCreationService {
  ids: string[] = [];
  movies: Movie[] = [];
  // Fargo, Mandomsprovet, Deer Hunter, Wall Street, Get Out, Mulholland Drive
  americanMovieIds = ["tt0116282", "tt0061722", "tt0077416", "tt0094291","tt5052448","tt0166924","tt0062622", "tt0072684", "tt0368794", "tt0105236", "tt0047396", "tt0091042", "tt0265666", "tt0477348", "tt0075314", "tt0102685", "tt0114814", "tt2582802", "tt0209144"]
  // nostalgia, roma, gudfadern 2, livetär underbart
  italianMovieIds = ["tt0086022", "tt0069191", "tt0071562", "tt0118799", "tt0095765", "tt0067445", "tt0071129", "tt6768578", "tt1641410", "tt0056512", "tt0045274", "tt0060176", "tt0053619", "tt0065571", "tt0080539", "tt0076786"]
 // Filth, Trainspotting, ratcatcher, local hero, "sweet sixteen", "gregorys girl", small faces, the wicker man, from scotland with love
  scottishMovieIds = ["tt1450321", "tt0117951", "tt0171685", "tt0085859", "tt0313670", "tt0082477", "tt0114474", "tt0070917", "tt3112280"]

  constructor(private http: HttpClient) { }

  generateMovies(country:Countries, callback:Function = ()=>{}) {
    this.ids = this.generateIds(country);
    this.getMoviesFromIDs(this.ids, (movies:Movie[])=>{
      this.movies = movies;
      callback(this.movies)
    })
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
}
