import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SearchService } from './search.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchForm: FormGroup;
  response: any;
  gifArray: Array<any> = [];
  clicked: boolean;
  random: boolean = false;
  paginationButtons: Array<any> = [];
  offset: number = 0;
  firstTime: boolean = true;
  constructor(private searchService: SearchService) { }

  ngOnInit(): void {

    this.searchForm = new FormGroup({
      "inputText": new FormControl("")
    })
  }

  trending() {
    this.random = false;
    this.gifArray.length = 0;
    this.response = '';
    this.clicked = true;
    this.searchService.getTrending().subscribe(elem => {
      this.response = elem;
      console.log(this.response);
      var numberOfButtons = this.response.pagination.total_count / this.response.pagination.count;
      for (var i=0; i<=numberOfButtons;i++) {
        this.paginationButtons.push(i);
      }
      console.log(numberOfButtons);
      this.response.data.map(elem => {
        this.gifArray.push(elem);
      })
      this.firstTime = false;
    })
  }

  search() {
    this.random = false;
    this.gifArray.length = 0;
    this.response = '';
    const value = this.searchForm.get("inputText").value;
    if (value) {
      this.searchService.searchGif(value).subscribe(elem => {
        this.response = elem;
        this.response.data.map(elem => {
          this.gifArray.push(elem);
        })
      })
    }
  }

  randomGif() {
    this.random = true;
    this.gifArray.length = 0;
    this.response = '';
    this.clicked = true;
      this.searchService.randomGif().subscribe(elem => {
        console.log(elem);
        this.response = elem;
    })

    const link = document.createElement('a')
    link.href = "#random"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }


  async downloadImage(imageSrc, title) {
    console.log(title);
    const image = await fetch(imageSrc)
    const imageBlog = await image.blob()
    const imageURL = URL.createObjectURL(imageBlog)
  
    const link = document.createElement('a')
    link.href = imageURL
    link.download = title
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

}
