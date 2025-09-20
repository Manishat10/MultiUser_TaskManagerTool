const{EntitySchema}=require('typeorm');
const lowercaseTransformer = {
  from: (value) => value,
  to: (value) => value ? value.toLowerCase() : value,
};

module.exports=new EntitySchema({
    name:'User',
    tableName:'users',
    columns:{
        id:{
            primary:true,
            type:'int',
            generated:true,
        },
        name:{type:'varchar',length:50},
        email:{type:'varchar',length:100,unique:true,transformer: lowercaseTransformer},
        password:{type:'varchar',length:100 }
    },
    relations:{
        taskCreated:{
            type:'one-to-many',
            target:'Task',
            inverseSide:'created_by'
        },
        taskAssigned:{
            type:'one-to-many',
            target:'Task',
            inverseSide:'assigned_to'
        },
        comments:{
            type:'one-to-many',
            target:'Comment',
            inverseSide:'user'
        }
    }
});