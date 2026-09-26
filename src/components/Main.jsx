import React from 'react'
import ClaudeRecipe from './ClaudeRecipe';
import IngredientsList from './IngredientsList';
import { getRecipeFromGemini } from "../ai"

export default function Main() {
  const [ingredients, setIngredients] = React.useState([]);

  const [recipe, setRecipe] = React.useState("")
  const recipeSection = React.useRef(null)

  
  const addIngredient = (formData) => {
      const newIngredient = formData.get("ingredient");
      setIngredients(ingredients => [...ingredients, newIngredient])
  }

  React.useEffect(() => {
    if (recipe !== "" && recipeSection.current !== null) {
            recipeSection.current.scrollIntoView({behavior: "smooth"})
    }
  }, [recipe])

  const getRecipe = async () => {
      console.log("getRecipe was called!")

      try {
          const response = await getRecipeFromGemini(ingredients)
          setRecipe(response)
      } catch (error) {
          console.error("Error:", error)
      }
  }

  return (
    <main>
        <form className='add-ingredient-form' action={addIngredient}>
            <input type="text" aria-label="Add ingredient" placeholder='e.g. oregano' name='ingredient'/>
            <button>Add ingredient</button>
        </form>
        {ingredients.length ? <IngredientsList ref={recipeSection} getRecipe={getRecipe} ingredients={ingredients}/> : null}
        {recipe && <ClaudeRecipe recipe={recipe}/>}
    </main>
  )
}
