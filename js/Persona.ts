namespace RSP2 {
    export class Persona {
        protected id: number;
        protected nombre: string;
        protected apellido: string;


        constructor(id: number, nombre: string, apellido: string) {
            this.id = id;
            this.nombre = nombre;
            this.apellido = apellido;

        }

        public getId(): number {
            return this.id;
        }

        public setId(id: number) {
            this.id = id;
        }

        public getNombre(): string {
            return this.nombre;
        }

        public setNombre(nombre: string): void {
            this.nombre = nombre;
        }

        public getApellido(): string {
            return this.apellido;
        }

        public setApellido(apellido: string): void {
            this.apellido = apellido;
        }


        public getProperty(prop: string): string {
            let property: string = "";
            switch (prop.toLowerCase()) {
                case "id":
                    property = this.getId().toString();
                    break;
                case "nombre":
                    property = this.getNombre();
                    break;
                case "apellido":
                    property = this.getApellido();
                    break;

                case "Edad":
                    if (this instanceof Cliente) {
                        property = this.getEdad().toString();
                    }
                    break;

                case "Sexo":
                    if (this instanceof Cliente) {
                        property = this.getSexo().toString()
                    }
                    ;
                    break;
            }
            return property;
        }

    }
}