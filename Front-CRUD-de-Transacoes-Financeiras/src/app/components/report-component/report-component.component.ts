import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {AuthService} from '../../_services/auth.service';
import {environment} from '../../../environments/environment';
import {DatePipe, NgStyle} from '@angular/common';
@Component({
  selector: 'app-report-component',
  standalone: true,
  imports: [
    NgStyle
  ],
  templateUrl: './report-component.component.html',
  styleUrl: './report-component.component.css'
})




export class ReportComponentComponent implements OnChanges {
  @Input() data: string = '';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.calcularDiferencaDeDias(this.data);
      this.fetchData();
    }
  }
  responseback:any;
  constructor(
    private http: HttpClient,
    private authService: AuthService,

  ) {
  }
  fetchData(): void {
    const token = this.authService.getToken(); // Recupera o token do AuthService
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
      'X-Requested-With': 'XMLHttpRequest'
    });
    // Criação de parâmetros (HttpParams)
    const params = new HttpParams()
      .set('date', this.data)   // Adiciona parâmetro param1

    this.http.get(`${environment.apiUrl}/api/TransacoesReport`, { headers, params })
      .subscribe(
        (response: any) => {
          this.responseback = response.data; // Armazena a resposta no componente
          console.log('Resposta do backend:', this.responseback);
        },
        (error) => {
          console.error('Erro ao carregar dados:', error);
        }
      );
  }
  dias: number = 0;
  calcularDiferencaDeDias(intervalo: string): number {

    const [dataInicial, dataFinal] = intervalo.split(' - ');

    const dataInicio = this.convertStringParaData(dataInicial);
    const dataFim = this.convertStringParaData(dataFinal);

    const diferencaEmMilissegundos = dataFim.getTime() - dataInicio.getTime();
    const diferencaEmDias = diferencaEmMilissegundos / (1000 * 3600 * 24);
    this.dias = diferencaEmDias;
    return diferencaEmDias;
  }

  private convertStringParaData(dataStr: string): Date {
    const [dia, mes, ano] = dataStr.split('/').map(num => parseInt(num, 10));
    return new Date(ano, mes - 1, dia);
  }
  formatarEmReais(valor: number): string {
    return valor.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  }

}
