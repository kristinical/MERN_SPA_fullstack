import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

export const CreatePage = () => {

    const [name, setName] = useState('');
    const [reps, setReps] = useState('');
    const [weight, setWeight] = useState('');
    const [unit, setUnit] = useState('');
    const [date, setDate] = useState('');
    
    const history = useHistory();

    const addExercise = async () => {
        const newExercise = { name, reps, weight, unit, date };
        const response = await fetch('/exercises', {
            method: 'post',
            body: JSON.stringify(newExercise),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if(response.status === 201){
            alert("Successfully added the exercise!");
        } else {
            alert(`Failed to add exercise, status code = ${response.status}`);
        }
        history.push("/");
    };


    return (
        <>
        <h2>Add an Exercise</h2>
        <p>Enter the name, number of reps, weight, unit and date of the exercise</p>
        <form onSubmit={(e) => { e.preventDefault();}}>
            <table>
                <thead>
                    <tr>
                        <th>Exercise name</th>
                        <th>Reps</th>
                        <th>Weight</th>
                        <th>Unit</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <input
                                type="text"
                                value={name}
                                minLength="1"
                                onChange={e => setName(e.target.value)} 
                                id="name"
                                required />
                        </td>
                        <td>
                            <input
                                type="number"
                                min={1}
                                value={reps}
                                onChange={e => setReps(e.target.value)} 
                                id="reps"
                                required />
                        </td>
                        <td>
                            <input
                                type="number"
                                min={1}
                                value={weight}
                                onChange={e => setWeight(e.target.value)} 
                                id="weight"
                                required />
                        </td>
                        <td>
                            <select value={unit} id="unit" required onChange={e => setUnit(e.target.value)}>
                                <option value="invalid" hidden defaultValue>-- Please select --</option>
                                <option value="lbs">lbs</option>
                                <option value="kgs">kgs</option>
                                <option value="miles">miles</option>
                                <option value="km">km</option>
                            </select>
                        </td>
                        <td>
                            <input
                                type="date"
                                value={date}
                                onChange={e => setDate(e.target.value)} 
                                id="date"
                                required />
                        </td>
                    </tr>
                </tbody>
            </table>
            <label for="submit">
                <button
                    type="submit"
                    onClick={addExercise}
                    id="submit"
                >Add Exercise</button></label>
            </form>
        </>
    );
}

export default CreatePage;