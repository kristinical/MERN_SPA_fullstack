import React from 'react';
import Exercise from './Row';

function ExerciseTable({ exercises, onDelete, onEdit }) {
    return (
        <table id="exercises">
            <thead>
            <tr>
                <th>Name</th>
                <th>Reps</th>
                <th>Weight</th>
                <th>Unit</th>
                <th>Date</th>
                <th>Delete</th>
                <th>Edit</th>
            </tr>
        </thead>
            <tbody>
                {exercises.map((exercise, i) => 
                    <Exercise 
                        exercise={exercise} 
                        key={i}
                        onDelete={onDelete}
                        onEdit={onEdit} 
                    />)}
            </tbody>
        </table>
    );
}

export default ExerciseTable;
