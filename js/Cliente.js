"use strict";
var RSP2;
(function (RSP2) {
    class Cliente extends RSP2.Persona {
        constructor(id, nombre, apellido, edad, sexo) {
            super(id, nombre, apellido);
            this.edad = edad;
            this.sexo = sexo;
        }
        getEdad() {
            return this.edad;
        }
        setEdad(edad) {
            return this.edad;
        }
        setSexo(sexo) {
            this.sexo = sexo;
        }
        getSexo() {
            return this.sexo;
        }
    }
    RSP2.Cliente = Cliente;
})(RSP2 || (RSP2 = {}));
//# sourceMappingURL=Cliente.js.map