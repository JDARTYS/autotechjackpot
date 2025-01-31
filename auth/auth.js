import { createAuth0Client } from "https://cdn.auth0.com/js/auth0-spa-js/1.18/auth0-spa-js.production.js";

let auth0Client;

async function initAuth() {
  auth0Client = await createAuth0Client({
    domain: "autotechjackpot.eu.auth0.com",
    client_id: "KaPyAYevXOZaKcI7nbH3OCNKcB1fKQek",
    redirect_uri: "https://autotechjackpot.vercel.app/callback"
  });

  // Controlla se l'utente è autenticato
  const isAuthenticated = await auth0Client.isAuthenticated();

  if (isAuthenticated) {
    const user = await auth0Client.getUser();
    document.getElementById("login-button").style.display = "none";
    document.getElementById("logout-button").style.display = "block";
    document.getElementById("user-info").innerText = `Welcome, ${user.name}`;
  }
}

// Funzione di login
async function login() {
  if (!auth0Client) return console.error("Auth0 client is not initialized yet.");
  await auth0Client.loginWithRedirect();
}


// Funzione di logout
async function logout() {
  if (!auth0Client) return console.error("Auth0 client is not initialized yet.");
  auth0Client.logout({ returnTo: "https://autotechjackpot.vercel.app/" });
}

// Inizializza Auth0
window.onload = () => {
  initAuth();
  document.getElementById("login-button").addEventListener("click", login);
  document.getElementById("logout-button").addEventListener("click", logout);
};
