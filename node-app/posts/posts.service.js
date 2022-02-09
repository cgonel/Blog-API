import Post from './posts.model.js'
import Comment from '../comments/comments.model.js'

export const findPostsByUserId = async (userId) => {
  const posts = await Post.findAll({
    where: {
      userId: userId
    }
  })
  return posts
}

export const findPostByUserIdAndPostId = async (userId, postId) => {
  const post = await Post.findAll({
    where: {
      userId: userId,
      id: postId
    }
  })
  return post
}

export const findPostsComments = async (postId) => {
  const comments = await Comment.findAll({
    where: {
      postId: postId
    }
  })
  return comments
}

export const createPost = async (userId, title, body) => {
  const post = await Post.create({
    userId: userId,
    title: title,
    body: body
  })
  return post
}

export const createComment = async (postId, name, email, body) => {
  const comment = await Comment.create({
    postId: postId,
    name: name,
    email: email,
    body: body
  })
  return comment
}

export const editPost = async (title, body, postId) => {
  const post = await Post.update(
    {
      title: title,
      body: body
    },
    {
      where: {
        id: postId
      }
    }
  )
  return post
}

export const findPostById = async (id) => {
  const post = await Post.findAll({
    where: {
      id: id
    }
  })
  return post[0]
}

export const editComment = async (name, email, body, commentId, postId) => {
  const comment = await Comment.update(
    {
      name: name,
      email: email,
      body: body
    },
    {
      where: {
        id: commentId,
        postId: postId
      }
    }
  )
  return comment
}

export const deleteComment = async (postId, commentId) => {
  const comment = await Comment.destroy({
    where: {
      postId: postId,
      id: commentId
    }
  })
  return comment
}
