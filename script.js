    const search = document.getElementById("search"),
    submit = document.getElementById("submit"),
    mealsEl = document.getElementById("meals"),
    resultHeading = document.getElementById("result-heading"),
    single_mealEl = document.getElementById("single-meal");
    function searchMeal(event) {
        event.preventDefault();
        resultHeading.innerHTML = "";
        const term = search.value;
        if (term.trim()) {
            fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                if (data.meals === null) {
                    resultHeading.innerHTML = `<h2>Nothing found ! Try with valid name.</h2>`;
                }
                else {
                mealsEl.innerHTML = data.meals
                    .map(
                    (meal) =>`
                    <div class="meal-item">
                        <div class="meal-img">
                            <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
                        </div>
                        <div class="meal-name" data-mealID="${meal.idMeal}">
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
    submit.addEventListener("submit", searchMeal);