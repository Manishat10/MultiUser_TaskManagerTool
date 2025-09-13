const CommentRepository = require('../../../repositories/commentRepository');

exports.createComment = async (task_id, user_id, text) =>
    await CommentRepository.addComment(task_id, user_id, text);

exports.getComments = async (task_id) =>
    await CommentRepository.getByTaskId(task_id);
