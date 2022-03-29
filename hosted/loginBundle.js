(()=>{var e={603:e=>{const t=e=>{document.getElementById("errorMessage").textContent=e,document.getElementById("domoMessage").classList.remove("hidden")};e.exports={handleError:t,sendPost:async(e,r,a)=>{const n=await fetch(e,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(r)}),s=await n.json();document.getElementById("domoMessage").classList.add("hidden"),s.error&&t(s.error),s.redirect&&(window.location=s.redirect),a&&a(s)},hideError:()=>{document.getElementById("domoMessage").classList.add("hidden")}}}},t={};function r(a){var n=t[a];if(void 0!==n)return n.exports;var s=t[a]={exports:{}};return e[a](s,s.exports,r),s.exports}(()=>{const e=r(603),t=t=>{t.preventDefault(),e.hideError();const r=t.target.querySelector("#user").value,a=t.target.querySelector("#pass").value,n=t.target.querySelector("#_csrf").value;return r&&a?(e.sendPost(t.target.action,{username:r,pass:a,_csrf:n}),!1):(e.handleError("Username or password is empty!"),!1)},a=t=>{t.preventDefault(),e.hideError();const r=t.target.querySelector("#user").value,a=t.target.querySelector("#pass").value,n=t.target.querySelector("#pass2").value,s=t.target.querySelector("#_csrf").value;return r&&a&&n?a!==n?(e.handleError("Passwords do not match!"),!1):(e.sendPost(t.target.action,{username:r,pass:a,pass2:n,_csrf:s}),!1):(e.handleError("All fields are required!"),!1)},n=e=>(console.log(e),React.createElement("form",{id:"loginForm",name:"loginForm",onSubmit:t,action:"/login",method:"POST",className:"mainForm"},React.createElement("label",{htmlFor:"username"},"Username: "),React.createElement("input",{id:"user",type:"text",name:"username",placeholder:"username"}),React.createElement("label",{htmlFor:"pass"},"Password: "),React.createElement("input",{id:"pass",type:"password",name:"pass",placeholder:"password"}),React.createElement("input",{id:"_csrf",type:"hidden",name:"_csrf",value:e.csrf}),React.createElement("input",{className:"formSubmit",type:"submit",value:"Sign in"}))),s=e=>React.createElement("form",{id:"signupForm",name:"signupForm",onSubmit:a,action:"/signup",method:"POST",className:"mainForm"},React.createElement("label",{htmlFor:"username"},"Username: "),React.createElement("input",{id:"user",type:"text",name:"username",placeholder:"username"}),React.createElement("label",{htmlFor:"pass"},"Password: "),React.createElement("input",{id:"pass",type:"password",name:"pass",placeholder:"password"}),React.createElement("label",{htmlFor:"pass2"},"Password: "),React.createElement("input",{id:"pass2",type:"password",name:"pass2",placeholder:"retype password"}),React.createElement("input",{id:"_csrf",type:"hidden",name:"_csrf",value:e.csrf}),React.createElement("input",{className:"formSubmit",type:"submit",value:"Sign up"}));window.onload=async()=>{const e=await fetch("/getToken"),t=await e.json();console.log("data",t);const r=document.getElementById("loginButton"),a=document.getElementById("signupButton");r.addEventListener("click",(e=>(e.preventDefault(),ReactDOM.render(React.createElement(n,{csrf:t.csrfToken}),document.getElementById("content")),!1))),a.addEventListener("click",(e=>(e.preventDefault(),ReactDOM.render(React.createElement(s,{csrf:t.csrfToken}),document.getElementById("content")),!1))),ReactDOM.render(React.createElement(n,{csrf:t.csrfToken}),document.getElementById("content"))}})()})();