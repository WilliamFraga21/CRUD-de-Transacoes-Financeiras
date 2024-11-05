import {Component, HostListener, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CurrencyPipe, DatePipe, NgClass, NgForOf, NgIf} from '@angular/common';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from '../../_services/auth.service';
import {environment} from '../../../environments/environment';



interface Item {
  id: number;
  tipo: string;
  categoria: string;
  valor: number;
  data: Date;
}





@Component({
  selector: 'app-transacoes-component',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    NgForOf,
    CurrencyPipe,
    DatePipe,
    NgClass
  ],
  providers: [],
  templateUrl: './transacoes-component.component.html',
  styleUrl: './transacoes-component.component.css',

})
export class TransacoesComponentComponent implements OnInit {



  data: any; // Variável para armazenar a resposta do backend

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    const token = this.authService.getToken(); // Recupera o token do AuthService

    // Configura os cabeçalhos com o token e outras informações
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
      'X-Requested-With': 'XMLHttpRequest'
    });

    // Faz a requisição GET para o endpoint desejado
    this.http.get(`${environment.apiUrl}/api/Transacoes`, { headers })
      .subscribe(
        (response: any) => {
          this.items = response.data; // Armazena a resposta no componente

          console.log('Resposta do backend:', response);
        },
        (error) => {
          console.error('Erro ao carregar dados:', error);
        }
      );
  }





  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.closeEditModal();
    }
  }

  closeEditModal(): void {
    this.isEditModalOpen = false;
    this.selectedItemTipo = '';
    this.selectedItemCategoria = '';
    this.selectedItemValor = 0;
  }


  selected: string | null = null; // Variável para armazenar a seleção atual

  toggleSelection(option: string) {
    // Altera a seleção
    this.selected = this.selected === option ? null : option;
  }


  items: Item[] = [
    { id: 1, tipo: 'Produto', categoria: 'Categoria A', valor: 100, data: new Date() },
    { id: 2, tipo: 'Serviço', categoria: 'Categoria B', valor: 200, data: new Date() },
  ];

  isEditModalOpen = false;
  selectedItem: Item | null = null;

  openEditModal(item: Item): void {
    this.selectedItem = { ...item }; // Clona o item selecionado
    this.isEditModalOpen = true;
  }



  saveEdit(): void {
    if (this.selectedItem) {
      const index = this.items.findIndex(item => item.id === this.selectedItem!.id);
      if (index > -1) {
        this.items[index] = this.selectedItem!;
      }
      this.closeEditModal();
    }
  }

  deleteItem(id: number): void {
    this.items = this.items.filter(item => item.id !== id);
  }

  // Funções para obter os valores de selectedItem
  get selectedItemTipo() {
    return this.selectedItem ? this.selectedItem.tipo : '';
  }



  set selectedItemTipo(value: string) {
    if (this.selectedItem) {
      this.selectedItem.tipo = value;
    }
  }

  get selectedItemCategoria() {
    return this.selectedItem ? this.selectedItem.categoria : '';
  }

  set selectedItemCategoria(value: string) {
    if (this.selectedItem) {
      this.selectedItem.categoria = value;
    }
  }

  get selectedItemValor() {
    return this.selectedItem ? this.selectedItem.valor : null;
  }

  set selectedItemValor(value: number | null) {
    if (this.selectedItem) {
      this.selectedItem.valor = value!;
    }
  }

  get selectedItemData() {
    return this.selectedItem ? this.selectedItem.data : null;
  }

  set selectedItemData(value: Date | null) {
    if (this.selectedItem) {
      this.selectedItem.data = value!;
    }
  }


  set selectedItemDescricao(value: Date | null) {
    if (this.selectedItem) {
      this.selectedItem.data = value!;
    }
  }



  tipoFiltro: string = '';
  valorFiltro: number | null = null;
  dataInicioFiltro: string | null = null;
  dataFimFiltro: string | null = null;

  getFilteredItems() {
    return this.items.filter(item => {
      const matchesTipo = this.tipoFiltro ? item.tipo.toLowerCase().includes(this.tipoFiltro.toLowerCase()) : true;
      const matchesValor = this.valorFiltro !== null ? item.valor === this.valorFiltro : true;

      const itemData = new Date(item.data).getTime();
      const startDate = this.dataInicioFiltro ? new Date(this.dataInicioFiltro).getTime() : null;
      const endDate = this.dataFimFiltro ? new Date(this.dataFimFiltro).getTime() : null;

      const matchesData =
        (startDate !== null && endDate !== null)
          ? itemData >= startDate && itemData <= endDate
          : true;

      return matchesTipo && matchesValor && matchesData;
    });
  }




}
