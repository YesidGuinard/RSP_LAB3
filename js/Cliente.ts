namespace RSP2 {
    export class Cliente extends Persona {
        private edad: number;
        private sexo:Sexo;

        constructor(id: number, nombre: string, apellido: string, edad: number, sexo: RSP2.Sexo) {
            super(id, nombre, apellido);
            this.edad = edad;
            this.sexo = sexo;
        }

        public getEdad(): number {
            return this.edad;
        }

        public setEdad(edad: number) {
            return this.edad;
        }

        public setSexo(sexo:Sexo){
            this.sexo=sexo;
        }

        public getSexo():Sexo{
            return this.sexo;
        }



    }


}