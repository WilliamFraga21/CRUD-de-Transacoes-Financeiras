import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransacoesComponentComponent } from './transacoes-component.component';

describe('TransacoesComponentComponent', () => {
  let component: TransacoesComponentComponent;
  let fixture: ComponentFixture<TransacoesComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransacoesComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransacoesComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
