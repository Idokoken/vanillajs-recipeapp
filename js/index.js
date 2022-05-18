//const api_url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata'
const submit = document.getElementById('submit') 
const search = document.getElementById('search') 
const random = document.getElementById('random') 
const mealHeading = document.getElementById('mealHeading')
const meals = document.getElementById('meals') 
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
		const res = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=' +- input)
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
//handle meal submit
submit.addEventListener('click', searchMeal)