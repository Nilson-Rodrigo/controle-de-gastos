export class Financa {
    constructor(public valor: number) { }

    public validar(): boolean {
        if((isNaN(this.valor)) && (this.valor <= 0)){
            return false;
        }
        return true;
    }
}
