import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';

// @ts-ignore
import { Todo } from './_Models/teste.model'; // Importa o modelo

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Front-CRUD-de-Transacoes-Financeiras';
  todos: Todo[] = [];

  constructor() {
  }







}
