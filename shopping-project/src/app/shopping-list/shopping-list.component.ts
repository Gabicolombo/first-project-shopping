import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Observable<{ingredients: Ingredient[]}>;
  private subscription: Subscription;

  constructor(private slService: ShoppingListService, 
              private store: Store<{ shoppingList: { ingredients: Ingredient[]}}>) { }

  ngOnInit(): void {
    this.ingredients = this.store.select('shoppingList');
    //  this.subscription = this.slService.ingredientsChanged.subscribe((ingredients:Ingredient[]) => {
    //   this.ingredients = ingredients;
    // });this.ingredients = this.slService.getIngredients();
   
  }

  onEditItem(index: number){
    this.slService.startEditing.next(index);
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }

}
