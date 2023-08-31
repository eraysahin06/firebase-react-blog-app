import React, { useEffect, useState } from 'react';
import { collection, deleteDoc, getDocs, doc } from 'firebase/firestore';
import { db, auth } from '../firebase-config';

const Home = ({ isAuth }) => {
  const [postLists, setPostLists] = useState([]);
  const postsCollectionRef = collection(db, 'posts');

  const removePost = async (id) => {
    const postDocRef = doc(db, 'posts', id);
    await deleteDoc(postDocRef);
    const updatedPostLists = postLists.filter((post) => post.id !== id);
    setPostLists(updatedPostLists);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const querySnapshot = await getDocs(postsCollectionRef);
      const postsData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setPostLists(postsData);
    };
    fetchPosts();
  }, [postsCollectionRef]);

  return (
    <div className="homePage">
      {postLists.map((post) => {
        const isCurrentUserPostAuthor =
          isAuth && post.author.id === auth.currentUser?.uid;
        return (
          <div className="post" key={post.id}>
            <div className="postHeader">
              <div className="title">
                <h1>{post.title}</h1>
              </div>
              <div className="deletePost">
                {isCurrentUserPostAuthor && (
                  <button
                    onClick={() => {
                      removePost(post.id);
                    }}
                  >
                    &#128465;
                  </button>
                )}
              </div>
            </div>
            <div className="postTextContainer">{post.postText}</div>
            <h3>@{post.author?.name}</h3>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
