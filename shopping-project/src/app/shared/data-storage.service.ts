import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { map, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as RecipesActions from '../recipes/store/recipe.actions';

@Injectable({ providedIn: 'root' }) // precisamos do injectable por conta que utilizaremos o http
export class DataStorageService {

  constructor(private http: HttpClient,
    private recipeService: RecipeService,
    private store: Store<fromApp.AppState>) { }

  storeRecipes() {
    console.log('storeRecipes');
    const recipes = this.recipeService.getRecipes();
    console.log(recipes);
    this.http
      .put('https://ng-course-recipe-book-9f470-default-rtdb.firebaseio.com/recipes.json',
        recipes).subscribe(response => console.log(response));
  }

  fetchRecipes() {
    return this.http
      .get<Recipe[]>(
        'https://ng-course-recipe-book-9f470-default-rtdb.firebaseio.com/recipes.json',
      ).pipe(map(recipes => {
        console.log(recipes);
        return recipes.map(recipe => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : []
          }
        });
      }), tap(recipes => {
        this.store.dispatch(new RecipesActions.SetRecipes(recipes));
        //this.recipeService.setRecipes(recipes);
      }))
  }

}