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
  model = new Hero(-1, '', '', '')
  submitted = false


  constructor(
    private heroService: HeroService
  ) { }

  ngOnInit(): void { }


  /**
   * Executer lors d'un submit d'un formulaire dans le composant
   */
  onSubmit(): void {
    this.submitted = true
  }

  /**
   * Add a new hero to the list
   */
  addHero(): void {
    this.heroService.createHero(this.model)
      .subscribe((hero) => this.heroes.push(hero))
    this.submitted = false
  }

}
