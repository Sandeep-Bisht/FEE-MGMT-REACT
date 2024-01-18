import React from 'react';
// import DataTable from '@bit/adeoy.utils.data-table';
import Moment from 'moment';
import $ from 'jquery'; 
import { CSVLink, CSVDownload } from "react-csv";
import moment from 'moment';
import axios from 'axios';
var paidamountbydate=0
var paidamountbyclass=0
var defaulterList =[];

var global_class_name=''
var count=0
var studentArray=[]
var studentArrayWithFee=[]

var PreviousStudentArray=[]
var PreviousStudentArrayWithFee=[]

var paidFees=[]
var PreviousPaidFees=[]
var counter =0
var FinalDefaulter=[]
var loop_i =0;
class DefaulterPerMoth extends React.Component{
    constructor(props){
        super(props)
        this.state={
          AllDefaulter:[],
          AllClass:[],
          class_name:'',
          session:localStorage.getItem('SessionAccess'),
          Allfees:[],
          DefaulterByMonth:'',
          defaultFine:'',
          fine_date:'',
          session_code:'',
          AllSession:[],
          AllSection:[],
          section:'',
          AllStudent:[],
          studentArray:[],
          studentArrayWithFee:[],
          PreviousStudentArray:[],
          PreviousStudentArrayWithFee:[],
          paidFees:[],
          PreviousPaidFees:[],
          FinalDefaulter:[],
          AllReceipts:[],
        }
    }

    componentDidMount(){
      this.getSession()
    }
 
printDefaulter() {
  window.print();
}    

getSession = () => {
  fetch("http://144.91.110.221:4800/getSession"
  ,{
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        school_id: "UT015"
      })
    })
      .then(res => res.json())
      .then(data => {
          this.setState({AllSession: data})
      })
      .then(err => console.log(err))
}

 AllReceiptsCurrentMonth =async()=>{
    const payload = {
      class_name:this.state.class_name,
      session:this.state.session_code,
      date:this.state.DefaulterByMonth,
    }
   const response = await axios.post('http://144.91.110.221:4800/AllReceiptsCurrentMonth',payload)
   if(response){
    this.setState({
      AllReceipts:response.data,
    })
   }
}


    render(){
      // loop_i=0
      studentArrayWithFee=[]
      studentArray=[]

      count =0
        const data =[];
        // {this.state.AllDefaulter.map((item,index)=>{
        //   data.push( {"sr_no":index+1,"name":item.name,"admission_no":item.admission_no,
        //   "account_no":item.account_no,"class_name":item.class_name+"-"+item.section,"dues":item.balance})
        // })}
          const columns = [
            { title: "SR NO", data: "sr_no" },
            { title: 'Admission No',data: "admission_no"},
            { title: 'Account No',data: "account_no"},
            { title: 'Name',data: "name"},
            { title: 'Class',data: "class_name"},
            { title: 'Dues ',data: "dues"},
          ];
          const click = (row) => {
            console.log(row);
          };

          
          const csvData = [
            ["ADMISSSION NO", "STUDENT" ,"CLASS" , "DATE", "PAID ADDMISSION FEES", "PAID REGISTRATION FEES", "PAID EXAMINATION FEES", "PAID ANNUAL FEES", "PAID FEES", "PAID FINE", "TOTAL"],
          ];
          {this.state.AllReceipts.map((item,ind)=>{
            console.log(item,"check item")
            csvData.push( [item.admission_no,item.name,item.class_name+"-"+item.section,item.receipt_date,item.admission_fee,item.registration_fee,item.examination_fee,item.annual_terms_fee,item.paid_fees,item.paid_fine,item.paid_amount])
          // })}
          })
          }
          
        counter=0
        PreviousPaidFees=[]
        FinalDefaulter=[]

       
        return(
            <>
              <div className= "row layoutCard">
              <div className="col-3 form-group">
                      <label>Session</label>
                      <select value={this.state.session_code} className="form-control" onChange={(e)=>{{this.setState({session_code:e.target.value.toUpperCase()})}}}> 
                                    <option value="">Select Session</option>
                                      {this.state.AllSession.map((item,index)=>{
                                          return(
                                            <option value={item.session_code}>{item.session_code}</option>
                                          )
                                      })}
                      </select> 
                </div>
                <div className="col-3 form-group">
                  <label>Date</label>
                  <input type="date" className="form-control" value={this.state.DefaulterByMonth} onChange={(e)=>{this.setState({DefaulterByMonth:e.target.value})}} />
                </div>
                <div className="col-3 form-group">
                <label>Select Class</label>
                <select className="form-control" onChange={(e)=>{this.setState({class_name:e.target.value})}}>
                <option value="">Select Class</option>
                           <option value="KG-to-V">KG-to-V</option>
                           <option value="VI-to-XII">VI-to-XII</option>
                </select>
                </div>
                
                <div className="col-12 form-group">
                  <button className="btn btn-success" id="getBtn" onClick={()=>{this.AllReceiptsCurrentMonth()}}>Get Defaulter</button>
                  <button className="btn btn-info ml-1" onClick={()=>{this.printDefaulter()}}>print</button>
                  <button className="btn btn-primary ml-1"><CSVLink filename={"StudentData.csv"} data={csvData}>CSV</CSVLink></button>
                </div>
              </div>

{/* {this.state.PreviousPaidFees !='' &&  this.state.paidFees !="" ?   */}

            <div className= "row printCard">
              <div className="col-12 printDefaulter">
                <h3 className="text-center">DEFAULTER LIST OF {this.state.class_name} - {this.state.section} ({ Moment(this.state.DefaulterByMonth).format("MMMM").slice(0,3)}-{ Moment(this.state.DefaulterByMonth).format("YYYY")})</h3>
                      <table class="table table-striped">
                        <thead>
                          <tr>
                            <th scope="col">Sr No</th>
                            <th scope="col">Admn No</th>
                            <th scope="col">Student</th>
                            <th scope="col">Class</th>
                            <th scope="col">Date</th>
                            <th scope="col">Addmission_Fees</th>
                            <th scope="col">Registration_Fees</th>
                            <th scope="col">Examination_Fees</th>
                            <th scope="col">Annual_terms_fee</th>
                            <th scope="col">Paid_Fees</th>
                            <th scope="col">Paid_Fine</th>
                            <th scope="col">Total</th>
                          </tr>
                        </thead>
                        <tbody>
                        
                        {this.state.AllReceipts.sort((a,b) => parseInt(a.admission_no) - parseInt(b.admission_no)).map((item,index)=>{
                              return(
                              <tr>
                              <td>{index+1}</td>
                              <td>{item.admission_no}</td>
                              <td>{item.name}</td>
                              <td>{item.class_name}- {item.section}</td>
                              <td>{item.receipt_date}</td>  
                              <td>{item.admission_fee}</td>                          
                              <td>{item.registration_fee}</td>                          
                              <td>{item.examination_fee}</td>                          
                              <td>{item.annual_terms_fee}</td>                          
                              <td>{item.paid_fees}</td>                          
                              <td>{item.paid_fine}</td>                                                  
                              <td>{item.paid_amount}</td>                          
                              </tr>
                              )
                        })}
                      
                       
                        </tbody>
                      </table>
              </div>
            </div>
            {/* :null} */}
            </>
        )
    }
    
}
export default DefaulterPerMoth;