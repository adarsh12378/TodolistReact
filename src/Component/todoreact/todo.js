import React, { useEffect, useState } from 'react'
import "./style.css"

//get the local data storage back
const getLocalData =() =>{
    const lists=localStorage.getItem("my todo list")
if(lists){
    return JSON.parse(lists);
}
else{
    return [];
}
};
const Todo = () => {
    const [inputdata,setInputData]=useState("");
    const [items , setItems]=useState(getLocalData());
    const [isEditItem, setIsEditItem] = useState("");
    const [toggleButton, setToggleButton] = useState(false);

    //add item for todo
const addItem = () =>{
if(!inputdata){
    alert("Please Fill The Data");
}
else if(inputdata && toggleButton){
    setItems(
        items.map((curElem)=>{
if(curElem.id===isEditItem){
return {...curElem,name:inputdata}
}
return curElem;
        })
    );
    setInputData("");
    setIsEditItem(null);
    setToggleButton(false);
}
    else{
        const myNewInputData ={
            id:new Date().getTime().toString(),
            name:inputdata,
        };
        setItems([...items,myNewInputData]);
        setInputData("");
    }

};

//how to delete item section
const deleteItem=(index)=>{
const updatedItems =items.filter((curElem)=>{
return curElem.id !==  index;
});
setItems(updatedItems);
};

//remove all the elements
const removeAll=()=>{
setItems([]);
};
 //adding local storage
useEffect(()=>{
localStorage.setItem("my todo list",JSON.stringify(items))
},[items]);


//edit item for todo
const editItem=(index)=>{
const item_todo_edited=items.find((curElem)=>{
    return curElem.id===index;
});
setInputData(item_todo_edited.name);
    setIsEditItem(index);
    setToggleButton(true);
}

 return (
    <div class="main-div">
      <div class="child-div">
    <figure>
        <img src="https://img.freepik.com/free-vector/mobile-note-list-concept-illustration_114360-6275.jpg?w=740&t=st=1680505281~exp=1680505881~hmac=676eb50d74c53c8c7b5625234400ac850af3a61b34aa59488e0c1e9cc51eb3f2" alt="todo.logo" srcset="" />
        <figcaption>Add Your List Here </figcaption>
        <figcaption>This Todo List is created by Adarsh Gupta </figcaption>
            <figcaption>SGSITS INDORE|| REACT DEVELOPER|| FULL STACK WEB DEVELOPER
        </figcaption>
    </figure>
    <div className="addItems">
        <input type="text" 
        placeholder=":✍ Add Items"
        className="form-control"
        value={inputdata}
        onChange={(event)=>setInputData(event.target.value)}
        />
        {toggleButton ? (
            <i className="far fa-edit add-btn" onClick={addItem}></i>
          ) : (
            <i className="fa fa-plus add-btn" onClick={addItem}></i>
          )}
    </div>

    {/*show our items*/}
<div className="showItems">
{items.map((curElem,index) => {
    return(
        <div className="eachItem" key={curElem.id}>
        <h3>{curElem.name}</h3>
        <div className="todo-btn">
        <i className="far fa-edit add-btn" onClick={()=>editItem(curElem.id)}></i>
        <i className="far fa-trash-alt add-btn" onClick={()=>deleteItem(curElem.id)}></i>
        </div>
        </div>
    );
})}



    {/* <div className="eachItem">
        <h3>Apple</h3>
        <div className="todo-btn">
        <i className="far fa-edit add-btn"></i>
        <i className="far fa-trash-alt add-btn"></i>
        </div>
    </div> */}
</div>


    <div className="showItems">
<button className="btn effect04" data-sm-link-text="Remove All" onClick={removeAll}><span>CHECK LIST</span></button>

    </div>
      </div>
    </div>
      
 )
}

export default Todo;
