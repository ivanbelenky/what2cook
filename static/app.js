
window.addEventListener('load', () => {    
	const cookButton = document.querySelector('#cookButton')
    cookButton.addEventListener('click', findRecipe)
    const nextRecipeButton = document.querySelector('#nextRecipeButton')
    nextRecipeButton.addEventListener('click', findRecipe)

});


const findRecipe = async (event) =>{
    event.preventDefault()
    var ingredientsText = document.querySelector('#ingredientsText')
    if (ingredientsText.value == ''){
        var ingredients = ingredientsText.placeholder 
    }
    else{
        var ingredients = ingredientsText.value
    }

    const data = await axios.get(
        `${window.location.origin}/recipes`,
        {
            params: { 
                        ingr: ingredients,
                    },
        }
    );

    const recipeText = document.getElementById("recipeText")
    const nextRecipeButton = document.getElementById("nextRecipeButton")


    recipeText.style.display = 'inline'
    nextRecipeButton.style.display = 'inline'
    
    var c=0
    for(let i=0; i<data.data.recipe.length ; i++){
        i = i + Math.floor(Math.random()*5+3) 
        await setTimeout(()=>{
            recipeText.innerHTML=data.data.recipe.slice(0,i);
        }, c*75)
        c += 1
    }
}
