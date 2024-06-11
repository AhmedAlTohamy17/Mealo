import icons from "url:../../img/icons.svg"

import View from "./View";
import previewView from "./previewView.js";

class BookMarks extends View {
    _parentElement = document.querySelector(".bookmarks");
    _errorMessage = "There is no bookmarks yet!"

    bookmarkLoader(handler) {
        window.addEventListener("load", handler)
    }

    _generateMarkup() {
        return this._data.map(res => previewView.render(res, false)).join("")
    }
}

export default new BookMarks();