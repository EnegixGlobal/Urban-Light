import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { openAuthModal } from "../redux/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(openAuthModal("login"));
    navigate("/", { replace: true });
  }, [dispatch, navigate]);

  return null;
};

export default Login;
