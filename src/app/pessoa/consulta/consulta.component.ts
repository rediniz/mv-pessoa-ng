import { Component, OnInit } from '@angular/core';
 
import {Router} from '@angular/router';
 
import {PessoaService} from '../../services/pessoa.service';
 
import {Pessoa} from '../../services/pessoa';
 
import {Response} from '../../services/response';
 
@Component({
    selector: 'app-consulta-pessoa',
    templateUrl: './consulta.component.html',
    styleUrls:["./consulta.component.css"]
  })
  export class ConsultaComponent implements OnInit {
 
    private pessoas: Pessoa[] = new Array();
    private titulo:string;
 
    constructor(private pessoaService: PessoaService,
                private router: Router){}
 
    ngOnInit() {
 
      /*SETA O TÍTULO */
      this.titulo = "Consulta de pessoas";
 
      /*CHAMA O SERVIÇO E RETORNA TODAS AS PESSOAS CADASTRADAS */
      this.pessoaService.getPessoas(null, null).subscribe(res => this.pessoas = res);
    }
 
    /**EXCLUI UM REGISTRO QUANDO CLICAMOS NA OPÇÃO EXCLUIR DE UMA 
     * LINHA DA TABELA*/
    excluir(id:number, index:number):void {
 
      if(confirm("Deseja realmente excluir esse registro?")){
 
        /*CHAMA O SERVIÇO PARA REALIZAR A EXCLUSÃO */
        this.pessoaService.excluirPessoa(id).subscribe(response => {
 
              /**PEGA O RESPONSE DO SERVIÇO */
              let res:Response = <Response>response;
 
              /*1 = SUCESSO
              * MOSTRAMOS A MENSAGEM RETORNADA PELO SERVIÇO E DEPOIS REMOVEMOS
              O REGISTRO DA TABELA HTML*/
              if(res.codigo == 1){
                alert(res.mensagem);
                this.pessoas.splice(index,1);
              }
              else{
                /*0 = EXCEPTION GERADA NO SERVIÇO JAVA */
                alert(res.mensagem);
              }
          },
          (erro) => {                    
               /*MOSTRA ERROS NÃO TRATADOS */
               alert(erro);
          });        
      }
 
    }
 
    editar(id:number):void{
 
      this.router.navigate(['/cadastro-pessoa',id]);
 
    }
  
    pesquisar(nome: string, cpf: string):void {
      this.pessoaService.getPessoas(nome, cpf).subscribe(res => this.pessoas = res);
      console.log("teste");
    }
 
  }

