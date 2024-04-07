import KeycloakService from "../services/KeycloakService";

const RenderOnUser = ({ children }) => {
  if (KeycloakService.getUserRole()) return children;
  return null;
};

export default RenderOnUser;
