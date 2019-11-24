import axios from "axios";
import router from "../router";
import { longStackSupport } from "q";
import { ENGINE_METHOD_PKEY_ASN1_METHS } from "constants";

const state = {
  token: localStorage.getItem("token") || "",
  user: {},
  status: ""
};
const getters = {
  isLoggedIn: function(state) {
    if (state.token !== "") {
      return true;
    } else {
      return false;
    }
  },
  user: state => state.user,
  authState: state => state.status
};
const actions = {
  // Login
  async login({ commit }, user) {
    commit("auth_request");
    let res = await axios.post("http://localhost:3000/api/auth/login", user);
    const token = res.data;
    const username = res.config.data.username;
    localStorage.setItem("token", token);
    axios.defaults.headers.common["Authorization"] = token;
    commit("auth_success", token, username);
    return res;
  },

  // Register
  async register({ commit }, userData) {
    commit("register_request");
    let res = await axios.post("http://localhost:3000/auth/register", userData);
    if (res.data.success !== undefined) {
      commit("register_success");
    }
    return res;
  },

  // Logout
  async logout({ commit }) {
    await localStorage.removeItem("token");
    commit("logout");
    delete axios.defaults.headers.common["Authorization"];
    router.push("/login");
    return;
  }
};

const mutations = {
  auth_request(state) {
    state.status = "loading";
  },
  auth_success(state, token, user) {
    state.token = token;
    state.user = user;
    state.status = "success";
  },
  register_request(state) {
    state.status = "loading";
  },
  register_success(state) {
    state.status = "success";
  },
  logout(state) {
    state.status = "";
    state.token = "";
    state.user = "";
  },
  profile_request(state) {
    state.status = "loading";
  },
  user_profile(state, user) {
    state.user = user;
  }
};

export default { state, getters, actions, mutations };
