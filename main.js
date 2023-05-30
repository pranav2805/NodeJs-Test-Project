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
    
    nameInput.value = '';
    descInput.value = '';
    priceInput.value = '';
    quantityInput.value = '';
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
            showCandyOnScreen(response.data);
        })
        .catch(err => {
            console.log(err);
        })
}

function showCandyOnScreen(obj) {
    const parentElement = document.getElementById('items');
    const childHTML = `<li id=${obj.id}> ${obj.name} ${obj.description} ${obj.price} ${obj.quantity}
                          <button onclick="buyOne('${obj.id}', '${obj.name}', '${obj.description}', '${obj.price}', '${obj.quantity}')">Buy 1</button>
                          <button onclick="buyTwo('${obj.id}', '${obj.name}', '${obj.description}', '${obj.price}', '${obj.quantity}')">Buy 2</button>
                          <button onclick="buyThree('${obj.id}', '${obj.name}', '${obj.description}', '${obj.price}', '${obj.quantity}')">Buy 3</button>
                       </li>`
    parentElement.innerHTML = parentElement.innerHTML + childHTML;
}

function buyOne(id, name, description, price, quantity) {
    let my_obj = {
        name: name,
        description: description,
        price: price,
        quantity: quantity - 1
    }
    axios.put('http://localhost:4000/candies/buy-candy/'+id, my_obj)
        .then(response => {
            updateExistingCandy({...my_obj, id: id});
        })
        .catch(err => {
            console.log(err);
        })
}

function buyTwo(id, name, description, price, qty) {
    let my_obj = {
        name: name,
        description: description,
        price: price,
        quantity: qty - 1
    }
    axios.put('http://localhost:4000/candies/buy-candy/'+id, my_obj)
        .then(response => {
            updateExistingCandy({...my_obj, id: id});
        })
        .catch(err => {
            console.log(err);
        })
}

function buyThree(id, name, description, price, qty) {
    console.log(qty);
    let my_obj = {
        name: name,
        description: description,
        price: price,
        quantity: qty - 1
    }
    console.log(my_obj.quantity);
    axios.put('http://localhost:4000/candies/buy-candy/'+id, my_obj)
        .then(response => {
            updateExistingCandy({...my_obj, id: id});
        })
        .catch(err => {
            console.log(err);
        })
}

function updateExistingCandy(obj) {
    //console.log('werty');
    const element = document.getElementById(obj.id);
    element.innerHTML = `<li id=${obj.id}> ${obj.name} ${obj.description} ${obj.price} ${obj.quantity}
                        <button onclick="buyOne('${obj.id}', '${obj.name}', '${obj.description}', '${obj.price}', '${obj.quantity}')">Buy 1</button>
                        <button onclick="buyTwo('${obj.id}')">Buy 2</button>
                        <button onclick="buyThree('${obj.id}')">Buy 3</button>
                        </li>`;
}