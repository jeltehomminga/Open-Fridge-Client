import axios from "axios";

class AuthService {
  service = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}`,
    withCredentials: true
  });
  signup = (username, password) => {
    return this.service
      .post("/signup", { username, password })
      .then(response => response.data);
  };
  login = (username, password) => {
    return this.service
      .post("/login", { username, password })
      .then(response => response.data);
  };
  logout = () => {
    return this.service.post("/logout").then(response => response.data);
  };
  updateUser = user => {
      return this.service.put(`/user/${user.id}`, {user}).then(response => response.data);
  };
  groceryItems = () => {
    return this.service.get('/groceryitems').then(response => response.data)
  }
  foodRequest = (data) => {
      return this.service.post(`/foodrequest`, data).then(response => {
       return response.data}
        )
  }
}

export default AuthService;
