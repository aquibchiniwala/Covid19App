export class District {
    name: string;
    totalCases: string;
    activeCases: string;
    recoveredCases: string;
    deathCases: string

    constructor(name:string,totalCases:string,activeCases:string,recoveredCases:string,deathCases:string){
        this.name=name;
        this.totalCases=totalCases;
        this.activeCases=activeCases;
        this.recoveredCases=recoveredCases;
        this.deathCases=deathCases;
    }
}
