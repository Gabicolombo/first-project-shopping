import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { Store } from '@ngrx/store';
import * as fromShoppingList from './store/shopping-list.reducer';
import * as ShoppingListActions from './store/shopping-list.actions';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Observable<{ingredients: Ingredient[]}>;
  private subscription: Subscription;

  constructor(private store: Store<fromShoppingList.AppState>) { }

  ngOnInit(): void {
    this.ingredients = this.store.select('shoppingList');
  }

  onEditItem(index: number){
    this.store.dispatch(new ShoppingListActions.StartEdit(index));
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }

}
