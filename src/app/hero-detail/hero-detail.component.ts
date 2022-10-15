import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../heroes'

import { ActivatedRoute, Router } from '@angular/router';
import { Location} from '@angular/common'
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private heroService: HeroService
  ) { }

  ngOnInit(): void {
    this.getHero();
  }

  //  @Input() hero?: Hero;

  hero : Hero | undefined;  

  getHero(): void{
    
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHero(id).subscribe(hero => this.hero = hero);

  }

  goBack(): void{
    this.location.back();
  }

}
