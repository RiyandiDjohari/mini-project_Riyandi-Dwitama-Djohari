import { LinearProgress } from "@mui/material";
import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import Card from "../../../Components/Card/Card";
import Container from "../../../Components/Container/Container";
import CenteredSpinner from "../../../Components/Loading/CenteredSpinner";
import { useCreateBlog } from "../../../Hooks/useCreateBlog";
import BlogInputCard from "./BlogInputCard";
import classes from "./CreateBlog.module.css";
import TagInputCard from "./TagInputCard";
import TitleInput from "./TitleInput";
import {convertToRaw, EditorState} from "draft-js";
import draftToHtml from "draftjs-to-html";
import Button from "../../../Components/Button/Button";
import { useHistory } from "react-router-dom";
import AlertMessage from "../../../Components/Alert/AlertMessage";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../../Firebase/firebase";
import { v4 as uuidv4 } from "uuid";

function CreateBlog() {
  const uid = useSelector((state) => state.user.uid)
  const { createblog, errorCreateBlog, loadingCreateBlog } = useCreateBlog(uid);
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState([]);
  const [url, setUrl] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const imageRef = useRef();
  const [loadingImage, setLoadingImage] = useState(false);
  const username = useSelector((state) => state.user.username);
  const history = useHistory();

  const titleChangeHandler = (e) => {
    if(e.target.value.trim().length > 35) return;
    setTitle(e.target.value);
  };

  const uploadImageHandler = (e) => {
    const files = imageRef.current.files;
    const file = files[0];
    const fileRef = ref(storage, `blog-img/${uuidv4()}`);
    uploadBytes(fileRef, file)
      .then((res) => {})
      .catch((err) => {
        setLoadingImage(false);
      })
      .then(() => {
        getDownloadURL(fileRef).then((url) => {
          setUrl(url);
          setLoadingImage(false);
        });
      });
    imageRef.current.files = e.target.files;
    e.target.files = files;
  };

  const addTagHandler = (tag) => {
    setTags((prev) => [...prev, { tag }]);
  };

  const removeTagHandler = (removedTag) => {
    setTags((prev) => prev.filter(({ tag }) => tag !== removedTag))
  };

  const editorChangeHandler = (state) => {
    setEditorState(state);
  };

  const backHandler = () => {
    history.push("/blog")
  };

  const submitHandler = () => {
    setSubmitted(true);
    createblog({
      variables: {
        object: {
          author: username,
          user_id: uid,
          image: url,
          title: title,
          content: draftToHtml(convertToRaw(editorState.getCurrentContent())),
          blog_tags: {
            data: tags,
          },
        },
      },
    });
    setTitle("");
    setTags([]);
    setEditorState(EditorState.createEmpty());
  };

  const closeHandler = () => {
    setSubmitted(false);
    console.log(submitted);
  };

  return (
    <Container>
      <h2 className={classes.title}>Create your blog</h2>
      { loadingCreateBlog && <CenteredSpinner/> }
      { !loadingCreateBlog && (
        <>
          <TitleInput value={title} onChange={titleChangeHandler} /> 
          <Card>
            <h3 className={classes.subtitle}>Your blog thumbnail</h3>
            {!loadingImage && (
              <input
                ref={imageRef}
                onChange={uploadImageHandler}
                required
                type="file"
                accept="png, jpg"
              />
            )}
            {loadingImage && <LinearProgress/>}
          </Card>
          <TagInputCard
            tags={tags}
            addTag={addTagHandler}
            removeTag={removeTagHandler}
          />
          <BlogInputCard state={editorState} onChange={editorChangeHandler}/>
          <div className={classes.btnWrapper}>
            <Button onClick={backHandler} theme="light">
              Cancel
            </Button>
            <Button onClick={submitHandler} theme="dark">
              Create
            </Button>
          </div>
          <AlertMessage 
            message="Succesfully create blog"
            onClose={closeHandler}
            show={submitted && !errorCreateBlog && !loadingCreateBlog}
            type="success"
          />
          <AlertMessage 
            message="Something went wrong"
            onClose={closeHandler}
            show={submitted && errorCreateBlog && !loadingCreateBlog}
            type="error"
          />
        </>
      )}
    </Container>
    );
}

export default CreateBlog;
