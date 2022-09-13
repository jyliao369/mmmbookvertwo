import React from "react";
import Axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import * as dataList from "../data";

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
      console.log(recipeName);
      Axios.get(`http://localhost:3001/getRecipeName/${recipeName}`, {}).then(
        (response) => {
          // console.log(response);
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
                rows={5}
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
                <select
                  placeholder="Category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value={""}>Select Category</option>
                  {dataList.category.map((category) => (
                    <option key={category}>{category}</option>
                  ))}
                </select>
                <select
                  value={course}
                  onChange={(e) => SetCourse(e.target.value)}
                >
                  <option value={""}>Select Course</option>
                  {dataList.course.map((course) => (
                    <option key={course} value={course}>
                      {course}
                    </option>
                  ))}
                </select>
                <select
                  value={cuisine}
                  onChange={(e) => setCuisine(e.target.value)}
                >
                  <option value={""}>Select Cuisine</option>
                  {dataList.cuisine.map((cuisine) => (
                    <option key={cuisine} value={cuisine}>
                      {cuisine}
                    </option>
                  ))}
                </select>
                <select value={diet} onChange={(e) => setDiet(e.target.value)}>
                  <option value={""}>Select Diet</option>
                  {dataList.diet.map((diet) => (
                    <option key={diet} value={diet}>
                      {diet}
                    </option>
                  ))}
                </select>
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

      <div className="createRecipeBtn">
        {recipeName === "" ||
        recipeDesc === "" ||
        prepTime === "" ||
        cookTime === "" ||
        yieldNum === "" ||
        servingsNum === "" ||
        category === "" ||
        course === "" ||
        cuisine === "" ||
        diet === "" ||
        ingredients === "" ||
        instructions === "" ||
        addNotes === "" ? (
          <button disabled={true}>Create</button>
        ) : (
          <button onClick={() => createRecipe()}>Create</button>
        )}
      </div>

      <br />
      <br />
    </div>
  );
};

export default Create;
