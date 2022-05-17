import { Button, Card, CardActions, CardMedia, Typography } from '@mui/material';
import React from 'react'
import { useHistory } from 'react-router-dom'
import Tag from '../../../Components/Tag/Tag';
import TagContainer from '../../../Components/Tag/TagContainer';

function BlogCard({image, author, title, id, tags, deleteAble, onDelete}) {
  const history = useHistory();
  const clickHandler = () => {
    history.push(`blog/${id}`);
  }

  const deleteHandler = () => {
    onDelete(id);
  }

  return (
    <Card
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
      sx={{maxWidth: 280}}
    >
      <div>
        <CardMedia
          component="img"
          height="140"
          image={image}
          alt="blog_image"
        />
        <div style={{padding: "10px 20px", paddingBottom: "0"}}>
          <Typography gutterBottom variant='h6' component="div">
            {title}
          </Typography>
          <Typography gutterBottom variant="body2" color="text.secondary">
            Created by <span>{author}</span>
          </Typography>
          <TagContainer size="small">
            {tags.slice(0,4).map((tag) => {
              return (
                <Tag
                  size="small"
                  text={tag.tag}
                  removeable={false}
                  key={tag.id}
                />
              );
            })}
          </TagContainer>
        </div>
      </div>
      <CardActions>
        <Button onClick={clickHandler} size="small">
          Read Blog
        </Button>
        {deleteAble && (
          <Button onClick={deleteHandler} size="small">
            Delete Blog
          </Button>
        )}
      </CardActions>
    </Card>
  )
}

export default BlogCard