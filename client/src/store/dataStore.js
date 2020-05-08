import { observable, action, decorate } from "mobx";
import { ACCESS_TOKEN } from "../constants";
import Cookies from "universal-cookie";

//configure({ enforceActions: 'observed' })

const cookies = new Cookies();

let API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost";
let API_BASE_PORT = process.env.REACT_APP_API_PORT || "8080";

class DataStore {
  isAuthenticated = false;

  currentUser = {};

  basket = {};

  basketContent = [];

  products = [];

  productDetail = {};

  handleLogin = () => {
    this.getCurrentUser().then((response) => {
      this.currentUser = response;
      this.isAuthenticated = true;
    });
  };

  handleLogoutState = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    this.isAuthenticated = false;
    this.currentUser = {};
  };

  request = (options) => {
    const headers = new Headers({
      "Content-Type": "application/json",
    });

    if (localStorage.getItem(ACCESS_TOKEN)) {
      headers.append(
        "Authorization",
        "Bearer " + localStorage.getItem(ACCESS_TOKEN)
      );
    }

    const defaults = { headers: headers };
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options).then((response) =>
      response.json().then((json) => {
        if (!response.ok) {
          return Promise.reject(json);
        }
        return json;
      })
    );
  };

  getBasket = () => {
    let id = cookies.get("cookieID");
    fetch(API_BASE_URL + ":" + API_BASE_PORT + `/basket/baskets/${id}`)
      .then((response) => {
        console.log(API_BASE_URL);
        return response.json();
      })
      .then((data) => {
        console.log(data);
        this.basket = data;
        console.log("this basket" + this.basket);
        this.basketContent = data.basketContent;
      });
  };

  getProductDetail = (id) => {
    fetch(API_BASE_URL + ":" + API_BASE_PORT + `/products/${id}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("data: " + data);
        this.productDetail = data;
      })
      .catch(() => console.log("Products api call failed"));
  };

  getProducts = () => {
    fetch(API_BASE_URL + ":" + API_BASE_PORT + "/products")
      .then((response) => {
        console.log(API_BASE_URL);
        return response.json();
      })
      .then((data) => (this.products = data))
      .catch(() => console.log("Products api call failed"));
  };

  getCurrentUser = () => {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
      return Promise.reject("No access token set.");
    }

    return this.request({
      url: API_BASE_URL + ":" + API_BASE_PORT + "/user/me",
      method: "GET",
    });
  };

  login = (loginRequest) => {
    return this.request({
      url: API_BASE_URL + ":" + API_BASE_PORT + "/api/auth/signin",
      method: "POST",
      body: loginRequest,
    });
  };

  signup = (signupRequest) => {
    return this.request({
      url: API_BASE_URL + ":" + API_BASE_PORT + "/api/auth/signup",
      method: "POST",
      body: signupRequest,
    });
  };
}

decorate(DataStore, {
  isAuthenticated: observable,
  currentUser: observable,
  basket: observable,
  basketContent: observable,
  products: observable,
  productDetail: observable,
  handleLogin: action,
  handleLogoutState: action,
  request: action,
  getBasket: action,
  getProductDetail: action,
  getProducts: action,
  getCurrentUser: action,
  login: action,
  signup: action,
});

export default new DataStore();
