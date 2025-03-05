export default class Cpf {
    private _cpf: string;
    private readonly FIRST_DIGIT_FACTOR = 11;
    private readonly SECOND_DIGIT_FACTOR = 12;

    constructor(cpf: string) {
        this._cpf = cpf.replace(/[\.\-\s]/g, '');
        if (!this._cpf || this._cpf.length !== 11) throw Error('Cpf length has to be equals 11 characters');
        if (/^(\d)\1+$/.test(this._cpf)) throw Error('Cpf needs to have no repeated numbers');
    }

    private verificateDigit(cpf: string, digitFactor: number) {
        let digitoCpf;
        let digit = 0;
        for (let nCount = 1; nCount < cpf.length -1; nCount++) {  
            digitoCpf = parseInt(cpf.substring(nCount -1, nCount));  							
            digit = digit + ( digitFactor - nCount ) * digitoCpf;
        };
    
        return digit;
    }

    private calculateFirstVerificationDigit(verificationDigit: number) {
        let rest = (verificationDigit % 11);
    
        return (rest < 2) ? 0 : 11 - rest;
    }

    private calculateSecondVerificationDigit(firstVerificationDigit: number, verificationSecondDigit: number) {
        let secondVerificationDigit = 0;
        verificationSecondDigit += 2 * firstVerificationDigit;  
        let rest = (verificationSecondDigit % 11);  
        if (rest < 2)  
            secondVerificationDigit = 0;  
        else  
            secondVerificationDigit = 11 - rest;
    
        return secondVerificationDigit;
    }

    validate() {
        try{
            let verificationFirstDigit = this.verificateDigit(this._cpf || '', this.FIRST_DIGIT_FACTOR);
            let verificationSecondDigit = this.verificateDigit(this._cpf || '', this.SECOND_DIGIT_FACTOR);
    
            let firstVerificationDigit = this.calculateFirstVerificationDigit(verificationFirstDigit);
            let secondVerificationDigit = this.calculateSecondVerificationDigit(firstVerificationDigit, verificationSecondDigit);
    
            return this._cpf.endsWith(`${firstVerificationDigit}${secondVerificationDigit}`);
        }catch (e){
            console.error("Erro !"+e);  
            return false;
        }
    }
}