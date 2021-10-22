import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../classes/hero';
import { HeroService } from '../services/hero.service';

@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.css']
})

export class HeroFormComponent implements OnInit {

  @Input() heroes: Hero[] = []

  powers = [
    'Really Smart',
    'Super flexible',
    'Super Hot',
    'Weather Changer'
  ]
  model = new Hero(-1, 'Didier', this.powers[0], 'Chuck Overstreet')
  submited = false


  constructor(
    private heroService: HeroService
  ) { }

  ngOnInit(): void { }

  onSubmit(): void {
    this.submited = true
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

}
