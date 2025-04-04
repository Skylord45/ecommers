const ctx = document.getElementById("myChart");
new Chart(ctx, {
  type: "line",
  data: {
    labels: [
      "janunary",
      "february",
      "march",
      "april",
      "may",
      "june",
      "july",
      "august",
      "september",
      "octomber",
      "november",
      "december",
    ],
    datasets: [
      {
        label: "no. of sales",
        data: [12, 19, 3, 5, 2, 3],
        borderWidth: 1,
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});
async function fetchdataofelectronicsales() {
  const response = await fetch("/admin/fetchdataofelectronicsales", {
    method: "POST",
  });
  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }

  const json = await response.json();
  let results = json.data;
  const ctx2 = document.getElementById("pieChart");
  new Chart(ctx2, {
    type: "pie",
    data: {
      labels: results.productname,
      datasets: [
        {
          label: "no. of sales",
          data: results.no,
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}
fetchdataofelectronicsales();

const ctx3 = document.getElementById("barchart");
new Chart(ctx3, {
  type: "pie",
  data: {
    labels: ["tshirts", "pents", "caps", "jackats", "shoes", "shirts"],
    datasets: [
      {
        label: "no. of sales",
        data: [12, 19, 3, 5, 2, 3],
        borderWidth: 1,
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});
const ctx4 = document.getElementById("catwisesales");
new Chart(ctx4, {
  type: "pie",
  data: {
    labels: ["electronics", "clothes"],
    datasets: [
      {
        label: "no. of sales",
        data: [12, 10],
        borderWidth: 1,
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});
