async function handleLogin() {
  //1 lay value tren form
  const password = document.getElementById("password").value;
  const email = document.getElementById("email").value;

  //2. gui value from client to server
  const response = await axios.post("/api/auth/login", {
    email: email,
    password: password,
  });
  if (response.status == 200) {
    const accessToken = response.data.accessToken;
    //decode lay ra thong tin payload
    const payloadDecoded = jwt_decode(accessToken);

    if (payloadDecoded.role === "regular") {
      window.location.href = "/home_page.html";
    } else {
      window.location.href = "/admin_page.html";
    }

    //save access token
    localStorage.setItem("access_token", accessToken);
  }
}
