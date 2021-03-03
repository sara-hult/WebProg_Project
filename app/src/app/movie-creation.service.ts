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
  americanMovieIds = ["tt0116282", "tt0061722", "tt0077416", "tt0094291","tt5052448","tt0166924","tt0062622", "tt0072684", "tt0368794"]
  // nostalgia, roma, gudfadern 2, livetär underbart
  italianMovieIds = ["tt0086022", "tt0069191", "tt0071562", "tt0118799"]
  // Braveheart, Trainspotting, last king of scotland, highlander
  scottishMovieIds = ["tt0112573", "tt0117951", "tt0455590", "tt0091203"]

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
