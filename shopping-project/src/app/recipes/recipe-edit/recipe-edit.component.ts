import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as fromApp from '../../store/app.reducer';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import * as RecipesAction from '../store/recipe.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  id: number;
  editMode = false;
  recipeForm: FormGroup;

  private storeSub: Subscription;

  constructor(private route: ActivatedRoute, 
              private router: Router,
              private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null; // se não tiver id é para adc, se não é para editar
      this.initForm();
    });
  }

  onSubmit(): void {
    console.log(this.recipeForm.value); 
    if(this.editMode) {
      //this.recipeService.updateRecipe(this.id, this.recipeForm.value);
      this.store.dispatch(new RecipesAction.UpdateRecipes({
        index: this.id,
        newRecipe: this.recipeForm.value 
      }));
    }
    else {
      //this.recipeService.addRecipe(this.recipeForm.value);
      this.store.dispatch(new RecipesAction.AddRecipes(this.recipeForm.value));
    }

    this.onCancel();
  }

  private initForm(){
    
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);

    if(this.editMode){
      // const recipe = this.recipeService.getRecipe(this.id);
      this.storeSub = this.store.select('recipes')
        .pipe(map(recipesState => {
        return recipesState.recipes.find((recipe, index) => {
          return index === this.id;
        })
      })).subscribe(recipe => {
        recipeName = recipe.name;
        recipeImagePath = recipe.imagePath;
        recipeDescription = recipe.description;

        if(recipe['ingredients']){
          for(let ingredient of recipe.ingredients){
            recipeIngredients.push(new FormGroup({
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
            }));
          }
        }
      });

  
     
    } 
  
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredients
    });
  }

  ngOnDestroy(): void {
    if(this.storeSub)
      this.storeSub.unsubscribe();
  }

  get controls() { // a getter!
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  } 

  onAddIngredient(){
    (<FormArray>this.recipeForm.get('ingredients')).push(new FormGroup({
      'name': new FormControl(null, Validators.required),
      'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
    }));
  }

  onCancel(){
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onDeleteIngredient(index: number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

}
