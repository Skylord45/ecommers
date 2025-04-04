
let barColors = ["#b91d47", "#00aba9", "#2b5797", "#e8c3b9", "#1e7145",];

for (let i = 0; i < 25; i++) {
    const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
    barColors.push(randomColor);
  }
  

async function getProductDetails() {
    let respone = await fetch("/admin/product-details");
    let result = await respone.json();
  
    // console.log(result);
  
    let xOrderOverVewValues = [];
    let yOrderOverVewValues = [];
  
    for (let i = 0; i < result.data.length; i++) {
      // console.log(result.data[i].order_status);
  
      xOrderOverVewValues[i] = result.data[i].cat_name;
      yOrderOverVewValues[i] = result.data[i].cnt;
    }
  
    let chart1 = document.getElementById("myPieChart").getContext("2d");
  
    const myChart2 = new Chart(chart1, {
      type: "pie",
      data: {
        labels: xOrderOverVewValues,
        datasets: [
          {
            backgroundColor: barColors,
            data: yOrderOverVewValues,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  }
  getProductDetails()






  async function getProductDetailsOfElectronics() {
    let respone = await fetch("/admin/product-details-electronics");
    let result = await respone.json();
  
    // console.log(result);
  
    let xOrderOverVewValues = [];
    let yOrderOverVewValues = [];
    let parentValue = []
  
    for (let i = 0; i < result.data.length; i++) {
      // console.log(result.data[i].order_status);
  
      xOrderOverVewValues[i] = result.data[i].products_name;
      yOrderOverVewValues[i] = result.data[i].cnt;
      parentValue.push("Electonics")
    }

    data = [{
        type: "treemap",
        labels: xOrderOverVewValues,
        parents: parentValue,
        values: yOrderOverVewValues
    }]
    
    Plotly.newPlot('myDivElectronics', data)
    
  }
  getProductDetailsOfElectronics()




  async function getProductDetailsOfClothes() {
    let respone = await fetch("/admin/product-details-clothes");
    let result = await respone.json();
  
    // console.log(result);
  
    let xOrderOverVewValues = [];
    let yOrderOverVewValues = [];
    let parentValue = []
  
    for (let i = 0; i < result.data.length; i++) {
      // console.log(result.data[i].order_status);
  
      xOrderOverVewValues[i] = result.data[i].products_name;
      yOrderOverVewValues[i] = result.data[i].cnt;
      parentValue.push("Clothes")
    }
  
    data = [{
        type: "treemap",
        labels: xOrderOverVewValues,
        parents: parentValue,
        values: yOrderOverVewValues
    }]
    
    Plotly.newPlot('myDivClothes', data)


  }
  getProductDetailsOfClothes()



 async function getAllProductListing() {

    let productTable = document.getElementById('allProduct');

    let str = " ";

  let respone = await fetch("/admin/productOverView");
  let result = await respone.json();

  // console.log(result);

  str += `<tr>`;
  for (const key in result.data[0]) {
    str += `<td>${key}</td>`;
  }
  str += `</tr>`;

  for (let i = 0; i < result.data.length; i++) {
    str += `<tr>`;
    for (let [key, value] of Object.entries(result.data[i])) {
      str += `<td> ${value} </td>`;
    }
    str += `</tr>`;
  }

  productTable.innerHTML = str;
  str = " ";

 }

 getAllProductListing();







  // data = [{
//     type: "treemap",
//     labels: xOrderOverVewValues,
//     parents: ['Electonics', 'Electonics', 'Electonics', 'Electonics', 'Electonics', 'Electonics', 'Electonics', 'Electonics', 'Electonics', 'Electonics', 'Electonics', 'Electonics', 'Electonics', 'Electonics', 'Electonics', 'Electonics', 'Electonics', 'Electonics', 'Electonics', 'Electonics', 'Electonics', 'Electonics', 'Electonics', 'Electonics', 'Electonics' ], // All items are top-level, so parents are empty
//     values: [5, 5, 5, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
// }]

// Plotly.newPlot('myDiv', data)


// data = [{
//     type: "treemap",
//     labels: ["Eve", "Cain", "Seth", "Enos", "Noam", "Abel", "Awan", "Enoch", "Azura"],
//     parents: ["", "Eve", "Eve", "Seth", "Seth", "Eve", "Eve", "Awan", "Eve" ]
// }]

// Plotly.newPlot('myDiv', data)