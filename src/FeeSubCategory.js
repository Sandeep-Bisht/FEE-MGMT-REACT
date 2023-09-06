import React from 'react';
import DataTable from '@bit/adeoy.utils.data-table';
import './js/Fee.js';

class FeeCategory extends React.Component{
    constructor (props){
        super(props)
        this.state={
            id:'',
            fee_category:'',
            fee_sub_category:'',
            amount:'',
            month:'',
            status:'ACTIVE',
            AllCategory:[],
            AllSubCategory:[],
            updateBtn:false
        }
    }
    componentDidMount(){
        this.getFeeCategory()
        this.getFeeSubCategory()
    }
    getFeeCategory = () => {
        fetch("http://144.91.110.221:4800/getCategory")
            .then(res => res.json())
            .then(data => {
                console.log(data)
                this.setState({AllCategory: data})
            })
            .then(err => console.log(err))
    }
    editFeeSubCategotyObject = (obj) => {
        this.setState({updateBtn:true})
        let _id   =   obj._id
        let fee_category = obj.fee_category
        let fee_sub_category = obj.fee_sub_category
        let amount = obj.amount
        let month = obj.month
        let status = obj.status
        this.setState({_id,fee_category,fee_sub_category,amount,month,status})
    }
    UpdateFeeSubCategoryData =()=>{
        // if (this.checkValidation()) {
        const data = new FormData()
        data.append('_id',this.state._id)
        data.append('fee_category', this.state.fee_category)
        data.append('fee_sub_category', this.state.fee_sub_category)
        data.append('amount', this.state.amount)
        data.append('month', this.state.month)
        data.append('status', this.state.status)
        const url="http://144.91.110.221:4800/updateFeeSubCategory"
                fetch(url,
                    {
                    method:'put',
                    body:data
                })
                .then(res => res.json())              
                .then((res)=>{  
            alert('Fee Sub Category updated successfully !');
            this.getFeeSubCategory()
                })            
                .then(err=>console.log(err))
            //   }
      }
      deleteFeeSubCategory = (id) => {
        const apiUrl = 'http://144.91.110.221:4800/deleteFeeSubCategory';
        fetch(apiUrl, {
          headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          method:'delete',  
          body:JSON.stringify({_id:id})
        })
        .then((response) => response.json())
        .then((res) => {
        alert("Fee Sub Category Deleted Successfully")
        this.getFeeSubCategory()
          
        })
        
      }
      checkValidation = () => {
        if (this.state.fee_category === "") {
            this.setState({fee_categoryErrorMessage: "Please Select Category"})
            return false
        }else if(this.state.fee_sub_category === ""){
            this.setState({fee_sub_categoryErrorMessage: "Please Enter Sub Category Name"})
            return false
        }else if(this.state.amount === ""){
            this.setState({amountErrorMessage: "Please Enter Amount"})
            return false
        }
        // else if(this.state.month === ""){
        //     this.setState({monthErrorMessage: "Please Select Month"})
        //     return false
        // }
        else {
            return true
        }
      }
    submitSubCategoryData = () => {
        if(this.checkValidation()) {
        const data = new FormData()
        data.append('fee_category', this.state.fee_category)
        data.append('fee_sub_category', this.state.fee_sub_category)
        data.append('amount', this.state.amount)
        data.append('month', this.state.month)
        data.append('status', this.state.status)
        const url = "http://144.91.110.221:4800/StoreFeeSubCatogory"
        fetch(url, {
                method: 'post',
                body: data
            })
            .then(res => res.json())
            .then(data => {
                alert("Fee Sub Category Created Successfully")  
                this.getFeeSubCategory()                
            })
            .then(err => {})
        }
    }
    getFeeSubCategory = () => {
        fetch("http://144.91.110.221:4800/getSubCategory")
            .then(res => res.json())
            .then(data => {
                console.log(data)
                this.setState({AllSubCategory: data})
            })
            .then(err => console.log(err))
    }
    // setFeeType=(e)=>{
    //     if(e.target.value.toUpperCase() == 'Annual'){
    //         {this.setState({AnnualFees:[1]})}
    //     }else if(e.target.value.toUpperCase()=='Bi-Annual'){
    //         {this.setState({AnnualFees:[1,2]})}
    //     }else if(e.target.value.toUpperCase()=='Tri-Annual'){
    //         {this.setState({AnnualFees:[1,2,3]})}
    //     }else if(e.target.value.toUpperCase()=='Quarterly'){
    //         {this.setState({AnnualFees:[1,2,3,4]})}
    //     }else if(e.target.value.toUpperCase()=='Monthly'){
    //         {this.setState({AnnualFees:[1,2,3,4,5,6,7,8,9,10,11,12]})}
    //     }else if(e.target.value.toUpperCase()=='One-Time'){
    //         {this.setState({AnnualFees:[1]})}
    //     }
    // }
    render(){
        const data =[];
        {this.state.AllSubCategory.map((item,index)=>{
        data.push( {"sr_no":index+1,"category":item.fee_category,"fee_sub_category":item.fee_sub_category,"amount":item.amount,"month":item.month,"status":item.status,"action":<td><button className="btn btn-secondary mr-2" onClick={() => this.editFeeSubCategotyObject(item)}><i class="fas fa-pencil-alt"></i></button><button onClick = { () => this.deleteFeeSubCategory(item._id)} className="btn btn-danger"><i className="fa fa-trash" aria-hidden="true"></i></button></td>})
        })}
          const columns = [
            { title: "SR NO", data: "sr_no" },
            { title: "Category", data: "category" },
            { title: "Fee sub category", data: "fee_sub_category" },
            { title: 'Amount',data: "amount"},
            { title: 'Month',data: "month"},
            { title: 'Status',data: "status"},
            { title: "Action", data: "action" },
          ];
          const click = (row) => {
            console.log(row);
          };
        return(
            <>
            <div className="row layoutCard">
                <div className="col-12">
                    <div className="form-row">
                        <div className="col-4 form-group">
                            <label>Fee Category *</label>
                            <select className="form-control" value={this.state.fee_category} onChange={(e)=>{{this.setState({fee_category:e.target.value.toUpperCase(),fee_categoryErrorMessage:undefined})}}}>
                                <option value="">Please Select</option>
                            {this.state.AllCategory.map((item,index)=>{
                                return(
                                    <option value={item.category}>{item.category}</option>
                                )
                            })}
                            </select>
                            <span className="errorMessage" style={{fontSize:'14px',fontWeight:600}}>{this.state.fee_categoryErrorMessage}</span>
                        </div>
                        <div className="col-4 form-group">
                            <label>Fee Sub Category*</label>
                            <input type="text" value={this.state.fee_sub_category} className="form-control" onChange={(e)=>{{this.setState({fee_sub_category:e.target.value.toUpperCase(),fee_sub_categoryErrorMessage:undefined})}}}/>
                            <span className="errorMessage" style={{fontSize:'14px',fontWeight:600}}>{this.state.fee_sub_categoryErrorMessage}</span>
                        </div>
                        <div className="col-4 form-group">
                            <label>Amount  (default Amount,it can be editable)</label>
                            <input type="text" value={this.state.amount} className="form-control" onChange={(e)=>{{this.setState({amount:e.target.value.toUpperCase(),amountErrorMessage:undefined})}}} />
                            <span className="errorMessage" style={{fontSize:'14px',fontWeight:600}}>{this.state.amountErrorMessage}</span>
                        </div>
                        <div className="col-4 form-group sjs-form-group">
                           <label>Month </label>
                           <select className="form-control" value={this.state.month} onChange={(e)=>{{this.setState({month:e.target.value.toUpperCase(),monthErrorMessage:undefined})}}}>
                           <option value="">Select...</option>
                                <option value="1">January</option>
                                <option value="2">February</option>
                                <option value="3">March</option>
                                <option value="4">April</option>
                                <option value="5">May</option>
                                <option value="6">June</option>
                                <option value="7">July</option>
                                <option value="8">August</option>
                                <option value="9">September</option>
                                <option value="10">October</option>
                                <option value="11">November</option>
                                <option value="12">December</option>
                           </select>
                           <span className="errorMessage" style={{fontSize:'14px',fontWeight:600}}>{this.state.monthErrorMessage}</span>
                        </div>
                        {this.state.updateBtn ?
                        <div className="col-4 form-group">
                            <label>Status</label>
                            <select className="form-control" value={this.state.status} onChange={(e)=>{{this.setState({status:e.target.value.toUpperCase()})}}}>
                           <option value="">Select...</option>
                                <option value="ACTIVE">ACTIVE</option>
                                <option value="DEACTIVE">DEACTIVE</option>
                           </select>
                        </div>
                        :null
                        }
                        {/* <div className="col-12 form-group "> */}
                            {/* Annual */}
                           {/* {this.state.AnnualFees.map((item,index)=>{
                               return(
                                <div className=" form-row AnnualFees" >
                                    <div className="col-4 form-group ">
                                        <label>Start Date </label>
                                        <input type="Date" className="form-control" />
                                    </div>
                                    <div className="col-4 form-group">
                                        <label>Due Date </label>
                                        <input type="Date" className="form-control" />
                                    </div>
                                    <div className="col-4 form-group">
                                        <label>End Date </label>
                                        <input type="Date" className="form-control" />
                                    </div>
                                </div> 
                                );
                            })} */}
                        {/* end Annual */}
                        {/* </div>    */}
                        
                        <div className="col-4 form-group">
                         <label> </label>
                         <button className="btn btn-info mt-5" onClick={()=>{this.submitSubCategoryData()}}>Save</button>
                         {this.state.updateBtn ?
                        <button className="btn btn-secondary ml-3 mt-5" type="submit" onClick={(e) => this.UpdateFeeSubCategoryData(e)}>Update</button>
                        :null
                        }
                        </div>
                    </div>
                </div>
            </div>
            <div className= "row layoutCard">
                <div className="col-12">
                <DataTable
                data={data}
                columns={columns}
                striped={true}
                hover={true}
                responsive={true}
                onClickRow={click}
                />
                </div>
            </div>
            </>
        )
    }
    
}
export default FeeCategory;