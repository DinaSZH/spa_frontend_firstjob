import KeycloakService from "../services/KeycloakService";

const RenderOnHR = ({ children }) => {
  if (KeycloakService.getHRRole()) return children;
  return null;
};

export default RenderOnHR;
