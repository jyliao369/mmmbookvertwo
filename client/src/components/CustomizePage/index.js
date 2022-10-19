import React from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Axios from "axios";
import RecipeForm from "../RecipeForm";

const CustomizePage = ({ currentUser }) => {
  let { recipeID } = useParams();
  const [originName, setOriginName] = useState("");

  const [customImage, setCustomImage] = useState("");
  const [customName, setCustomName] = useState("");
  const [customDesc, setCustomDesc] = useState("");
  const [customCategory, setCustomCategory] = useState("");
  const [customCourse, setCustomCourse] = useState("");
  const [customCuisine, setCustomCuisine] = useState("");
  const [customDiet, setCustomDiet] = useState("");
  const [customPrep, setCustomPrep] = useState("");
  const [customCook, setCustomCook] = useState("");
  const [customYield, setCustomYield] = useState("");
  const [customServings, setCustomServings] = useState("");
  const [customIng, setCustomIng] = useState("");
  const [customIns, setCustomIns] = useState("");
  const [customAdd, setCustomAdd] = useState("");

  const navToRecipe = useNavigate();

  const CustomizeRecipe = () => {
    // console.log("Customizing Recipe");

    // console.log("delete bookmark");
    // console.log(recipeID);
    // console.log(currentUser.userID);
    // console.log(currentUser.username);

    // console.log(originName);

    Axios.post("http://localhost:3001/createRecipe", {
      userID: currentUser.userID,
      username: currentUser.username,
      origRecipeID: recipeID,
      origRecipeName: originName,
      recipeImageID: customImage,
      recipeName: customName,
      recipeDesc: customDesc,
      prepTime: customPrep,
      cookTime: customCook,
      yieldNum: customYield,
      servingsNum: customServings,
      category: customCategory,
      course: customCourse,
      cuisine: customCuisine,
      diet: customDiet,
      ingredients: customIng,
      instructions: customIns,
      addNotes: customAdd,
    }).then((response) => {
      console.log(customName);

      // THIS DELETES THE BOOKMARK FROM USERS LIST
      Axios.delete(
        `http://localhost:3001/deleteBookmark/${recipeID}_${currentUser.userID}_${currentUser.username}`,
        {}
      ).then((response) => {
        console.log(response);
      });

      Axios.get(
        `https://mmmbook-vertwo-server.herokuapp.com/getRecipeName/${customName}`,
        {}
      ).then((response) => {
        // console.log(response);
        navToRecipe(`/recipe/${response.data[0].recipeID}`);
      });
    });
  };

  const customizingImage = async (image) => {
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

    setCustomImage(data.public_id);
  };

  return (
    <div className="customizePage">
      <RecipeForm
        recipeID={recipeID}
        test={"Customize"}
        customImage={customImage}
        setCustomImage={setCustomImage}
        customizingImage={customizingImage}
        originName={originName}
        setOriginName={setOriginName}
        customName={customName}
        setCustomName={setCustomName}
        customDesc={customDesc}
        setCustomDesc={setCustomDesc}
        customCategory={customCategory}
        setCustomCategory={setCustomCategory}
        customCourse={customCourse}
        setCustomCourse={setCustomCourse}
        customCuisine={customCuisine}
        setCustomCuisine={setCustomCuisine}
        customDiet={customDiet}
        setCustomDiet={setCustomDiet}
        customPrep={customPrep}
        setCustomPrep={setCustomPrep}
        customCook={customCook}
        setCustomCook={setCustomCook}
        customYield={customYield}
        setCustomYield={setCustomYield}
        customServings={customServings}
        setCustomServings={setCustomServings}
        customIng={customIng}
        setCustomIng={setCustomIng}
        customIns={customIns}
        setCustomIns={setCustomIns}
        customAdd={customAdd}
        setCustomAdd={setCustomAdd}
        CustomizeRecipe={CustomizeRecipe}
      />
    </div>
  );
};

export default CustomizePage;
