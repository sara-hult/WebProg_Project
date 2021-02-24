import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Countries } from '../../util/countries';
import { map} from 'rxjs/operators';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  @Input() country!: Countries;
  data:any = null;
  poster:string = '';
  movieTitle:string = '';
  year:string = '';
  rating:string = '';
  director:string = '';
  plot:string = '';
  russianMovies = ["tt0376968", "tt0079944", "tt0062759", "tt0063794","tt0450450"] //återkomsten, stalker, diamond hands, krig o fred, italienaren
  

  constructor(private http: HttpClient) {  }

  ngOnInit(): void{
    console.log("Successfully initiated Movies");
    var randomIndex = Math.floor((Math.random() * this.russianMovies.length))
    var movieId = this.russianMovies[randomIndex]
    var requestUrl = 'http://www.omdbapi.com/?apikey=c9d44329&i=' + movieId
    console.log(requestUrl)
    this.http.get(requestUrl)
      .pipe(map(res => JSON.parse(JSON.stringify(res))))
      .subscribe(data => {
        this.data = data;
        this.poster = data.Poster;
        this.movieTitle = data.Title;
        this.year = data.Year;
        this.rating = data.imdbRating;
        this.director = data.Director;
        this.plot = data.Plot;
        console.log(data);
        console.log(this.data.poster);
      });
 
  }

  getMovies(): void{

  }
}

// this.http.get('/api').subscribe(j => console.log(j)); 