import React from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Axios from "axios";

import RecipeForm from "../RecipeForm";

const UpdatePage = () => {
  let { recipeID } = useParams();

  const [updateImage, setUpdateImage] = useState("");
  const [updateName, setUpdateName] = useState("");
  const [updateDesc, setUpdateDesc] = useState("");
  const [updateCategory, setUpdateCategory] = useState("");
  const [updateCourse, setUpdateCourse] = useState("");
  const [updateCuisine, setUpdateCuisine] = useState("");
  const [updateDiet, setUpdateDiet] = useState("");
  const [updatePrep, setUpdatePrep] = useState("");
  const [updateCook, setUpdateCook] = useState("");
  const [updateYield, setUpdateYield] = useState("");
  const [updateServings, setUpdateServings] = useState("");
  const [updateIng, setUpdateIng] = useState("");
  const [updateIns, setupdateIns] = useState("");
  const [updateAdd, setUpdateAdd] = useState("");

  const navToRecipe = useNavigate();

  const updateRecipe = () => {
    Axios.put(
      `https://mmmbook-vertwo-server.herokuapp.com/updateRecipe/${recipeID}`,
      {
        updateImage: updateImage,
        updateName: updateName,
        updateDesc: updateDesc,
        updateCategory: updateCategory,
        updateCourse: updateCourse,
        updateCuisine: updateCuisine,
        updateDiet: updateDiet,
        updatePrep: updatePrep,
        updateCook: updateCook,
        updateYield: updateYield,
        updateServings: updateServings,
        updateIng: updateIng,
        updateIns: updateIns,
        updateAdd: updateAdd,
      }
    ).then((response) => {
      console.log(response);
      navToRecipe(`/recipe/${recipeID}`);
    });
  };

  const updatingImage = async (image) => {
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
    setUpdateImage(data.public_id);
  };

  return (
    <div className="updatePage">
      <RecipeForm
        recipeID={recipeID}
        updateRecipe={updateRecipe}
        updateImage={updateImage}
        setUpdateImage={setUpdateImage}
        updatingImage={updatingImage}
        updateName={updateName}
        setUpdateName={setUpdateName}
        updateDesc={updateDesc}
        setUpdateDesc={setUpdateDesc}
        updateCategory={updateCategory}
        setUpdateCategory={setUpdateCategory}
        updateCourse={updateCourse}
        setUpdateCourse={setUpdateCourse}
        updateCuisine={updateCuisine}
        setUpdateCuisine={setUpdateCuisine}
        updateDiet={updateDiet}
        setUpdateDiet={setUpdateDiet}
        updatePrep={updatePrep}
        setUpdatePrep={setUpdatePrep}
        updateCook={updateCook}
        setUpdateCook={setUpdateCook}
        updateYield={updateYield}
        setUpdateYield={setUpdateYield}
        updateServings={updateServings}
        setUpdateServings={setUpdateServings}
        updateIng={updateIng}
        setUpdateIng={setUpdateIng}
        updateIns={updateIns}
        setupdateIns={setupdateIns}
        updateAdd={updateAdd}
        setUpdateAdd={setUpdateAdd}
      />
    </div>
  );
};

export default UpdatePage;
