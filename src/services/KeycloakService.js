import Keycloak from "keycloak-js";

 const keycloak = new Keycloak("/keycloak.json");

 const initKeycloak = async (onAuthenticatedCallback) => {
    await keycloak.init({
      onLoad: 'check-sso',
      silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
      pkceMethod: 'S256',
    })
      .then((authenticated) => {
        if (!authenticated) {
          console.log("user is not authenticated..!");
        }
        onAuthenticatedCallback();
      })
      .catch(console.error);
  };

  
const doLogin = keycloak.login;
const doLogout = keycloak.logout;
const getToken = () => keycloak.token;
const isLoggedIn = () => !!keycloak.token;
const getKeycloak = () => keycloak
const doRegister = () => keycloak.login({action: 'register'})

const getId = () => keycloak.tokenParsed?.sid;
const getUsername = () => keycloak.tokenParsed?.preferred_username;
const getPhone = () => keycloak.tokenParsed?.phone;
const getBirthdate = () => keycloak.tokenParsed?.birthdate;
const getGiven_name = () => keycloak.tokenParsed?.given_name;
const getFamily_name = () => keycloak.tokenParsed?.family_name;
const getRole = () => keycloak.tokenParsed?.realm_access?.roles;

const getUserRole = () => {
  const realmRoles = keycloak.tokenParsed?.realm_access?.roles;
  return realmRoles ? !!realmRoles.find(role => role === 'FIRST-JOB-USER') : false;
};

const getHRRole = () => {
  const realmRoles = keycloak.tokenParsed?.realm_access?.roles;
  return realmRoles ? !!realmRoles.find(role => role === 'FIRST-JOB-HR') : false;
};

const getMentorRole = () => {
  const realmRoles = keycloak.tokenParsed?.realm_access?.roles;
  return realmRoles ? !!realmRoles.find(role => role === 'FIRST-JOB-MENTOR') : false;
};

const KeycloakService = {
    initKeycloak,
    doLogin,
    doRegister,
    doLogout,
    isLoggedIn,
    getToken,
    getKeycloak,
    getUsername,
    getPhone,
    getBirthdate,
    getGiven_name,
    getFamily_name,
    getRole,
    getId,
    getKeycloak: () => keycloak,
    getUserRole,
    getHRRole,
    getMentorRole
};

export default KeycloakService;