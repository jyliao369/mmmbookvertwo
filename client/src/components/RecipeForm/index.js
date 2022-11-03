import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { Image } from "cloudinary-react";

import * as dataList from "../data";

const RecipeForm = ({
  recipeID,
  updateRecipe,
  updateImage,
  setUpdateImage,
  updatingImage,
  updateName,
  setUpdateName,
  updateDesc,
  setUpdateDesc,
  updateCategory,
  setUpdateCategory,
  updateCourse,
  setUpdateCourse,
  updateCuisine,
  setUpdateCuisine,
  updateDiet,
  setUpdateDiet,
  updatePrep,
  setUpdatePrep,
  updateCook,
  setUpdateCook,
  updateYield,
  setUpdateYield,
  updateServings,
  setUpdateServings,
  updateIng,
  setUpdateIng,
  updateIns,
  setupdateIns,
  updateAdd,
  setUpdateAdd,
  createRecipe,
  recipeImage,
  uploadImage,
  setRecipeImage,
  recipeName,
  setRecipeName,
  recipeDesc,
  setrecipeDesc,
  prepTime,
  setPrepTime,
  cookTime,
  setCookTime,
  yieldNum,
  setYieldNum,
  servingsNum,
  setServingsNum,
  category,
  setCategory,
  course,
  setCourse,
  cuisine,
  setCuisine,
  diet,
  setDiet,
  ingredients,
  setIngredients,
  instructions,
  setInstructions,
  addNotes,
  setAddNotes,
  test,
  customImage,
  setCustomImage,
  customizingImage,
  originName,
  setOriginName,
  customName,
  setCustomName,
  customDesc,
  setCustomDesc,
  customCategory,
  setCustomCategory,
  customCourse,
  setCustomCourse,
  customCuisine,
  setCustomCuisine,
  customDiet,
  setCustomDiet,
  customPrep,
  setCustomPrep,
  customCook,
  setCustomCook,
  customYield,
  setCustomYield,
  customServings,
  setCustomServings,
  customIng,
  setCustomIng,
  customIns,
  setCustomIns,
  customAdd,
  setCustomAdd,
  CustomizeRecipe,
}) => {
  useEffect(() => {
    document.documentElement.scrollTop = 0;

    if (recipeID) {
      Axios.get(
        `https://mmmbook-vertwo-server.herokuapp.com/recipe/${recipeID}`,
        {}
      ).then((response) => {
        console.log(response.data[0]);

        if (test === "Customize") {
          setCustomImage(response.data[0].recipeImageID);
          setOriginName(response.data[0].name);
          setCustomName(response.data[0].name);
          setCustomDesc(response.data[0].description);
          setCustomCategory(response.data[0].category);
          setCustomCourse(response.data[0].course);
          setCustomCuisine(response.data[0].cuisine);
          setCustomDiet(response.data[0].diet);
          setCustomPrep(response.data[0].prepTime);
          setCustomCook(response.data[0].cookTime);
          setCustomYield(response.data[0].yield);
          setCustomServings(response.data[0].servings);
          setCustomIng(response.data[0].ingredients);
          setCustomIns(response.data[0].instructions);
          setCustomAdd(response.data[0].addNotes);
        } else {
          setUpdateImage(response.data[0].recipeImageID);
          setUpdateName(response.data[0].name);
          setUpdateDesc(response.data[0].description);
          setUpdateCategory(response.data[0].category);
          setUpdateCourse(response.data[0].course);
          setUpdateCuisine(response.data[0].cuisine);
          setUpdateDiet(response.data[0].diet);
          setUpdatePrep(response.data[0].prepTime);
          setUpdateCook(response.data[0].cookTime);
          setUpdateYield(response.data[0].yield);
          setUpdateServings(response.data[0].servings);
          setUpdateIng(response.data[0].ingredients);
          setupdateIns(response.data[0].instructions);
          setUpdateAdd(response.data[0].addNotes);
        }
      });
    }
  }, []);

  return (
    <div className="recipeForm">
      <div className="recipeFormPartOne">
        <div className="recipeFormInfo">
          <div className="recipeFormHeader">
            {recipeID && test === "Customize" ? (
              <h1>Customize Recipe</h1>
            ) : (
              <>
                {recipeID ? <h1>Update Recipe</h1> : <h1>Create A Recipe</h1>}
              </>
            )}
          </div>
          <div className="recipeFormInfoA">
            {recipeID && test === "Customize" ? (
              <>
                <input
                  placeholder="Recipe Name"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                />
                <textarea
                  placeholder="Recipe Description"
                  value={customDesc}
                  onChange={(e) => setUpdateDesc(e.target.value)}
                  rows={7}
                />
              </>
            ) : (
              <>
                {recipeID ? (
                  <>
                    <input
                      placeholder="Recipe Name"
                      value={updateName}
                      onChange={(e) => setUpdateName(e.target.value)}
                    />
                    <textarea
                      placeholder="Recipe Description"
                      value={updateDesc}
                      onChange={(e) => setUpdateDesc(e.target.value)}
                      rows={7}
                    />
                  </>
                ) : (
                  <>
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
                  </>
                )}
              </>
            )}
          </div>
          <div className="recipeFormInfoB">
            {recipeID && test === "Customize" ? (
              <>
                <select
                  value={customCategory}
                  onChange={(e) => setCustomCategory(e.target.value)}
                >
                  <option value={""}>Select Category</option>
                  {dataList.category.map((category) => (
                    <option key={category}>{category}</option>
                  ))}
                </select>
                <select
                  value={customCourse}
                  onChange={(e) => setCustomCourse(e.target.value)}
                >
                  <option value={""}>Select Course</option>
                  {dataList.course.map((course) => (
                    <option key={course} value={course}>
                      {course}
                    </option>
                  ))}
                </select>
              </>
            ) : (
              <>
                {recipeID ? (
                  <>
                    <select
                      value={updateCategory}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      <option value={""}>Select Category</option>
                      {dataList.category.map((category) => (
                        <option key={category}>{category}</option>
                      ))}
                    </select>
                    <select
                      value={updateCourse}
                      onChange={(e) => setCourse(e.target.value)}
                    >
                      <option value={""}>Select Course</option>
                      {dataList.course.map((course) => (
                        <option key={course} value={course}>
                          {course}
                        </option>
                      ))}
                    </select>
                  </>
                ) : (
                  <>
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
                      onChange={(e) => setCourse(e.target.value)}
                    >
                      <option value={""}>Select Course</option>
                      {dataList.course.map((course) => (
                        <option key={course} value={course}>
                          {course}
                        </option>
                      ))}
                    </select>
                  </>
                )}
              </>
            )}
            {recipeID && test === "Customize" ? (
              <>
                <select
                  value={customCuisine}
                  onChange={(e) => setCustomCuisine(e.target.value)}
                >
                  <option value={""}>Select Cuisine</option>
                  {dataList.cuisine.map((cuisine) => (
                    <option key={cuisine} value={cuisine}>
                      {cuisine}
                    </option>
                  ))}
                </select>
                <select
                  value={customDiet}
                  onChange={(e) => setCustomDiet(e.target.value)}
                >
                  <option value={""}>Select Diet</option>
                  {dataList.diet.map((diet) => (
                    <option key={diet} value={diet}>
                      {diet}
                    </option>
                  ))}
                </select>
              </>
            ) : (
              <>
                {recipeID ? (
                  <>
                    <select
                      value={updateCuisine}
                      onChange={(e) => setUpdateCuisine(e.target.value)}
                    >
                      <option value={""}>Select Cuisine</option>
                      {dataList.cuisine.map((cuisine) => (
                        <option key={cuisine} value={cuisine}>
                          {cuisine}
                        </option>
                      ))}
                    </select>
                    <select
                      value={updateDiet}
                      onChange={(e) => setUpdateDiet(e.target.value)}
                    >
                      <option value={""}>Select Diet</option>
                      {dataList.diet.map((diet) => (
                        <option key={diet} value={diet}>
                          {diet}
                        </option>
                      ))}
                    </select>
                  </>
                ) : (
                  <>
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
                    <select
                      value={diet}
                      onChange={(e) => setDiet(e.target.value)}
                    >
                      <option value={""}>Select Diet</option>
                      {dataList.diet.map((diet) => (
                        <option key={diet} value={diet}>
                          {diet}
                        </option>
                      ))}
                    </select>
                  </>
                )}
              </>
            )}
          </div>
          <div className="recipeFormInfoC">
            {recipeID && test === "Customize" ? (
              <>
                <input
                  placeholder="Prep Time (min)"
                  type={"number"}
                  value={customPrep}
                  onChange={(e) => setCustomPrep(e.target.value)}
                />
                <input
                  placeholder="Cook Time (min)"
                  type={"number"}
                  value={customCook}
                  onChange={(e) => setCustomCook(e.target.value)}
                />
                <input
                  placeholder="# of Yield"
                  type={"number"}
                  value={customYield}
                  onChange={(e) => setCustomYield(e.target.value)}
                />
                <input
                  placeholder="# of Servings"
                  type={"number"}
                  value={customServings}
                  onChange={(e) => setCustomServings(e.target.value)}
                />
              </>
            ) : (
              <>
                {recipeID ? (
                  <>
                    <input
                      placeholder="Prep Time (min)"
                      type={"number"}
                      value={updatePrep}
                      onChange={(e) => setUpdatePrep(e.target.value)}
                    />
                    <input
                      placeholder="Cook Time (min)"
                      type={"number"}
                      value={updateCook}
                      onChange={(e) => setUpdateCook(e.target.value)}
                    />
                    <input
                      placeholder="# of Yield"
                      type={"number"}
                      value={updateYield}
                      onChange={(e) => setUpdateYield(e.target.value)}
                    />
                    <input
                      placeholder="# of Servings"
                      type={"number"}
                      value={updateServings}
                      onChange={(e) => setUpdateServings(e.target.value)}
                    />
                  </>
                ) : (
                  <>
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
                  </>
                )}
              </>
            )}
          </div>
          {recipeID && test === "Customize" ? (
            <>
              <div className="createRecipeBtn">
                {customName === "" ||
                customDesc === "" ||
                customCategory === "" ||
                customCook === "" ||
                customPrep === "" ||
                customYield === "" ||
                customServings === "" ||
                customCategory === "" ||
                customCourse === "" ||
                customCuisine === "" ||
                customDiet === "" ||
                customIng === "" ||
                customIns === "" ||
                customAdd === "" ? (
                  <button disabled="true">Customize</button>
                ) : (
                  <button onClick={() => CustomizeRecipe()}>Customize</button>
                )}
              </div>
            </>
          ) : (
            <>
              {recipeID ? (
                <div className="createRecipeBtn">
                  {updateName === "" ||
                  updateDesc === "" ||
                  updateCategory === "" ||
                  updatePrep === "" ||
                  updateCook === "" ||
                  updateYield === "" ||
                  updateServings === "" ||
                  updateCategory === "" ||
                  updateCourse === "" ||
                  updateCuisine === "" ||
                  updateDiet === "" ||
                  updateIng === "" ||
                  updateIns === "" ||
                  updateAdd === "" ? (
                    <button disabled="true">Update</button>
                  ) : (
                    <button onClick={() => updateRecipe()}>Update</button>
                  )}
                </div>
              ) : (
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
                    <>
                      {recipeID ? (
                        <button disabled="true">Update</button>
                      ) : (
                        <button disabled="true">Create</button>
                      )}
                    </>
                  ) : (
                    <>
                      {recipeID ? (
                        <button onClick={() => updateRecipe()}>Update</button>
                      ) : (
                        <button onClick={() => createRecipe()}>Create</button>
                      )}
                    </>
                  )}
                </div>
              )}
            </>
          )}
          <div>
            {recipeID && test === "Customize" ? (
              <>
                <>Based On another recipe </>
                <>Bookmark ID</>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="recipeFormImg">
          <div className="createNewRecipeImgCont">
            {recipeID && test === "Customize" ? (
              <>
                {customImage === "" ? (
                  <></>
                ) : (
                  <Image cloudName="du119g90a" public_id={customImage} />
                )}
                <div className="uploadImg">
                  <input
                    type={"file"}
                    accept="image/*"
                    className="addImage"
                    onChange={(event) => {
                      customizingImage(event.target.files[0]);
                    }}
                  />
                </div>
              </>
            ) : (
              <>
                {recipeID ? (
                  <>
                    {updateImage === "" ? (
                      <Image
                        cloudName="du119g90a"
                        public_id="https://res.cloudinary.com/du119g90a/image/upload/v1664897573/cld-sample-4.jpg"
                      />
                    ) : (
                      <Image cloudName="du119g90a" public_id={updateImage} />
                    )}
                    <div className="uploadImg">
                      <input
                        type={"file"}
                        accept="image/*"
                        className="addImage"
                        onChange={(event) => {
                          updatingImage(event.target.files[0]);
                        }}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    {recipeImage === "" ? (
                      <Image />
                    ) : (
                      <Image cloudName="du119g90a" public_id={recipeImage} />
                    )}
                    <div className="uploadImg">
                      <input
                        type={"file"}
                        accept="image/*"
                        className="addImage"
                        onChange={(event) => {
                          uploadImage(event.target.files[0]);
                        }}
                      />
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      <div className="recipeFormPartTwo">
        <div className="recipeFormIngIns">
          <div className="ingCreateRecipe">
            <div>
              <h1>Ingredients</h1>
            </div>
            {recipeID && test === "Customize" ? (
              <textarea
                placeholder="Ingredients"
                value={customIng}
                onChange={(e) => setCustomIng(e.target.value)}
              />
            ) : (
              <>
                {recipeID ? (
                  <textarea
                    placeholder="Ingredients"
                    value={updateIng}
                    onChange={(e) => setUpdateIng(e.target.value)}
                  />
                ) : (
                  <textarea
                    placeholder="Ingredients"
                    value={ingredients}
                    onChange={(e) => setIngredients(e.target.value)}
                  />
                )}
              </>
            )}
          </div>
          <div className="verticalLine" />
          <div className="insCreateRecipe">
            <div>
              <h1>Instructions</h1>
            </div>
            {recipeID && test === "Customize" ? (
              <textarea
                placeholder="Instructions"
                value={customIns}
                onChange={(e) => setCustomIns(e.target.value)}
              />
            ) : (
              <>
                {recipeID ? (
                  <textarea
                    placeholder="Instructions"
                    value={updateIns}
                    onChange={(e) => setupdateIns(e.target.value)}
                  />
                ) : (
                  <textarea
                    placeholder="Instructions"
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                  />
                )}
              </>
            )}
          </div>
        </div>
        <div className="recipeFormAdd">
          <div>
            <h2>Additional Notes</h2>
          </div>
          {recipeID && test === "Customize" ? (
            <>
              <textarea
                placeholder="Additional Notes"
                value={customAdd}
                onChange={(e) => setCustomAdd(e.target.value)}
              />
            </>
          ) : (
            <>
              {recipeID ? (
                <textarea
                  placeholder="Additional Notes"
                  value={updateAdd}
                  onChange={(e) => setUpdateAdd(e.target.value)}
                />
              ) : (
                <textarea
                  placeholder="Additional Notes"
                  value={addNotes}
                  onChange={(e) => setAddNotes(e.target.value)}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeForm;
