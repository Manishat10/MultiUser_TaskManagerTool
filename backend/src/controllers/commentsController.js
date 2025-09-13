const CommentService = require('../services/tasks/comments/commentService');

exports.createComment = async (req, res) => {
  try {
    const comment = await CommentService.createComment(req.params.id, req.user.id, req.body.text);
    res.status(201).json(comment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getComments = async (req, res) => {
  try {
    const comments = await CommentService.getComments(req.params.id, req.user.id);
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
