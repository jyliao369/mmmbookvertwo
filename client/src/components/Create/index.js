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
    Axios.post("https://mmmbook-vertwo-server.herokuapp.com/createRecipe", {
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
      Axios.get(
        `https://mmmbook-vertwo-server.herokuapp.com/getRecipeName/${recipeName}`,
        {}
      ).then((response) => {
        // console.log(response);
        navToRecipe(`/recipe/${response.data[0].recipeID}`);
      });
    });
  };

  const uploadImage = async (image) => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "yun8815z");

    // Axios.post(
    //   `https://api.cloudinary.com/v1_1/du119g90a/image/upload`,
    //   formData
    // ).then((response) => {
    //   console.log(response);
    // });

    const data = await fetch(
      `https://api.cloudinary.com/v1_1/du119g90a/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    ).then((r) => r.json());

    console.log(data);
  };

  return (
    <div className="createRecipePage">
      <div className="createRecipeCont">
        <div className="createRecipeFormA">
          <div className="createRecipeFormAb">
            <div>
              <div className="createRecipeHeader">
                <h1>Create A Recipe</h1>
              </div>
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
                  rows={7}
                />
              </div>
              <div className="createNewRecipeAc">
                <select
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
              <div className="createNewRecipeAc">
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
          </div>
          <div className="createNewRecipeImg">
            <input
              type={"file"}
              accept="image/*"
              className="addImage"
              onChange={(event) => {
                uploadImage(event.target.files[0]);
              }}
            />
          </div>
        </div>

        <div className="createRecipeFormB">
          <div className="createNewRecipeBa">
            <div className="ingCreateRecipe">
              <div>
                <h1>Ingredients</h1>
              </div>
              <textarea
                placeholder="Ingredients"
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
              />
            </div>
            <div className="verticalDivide" />
            <div className="insCreateRecipe">
              <div>
                <h1>Instructions</h1>
              </div>
              <textarea
                placeholder="Instructions"
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
              />
            </div>
          </div>
          <div className="createNewRecipeBb">
            <div>
              <h2>Additional Notes</h2>
            </div>
            <textarea
              placeholder="Additional Notes"
              value={addNotes}
              onChange={(e) => setAddNotes(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;
