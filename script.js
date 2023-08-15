let listMakanan = [];

$(document).ready(function () {
  $("#gantiMakanan").modal("hide");

  console.log(localStorage.length);

  if (localStorage.length == 0) {
    console.log("JSON");
    $.getJSON("listMakanan.json", function (data) {
      console.log(listMakanan);
      listMakanan = data["listMakanan"];
      console.log(listMakanan);
      showListMakanan();
    });
  } else {
    console.log("localStorage");
    for (let i = 0, len = localStorage.length; i < len; i++) {
      console.log("Tabel Makanan");
      listMakanan[i] = localStorage.getItem("food_id_" + i);
    }
  }

  showListMakanan();
});

function showListMakanan() {
  let list = $("#tabelMakanan > tbody");
  list.html("");
  $("#acakMakanan").html("");

  if (listMakanan.length > 0) {
    for (let i = 0, len = listMakanan.length; i < len; i++) {
      list.append(
        "<tr>" +
          "<td>" +
          (i + 1) +
          "</td>" +
          "<td>" +
          listMakanan[i] +
          "</td>" +
          "<td>" +
          '<button class="btn btn-primary" onclick="editMakanan(' +
          i +
          ')">Edit</button>' +
          '<button class="btn btn-danger" onclick="deleteMakanan(' +
          i +
          ')">Delete</button>' +
          "</td>" +
          "</tr>"
      );
    }

    $("#acakMakanan").html(
      '<button class="btnrandom " id="acakMakanan-btn">Randomize</button>'
    );
  }
}

$("#masukanMakanan").submit(function (event) {
  event.preventDefault();

  let value = $("#masukanMakanan > input").val();

  if (!value) {
    alert("Input nama makanan dengan benar..");
    return;
  }

  if (
    listMakanan.findIndex(
      (item) => item.toUpperCase() === value.toUpperCase()
    ) > 0
  ) {
    alert("Nama makanan tersebut sudah ada..");
    return;
  }

  listMakanan.push(value);
  updateListMakanan();

  showListMakanan();
});

function editMakanan(id) {
  $("#gantiMakanan-btn").attr("onclick", "_editMakanan(" + id + ")");
  $("#gantiMakanan").modal("show");
}

function _editMakanan(id) {
  event.preventDefault();

  let value = $("#gantiMakanan-input").val();

  if (!value) {
    alert("Input nama makanan dengan benar..");
    return;
  }

  if (
    listMakanan.findIndex(
      (item) => item.toUpperCase() === value.toUpperCase()
    ) >= 0
  ) {
    alert("Makanan tersebut sudah ada..");
    return;
  }

  listMakanan[id] = value;
  updateListMakanan();

  $("#gantiMakanan").modal("hide");

  showListMakanan();
}

function deleteMakanan(id) {
  $("#hapusMakanan-btn").attr("onclick", "_deleteMakanan(" + id + ")");
  $("#hapusMakanan").modal("show");
}

function _deleteMakanan(id) {
  event.preventDefault();

  if (id < 0) return;

  listMakanan.splice(id, 1);
  updateListMakanan();

  $("#hapusMakanan").modal("hide");

  showListMakanan();
}

function updateListMakanan() {
  localStorage.clear();
  console.log(localStorage.length);
  for (let i = 0, len = listMakanan.length; i < len; i++) {
    localStorage.setItem("food_id_" + i, listMakanan[i]);
  }
  console.log(localStorage.length);
}

$(document).on("click", "#acakMakanan-btn", function () {
  if (listMakanan.length < 3) {
    alert("Pilih makanan lebih dari 3..");
    return;
  }

  let array = listMakanan;
  arrayRandomize(array);

  $("#acakMakanan-result").html(
    "<h4>Breakfast : <span>" +
      array[0] +
      "</span></h4><br>" +
      "<h4>Lunch : <span>" +
      array[1] +
      "</span></h4><br>" +
      "<h4>Dinner : <span>" +
      array[2] +
      "</span></h4>"
  );
});

function arrayRandomize(array) {
  let currentIndex = array.length,
    randomIndex,
    temporaryValue;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
