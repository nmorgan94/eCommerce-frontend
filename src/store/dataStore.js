import { observable, action, decorate } from "mobx";
import { ACCESS_TOKEN } from "../constants";
import Cookies from "universal-cookie";

const cookies = new Cookies();

class DataStore {
  isAuthenticated = false;

  currentUser = {};

  basket = {};

  basketContent = [];

  handleLogin = () => {
    if (!localStorage.getItem(ACCESS_TOKEN)) return;
    fetch("/api/user/me", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN),
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        this.currentUser = data;
        if (data.error !== "Unauthorized") {
          this.isAuthenticated = true;
        }
      })
      .catch(() => console.log("users api call failed"));
  };

  handleLogoutState = () => {
    console.log("Logging out");
    localStorage.removeItem(ACCESS_TOKEN);
    this.isAuthenticated = false;
    this.currentUser = {};
  };

  getBasket = () => {
    let id = cookies.get("cookieID");
    fetch(`/api/basket/baskets/${id}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        this.basket = data;
        this.basketContent = data.basketContent;
      });
  };
}

decorate(DataStore, {
  isAuthenticated: observable,
  currentUser: observable,
  basket: observable,
  basketContent: observable,
  productDetail: observable,
  handleLogin: action,
  handleLogoutState: action,
  getBasket: action,
});

export default new DataStore();
