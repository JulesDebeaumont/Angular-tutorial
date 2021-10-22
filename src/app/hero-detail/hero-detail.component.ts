import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../interfaces/hero'
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService } from '../services/hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})

export class HeroDetailComponent implements OnInit {

  // Equivalent d'une propType
  // Ici on dit que la prop reçu (@Input) selectedHero est une instance de la classe Hero
  // Nécéssite l'import de Input
  @Input() selectedHero?: Hero

  hero?: Hero

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private heroService: HeroService
  ) { }

  ngOnInit(): void {
    this.getHero()
  }

  getHero(): void {
    const heroId = Number(this.route.snapshot.paramMap.get('id'))
    this.heroService.getHero(heroId)
    .subscribe((hero) => this.hero = hero)
  }

  goBack(): void {
    this.location.back()
  }

  save(): void {
    if (this.hero !== undefined) {
      this.heroService.updateHero(this.hero)
        .subscribe(() => this.goBack())
    }
  }

}
