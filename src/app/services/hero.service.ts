// angular
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
// interfaces
import { Hero } from '../interfaces/hero'
// services
import { MessageService } from './message.service';
// import { HEROES } from '../mock/mock-heroes';

@Injectable({
  providedIn: 'root'
})

export class HeroService {

  private heroesUrl: string = 'api/heroes'
  private httpOptions: Object = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }


  constructor(
    private messageService: MessageService,
    private http: HttpClient
  ) { }


  /**
   * GET all heroes
   * @returns {Observable}
   */
  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(() => this.log('fetched heroes')), // similaire à un .then() ?
        catchError(this.handleError<Hero[]>('getHeroes', []))
      )
  }


  /**
   * GET hero by id
   * @param id id of the Hero
   * @returns {Observable}
   */
  getHero(id: number): Observable<Hero> {
    /*
    // Ici le "!" sert à dire qu'il y a forcement un résultat non null ou undefined
    // Comme on return cette expression, le "!" est nécessaire pour dire que l'on revoie
    // forcément un Observable non null ou undefined
    const hero = HEROES.find((hero) => hero.id === id)!
    */
    const url = `${this.heroesUrl}/${id}`
    return this.http.get<Hero>(url)
      .pipe(
        tap(() => this.log(`fetched hero ${id}`)),
        catchError(this.handleError<Hero>(`getHero id=${id}`))
      )
  }


  /**
   * PUT hero
   * @param hero values of the updated hero
   * @returns {Observable}
   */
  updateHero(hero: Hero): Observable<Hero> {
    return this.http.put<Hero>(this.heroesUrl, hero, this.httpOptions)
      .pipe(
        tap(() => this.log(`updated hero ${hero.id}`)),
        catchError(this.handleError<Hero>(`updateHero id=${hero.id}`))
      )
  }


  /**
   * POST hero
   * @param hero values of the new hero
   * @returns {Observable}
   */
  createHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions)
      .pipe(
        tap((newHero: Hero) => this.log(`Hero ${newHero.id} has been created`)),
        catchError(this.handleError<Hero>('createHero'))
      )
  }


  /**
   * DELETE hero
   * @param id id of the Hero
   * @returns {Observable}
   */
  deleteHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`
    return this.http.delete<Hero>(url, this.httpOptions)
      .pipe(
        tap(() => this.log(`Hero ${id} has been deleted`)),
        catchError(this.handleError<Hero>(`deleteHero id=${id}`))
      )
  }


  /**
   * GET, search hero by name
   * @param term name of the Hero to look for
   * @returns {Observable}
   */
  searchHeroes(term: string): Observable<Hero[]> {
    if (term.trim() === undefined) {
      // Si pas de recherche, on retourne un Observable de <Hero[]> grace à of()
      return of([])
    }

    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`)
      .pipe(
        tap((result) => {
          if (result !== undefined) {
            this.log(`Found heroe(s) for search "${term}"`)
          } else {
            this.log(`No hero found for search "${term}"`)
          }
        },
          catchError(this.handleError<Hero[]>(`searchHeroes "${term}"`, [])
          )
        ))
  }


  /**
   * Permet d'ajouter un message au service messageService
   * @param message 
   * @returns {void}
   */
  log(message: string): void {
    this.messageService.add(`Hero Service : ${message}`)
  }


  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
