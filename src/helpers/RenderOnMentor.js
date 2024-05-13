import { useEffect } from "react";
import KeycloakService from "../services/KeycloakService";
import { useNavigate } from "react-router-dom";
const RenderOnMentor = ({ children }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!KeycloakService.getMentorRole()) {
      navigate("/");
    }
  }, [navigate]);

  return KeycloakService.getMentorRole() ? children : null;
};

export default RenderOnMentor;
