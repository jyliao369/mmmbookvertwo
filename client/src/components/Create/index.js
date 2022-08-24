import React from "react";
import Axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Create = ({ currentUser }) => {
  const [recipeName, setRecipeName] = useState("");
  const [recipeDesc, setrecipeDesc] = useState("");
  const [prepTime, setPrepTime] = useState("");
  const [cookTime, setCookTime] = useState("");
  const [yieldNum, setYieldNum] = useState("");
  const [servingsNum, setServingsNum] = useState("");
  const [category, setCategory] = useState("");
  const [course, SetCourse] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [diet, setDiet] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [addNotes, setAddNotes] = useState("");

  const navToRecipe = useNavigate();

  const createRecipe = () => {
    Axios.post("http://localhost:3001/createRecipe", {
      userID: currentUser.userID,
      username: currentUser.username,
      recipeName: recipeName,
      recipeDesc: recipeDesc,
      prepTime: prepTime,
      cookTime: cookTime,
      yieldNum: yieldNum,
      servingsNum: servingsNum,
      category: category,
      course: course,
      cuisine: cuisine,
      diet: diet,
      ingredients: ingredients,
      instructions: instructions,
      addNotes: addNotes,
    }).then((response) => {
      console.log(response);
      Axios.get(`http://localhost:3001/getRecipe/${recipeName}`, {}).then(
        (response) => {
          // console.log(response.data[0].recipeID);
          navToRecipe(`/recipe/${response.data[0].recipeID}`);
        }
      );
    });
  };

  return (
    <div className="createRecipePage">
      <div className="pageBanner">
        <p>Create a Recipe</p>
      </div>
      <div className="createRecipeCont">
        <div className="createRecipeFormA">
          <div className="createNewRecipeImg"></div>
          <div className="createNewRecipeA">
            <div className="createNewRecipeAb">
              <input
                placeholder="Recipe Name"
                value={recipeName}
                onChange={(e) => setRecipeName(e.target.value)}
              />
              <textarea
                placeholder="Recipe Description"
                value={recipeDesc}
                onChange={(e) => setrecipeDesc(e.target.value)}
                rows={4}
              />
            </div>
            <div className="createNewRecipeAc">
              <div className="createNewRecipeInfoAc">
                <input
                  placeholder="Prep Time (min)"
                  type={"number"}
                  value={prepTime}
                  onChange={(e) => setPrepTime(e.target.value)}
                />
                <input
                  placeholder="Cook Time (min)"
                  type={"number"}
                  value={cookTime}
                  onChange={(e) => setCookTime(e.target.value)}
                />
                <input
                  placeholder="# of Yield"
                  type={"number"}
                  value={yieldNum}
                  onChange={(e) => setYieldNum(e.target.value)}
                />
                <input
                  placeholder="# of Servings"
                  type={"number"}
                  value={servingsNum}
                  onChange={(e) => setServingsNum(e.target.value)}
                />
              </div>
              <div className="createNewRecipeInfoAc">
                <input
                  placeholder="Category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
                <input
                  placeholder="Course Type"
                  value={course}
                  onChange={(e) => SetCourse(e.target.value)}
                />
                <input
                  placeholder="Cuisine Type"
                  value={cuisine}
                  onChange={(e) => setCuisine(e.target.value)}
                />
                <input
                  placeholder="Diet Type"
                  value={diet}
                  onChange={(e) => setDiet(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="createRecipeFormB">
          <div className="createNewRecipeB">
            <div className="createNewRecipeBa">
              <div className="createRecipeIng">
                <textarea
                  placeholder="Ingredients"
                  value={ingredients}
                  onChange={(e) => setIngredients(e.target.value)}
                />
              </div>
              <div className="createRecipeIns">
                <textarea
                  placeholder="Instructions"
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                />
              </div>
            </div>
            <div className="createRecipeAdd">
              <textarea
                placeholder="Additional Notes"
                value={addNotes}
                onChange={(e) => setAddNotes(e.target.value)}
                rows={4}
              />
            </div>
          </div>
        </div>
      </div>

      <br />
      <br />

      <div className="createRecipeBtn">
        <button onClick={() => createRecipe()}>Create</button>
      </div>

      <br />
      <br />
    </div>
  );
};

export default Create;
