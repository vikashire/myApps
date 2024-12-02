import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../shared/components/FormElements/Button';
import Input from '../../shared/components/FormElements/Input';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import {VALIDATOR_REQUIRE } from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
import './AddEmployee.css';
import './../../index.css'

const AddEmployee = () => {
    const auth = useContext(AuthContext);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const navigate = useNavigate();
    const employeeSubmitHandler = async (event) => {
        event.preventDefault();
        try {
            const formData = new FormData();
            formData.append('name', formState.inputs.name.value);
            formData.append('id', formState.inputs.id.value);
            formData.append('department', formState.inputs.department.value);
            await sendRequest('http://localhost:5000/api/employee/add-employee', 'POST', formData, {
                Authorization: 'Bearer ' + auth.token
            });
            navigate('/');
        } catch (err) { }
    };

    const cancelHandler = () => {
        navigate('/');
    }

    const [formState, inputHandler, setFormData] = useForm(
        {
            name: {
                value: '',
                isValid: false
            },
            id: {
                value: '',
                isValid: false
            },
            department: {
                value: '',
                isValid: false
            }
        },
        false
    );

    return (
        <React.Fragment>
            <div className="add-employee-container">
                <div className="add-employee-header">
                    <h1 className="add-employee-title">Add Employee</h1>
                </div>
                <ErrorModal error={error} onClear={clearError} />
                <form onSubmit={employeeSubmitHandler}>
                    {isLoading && <LoadingSpinner asOverlay />}
                    <Input
                        element="input"
                        id="name"
                        type="text"
                        label="Name"
                        validators={[VALIDATOR_REQUIRE(3)]}
                        errorText="Please enter valid Name"
                        onInput={inputHandler}
                    />
                    <Input
                        element="input"
                        id="id"
                        type="text"
                        label="Id"
                        validators={[VALIDATOR_REQUIRE(1)]}
                        errorText="Please enter valid Id"
                        onInput={inputHandler}
                    />
                    <Input
                        element="input"
                        id="department"
                        type="text"
                        label="Department"
                        validators={[VALIDATOR_REQUIRE(3)]}
                        errorText="Please enter valid Department"
                        onInput={inputHandler}
                    />
                    <div className='button-container'>
                        <Button type="submit" disabled={!formState.isValid}>Add Employee</Button>
                        <button className="btn" onClick={cancelHandler} inverse>Cancel</button>
                    </div>
                </form>
            </div>
        </React.Fragment>
    );
};

export default AddEmployee;
