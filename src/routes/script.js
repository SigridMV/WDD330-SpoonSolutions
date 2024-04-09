document.addEventListener("DOMContentLoaded", async () => {
  const recipeCardsContainer = document.getElementById("recipeCards");

  try {
    const response = await fetch("/random-recipes");
    const randomRecipes = await response.json();

    recipeCardsContainer.innerHTML = "";

    randomRecipes.forEach((recipe) => {
      const recipeCard = createRecipeCard(recipe);
      recipeCardsContainer.appendChild(recipeCard);
    });
  } catch (error) {
    console.error("Error fetching random recipes:", error);
    recipeCardsContainer.innerHTML =
      "<p>An error occurred while fetching random recipes.</p>";
  }
});

function createRecipeCard(recipe) {
  const recipeCard = document.createElement("div");
  recipeCard.classList.add("recipe-card");

  const title = document.createElement("h2");
  title.textContent = recipe.title;

  const image = document.createElement("img");
  image.src = recipe.image;

  const ingredientsList = document.createElement("ul");
  recipe.extendedIngredients.forEach((ingredient) => {
    const ingredientItem = document.createElement("li");
    ingredientItem.textContent = ingredient.original;
    ingredientsList.appendChild(ingredientItem);
  });

  recipeCard.appendChild(title);
  recipeCard.appendChild(image);
  recipeCard.appendChild(ingredientsList);

  return recipeCard;
}
