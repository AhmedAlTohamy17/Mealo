import icons from "url:../../img/icons.svg"
import View from "./View";

class mealView extends View {
  _parentElement = document.querySelector('.meal');
  _errorMessage = "No meal found, try another one!"

  addHandlerServingsUpdater(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn--tiny")
      if (!btn || +btn.dataset.updateTo < 1) return;
      handler(+btn.dataset.updateTo)
    })
  }

  addBookmarksHandler(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn-bookmark")
      if (!btn) return;
      handler()
    })
  }

  _generateMarkup() {
    console.log(this._data.restaurants, "Data here")
    return `<figure class="meal__fig">
        <img src="${this._data.imageUrl}" alt="Tomato" class="meal__img" />
        <h1 class="meal__title">
          <span>${this._data.name}</span>
        </h1>
      </figure>
        <button class="btn--round btn-bookmark">
          <svg class="">
            <use href="${icons}#icon-bookmark${this._data.isBookMarked ? "-fill" : ""}"></use>
          </svg>
        </button>
      </div>
    
      <div class="meal__ingredients">
        <h2 class="heading--2">Meal ratings</h2>
        <ul class="meal__ingredient-list">
    ${this._data.restaurants.map((meal) => {

      return `
        <li class="meal__ingredient">
        <svg class="meal__icon">
          <use href="${icons}#icon-check"></use>
        </svg>
        <div class="meal__quantity">${meal.name}</div>
        <div class="meal__description">
          <span class="meal__unit">${meal.rating}</span>
        </div>
      </li>
        `
    }).join("")}
        </ul>
      </div>
        `
  }

  addHandlerRender(handler) {
    ["hashchange", "load"].forEach((ev) => window.addEventListener(ev, handler))
  }

}

export default new mealView();