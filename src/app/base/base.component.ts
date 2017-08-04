import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit {

  title: any = 'Base Demo';

  constructor() { }

  ngOnInit() {
  }

}
