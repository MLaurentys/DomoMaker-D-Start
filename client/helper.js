/* Takes in an error message. Sets the error message up in html, and
   displays it to the user. Will be hidden by other events that could
   end in an error.
*/
const handleError = (message) => {
  document.getElementById("errorMessage").textContent = message;
  document.getElementById("domoMessage").classList.remove("hidden");
};

const sendPost = async (uri, data, handler) => {
  const response = await fetch(uri, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  document.getElementById("domoMessage").classList.add("hidden");
  if (result.error) {
    handleError(result.error);
  }
  if (result.redirect) {
    window.location = result.redirect;
  }
  if (handler) {
    handler(result);
  }
};

const hideError = () => {
  document.getElementById("domoMessage").classList.add("hidden");
};

module.exports = {
  handleError,
  sendPost,
  hideError,
};
