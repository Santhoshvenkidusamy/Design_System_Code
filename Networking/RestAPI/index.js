import express from 'express';
import bodyParser from 'body-parser';
import e from 'express';
const app = express();
app.use(bodyParser.json()); 

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
app.all('/', (req, res) => {
    // console.log("Request",req);
    // console.log("Response",res);
    res.send("I'm alive!");
});

 const todos = [
        { id: "1", title: 'Buy groceries', completed: false },
        { id: "2", title: 'Walk the dog', completed: true },
        { id: "3", title: 'Finish homework', completed: false }
    ];

// READ
app.get('/todos', (req, res) => {
    res.json(todos);
});

//CREATE
app.post('/todos', (req, res) => {
   const newTodo = req.body
   todos.push(newTodo);
   res.json({
    message: "Todo created successfully"
   });
});

//UPDATE
app.put('/todos/:id',(req,res)=>{
    const newTodo = req.body;
    const todoIndex = todos.findIndex(todo => todo.id === req.params.id);
    if(todoIndex !== -1){
        todos[todoIndex] = {
            id: req.params.id,
            ...newTodo
        }
        res.json({
            message: "Todo updated successfully"
        });
    }
    else{
       res.status(404).json({
        message: "Todo not found"
    });
}
        
    
})
//DELETE

app.delete('/todos/:id',(req,res)=>{
    const todoIndex = todos.findIndex(todo => todo.id === req.params.id);
    if(todoIndex !== -1){
        todos.splice(todoIndex,1);
        res.json({
            message: "Todo deleted successfully"
        });
    }
    else{
        res.status(404).json({
            message: "Todo not found"
        });
    }
})