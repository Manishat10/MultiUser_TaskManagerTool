const pool=require('../config/db');
const addComment= async(task_id,user_id,text)=>{
    return pool.query(
        'INSERT INTO comments(task_id, user_id,text) VALUES($1,$2,$3) RETURNING *',
        [task_id,user_id,text]
    );
};

const getCommentByTaskId= async (task_id)=>{
    return pool.query('SELECT * FROM comments WHERE task_id=$1 ORDER BY created_at ASC',[task_id]);
};
const findTaskById= async(task_id)=>{
    return pool.query('SELECT created_by,assigned_to from tasks WHERE id=$1',[task_id]);
};
module.exports={addComment,getCommentByTaskId,findTaskById};

// orm -
// entity