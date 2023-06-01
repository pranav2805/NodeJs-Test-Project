const form = document.getElementById('addForm');
const itemList = document.getElementById('items');
const nameInput = document.getElementById('name');
const descInput = document.getElementById('description');
const priceInput = document.getElementById('price');
const quantityInput = document.getElementById('quantity');


form.addEventListener('submit', addItem);

window.addEventListener('DOMContentLoaded', () => {
    axios.get('http://localhost:4000/candies')
        .then(response => {
            // console.log(response.data);
            for(let i=0;i<response.data.length;i++){
                showCandyOnScreen(response.data[i]);
            }
        })
        .catch(err => {
            console.log(err);
        })
})

function addItem(e) {
    e.preventDefault();
    let obj = {
        name: nameInput.value,
        description: descInput.value,
        price: priceInput.value,
        quantity: quantityInput.value
    }

    axios.post('http://localhost:4000/candies', obj)
        .then(response => {
            //console.log(response);
            showCandyOnScreen(response.data);
        })
        .catch(err => {
            console.log(err);
        })
    
    nameInput.value = '';
    descInput.value = '';
    priceInput.value = '';
    quantityInput.value = '';
}

function showCandyOnScreen(obj) {
    const parentElement = document.getElementById('items');
    const childHTML = `<li id=${obj.id} class="list-group-item"> 
                                <div class="row">
                                <div class="col-lg-3">
                                    ${obj.name} 
                                </div>
                                <div class="col-lg-3">
                                    ${obj.description} 
                                </div>
                                <div class="col-lg-3">
                                    ${obj.price} 
                                </div>
                                <div class="col-lg-3">
                                    ${obj.quantity} 
                                </div>
                                </div>
                                <button class="btn btn-danger btn-sm float-right ml-2" onclick="updateQuantity('${obj.id}', '${obj.name}', '${obj.description}', '${obj.price}', '${obj.quantity}', 'buyOne')">Buy 1</button>
                                <button class="btn btn-danger btn-sm float-right ml-2" onclick="updateQuantity('${obj.id}', '${obj.name}', '${obj.description}', '${obj.price}', '${obj.quantity}', 'buyTwo')">Buy 2</button>
                                <button class="btn btn-danger btn-sm float-right ml-2" onclick="updateQuantity('${obj.id}', '${obj.name}', '${obj.description}', '${obj.price}', '${obj.quantity}', 'buyThree')">Buy 3</button>
                        </li>`
                    //    ${obj.description} ${obj.price} ${obj.quantity}
    parentElement.innerHTML = parentElement.innerHTML + childHTML;
}

function updateQuantity(id, name, description, price, quantity, flag){
    let newQuantity;
    if(flag === 'buyOne') {newQuantity = quantity-1}
    else if(flag === 'buyTwo') {newQuantity = quantity-2}
    else if(flag === 'buyThree') {newQuantity = quantity-3}
    let my_obj = {
        name: name,
        description: description,
        price: price,
        quantity: newQuantity
    }
    //console.log(my_obj.quantity);
    axios.put('http://localhost:4000/candies/buy-candy/'+id, my_obj)
        .then(response => {
            updateExistingCandy({...my_obj, id: id});
        })
        .catch(err => {
            alert('Quantity is less than 0!');
            console.log(err);
        })
} 

function updateExistingCandy(obj) {
    //console.log('werty');
    const element = document.getElementById(obj.id);
    // element.innerHTML = `<li id=${obj.id}> ${obj.name} ${obj.description} ${obj.price} ${obj.quantity}
    //                     <button onclick="buyOne('${obj.id}', '${obj.name}', '${obj.description}', '${obj.price}', '${obj.quantity}')">Buy 1</button>
    //                     <button onclick="buyTwo('${obj.id}')">Buy 2</button>
    //                     <button onclick="buyThree('${obj.id}')">Buy 3</button>
    //                     </li>`;

    element.innerHTML = `<div class="row">
                            <div class="col-lg-3">
                                ${obj.name} 
                            </div>
                            <div class="col-lg-3">
                                ${obj.description} 
                            </div>
                            <div class="col-lg-3">
                                ${obj.price} 
                            </div>
                            <div class="col-lg-3">
                                ${obj.quantity} 
                            </div>
                            </div>
                            <button class="btn btn-danger btn-sm float-right ml-2" onclick="updateQuantity('${obj.id}', '${obj.name}', '${obj.description}', '${obj.price}', '${obj.quantity}', 'buyOne')">Buy 1</button>
                            <button class="btn btn-danger btn-sm float-right ml-2" onclick="updateQuantity('${obj.id}', '${obj.name}', '${obj.description}', '${obj.price}', '${obj.quantity}', 'buyTwo')">Buy 2</button>
                            <button class="btn btn-danger btn-sm float-right ml-2" onclick="updateQuantity('${obj.id}', '${obj.name}', '${obj.description}', '${obj.price}', '${obj.quantity}', 'buyThree')">Buy 3</button>
                        `
}