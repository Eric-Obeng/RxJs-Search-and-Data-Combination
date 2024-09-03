import { Component, OnInit } from '@angular/core';
import { fromEvent, of } from 'rxjs';
import { debounceTime, filter, switchMap, map } from 'rxjs/operators';
import { CombinedData } from './interface/combined-data';
import { SearchComponent } from './search/search.component';
import { CombinedDataComponent } from './combined-data/combined-data.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SearchComponent, CombinedDataComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  ngOnInit() {}
}
