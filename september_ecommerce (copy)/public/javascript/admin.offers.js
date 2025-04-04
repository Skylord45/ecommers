let form = document.getElementById("offerform")
form.addEventListener('submit',async (e)=>{
    e.preventDefault()
    let formdata = new FormData(form)
    const response = await fetch("/admin/offers", {
    method: "POST",
    body: formdata,
  });
  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }

  const json = await response.json();
  let results = json.message;
  alert(results)
  fetchoffers()
})

async function fetchoffers() {
   document.getElementById("tbody").innerHTML = "";
    const response = await fetch("/admin/fetchoffers", {
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
                    <td>${result.offer_name}</td>
                    <td>${result.offer_start_date}</td>
                    <td>${result.offer_end_date}</td>
                    <td>${result.is_expired}</td>
                    <td>${result.offer_updated_at}</td>
                    <td>${result.offer_created_at}</td>
<td><a href="/admin/fetchoffer/${result.offer_id}"><button>Edit</button></a></td>
<td><button onclick="deleteoffer(this.value)" id="myBtn" value="${result.offer_id}">Delete</button></td></tr>`;
    tablebody.innerHTML += row;
  });
}
async function deleteoffer(id) {
    let text = "Do you want to delete offer";
  if (confirm(text) == true) {
    let formdata = new FormData(form)
    formdata.append("id",id)
    const response = await fetch("/admin/deleteoffers", {
    method: "POST",
    body: formdata,
  });
  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }

  const json = await response.json();
  let results = json.message;
  alert(results)
  } else {
    alert("you prevented the delete offer!")
  }
    
fetchoffers()
}
fetchoffers()