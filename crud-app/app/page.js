"use client";
import Todo from "@/components/Todo";
import axios from "axios";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function Home() {
  const [todo, setTodo] = useState({
    title: "",
    description: "",
  });
  const [allTodos, setAllTodos] = useState([]);

  const setTitle = (e) =>
    setTodo({
      ...todo,
      ["title"]: e.target.value,
    });

  const setDescription = (e) =>
    setTodo({
      ...todo,
      ["description"]: e.target.value,
    });

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/api`, todo);
      toast.success(response.data.msg);
      setTodo({
        title: "",
        description: "",
      });
      await fetchTodos();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const fetchTodos = async () => {
    try {
      const response = await axios.get(`/api`);
      setAllTodos(response.data.todos);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const DeleteTodo = async (id) => {
    try {
      const response = await axios.delete(`/api`, {
        params: {
          id: id,
        },
      });
      toast.success(response.data.msg);
      await fetchTodos();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const UpdateTodo = async (id) => {
    try {
      const response = await axios.put(`/api`,{}, {
        params: {
          id: id,
        },
      });
      toast.success(response.data.msg);
      await fetchTodos();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <>
      <section className='w-full md:w-[70%] mx-auto pt-10 px-2'>
        <form onSubmit={onSubmitHandler}>
          <div className='mb-3'>
            <input
              type='text'
              value={todo.title}
              onChange={setTitle}
              className='w-full px-3 py-2 h-10 outline-none border-2 border-purple-400'
              placeholder='enter title'
            />
          </div>
          <div className='mb-3'>
            <textarea
              className='w-full px-3 py-2 outline-none border-2 border-purple-400'
              placeholder='enter description'
              value={todo.description}
              onChange={setDescription}
              rows={8}
            />
          </div>
          <div className='mb-3'>
            <button
              type='submit'
              className='bg-purple-500 px-12 py-3 hover:bg-purple-700 duration-300 transition-all text-white'
            >
              add todo
            </button>
          </div>
        </form>
        <div className='relative overflow-x-auto'>
          <table className='w-full text-sm text-left rtl:text-right text-gray-500 '>
            <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
              <tr>
                <th scope='col' className='px-6 py-3 text-center'>
                  id
                </th>
                <th scope='col' className='px-6 py-3 text-center'>
                  title
                </th>
                <th scope='col' className='px-6 py-3 text-center'>
                  description
                </th>
                <th scope='col' className='px-6 py-3 text-center'>
                  status
                </th>
                <th scope='col' className='px-6 py-3 text-center'>
                  action
                </th>
              </tr>
            </thead>
            <tbody>
              {allTodos.length > 0 &&
                allTodos.map((todo, index) => {
                  return (
                    <Todo
                      key={index}
                      id={todo._id}
                      title={todo.title}
                      description={todo.description}
                      complete={todo.isComplete}
                      deleteFunction={DeleteTodo}
                      updateFunction={UpdateTodo}
                    />
                  );
                })}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
