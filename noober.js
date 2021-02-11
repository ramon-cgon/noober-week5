function levelOfService(ride) {
  let levelOfService
  if (ride.length > 1) {
    levelOfService = 'Noober Pool'
  } else if (ride[0].purpleRequested) {
    levelOfService = 'Noober Purple'
  } else if (ride[0].numberOfPassengers > 3) {
    levelOfService = 'Noober XL'
  } else {
    levelOfService = 'Noober X'
  }
  return levelOfService
}
//empty arrays per level of service
let purpleRides = []
let xlRides = []
let allRides= []
let xRides = []
let poolRides =[]
// colected rides data per level of service
let ridesToShow = []
getRidesData()


//Assign an event listener to all buttons with the same class
let buttons = document.querySelectorAll('.filter-button') 
  if (document.body.addEventListener){
    document.body.addEventListener('click',clickHandler,false);
}
else{
    document.body.attachEvent('onclick',clickHandler); //for IE
}

//function handler after a click in a buttom
function clickHandler(click){
    click = click || window.event;
    let target = click.target || click.srcElement;
    if (target.className.match('filter-button'))
    {
      let htmlContent = document.querySelector('.rides')
      htmlContent.innerHTML = ""  
      //console.log("a button was clicked")
      console.log(target)
      let id = target.id
      highlight(target)
      //console.log(target.id)  
      if(id == "all-filter") {
        renderRides(ridesToShow[0])
      }
      else if(id == "noober-pool-filter") {
        renderRides(ridesToShow[1])
      }
      else if(id == "noober-purple-filter") {
        renderRides(ridesToShow[2])
      }
      else if(id == "noober-xl-filter") {
        renderRides(ridesToShow[3])
      }
      else if(id == "noober-x-filter") {
        renderRides(ridesToShow[4])
      }
    }
}

//Highlight a button clicked
var buttonClicked = null
function highlight(element) {
    if(buttonClicked != null) {
      buttonClicked.style.background = 'none'
    }
  buttonClicked = element 
  buttonClicked.style.background = "rgba(0,0,255,0.2)" 
}

//get the data from API and level them up
async function getRidesData() {
  let response = await fetch('https://kiei451.com/api/rides.json')
  let rideData = await response.json()
  for(let i=0;i<rideData.length;i++) {
    ride = rideData[i]
    lvl = levelOfService(ride)
    if(lvl == "Noober Purple") {
      purpleRides.push(ride)
    }
    else if(lvl == "Noober Pool") {
     poolRides.push(ride)
    }
    else if(lvl == "Noober XL") {
      xlRides.push(ride)
    }
    else if(lvl == "Noober X") {
      xRides.push(ride)
    }
  }
  ridesToShow[0]=rideData
  ridesToShow[1]=poolRides
  ridesToShow[2]=purpleRides
  ridesToShow[3]=xlRides
  ridesToShow[4]=xRides
}
 
function renderRides(ridesArray) {
  for (let i = 0; i < ridesArray.length; i++) {
    let ride = ridesArray[i]

    document.querySelector('.rides').insertAdjacentHTML('beforeend', `
      <h1 class="inline-block mt-8 px-4 py-2 rounded-xl text-2xl bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
        <i class="fas fa-car-side"></i>
        <span>${levelOfService(ride)}</span>
      </h1>
    `)

    let borderClass
    let backgroundClass
    if (levelOfService(ride) == 'Noober Purple') {
      borderClass = 'border-purple-500'
      backgroundClass = 'bg-purple-600'
    } else {
      borderClass = 'border-gray-900'
      backgroundClass = 'bg-gray-600'
    }

    for (let i = 0; i < ride.length; i++) {
      let leg = ride[i]

      document.querySelector('.rides').insertAdjacentHTML('beforeend', `
        <div class="border-4 ${borderClass} p-4 my-4 text-left">
          <div class="flex">
            <div class="w-1/2">
              <h2 class="text-2xl py-1">${leg.passengerDetails.first} ${leg.passengerDetails.last}</h2>
              <p class="font-bold text-gray-600">${leg.passengerDetails.phoneNumber}</p>
            </div>
            <div class="w-1/2 text-right">
              <span class="rounded-xl ${backgroundClass} text-white p-2">
                ${leg.numberOfPassengers} passengers
              </span>
            </div>
          </div>
          <div class="mt-4 flex">
            <div class="w-1/2">
              <div class="text-sm font-bold text-gray-600">PICKUP</div>
              <p>${leg.pickupLocation.address}</p>
              <p>${leg.pickupLocation.city}, ${leg.pickupLocation.state} ${leg.pickupLocation.zip}</p>
            </div>
            <div class="w-1/2">
              <div class="text-sm font-bold text-gray-600">DROPOFF</div>
              <p>${leg.dropoffLocation.address}</p>
              <p>${leg.dropoffLocation.city}, ${leg.dropoffLocation.state} ${leg.dropoffLocation.zip}</p>
            </div>
          </div>
        </div>
      `)
    }
  }
}

window.addEventListener('DOMContentLoaded', function() {
  // YOUR CODE
})
