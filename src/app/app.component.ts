import { Component, OnInit } from '@angular/core';
import { fromEvent, of } from 'rxjs';
import { debounceTime, filter, switchMap, map } from 'rxjs/operators';
import { CombinedData } from './interface/combined-data';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  items: string[] = [];
  searchItem: string = '';

  // combined data
  combinedData$: CombinedData | null = null;

  // Mock data array
  private mockData: string[] = [
    'Apple',
    'Banana',
    'Grape',
    'Orange',
    'Pineapple',
    'Strawberry',
    'Blueberry',
    'Kiwi',
    'Mango',
    'Papaya',
    'Watermelon',
    'Cherry',
  ];

  ngOnInit() {
    const searchInput = document.getElementById('search') as HTMLInputElement;

    fromEvent(searchInput, 'input')
      .pipe(
        debounceTime(300),
        map((event: any) => event.target.value),
        filter((term: string) => term.length >= 3),
        switchMap((searchTerm: string) => this.searchItems(searchTerm))
      )
      .subscribe((results: string[]) => {
        this.items = results;
      });


      
  }

  // Search function to filter mock data
  searchItems(searchTerm: string) {
    const filteredResults = this.mockData.filter((item) =>
      item.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return of(filteredResults);
  }
}
