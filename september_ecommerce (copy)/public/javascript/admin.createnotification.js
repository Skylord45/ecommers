async function fetchvendor() {
  document.getElementById("notify").innerHTML = "";
  const response = await fetch("/admin/fetch-vendors", {
    method: "POST",
  });
  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }

  const json = await response.json();
  let results = json.data;
  const names = results.map((obj) => obj.email);
  let options = document.getElementById("notify");
  //   let op1 = document.getElementById("notify").innerHTML = `<option value="${names}">to all</option>`
  let op1 = (document.getElementById(
    "notify"
  ).innerHTML = `<option value="all">to all</option>`);

  names.forEach((element) => {
    let option = `<option value="${element}">${element}</option>`;
    options.innerHTML += option;
  });
}
let form = document.getElementById("notification")
form.addEventListener("submit", async (e) => {
    e.preventDefault();
    let formdata = new FormData(form);
    const response = await fetch("/admin/sendnotification", {
      method: "POST",
      body: formdata,
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    let results = json.message;
    alert(results);
    fetchnotifications();
  });

  async function fetchnotifications() {
document.getElementById("tbody").innerHTML = "";
const response = await fetch("/admin/fetchnotifications", {
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
                <td>${result.notifictation_id}</td>
                <td>${result.notifictation_for}</td>
                <td>${result.notifictation_created_at}</td>
                <td>${result.notification_subject}</td>
                <td>${result.notifictation_content}</td>
                <td>${result.notifictation_is_readed}</td>
<td><a href="/admin/fetchoffer/${result.notifictation_is_deleted}"><button>Edit</button></a></td>
<td><button onclick="deleteoffer(this.value)" id="myBtn" value="${result.notifictation_updated}">Delete</button></td></tr>`;
tablebody.innerHTML += row;
});
}
fetchvendor();
fetchnotifications();