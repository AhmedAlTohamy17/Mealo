import icons from "url:../../img/icons.svg"

import View from "./View";
import previewView from "./previewView.js";

class GetallView extends View {
    _parentElement = document.querySelector(".search-results");
    _getAllBtn = document.querySelector(".get__all")
    _errorMessage = "There is no meals yet!!"


    btnTogller() {
        this._getAllBtn.classList.toggle("hide")
    }

    viewBtnHandler(handler) {
        const that = this
        window.onload = handler
        this._getAllBtn.addEventListener("click", function () {
            handler();
            that.btnTogller()
        })
    }

    _generateMarkup() {
    }
}

export default new GetallView();