import { Component, OnInit } from '@angular/core';

import { ClienteService } from '../../_services/cliente.service';
import { Cliente } from '../../_models/cliente';
import { first } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list-clientes.component.html',
  styleUrls: ['./list-clientes.component.css'],
})
export class ListComponent implements OnInit {
  clientes!: Cliente[];
  totalrow: number = 0;

  constructor(private clienteService: ClienteService) {}

  ngOnInit(): void {
    this.loadEmployee();
  }

  loadEmployee() {
    this.clienteService
      .getAll()
      .pipe(first())
      .subscribe((d) => {
        this.clientes = d;
        this.totalrow = d.length;
      });
  }

  delete(cliente: Cliente) {
    this.clienteService
      .delete(cliente.id)
      .pipe(first())
      .subscribe(() => {
        this.loadEmployee();
      });
  }
}
