// Aplicacion para tomar notas de pedidos
// 1.Ingrese el pedido con los siguientes datos: tipo de torta, Kilogramos, Cliente, fecha de pedido y fecha de entrega, observaciones.
// 2. Guardar esa información en un objeto.
// 3. Poder ver esa información y cerrar el pedido una vez finalizado.
// 4.Guardarse en un historial.

// Varibales DOM
    //Variables DOM - MODAL 
/*
const btnAbrirModal = document.querySelector("#btn-abrir-modal")
const btnCerrarModal = document.querySelector("#btn-cerrar-modal")
const modal = document.querySelector("#modal")
*/
// -----Ventana modal---------------
/*
btnAbrirModal.addEventListener("click", ()=> {
    modal.showModal();
    setDate();
})

btnCerrarModal.addEventListener("click", () =>{
    modal.close();
})
*/
// --------------------------------

    //Variables FORM

        // Info date
const dateNumber = document.getElementById("dateNumber");
const dateText = document.getElementById("dateText");
const dateMonth = document.getElementById("dateMonth");
const dateYear = document.getElementById("dateYear"); 
// ---------------------------------------

// Funcion para setear la fecha
const setDate = () =>{
    const date = new Date();
    dateNumber.textContent = date.toLocaleString("es", {day: "numeric"});
    dateText.textContent = date.toLocaleString("es", {weekday: "long"});
    dateMonth.textContent = date.toLocaleString("es", {month: "short"});
    dateYear.textContent = date.toLocaleString("es", {year: "numeric"});
}
setDate();
// ---------------------------------------------------

// Clase con metodos para productos/pedidos
class Product{
    constructor(name, price, kg, client, dateE, time, observ){
        this.name = name;
        this.price = price;
        this.kg = kg;
        this.client = client;
        this.dateE = dateE;
        this.time = time;
        this.observ = observ;
    }
    puedoAgregarMasMetodos(){
    }
}
// Clase con metodos para alterar el DOM y agregar los productos/pedidos
class UI{
    // Creo un metodo para agregar un pedido/producto en el DOM
    addProduct(product){
        // Obtengo por ID el DIV donde será insertado el pedido en "Lista de pedidos"
        const productList = document.getElementById("product-list");
        
        // Lista de pedidos:
            // Se crea un div que contendra cada producto que se agregue.
        const element = document.createElement("div");
        element.className = "productList"
        element.innerHTML = `
            <div>
                <div>
                    <strong>Pedido</strong>:${product.name}
                    <strong>Precio</strong>:${product.price}
                    <strong>Kilogramos</strong>:${product.kg}
                    <strong>Pedido por</strong>:${product.client}
                    <strong>Fecha de entrega</strong>:${product.dateE}
                    <strong>Hora de entrega</strong>:${product.time}
                    <strong>A tener en cuenta</strong>:${product.observ}

                    <input type="button" name="delete" value="x"></input>
                </div>
            </div>
        `;
        // Agrego la lista de pedidos/productos al (element) = DIV.
        productList.appendChild(element);
        // Guardo en el navegador al información
        localStorage.setItem(`Pedido ${product.client}`, JSON.stringify(element))
        console.log(`Pedido ${product.client}`);    
    }
    resetForm(){
        // Metodo para borrar los datos del formulario.
        document.getElementById("product-form").reset();
    }
    deleteProduct(element){
        if(element.name === "delete"){
            element.parentElement.parentElement.parentElement.remove();
            this.showMessage("Pedido borrado", "danger")
        }
    }
    showMessage(message, cssClass){
        const div = document.createElement("div");
        div.className = `alert alert-${cssClass}`;

        // Mensaje
        div.appendChild(document.createTextNode(message))
        // Mostrar en el DOM
        const container = document.querySelector(".containerApp");
        const app = document.querySelector("#app");
        container.insertBefore(div, app);
        
        setTimeout(function() {
            const div = document.querySelector(".alert").remove;
        }, 3000);
    }
}
// Eventos DOM
    // Llamo al formulario por ID y le agrego un evento al enviar los datos.
const productForm = document.getElementById("product-form");
    productForm.addEventListener("submit", (e) =>{
        
        //Creo CONST con los VALUE del formulario
        const name = document.getElementById("name").value;
        const price = document.getElementById("price").value;
        const kg = document.getElementById("kg").value;
        const client = document.getElementById("client").value;
        const dateE = document.getElementById("dateE").value;
        const time = document.getElementById("time").value; 
        const observ = document.getElementById("observ").value;
        
        //Creo un objeto con mi clase Product con los datos del formulario
        const product = new Product(name, price, kg, client, dateE, time, observ);
            // Llamo al metodo de la clase UI para mostrarlo en el DOM / Es un objeto interactuando con otro.
        const ui = new UI();
            // Chequeo que no esten vacios todos los campos
        if(name ==="" && price ==="" && kg ==="" && client ==="" && dateE ==="" && time ==="" && observ ===""){
            return ui.showMessage("Los campos están vacíos", "danger")
        }
        ui.addProduct(product)
            // Reseteo los valores del formulario luego de cargarlos.
        ui.resetForm();
        ui.showMessage("Pedido agregado", "success")

        e.preventDefault();
    })
document.getElementById("product-list").addEventListener("click", (e) =>{
    const ui = new UI();
    ui.deleteProduct(e.target)
})

