// angular
import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';
// services
import { HeroService } from '../services/hero.service';
// interfaces
import { Hero } from '../classes/hero';


@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})

export class HeroSearchComponent implements OnInit {

  // Plutôt que de stocker les résultats de la recherche dans 
  // une liste de hero (<Hero[]>), ici on déclare juste un attribut
  // qui sera une réponse du serveur. Le but étant de ???
  heroes$!: Observable<Hero[]>
  private searchTerms = new Subject<string>()

  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    this.heroes$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) =>
        this.heroService.searchHeroes(term)
      )
    )
  }


  /**
   * Push a search term in the observable stream
   * @param term
   * @returns {void}
   */
  search(term: string): void {
    if (term !== "") {
      this.searchTerms.next(term)
    }
  }
}
