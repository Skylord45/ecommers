let chart1 = document.getElementById("myLineChart").getContext("2d");

let xValues = ["Apr 5", "Apr 10", "Apr 15", "Apr 20", "Apr 25", "Apr 30"]; // this value is comes from db
let yValues = [2,5,7,3,9,5]; // this value is comes from db
let barColors = ["#b91d47", "#00aba9", "#2b5797", "#e8c3b9", "#1e7145"];

const myChart1 = new Chart(chart1, {
  type: "line",
  data: {
    labels: xValues,
    datasets: [
      {
        fill: false,
        lineTension: 0,
        backgroundColor: "rgba(0,0,255,1.0)",
        borderColor: "rgba(0,0,255,0.1)",
        data: yValues,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    legend: { display: false },
    scales: {
      yAxes: [{
          ticks: {
              beginAtZero: true
          }
      }]
    }
  },
});

async function getOrderOverView() {
  let respone = await fetch("/admin/orderOverView");
  let result = await respone.json();

  // console.log(result);

  let xOrderOverVewValues = [];
  let yOrderOverVewValues = [];

  for (let i = 0; i < result.data.length; i++) {
    // console.log(result.data[i].order_status);

    xOrderOverVewValues[i] = result.data[i].order_status;
    yOrderOverVewValues[i] = result.data[i].cnt;
  }

  let chart2 = document.getElementById("myPieChart").getContext("2d");

  const myChart2 = new Chart(chart2, {
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

getOrderOverView();

async function getSalesOverView() {
  let respone = await fetch("/admin/salesOverView");
  let result = await respone.json();

  // console.log(result);

  let xSalesOverVewValues = [];
  let ySalesOverVewValues = [];

  for (let i = 0; i < result.data.length; i++) {
    xSalesOverVewValues[i] = result.data[i].cat_name;
    ySalesOverVewValues[i] = result.data[i].cnt;
  }
  let chart3 = document.getElementById("myBarChart").getContext("2d");

  const myChart3 = new Chart(chart3, {
    type: "bar",
    data: {
      labels: xSalesOverVewValues,
      datasets: [
        {
          backgroundColor: barColors,
          data: ySalesOverVewValues,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      legend: { display: false },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });
}

getSalesOverView();

async function getExpenseAndProfiteOverView() {
  let respone = await fetch("/admin/expenseAndProfiteOverView");
  let result = await respone.json();

  // console.log(result);

  let total = result.data[0].total;

  let expense = (total * 15) / 100;
  let finalExpense = expense.toFixed(2);
  // console.log(expense);
  let profit = total - expense;
  let finalProfit = profit.toFixed(2);
  // console.log(profit);
  document.getElementById("profit").innerHTML =
    '<i class="ri-money-rupee-circle-line"></i> ' + finalProfit;
  document.getElementById("expense").innerHTML =
    '<i class="ri-money-rupee-circle-line"></i>  ' + finalExpense;
  document.getElementById("Totalearnings").innerHTML =
    '<i class="ri-money-rupee-circle-line"></i> ' + finalProfit;

  let yExpenseAndProfiteValues = [finalExpense, finalProfit];

  let chart4 = document.getElementById("dashboardChart");

  const dashboardChart = new Chart(chart4, {
    type: "doughnut",
    data: {
      labels: ["Expense", "Profit"],
      datasets: [
        {
          data: yExpenseAndProfiteValues,
          backgroundColor: ["#b91d47", "#00aba9"],
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutoutPercentage: 70,
      rotation: -Math.PI,
      circumference: Math.PI,
    },
  });
}

getExpenseAndProfiteOverView();

async function getVendorOverView() {
  let respone = await fetch("/admin/vendorOverView");
  let result = await respone.json();

  // console.log(result);

  let xVendorOverVewValues = [];
  let yVendorOverVewValues = [];

  for (let i = 0; i < result.data.length; i++) {
    xVendorOverVewValues[i] = result.data[i].cat_name;
    yVendorOverVewValues[i] = result.data[i].cnt;
  }

  let chart5 = document.getElementById("myBarChart2").getContext("2d");

  const myChart5 = new Chart(chart5, {
    type: "bar",
    data: {
      labels: xVendorOverVewValues,
      datasets: [
        {
          backgroundColor: barColors,
          data: yVendorOverVewValues,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      legend: { display: false },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });
}

getVendorOverView();

async function getUserOverView() {
  let table = document.getElementById("user_table");

  let str = " ";

  let respone = await fetch("/admin/usersOverView");
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

  table.innerHTML = str;
  str = " ";
}

getUserOverView();

async function getProductOverView() {
  let table = document.getElementById("product_table");

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

  table.innerHTML = str;
  str = " ";
}

getProductOverView();




async function getCardData() {

  let respone = await fetch("/admin/totalOrders");
  let result = await respone.json();

  // console.log(result);

  // console.log(result.data.totalOrder[0][0].cnt);
  // console.log(result.data.totalSale[0][0].cnt);
  // console.log(result.data.totalUser[0][0].cnt);

  document.getElementById('totalUsers').innerHTML = result.data.totalUser[0][0].cnt
  document.getElementById('totalOrders').innerHTML = result.data.totalOrder[0][0].cnt
  document.getElementById('totalSales').innerHTML = result.data.totalSale[0][0].cnt
  
}
getCardData();




let showResult = document.getElementById('12345');
let searchResults = [];

function searching(){


  let str = " ";
  let ul = document.getElementById('search') 
  let li = ul.getElementsByTagName('li');
  // console.log(li[0].innerText);

  for(let i=0;i<li.length;i++){
    searchResults[i] = li[i].innerText;
  }

  // console.log(searchResults);

  showResult.innerHTML = str;
  str = " "

}

///////// not fully understand/////////
showResult.addEventListener("input", function(e) {

  e.preventDefault()

  var a, b, i, val = this.value;
 
  closeAllLists();
  if (!val) { return false;}
  currentFocus = -1;
  
  a = document.createElement("DIV");
  a.setAttribute("id", this.id + "autocomplete-list");
  a.setAttribute("class", "autocomplete-items");
  
  this.parentNode.appendChild(a);
 
  for (i = 0; i < searchResults.length; i++) {
  
    if (searchResults[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
     
      b = document.createElement("DIV");
      
      b.innerHTML = "<strong>" + searchResults[i].substr(0, val.length) + "</strong>";
      b.innerHTML += searchResults[i].substr(val.length);
      
      b.innerHTML += "<input type='hidden' value='" + searchResults[i] + "'>";
    
      b.addEventListener("click", function(e) {
         
          showResult.value = this.getElementsByTagName("input")[0].value;
          
          closeAllLists();
      });
      a.appendChild(b);
    }
  }
});


function closeAllLists(elmnt) {
  var x = document.getElementsByClassName("autocomplete-items");
  for (var i = 0; i < x.length; i++) {
    if (elmnt != x[i] && elmnt != showResult) {
      x[i].parentNode.removeChild(x[i]);
    }
  }
}



let searchResultData = document.getElementById('searchResultData')
let data = document.getElementById('12345')

searchResultData.addEventListener('click', (e) => {

  let page = data.value;

  if(page == 'Main Dashboard'){
    window.location.href = '/admin/dashboard'
  } else if(page == 'Vendor Details'){
    window.location.href = '/admin/vendors'
  }else if(page == 'Sales'){
    window.location.href = '/admin/sales'
  }else if(page == 'Order Details'){
    window.location.href = '/admin/orders'
  }else if(page == 'pending verification'){
    window.location.href = '/admin/pending-verification'
  }else if(page == 'offers'){
    window.location.href = '/admin/offers'
  }else if(page == 'Users'){
    window.location.href = '/admin/users'
  }else if(page == 'Available Products'){
    window.location.href = '/admin/available-products'
  }
})

async function goToProfile() {
  window.location.href = '/admin/view-profile'
}

async function fetchunreadnotifications() {
  const response = await fetch("/admin/notificationsunreaded", {
    method: "POST",
  });
  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }

  const json = await response.json();
  let results = json.data;
  console.log(results);

  
    if(results == null || results == undefined){
      document.getElementById("countNotification").style.display = 'none';
    }

    if(results.length == 0){
     document.getElementById("countNotification").style.display = 'none';
    }
    
    document.getElementById("countNotification").innerText =  "+"+ results.length
  }

fetchunreadnotifications()




function scrollToSectionEar() {
    document.getElementById('third').scrollIntoView({
        behavior: 'smooth' 
    });
}

function scrollToSectionUser() {
  document.getElementById('four').scrollIntoView({
      behavior: 'smooth' 
  });
}

function scrollToSectionOrder() {
  document.getElementById('chart2').scrollIntoView({
      behavior: 'smooth' 
  });
}

function scrollToSectionSales() {
  document.getElementById('chart3').scrollIntoView({
      behavior: 'smooth' 
  });
}

