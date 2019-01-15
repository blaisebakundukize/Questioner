// Control UI
const UIController = (function () {
  const DOMStrings = { tagsContainer: '.tags-container', btnHideTags: '.js--btn__hide-tags', forTextarea: '.js--form__textarea', formInputSearchTags: '.js--form__input-create-meetup' }

  return {
    getDOMStrings: () => DOMStrings
  };
})();


// General Controller
const Controller = (function (UICrtl) {
  const DOMStrings = UICrtl.getDOMStrings();

  const setupEventListeners = () => {

    const tagsContainer = document.querySelector(DOMStrings.tagsContainer);

    document.querySelector(DOMStrings.formInputSearchTags).addEventListener('click', () => {
      tagsContainer.style.display = 'block';
    });

    document.querySelector(DOMStrings.btnHideTags).addEventListener('click', () => {
      tagsContainer.style.display = 'none';
    });
  }

  const handleTextareaFocus = () => {

    console.log(tagsContainer)
  }

  return {
    init: () => {
      setupEventListeners();
    }
  };

})(UIController);

Controller.init();