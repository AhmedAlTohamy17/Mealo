import icons from "url:../../img/icons.svg"

import View from "./View";

class addmealView extends View {
    _parentElement = document.querySelector(".upload");
    _errorMessage = "Enter valid values"
    _message = "Meal is added successfully!! "
    _popup = document.querySelector(".add-meal-window")
    _overlay = document.querySelector(".overlay")
    _addBtn = document.querySelector(".nav__btn--add-meal")
    _closeBtn = document.querySelector(".btn--close-modal")

    constructor() {
        super();
        this._showHandler();
        this._hideHandler();
    }

    popupToggler() {
        this._overlay.classList.toggle("hidden")
        this._popup.classList.toggle("hidden")
    }

    _showHandler() {
        this._addBtn.addEventListener("click", this.popupToggler.bind(this))
    }

    _hideHandler() {
        this._closeBtn.addEventListener("click", this.popupToggler.bind(this))
        this._overlay.addEventListener("click", this.popupToggler.bind(this))
    }

    uploader(handler) {
        this._parentElement.addEventListener("submit", function (e) {
            e.preventDefault();
            const dataArr = [...new FormData(this)]
            const dataObject = Object.fromEntries(dataArr)
            handler(dataObject)
        })
    }

    _generateMarkup() {

    }
}

export default new addmealView();