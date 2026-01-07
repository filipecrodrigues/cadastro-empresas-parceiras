import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { Empresa } from '../../models/empresa.model';
import { EmpresaService } from '../../services/empresa.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-consulta',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    FormsModule,
    MatInputModule
  ],
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.scss']
})
export class ConsultaComponent implements OnInit {
  empresas: Empresa[] = [];
  searchTerm: string = '';

  constructor(private empresaService: EmpresaService) {}

  ngOnInit(): void {
    this.carregarEmpresas();
  }

  // Carrega todas as empresas do backend
  carregarEmpresas(): void {
    this.empresaService.listar().subscribe({
      next: (dados) => this.empresas = dados,
      error: (err) => console.error('Erro ao carregar empresas', err)
    });
  }

  // Busca empresas pelo termo
  buscar(): void {
    if (!this.searchTerm) {
      this.carregarEmpresas();
      return;
    }

    const term = this.searchTerm.trim().toLowerCase();
    this.empresas = this.empresas.filter(emp =>
      emp.cnpj.toLowerCase().includes(term) ||
      emp.razaoSocial.toLowerCase().includes(term)
    );
  }

  // Editar empresa
  editar(id: number) {
    console.log('Editar empresa', id);
    // this.router.navigate(['/cadastro', id]); // se tiver roteamento
  }

  // Deletar empresa
  deletar(id: number) {
    if (!confirm('Deseja realmente deletar esta empresa?')) return;

    this.empresaService.deletar(id).subscribe({
      next: () => {
        console.log('Empresa deletada', id);
        this.carregarEmpresas();
      },
      error: (err) => console.error('Erro ao deletar', err)
    });
  }

  // Getter para filtrar dinamicamente (opcional)
  get empresasFiltradas() {
    if (!this.searchTerm) return this.empresas;
    const term = this.searchTerm.toLowerCase();
    return this.empresas.filter(emp =>
      emp.cnpj.toLowerCase().includes(term) ||
      emp.razaoSocial.toLowerCase().includes(term)
    );
  }
}
