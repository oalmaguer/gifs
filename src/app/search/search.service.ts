import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class SearchService {
  apiKey: string = 'sAIEkVn8BOewEjBQr598sGslovd4acci';
  constructor(private httpRequest: HttpClient) { }

  getTrending() {
    // https://api.giphy.com/v1/gifs
      return this.httpRequest.get(`https://api.giphy.com/v1/gifs/trending?api_key=${this.apiKey}`);
  }

  searchGif(searchValue) {
    return this.httpRequest.get(`https://api.giphy.com/v1/gifs/search?api_key=${this.apiKey}&q=${searchValue}`);
  }

  randomGif() {
    return this.httpRequest.get(`https://api.giphy.com/v1/gifs/random?api_key=${this.apiKey}`);
  }

}
