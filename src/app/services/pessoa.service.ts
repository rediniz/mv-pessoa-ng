import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Headers} from '@angular/http';
import { RequestOptions } from '@angular/http';
import { URLSearchParams } from '@angular/http';
 
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
 
import {Pessoa} from '../services/pessoa';
import {ConfigService} from './config.service';
 
@Injectable()
export class PessoaService {
 
    private baseUrlService:string = '';
    private headers:Headers;
    private options:RequestOptions;
 
    constructor(private http: Http,
                private configService: ConfigService) { 
 
        /**SETANDO A URL DO SERVIÇO REST QUE VAI SER ACESSADO */
        this.baseUrlService = configService.getUrlService() + '/api/pessoa/';
 
        /*ADICIONANDO O JSON NO HEADER */
        this.headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8' });                
        this.options = new RequestOptions({ headers: this.headers });
    }
 
    /**CONSULTA TODAS AS PESSOAS CADASTRADAS */
    getPessoas(nome: string, cpf: string) {    
        let params = new URLSearchParams();
        params.append("nome", nome);
        params.append("cpf", cpf);

        return this.http.get(this.baseUrlService, {search:params}).map(res => res.json());
    }
 
    /**ADICIONA UMA NOVA PESSOA */
    addPessoa(pessoa: Pessoa){
 
        return this.http.post(this.baseUrlService, JSON.stringify(pessoa),this.options)
        .map(res => res.json());
    }
    /**EXCLUI UMA PESSOA */
    excluirPessoa(id:number){
 
        return this.http.delete(this.baseUrlService + id).map(res => res.json());
    }
 
    /**CONSULTA UMA PESSOA PELO CÓDIGO */
    getPessoa(id:number){
 
        return this.http.get(this.baseUrlService + id).map(res => res.json());
    }
 
    /**ATUALIZA INFORMAÇÕES DA PESSOA */
    atualizarPessoa(pessoa:Pessoa){
 
        return this.http.put(this.baseUrlService + pessoa.id, JSON.stringify(pessoa),this.options)
        .map(res => res.json());
    }
 
}