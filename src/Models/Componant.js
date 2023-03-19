export class Componant {
    static id = 1
    constructor(Name){
        this.id = Componant.id++
        this.Name=Name
        
    }
    print(){return {
        Name : this.Name,
        Object : this
    }}
    configure(configuration = {}){
        let keys = Object.keys(configuration) 
        if (keys.length) 
            keys.map(key=>{
                try {
                    this[key] = configuration[key]
                }
                catch(e){}
        })
    }
    
}