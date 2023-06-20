import React from 'react';
import { RiDeleteBin6Line, RiEditLine } from 'react-icons/ri';

function Exercise({ exercise, onEdit, onDelete }) {
    return (
        <tr>
            <td>{exercise.name}</td>
            <td>{exercise.reps}</td>
            <td>{exercise.weight}</td>
            <td>{exercise.unit}</td>
            <td>{exercise.date.toLocaleString('en-US').substring(0, 10)}</td>
            <td><RiDeleteBin6Line onClick={() => onDelete(exercise._id)} /></td>
            <td><RiEditLine onClick={() => onEdit(exercise)} /></td>
        </tr>
    );
}

export default Exercise;