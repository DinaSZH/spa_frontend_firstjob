import { useEffect } from "react";
import KeycloakService from "../services/KeycloakService";
import { useNavigate } from "react-router-dom";
const RenderOnUser = ({ children }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!KeycloakService.getUserRole()) {
      navigate("/");
    }
  }, [navigate]);

  return KeycloakService.getUserRole() ? children : null;
};

export default RenderOnUser;
