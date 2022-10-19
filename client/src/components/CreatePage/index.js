import React from "react";
import Axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Image } from "cloudinary-react";

import RecipeForm from "../RecipeForm";

import * as dataList from "../data";

const CreatePage = ({ currentUser }) => {
  const [recipeImage, setRecipeImage] = useState("");
  const [recipeName, setRecipeName] = useState("");
  const [recipeDesc, setrecipeDesc] = useState("");
  const [prepTime, setPrepTime] = useState("");
  const [cookTime, setCookTime] = useState("");
  const [yieldNum, setYieldNum] = useState("");
  const [servingsNum, setServingsNum] = useState("");
  const [category, setCategory] = useState("");
  const [course, setCourse] = useState("");
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
      recipeImageID: recipeImage,
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

    const data = await fetch(
      `https://api.cloudinary.com/v1_1/du119g90a/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    ).then((r) => r.json());

    console.log(data.public_id);
    setRecipeImage(data.public_id);
  };

  return (
    <div className="createRecipePage">
      <RecipeForm
        createRecipe={createRecipe}
        recipeImage={recipeImage}
        uploadImage={uploadImage}
        setRecipeImage={setRecipeImage}
        recipeName={recipeName}
        setRecipeName={setRecipeName}
        recipeDesc={recipeDesc}
        setrecipeDesc={setrecipeDesc}
        prepTime={prepTime}
        setPrepTime={setPrepTime}
        cookTime={cookTime}
        setCookTime={setCookTime}
        yieldNum={yieldNum}
        setYieldNum={setYieldNum}
        servingsNum={servingsNum}
        setServingsNum={setServingsNum}
        category={category}
        setCategory={setCategory}
        course={course}
        setCourse={setCourse}
        cuisine={cuisine}
        setCuisine={setCuisine}
        diet={diet}
        setDiet={setDiet}
        ingredients={ingredients}
        setIngredients={setIngredients}
        instructions={instructions}
        setInstructions={setInstructions}
        addNotes={addNotes}
        setAddNotes={setAddNotes}
      />
    </div>
  );
};

export default CreatePage;
