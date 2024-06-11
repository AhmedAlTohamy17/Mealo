import icons from "url:../../img/icons.svg"

import View from "./View";
import previewView from "./previewView.js";

class ResultsView extends View {
  _parentElement = document.querySelector(".results");
  _errorMessage = "No meal found, try another one!"

  _generateMarkup() {
    return this._data.map(res => previewView.render(res, false)).join("")
  }
}

export default new ResultsView();