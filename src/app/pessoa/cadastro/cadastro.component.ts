import { Component, OnInit } from '@angular/core';
 
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';
 
import {PessoaService} from '../../services/pessoa.service';
 
import { Pessoa } from '../../services/pessoa';
import { Telefone} from '../../services/telefone';
 
import {Response} from '../../services/response';
 
import { Observable } from 'rxjs/Observable';
 
@Component({
    selector: 'app-cadastro-pessoa',
    templateUrl: './cadastro.component.html',
    styleUrls:["./cadastro.component.css"]
  })
  export class CadastroComponent implements OnInit {
 
    private titulo:string;
    private pessoa: Pessoa = new Pessoa();
    private telefones: Telefone[];
 
    constructor(private pessoaService: PessoaService,
                private router: Router,
                private activatedRoute: ActivatedRoute){}
 
    /*CARREGADO NA INICIALIZAÇÃO DO COMPONENTE */
    ngOnInit() {
 
      this.activatedRoute.params.subscribe(parametro=>{
 
        if(parametro["id"] == undefined){
 
          this.titulo = "Cadastrar pessoa";
        }
        else{
 
          this.titulo = "Editar pessoa";
          this.pessoaService.getPessoa(Number(parametro["id"])).subscribe(res => this.pessoa = res);
        }
 
 
      });      
    }
  
    adicionarTelefone(ddd: string, numero: string) {
      this.pessoa.telefones.push({ id: null, ddd: ddd, numero: numero });
    }
  
    excluirTelefone(index: number) {
      if(confirm("Deseja excluir o telefone?")){
  
        this.pessoa.telefones.splice(index, 1);
        console.log(this.pessoa.telefones);
                
      }
    }
 
    /*FUNÇÃO PARA SALVAR UM NOVO REGISTRO OU ALTERAÇÃO EM UM REGISTRO EXISTENTE */
    salvar():void {
 
      /*SE NÃO TIVER CÓDIGO VAMOS INSERIR UM NOVO REGISTRO */
      if(this.pessoa.id == undefined){
 
        /*CHAMA O SERVIÇO PARA ADICIONAR UMA NOVA PESSOA */
        this.pessoaService.addPessoa(this.pessoa).subscribe(response => {
 
           //PEGA O RESPONSE DO RETORNO DO SERVIÇO
           let res:Response = <Response>response;
 
           /*SE RETORNOU 1 DEVEMOS MOSTRAR A MENSAGEM DE SUCESSO
           E LIMPAR O FORMULÁRIO PARA INSERIR UM NOVO REGISTRO*/
           alert("Dados salvos com sucesso.");
          this.pessoa = new Pessoa();
         },
         (erro) => {   
           /**AQUI VAMOS MOSTRAR OS ERROS NÃO TRATADOS
             EXEMPLO: SE APLICAÇÃO NÃO CONSEGUIR FAZER UMA REQUEST NA API                        */                 
            alert(erro);
         });
 
      }
      else{
 
        /*AQUI VAMOS ATUALIZAR AS INFORMAÇÕES DE UM REGISTRO EXISTENTE */
        this.pessoaService.atualizarPessoa(this.pessoa).subscribe(response => {
 
          let res: Response = <Response>response;
          alert("Dados editados com sucesso.");
          this.router.navigate(['/consulta-pessoa']);
       },
       (erro) => {                    
         /**AQUI VAMOS MOSTRAR OS ERROS NÃO TRATADOS
          EXEMPLO: SE APLICAÇÃO NÃO CONSEGUIR FAZER UMA REQUEST NA API                        */                 
          alert(erro);
       });
      }
 
    }
 
  }