const pool = require("../config/db");

exports.createTask = async (req, res) => {
  const { title, description, status, due_date, assignedTo } = req.body;
  const userId = req.user.id;

  try {
    // Basic validation
    if (!title || !due_date) {
      return res.status(400).json({ message: "Title and due_date are required" });
    }

    const result = await pool.query(
      `INSERT INTO tasks (title, description, status, due_date, created_by, assigned_to) 
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [title, description, status || "pending", due_date, userId, assignedTo || userId]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error creating task:", err.message);
    res.status(500).send("Server error");
  }
};

//get task
exports.getTask= async(req,res)=>{
    const {id} =req.params;
    const userId=req.user.id;
    try{
        const result= await pool.query(
            "SELECT * FROM tasks WHERE id =$1",[id]
        );
        if(result.rows.length===0){
            return res.status(404).json({message:"task not found"});
        }
        const task= result.rows[0];
        if(task.created_by !==userId && task.assigned_to!==userId){
            return res.status(403).json({message:"Forbidden"});
        }
        res.json(task);
    }catch(err){
        console.log(err.message);
        res.status(500).send("Server error");   
    }
};

exports.updateTask= async(req,res)=>{
    const {id}=req.params;
    const {title,description,status,due_date,assigned_to}=req.body;
    const userId = req.user.id;
    try{
        const task= await pool.query("SELECT * FROM tasks WHERE id =$1",[id]);
        if(task.rows.length === 0){
            return res.status(404).json({message:"task not found"});
        }
        if(task.rows[0].created_by!=userId){
            console.log(task.rows[0].created_by,"-",userId)
            return res.status(403).json({message:"forbidden"});
        }
        const fields=[];
        const values=[];
        let queryIndex=1;
        if(title!==undefined){
            fields.push(`title =$${queryIndex}`);
            values.push(title);
            queryIndex++;
        }
        if(description!==undefined){
            fields.push(`description =$${queryIndex}`);
            values.push(description);
            queryIndex++;
        }
        if(status!==undefined){
            fields.push(`status =$${queryIndex}`);
            values.push(status);
            queryIndex++;
        }
        if(due_date!==undefined){
            fields.push(`due_date =$${queryIndex}`);
            values.push(due_date);
            queryIndex++;
        }
        if(assigned_to!==undefined){
            fields.push(`assigned_to =$${queryIndex}`);
            values.push(assigned_to);
            queryIndex++;
        }
        if(fields.length===0){
            return res.status(400).json({message:"No fields to Update"})
        }
        values.push(id);
        const queryText=`UPDATE tasks SET ${fields.join(", ")} WHERE id=$${queryIndex} RETURNING *`;
        const updated = await pool.query(queryText,values);
        res.json(updated.rows[0]);
    }catch(err){
        console.log(err.message);
        return res.status(500).send("server error");
    }
};
exports.deleteTask= async(req,res)=>{
    const { id }=req.params;
    const userId= req.user.id;
    try{
        const task= await pool.query(
            `SELECT * FROM tasks WHERE id=$1`,[id]
        );
        if(task.rows.length===0){
            return res.status(404).json({message:"Task not found"});
        }
        if(task.rows[0].created_by !== userId){
            return res.status(404).json({message:"Forbidden"});
        }
        await pool.query("DELETE FROM tasks WHERE id =$1",[id]);
        res.json({message:"Task deleted successfully"});
    }
    catch(err){
        console.log(err.message);
        return res.status(500).send("server error");
        
    }
};