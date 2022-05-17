import React, { useState } from 'react'
import Button from '../../../Components/Button/Button';
import Card from '../../../Components/Card/Card'
import Tag from '../../../Components/Tag/Tag';
import TagContainer from '../../../Components/Tag/TagContainer';
import classes from "./TagInputCard.module.css";

function TagInputCard({tags, addTag, removeTag}) {
  const [tag, setTag] = useState("");

  const checkSameTag = () => {
    const sameTag =  tags.find((t) => t === tag);
    if(sameTag) return true;
    return false;
  };

  const addHandler = () => {
    if(!checkSameTag(tag)){
      addTag(tag);
      setTag("");
    } else {
      alert("There is same tag, make sure every tag is unique!")
    }
  };

  return (
    <Card className={classes.contain}>
      <h3>Tags</h3>
      <p>
        Add some tag that relate to your blog topic. (e.g sport, technology,
        music, etc)
      </p>
      <TagContainer>
        {tags.map(({ tag }) => {
          return(
            <Tag onRemove={removeTag} text={tag} key={tag} removeable={true} />
          )
        })}
      </TagContainer>
      <div className={classes.inputWrapper}>
        <input 
          onChange={(e) => setTag(e.target.value)}
          value={tag}
          type="text"
        />
        <Button theme="dark" onClick={addHandler}>
          Add
        </Button>
      </div>
    </Card>
  )
}

export default TagInputCard