import { Injectable } from '@angular/core';

import { Hero } from './heroes';
import { HEROES } from './mock-heroes';

import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';

import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import {catchError, map, tap } from 'rxjs';




@Injectable({
  providedIn: 'root',
})
export class HeroService {

  constructor(
    private httpClient : HttpClient,
    private messageService : MessageService
  ) 
    { 

    }

  private heroesUrl = 'api/heroes';
    
  getHeroes(): Observable<Hero[]> {
    //this.messageService.add('HeroService: fetched heroes.');
    //this.log('fetched heroes');
    //const heroes = of(HEROES);

    // RxJS tap() operator enable ability by looking at the observable values and send the message, using log() method
    const heroes = this.httpClient.get<Hero[]>(this.heroesUrl)
              .pipe(
                  tap(_ => this.log('fetched heroes')),
                  catchError(this.handleError('getHeroes', []))
              );
      

    return heroes;
  }

  /**
   * 
   * @param operation - nameof operation that failed
   * @param result - optional value to return as the observable result
   * @returns 
   */
  private handleError<T>(operation = 'operation', result?: T){
    return (error: any) : Observable<T> =>{
      
        console.log(error);
        this.log(`${operation} failed: ${error.message}`);

        // let the app keep running by returning an empty result

        return of(result as T);
    };
  }

  getHero_old(id: number): Observable<Hero>{

    // for now, assume the hero with the spcified id always exists.
    // error handling will be handle in the next section
    const hero = HEROES.find(h => h.id === id)!;

    return of(hero);

  }

  /** get a hero by id. Will 404 if id not found */
  getHero(id: number) : Observable<Hero>{
    const url = `${this.heroesUrl}/${id}`;

    return this.httpClient.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))

    );

  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type':'application/json' })

  };

  updateHero(hero: Hero) : Observable<any>{
   
      return this.httpClient.put(this.heroesUrl, hero, this.httpOptions)
        .pipe(
          tap(_ => this.log(`updated hero id=${hero.id}`)),
          catchError(this.handleError<any>('updateHero'))
        )
  }

  /** add a new hero to serve */
  addHero(hero: Hero) : Observable<Hero>{

    return this.httpClient.post<Hero>(this.heroesUrl, hero, this.httpOptions)
      .pipe(
        tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
        catchError(this.handleError<Hero>('addHero'))

      )

  }

 /** DELETE: delete the hero from the server */
  deleteHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;

    return this.httpClient.delete<Hero>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

}