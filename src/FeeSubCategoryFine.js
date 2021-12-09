import React from 'react';

class FeeSubCategoryFine extends React.Component{
    constructor (props){
        super(props)
        this.state={
            _id:'',
          category:'',
          fine_date:'',
          amount:'',
          FeeTypeAmount:false,
          FeeTypePercentage:false
        }
    }
    componentDidMount(){
        // this.getFeeCategory()
        this.getFine()
    }
    // getFeeCategory = () => {
    //     fetch("http://144.91.110.221:4800/getCategory")
    //         .then(res => res.json())
    //         .then(data => {
    //             console.log(data)
    //             this.setState({AllCategory: data})
    //         })
    //         .then(err => console.log(err))
    // }
    // editFeeSubCategotyObject = (obj) => {
    //     this.setState({updateBtn:true})
    //     let _id   =   obj._id
    //     let category = obj.category
    //     let fine_date = obj.fine_date
    //     let amount = obj.amount
    //     let month = obj.month
    //     let status = obj.status
    //     this.setState({_id,category,fine_date,amount,month,status})
    // }
    UpdateFineData =async()=>{
        await console.log("wait")
        if (this.checkValidation()) {
        const data = new FormData()
        data.append('_id',this.state._id)
        data.append('category', this.state.category)
        data.append('fine_date', this.state.fine_date)
        data.append('amount', this.state.amount)
        const url="http://144.91.110.221:4800/updateFine"
                fetch(url,
                    {
                    method:'put',
                    body:data
                })
                .then(res => res.json())              
                .then((res)=>{  
            alert('Fine updated successfully !');
            this.getFine()
                })            
                .then(err=>console.log(err))
              }
      }
      checkValidation = () => {
        if (this.state.category === "") {
            this.setState({categoryErrorMessage: "Please Select Category"})
            return false
        }else if(this.state.fine_date === ""){
            this.setState({fine_dateErrorMessage: "Please Enter Sub Category Name"})
            return false
        }else if(this.state.amount === ""){
            this.setState({amountErrorMessage: "Please Enter Amount"})
            return false
        }
        else {
            return true
        }
      }
    submitFineData = () => {
        if(this.checkValidation()) {
        const data = new FormData()
        data.append('category', this.state.category)
        data.append('fine_date', this.state.fine_date)
        data.append('amount', this.state.amount)
    
        const url = "http://144.91.110.221:4800/StoreFine"
        fetch(url, {
                method: 'post',
                body: data
            })
            .then(res => res.json())
            .then(data => {
                alert("Fine Created Successfully")  
                this.getFine()                
            })
            .then(err => {})
        }
    }
    getFine = () => {
        fetch("http://144.91.110.221:4800/getFine")
            .then(res => res.json())
            .then(data => {
                console.log(data)
                this.setState({_id:data[0]._id,category:data[0].category,fine_date:data[0].fine_date,amount:data[0].amount})
            })
            .then(err => console.log(err))
    }
        // setFeeType=(e)=>{
        //     if(e.target.value == 'Amount'){
        //         {this.setState({FeeTypeAmount:true,FeeTypePercentage:false})}
        //     }else if(e.target.value=='Percentage'){
        //         {this.setState({FeeTypePercentage:true,FeeTypeAmount:false})}
        //     }
        // }
    render(){
        return(
            <>
            <div className="row layoutCard">
                <div className="col-12">
                    <div className="form-row">
                        <div className="col-3 form-group">
                            <label>Fees Category *</label>
                           <select className="form-control" value={this.state.category} onChange={(e)=>{{this.setState({category:e.target.value.toUpperCase(),categoryErrorMessage:undefined})}}}>
                               <option>Please Select</option>
                               {/* <option>Admission Fee</option> */}
                               <option value="MONTHLY">MONTHLY</option>
                           </select>
                           <span className="errorMessage" style={{fontSize:'14px',fontWeight:600}}>{this.state.categoryErrorMessage}</span>
                        </div>
                        <div className="col-3 form-group">
                            <label>Date *</label>
                            <input type="text" className="form-control" defaultValue={this.state.fine_date} onChange={(e)=>{{this.setState({fine_date:e.target.value.toUpperCase(),fine_dateErrorMessage:undefined})}}}/>
                            <span className="errorMessage" style={{fontSize:'14px',fontWeight:600}}>{this.state.fine_dateErrorMessage}</span>
                        </div>
                        <div className="col-3 form-group">
                            <label>Amount</label>
                            <input type="text" className="form-control" defaultValue={this.state.amount} onChange={(e)=>{{this.setState({amount:e.target.value.toUpperCase(),amountErrorMessage:undefined})}}} />
                            <span className="errorMessage" style={{fontSize:'14px',fontWeight:600}}>{this.state.amountErrorMessage}</span>
                        </div>
                        {/* <div className="col-6 form-group">
                            <label>Fees Sub Category *</label>
                           <select className="form-control">
                               <option>Please Select</option>
                               <option>Admission Fee</option>
                               <option>Monthly</option>
                           </select>
                        </div> */}
                        {/* <div className="col-6 form-group">
                            <label>Type *</label>
                           <select className="form-control" onChange={(e) => {this.setFeeType(e)}} >
                               <option>Please Select</option>
                               <option>Amount</option>
                               <option>Percentage</option>
                           </select>
                        </div> */}
                        {/* {this.state.FeeTypeAmount==true ? 
                        <div className="col-6 form-group">
                            <label>Fine Amount *</label>
                            <input type="text" className="form-control" />
                        </div>
                        : 
                        null
                        } */}
                         {/* {this.state.FeeTypePercentage==true ? 
                        <div className="col-6 form-group">
                            <label>Fine Percentage *</label>
                            <input type="text" className="form-control" />
                        </div>
                        : 
                        null
                        } */}
                        {/* <div className="col-6 form-group">
                            <label>Fine Type *</label>
                           <select className="form-control">
                               <option>Please Select</option>
                               <option>Fixed</option>
                               <option>Incremental</option>
                           </select>
                        </div> */}
                        <div className="col-6 form-group">
                         <label> </label>
                         {/* <button className="btn btn-info mt-5" onClick={()=>{this.submitFineData()}}>Save</button> */}
                         <button className="btn btn-secondary mt-5" onClick={()=>{this.UpdateFineData()}}>Update</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className= "row layoutCard">
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
            </div> */}
            </>
        )
    }
    
}
export default FeeSubCategoryFine;