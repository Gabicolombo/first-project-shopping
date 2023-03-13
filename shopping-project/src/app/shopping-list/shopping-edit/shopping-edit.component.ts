import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', { static: false }) slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex:  number;
  editItem: Ingredient;
  // @ViewChild('nameInput', {static: false}) nameInputRef: ElementRef;
  // @ViewChild('amountInput', {static: false}) amountInputRef: ElementRef;
  // @Output() ingredientAdded = new EventEmitter<{name: string, amount: number}>();

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.subscription = this.store.select('shoppingList').subscribe(stateData => {
      if(stateData.editedIngredientIndex > -1){
        this.editMode = true;
        this.editItem = stateData.editedIngredient;
        this.slForm.setValue({
          name: this.editItem.name,
          amount: this.editItem.amount
        });

      }else this.editMode = false;
    });
    
  }

  onSubmit(form: NgForm){
    // const ingName = this.nameInputRef.nativeElement.value;
    // const ingAmount = this.amountInputRef.nativeElement.value;
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if(this.editMode) {
      this.store.dispatch(
        new ShoppingListActions.UpdateIngredient(newIngredient)
      );
    }else {
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient));
    }
    this.editMode = false;
    form.reset();
  }

  onClear(){
    this.slForm.reset();
    this.editMode = false;
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }

  onDelete(){
    this.store.dispatch(new ShoppingListActions.DeleteIngredient());
    this.onClear();
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
      this.store.dispatch(new ShoppingListActions.StopEdit());
  }

}
