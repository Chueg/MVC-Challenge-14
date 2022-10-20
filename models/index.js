const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

User.hasMany(Post, {
  foreignKey: 'userid',
  onDelete: 'CASCADE'
});

Post.belongsTo(User, {
  foreignKey: 'userid'
});

Post.hasMany(Comment, {
  foreignKey: 'post_id',
  onDelete: 'CASCADE'
});

Comment.belongsTo(Post, {
  foreignKey: 'post_id'
});


module.exports = { User, Post, Comment };
