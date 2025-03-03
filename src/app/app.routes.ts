import { Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { Main2Component } from './main-2/main-2.component';
import { Main3Component } from './main-3/main-3.component';

export const routes: Routes = [
    {path: '', component: MainComponent},
    {path: 'main', component: MainComponent},
    {path: 'main2', component: Main2Component},
    {path: 'main3', component: Main3Component}

];
