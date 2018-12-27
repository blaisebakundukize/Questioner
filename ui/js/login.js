const UIController = (function () {
  const DOMStrings = {
    inputLoginUsername: '.js--login-username',
    inputLoginPassword: '.js--login-password',
    btnSubmitLogin: '.js--submit-login'
  }
  return {
    getDOMString: () => {
      return DOMStrings;
    }
  }
})();

const Controller = (function (UICrtl) {

  const setupEventListerners = () => {
    const DOMs = UICrtl.getDOMString();
    const inputLoginUsername = document.querySelector(DOMs.inputLoginUsername);
    const inputLoginPassword = document.querySelector(DOMs.inputLoginPassword);
    const btnSubmitLogin = document.querySelector(DOMs.btnSubmitLogin);

    btnSubmitLogin.addEventListener('click', (event) => {
      const username = inputLoginUsername.value;
      const password = inputLoginPassword.value;
      console.log('blaise')
      if (username === 'admin' && password === 'admin') {
        window.location.href = "./pages/admin/index.html";
      } else {
        window.location.href = "./pages/meetup/meetups.html";
      }
      event.preventDefault();
    });
  }

  return {
    init: () => {
      return setupEventListerners();
    }
  };

})(UIController);

Controller.init();