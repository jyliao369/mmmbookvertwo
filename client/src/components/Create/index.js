import React from "react";
import Axios from "axios";
import { useState } from "react";

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
          <div className="createNewRecipeInfo">
            <input placeholder="Recipe Name" />
            <textarea placeholder="Recipe Description" />
            <div className="createNewRecipeInfoA">
              <input placeholder="Prep Time" />
              <input placeholder="Cook Time" />
              <input placeholder="Yield" />
              <input placeholder="Servings" />
            </div>
            <div className="createNewRecipeInfoA">
              <input placeholder="Category" />
              <input placeholder="Course" />
              <input placeholder="Cuisine" />
              <input placeholder="Diet" />
            </div>
          </div>
        </div>
        <div className="createRecipeFormB">
          <div className="createNewRecipeInfoB">
            <div className="createNewRecipeInfoBA">
              <div className="createNewRecipeIng">
                <textarea placeholder="Ingredients" />
              </div>
              <div className="createNewRecipeIns">
                <textarea placeholder="Instructions" />
              </div>
            </div>
            <div className="createNewRecipeAdd">
              <textarea placeholder="Additional Notes" />
            </div>
          </div>
        </div>
      </div>

      {/* <div className="recipePartOne">
        <div className="recipePartOneA">
          <input
            placeholder="Recipe Name"
            value={recipeName}
            onChange={(e) => setRecipeName(e.target.value)}
          />
          <input
            placeholder="Recipe Description"
            value={recipeDesc}
            onChange={(e) => setrecipeDesc(e.target.value)}
          />
        </div>
        <div className="recipePartOneAB">
          <div className="recipePartOneAC">
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
          <div className="recipePartOneAC">
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

      <br />
      <br />

      <div className="recipePartTwo">
        <div className="recipePartTwoA">
          <textarea
            placeholder="Ingredients"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            rows={6}
          />
          <textarea
            placeholder="Instructions"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            rows={6}
          />
        </div>
        <textarea
          placeholder="Additional Notes"
          value={addNotes}
          onChange={(e) => setAddNotes(e.target.value)}
        />
      </div>

      <br />
      <br />
      <button onClick={() => createRecipe()}>Create</button> */}

      <br />
      <br />
    </div>
  );
};

export default Create;
