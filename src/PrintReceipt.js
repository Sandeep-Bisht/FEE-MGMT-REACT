import React from 'react';
import Moment from 'moment';
var SubtractTuitionFee = 0
var RemainTuitionFee = 0
class PrintReceipt extends React.Component{
    constructor(props){
        super(props)
        this.state={
            AllOldFees:[],
            Allfees:[],
            admission_no:"",
            name:'',
            father_name:'',
            mother_name:'',
            account_no:'',
            parent_address:'',
        }
    }
    componentDidMount(){
    }
    searchByAdmission_no= async (e)=>{
        await console.log("wait")
        const admission_no = this.state.admission_no.toUpperCase()
        if(admission_no =='0'){
             return false;
        }
        fetch("http://144:91:110:210:4800/singlestudentdata"
        ,{
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                admission_no: admission_no
            })
        })
        .then((data) => data.json())
        .then(async (data) => {  
            console.log( 'single parent'+data )  
            if(data[0] !=undefined){
                this.FeesClasswise(data)
                this.setState({name:data[0].name,father_name:data[0].father_name,mother_name:data[0].mother_name,parent_address:data[0].parent_address})
            }
            else{
                this.setState({AllOldFees:[],name:'',father_name:'',mother_name:'',parent_address:''})
            }
            // this.setState({account_no:data[0].account_no,father_name:data[0].father_name,mother_name:data[0].mother_name,father_occu:data[0].father_occu,father_designation:data[0].father_designation,father_annual_income:data[0].father_annual_income,mother_occu:data[0].mother_occu,mother_designation:data[0].mother_designation,mother_annual_income:data[0].mother_annual_income,parent_address:data[0].parent_address,parent_mobile:data[0].parent_mobile,gaurdian_name:data[0].gaurdian_name,gaurdian_address:data[0].gaurdian_address,gaurdian_mobile:data[0].gaurdian_mobile,gaurdian_annual_income:data[0].gaurdian_annual_income,gaurdian_occu:data[0].gaurdian_occu,gaurdian_designation:data[0].gaurdian_designation})
        })
    }
    FeesClasswise=(studentData)=>{    
         //   const currentMonth ='4'
         fetch("http://144:91:110:210:4800/FeesClasswise"
         ,{
             method: 'POST',
             headers: {
                 Accept: 'application/json',
                 'Content-Type': 'application/json'
             },
             body: JSON.stringify({
                 class_name: studentData[0].class_name,
                 section: studentData[0].section
             })
         })
         .then((data) => data.json())
         .then(async (data) => {  
            await console.log( 'Class Wise'+data )  
             if(data[0] !=undefined){
                 this.setState({Allfees:JSON.parse(data[0].fees)})
                 this.setBalance()
         }
     
 
         })
     }
     setBalance =async()=>{
        await console.log("refresh balance")
        this.state.Allfees.map((item,index)=>{
        if(item.fee_category=="MONTHLY"){
            if(item.fee_sub_category == "TUITION FEE" ){
                 this.setState({StudentTutionFee:item.amount})
            }
        }
    })
            this.SearchOldfee()
    }
    SearchOldfee=()=>{
        const admission_no = this.state.admission_no.toUpperCase()
        fetch("http://144:91:110:210:4800/SearchOldfee"
        ,{
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                admission_no: admission_no
            })
        })
        .then((data) => data.json())
        .then(async (data) => {  
            console.log( 'single parent'+data )  
            if(data[0] !=undefined){
                this.setState({AllOldFees: data})                
            }
            else{
                this.setState({AllOldFees:[]})
            }
            // this.setState({account_no:data[0].account_no,father_name:data[0].father_name,mother_name:data[0].mother_name,father_occu:data[0].father_occu,father_designation:data[0].father_designation,father_annual_income:data[0].father_annual_income,mother_occu:data[0].mother_occu,mother_designation:data[0].mother_designation,mother_annual_income:data[0].mother_annual_income,parent_address:data[0].parent_address,parent_mobile:data[0].parent_mobile,gaurdian_name:data[0].gaurdian_name,gaurdian_address:data[0].gaurdian_address,gaurdian_mobile:data[0].gaurdian_mobile,gaurdian_annual_income:data[0].gaurdian_annual_income,gaurdian_occu:data[0].gaurdian_occu,gaurdian_designation:data[0].gaurdian_designation})
        })
    }
    printReceipt() {
        window.print();
      }
    render(){
        return(
            <div className="receipt_background">
            <div className="row layoutCard">
            <div className="col-4 form-group pt-5">
                <label>Admission Number    </label>
                <input type="text" class="form-control" placeholder="Enter Admission Number Here" onChange={(e)=>{this.setState({admission_no:e.target.value});this.searchByAdmission_no();}}/>
            </div>
            <div className="col-3 form-group" style={{display:"flex",justifyContent:"center"}}>
             <img src={require('./images/logo.png').default} style={{height:"100px"}}/>
            </div>
            <div className="col-5 form-group">
                <table class="table receipt_table">
                    <tbody>
                    <tr>
                        <th scope="row">Student Name</th>
                        <td>{this.state.name}</td>
                    </tr>  
                    <tr>  
                        <th scope="row">Parents Name</th>
                        <td>{this.state.father_name}/{this.state.mother_name}</td>
                    </tr>  
                    <tr>      
                        <th scope="row">Address</th>
                        <td>{this.state.parent_address}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
            </div>
           <div className="row ">
              
                                           
                            {this.state.AllOldFees.map((item,index)=>{
                            {JSON.parse(item.paid_fees).map((e,i)=>{
                                    if(e.fee_sub_category =="TUITION FEE"){
                                        SubtractTuitionFee = e.amount
                                    }
                            })}
                                return(
                                    JSON.parse(item.paid_months).map((ite,inde)=>{
                                        return(
                                            <div className="col-6">
                                            <div className="row layoutCard">
                                            <div className="col-12">
                                            <table class="table receipt_table">
                                            <tbody className="">
                                            <tr>
                                            <th scope="row">Fee Month</th>
                                            <td>{ite}</td>
                                            </tr>
                                            <tr>
                                            <th scope="row">Receipt No</th>
                                            <td>{item.receipt_no}</td>
                                            </tr>
                                            <tr>
                                            <th scope="row">Bank</th>
                                            <td>{item.bank}</td>
                                            </tr>
                                            <tr>
                                            <th scope="row">Annual Fees </th>
                                            <td>{JSON.parse(item.paid_fees).map((el,ind)=>{
                                                if(ite == el.month){
                                                return(
                                                    el.fee_sub_category+":"+el.amount+"  ,  "
                                                )
                                                }
                                            })}</td>
                                            </tr>
                                            <tr>
                                            <th scope="row">Tuition Fees </th>
                                            <td> {JSON.parse(item.paid_fees).map((ele,inde)=>{
                                                if(ele.fee_sub_category == "TUITION FEE"){
                                                   var b = SubtractTuitionFee
                                                    SubtractTuitionFee =SubtractTuitionFee-parseInt(this.state.StudentTutionFee)
                                                    if(SubtractTuitionFee>0 && SubtractTuitionFee!=0){
                                                    RemainTuitionFee   =b -SubtractTuitionFee
                                                    return(
                                                        RemainTuitionFee
                                                    )
                                                    }
                                                    else{
                                                        return(
                                                           b
                                                        )
                                                    }
                                                  
                                                } 
                                            })}</td>
                                            {/* <td>{JSON.parse(item.paid_fees).map((ele,inde)=>{
                                                if(ele.fee_sub_category == "TUITION FEE"){
                                                    this.setState({SubtractStudentTutionFee:parseInt(ele.amount)-parseInt(this.state.StudentTutionFee)})
                                                return(

                                                )
                                                }
                                            })} </td> */}


                                             {/* <th scope="row">Paid Months</th>
                                            <td>{JSON.parse(item.paid_months).map((item,index)=>{
                                                   return(
                                                item+","
                                                   )
                                            })}</td> */}
                                            </tr>
                                            <tr>
                                            <th scope="row">Date</th>
                                            <td> { Moment(item.createdAt).format('DD-MM-YY') }</td>
                                            </tr>
                                            </tbody>
                                            </table>
                                            </div>
                                            </div>
                     
                                           </div>
                                        )
                                 })
                                 
                                )
                            })}
                </div>  
            <div className="row">                                   
                <div className="col-12 ml-5">
                <button class="hide-on-print btn btn-success btn-md" onClick={this.printReceipt}>Print</button>
                </div>
            </div>
            </div>
        )
    }
    
}
export default PrintReceipt;