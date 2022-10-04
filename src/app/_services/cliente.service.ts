import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../_environment/environment';
import { Cliente } from '../_models/cliente';

const baseUrl = environment.apiUrl + '/clientes';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    }),
    responseType: 'text' as 'json',
  };

  getAll() {
    return this.http.get<Cliente[]>(baseUrl);
  }

  getById(id: string) {
    return this.http.get<Cliente>(`${baseUrl}/${id}`);
  }

  create(params: any) {
    return this.http.post(baseUrl, params);
  }

  // update(params: any) {
  //   return this.http.put(`${baseUrl}`, params, this.httpOptions);
  // }

  update(id: string, params: any) {
    return this.http.put(`${baseUrl}/${id}`, params);
  }

  delete(id: string) {
    return this.http.delete(`${baseUrl}/${id}`, this.httpOptions);
  }
}
