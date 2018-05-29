export class ConfigService {
 
    private urlService:string;
 
    constructor(){
 
        // url do serviço REST criado com o SpringBoot
        this.urlService = 'http://10.1.1.61:8090';
    }
 
    getUrlService(): string {
 
        return this.urlService;
    }
 
}