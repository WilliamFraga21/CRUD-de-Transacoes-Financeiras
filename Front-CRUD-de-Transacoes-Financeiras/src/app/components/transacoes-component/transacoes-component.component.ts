import {Component, HostListener, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CurrencyPipe, DatePipe, NgClass, NgForOf, NgIf} from '@angular/common';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from '../../_services/auth.service';
import {environment} from '../../../environments/environment';
import {ReportComponentComponent} from '../report-component/report-component.component';
import {firstValueFrom} from 'rxjs';
import {Router} from '@angular/router';
import {FeedbackComponentComponent} from '../feedback-component/feedback-component.component';


interface Item {
  id: number;
  tipo: string;
  categoria: string;
  categoria_id: number;
  valor: number;
  tipo_id: string;
  data: Date;
  descricao: string;
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
    NgClass,
    ReportComponentComponent,
    FeedbackComponentComponent
  ],
  providers: [DatePipe ],
  templateUrl: './transacoes-component.component.html',
  styleUrl: './transacoes-component.component.css',

})
export class TransacoesComponentComponent implements OnInit {



  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private datePipe: DatePipe,
    private router: Router,

  ) {}


  data: any;
  tipoFiltro: string = '';
  valorFiltro: number | null = null;
  dataInicioFiltro: string | null = null;
  dataFimFiltro: string | null = null;
  databack: string ='';
  infoEdit: any
  isEditMode: boolean = false; // Modo de criação será o padrão
  isEditModalOpen: boolean = false; // Para abrir/fechar o modal
  selectedItem: Item | null = null; // Item selecionado para edição
  items: Item[] = [];
  idTransacao: any
  formDescricao : any
  formData: any
  formCategoria: any
  iffeedback1: boolean = false
  iffeedback2: boolean = false
  categorias :any;
  formValor: any
  selected: string | null = null;
  successMessage: string | string[] = '';
  errorMessage: string | string[] = '';

  async ngOnInit(): Promise<void> {
    const now = new Date();
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    this.dataInicioFiltro = firstDayOfMonth.toISOString().split('T')[0];
      this.dataFimFiltro = lastDayOfMonth.toISOString().split('T')[0];
    this.date();
    await this.fetchData();

  }

  async fetchData(): Promise<void> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
      'X-Requested-With': 'XMLHttpRequest'
    });

    try {

      const response: any = await firstValueFrom(this.http.get(`${environment.apiUrl}/api/Transacoes`, { headers }));
      const responseCategoria: any = await firstValueFrom(this.http.get(`${environment.apiUrl}/api/categorias`, { headers }));
      this.items = response.data;
      this.categorias = responseCategoria.data;
    } catch (error) {
      this.router.navigate(['/']).then(() => {
        setTimeout(() => {
          window.location.reload();
        }, 100);
      });
      console.error('Erro ao carregar dados:', error);
    }
  }

  async deletData({id}: { id: any }): Promise<void> {
    const token = this.authService.getToken();

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
      'X-Requested-With': 'XMLHttpRequest'
    });
    try {
      const response: any = await firstValueFrom(this.http.delete(`${environment.apiUrl}/api/deleteTransacoes/${id}`, { headers }));
      this.items = response.data;
      // window.location.reload();
      this.fetchData();
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    }
  }


  onSubmit({rota}: { rota: any }) {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
      'X-Requested-With': 'XMLHttpRequest'
    });

    const dadosFormulario = {
      valor: this.formValor,
      data: this.formData,
      tipo_id: this.selected,
      categoria_id: this.formCategoria,
      descricao: this.formDescricao
    };

    this.http.post(`${environment.apiUrl}/api/${rota}`, dadosFormulario, { headers })
      .subscribe(
        (response: any) => {
          this.iffeedback1 = true;
          this.successMessage = 'Transação criada com sucesso!!';
          setTimeout(() => {
            this.successMessage = '';
            this.iffeedback1 = false;
          }, 6000);
          this.fetchData()
        },
        error => {
          if (error.error && error.error.errors) {
            this.errorMessage = Object.values(error.error.errors).flat() as string[];
          } else if (error.error && error.error.message) {
            this.errorMessage = [error.error.message];
          } else {
            this.errorMessage = ['Ocorreu um erro inesperado'];
          }
          this.iffeedback2 = true;
          this.successMessage = '';
          setTimeout(() => {
            this.errorMessage = '';
            this.iffeedback2 = false;
          }, 6000);
        }
      );
  }
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.closeEditModal();
    }
  }

  trackById(index: number, item: any): number {
    return item.id;
  }

  toggleSelection(option: string) {
    // Altera a seleção
    this.selected = this.selected === option ? null : option;
  }

  deleteItem(id: number): void {
    this.items = this.items.filter(item => item.id !== id);
    this.deletData({id:id})
  }

  get selectedItemCategoria(): number {
    // Retorna o id da categoria ou um valor padrão (0, por exemplo) se for null
    return this.formCategoria;
  }


  set selectedItemCategoria(value: number) {
    if (!this.selectedItem) {
      this.formCategoria = value;
    }
  }

  get selectedItemValor(): number | null {
    return this.formValor;
  }

  set selectedItemValor(value: number | null) {
    if (!this.selectedItem ) {
      this.formValor = value;
    }
  }

  get selectedItemData() {
    return this.formData;
  }

  set selectedItemData(value: Date | null) {
    if (!this.selectedItem) {
      this.formData = value!;
    }
  }

  set selectedItemDescricao(value: string) {
    if (!this.selectedItem) {
      this.formDescricao = value!;
    }
  }

  get selectedItemDescricao() {
    return this.formDescricao
  }

  buttonCreateEdit(){

    if (!this.isEditMode ){
      this.onSubmit({rota: 'createTransacoes'})
    }else if (this.isEditMode){
      this.onSubmit({rota: `updateTransacoes/${this.idTransacao}`})
    }
  }

  openCreateModal(): void {
    this.isEditMode = false;
    this.selectedItem = null;
    this.isEditModalOpen = true;
  }

  openEditModal(item: Item): void {
    console.log(item)
    this.isEditMode = true;
    this.infoEdit = { ...item };
    this.formDescricao = item.descricao
    this.formValor = item.valor
    this.formData = item.data
    this.selected = item.tipo_id
    this.idTransacao = item.id
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

  createTransaction(): void {
    if (this.selectedItem) {
      this.items.push(this.selectedItem);
      this.closeEditModal();
    }
  }

  closeEditModal(): void {
    this.isEditModalOpen = false;
    this.selectedItem = null;
  }

  date(){
    this.databack = this.datePipe.transform(this.dataInicioFiltro, 'dd/MM/yyyy') + ' - ' + this.datePipe.transform(this.dataFimFiltro, 'dd/MM/yyyy');
  }

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
      this.date();
      return matchesTipo && matchesValor && matchesData;
    });
  }
}
