import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signOut,
} from "firebase/auth";

import { auth } from "../../firebase/config";
import { authSignOut, updateUserInfo } from "./authSlice";

export const registerDB =
  ({ login, email, password, userImage }) =>
  async (dispatch) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, {
        displayName: login,
        photoURL: userImage,
      });
      const { photoURL, uid } = auth.currentUser;

      dispatch(
        updateUserInfo({
          userId: uid,
          login,
          email,
          userImage: photoURL,
        })
      );
    } catch (error) {
      alert(`Register in failed: ${error.message}`);
    }
  };

export const loginDB =
  ({ email, password }) =>
  async (dispatch) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      const { photoURL, uid, displayName } = auth.currentUser;
      dispatch(
        updateUserInfo({
          userId: uid,
          login: displayName,
          email,
          userImage: photoURL,
        })
      );
    } catch (error) {
      alert(`Sign in failed: ${error.message}`);
    }
  };

export const authStateChanged = (setUser) => {
  onAuthStateChanged(auth, (user) => {
    setUser(user);
  });
};

export const authLogOut = () => async (dispatch) => {
  try {
    await signOut(auth);
    dispatch(authSignOut());
  } catch (error) {
    alert(`Log out failed: ${error.message}`);
  }
};
