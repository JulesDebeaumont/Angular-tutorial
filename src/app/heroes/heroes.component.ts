// angular
import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
// interfaces
import { Hero } from '../interfaces/hero';
// services
import { HeroService } from '../services/hero.service';
import { LoadingService } from '../services/loading.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})

export class HeroesComponent implements OnInit {

  // Ici on déclare heroes comme un array de Hero, qui sera initialisé à un tableau vide.
  heroes: Hero[] = []

  // Definition d'une variable qui sera une instance de Hero
  // selectedHero?: Hero

  // Injection des services à faire ici
  constructor(
    private heroService: HeroService,
    public loadingService: LoadingService
  ) { }

  // À la création du composant
  ngOnInit(): void {
    this.getHeroes()
  }


  /**
   * Méthode qui permet d'affecter une instance de héro à selectedHero
   * @param hero {Hero}
   * @returns {Void}
   */
  /*
  onSelect(hero: Hero): void {
    if (this.selectedHero === hero) {
      this.selectedHero = undefined
      this.messageService.add("Message Service : unselect")
    } else {
      this.selectedHero = hero
      this.messageService.add(`Message Service : hero ${hero.id} selected`)
    }
  }
  */


  /**
   * Méthode qui va permettre d'utiliser le heroService de la classe (mis dans le constructor)
   * 
   * @returns {Void}
   */
  getHeroes(): void {
    this.loadingService.setLoading(true)
    this.heroService.getHeroes()
      // La méthode subscribe provient de l'import d'Observable dans le service
      // Ici elle permet de mettre la réponse de getHeroes dans l'attribut heroes
      // Similaire à un .then() en quelques sortes..
      .subscribe((heroes) => {
        this.heroes = heroes
        this.loadingService.setLoading(false)
      })

    // TODO revoir la gestion du loading si une erreur survient
  }


  /**
   * Add a new hero to the list
   * @param heroName Name of the new hero
   * @returns {void}
   */
  add(heroName: string): void {
    heroName = heroName.trim()
    if (heroName === undefined) {
      return
    }

    // Ici je créer un objet avec un name qui sera égale à heroName
    // Cet objet sera ensite défini comme une instance de Hero
    this.heroService.createHero({ name: heroName } as Hero)
      .subscribe((hero) => {
        this.heroes.push(hero)
      })
  }


  /**
   * Delete a hero from the list
   * @param hero 
   * @returns {void}
   */
  delete(hero: Hero): void {
    // rien dans le subscribe car pas besoin de la réponse pour delete
    this.heroService.deleteHero(hero.id).subscribe(() => {
      this.heroes = this.heroes.filter(h => h !== hero)
    })

  }

}
