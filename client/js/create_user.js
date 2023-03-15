async function handleSumbitAddUser() {
  //get data input
  try {
    //1. lay value tren form
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const role = document.getElementById("role").value;

    //2. gui value from client to server
    const response = await axios.post("/auth/admin/user/create", {
      username: username,
      email: email,
      password: password,
      role: role,
    });
    if (response.status === 200) {
      window.location.href = "./admin_page.html";
    }
  } catch (error) {
    //log error
  }
  //call api to server
}
