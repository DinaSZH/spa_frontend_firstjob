import React from 'react';
import KeycloakService from "../services/KeycloakService";

const RenderOnAnonymous = ({children}) => {
    if (!KeycloakService.isLoggedIn()) return children
    return null
};

export default RenderOnAnonymous;