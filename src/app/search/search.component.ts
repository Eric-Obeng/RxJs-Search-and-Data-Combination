import { Component, OnInit } from '@angular/core';
import {
  catchError,
  debounceTime,
  delay,
  filter,
  finalize,
  fromEvent,
  map,
  Observable,
  of,
  switchMap,
  tap,
} from 'rxjs';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  items: string[] = [];
  loading: boolean = false;
  error: string | null = null;
  notFound: string = '';

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
        map((event: any) => event.target.value),
        debounceTime(300),
        filter((term: string) => term.length >= 3),
        tap(() => {
          this.loading = true;
          this.error = null;
          this.items = [];
          this.notFound = ''; // Reset not found message
        }),
        switchMap((searchTerm: string) =>
          this.searchItems(searchTerm).pipe(
            // Call searchItems directly
            delay(400),
            catchError((err) => {
              this.error = 'Failed to search items.';
              this.loading = false;
              return of([]); // Return an empty array on error
            }),
            tap(() => (this.loading = false))
          )
        )
      )
      .subscribe((results) => {
        this.items = results;
        if (this.items.length === 0) {
          this.notFound = 'No results found.';
        } else {
          this.notFound = '';
        }
      });
  }

  // Search function to filter mock data
  searchItems(searchTerm: string): Observable<string[]> {
    const filteredResults = this.mockData.filter((item) =>
      item.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return of(filteredResults);
  }
}
