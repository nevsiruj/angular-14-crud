import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from '../../_services/cliente.service';

@Component({
  selector: 'app-addedit',
  templateUrl: './create-cliente.component.html',
  styleUrls: ['./create-cliente.component.css'],
})
export class AddeditComponent implements OnInit {
  formadd!: FormGroup;
  id!: string;
  loading = false;
  submitted = false;
  btnText: string = 'Guardar';
  title: string = 'Nuevo Cliente';

  constructor(
    private formBuilder: FormBuilder,
    private clienteService: ClienteService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    if (this.id != undefined) {
      this.loadData();
      this.btnText = 'Actualizar';
      this.title = 'Editar Cliente';
    }

    this.formadd = this.formBuilder.group({
      id: '',
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      direccion: ['', Validators.required],
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.formadd.controls;
  }

  loadData() {
    this.clienteService
      .getById(this.id)
      .subscribe((x) => this.formadd.patchValue(x));
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.formadd.invalid) {
      return;
    }

    this.loading = true;

    if (this.id != undefined) {
      this.clienteService
        .update(this.id, this.formadd.value)
        .subscribe((data) => {
          this.btnCancel();
        });
    } else {
      this.clienteService.create(this.formadd.value).subscribe((data) => {
        this.btnCancel();
      });
    }
  }

  btnCancel() {
    this.router.navigate(['']);
  }
}
