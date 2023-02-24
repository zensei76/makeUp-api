//Global section-------------------------------------------------------------------------------------------------------------

let heading = document.createElement("h1");
heading.innerHTML = `Bloom  <p class = heading> Beauty</p>`;

let headingQuote = document.createElement("h4");
headingQuote.innerHTML = `<blockquote>“If you’re sad, add more lipstick and attack.”<br>
<cite>-Coco Chanel</cite>
</blockquote`;

let headerDiv = createDiv("div", "class", "header");


// Search Container-------------------------------------------------------------------------------------------------------------
let searchContainer = createDiv("span", "class", "search-box");
searchContainer.innerHTML = `
<form>
  <input type = "text" class = "search-control" placeholder="Enter Product or Product and Brand " id = "input-product" >

  <button type = "submit" class = "search-btn btn" id = "search-btn">
  <i class="fa-solid fa-magnifying-glass fa-2xl icon"></i>
</form>
`;
headerDiv.append(heading, headingQuote, searchContainer);


//Result section--------------------------------------------------------------------------------------------------------------------
let productResult = createDiv("div", "class", "product-result");

productResult.innerHTML = `
<h2 class = "title">Your Search Results:</h2>

<div class= "container-md"> 
  <div class = "row" id= "product"> 
  
  <div>
<div>
`;

document.body.append(headerDiv, productResult);

const searchBtn = document.getElementById("search-btn");
const productList = document.getElementById("product");


//adding event Listner-----------------------------------------------------------------------------------------------------------------------------------
searchBtn.addEventListener("click", getInput);
document.body.addEventListener("keyup", keyup);


// -----------------------------------------------Functions-------------------------------------------------------------------------------------------------

//Function to create Div Element-------------------------------------------------------------------------------------------------------------------------
function createDiv(tag, attributeName, attributeValue) {
  let ele = document.createElement(tag);
  ele.setAttribute(attributeName, attributeValue);
  return ele;
}


//Get searched Input for click event----------------------------------------------------------------------------------------------------------------------------------------
function getInput(event) {
  event.preventDefault(); // to overcome default behaviour
  productList.innerHTML =" ";
  let input = document.getElementById("input-product").value;
  input ? (input = input.split(" ")) : input;

  console.log(input);
  let brand;
  let product;
  
  if (input.length) {
    if (input.length == 2) {
      console.log("Got two inputs");
      brand = input[1];
      product = input[0];
      console.log(`Product : ${product}  Brand:${brand}`);
      getProduct(brand, product);
      input = null;
    } else if (input.length == 1) {
      console.log("Got only 1 input ");
      brand = " ";
      product = input[0];
      console.log("input got" + input);

      getProduct(brand, product);
    }
  } else {
 
    console.log("No Input");
  }
  console.log(input.length);
}

//for Enter------------------------------------------------------------------------------------------------------------------------------
function keyup(event) {
 if (event.key == "Enter"){
    console.log("Enter has been pressed")
    getInput ();
 }
  //console.log(event.key);
}

//Async Function to get product list------------------------------------------------------------------------------------------------------



async function getProduct(brand, product) {
  var url = `https://makeup-api.herokuapp.com/api/v1/products.json?brand=${brand}&product_type=${product} `;
  // var url = `http://makeup-api.herokuapp.com/api/v1/products.json?brand=covergirl&product_type=lipstick `
  var html = " ";
 
  console.log("Entered getProduct");
  try {
    let response = await fetch(url);
    console.log(url);
    let data = await response.json();
    console.log("data found---->");

    if (data.length != 0) {
      data.forEach((element) => {
        console.log(element);
        html += ` 

        <div class="col-lg-4 product-name" >
          <div class = "card lg-4 shadow-lg  "
            <div class="product-image">
              <img src="${element.image_link}" alt="${element.category}" srcset="">
              
              <div class = "card-body">
                <p class = "card-text">

                  <h5>${element.name}</h5>
                  Brand : ${element.brand}

                </p>
                <!--<p>Price : ${element.price} ${element.price_sign}</p>-->
                <button type="button" class="all-btn" data-toggle="modal" data-target="#myModal${element.id}">Details</button>
              </div>
                
          </div>
          
          
          <!-- Modal -->
          <div class="modal fade" id="myModal${element.id}" >
            <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
            
              <!-- Modal content-->

              <button type="button" class="close" data-dismiss="modal">
                <i class="fa-solid fa-xmark icon fa-xl"></i>
              </button>

              <div class = "modal-container">
                  
                <h3 class="modal-title">${element.name}</h3>
                
                <div class="modal-image modal-data">
                    <img src="${element.image_link}" alt="${element.category}" srcset="">
                </div>
                                
                <p class="modal-text">
                    Price : ${element.price} ${element.price_sign} </br>
                    Category : ${element.category}</br>
                    Product Type :${element.product_type}
                </p>
                <span class = "description">${element.description} </span> 
                
                

                  <a href = "${element.product_link}" class = "product-link">
                  
                    <button type="button" class="all-btn">Product Link</button>

                  </a>

              
              
              
              </div>

              </div>
                
            </div>
          </div>
            
        </div>
        `;
      });
    } else {
      html = `
      <div class = "noProducts"> 
        <h3>Sorry, we didn't find any product<h3>
        <h6> Here are some Product suggestions </h6>
        </br>
        <ul>
            <li>Blush</li>
            <li>Bronzer</li>
            <li>Eyebrow</li>
            <li>Eyeliner</li>
            <li>Eyeshadow</li>
            <li>Foundation</li>
            <li>Lipliner</li>
            <li>Lipstick</li>
            <li>Mascara</li>

        </ul>
      </div>
        
      `;
      console.log(html);
    }
  } catch (error) {
    console.log("In Catch block");
    console.log(error);
    html = `
    <div class = "noProducts">
      <h3>Server Error<h3>Try after some time
    </div>
    <p>
        An error occurred in the api server and your page could not be served.
    </p>
    `;
  }
  productList.innerHTML = html;
}
