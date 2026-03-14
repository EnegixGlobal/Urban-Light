import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { openAuthModal } from "../redux/authSlice";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(openAuthModal("signup"));
    navigate("/", { replace: true });
  }, [dispatch, navigate]);

  return null;
};

export default Signup;
