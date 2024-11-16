import React from "react";
import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../../../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess, signInStart } from "../../../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

const OAuthBtn = () => {
  const auth = getAuth(app);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });

    // dispatch(signInStart());
    try {
      const googleResults = await signInWithPopup(auth, provider);
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: googleResults.user.displayName,
          email: googleResults.user.email,
          googlePhotoUrl: googleResults.user.photoURL,
        }),
      });
      if (!res.ok) {
        throw new Error("Failed to authenticate");
      }

      const data = await res.json();
      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button
      className="w-full flex justify-center items-center gap-x-2 p-2 border border-gray-600 rounded-md hover:bg-accent"
      onClick={handleGoogleClick}
    >
      <FcGoogle />
      <p className="font-semibold">Sign in With Google</p>
    </button>
  );
};

export default OAuthBtn;