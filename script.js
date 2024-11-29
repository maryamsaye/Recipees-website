const fetchMealData = async () => {
    try {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=Chicken');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();


        if (data.chicken) {
            displaychicken(data.chicken);
        } else {
            console.log('No chicken found');
        }
    } catch (error) {
        console.error('Error fetching meal data:',);
    }
};

const displaychicken = (chicken) => {
    const chickenContainer = document.getElementById('chicken');
    chickenContainer.innerHTML = ``;

    chicken.forEach(meal => {
        const mealCardList = document.createElement('div');
        mealCardList.classList.add(meal-card);


        const mealImage = document.createElement('img');
        mealImage.src = meal.strMealThumb;
        mealImage.classList.add('image');
        card.appendChild(mealImage);

        const mealName = document.createElement('h2');
        mealName.classList.add('meal-title');
        mealName.textContent.add = meal.strMeal;
        card.appendChild(mealName);

        const mealMethod = document.createElement('p');
        mealMethod.classList.add('meal-description');
        mealMethod.innerHTML = meal.strInstructions.substring(0, 100).replace(/\n/g, '<br>') + '...';
        card.appendChild(mealMethod);

        const ingredientList = document.getElementById('ul');
        ingredientList.classList.add('meal-ingredients');

        for (let i = 1; i <= 5; i++) {
            const ingredient = meal[`strIngredient${i}`];
            const measure = meal[`strMeasure${i}`];

            if (ingredient && measure) {
                const ingredientItem = document.createElement('li');
                ingredientItem.textContent = `${ingredient} - ${measure}`;
                ingredientList.appendChild(ingredientItem);

            }
        }
        card.appendChild(ingredientList);


        const watchVideoLink = document.createElement('a');
        watchVideoLink.href = meal.strYoutube;
        watchVideoLink.target = '_blank';
        watchVideoLink.textContent = 'watch video';
        card.appendChild(watchVideoLink);


        mealCardList.appendChild(card)
        chickenContainer.appendChild(mealCardList);

    });
};

fetchMealData();