import { Routes } from '@angular/router';
import {LoginComponentComponent} from './components/login-component/login-component.component';
import {
  FormTransacoesComponentComponent
} from './components/form-transacoes-component/form-transacoes-component.component';
import {TransacoesComponentComponent} from './components/transacoes-component/transacoes-component.component';

export const routes: Routes = [
  {path:"",
  component:LoginComponentComponent},
  {path:"transacoesCreate",
  component:FormTransacoesComponentComponent},
  {path:"transacoes",
  component:TransacoesComponentComponent},
];
