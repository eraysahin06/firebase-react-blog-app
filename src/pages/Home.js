import React, { useEffect, useState } from 'react';
import { collection, deleteDoc, getDocs, doc } from 'firebase/firestore';
import { db, auth } from '../firebase-config';

const Home = ({ isAuth }) => {
  const [postLists, setPostLists] = useState([]);
  const postsCollectionRef = collection(db, 'posts');

  const deletePost = async (id) => {
    const postDoc = doc(db, 'posts', id);
    await deleteDoc(postDoc);
    // After deleting the post, update the state to reflect the changes
    setPostLists(postLists.filter((post) => post.id !== id));
  };

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(postsCollectionRef);
      const postsData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setPostLists(postsData);
    };
    getPosts();
  }, []); // Run this effect only once on component mount

  return (
    <div className="homePage">
      {postLists.map((post) => {
        const isCurrentUserAuthor =
          isAuth && post.author.id === auth.currentUser?.uid;
        return (
          <div className="post" key={post.id}>
            <div className="postHeader">
              <div className="title">
                <h1>{post.title}</h1>
              </div>
              <div className="deletePost">
                {isCurrentUserAuthor && (
                  <button
                    onClick={() => {
                      deletePost(post.id);
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
