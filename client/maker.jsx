const helper = require("./helper.js");

const handleDomo = (e) => {
  e.preventDefault();
  helper.hideError();
  const name = e.target.querySelector("#domoName").value;
  const age = e.target.querySelector("#domoAge").value;
  const _csrf = e.target.querySelector("#_csrf").value;
  if (!name || !age) {
    helper.handleError("All fields are required!");
    return false;
  }
  helper.sendPost(e.target.action, { name, age, _csrf }, loadDomosFromServer);
  return false;
};

const handlePikachu = (e) => {
  e.preventDefault();
  helper.hideError();
  const name = e.target.querySelector("#pikachuName").value;
  const level = e.target.querySelector("#pikachuLevel").value;
  const _csrf = e.target.querySelector("#_csrf").value;
  if (!name || !level) {
    helper.handleError("All fields are required!");
    return false;
  }
  helper.sendPost(
    e.target.action,
    { name, level, _csrf },
    loadPikachusFromServer
  );
  return false;
};

const DomoForm = (props) => {
  return (
    <form
      id="domoForm"
      onSubmit={handleDomo}
      name="domoForm"
      action="/maker"
      method="POST"
      className="domoForm"
    >
      <label htmlFor="name">Name: </label>
      <input id="domoName" type="text" name="name" placeholder="Domo Name" />
      <label htmlFor="age">Age: </label>
      <input id="domoAge" type="number" min="0" name="age" />
      <input id="_csrf" type="hidden" name="_csrf" value={props.csrf} />
      <input className="makeDomoSubmit" type="submit" value="Make Domo" />
    </form>
  );
};

const PikachuForm = (props) => {
  return (
    <form
      id="pikachuForm"
      onSubmit={handlePikachu}
      name="pikachuForm"
      action="/makePikachu"
      method="POST"
      className="pikachuForm"
    >
      <label htmlFor="name">Name: </label>
      <input
        id="pikachuName"
        type="text"
        name="name"
        placeholder="Pikachu Name"
      />
      <label htmlFor="level">Level: </label>
      <input id="pikachuLevel" type="number" min="1" name="level" />
      <input id="_csrf" type="hidden" name="_csrf" value={props.csrf} />
      <input className="makePikachuSubmit" type="submit" value="Make Pikachu" />
    </form>
  );
};

const DomoList = (props) => {
  if (props.domos.length === 0) {
    return (
      <div className="domoList">
        <h3 className="emptyDomo">No Domos Yet!</h3>
      </div>
    );
  }

  const domoNodes = props.domos.map((domo) => {
    return (
      <div key={domo._id} className="domo">
        <img
          src="/assets/img/domoface.jpeg"
          alt="domo face"
          className="domoFace"
        />
        <h3 className="domoName"> Name: {domo.name} </h3>
        <h3 className="domoAge"> Age: {domo.age} </h3>
      </div>
    );
  });
  return <div className="domoList">{domoNodes} </div>;
};

const PikachuList = (props) => {
  console.log(props);
  if (props.pikachus.length === 0) {
    return (
      <div className="pikachuList">
        <h3 className="emptyPikachu">No Pikachus Yet!</h3>
      </div>
    );
  }

  const pikachuNodes = props.pikachus.map((pikachu) => {
    return (
      <div key={pikachu._id} className="pikachu">
        <img
          src="/assets/img/pikachuface.jpeg"
          alt="pikachu face"
          className="pikachuFace"
        />
        <h3 className="pikachuName"> Name: {pikachu.name} </h3>
        <h3 className="pikachuLevel"> Level: {pikachu.level} </h3>
      </div>
    );
  });
  return <div className="pikachuList">{pikachuNodes} </div>;
};

const loadDomosFromServer = async () => {
  const response = await fetch("/getDomos");
  const data = await response.json();
  ReactDOM.render(
    <DomoList domos={data.domos} />,
    document.getElementById("domos")
  );
};

const loadPikachusFromServer = async () => {
  const response = await fetch("/getPikachus");
  const data = await response.json();
  console.log(data);
  ReactDOM.render(
    <PikachuList pikachus={data.pikachus} />,
    document.getElementById("pikachus")
  );
};

const init = async () => {
  const response = await fetch("/getToken");
  const data = await response.json();
  ReactDOM.render(
    <DomoForm csrf={data.csrfToken} />,
    document.getElementById("makeDomo")
  );
  ReactDOM.render(
    <PikachuForm csrf={data.csrfToken} />,
    document.getElementById("makePikachu")
  );
  ReactDOM.render(<DomoList domos={[]} />, document.getElementById("domos"));
  ReactDOM.render(
    <PikachuList pikachus={[]} />,
    document.getElementById("pikachus")
  );
  loadDomosFromServer();
  loadPikachusFromServer();
};

window.onload = init;
