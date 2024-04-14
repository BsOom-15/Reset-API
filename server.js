const express = require('express')
const routes = express.Router();
const User = require('./models/User');

// 1- Getting All:
routes.get('/', async (req,res)=>{
    try{
        const user = await User.find()
        res.json(user)
    }
    catch(error) {
        res.json({message: error.message})
    }
})
// 2- Getting One:
routes.get('/:id', getUsers, async(req,res)=>{
    res.json(res.user)
})
// 3- Create One:
routes.post('/', async(req, res)=>{
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        age: req.body.age
    })
    try
    {
        const newUsers = await user.save()
        res.status(201).json(newUsers)
    }
    catch(error)
    {
        res.status(400).json({message: error.message});
    }
})
// 4- Update One:
routes.patch('/', getUsers, async(req, res)=>{
    if(req.body.name != null){
        res.user.name = req.body.name
    }

    if(req.body.email != null){
        res.user.email = req.body.email
    }

    if(req.body.age != null){
        res.user.age = req.body.age
    }

    try
    {
        const updatedUser = await req.user.save()
        res.status(201).json(updatedUser)
    }
    catch(error)
    {
        res.status(400).json({message: error.message});
    }
})

// 5- Delete One:
routes.delete('/:id', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: 'Deleted User' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});






async function getUsers(req, res, next) {
    let user;
    try {
        user = await User.findById(req.params.id);
        if (user == null) {
            return res.status(404).json({ message: "Cannot Find User" });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
    res.user = user;
    next();
}



module.exports = routes