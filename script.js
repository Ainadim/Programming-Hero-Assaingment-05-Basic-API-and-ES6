const search = document.getElementById("search"),
    submit = document.getElementById("submit"),
    allMeals = document.getElementById("meals"),
    resultHeading = document.getElementById("result-heading"),
    singleMeal = document.getElementById("single-meal");


function searchMeal(event) {
    event.preventDefault();
    singleMeal.innerHTML = "";
    const term = search.value;
    if (term.trim()) {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
            .then((response) => response.json())
            .then((data) => {
                if (data.meals === null) {
                    resultHeading.innerHTML = `<h2>Nothing found ! Try with valid name.</h2>`;
                    allMeals.innerHTML = null;
                }
                else {
                    resultHeading.innerHTML = null;
                    allMeals.innerHTML = data.meals
                        .map(
                            (meal) => `
                <div class="meal-item" data-mealID="${meal.idMeal}">
                    <div class="meal-img">
                        <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
                    </div>
                    <div class="meal-name">
                        <h3>${meal.strMeal}</h3>
                    </div>
                </div>`
                        )
                        .join("");
                }
            });
        search.value = "";
    }
}
function getMealById(mealID) {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
        .then((response) => response.json())
        .then((data) => {
            const meal = data.meals[0];
            addMealToDOM(meal);
        });
}
function addMealToDOM(meal) {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients.push(
                `${meal[`strIngredient${i}`]}`
            );
        }
        else {
            break;
        }
    }
    singleMeal.innerHTML = `
    <div class="single-meal">
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
        <h1>${meal.strMeal}</h1>
        <div class="main">
            <h3>Ingredients</h3>
                ${ingredients.map((ing) => `<li>${ing}</li>`).join("")}
        </div>
    </div>`;
}
submit.addEventListener("submit", searchMeal);
allMeals.addEventListener("click", (event) => {
    const mealInfo = event.path.find((item) => {
        if (item.classList) {
            return item.classList.contains("meal-item");
        } else {
            return false;
        }
    });
    if (mealInfo) {
        const mealID = mealInfo.getAttribute("data-mealid");
        getMealById(mealID);
    }
});