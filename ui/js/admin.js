// Control UI
const UIController = (function () {
  const DOMStrings = { btnAccordion: '.js--btn-accordion', btnDeleteTag: '.js--btn-delete-tag', formCreateTag: '.form-create__tag', tagViewCreate: '.tag-view__create', activeButton: 'active' }

  return {
    getDOMStrings: () => DOMStrings
  };
})();


// General Controller
const Controller = (function (UICrtl) {
  const DOMStrings = UICrtl.getDOMStrings();

  const setupEventListeners = () => {
    document.querySelector(DOMStrings.btnAccordion).addEventListener('click', handleBtnAccordion);
  }

  const handleBtnAccordion = function (e) {
    this.classList.toggle(DOMStrings.activeButton);
    const formCreateTag = document.querySelector(DOMStrings.formCreateTag);
    const tagViewCreate = document.querySelector(DOMStrings.tagViewCreate);
    console.log(tagViewCreate)
    console.log(formCreateTag)
    if (this.classList.contains(DOMStrings.activeButton)) {
      formCreateTag.style.display = 'block';
      console.log('block')
      tagViewCreate.style.border = '1px solid #e3e3e3';
    } else {
      formCreateTag.style.display = 'none';
      tagViewCreate.style.border = 'none';
      console.log('none')
    }
  }

  return {
    init: () => {
      setupEventListeners();
    }
  };

})(UIController);

Controller.init();