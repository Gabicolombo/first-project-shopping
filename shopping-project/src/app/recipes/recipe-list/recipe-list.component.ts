import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Recipe } from '../recipe.model';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  // @Output() recipeWasSelected = new EventEmitter<Recipe>();
  recipes: Recipe[];
  subscription: Subscription;

  constructor(private router: Router, 
              private route: ActivatedRoute,
              private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.subscription = this.store.select('recipes')
      .pipe(map(recipesState => recipesState.recipes))
      .subscribe((recipes: Recipe[]) => {
      this.recipes = recipes;
    });
    // this.subscription = this.recipeService.recipesChanged.subscribe((recipes: Recipe[]) => {
    //   this.recipes = recipes;
    // });
    // this.recipes = this.recipeService.getRecipes()subscription;
  }

  onNewRecipe(){
    // precisamos utilizar o relativeTo para ir para recipe/new, já que ja estamos no /recipe
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }

}
