async function getUserByGroupByCitys() {
  let respone = await fetch("/admin/userGroupByCity");
  let result = await respone.json();

  // console.log(result);

  let xUserByGroupByCitysValues = [];
  let yUserByGroupByCitysValues = [];
  let barColors = ["#b91d47", "#00aba9", "#2b5797", "#e8c3b9", "#1e7145"];

  for (let i = 0; i < result.data.length; i++) {
    // console.log(result.data[i].order_status);

    xUserByGroupByCitysValues[i] = result.data[i].city;
    yUserByGroupByCitysValues[i] = result.data[i].cnt;
  }

  let chart1 = document.getElementById("myBarChart").getContext("2d");

  const myChart1 = new Chart(chart1, {
    type: "pie",
    data: {
      labels: xUserByGroupByCitysValues,
      datasets: [
        {
          backgroundColor: barColors,
          data: yUserByGroupByCitysValues,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
    },
  });
}

getUserByGroupByCitys();

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

function paginationNumber(page, lastPage) {
  let paginationHtml = `<ul>`;

  if (page > 1) {
    paginationHtml += `<li><a href="/deshboard/list/getdata/?page=1" id="first" onclick="getData(event)"> << </a></li>`;
  }

  if (page > 1) {
    paginationHtml += `<li><a href="/deshboard/list/getdata/?page=${
      parseInt(page) - 1
    }" id="second" onclick="getData(event)"> ${parseInt(page) - 1} </a></li>`;
  }

  paginationHtml += `<li><a href="/deshboard/list/getdata/?page=${page}" id="mid" onclick="getData(event)"> ${page} </a></li>`;

  if (page < lastPage) {
    paginationHtml += `<li><a href="/deshboard/list/getdata/?page=${
      parseInt(page) + 1
    }" id="seclast" onclick="getData(event)"> ${parseInt(page) + 1} </a></li>`;
  }

  if (page < lastPage) {
    paginationHtml += `
                        <li><a href="/deshboard/list/getdata/?page=${lastPage}" id="last" onclick="getData(event)"> >> </a></li>`;
  }

  paginationHtml += `</ul>`;

  document.getElementById("paginationNumber").innerHTML = paginationHtml;
}
