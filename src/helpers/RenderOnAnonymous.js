import { useEffect } from "react";
import KeycloakService from "../services/KeycloakService";
import { useNavigate } from "react-router-dom";

const RenderOnAnonymous = ({ children }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (KeycloakService.isLoggedIn()) {
      navigate("/"); 
    }
  }, [navigate]);

  return !KeycloakService.isLoggedIn() ? children : null;
};

export default RenderOnAnonymous;


