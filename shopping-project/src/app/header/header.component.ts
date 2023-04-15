import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Subscription } from 'rxjs';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.action';
import * as RecipeActions from '../recipes/store/recipe.actions';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html'
})

export class HeaderComponent implements OnInit, OnDestroy {
  collapsed = true;
  private userSub: Subscription;
  isAuthenticated = false;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.userSub = this.store
      .select('auth')
      .pipe(map(authState => authState.user))
      .subscribe(user => {
        this.isAuthenticated = !!user;
        console.log(!user);
        console.log(!!user);
      });
  }

  onSaveData() {
    //this.dataStorageService.storeRecipes();
    this.store.dispatch(new RecipeActions.StoreRecipes);
  }

  onFetchData() {
    //this.dataStorageService.fetchRecipes().subscribe();
    this.store.dispatch(new RecipeActions.FetchRecipes());
  }

  onLogout() {
    this.store.dispatch(new AuthActions.Logout());
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
