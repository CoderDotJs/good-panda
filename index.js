const input = document.getElementById('input');
const search = document.getElementById('search');
//form default event prevent
search.addEventListener('click', (event) =>{
    event.preventDefault();
    searchItem();
    spinner();
    stopSpin();
    getMeal();
})


//fetching the api
const getMeal = () => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${input.value}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayData(data.meals))
}

//display data to the site main function
const displayData = (data) => {
    const display = document.getElementById('items');
    display.innerHTML = ''
    loadData(data,display); //load data to the site after search
    input.value = ''
}

const loadData = (data,display) => {
      if(data == null || data == undefined || data == ''){
        const search_display = document.createElement('h1');
        search_display.innerHTML = `<h1 class="text-muted text-center flex-grow-1 position-absolute " id="search-display">No result found <br> Try searching by a food name (Ex. noodles)</h1>`
        display.appendChild(search_display)
      }
      else{
        data.forEach((data) => {
          const child = document.createElement('div');
          child.innerHTML = `<div class="card h-100 shadow p-2 rounded">
          <img src="${data.strMealThumb}" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">${data.strMeal}</h5>
            <p class="card-text">${data.strInstructions.slice(0, 200).concat('.')}</p>
          </div>
        </div>`
        display.appendChild(child);
        loadDataToInfo(child, data); //load the info on a tab if any search item is clicked
      });
      }
}

const loadDataToInfo = (child, data) => {
    child.addEventListener('click', ()=>{
        const displayInfo = document.getElementById('card-deck')
        displayInfo.innerHTML =  `<div class="card shadow postion-relative" id="top-image">
        <img src="${data.strMealThumb}" class="card-img-top" alt="...">
          <button class="border-0  text-warning bg-transparent position-absolute m-4 top-0 end-0" onclick="del()"><i class="fas fa-times fa-3x"></i></button>
          <div class="card-body">
            <h3 class="card-title">${data.strMeal}</h3>
            <p class="card-text">${data.strInstructions}<br>
            <dl>
            <dt>Category:</dt>
            <dd>${data.strCategory}</dd>
            <dt>Origin:</dt>
            <dd>${data.strArea}</dd>
            </dl>
            <b><h3>Ingredients:</h3></b> <br>
            <dl>
            <dt>${data.strIngredient1}:</dt>
            <dd>${data.strMeasure1}</dd>
            <dt>${data.strIngredient2}:</dt>
            <dd>${data.strMeasure2}</dd>
            <dt>${data.strIngredient3}:</dt>
            <dd>${data.strMeasure3}</dd>
            <dt>${data.strIngredient4}:</dt>
            <dd>${data.strMeasure4}</dd>
            <dt>${data.strIngredient5}:</dt>
            <dd>${data.strMeasure5}</dd>
            </dl>
            </p>
            <a href="#" class="btn btn-primary" onclick=${addToCart(data)}>Add to card</a>
          </div>
        </div>`
      })
}
const spinner = () => {
  const items = document.getElementById('items');
  items.innerHTML = `<div class="d-flex justify-content-center flex-grow-1" id="spinner">
  <div class="spinner-border" role="status">
    <span class="visually-hidden p-5 m-5">Loading...</span>
  </div>
</div>`
}
const stopSpin = () => {
  const spinner = document.getElementById('spinner');
  setTimeout(() => {
    spinner.remove();
  }, 1500);
}
const searchItem = () => {
  const searchName = document.getElementById('search-name');
  const inputValue = input.value;
  searchName.innerHTML = `You searched for: <i>'${inputValue}'</i>`
}
const del = () =>{
  const image = document.getElementById('top-image')
  image.remove()
}
const addToCart = (data) =>{
  let quantity = 0;
  quantity++;
  const cart = document.getElementById('cart');
  const cartItem = document.createElement('div');
  
    cartItem.innerHTML = `<div class="card mb-3" id=${data.idMeal}>
  <div class="row g-0">
  <div class="col-md-4">
    <img src="${data.strMealThumb}" class="img-fluid rounded-start h-100" alt="...">
  </div>
  <div class="col-md-8">
    <div class="card-body">
      <h5 class="card-title">${data.strMeal}</h5>
      <p class="card-text">${data.strInstructions.slice(0, 50).concat('...')}</p>
      <p class="card-text"><small class="text-muted">${quantity}</small></p>
    </div>
  </div>
</div>
</div>`;
  
  cart.appendChild(cartItem)
  duplicate(data);

}

const duplicate = (data) => {
  const arr = document.getElementsByClassName('cart');
  const sears = `${data.idMeal}`
  for(const cart of arr){
    if(cart.getElementById(`${data.idMeal}`) == sears){
      quantity++
    }
    else{
      addToCart(data);
    }
  }
}