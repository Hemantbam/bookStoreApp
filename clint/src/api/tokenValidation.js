import { jwtDecode } from "jwt-decode";
export const isValidToken = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return;
  }
  try {
    const decodedToken = jwtDecode(token);

    const tokenExpirtTime = decodedToken.exp;
    const newDate = new Date();
    const currentTime = Math.floor(newDate.getTime() / 1000);

    if (currentTime > tokenExpirtTime) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
  } catch (err) {
    console.log(err);
  }
};

setInterval(() => {
  isValidToken();
}, 10000);
