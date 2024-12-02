import React, { useEffect, useState, useContext } from 'react';

import EmployeeList from '../components/EmployeeList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';
import './Employee.css'
import '../../index.css'
import Button from '../../shared/components/FormElements/Button';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../shared/context/auth-context';

const Employee = () => {
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const auth = useContext(AuthContext);
    const navigate = useNavigate();
    const [loadedEmployee, setLoadedEmployee] = useState();

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const responseData = await sendRequest(
                    'http://localhost:5000/api/employee'
                );
                setLoadedEmployee(responseData.employee);
            } catch (err) { 
                setLoadedEmployee([]);
            }
        };
        fetchEmployee();
    }, [sendRequest]);

    const handleAddEmployee = () => {
        navigate('/add-employee'); // Redirects to the "Add Employee" page
    };

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            {isLoading && (
                <div className="center">
                    <LoadingSpinner />
                </div>
            )}
            <div className="employee-container">
                <div className="employee-header">
                    <h1 className="employee-title">Employee</h1>
                    <div className='button-container'>
                        <Button onClick={handleAddEmployee}>Add Employee</Button>
                        <Button icon="fas fa-sign-out-alt logout-icon" onClick={auth.logout}></Button>
                    </div>
                </div>
                {!isLoading && loadedEmployee && <EmployeeList items={loadedEmployee} />}
            </div>
        </React.Fragment>

    );
};

export default Employee;
