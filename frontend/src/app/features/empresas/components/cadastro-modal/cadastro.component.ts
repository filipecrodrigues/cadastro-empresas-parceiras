import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Empresa } from '../../models/empresa.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmpresaService } from '../../services/empresa.service';


@Component({
  selector: 'app-cadastro',
  imports: [
    CommonModule,
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {
  form!: FormGroup;

  // Se você passar uma empresa para editar
  @Input() empresaEditar?: Empresa;

  constructor(private fb: FormBuilder, private empresaService: EmpresaService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      cnpj: ['', Validators.required],
      razaoSocial: ['', Validators.required],
      nomeFantasia: ['', Validators.required],
      atividadeEconomica: ['', Validators.required],
      endereco: ['', Validators.required],
      telefone: ['', Validators.required]
    });

    // Se existe uma empresa para edição, preenche o formulário
    if (this.empresaEditar) {
      this.form.patchValue(this.empresaEditar);
    }
  }

  // Salvar nova empresa
  salvar(): void {
    if (this.form.valid) {
      const empresa: Empresa = this.form.value;
      this.empresaService.criar(empresa).subscribe({
        next: () => {
          console.log('Empresa cadastrada com sucesso!');
          this.form.reset();
        },
        error: (err) => console.error('Erro ao cadastrar empresa', err)
      });
    } else {
      this.form.markAllAsTouched();
    }
  }

  // Atualizar empresa existente
  atualizar(): void {
    if (!this.empresaEditar) return;
    if (this.form.valid) {
      const empresa: Empresa = this.form.value;
      this.empresaService.atualizar(this.empresaEditar.id!, empresa).subscribe({
        next: () => console.log('Empresa atualizada com sucesso!'),
        error: (err) => console.error('Erro ao atualizar empresa', err)
      });
    } else {
      this.form.markAllAsTouched();
    }
  }

  // Cancelar e limpar formulário
  cancelar(): void {
    this.form.reset();
  }
}