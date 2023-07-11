import React, { useState,useEffect } from 'react'
import '../styles/todo.css'

// local storage se set krenge taki refresh k baad bhi data na jaye

const getlocalItems = () => {
    let list = localStorage.getItem('lists')
    if(list){
        return JSON.parse(list)
    }
    else{
        return []
    }
}   

const Todo = () => {

    const [inputData, setinputData] = useState('')
    const [items, setitems] = useState(getlocalItems())
    const addItem = () => {
        if (!inputData) {
            alert('Please enter some task')
        }
        else {
            
            setitems([...items,inputData])
            setinputData('')
        }
    }

    const deleteItem = (ind) => {
        const updatedItems = items.filter((elem, index) => {
            return ind !== index
        })
        setitems(updatedItems)
    }

    const removeAll = () => {
        setitems([])
    }
    // jab bhi items ki value change hogi hme data store krana h
    useEffect ( () => {
        localStorage.setItem('lists',JSON.stringify(items))
    },[items])
    return (
        <>
            <div className='main-div'>
                <div className='child-div'>
                    <figure>
                        <img className='img' src={require('../images/to-do-list (1).png')} width={100} height={100} />
                        <figcaption ><h2>Yes you have to do this 😎</h2><h3>Add your list here ⭐</h3></figcaption>
                    </figure>
                    <div className='addItems'>
                        <input type='text' placeholder='✍ Add more tasks...' value={inputData} onChange={(e) => setinputData(e.target.value)}></input>
                        <button onClick={addItem}>+</button>
                    </div>
                    <div className='showItems'>
                        {
                            items.map((elem, ind) => {
                                return (
                                    <div className='showItem' key={ind}>
                                        <div className='eachItem'>
                                            <p>{elem}</p>
                                        </div>
                                        <button onClick={() => deleteItem(ind)}>X</button>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div>
                        <button className='btn' onClick={removeAll}>
                            <span>CLEAR ALL</span>
                        </button>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Todo
