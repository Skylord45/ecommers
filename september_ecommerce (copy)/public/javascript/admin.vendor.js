function toggleSidebar() {
  const sidebar = document.querySelector(".sidebar");
  const mainContent = document.querySelector(".main-content");
  sidebar.classList.toggle("active");
  mainContent.classList.toggle("shifted");
}


async function fetchvendor() {
  document.getElementById("tbody").innerHTML = "";
  // console.log("here")
  const response = await fetch("/admin/fetch-vendors", {
    method: "POST",
  });
  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }

  const json = await response.json();
  let results = json.data;
  let tablebody = document.getElementById("tbody");
  results.forEach((result) => {
    const row = `<tr>
                    <td>${result.first_name}</td>
                    <td>${result.email}</td>
                    <td>${result.company_name}</td>
                    <td>${result.gst_number}</td>
                    <td>${result.is_verified}</td>
                    <td>${result.created_at}</td>
                    <td>${result.is_active}</td>
<td><button onclick="showcard(this.value)" id="myBtn" value="${result.vendor_id}">show details</button></td> </tr>`;
    tablebody.innerHTML += row;
  });
}

var modal = document.getElementById("myModal");
var btn = document.getElementById("closebutton");
btn.onclick = function () {
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
};
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

async function showcard(id) {
    var modal = document.getElementById("myModal");
    modal.style.display = "block";
  document.getElementById("result").innerHTML = ``;

  // fetchapi
  const response = await fetch(`/admin/fetch-vendor-details/${id}`, {
    method: "GET",
  });
  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }

  const json = await response.json();
  let results = json.data;
  let data = results[0];
  document.getElementById("result").innerHTML = `
<div class="card">
<div class="container">
  <p><b>vendor_id : </b>${data.vendor_id}</p>
  <p><b>first_name : </b>${data.first_name}</p>
  <p><b>last_name : </b>${data.last_name}</p>
  <p><b>email : </b>${data.email}</p>
  <p><b>mobile_number : </b>${data.mobile_number}</p>
  <p><b>company_name : </b>${data.company_name}</p>
  <p><b>gst_number : </b>${data.gst_number}</p>
  <p><b>is_verified : </b>${data.is_verified}</p>
  <p><b>created_at : </b>${data.created_at}</p>
  <p><b>updated_at : </b>${data.updated_at}</p>
  <p><b>is_active : </b>${data.is_active}</p>
  <p><b>city : </b>${data.city}</p>
  <p><b>state : </b>${data.state}</p>

</div>
</div> `;
}
async function fetchactivevendorgraph() {
  const response = await fetch("/admin/fetchactivevendordata", {
    method: "POST",
  });
  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }

  const json = await response.json();
  let results = json.data;
  let inputarray = []
  inputarray.push(results.active);
  inputarray.push(results.notactive);
  const ctx2 = document.getElementById("pieChart");
new Chart(ctx2, {
  type: "pie",
  data: {
    labels: ["active","not active"],
    datasets: [
      {
        label: "# of Votes",
        data: inputarray,
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


async function fetchcatvendorgraph() {
  const response = await fetch("/admin/fetchcatvendordata", {
    method: "POST",
  });
  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }

  const json = await response.json();
  let results = json.data;
  let inputarray = []
  inputarray.push(results.electronics);
  inputarray.push(results.clothes);
  // console.log(inputarray)
  const ctx = document.getElementById("barChart");
new Chart(ctx, {
  type: "line",
  data: {
    labels: ["Electronics", "Clothes"],
    datasets: [
      {
        label: "# of Votes",
        data: inputarray,
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
fetchcatvendorgraph()
fetchactivevendorgraph()
fetchvendor();