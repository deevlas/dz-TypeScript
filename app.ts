class People {
    // weight: number;
    // height: number;
    constructor(public weight: number = 70, public height: number = 165) {
        this.weight = weight;
        this.height = height;
    }
}

class Deputat extends People {
    // id: number
    // surname: string
    // name: string
    // age: number
    // sumBribe: number
    // briber: boolean
    // maxTakedBribe: number

    constructor(public weight:number, public height: number, public mandatNumber: number,
                public surname: string, public name: string, public age: number,
                public sumBribe: number = 0, public maxTakedBribe: number,
                public briber: boolean) {
        super(weight, height);
            this.mandatNumber = mandatNumber;
            this.surname = surname;
            this.name = name;
            this.age = age;
            this.briber = briber;
            this.sumBribe = sumBribe;
            this.maxTakedBribe = maxTakedBribe;
    }

    givedBribe(sum){
        // let ret = false
        if (this.briber){
            // ret = true
            if(sum > this.maxTakedBribe * 2){
                if(Math.random() > 0.3) {
                    return false
                }
            } else {
                this.sumBribe += sum
                if(sum > this.maxTakedBribe){
                    this.maxTakedBribe = sum
                }
            }
        }
        return this.briber
    }

}

class groupDeputats {
    listDeputats: Deputat[] = [];

    addDeputat(Deputat: Deputat): void{
        this.listDeputats.push(Deputat)
    }

    deleteDeputat(Deputat: Deputat): void{
       this.listDeputats = this.listDeputats.filter(Dep => Dep.mandatNumber !== Deputat.mandatNumber)


    }

    deleteBribers(): void{
        this.listDeputats = this.listDeputats.filter(Dep => !Dep.briber)
    }

    maxBriber(): Deputat[]{

        let arrSumBribes = [];
        this.listDeputats.forEach(Dep => {
            if(Dep.sumBribe > 0){
                arrSumBribes.push(Dep.sumBribe)
            }
        })
        let maxBribe = Math.max(...arrSumBribes)
        return this.listDeputats.filter(Dep => Dep.sumBribe === maxBribe)
    }

    totalSumBribes(): number {
        let total = 0;
        this.listDeputats.forEach(Dep => total += Dep.sumBribe)
        return total
    }

    getAllDeputats(): Deputat[] {
        return this.listDeputats
    }

    removeAllDeputats(): Deputat[]{
        return this.listDeputats = []
    }

}
class Fraction extends groupDeputats{
    name: string = "";
    constructor(name: string) {
        super();
        this.name = name
    }
}

class VRada extends groupDeputats{
    listFraction: Fraction[] = [];

    addFraction(frac: Fraction): void{
        this.listFraction.push(frac)
    }

    deleteFraction(Fraction: Fraction): void{
        this.listFraction = this.listFraction.filter(fr => fr.name !== Fraction.name)
    }

    allFraction(Fractiom: Fraction): Fraction[]{
        return this.listFraction
    }

    getFraction(name): Deputat[]{
        let fr = this.findFraction(name)
        return fr.getAllDeputats()
    }

    addDepInFraction(name: string, Deputat: Deputat): void{
        let fr = this.findFraction(name)
        fr.addDeputat(Deputat)
    }


    deleteDepInFraction(name: string, Deputat: Deputat): void{
        let fr = this.findFraction(name)
        fr.deleteDeputat(Deputat)
    }

    findFraction(name: string): Fraction{
        return this.listFraction.find(Frac => Frac.name === name)
    }

    allBribersFraction(name: string): Deputat[]{
        let fr = this.findFraction(name)
        return fr.listDeputats
    }

    maxBriberInFraction(name: string): Deputat[]{
        let fr = this.findFraction(name)
        return fr.maxBriber()
    }

    // maxBriberInVR(): Deputat[]{
    //     let maxBr: Deputat[] = []
    //     this.listFraction.forEach(Frac =>
    //     {
    //        let rab = Frac.maxBriber()
    //         console.log(rab, "aaaaaaaaa");
    //         maxBr.push(rab)
    //
    //     })
    //     return
    //
    // }

}


// class Fraction {
//     listDeputats: Deputat[]
//     name: string
//     constructor(name: string) {
//         this.name = name
//     }
//     addDeputat(Deputat: Deputat): void{
//         this.listDeputats.push(Deputat)
//     }
    // deleteDeputat(Deputat: Deputat): void{
    //     this.listDeputats.filter()
    // }

// }

let dep1 = new Deputat(120, 150,1 , "Rukov", "Deny", 44, 0, 1000, true)
let dep2 = new Deputat(120, 150,2 , "Golod", "Dima", 44, 0, 1000, true)
let dep3 = new Deputat(200, 200,3 ,"Fruktov", "Frukt", 40, 0, 500, true)
let dep4 = new Deputat(130, 170,4 ,"Filip", "Filipov", 30, 0, 800, true)

let frac1 = new Fraction("Golos")
let frac2 = new Fraction("SN")
// console.log(frac1, "141");
// console.log(frac2, "142")
let group1 = new VRada()
let group2 = new groupDeputats()
// console.log(group1, "144")
group2.addDeputat(dep1)
group2.addDeputat(dep2)
group2.addDeputat(dep3)
group2.addDeputat(dep4)

group1.addDeputat(dep1)
group1.addDeputat(dep2)
group1.addDeputat(dep3)
group1.addDeputat(dep4)

dep1.givedBribe(200);
dep2.givedBribe(500);
dep3.givedBribe(600);
dep4.givedBribe(100);

// console.log(group2.maxBriber());

group1.addFraction(frac1)
group1.addFraction(frac2)

frac1.addDeputat(dep1)
frac1.addDeputat(dep2)
frac2.addDeputat(dep3)
frac2.addDeputat(dep4)
// group1.getFraction("SN")
// console.log(group1.getFraction("Golos"), "SN");
// console.log(group1.deleteDepInFraction("Golos", dep2));
// console.log(group1.addDepInFraction("Golos", dep4));
// console.log(group1.getFraction("Golos"), "Golos");
console.log(group1.allBribersFraction("Golos"), 196);
console.log(group1.maxBriberInFraction("Golos"), 217)
console.log(group1.maxBriber(), 218)


// group1.addFraction(frac1)
// group1.addFraction(frac2)

// group2.deleteDeputat(dep2)
// console.log(group2.listDeputats, 161)
// frac1.addDeputat(dep2)
//
// console.log(group1, "163");
// group1.deleteFraction(frac2)
// console.log(group1, 167);

// console.log(group1.removeAllDeputats());
