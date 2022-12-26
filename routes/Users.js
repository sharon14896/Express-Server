import express from "express";

const router = express.Router();
const users = [
    { id: 1, name: "John", age: 30 },
    { id: 2, name: "Jane", age: 25 },
    { id: 3, name: "Bob", age: 35 },
    { id: 4, name: "Alice", age: 28 },
    { id: 5, name: "Mike", age: 32 },
    { id: 6, name: "Sarah", age: 27 },
    { id: 7, name: "Chris", age: 29 },
    { id: 8, name: "Maggie", age: 26 },
    { id: 9, name: "Tom", age: 31 },
    { id: 10, name: "Emily", age: 24 },
    { id: 11, name: "Jason", age: 33 },
    { id: 12, name: "Laura", age: 29 },
    { id: 13, name: "Richard", age: 28 },
    { id: 14, name: "Ashley", age: 25 },
    { id: 15, name: "Andrew", age: 34 },
    { id: 16, name: "Jessica", age: 27 },
    { id: 17, name: "Michael", age: 32 },
    { id: 18, name: "Samantha", age: 30 },
    { id: 19, name: "Kevin", age: 29 },
    { id: 20, name: "Emily", age: 24 },
    { id: 21, name: "David", age: 35 },
    { id: 22, name: "Ashley", age: 26 },
    { id: 23, name: "Robert", age: 31 },
    { id: 24, name: "Sara", age: 29 },
    { id: 25, name: "Chris", age: 28 }
  ];

router.get('/', (req, res) => {
    res.json(users);
})

router.get('/byId/:id',(req,res)=>{
    const id=req.params.id;
    const user=users.find(users=>users.id==id)
    if(!user)
    return res.json({msg:`User not found!`})
   res.json(user)
})

router.get('/byAge',(req,res)=>{
    const min=req.query.min;
    const max=req.query.max;
    let usersByAge=[];
    if(!min&&!max){
        return res.json(users)
    }
    else if(min&&!max){
        usersByAge=users.filter(users=>users.age>=min)
        return res.json(usersByAge)
    }
    else if(!min&&max){
        usersByAge=users.filter(users=>users.age<=max)
        return res.json(usersByAge)
    }
    else if(min>max){
        return res.json({msg:'It doesnt make sense that the minimum is greater than the maximum'})
    }
    usersByAge=users.filter(users=>users.age>=min&&users.age<=max)
    res.json(usersByAge)
})

router.post('/',(req,res)=>{
    const {name,age}=req.body;
    const user=req.body;
    if(!name,!age)
    return res.json({msg_err:'name , age are requierd'});
    for (const key in user) {
        if(key!='name' && key!='age' )
        return res.json({msg_err:'only name and age are requierd'})
    }
    user.id=users.length +1 
    users.push(user);
    res.json({msg:'The user was successfully added!',user})
})

router.delete('/:id',(req,res)=>{
    const id =req.params.id
    const user=users.find(cakes=>cakes.id==id)
    if(!user){
        return res.json({msg_err:'user not found'})
    }
    let index;
    users.forEach((user,i)=>{
        if(user.id==id){
            index=i
        }
    });

    users.splice(index,1)
    res.json(user)
})






export default router;