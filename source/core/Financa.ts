export class Financa {
    constructor(public valor: number) {}

    public validar(): boolean {
        switch (true) {
            case isNaN(this.valor):
            case this.valor <= 0:
                return false;
            default:
                return true;
        }
    }
}
