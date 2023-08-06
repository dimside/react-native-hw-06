import {
  collection,
  addDoc,
  updateDoc,
  getDocs,
  doc,
} from "firebase/firestore";
import { db } from "../../firebase/config";
import { updatePosts, writePostsId } from "./postsSlice";

export const writeDataToFirestore = (posts) => async (dispatch) => {
  try {
    const docRef = await addDoc(collection(db, "posts"), {
      posts,
    });
    dispatch(writePostsId(docRef.id));
  } catch (e) {
    console.error("Error adding document: ", e);
    throw e;
  }
};

export const getDataFromFirestore = () => async (dispatch) => {
  try {
    const snapshot = await getDocs(collection(db, "posts"));
    // Перевіряємо у консолі отримані дані
    snapshot.forEach((doc) => {
      // console.log(`${doc.id} =>`, doc.id, doc.data().posts);
        dispatch(updatePosts(doc.data().posts));
        dispatch(writePostsId(doc.id));
    });
    // Повертаємо масив обʼєктів у довільній формі
    // return snapshot.map((doc) => ({ id: doc.id, data: doc.data() }));
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateDataInFirestore = async (docId, posts) => {
  try {
    const ref = doc(db, "posts", docId);
    // console.log("ref IN UPDATE DATA", ref);
    await updateDoc(ref, {
      posts,
    });
    console.log("document updated");
  } catch (error) {
    console.log(error);
  }
};

export const getComments = async (postId, setNewComments) => {
  try {
    const snapshot = await getDocs(collection(db, "posts"));

    snapshot.forEach((doc) => {
      const { comments } = doc.data().posts.find(({ id }) => id === postId);
        setNewComments(comments);
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};
