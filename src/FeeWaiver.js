import React from 'react';

class FeeWaiver extends React.Component{
    constructor (props){
        super(props)
        this.state={
          FeeTypeAmount:false,
          FeeTypePercentage:false,
          CatOrGen:false,
          ShowGen:false,
          ShowCat:false,
          FeeCat:'',
          FeeSubCat:'',
          ExcemptionOrDeduction:'',
          CategoryOrGender:'',
          WaiverCat:'',
          Gender:''
        }
    }
    setCatOrGen=(e)=>{
            if(e.target.value.toUpperCase() == 'EXCEMTION'){
                {this.setState({CatOrGen:true,ExcemptionOrDeduction:'EXCEMTION'})}
            }else if(e.target.value.toUpperCase()=='DEDUCTION'){
                {this.setState({CatOrGen:true,ExcemptionOrDeduction:'DEDUCTION'})}
            }else if(e.target.value.toUpperCase()=='NONE'){
                {this.setState({ExcemptionOrDeduction:'NONE'})}
            }else{
                {this.setState({CatOrGen:false,ShowCat:false,ShowGen:false,ExcemptionOrDeduction:''})}
            }
        }
        ShowCatOrGen=(e)=>{
            if(e.target.value.toUpperCase() == 'CATEGORY'){
                {this.setState({ShowCat:true,ShowGen:false,CategoryOrGender:'CATEGORY',Gender:''})}
            }else if(e.target.value.toUpperCase()=='GENDER'){
                {this.setState({ShowGen:true,ShowCat:false,CategoryOrGender:'GENDER',WaiverCat:''})}
            }else{
                {this.setState({ShowCat:false,ShowGen:false,CategoryOrGender:'',WaiverCat:'',Gender:''})}
            }
        }
        submitData = () => {
            const data = new FormData()
            data.append('FeeCat', this.state.FeeCat)
            data.append('FeeSubCat', this.state.FeeSubCat)
            data.append('ExcemptionOrDeduction', this.state.ExcemptionOrDeduction)
            data.append('CategoryOrGender', this.state.CategoryOrGender)
            data.append('WaiverCat', this.state.WaiverCat)
            data.append('Gender', this.state.Gender)
            const url = "http://localhost:4800/StoreWaiver"
            fetch(url, {
                    method: 'post',
                    body: data
                })
                .then(res => res.json())
                .then(data => {
                    alert("Fee Waiver Created Successfully")                
                })
                .then(err => {})
    }
    render(){
        return(
            <>
            <div className="row layoutCard">
                <div className="col-12">
                    <div className="form-row">
                        <div className="col-6 form-group">
                            <label>Fees Category *</label>
                           <select className="form-control" onChange={(e)=>{{this.setState({FeeCat:e.target.value.toUpperCase()})}}}>
                               <option value="">Please Select</option>
                               <option value="Admission Fee">Admission Fee</option>
                               <option value="Monthly">Monthly</option>
                           </select>
                        </div>
                        <div className="col-6 form-group">
                            <label>Fees Sub Category *</label>
                           <select className="form-control" onChange={(e)=>{{this.setState({FeeSubCat:e.target.value.toUpperCase()})}}}>
                               <option value="">Please Select</option>
                               <option value="Admission Fee">Admission Fee</option>
                               <option value="Monthly">Monthly</option>
                           </select>
                        </div>
                        <div className="col-6 form-group">
                            <label>Excemption or Deduction *</label>
                           <select className="form-control" onChange={(e) => {this.setCatOrGen(e)}}>
                               <option>Please Select</option>
                               <option value="NONE">NONE</option>
                               <option value="EXCEMTION">EXCEMTION</option>
                               <option value="DEDUCTION">DEDUCTION</option>
                           </select>
                        </div>
                        {this.state.CatOrGen==true ? 
                            <div className="col-6 form-group">
                                <label>Category or Gender</label>
                            <select className="form-control" onChange={(e) => {this.ShowCatOrGen(e)}} >
                                <option>Please Select</option>
                                <option value="CATEGORY">CATEGORY</option>
                                <option value="GENDER">GENDER</option>
                            </select>
                            </div>
                        :
                        null
                        }
                           {this.state.ShowCat==true ? 
                            <div className="col-6 form-group">
                                <label>Waiver Category</label>
                            <select className="form-control" onChange={(e)=>{{this.setState({WaiverCat:e.target.value.toUpperCase()})}}}>
                                <option>Please Select</option>
                                <option value="None">None</option>
                                <option value="Sibling Waiver">Sibling Waiver</option>
                                <option value="General">General</option>
                            </select>
                            </div>
                        :
                        null
                        }
                           {this.state.ShowGen==true ? 
                            <div className="col-6 form-group">
                                <label>Gender</label>
                            <select className="form-control" onChange={(e)=>{{this.setState({Gender:e.target.value.toUpperCase()})}}}>
                                <option>Please Select</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                            </div>
                        :
                        null
                        }
                        <div className="col-6 form-group">
                         <label> </label>
                         <button className="btn btn-info mt-5" onClick={()=>{this.submitData()}}>Save</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className= "row layoutCard">
                <div className="col-12">
                    {/* <table class="table table-striped">
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
                    </table> */}
                </div>
            </div>
            </>
        )
    }
    
}
export default FeeWaiver;