import { EventEmitter, Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { Subject } from "rxjs";
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../shopping-list/store/shopping-list.actions';
import * as fromApp from '../store/app.reducer';

@Injectable()
export class RecipeService{
  recipesChanged = new Subject<Recipe[]>();
  
  // private recipes: Recipe[] = [
  //   new Recipe('A test Recipe',
  //             'This is a simply a test',
  //             'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F43%2F2022%2F03%2F31%2F16354-easy-meatloaf-mfs-74-1x1-1.jpg',
  //             [
  //               new Ingredient('Meat', 1),
  //               new Ingredient('French Fries', 3)
  //             ]),
  //   new Recipe('Recipe 2',
  //             'simply test 2',
  //             'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg',
  //             [
  //               new Ingredient('Buns', 2),
  //               new Ingredient('Meat', 1)
  //             ])
  // ];
  private recipes: Recipe[] = [];
  constructor(private store: Store<fromApp.AppState>){}

  setRecipes(recipes: Recipe[]){
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes(){ return this.recipes.slice(); }

  getRecipe(id: number){
    return this.recipes[id];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]){
    this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  addRecipe(newRecipe: Recipe) {
    this.recipes.push(newRecipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }

}
