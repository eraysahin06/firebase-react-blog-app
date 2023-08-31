import React, { useEffect } from 'react';
import { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db, auth } from '../firebase-config';
import { useNavigate } from 'react-router-dom';

const CreatePost = ({ isAuth }) => {
  const [title, setTitle] = useState('');
  const [postText, setPostText] = useState('');

  const postsCollectionRef = collection(db, 'posts');
  const navigation = useNavigate();

  const handleCreatePost = async () => {
    await addDoc(postsCollectionRef, {
      title,
      postText,
      author: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
    });
    navigation('/');
  };

  useEffect(() => {
    if (!isAuth) {
      navigation('/login');
    }
  }, [isAuth, navigation]);

  return (
    <div className="createPostPage">
      <div className="cpContainer">
        <h1>Create a Post</h1>
        <div className="inputGp">
          <label>Title:</label>
          <input
            placeholder="Enter Title Here"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>
        <div className="inputGp">
          <label>Post:</label>
          <textarea
            placeholder="Write your Blog Post Here"
            onChange={(e) => {
              setPostText(e.target.value);
            }}
          ></textarea>
        </div>
        <button onClick={handleCreatePost}>Submit Post</button>
      </div>
    </div>
  );
};

export default CreatePost;
