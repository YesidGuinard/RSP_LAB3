"use strict";
var RSP2;
(function (RSP2) {
    class App {
        static showFormAlta() {
            let sexo = document.getElementById("selSexo");
            document.getElementById("header2").textContent = "Alta Persona";
            document.getElementById("btnAgregar").textContent = "Guardar";
            sexo.value = RSP2.Sexo.femenino;
            App.resetValuesForm();
        }
        static resetValuesForm() {
            let id = document.getElementById('txtId');
            let nombre = document.getElementById('txtNombre');
            let apellido = document.getElementById("txtApellido");
            let edad = document.getElementById("txtEdad");
            let sexo = document.getElementById("selSexo");
            id.value = "";
            nombre.value = "";
            nombre.className = "sinError";
            apellido.value = "";
            apellido.className = "sinError";
            edad.valueAsNumber = 0;
            edad.className = "sinError";
            sexo.value = RSP2.Sexo.femenino;
        }
        static getAndValidateInputValues() {
            let isValid = true;
            let idTxt = document.getElementById("txtId");
            let id = Number(idTxt.value);
            let nombreTxt = document.getElementById("txtNombre");
            let nombre = String(nombreTxt.value);
            let apellidoTxt = document.getElementById("txtApellido");
            let apellido = String(apellidoTxt.value);
            let edadTxt = document.getElementById("txtEdad");
            let edad = Number(edadTxt.valueAsNumber);
            let sexOpt = document.getElementById("selSexo").value;
            let sexo = RSP2.Sexo.masculino;
            if (sexOpt == "Femenino")
                sexo = RSP2.Sexo.femenino;
            if (nombre.length < 3) {
                nombreTxt.className = "error";
                isValid = false;
            }
            else {
                nombreTxt.className = "sinError";
            }
            if (apellido.length < 3) {
                apellidoTxt.className = "error";
                isValid = false;
            }
            else {
                apellidoTxt.className = "sinError";
            }
            if (isNaN(edad)) {
                edadTxt.className = "error";
                isValid = false;
            }
            else if (edad < 1 || edad > 150) {
                edadTxt.className = "error";
                isValid = false;
            }
            else {
                edadTxt.className = "sinError";
            }
            if (isValid) {
                let persona;
                let btnValGuardar = document.getElementById("btnAgregar").textContent == "Guardar";
                persona = new RSP2.Cliente(App.buscarId(), nombre, apellido, edad, sexo);
                if (btnValGuardar) {
                    App.LocalStorage(persona);
                }
                else {
                    persona.setId(id);
                    App.LocalStorage(persona, true, id);
                    App.showFormAlta();
                }
                // App.hideFormAlta();
                App.filtrosEvent();
            }
            else {
                alert("Por favor Ingresar Valores Validos");
            }
        }
        static mockVehiculos() {
            let hombres = ["Juan", "Matias", "Gaston", "Pedro"];
            let mujeres = ["Macarena", "Claudia", "Lorena", "Mercedez"];
            let apellidos = ["Escuer", "Sarmiento", "Belgrano", "Fernandez", "Peron", "Bolivar", "Lopez", "Ramos"];
            for (let i = 0; i < 2; i++) {
                let hombre = new RSP2.Cliente(App.buscarId(), hombres[App.rnd(0, 3)], apellidos[App.rnd(0, 7)], App.rnd(16, 80), RSP2.Sexo.masculino);
                App.LocalStorage(hombre);
                let mujer = new RSP2.Cliente(App.buscarId(), mujeres[App.rnd(0, 3)], apellidos[App.rnd(0, 7)], App.rnd(18, 80), RSP2.Sexo.femenino);
                App.LocalStorage(mujer);
            }
            App.filtrosEvent();
        }
        static rnd(min, max) {
            return Math.floor(Math.random() * (max - min)) + min;
        }
        static Onload() {
            // set tipo en Opciones Select con Enum
            App.setTipoSelect();
            if (localStorage.getItem("listaLS")) {
                App.personas = App.LocalStorageToListaPersonas();
            }
            document.getElementById("selSexoFiltro").addEventListener("change", (e) => App.filtrosEvent());
            document.getElementById("txtNombreFilter").addEventListener("keyup", (e) => App.filtrosEvent());
            document.getElementById("mostrarID").addEventListener("click", (e) => App.filtrosEvent());
            document.getElementById("mostrarNombre").addEventListener("click", (e) => App.filtrosEvent());
            document.getElementById("mostrarApellido").addEventListener("click", (e) => App.filtrosEvent());
            document.getElementById("mostrarEdad").addEventListener("click", (e) => App.filtrosEvent());
            document.getElementById("mostrarSexo").addEventListener("click", (e) => App.filtrosEvent());
            document.getElementById("mostrarAccion").addEventListener("click", (e) => App.filtrosEvent());
            App.filtrosEvent();
        }
        static setTipoSelect() {
            let select = document.getElementById("selSexo");
            let opcion1 = document.createElement("option");
            opcion1.setAttribute("value", Sexo.femenino);
            opcion1.textContent = Sexo.femenino;
            let opcion2 = document.createElement("option");
            opcion2.setAttribute("value", Sexo.masculino);
            opcion2.textContent = Sexo.masculino;
            select.appendChild(opcion1);
            select.appendChild(opcion2);
        }
        static filtrarBySexo(sexo) {
            console.log("sexo antes filter", sexo);
            if (sexo === RSP2.Sexo.todos) {
                return App.personas;
            }
            else {
                let listAux = App.personas.filter(function (persona) {
                    if (persona.getSexo() == sexo) {
                        console.log("sexo inside filter", sexo);
                        return true;
                    }
                });
                return listAux;
            }
        }
        static clearStorage() {
            localStorage.clear();
            App.personas.length = 0;
            document.getElementById("mockLoad").hidden = false;
            App.filtrosEvent();
        }
        static filtrarByNombre(listaLS) {
            let filtro = document.getElementById("txtNombreFilter").value;
            let arrayFiltrado = listaLS.filter(function (persona) {
                if (persona.getNombre().toLowerCase().match("^" + filtro.toLowerCase() + "[a-zA-Z\s]*")) {
                    return true;
                }
                return false;
            });
            return arrayFiltrado;
        }
        static CalcularPromedio(result, rechazado) {
            let listaFiltrada = App.obtenerListaFiltrada();
            let Acumulador = listaFiltrada.reduce(function (total, persona, i, array) {
                return total += persona.getEdad();
            }, 0);
            let promedio = 0;
            if (listaFiltrada.length > 0) {
                promedio = Acumulador / listaFiltrada.length;
                result(promedio);
            }
            else {
                rechazado("No hay Personas en la lista");
            }
        }
        static promedioPro() {
            let promesaPromedio = new Promise(App.CalcularPromedio);
            promesaPromedio.then((respuestaObtenida) => {
                alert("El promedio es: " + respuestaObtenida);
            }).catch((error) => {
                alert("Mjs: " + error);
            });
        }
        static filtrosEvent() {
            let arrayChecks = Array.from(document.getElementsByClassName("chk"));
            let chkTrue = arrayChecks.filter(function (chkbox) {
                return chkbox.checked == true;
            });
            let chkTrueValues = chkTrue.map(function (element) {
                return element.value;
            });
            let header = App.createHeaderTable(chkTrueValues);
            let tabla = document.getElementById("tabla");
            let listaFinal = App.obtenerListaFiltrada();
            let tablaNew = App.createTable(chkTrueValues, listaFinal);
            let parentTable = tabla.parentNode;
            parentTable.removeChild(tabla);
            parentTable.appendChild(tablaNew);
        }
        static btnCancelar() {
            App.resetValuesForm();
            document.getElementById("btnAgregar").textContent = "Guardar";
            document.getElementById("header2").textContent = "Alta Persona";
        }
        static obtenerListaFiltrada() {
            let sexoOpt = document.getElementById("selSexoFiltro").value;
            let sexo;
            if (sexoOpt == "Femenino") {
                sexo = RSP2.Sexo.femenino;
            }
            else if (sexoOpt == "Masculino") {
                sexo = RSP2.Sexo.masculino;
            }
            else {
                sexo = RSP2.Sexo.todos;
            }
            let listaFitradaByTipo = App.filtrarBySexo(sexo);
            let listaFinal = App.filtrarByNombre(listaFitradaByTipo);
            return listaFinal;
        }
        static buscarId() {
            let IDMasAlto = App.personas.reduce(function (IDMasAlto, persona, i, array) {
                if (persona.getId() > IDMasAlto) {
                    IDMasAlto = persona.getId();
                }
                return IDMasAlto;
            }, 0);
            return IDMasAlto + 1;
        }
        static createTable(chk, personasFtd) {
            let table = document.createElement("table");
            table.id = "tabla";
            table.appendChild(App.createHeaderTable(chk));
            personasFtd.forEach(function (persona) {
                let rowVh = App.createRowTable(chk, persona);
                table.appendChild(rowVh);
            });
            return table;
        }
        static createHeaderTable(chk) {
            let head = document.createElement("thead");
            chk.forEach(function (value) {
                let aux = document.createElement("th");
                aux.appendChild(document.createTextNode(value));
                head.appendChild(aux);
            });
            return head;
        }
        static createRowTable(chk, persona) {
            let row = document.createElement("tr");
            chk.forEach(function (value) {
                let cell = document.createElement("td");
                if (value != "Accion") {
                    cell.appendChild(document.createTextNode(persona.getProperty(value)));
                }
                else if (value == "Accion") {
                    let btnEdit = document.createElement('button');
                    btnEdit.textContent = "Editar";
                    btnEdit.className = "btn btn-outline-secondary";
                    btnEdit.addEventListener("click", (e) => App.Editar(persona.getId()));
                    let btnDel = document.createElement('button');
                    btnDel.textContent = "Eliminar";
                    btnDel.className = "btn btn-outline-secondary";
                    btnDel.addEventListener("click", (e) => App.Borrar(persona.getId()));
                    cell.appendChild(btnEdit);
                    cell.appendChild(btnDel);
                }
                row.appendChild(cell);
            });
            return row;
        }
        static LocalStorage(persona, edita, id) {
            if (edita == true && id) {
                if (App.findPersonaById(id) != undefined) {
                    let indiceArray = App.findIndexVhArray(App.findPersonaById(id));
                    App.personas[indiceArray] = persona;
                }
            }
            else {
                if (localStorage.getItem("listaLS") === null) {
                    App.personas.push(persona);
                }
                else {
                    App.personas = App.LocalStorageToListaPersonas();
                    App.personas.push(persona);
                }
            }
            localStorage.setItem('listaLS', JSON.stringify(App.personas));
        }
        static LocalStorageToListaPersonas() {
            let toParse = localStorage.getItem('listaLS');
            let response = JSON.parse(toParse);
            let listaResponse = new Array();
            for (let vh of response) {
                if (vh['edad']) {
                    let cliente = new RSP2.Cliente(vh['id'], vh['nombre'], vh['apellido'], vh['edad'], vh['sexo']);
                    listaResponse.push(cliente);
                }
            }
            return listaResponse;
        }
        static Borrar(id) {
            if (App.findPersonaById(id) != undefined) {
                let indice = App.findIndexVhArray(App.findPersonaById(id));
                App.personas.splice(indice, 1);
                localStorage.setItem("listaLS", JSON.stringify(App.personas));
                App.showFormAlta();
                App.filtrosEvent();
            }
            else {
                alert("Error no se puede Borrar Persona id: " + id);
            }
        }
        static Editar(id) {
            if (App.findPersonaById(id) != undefined) {
                let persona = App.findPersonaById(id);
                App.showFormAlta();
                document.getElementById("header2").textContent = "Modificar Persona";
                document.getElementById("btnAgregar").textContent = "Modificar";
                document.getElementById("txtId").value = persona.getId().toString();
                document.getElementById("txtNombre").value = persona.getNombre();
                document.getElementById("txtApellido").value = persona.getApellido();
                document.getElementById("txtEdad").value = persona.getEdad().toString();
                document.getElementById("selSexo").value = persona.getSexo();
                App.filtrosEvent();
            }
        }
        static findIndexVhArray(persona) {
            return App.personas.indexOf(persona);
        }
        static findPersonaById(id) {
            return App.personas.filter(persona => persona.getId() === id)[0];
        }
    }
    App.personas = new Array();
    RSP2.App = App;
    let Sexo;
    (function (Sexo) {
        Sexo["masculino"] = "Masculino";
        Sexo["femenino"] = "Femenino";
        Sexo["todos"] = "Todos";
    })(Sexo = RSP2.Sexo || (RSP2.Sexo = {}));
    document.addEventListener("DOMContentLoaded", (e) => App.Onload());
})(RSP2 || (RSP2 = {}));
//# sourceMappingURL=App.js.map