import { useEffect, useState } from "react";
import { listEmployees } from "../services/EmployeeService";
import {useNavigate} from 'react-router-dom'

const ListEmployeeComponent = () => {
  const [employees, setEmployees] = useState([]);

  const navigator=useNavigate();

  // ✅ useEffect should run only once (on component mount)
  useEffect(() => {
    listEmployees()
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.error("Error fetching employees:", error);
      });
  }, []); // <-- Added [] so it doesn’t re-run infinitely

  function addNewEmployee(){
    navigator('/add-employee')
  }

  function updateEmployee(id){
    navigator(`/edit-employee/${id}`)
  }

  return (
    <div className="container mt-5 d-flex flex-column align-items-center">
      <h2 className="mb-4 text-center">List of Employees</h2>
      <button className="btn btn-primary mb-2" onClick={addNewEmployee}>Add Employee</button>

      <div className="table-responsive w-75">
        <table className="table table-striped table-bordered text-center">
          <thead className="table-dark">
            <tr>
              <th>Employee Id</th>
              <th>Employee First Name</th>
              <th>Employee Last Name</th>
              <th>Employee Email Id</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.length > 0 ? (
              employees.map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.id}</td>
                  <td>{employee.firstName}</td>
                  <td>{employee.lastName}</td>
                  <td>{employee.email}</td>
                  <td><button className='btn btn-info' onClick={() => updateEmployee(employee.id)}> Update</button></td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-muted">
                  No Employees Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListEmployeeComponent;
