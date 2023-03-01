import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

function Exercise(props) {
    return (
        <tr>
            <td>{props.exercise.username}</td>
            <td>{props.exercise.description}</td>
            <td>{props.exercise.duration}</td>
            <td>{props.exercise.date.substring(0, 10)}</td>
            <td>
                <Link to={'/edit/' + props.exercise._id}>edit</Link> | <button href='#' onClick={() => {props.deleteExercise(props.exercise._id)}}>delete</button>
            </td>
        </tr>
    )
}


export default function ExercisesList() {

    const [exercises, setExercises] = React.useState([]);

    React.useEffect(() => {
        axios.get('https://exercise-tracker-mern-app.onrender.com/exercises/')
            .then(res => { setExercises(res.data) })
            .catch(err => console.log(err))
    }, []);

    function deleteExercise(id) {
        axios.delete('https://exercise-tracker-mern-app.onrender.com/exercises/' + id)
            .then(res => console.log(res.data))
            .catch(err => console.log(err));

        setExercises(exercises.filter(el => el._id !== id))
    }

    function exercisesList() {
        return exercises.map(exerci => {
            return <Exercise exercise={exerci} deleteExercise={deleteExercise} key={exerci._id} />
        })
    }

    return (
        <div>
            <h1>Logged Exercises</h1>
            <table className='table'>
                <thead className='thead-light'>
                    <tr>
                        <th>Username</th>
                        <th>Description</th>
                        <th>Duration</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {exercisesList()}
                </tbody>
            </table>
        </div>
    )
}
