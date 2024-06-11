
import * as model from "./model.js"
import paginationView from "./views/paginationView.js";
import mealview from "./views/recipeview.js";
import resultsView from "./views/resultsView.js";
import searchView from "./views/searchView.js";
import bookmarksView from "./views/bookmarksView.js";
// import addmealView from "./views/addRecipeView.js";
import { RES_PER_PAGE, TIME_OUT_SUCCESS } from "./config.js";
import getallView from "./views/getallView.js";
import recipeview from "./views/recipeview.js";

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
// if (module.hot) {
//   module.hot.accept();
// }
const mealController = async function () {
  try {
    // getting the hash from the url
    const id = window.location.hash.slice(1);
    if (!id) return;

    //meal loading
    mealview.renderSpinner()
    resultsView.update(model.getSearchResultPage())
    await model.loadmeal(id)
    //meal render
    mealview.render(model.state.meal)

    bookmarksView.update(model.state.bookmarks)
  }
  catch (err) {
    mealview.renderError()
    console.log(err)
  }
}

const controlSearch = async function () {
  try {
    // getting the query from the view
    const prevLen = model.state.search.previousLenght = model.state.search.results.length
    const query = searchView.getQuery();
    model.state.search.query = query;
    console.log("here is the query", query)
    if (!query) return;
    resultsView.renderSpinner();
    // searching teh query 
    model.searchRec(query)
    resultsView.render(model.getSearchResultPage())

    paginationView.render(model.state.search)
    if (model.state.search.results.length !== model.state.meals.length)
      getallView.btnTogller()
    if (model.state.search.results.length === model.state.meals.length && prevLen < model.state.meals.length)
      getallView.btnTogller()

    console.log(model.state.search.results.length, model.state.meals.length, "I am sorry")
  }
  catch (err) {
    console.log(err)
  }
}

const paginationController = function (goto) {
  resultsView.render(model.getSearchResultPage(goto))
  paginationView.render(model.state.search)
}

const bookmarksController = function () {
  // add or delete a bookmark
  if (!model.state.meal.isBookMarked)
    model.addBookmark(model.state.meal);
  else
    model.removeBookmark(model.state.meal.id)

  //update the UI
  mealview.update(model.state.meal)

  // update the bookmarks view
  bookmarksView.render(model.state.bookmarks)
}

const bookmarkRenderer = () => bookmarksView.render(model.state.bookmarks)

// const uploaderController = async function (data) {
//   try {
//     addmealView.renderSpinner()
//     await model.uploadmeal(data)

//     window.history.pushState(null, '', `#${model.state.meal.id}`)
//     addmealView.renderMessage()
//     bookmarksView.render(model.state.bookmarks)
//     mealview.render(model.state.meal)

//     setTimeout(() => addmealView.popupToggler(), TIME_OUT_SUCCESS * 1000)
//   }
//   catch (err) {
//     addmealView.renderError(err.message)
//   }
// }

const getAllController = async () => {
  //If there is search results we can get all 
  resultsView.renderSpinner();


  //after getting all, we need to update the model for  search as it's original state

  //Request from the model to get all meals
  await model.loadAllMeals();
  //Then render the results view 

  model.state.search = {
    query: "",
    results: model.state.meals,
    page: 1,
    resultsPerPage: RES_PER_PAGE
  }

  resultsView.render(model.getSearchResultPage())

  paginationView.render(model.state.search)

}

//This function is used to link the event handlers with the logic that has been defined in the model
const init = function () {
  getallView.viewBtnHandler(getAllController)
  // addmealView.uploader(uploaderController)
  bookmarksView.bookmarkLoader(bookmarkRenderer)
  mealview.addHandlerRender(mealController)
  mealview.addBookmarksHandler(bookmarksController)
  searchView.addHandlerSearcher(controlSearch)
  paginationView.addHandlerClicker(paginationController)

}

init();