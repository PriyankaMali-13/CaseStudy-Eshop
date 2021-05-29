import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  imageObject = [
    {
      image:
        'https://whnt.com/wp-content/uploads/sites/20/2019/10/s112160040.jpg?w=2560&h=1440&crop=1',
      thumbImage:
        'https://whnt.com/wp-content/uploads/sites/20/2019/10/s112160040.jpg?w=2560&h=1440&crop=1',
    },
    {
      image: 'https://wallpaperaccess.com/full/1496231.jpg',
      thumbImage: 'https://wallpaperaccess.com/full/1496231.jpg',
    },
    {
      image:
        'https://img.freepik.com/free-photo/woman-holding-various-shopping-bags-copy-space_23-2148674122.jpg?size=626&ext=jpg',
      thumbImage:
        'https://img.freepik.com/free-photo/woman-holding-various-shopping-bags-copy-space_23-2148674122.jpg?size=626&ext=jpg',
    },

    {
      image:
        'https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RWxDHD?ver=5cd6&q=90&m=2&h=2147483647&w=2147483647&b=%23FFFFFFFF&aim=true',
      thumbImage:
        'https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RWxDHD?ver=5cd6&q=90&m=2&h=2147483647&w=2147483647&b=%23FFFFFFFF&aim=true',
    },
  ];
}
