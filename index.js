
//This is the API for the random dog facts that will be appearing towards the top of the page.

let factNumber = 1;

function renderDogFacts() {
  let dogFactHTML = document.getElementById('dogFacts')
  axios.get(`https://cors-anywhere.herokuapp.com/https://dog-facts-api.herokuapp.com/api/v1/resources/dogs?number=${factNumber}`, {
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  }).then(response => {
    dogFactHTML.innerHTML = response.data[0].fact;
  })
}
renderDogFacts()

//Called function for generating the card for adoptable dogs
console.log('im here');

function renderDog(animalsArray) {
  console.log('data fetch', animalsArray)
  const dConInner = document.createElement("div")   
  let dogHTML = animalsArray.map(currentDog => {

    if (currentDog.primary_photo_cropped === null || currentDog.primary_photo_cropped.small === '') {
      let dogCard =  `<div class="card text-white bg-dark" style="width: 18rem;">
                          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQj_vJblJLSn59TSwKbG3-CawQ39uUHDX3vf0nX8q48Mr8anv5aBai_OGk2HrtqlVh1sy0&usqp=CAU" class="card-img-top" alt="...">
                          <div class="card-body">
                              <h5 class="card-title">${currentDog.breeds.primary}</h5>
                              <p class="card-text">${currentDog.age}</p>
                              <a href="${currentDog.url}" target="_blank" class="btn btn-primary">Adopt Me</a>
                          </div>
                        </div>`
        dogsCon.innerHTML += dogCard 
    } else {
      let dogCard =  `<div class="card text-white bg-dark" style="width: 18rem;">
                          <img src="${currentDog.primary_photo_cropped.small}" class="card-img-top" alt="...">
                          <div class="card-body">
                              <h5 class="card-title">${currentDog.breeds.primary}</h5>
                              <p class="card-text">${currentDog.age}</p>
                              <a href="${currentDog.url}" target="_blank" class="btn btn-primary">Adopt Me</a>
                          </div>
                        </div>`
        dogsCon.innerHTML += dogCard;
    }
    }).join('');
}

//THis is the API for the Adoptable pets on the page
let dogsCon = document.getElementById('Dogs-Container');
let search = document.getElementById('search-form');
let search_bar = document.getElementById('search-text');
let searchBtn = document.getElementById('search_button');

var myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJ2MGk4djVyZzFVZGZITnZwQ3FzVlhCUWRjUFlOOXdtZkk5ZVpPaURVejNOT1VaQkhGWSIsImp0aSI6ImNmN2I0NTk0Mzg5MGIxNGViN2ExYTAwMzE0MmY5NjFkMTBlNzVkNTdlNDQwZjE5YmE4NGNlYjI4MjY2MTUwNGExMjI1Y2FkM2JhZmJiODI0IiwiaWF0IjoxNjQ1ODg5MzUwLCJuYmYiOjE2NDU4ODkzNTAsImV4cCI6MTY0NTg5Mjk1MCwic3ViIjoiIiwic2NvcGVzIjpbXX0.VycgijqaNuQmY2utQAkpP3ikaOYspu4vGCs3-EGikE0sYlJ5f1sM97OsV0_NNEHjOMjwrA66PfXdBA1unrXuJmWQW_2lFbgpjohGUOFeeTHKINqLoSfFtYaKu-UlgTpncm3AhTH11DqXAVkl-Pdd7qIiE7X2itrPRbH8ZQbQdO3nPkkhK4MJcGAC8KauuhQr1wW63M8L_nYODbGyHfnNAXybiYLmWk9mN1yAtoYtAP7K-IuPz1NyCJ981Fu6VbAaY7WwUzLmipMolwWYLOyHFBY0oeItoC-Q7NgYQe8UX_8EVrNWG8ntDh0k3OvjH4_Yckrtyur7iDvjeFxJoxfhBw");

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

searchBtn.addEventListener('click', (event) => {
  event.preventDefault();
  console.log('search btn click');
  let search_string = search_bar.value;
  console.log('after search', search_string)
  
    // fetch(`https://api.petfinder.com/v2/animals?type=dog&location=${search_string}`, requestOptions)
      fetch(`https://cors-anywhere.herokuapp.com/https://api.petfinder.com/v2/animals?type=dog&location=${search_string}`, requestOptions)
      .then(response => response.json())
      .then(function (data) {
        console.log('data', data)
      renderDog(data.animals)
      });
});
 
 
function nextFact() {
  factNumber++;
  renderDogFacts();
}

function previousFact() {
  if (factNumber==0) {
    return;
  }
  factNumber--;
  renderDogFacts();
}