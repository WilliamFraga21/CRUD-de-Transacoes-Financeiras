import {Component, HostListener, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CurrencyPipe, DatePipe, NgClass, NgForOf, NgIf} from '@angular/common';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from '../../_services/auth.service';
import {environment} from '../../../environments/environment';
import {ReportComponentComponent} from '../report-component/report-component.component';
import {firstValueFrom} from 'rxjs';



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
    ReportComponentComponent
  ],
  providers: [DatePipe ],
  templateUrl: './transacoes-component.component.html',
  styleUrl: './transacoes-component.component.css',

})
export class TransacoesComponentComponent implements OnInit {



  data: any; // Variável para armazenar a resposta do backend
  formattedDates: string = ''; // or a default value like ''

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private datePipe: DatePipe
  ) {


  }

  async ngOnInit(): Promise<void> {
    const now = new Date();
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    // Converte para formato ISO sem hora (YYYY-MM-DD)
    this.dataInicioFiltro = firstDayOfMonth.toISOString().split('T')[0];
      this.dataFimFiltro = lastDayOfMonth.toISOString().split('T')[0];
    this.date();
    await this.fetchData();

  }


  trackById(index: number, item: any): number {
    return item.id; // ou outro identificador único do item
  }





  categorias :any;



  async fetchData(): Promise<void> {
    const token = this.authService.getToken(); // Recupera o token do AuthService

    // Configura os cabeçalhos com o token e outras informações
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
      'X-Requested-With': 'XMLHttpRequest'
    });

    try {
      // Faz a requisição GET para o endpoint desejado
      const response: any = await firstValueFrom(this.http.get(`${environment.apiUrl}/api/Transacoes`, { headers }));
      const responseCategoria: any = await firstValueFrom(this.http.get(`${environment.apiUrl}/api/categorias`, { headers }));

      this.items = response.data; // Armazena a resposta no componente
      this.categorias = responseCategoria.data; // Armazena a resposta no componente
      console.log('Resposta do backend:', response);

    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    }
  }


  onSubmit({rota}: { rota: any }) {
    const token = this.authService.getToken();


    console.log(rota);


    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
      'X-Requested-With': 'XMLHttpRequest'
    });



    const dadosFormulario = {
      valor: this.formValor,
      data: this.formData,  // Usando a data atual, pode alterar conforme necessário
      tipo_id: this.selected,  // Substitua pelo ID do tipo
      categoria_id: this.formCategoria,  // Substitua pelo ID da categoria
      descricao: this.formDescricao
    };

    this.http.post(`${environment.apiUrl}/api/${rota}`, dadosFormulario, { headers })
      .subscribe(
        (response: any) => {
          const token = response.access_token; // Ajuste isso de acordo com a estrutura da sua resposta
          this.authService.setToken(token); // Usar o serviço para armazenar o token
          console.log(localStorage.getItem('authToken'))
        },
        error => {
          console.error('Erro no login', error);
        }
      );


  }
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.closeEditModal();
    }
  }




  formValor: any



  selected: string | null = null; // Variável para armazenar a seleção atual

  toggleSelection(option: string) {
    // Altera a seleção
    this.selected = this.selected === option ? null : option;
  }





  deleteItem(id: number): void {
    this.items = this.items.filter(item => item.id !== id);
  }

  get selectedItemCategoria(): number {
    // Retorna o id da categoria ou um valor padrão (0, por exemplo) se for null
    return this.formCategoria;
  }

  formCategoria: any

  set selectedItemCategoria(value: number) {
    if (!this.selectedItem) {
      this.formCategoria = value;
    }
  }





  get selectedItemValor(): number | null {
    return this.formValor;
  }

  // Setter para definir o valor
  set selectedItemValor(value: number | null) {

    if (!this.selectedItem ) {

      // @ts-ignore
      this.formValor = value;  // Valor padrão 0 se for null
    }
  }


  formData: any


  get selectedItemData() {
    return this.formData;
  }

  set selectedItemData(value: Date | null) {
    if (!this.selectedItem) {
      this.formData = value!;
    }
  }


  formDescricao : any

  set selectedItemDescricao(value: string) {
    if (!this.selectedItem) {
      this.formDescricao = value!;
    }
  }

  get selectedItemDescricao() {
    return this.formDescricao
  }


  idTransacao: any

  buttonCreateEdit(){


    console.log('create')
    console.log(this.isEditMode)
    if (!this.isEditMode ){
      this.onSubmit({rota: 'createTransacoes'})
    }else if (this.isEditMode){
      this.onSubmit({rota: `updateTransacoes/${this.idTransacao}`})
    }



  }


  infoEdit: any
  isEditMode: boolean = false; // Modo de criação será o padrão
  isEditModalOpen: boolean = false; // Para abrir/fechar o modal
  selectedItem: Item | null = null; // Item selecionado para edição
  items: Item[] = [];

  // Abre o modal para criação
  openCreateModal(): void {
    this.isEditMode = false; // Define o modo como criação
    this.selectedItem = null; // Limpa a seleção
    this.isEditModalOpen = true; // Abre o modal
  }

  // Abre o modal para edição
  openEditModal(item: Item): void {
    console.log(item)
    this.isEditMode = true; // Define o modo como edição
    this.infoEdit = { ...item }; // Clona o item para edição
    this.formDescricao = item.descricao
    this.formValor = item.valor
    this.formData = item.data
    this.selected = item.tipo_id
    this.idTransacao = item.id
    this.isEditModalOpen = true; // Abre o modal
  }

  // Salva a edição
  saveEdit(): void {
    if (this.selectedItem) {
      const index = this.items.findIndex(item => item.id === this.selectedItem!.id);
      if (index > -1) {
        this.items[index] = this.selectedItem!;
      }
      this.closeEditModal();
    }
  }

  // Cria uma nova transação
  createTransaction(): void {
    if (this.selectedItem) {
      this.items.push(this.selectedItem); // Adiciona a nova transação
      this.closeEditModal();
    }
  }

  // Fecha o modal
  closeEditModal(): void {
    this.isEditModalOpen = false;
    this.selectedItem = null; // Limpa a seleção após fechar o modal
  }

  isCreateModalOpen:any
  newItem:any

  closeCreateModal(): void {
    this.isCreateModalOpen = false;
    this.newItem = { tipo: '', categoria: '', valor: 0, descricao: '' };  // Limpa os dados ao fechar o modal
  }


  async createItem(): Promise<void> {
    const token = this.authService.getToken();  // Recupera o token do AuthService

    // Configura os cabeçalhos com o token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
      'X-Requested-With': 'XMLHttpRequest'
    });

    // Envia a requisição POST para o backend
    try {
      const response: any = await firstValueFrom(this.http.post(`${environment.apiUrl}/api/Transacoes`, this.newItem, { headers }));

      // Após criar, você pode atualizar a lista de itens ou fazer outra lógica
      this.items.push(response.data);  // Atualiza a lista de transações com o novo item

      // Fecha o modal de criação
      this.closeCreateModal();
    } catch (error) {
      console.error('Erro ao criar item:', error);
    }
  }


  tipoFiltro: string = '';
  valorFiltro: number | null = null;
  dataInicioFiltro: string | null = null;
  dataFimFiltro: string | null = null;
  databack: string ='';



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
