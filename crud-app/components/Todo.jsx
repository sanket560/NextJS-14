import React from "react";

const Todo = ({id,title,description,complete,deleteFunction,updateFunction}) => {
  return (
    <>
      <tr className='bg-white border-b'>
        <th
          scope='row'
          className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-center'
        >
          {id}
        </th>
        <td className={`px-6 py-4 text-center ${complete ? 'line-through' : ''}`}>{title}</td>
        <td  className={`px-6 py-4 text-center ${complete ? 'line-through' : ''}`}>
          {description}
        </td>
        <td  className={`px-6 py-4 text-center ${complete ? 'line-through' : ''}`}>{complete ? 'Complete' : 'Un-Complete'}</td>
        <td className='px-6 py-4 text-center'>
          <button onClick={()=>deleteFunction(id)} className='bg-red-500 mx-2 px-12 py-3 hover:bg-red-700 duration-300 transition-all text-white'>
            Delete
          </button>
          {!complete && <button onClick={()=>updateFunction(id)} className='bg-green-500 px-12 py-3 hover:bg-green-700 duration-300 transition-all text-white'>
            done
          </button>}
        </td>
      </tr>
    </>
  );
};

export default Todo;
