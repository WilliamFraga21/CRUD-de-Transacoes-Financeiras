import { Routes } from '@angular/router';
import {LoginComponentComponent} from './components/login-component/login-component.component';

import {TransacoesComponentComponent} from './components/transacoes-component/transacoes-component.component';

export const routes: Routes = [
  {path:"",
  component:LoginComponentComponent},

  {path:"transacoes",
  component:TransacoesComponentComponent},
];
