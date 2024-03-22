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

const hasFirstJobUserRole = () => {
  const realmRoles = keycloak.tokenParsed?.realm_access?.roles;
  return realmRoles && realmRoles.includes('FIRST-JOB-USER');
};

const hasFirstJobHRRole = () => {
  const realmRoles = keycloak.tokenParsed?.realm_access?.roles;
  return realmRoles && realmRoles.includes('FIRST-JOB-HR');
};

const hasFirstJobMentorRole = () => {
  const realmRoles = keycloak.tokenParsed?.realm_access?.roles;
  return realmRoles && realmRoles.includes('FIRST-JOB-MENTOR');
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
    hasFirstJobUserRole,
    hasFirstJobHRRole,
    hasFirstJobMentorRole,
    getGiven_name,
    getFamily_name,
    getId,
    getKeycloak: () => keycloak,
};

export default KeycloakService;