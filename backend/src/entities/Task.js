const {EntitySchema}=require('typeorm');
const { type } = require('../config/ormconfig');
const { name } = require('../services/auth/schema');
module.exports= new EntitySchema({
    name:'Task',
    tableName:'tasks',
    columns:{
        id:{primary:true, type:'int',generated:true},
        title:{type:'varchar',length:100},
        description:{type:'text',nullable:true},
        status:{
            type:'enum',
            enum:['pending','in_progress','done'],
            default:'pending',

        },
        due_date: {type:'date'}
    },
    relations: {
        created_by:{
            type:'many-to-one', target:'User',joinColumn:{name:'created_by'}
        },
        assigned_to:{
            type:'many-to-one',
            target:'User',
            joinColumn:{name:'assigned_to'}
        },
        comments:{
            type:'one-to-many',
            target:'Comment',
            inverseSide:'task'

        }
    }
});