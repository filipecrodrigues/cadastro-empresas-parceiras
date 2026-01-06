import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Empresa } from '../../models/empresa.model';
import { EmpresaService } from '../../services/empresa.service';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
  ],
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss'],
})
export class CadastroComponent implements OnInit {
  @Input() empresaEditar?: Empresa;

  empresa: Empresa = {
    cnpj: '',
    razaoSocial: '',
    nomeFantasia: '',
    atividadeEconomica: '',
    endereco: '',
    telefone: '',
  };

  constructor(
    private empresaService: EmpresaService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    if (this.empresaEditar) {
      this.empresa = { ...this.empresaEditar };
    }
  }

  salvar(): void {
    if (this.empresa.cnpj && this.empresa.razaoSocial) {
      this.empresaService.criar(this.empresa).subscribe({
        next: () => {
          this.snackBar.open('Empresa cadastrada com sucesso!', 'Fechar', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });

          this.cancelar();
        },
        error: () => {
          this.snackBar.open(
            'Erro ao cadastrar empresa. Tente novamente.',
            'Fechar',
            {
              duration: 5000,
              horizontalPosition: 'center',
              verticalPosition: 'top',
            }
          );
        },
      });
    }
  }

  cancelar(): void {
    this.empresa = {
      cnpj: '',
      razaoSocial: '',
      nomeFantasia: '',
      atividadeEconomica: '',
      endereco: '',
      telefone: '',
    };
  }
}
