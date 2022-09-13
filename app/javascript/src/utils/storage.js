const setToLocalStorage = ({ authToken, userId, email, userName }) => {
  localStorage.setItem("authToken", JSON.stringify(authToken));
  localStorage.setItem("authUserId", JSON.stringify(userId));
  localStorage.setItem("authEmail", JSON.stringify(email));
  localStorage.setItem("authUserName", JSON.stringify(userName));
};

const getFromLocalStorage = key => JSON.parse(localStorage.getItem(key));

export { setToLocalStorage, getFromLocalStorage };
