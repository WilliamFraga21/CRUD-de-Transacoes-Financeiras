import { Component } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import {NgIf} from '@angular/common';
import {AuthService} from '../../_services/auth.service'; // Ajuste o caminho conforme necessário
@Component({
  selector: 'app-login-component',
  standalone: true,
  templateUrl: './login-component.component.html',
  imports: [
    ReactiveFormsModule,
    NgIf,
    FormsModule
  ],
  styleUrls: ['./login-component.component.css']
})
export class LoginComponentComponent {
  loginForm: FormGroup;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient ,// Adicione HttpClient aqui
  private authService: AuthService // Injete o AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    const headers = new HttpHeaders({
      'Accept': 'application/json'
    });

    this.http.post(`${environment.apiUrl}/api/login`, this.loginForm.value, { headers })
      .subscribe(
        (response: any) => {
          const token = response.access_token; // Ajuste isso de acordo com a estrutura da sua resposta
          this.authService.setToken(token); // Usar o serviço para armazenar o token
          console.log(localStorage.getItem('authToken'))
          this.router.navigate(['/transacoes']);
        },
        error => {
          console.error('Erro no login', error);
          this.errorMessage = 'Usuário ou senha inválidos';
        }
      );
  }
}
