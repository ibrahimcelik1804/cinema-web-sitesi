//console.log('Bağlantı kontrolü')
//alert('bağlantı kontrolü')

//1- tüm koltukların kapsayıcısı olan container div cek
//2-container a clikck eventi akle

//html tarafindan getElementsByClassName ile class name üzerinden eleman cekme
//const container=document.getElementsByClassName("container");

//html tarafindan querySelector ile class name üzerinden eleman cekme
const container = document.querySelector(".container");
// html ile cekilen elemean kontrolu
//console.log(container);

const infoText = document.querySelector(".infoText");
//console.log('infoText')
const movieList = document.querySelector("#movie");
//console.log(movieList)

const seatCount = document.getElementById("count");
//console.log(seatCount)
const totalAmount = document.getElementById("amount");
//console.log(totalAmount)

const seats = document.querySelectorAll(".seat:not(.reserved)");
//console.log(seats)

const saveToDatabase = (index) => {
  //console.log('data', index)

  localStorage.setItem("seatsIndex", JSON.stringify(index));

  //film verisi kaydı
  localStorage.setItem("movieIndex", JSON.stringify(movieList.selectedIndex));
};
const getFromDatabase = () => {
  const dbSelectedSeats = JSON.parse(localStorage.getItem("seatsIndex"));
  //console.log(dbSelectedSeats)
  if (dbSelectedSeats !== null) {
    seats.forEach((seat, index) => {
      if (dbSelectedSeats.includes(index)) {
        seat.classList.add('selected')
      }
    });
  }
  const dbSelectedMovie =JSON.parse(localStorage.getItem('movieIndex'));
  movieList.selectedIndex = dbSelectedMovie;
};

getFromDatabase();

const createIndex = () => {
  let allSeatsArray = [];
  seats.forEach((seat) => {
    allSeatsArray.push(seat);
  });

  //console.log(allSeatsArray)

  const allSelectedSeatsArray = [];

  const allSelectedSeats = container.querySelectorAll(".seat.selected");
  allSelectedSeats.forEach((selectedSeat) => {
    allSelectedSeatsArray.push(selectedSeat);
  });
  //console.log(allSelectedSeatsArray)
  const selectedSeatsIndex = allSelectedSeatsArray.map((selectedSeat) => {
    return allSeatsArray.indexOf(selectedSeat);
  });
  //console.log(selectedSeatsIndex );

  saveToDatabase(selectedSeatsIndex);
};

const calculateTotal = () => {
  createIndex();
  // console.log('calculate çalıştı')
  let selectedSeatsCount = container.querySelectorAll(".seat.selected").length;
  //console.log(selectedSeatsCount)

  seatCount.innerText = selectedSeatsCount;
  //  console.log(count);
  totalAmount.innerText = selectedSeatsCount * movieList.value;
  //console.log(totalAmount)
  if (selectedSeatsCount) {
    infoText.classList.add("open");
  } else {
    infoText.classList.remove("open");
  }
};

calculateTotal();

container.addEventListener("click", (pointerEvent) => {
  //console.log('container tikla')
  //console.log(pointerEvent.target.offsetParent)
  const clickedSeat = pointerEvent.target.offsetParent;

  if (
    clickedSeat.classList.contains("seat") &&
    !clickedSeat.classList.contains("reserved")
  ) {
    clickedSeat.classList.toggle("selected");
  }
  calculateTotal();
});
movieList.addEventListener("change", () => {
  calculateTotal();
});
