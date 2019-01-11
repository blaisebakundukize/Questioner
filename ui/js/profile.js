// Profile data Controller
const DataProfileController = (function () {

})();

// UI Controller
const UIController = (function () {
  const DOMStrings = { boxMyQuestion: '.js--my-questions', boxMyComments: '.js--questions-comments', boxTopQuestion: '.js--top-questions' };

  return {
    getDOMString = () => {
      return DOMStrings;
    }
  }
})();


// General Controller For data and UI
const Controller = (function (DPCrtl, UICrtl) {

  const setEventListerners = () => {

  }

  return {
    init = () => {
      setEventListerners();
    }
  }

})(DataProfileController, UIController);

Controller.init();