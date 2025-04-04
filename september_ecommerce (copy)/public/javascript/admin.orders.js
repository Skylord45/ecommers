
let barColors = ["#b91d47", "#00aba9", "#2b5797", "#e8c3b9", "#1e7145"];

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
  


async function getOrdersDetails() {
    let table = document.getElementById("orderTabel");
  
    let str = " ";
  
    let respone = await fetch("/admin/order-listing");
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
  getOrdersDetails()