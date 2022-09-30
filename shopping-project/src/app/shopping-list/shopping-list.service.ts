import { EventEmitter } from '@angular/core';

import { Ingredient } from '../shared/ingredient.model';


export class ShoppingListService{
    ingredientsChanged = new EventEmitter<Ingredient []>();
    
    private ingredients: Ingredient[] = [
        new Ingredient('apples', 5),
        new Ingredient('Tomatoes', 10)
    ];

    getIngredients(){
        return this.ingredients.slice();
    }

    addItem(newIngredient: Ingredient){
        this.ingredients.push(newIngredient);
        this.ingredientsChanged.emit(this.ingredients.slice());
    }

    addIngredients(ingredients: Ingredient[]){
        console.log(ingredients);
        this.ingredients.push(...ingredients);
        this.ingredientsChanged.emit(this.ingredients
            .slice())
    }
}