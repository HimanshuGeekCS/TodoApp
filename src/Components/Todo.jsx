import { useEffect, useState } from "react";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";

import { MdDelete } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import { MdEdit } from "react-icons/md";

export const Todo = () => {

    const [userInput, setUserInput] = useState("");
    const [todo, setTodo] = useState([]);

    const [updatTodo, setupdatTodo] = useState(null)

    const [search, setSearch] = useState("");

    const [filteredData, setFilteredData] = useState([]);
    console.log(filteredData, 'filteredData');
    console.log(todo, 'todo');


    // change userInput 
    const changeInUser = (e) => {
        // setUserInput({ ...e, name: userInput });
        setUserInput(e.target.value);
    };


    // add todo list
    const addTodo = () => {
        let checkExistence = todo.find(i => i.text.toLowerCase() === userInput.toLowerCase() && i.complete === false)
        console.log(checkExistence, 'checkExistence');

        if (!userInput || userInput.trim() === "") {
            alert("Please enter task.")
        } else if (checkExistence) {
            alert("task already exists")

        }
        else {
            (setTodo([...todo, { text: userInput, complete: false }]));
        }
        setUserInput("");
    }

    // complete Work and throw line 
    const completeWork = (index) => {
        const a = todo.map((e, ind) => {
            if (ind === index) {
                return {
                    ...e, complete: !e.complete
                }
            }
            else {
                return e;
            }
        })
        setTodo(a);

    }

    // delete todo list 
    const deleteTodo = (index) => {
        const a = todo.filter((e, ind) => { return ind !== index });
        setTodo(a);
    }


    // edit Todo 
    const editTodo = (index) => {
        const a = todo.filter((e, ind) => { return e === todo[index] })
        setUserInput(a[0].text);
        setupdatTodo(index);
    }

    // updateTodo 
    const updateTodo = () => {
        const a = todo.map((e, ind) => {
            if (ind === updatTodo) {
                return (
                    { ...e, text: userInput }
                )
            }
            else {
                return e;
            }
        })
        setTodo(a)
        setupdatTodo(null)
        setUserInput("")

    }

    // Search todo list 
    function filteredTasks() {
        // Filter tasks based on search input
        let data = todo.filter((e) =>
            e.text.includes(search));
        setFilteredData(data)
    }

    useEffect(() => {
        if (search.length) {
            filteredTasks()
        } else {
            setFilteredData([...todo])
        }

    }, [search, todo])


    const clearTodos = () => {
        setTodo([]); // Reset state to an empty array
    };


    const submit = (event) => {
        event.preventDefault();
    }
    return (
        <Container fluid>
            <Container className="py-5" >
                <Row >
                    <form onSubmit={submit}>
                        <div className="shadow-lg py-5" style={{ backgroundColor: "#e2e2e2" }}>
                            <Row className=" justify-content-center" >
                                <Col lg="8">
                                    <div className=" text-center">
                                        <h1 style={{ fontWeight: "700", fontSize: "4rem" }}>TO DO</h1>
                                    </div>
                                    <div class="mb-3">
                                        <label style={{ fontSize: "12px" }}>Search </label>
                                        <input type="text" className="form-control input-filed" value={search} onChange={(e) => setSearch(e.target.value)} />
                                    </div>
                                </Col>

                                <Col lg="8" className="py-5">
                                    {
                                        filteredData.map((e, index) => {
                                            return (
                                                <>
                                                    <div className="bg-white p-2 mt-2 d-flex justify-content-between align-items-center rounded-2" style={{ textDecoration: e.complete ? "line-through" : "none" }}>
                                                        <div>
                                                            {e.text}
                                                        </div>

                                                        <div className=" d-flex gap-3">
                                                            {
                                                                e.complete ? null :
                                                                    <div>
                                                                        <i type="button" class=" btn-secondary icon-size-1" onClick={() => completeWork(index)}><FaCheck /></i>
                                                                    </div>
                                                            }

                                                            <div>
                                                                <i type="button" class=" btn-secondary icon-size-2" onClick={() => editTodo(index)}><MdEdit /></i>
                                                            </div>

                                                            <div>
                                                                <i type="button" class=" btn-secondary icon-size-3" onClick={() => deleteTodo(index)}><MdDelete /></i>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                            )
                                        })
                                    }
                                </Col>
                            </Row>

                            <Col lg="12" className="py-5" >
                                <Row className=" justify-content-center" >
                                    <Col lg="8">
                                        <div class="mb-3">
                                            <label style={{ fontSize: "12px" }}>ADD NEW </label>
                                            <input type="text" className="form-control input-filed" placeholder="Add new todo..." value={userInput} onChange={changeInUser} />
                                        </div>
                                        <div>
                                            {
                                                updatTodo !== null ? <button type="submit" class="btn btn-secondary" onClick={updateTodo}>Update TODO</button> :
                                                    <button type="submit" class="btn btn-secondary" onClick={addTodo}>Add TODO</button>

                                            }
                                            <button class="btn btn-secondary mx-2" onClick={clearTodos}>Delete All</button>
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                        </div>
                    </form>
                </Row>
            </Container>
        </Container>
    );
};