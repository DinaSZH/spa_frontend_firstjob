import KeycloakService from "../services/KeycloakService";

const RenderOnAuthenticated = ({children}) => {
    if (KeycloakService.isLoggedIn()) return children
    return null
};

export default RenderOnAuthenticated;