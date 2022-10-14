import React from "react";
import { useParams } from "react-router-dom";

import RecipeForm from "../RecipeForm";

const UpdatePage = () => {
  let { recipeID } = useParams();

  return (
    <div className="updatePage">
      <RecipeForm recipeID={recipeID} />
    </div>
  );
};

export default UpdatePage;
