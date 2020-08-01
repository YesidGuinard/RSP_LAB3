"use strict";
var RSP2;
(function (RSP2) {
    class Persona {
        constructor(id, nombre, apellido) {
            this.id = id;
            this.nombre = nombre;
            this.apellido = apellido;
        }
        getId() {
            return this.id;
        }
        setId(id) {
            this.id = id;
        }
        getNombre() {
            return this.nombre;
        }
        setNombre(nombre) {
            this.nombre = nombre;
        }
        getApellido() {
            return this.apellido;
        }
        setApellido(apellido) {
            this.apellido = apellido;
        }
        getProperty(prop) {
            let property = "";
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
                case "edad":
                    if (this instanceof RSP2.Cliente) {
                        property = this.getEdad().toString();
                    }
                    break;
                case "sexo":
                    if (this instanceof RSP2.Cliente) {
                        property = this.getSexo().toString();
                    }
                    break;
            }
            return property;
        }
    }
    RSP2.Persona = Persona;
})(RSP2 || (RSP2 = {}));
//# sourceMappingURL=Persona.js.map