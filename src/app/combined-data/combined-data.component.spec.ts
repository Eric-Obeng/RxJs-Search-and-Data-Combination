import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CombinedDataComponent } from './combined-data.component';

describe('CombinedDataComponent', () => {
  let component: CombinedDataComponent;
  let fixture: ComponentFixture<CombinedDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CombinedDataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CombinedDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
