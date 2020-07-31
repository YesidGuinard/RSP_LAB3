namespace RSP2 {

    export class App {

        private static personas: Array<Persona> = new Array<Persona>();

        public static hideFormAlta(): void {
            let divAlta = document.getElementById('divAlta');
            if (divAlta != null) {
                divAlta.hidden = true;
            }
        }

        public static showFormAlta(): void {
            let divAlta = document.getElementById('divAlta');
            let divAuto = document.getElementById("contenedorAuto");
            let divCheck = <HTMLInputElement>document.getElementById('contenedorCamioneta');
            let tipo = <HTMLInputElement>document.getElementById("selTipo");
            let select4x4 = <HTMLInputElement>document.getElementById("is4x4");
            (<HTMLButtonElement>document.getElementById("header2")).textContent = "Alta Persona";
            (<HTMLButtonElement>document.getElementById("btnAgregar")).textContent = "Guardar";
            if (divAlta != null && divAuto != null) {
                divAlta.hidden = false;
                divAuto.hidden = false;
                select4x4.checked = false;
                divCheck.hidden = true;
                tipo.value = "Cliente";
                App.resetValuesForm();
            }
        }

        public static showCheck4x4(): void {
            let divCheck = document.getElementById('contenedorCamioneta');
            let divPuertas = document.getElementById('contenedorAuto');
            if (divCheck != null && divPuertas != null) {
                divCheck.hidden = false;
                divPuertas.hidden = true;
            }
        }

        public static hideCheck4x4(): void {
            let divCheck = document.getElementById('contenedorCamioneta');
            let divPuertas = document.getElementById('contenedorAuto');
            if (divCheck != null && divPuertas != null) {
                divCheck.hidden = true;
                divPuertas.hidden = false;
            }
        }

        public static controlDivTipo(): void {
            let tipo = <HTMLInputElement>document.getElementById("selTipo");
            if (tipo != null && tipo.value == "Cliente") {
                App.hideCheck4x4();
            } else if (tipo != null && tipo.value == "Camioneta") {
                App.showCheck4x4();
            }
        }

        public static resetValuesForm(): void {
            let id = <HTMLInputElement>document.getElementById('txtId');
            let nombre = <HTMLInputElement>document.getElementById('txtMarca');
            let apellido = <HTMLInputElement>document.getElementById("txtModelo");
            let precio = <HTMLInputElement>document.getElementById("txtPrecio");
            let ctdPuertas = <HTMLInputElement>document.getElementById("cantPuertas");
            id.value = "";
            nombre.value = "";
            nombre.className = "sinError";
            apellido.value = "";
            apellido.className = "sinError";
            precio.valueAsNumber = 0;
            precio.className = "sinError";
            ctdPuertas.valueAsNumber = 0;
            ctdPuertas.className = "sinError";
        }

        public static getAndValidateInputValues(): void {
            let isValid: boolean = true;

            let idTxt = (<HTMLInputElement>document.getElementById("txtId"));
            let id: number = Number(idTxt.value);

            let nombreTxt = <HTMLInputElement>document.getElementById("txtNombre");
            let nombre: string = String(nombreTxt.value);

            let apellidoTxt = <HTMLInputElement>document.getElementById("txtApellido");
            let apellido: string = String(apellidoTxt.value);

            let edadTxt = <HTMLInputElement>document.getElementById("txtEdad");
            let edad: number = Number(edadTxt.valueAsNumber);

            let sexOpt = (<HTMLInputElement>document.getElementById("selSexo")).value;
            let sexo: Sexo = RSP2.Sexo.masculino;

            if (sexOpt == "Femenino")
                sexo = RSP2.Sexo.femenino;


            if (nombre.length < 3) {
                nombreTxt.className = "error";
                isValid = false;
            } else {
                nombreTxt.className = "sinError";
            }
            if (apellido.length < 3) {
                apellidoTxt.className = "error";
                isValid = false;
            } else {
                apellidoTxt.className = "sinError";
            }
            if (isNaN(edad)) {
                edadTxt.className = "error";
                isValid = false;
            } else if (edad < 1 || edad > 150) {
                edadTxt.className = "error";
                isValid = false;
            } else {
                edadTxt.className = "sinError";
            }

            if (isValid) {

                let persona: Persona;
                let btnValGuardar: boolean = (<HTMLButtonElement>document.getElementById("btnAgregar")).textContent == "Guardar";

                persona = new Cliente(App.buscarId(), nombre, apellido, edad, sexo);


                if (btnValGuardar) {
                    App.LocalStorage(persona);
                } else {
                    persona.setId(id);
                    App.LocalStorage(persona, true, id);
                }

                // App.hideFormAlta();
                App.filtrosEvent();
            } else {
                alert("Por favor Ingresar Valores Validos");
            }
        }

        public static mockVehiculos(): void {
            let hombres: string[] = ["Juan", "Matias", "Gaston", "Pedro"];
            let mujeres: string[] = ["Macarena", "Claudia", "Lorena", "Mercedez"];
            let apellidos: string[] = ["Escuer", "Sarmiento", "Belgrano", "Fernandez", "Peron", "Bolivar", "Lopez", "Ramos"];
            for (let i = 0; i < 2; i++) {

                let hombre: Cliente = new Cliente(App.buscarId(), hombres[App.rnd(0, 3)], apellidos[App.rnd(0, 7)], App.rnd(16, 80), RSP2.Sexo.masculino);
                App.LocalStorage(hombre);
                let mujer: Cliente = new Cliente(App.buscarId(), mujeres[App.rnd(0, 3)], apellidos[App.rnd(0, 7)], App.rnd(18, 80), RSP2.Sexo.femenino);
                App.LocalStorage(mujer);

            }

            App.filtrosEvent();

        }

        public static rnd(min: number, max: number): number {
            return Math.floor(Math.random() * (max - min)) + min;
        }

        public static Onload() {
            // set tipo en Opciones Select con Enum
            App.setTipoSelect();

            if (localStorage.getItem("listaLS")) {
                App.personas = App.LocalStorageToListaPersonas();
            }

            (<HTMLInputElement>document.getElementById("selSexoFiltro")).addEventListener("change", (e: Event) => App.filtrosEvent());
            (<HTMLInputElement>document.getElementById("txtNombreFilter")).addEventListener("keyup", (e: Event) => App.filtrosEvent());

            (<HTMLInputElement>document.getElementById("mostrarID")).addEventListener("click", (e: Event) => App.filtrosEvent());
            (<HTMLInputElement>document.getElementById("mostrarNombre")).addEventListener("click", (e: Event) => App.filtrosEvent());
            (<HTMLInputElement>document.getElementById("mostrarApellido")).addEventListener("click", (e: Event) => App.filtrosEvent());
            (<HTMLInputElement>document.getElementById("mostrarEdad")).addEventListener("click", (e: Event) => App.filtrosEvent());
            (<HTMLInputElement>document.getElementById("mostrarSexo")).addEventListener("click", (e: Event) => App.filtrosEvent());
            (<HTMLInputElement>document.getElementById("mostrarAccion")).addEventListener("click", (e: Event) => App.filtrosEvent());
            App.filtrosEvent();
        }

        public static setTipoSelect(): void {
            let select: HTMLSelectElement = <HTMLSelectElement>document.getElementById("selSexo");
            let opcion1: HTMLElement = document.createElement("option");
            opcion1.setAttribute("value", Sexo.femenino);
            opcion1.textContent = Sexo.femenino;
            let opcion2: HTMLElement = document.createElement("option");
            opcion2.setAttribute("value", Sexo.masculino);
            opcion2.textContent = Sexo.masculino;
            select.appendChild(opcion1);
            select.appendChild(opcion2);
        }

        public static filtrarBySexo(sexo: Sexo): Array<Persona> {
            if (sexo == RSP2.Sexo.todos) {
                return App.personas;
            } else {
                let listAux = App.personas.filter(function (persona: Persona) {
                    if ((<Cliente>persona).getSexo() == sexo) {
                        return true;
                    }
                    return false;
                });
                return listAux;
            }

        }

        public static clearStorage() {
            localStorage.clear();
            App.personas.length = 0;
            (<HTMLElement>document.getElementById("mockLoad")).hidden = false;
            App.filtrosEvent();
        }

        public static filtrarByNombre(listaLS: Array<Persona>): Array<Persona> {
            let filtro: string = (<HTMLInputElement>document.getElementById("txtNombreFilter")).value;
            let arrayFiltrado: Array<Persona> = listaLS.filter(function (persona: Persona) {
                if (persona.getNombre().toLowerCase().match("^" + filtro.toLowerCase() + "[a-zA-Z\s]*")) {
                    return true;
                }
                return false;
            });

            return arrayFiltrado;

        }


        public static CalcularPromedio() {
            let listaFiltrada: Array<Persona> = App.obtenerListaFiltrada();

            let Acumulador: number = listaFiltrada.reduce(function (total, persona, i, array) {
                return total += (<Cliente>persona).getEdad();
            }, 0);

            let promedio: number = 0;
            if (listaFiltrada.length > 0)
                promedio = Acumulador / listaFiltrada.length;
            alert("Precio Promedio es: " + promedio);

        }

        public static filtrosEvent() {
            let arrayChecks = Array.from(document.getElementsByClassName("chk"));
            let chkTrue = arrayChecks.filter(function (chkbox) {
                return (<HTMLInputElement>chkbox).checked == true;
            });
            let chkTrueValues: Array<string> = chkTrue.map(function (element) {
                return (<HTMLInputElement>element).value;
            })

            let header = App.createHeaderTable(chkTrueValues);
            let tabla = <HTMLElement>document.getElementById("tabla");
            let listaFinal = App.obtenerListaFiltrada();
            let tablaNew = App.createTable(chkTrueValues, listaFinal);
            let parentTable = tabla.parentNode;
            (<HTMLElement>parentTable).removeChild(tabla);
            (<HTMLElement>parentTable).appendChild(tablaNew);

        }


        public static btnCancelar() {
            App.resetValuesForm();
            (<HTMLButtonElement>document.getElementById("btnAgregar")).textContent = "Guardar";
            (<HTMLButtonElement>document.getElementById("header2")).textContent = "Alta Persona";
        }


        private static obtenerListaFiltrada(): Array<Persona> {
            let sexoOpt = (<HTMLInputElement>document.getElementById("selSexoFiltro")).value;
            let sexo: Sexo;
            switch (sexoOpt) {
                case "TODOS":
                    sexo = RSP2.Sexo.todos;
                    break;
                case  "Femenino":
                    sexo = RSP2.Sexo.femenino;

                case "Masculino":
                    sexo = RSP2.Sexo.masculino;
                    break;
                default:
                    sexo = RSP2.Sexo.todos;
            }
            let listaFitradaByTipo = App.filtrarBySexo(sexo);
            let listaFinal = App.filtrarByNombre(listaFitradaByTipo);
            return listaFinal;
        }

        private static buscarId(): number {
            let IDMasAlto: number = App.personas.reduce(function (IDMasAlto, persona, i, array) {
                if (persona.getId() > IDMasAlto) {
                    IDMasAlto = persona.getId();
                }
                return IDMasAlto;
            }, 0);
            return IDMasAlto + 1;

        }

        private static createTable(chk: Array<string>, vehiculosFtd: Array<Persona>): HTMLElement {

            let table = document.createElement("table");
            table.id = "tabla";
            table.appendChild(App.createHeaderTable(chk));

            vehiculosFtd.forEach(function (persona) {
                let rowVh = App.createRowTable(chk, persona);
                table.appendChild(rowVh);
            })
            return table;
        }

        private static createHeaderTable(chk: Array<string>): HTMLTableSectionElement {
            let head: HTMLTableSectionElement = document.createElement("thead");
            chk.forEach(function (value) {
                let aux = document.createElement("th");
                aux.appendChild(document.createTextNode(value));
                head.appendChild(aux);
            });
            return head;
        }

        private static createRowTable(chk: Array<string>, persona: Persona): HTMLTableRowElement {
            let row: HTMLTableRowElement = document.createElement("tr");
            chk.forEach(function (value) {
                let cell = document.createElement("td");
                if (value != "Accion") {
                    if (value == "Caracteristicas")
                        cell.innerHTML = persona.getProperty(value);
                    else
                        cell.appendChild(document.createTextNode(persona.getProperty(value)));
                } else if (value == "Accion") {
                    let btnEdit = document.createElement('button');
                    btnEdit.textContent = "Editar";
                    btnEdit.className = "btn btn-outline-secondary";
                    btnEdit.addEventListener("click", (e: Event) => App.Editar(persona.getId()));
                    let btnDel = document.createElement('button');
                    btnDel.textContent = "Eliminar";
                    btnDel.className = "btn btn-outline-secondary";
                    btnDel.addEventListener("click", (e: Event) => App.Borrar(persona.getId()));
                    cell.appendChild(btnEdit);
                    cell.appendChild(btnDel);
                }

                row.appendChild(cell);
            });
            return row;
        }

        private static LocalStorage(persona: Persona, edita ?: boolean, id ?: number): void {
            if (edita == true && id) {
                if (App.findVehiculoById(id) != undefined) {
                    let indiceArray: number = App.findIndexVhArray(App.findVehiculoById(id));
                    App.personas[indiceArray] = persona;
                }
            } else {
                if (localStorage.getItem("listaLS") === null) {
                    App.personas.push(persona);
                } else {
                    App.personas = App.LocalStorageToListaPersonas();
                    App.personas.push(persona);
                }
            }
            localStorage.setItem('listaLS', JSON.stringify(App.personas));

        }

        private static LocalStorageToListaPersonas(): Persona[] {
            let toParse: any = localStorage.getItem('listaLS');
            let response: any = JSON.parse(toParse);

            let listaResponse: Array<Persona> = new Array<Persona>();
            for (let vh of response) {
                if (vh['edad']) {
                    let cliente: Cliente = new Cliente(vh['id'], vh['nombre'], vh['apellido'], vh['edad'], vh['sexo']);
                    listaResponse.push(cliente);
                }
            }
            return listaResponse;

        }

        private static Borrar(id: number): void {
            if (App.findVehiculoById(id) != undefined) {
                let indice: number = App.findIndexVhArray(App.findVehiculoById(id));
                App.personas.splice(indice, 1);
                localStorage.setItem("listaLS", JSON.stringify(App.personas));
                App.filtrosEvent();
            } else {
                alert("Error no se puede Borrar Persona id: " + id);
            }
        }

        private static Editar(id: number) {

            if (App.findVehiculoById(id) != undefined) {
                let persona: Persona = App.findVehiculoById(id);
                App.showFormAlta();
                (<HTMLButtonElement>document.getElementById("header2")).textContent = "Modificar Persona";
                (<HTMLButtonElement>document.getElementById("btnAgregar")).textContent = "Modificar";
                (<HTMLInputElement>document.getElementById("txtId")).value = persona.getId().toString();
                (<HTMLInputElement>document.getElementById("txtNombre")).value = persona.getNombre();
                (<HTMLInputElement>document.getElementById("txtApellido")).value = persona.getApellido();
                (<HTMLInputElement>document.getElementById("txtEdad")).value = (<Cliente>persona).getEdad().toString();
                (<HTMLSelectElement>document.getElementById("selSexo")).value = (<Cliente>persona).getSexo();


                App.filtrosEvent();
            }
        }

        private static findIndexVhArray(persona: Persona): number {
            return App.personas.indexOf(persona);
        }

        private static findVehiculoById(id: number): Persona {
            return App.personas.filter(persona => persona.getId() === id)[0];
        }

    }

    export enum Sexo {
        masculino = "Masculino",
        femenino = "Femenino",
        todos = "Todos"
    }


    document.addEventListener("DOMContentLoaded", (e: Event) => App.Onload());

}