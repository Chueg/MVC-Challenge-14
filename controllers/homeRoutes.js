const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all posts and JOIN with user data
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      posts, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/post/:id', async (req, res) => {
  
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });
    
    bigChunky = req.params.id;
    const post = postData.get({ plain: true });
    console.log(post);
    
    
    const rawcommentData = await Comment.findAll({
      include: [
        {
          model: Post,
          attributes: ['name'],
        },
      ],
      where: {
        post_id:req.params.id
      }
      
    });

    const commentData = rawcommentData.map((comment) => comment = {

      name: comment.name,
      bomment: comment.bomment,
      date_created: comment.date_created,
    });
    res.render('post', {
      ...post,
      commentData,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/post/:id/comment',
 withAuth, 
 async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Post }],
    });
    const user = userData.get({ plain: true });


    const newComment = await Comment.create({
      name: user.name,
      bomment: req.body.comment,
      post_id: bigChunky,
    });



    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/newPost',
 withAuth, 
 async (req, res) => {
  try {

    const newPost = await Post.create({
      name: req.body.name,
      description: req.body.description,
      userid: req.session.user_id,
    });



    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/post/:id',
 withAuth, 
 async (req, res) => {
  try {

    const newPost = await Post.destroy({
      where:{
        id:req.params.id
      }
    });



    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/post/:id', async (req, res) => {
  try {
    console.log("beef");
    const postData = await Post.update(
      {
          description:req.body.description
      },
      {
      where: {
        id: req.params.id,
      },
    }
    );
    if (!postData[0]) {
      res.status(404).json({ message: 'No post with this id!' });
      return;
    }
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Post }],
    });
    const rawpostData = await Post.findAll({
      include: [{
        model: User,
        attributes: ['name']
      }],
      where: {
        userid: req.session.user_id
      }
    });


    const postData = rawpostData.map((post) => post = {
      id: post.id,
      name: post.name,
      description: post.description,
      date_created: post.date_created,
    });

    const user = userData.get({ plain: true });

    res.render('dashboard', {
      ...user,
      postData,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;
