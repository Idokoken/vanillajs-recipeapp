//const api_url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata'
const submit = document.getElementById('submit') 
const search = document.getElementById('search') 
const random = document.getElementById('random') 
const mealHeading = document.getElementById('mealHeading')
const mealsEl = document.getElementById('meals') 
const single_meal = document.getElementById('single-meal') 
 
// search and find meal
async function searchMeal(e) {
	e.preventDefault()
//clear single meal
single_meal.innerHTML = ''
//get input value
	const input = search.value
//check for empty input
if(input.trim()) {
	try{
		const res = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=' + input)
		const data = await res.json()
		 console.log(data)
		 mealHeading.innerHTML = `<h2>Meal Result: ${input}</h2>`
		 if(data.meals === null) {
		 	mealHeading.innerHTML = `<p>There are no result '${input}'</p>`
		 } else {
		 	meals.innerHTML = data.meals.map(meal => `<div class='meal'>
		 	 <img src='${meal.strMealThumb}'  alt='${meal.strMeal}'/>
		 	 <div class='meal-info' data-mealID='${meal.idMeal}'>
		 	   <h3>${meal.strMeal}</h3>
		 	 </div>
		 	</div>`).join('')
		 }
		 // clear search text
		 search.value = ''
	} catch(err){
		console.log(err)
	}
}
	alert('enter meal')
}

// fetch $ get random meal
async function randomMeal() {
	mealsEl.innerHTML = ''
	mealHeading.innerHTML = ''
	try{
		const res = await fetch('')
		const data = await res.json()
		const meal = data.meals[0]
		
		addMealToDom(meal)
	}catch(err){
		console.log(err)
	}
}


//handle meal submit
submit.addEventListener('submit', searchMeal)
//handle random meal submit
random.addEventListener('click', randomMeal)


//single meal function
async function getMealId(mealId) {
	try{
		const res = await fetch('www.themealdb.com/api/json/v1/1/lookup.php?i=' + mealId)
		const data = await res.json()
		const meal = data.meals[0]
		addMealToDom(meal)
	}catch(err){
		threw new Error()
	}
}
//function add meal to dom
function addMealToDom(meal){
	const ingridents = []
	for(let i = 1; i <= 20; i++) {
		if(meal[`strIngrident${i}`]) {
			ingridents.push(`${meal[`strIngrident${i}`]} - ${meal[`strMeasure${i}`]}`)
		} else {
			break;
		}
	}
	single_meal.innerHTML = `<div class='singleMeal'>
	 <h2>${meal.strMeal}</h2>
	 <img src='${meal.strMealThumb}' alt='${meal.strMeal}' />
	 <div class='singleMealInfo'>
	  ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ''}
	  ${meal.strArea ? `<p>${meal.strArea}</p>` : ''}
	 </div>
	 <div class='main'>
	   <p>${meal.strInstructions}</p>
	   <h2>Ingridents</h2>
	   <ul>
	     ${ingridents.map((ingr, i) => {
	     return 	`<li>${ingr}</li>`
	     }).join()}
	   </ul>
	 </div>
	</div>`
}

// get single meal

mealsEl.addEventListener('click', (e) => {
	 const mealInfo = e.path.find(item => {
	 	if(item.classList) {
	 		return item.classList.contains('meal-info')
	 	} else {
	 		return false
	 	}
	 })
	 if(mealInfo) {
	 	const mealId = mealInfo.getAttribute('data-mealid')
	 	getMealId(mealId)
	 }
})