import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {TesteService} from './_services/teste.service';
// @ts-ignore
import { Todo } from './_Models/teste.model'; // Importa o modelo

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'Front-CRUD-de-Transacoes-Financeiras';
  todos: Todo[] = [];

  constructor(private testeService:  TesteService) {
  }

  ngOnInit() {
    this.testeService.getall().subscribe((response) => {
      this.todos = response; // Atribui a resposta ao array
      console.log(this.todos);
    });
  }






}
