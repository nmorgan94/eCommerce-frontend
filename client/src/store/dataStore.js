import { observable, action, decorate } from "mobx";
import { ACCESS_TOKEN } from "../constants";
import Cookies from "universal-cookie";

const cookies = new Cookies();

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
    fetch(`/basket/baskets/${id}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        this.basket = data;
        this.basketContent = data.basketContent;
      });
  };

  getProductDetail = (id) => {
    console.log("frontend calling");
    fetch(`/products/${id}`)
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
    fetch("/products")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        this.products = data;
      })
      .catch(() => console.log("Products api call failed"));
  };

  getCurrentUser = () => {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
      return Promise.reject("No access token set.");
    }

    return this.request({
      url: "/user/me",
      method: "GET",
    });
  };

  signup = (signupRequest) => {
    return this.request({
      url: "/api/auth/signup",
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
