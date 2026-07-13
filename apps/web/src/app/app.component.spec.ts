import { provideHttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  it('renders the application heading', async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [provideHttpClient()]
    }).compileComponents();

    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('h1')?.textContent).toContain(
      'Fundação da plataforma'
    );
  });
});

