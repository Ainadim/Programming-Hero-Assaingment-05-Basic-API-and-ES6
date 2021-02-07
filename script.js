    const search = document.getElementById("search"),
    submit = document.getElementById("submit"),
    mealsEl = document.getElementById("meals"),
    resultHeading = document.getElementById("result-heading"),
    single_mealEl = document.getElementById("single-meal");
    function searchMeal(event) {
        event.preventDefault();
        single_mealEl.innerHTML = "";
        const term = search.value;
        if (term.trim()) {
            fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
            .then((response) => response.json())
            .then((data) => {
                resultHeading.innerHTML = `<h2>Search results for '${term}':</h2>`;
                if (data.meals === null) {
                    resultHeading.innerHTML = `<h2>Nothing found ! Try with valid name.</h2>`;
                }
                else {
                mealsEl.innerHTML = data.meals
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

    // Comment

    // function getMealByID(mealID) {
    //     fetch (`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    //     .then((response) => response.json())
    //     .then((data) => {
    //         const meal = data.meals[0];
    //         addMealToDOM(meal);
    //     });
    // }
    // function addMealToDOM(meal){
    //     const ingredents = [];
    //     for (let i = 1; i <= 20; i++) {
    //         if(meal[`strIngredient${i}`]) {
    //             ingredents.push(
    //                 `${meal[`strIngredient${i}`]}-${meal[`strMeasure${i}`]}`
    //             );
    //         }
    //         else {
    //             break;
    //         }
    //     }
    //     single_mealEl.innerHTML = `
    //     <div class="single-meal">
    //         <h1>${meal.strMeal}</h1>
    //         <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
    //         <div class="single-meal-info">
    //             ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ""}
    //             ${meal.strArea ? `<p>${meal.strArea}</p>` : ""}
    //         </div>
    //         <div class="main">
    //             <p>${meal.strInstructions}</p>
    //             <h2>Ingredients</h2>
    //             <ul>
    //                 ${ingredients.map((ing) => `<li>${ing}</li>`).join("")}
    //             </ul>
    //         </div>
    //     </div>`;
    // }

    // Comment
    function getMealByID(mealID) {
            fetch (`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
            });
        }
    submit.addEventListener("submit", searchMeal);
    mealsEl.addEventListener("click", (event) => {
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