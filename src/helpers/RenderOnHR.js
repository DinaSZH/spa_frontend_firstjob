import { useEffect } from "react";
import KeycloakService from "../services/KeycloakService";
import { useNavigate } from "react-router-dom";
const RenderOnHR = ({ children }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!KeycloakService.getHRRole()) {
      navigate("/");
    }
  }, [navigate]);

  return KeycloakService.getHRRole() ? children : null;
};

export default RenderOnHR;
