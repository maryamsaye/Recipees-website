const fetchMealData = async () => {
    try {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=Chicken');
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        const data = await response.json();

        if (data.meals) {
            displayChicken(data.meals);
        } else {
            console.log('No chicken found');
        }
    } catch (error) {
        console.error('Error fetching meal data:', error);
    }
};

const displayChicken = (meals) => {
    const chickenContainer = document.getElementById('chicken');
    
    chickenContainer.innerHTML = '';

    meals.forEach(meal => {
        const mealCard = document.createElement('div');
        mealCard.classList.add('meal-card');

        const mealImage = document.createElement('img');
        mealImage.src = meal.strMealThumb;
        mealImage.classList.add('image');
        mealImage.alt = meal.strMeal; 
        mealCard.appendChild(mealImage);

        const mealTitle = document.createElement('h2');
        mealTitle.classList.add('meal-title');
        mealTitle.textContent = meal.strMeal; 
        mealCard.appendChild(mealTitle);

        const mealDescription = document.createElement('p');
        mealDescription.classList.add('meal-description');
        mealDescription.textContent = meal.strInstructions.substring(0, 100) + '...'; 
        mealCard.appendChild(mealDescription);

        
        const mealIngredients = document.createElement('ul');
        mealIngredients.classList.add('meal-ingredients');


        for (let i = 1; i <= 5; i++) {
            const ingredient = meal[`strIngredient${i}`];
            const measure = meal[`strMeasure${i}`];

            if (ingredient && measure) {
                const ingredientItem = document.createElement('li');
                ingredientItem.textContent = `${ingredient} - ${measure}`; 
                mealIngredients.appendChild(ingredientItem);
            }
        }
        mealCard.appendChild(mealIngredients);

        const watchVideoLink = document.createElement('a');
        watchVideoLink.href = meal.strYoutube;
        watchVideoLink.target = '_blank';
        watchVideoLink.classList.add('meal-video');
        watchVideoLink.textContent = 'Watch video';
        mealCard.appendChild(watchVideoLink);


        chickenContainer.appendChild(mealCard);
    });
};

fetchMealData();
