import { APP_URL, KEY, RES_PER_PAGE } from "./config.js"
import { AJAX, reformulate, AJAX } from "./helpers.js"

import { async } from "regenerator-runtime"

export const state = {
    meal: {},
    meals: [],
    search: {
        query: "",
        results: [],
        page: 1,
        resultsPerPage: RES_PER_PAGE,
        previousLenght: 0
    },
    bookmarks: [],
}

export const loadmeal = async function (id) {
    try {
        const data = await AJAX(APP_URL + `?id=${id}`)
        if (!data) throw new Error("This meal is not in the data base!")
        state.meal = data[0];
        console.log(data, "wha")

        if (state.bookmarks.some(rec => rec.id === id))
            state.meal.isBookMarked = true
        else
            state.meal.isBookMarked = false
    } catch (err) {
        throw (err)
    }
}

export const loadAllMeals = async function () {
    try {
        const data = await AJAX(APP_URL)
        state.meals = data;
    } catch (err) {
        throw (err)
    }
}

export const searchRec = function (query) {

    try {
        const data = state.meals.filter(m => m.name.toLowerCase().includes((query.toLowerCase())))
        state.search.results = data
        return data
    }

    catch (err) {
        throw (err)
    }
}

export const getSearchResultPage = function (page = state.search.page) {

    state.search.page = page

    const start = (page - 1) * state.search.resultsPerPage;
    const end = page * state.search.resultsPerPage

    return state.search.results.slice(start, end)
}


const presistBookmarks = function () {
    localStorage.setItem("bookmarks", JSON.stringify(state.bookmarks))
}

export const addBookmark = function (meal) {
    state.bookmarks.push(meal);
    if (meal.id === state.meal.id) state.meal.isBookMarked = true;

    presistBookmarks();
}


export const removeBookmark = function (id) {
    const index = state.bookmarks.findIndex(el => el.id === id)
    state.bookmarks.splice(index, 1)
    if (id === state.meal.id) state.meal.isBookMarked = false

    presistBookmarks();
}

const init = function () {
    const bookmarksStorage = localStorage.getItem("bookmarks")
    if (bookmarksStorage) state.bookmarks = JSON.parse(bookmarksStorage);
}

init();

export const uploadmeal = async function (newmeal) {
    try {
        const ingredients = Object.entries(newmeal).filter(entry => entry[0].startsWith("ingredient") && entry[1] !== "").map(ing => {
            const ingArray = ing[1].split(",")
            console.log(ingArray)
            if (!ingArray.length === 3) throw new Error("Enter valid ingredients")
            const [quantity, unit, description] = ingArray
            return { quantity: quantity ? +quantity : null, unit, description }
        })
        const meal = {
            title: newmeal.title,
            source_url: newmeal.sourceUrl,
            image_url: newmeal.image,
            publisher: newmeal.publisher,
            cooking_time: +newmeal.cookingTime,
            servings: +newmeal.servings,
            ingredients,
        };
        // console.log(ingredients)
        const response = await AJAX(`${APP_URL}?key=${KEY}`, meal)
        state.meal = response.data.meal
        addBookmark(state.meal)
    }
    catch (error) {
        throw error
    }
}
