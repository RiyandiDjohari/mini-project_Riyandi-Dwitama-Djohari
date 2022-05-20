import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import Container from '../../Components/Container/Container'
import CodeInputCard from '../Forum/CreateQuestion/CodeInputCard';
import QuestionDetailPreview from '../Forum/CreateQuestion/QuestionDetailPreview';
import QuestionInputCard from '../Forum/CreateQuestion/QuestionInputCard';
import TagInputCard from '../Forum/CreateQuestion/TagInputCard';
import TitleInputCard from '../Forum/CreateQuestion/TitleInputCard';
import classes from "./EditQuestion.module.css";
import {EditorState, convertFromRaw, convertToRaw} from "draft-js"
import { markdownToDraft } from "markdown-draft-js"
import { draftjsToMd } from "draftjs-md-converter"
import { useUpdateQuestion } from "../../Hooks/useUpdateQuestion";
import Button from '../../Components/Button/Button';
import CenteredSpinner from '../../Components/Loading/CenteredSpinner';
import AlertMessage from '../../Components/Alert/AlertMessage';

function EditQuestion(props) {
  const history = useHistory();
  const {
    id,
    title: titleProps,
    question: questionProps,
    code: codeProps,
    tags: tagsProps,
    // user_id,
  } = props.location.state.data;

  const convertedTags = tagsProps.map(({question_id, tag}) => ({
    tag, question_id
  }));

  const { updateQuestion, loadingUpdateQuestion, errorUpdateQuestion } = useUpdateQuestion();
  console.log(updateQuestion);
  const [title, setTitle] = useState(titleProps);
  const [submitted, setSubmitted] = useState(false);
  const [question, setQuestion] = useState(
    EditorState.createWithContent(
      convertFromRaw(markdownToDraft(questionProps))
    )
  );
  const [code, setCode] = useState(
    EditorState.createWithContent(convertFromRaw(markdownToDraft(codeProps)))
  );
  const questionMarkdown = draftjsToMd(convertToRaw(question.getCurrentContent()));
  const codeMarkdown = draftjsToMd(convertToRaw(code.getCurrentContent()));
  const [tags, setTags] = useState(convertedTags);

  const addTagHandler = (tag) => {
    setTags((prev) => [...prev, { tag, question_id: id }]);
  };

  const removeTagHandler = (removedTag) => {
    setTags((prev) => {
      const data = prev.filter((tag) => tag.tag !== removedTag);
      return data;
    });
  };

  const questionChangeHandler = (state) => {
    setQuestion(state);
  };

  const codeChangeHandler = (state) => {
    setCode(state);
  };

  const cancelHandler = () => {
    history.goBack();
  };

  const closeHandler = () => {
    setSubmitted(false);
  };

  const saveHandler = () => {
    setSubmitted(true);
    updateQuestion({
      variables: {
        id: id,
        title: title,
        code: codeMarkdown,
        question: questionMarkdown,
        objects: tags,
      },
    });
  };

  return (
    <Container className={classes.contain}>
      <h2>Edit your Question</h2>
      <TitleInputCard value={title} onChange={setTitle}/>
      <TagInputCard tags={tags} addTag={addTagHandler} removeTag={removeTagHandler}/>
      <QuestionInputCard editorState={question} onChangeEditorState={questionChangeHandler}/>
      <CodeInputCard editorState={code} onChangeEditorState={codeChangeHandler}/>
      <QuestionDetailPreview question={questionMarkdown} code={codeMarkdown}/>
      {!loadingUpdateQuestion && (
        <div className={classes.btnWrapper}>
          <Button onClick={cancelHandler} theme="light">
            Cancel
          </Button>
          <Button onClick={saveHandler} theme="dark">
            Save
          </Button>
        </div>
      )}
      {loadingUpdateQuestion && <CenteredSpinner /> }
      <AlertMessage
        show={submitted && !errorUpdateQuestion && !loadingUpdateQuestion}
        message="Succesfully update question."
        type="success"
        onClose={closeHandler}
      />
      <AlertMessage
        show={submitted && errorUpdateQuestion && !loadingUpdateQuestion}
        message="Something went wrong."
        type="error"
        onClose={closeHandler}
      />
    </Container>
  )
}

export default EditQuestion