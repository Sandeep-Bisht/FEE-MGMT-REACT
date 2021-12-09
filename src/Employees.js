import React from 'react';


class Employees extends React.Component{
    render(){
        return(
            <div className= "row">
                <div className="col-12">
                    <h2 className="pt-5 pb-5">Employees List</h2>
                </div>
                <div className="col-12">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                            <th scope="col">S.R. NO.</th>
                            <th scope="col">Employee Code</th>
                            <th scope="col">Employee Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Department</th>
                            <th scope="col">Qualification</th>
                            <th scope="col">Designation</th>
                            <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <th scope="row">1</th>
                            <td>emp1</td>
                            <td>vineet sharma</td>
                            <td>vineet.sharma@giksindia.com</td>
                            <td>Teaching</td>
                            <td>MCA</td>
                            <td>Primary Teacher</td>
                            <td>View</td>
                            </tr>
                            <tr>
                            <th scope="row">2</th>
                            <td>emp2</td>
                            <td>vineet sharma</td>
                            <td>vineet.sharma@giksindia.com</td>
                            <td>Teaching</td>
                            <td>MCA</td>
                            <td>Primary Teacher</td>
                            <td>View</td>
                            </tr>
                            <tr>
                            <th scope="row">3</th>
                            <td>emp3</td>
                            <td>vineet sharma</td>
                            <td>vineet.sharma@giksindia.com</td>
                            <td>Teaching</td>
                            <td>MCA</td>
                            <td>Primary Teacher</td>
                            <td>View</td>
                            </tr>
                            <tr>
                            <th scope="row">4</th>
                            <td>emp4</td>
                            <td>vineet sharma</td>
                            <td>vineet.sharma@giksindia.com</td>
                            <td>Teaching</td>
                            <td>MCA</td>
                            <td>Primary Teacher</td>
                            <td>View</td>
                            </tr>
                            <tr>
                            <th scope="row">5</th>
                            <td>emp5</td>
                            <td>vineet sharma</td>
                            <td>vineet.sharma@giksindia.com</td>
                            <td>Teaching</td>
                            <td>MCA</td>
                            <td>Primary Teacher</td>
                            <td>View</td>
                            </tr>
                            <tr>
                            <th scope="row">6</th>
                            <td>emp6</td>
                            <td>vineet sharma</td>
                            <td>vineet.sharma@giksindia.com</td>
                            <td>Teaching</td>
                            <td>MCA</td>
                            <td>Primary Teacher</td>
                            <td>View</td>
                            </tr>
                            <tr>
                            <th scope="row">7</th>
                            <td>emp7</td>
                            <td>vineet sharma</td>
                            <td>vineet.sharma@giksindia.com</td>
                            <td>Teaching</td>
                            <td>MCA</td>
                            <td>Primary Teacher</td>
                            <td>View</td>
                            </tr>
                            <tr>
                            <th scope="row">8</th>
                            <td>emp8</td>
                            <td>vineet sharma</td>
                            <td>vineet.sharma@giksindia.com</td>
                            <td>Teaching</td>
                            <td>MCA</td>
                            <td>Primary Teacher</td>
                            <td>View</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }

}
export default Employees;