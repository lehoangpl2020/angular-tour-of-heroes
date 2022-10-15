import { Injectable } from '@angular/core';

import { Hero } from './heroes';
import { HEROES } from './mock-heroes';

import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root',
})
export class HeroService {

  constructor(private messageService : MessageService) { }

  getHeroes(): Observable<Hero[]> {
    const heroes = of(HEROES);
    this.messageService.add('HeroService: fetched heroes.')
    return heroes;
  }

  getHero(id: number): Observable<Hero>{

    // for now, assume the hero with the spcified id always exists.
    // error handling will be handle in the next section
    const hero = HEROES.find(h => h.id === id)!;

    return of(hero);

  }
}