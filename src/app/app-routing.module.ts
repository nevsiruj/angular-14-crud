import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddeditComponent } from './components/create-cliente/create-cliente.component';
import { ListComponent } from './components/list-clientes/list-clientes.component';

const routes: Routes = [
  { path: '', component: ListComponent },
  { path: 'cliente/add', component: AddeditComponent },
  { path: 'cliente/edit/:id', component: AddeditComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
