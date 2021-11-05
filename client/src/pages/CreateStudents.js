import  React ,{useState} from 'react'
import { InputText } from 'primereact/inputtext';
import styles from "./styles.module.css";
import { Button } from 'primereact/button';


export const CreateStudents = () =>  {
    const [student, setStudent] = useState(null)

    const ChangeHandler = event => {
        setStudent({...student,  [event.target.name]: event.target.value})
    }

    const CreateNewStudent = () => {
        console.log(student, 'sgfsgsg')
        fetch('/api/auth/new',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(student),})
            .catch((error) => {
            console.error('Error:', error);
        });
        setStudent()
    }
    return(

        <span className="p-float-label">
            <div className={`${styles.createStudent} col-12 offset-2 grid align-items-center justify-content-center`}>
                < InputText placeholder="ID" value={student ? student.id : ''} id="id" name="id" onChange={ChangeHandler} />
            </div>
            <div className={` col-12 offset-2 grid align-items-center justify-content-center`}>
                <InputText id="firstName" value={student ?  student.firstName : ''} placeholder="First Name"  name="firstName" onChange={ChangeHandler} />
            </div>
            <div className={` col-12 offset-2 grid align-items-center justify-content-center`}>
                <InputText id="lastName" value={ student ? student.lastName : ''}  placeholder="Last Name"  name="lastName" onChange={ChangeHandler} />
            </div>
            <div className={` col-12 offset-2 grid align-items-center justify-content-center`}>
                <InputText id="age"  value={student ?  student.age : ''} placeholder="Age"  name="age" onChange={ChangeHandler} />
            </div>
            <div className={` col-12 offset-2 grid align-items-center justify-content-center`}>
                <InputText id="nationality" value={ student ? student.nationality : ''}  placeholder="Nationality"  name="nationality" onChange={ChangeHandler} />
            </div>
            <Button className={styles.saveButton} label="Save" onClick={CreateNewStudent} />
        </span>


    )
}