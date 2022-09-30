//          VARIABLES
const listaDePedidos = [];
// Audio
let cancel = new Audio("./sound/cancel.ogg");
let confirm = new Audio("./sound/confirm.ogg");
const btnEnviar = document.getElementById("btnEnviar");
const btnDelete = document.getElementById("btnDelete");
//Variables FORM
// Info date
const dateNumber = document.getElementById("dateNumber");
const dateText = document.getElementById("dateText");
const dateMonth = document.getElementById("dateMonth");
const dateYear = document.getElementById("dateYear");
// ---------------------------------------

// Funcion para setear la fecha
const setDate = () => {
  const date = new Date();
  dateNumber.textContent = date.toLocaleString("es", { day: "numeric" });
  dateText.textContent = date.toLocaleString("es", { weekday: "long" });
  dateMonth.textContent = date.toLocaleString("es", { month: "short" });
  dateYear.textContent = date.toLocaleString("es", { year: "numeric" });
};
setDate();
// ---------------------------------------------------

// Clase con metodos para productos/pedidos
class Product {
  constructor(name, price, kg, client, dateE, time, observ) {
    this.name = name;
    this.price = price;
    this.kg = kg;
    this.client = client;
    this.dateE = dateE;
    this.time = time;
    this.observ = observ;
  }
}
// Clase con metodos para alterar el DOM y agregar los productos/pedidos
class UI {
  // Creo un metodo para agregar un pedido/producto en el DOM
  addProduct(product) {
    // Obtengo por ID el DIV donde será insertado el pedido en "Lista de pedidos"
    const productList = document.getElementById("productList");

    // Lista de pedidos:
    // Se crea un div que contendra cada producto que se agregue.
    const element = document.createElement("div");
    element.className = "productList";
    element.innerHTML = `
            <div>
                <div>
                    <p><strong>Pedido:</strong>${product.name}</p>
                    <p><strong>Precio:</strong>${product.price}</p>
                    <p><strong>Kilogramos:</strong>${product.kg}</p>
                    <p><strong>Pedido por:</strong>${product.client}</p>
                    <p><strong>Fecha de entrega:</strong>${product.dateE}</p>
                    <p><strong>Hora de entrega:</strong>${product.time}</p>
                    <p><strong>A tener en cuenta:</strong>${product.observ}</p>

                    <input type="button" name="delete" value="Borrar" id="btnDelete"></input>
                </div>
            </div>
        `;
    // Agrego la lista de pedidos/productos al (element) = DIV.
    productList.appendChild(element);
  }
  resetForm() {
    // Metodo para borrar los datos del formulario.
    document.getElementById("product-form").reset();
  }
  deleteProduct(element) {
    if (element.name === "delete") {
      element.parentElement.parentElement.parentElement.remove();
    }
  }
}
// Eventos DOM
// Llamo al formulario por ID y le agrego un evento al enviar los datos.
const productForm = document.getElementById("product-form");

productForm.addEventListener("submit", async (e) => {
  e.preventDefault();
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
  if (name === "" && price === "" && kg === "" && client === "" && dateE === "" && time === "" && observ === ""){
    return; 
}
  // Se agrega el producto
  ui.addProduct(product);
  // Reseteo los valores del formulario luego de cargarlos.
  ui.resetForm();

try{
    const respuesta = await fetch( "https://sheet.best/api/sheets/fbbd2841-ec95-452e-9727-b13b57958ba0", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "Tipo de torta": name,
          Precio: price,
          Kg: kg,
          Cliente: client,
          "Fecha de entrega": dateE,
          "Hora de entrega": time,
          Observaciones: observ,
        }),
      });
      const contenido = respuesta.json();
      listaDePedidos.push(contenido)
      console.log(listaDePedidos);
} catch(error){
    console.log(error);
}

});
// Eliminar de la lista un pedido
document.getElementById("productList").addEventListener("click", (e) => {
  const ui = new UI();
  ui.deleteProduct(e.target);
});
// Evento DOM sonido de los botones

btnEnviar.addEventListener("click", ()=>{
  confirm.play();
})
btnDelete.addEventListener("click", ()=>{
  cancel.play();
})