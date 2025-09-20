const { EntitySchema } = require('typeorm');
module.exports = new EntitySchema({
    name: 'Comment',
    tableName: 'comments',
    columns: {
        id: { primary: true, type: 'int', generated: true },
        text: { type: 'text' },
        created_at: { type: 'timestamp', createDate: true },
    },
    relations: {
        task: { type: 'many-to-one', target: 'Task', joinColumn: {name:'task_id'},onDelete: 'CASCADE' },
        user: { type: 'many-to-one', target: 'User', joinColumn: true }
    }
});
