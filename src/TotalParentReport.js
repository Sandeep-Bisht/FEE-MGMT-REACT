import React from 'react';
// import DataTable from '@bit/adeoy.utils.data-table';
import Moment from 'moment';
import $ from 'jquery'; 
import { CSVLink, CSVDownload } from "react-csv";

var grand_total=0




class TotalParentReport extends React.Component{
    constructor(props){
        super(props)
        this.state={
          AllStudent:[],
          AllClass:[],
          class_name:'1',
          session:localStorage.getItem('SessionAccess'),
          Allfees:[],
          StudentStrenght:'',
          defaultFine:'',
          fine_date:'',
          AllSession:[],
          AllSection:[],
          section:'',
          AllCategory:[]
        }
    }
    componentDidMount(){
      this.getCategory()
      this.getClass()
      this.getSection()
      this.getSession()
      // this.StudentStrenght()
    }
    getCategory = () => {
      fetch("http://144.91.110.221:4800/getCastCategory")
          .then(res => res.json())
          .then(data => {
              console.log(data)
              this.setState({AllCategory: data})
          })
          .then(err => console.log(err))
  }
    getSection = () => {
      fetch("http://144.91.110.221:4800/getSection"
          ,{
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            school_id: "100",
            session:this.state.session,
          })
          })
          .then(res => res.json())
          .then(data => {
              console.log(data)
              this.setState({AllSection: data})
          })
          .then(err => console.log(err))
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
            school_id: "100"
          })
        })
          .then(res => res.json())
          .then(data => {
              console.log(data)
              this.setState({AllSession: data})
          })
          .then(err => console.log(err))
  }
   
    StudentStrenght=async()=>{
      grand_total=0
    $("#getBtn").text("Please Wait...")
     this.setState({AllStudent:[]})
       fetch("http://144.91.110.221:4800/StudentStrenght"
       ,{
           method: 'POST',
           headers: {
               Accept: 'application/json',
               'Content-Type': 'application/json'
           },
           body: JSON.stringify({
               session:this.state.session,
               class_name: this.state.class_name,
               section:this.state.section
           })
       })
       .then((data) => data.json())
       .then(async (data) => {  
         var StudentArray=[]
              if(data[0] != undefined){
                data.map((item,index)=>{
                  if(!StudentArray.includes(item.account_no)){
                    StudentArray.push(item.account_no)
                  }
                })
               this.setState({AllStudent:StudentArray})
               $("#getBtn").text("Get Data")
              }
            //    this.setBalance()
               if(data[0] == undefined){
                $("#getBtn").text("Get Data")
                 alert("No Result Found")
               }
       })
    }
    getClass = () => {
      fetch("http://144.91.110.221:4800/getClass")
          .then(res => res.json())
          .then(data => {
              console.log(data)
              this.setState({AllClass: data})
          })
          .then(err => console.log(err))
   }    
    render(){
      grand_total=0
        return(
            <>
              <div className= "row layoutCard">
                <div className="col-3 form-group">
                      <label>Session</label>
                      <select value={this.state.session} className="form-control" onChange={(e)=>{{this.  setState({session:e.target.value.toUpperCase()})}}}> 
                                    <option value="">All Session</option>
                                      {this.state.AllSession.map((item,index)=>{
                                          return(
                                            <option value={item.session_code}>{item.session_code}</option>
                                          )
                                      })}
                      </select> 
                </div>
               
                <div className="col-2 form-group">
                <label>Select Class</label>
                <select className="form-control"  value={this.state.class_name} onChange={(e)=>{this.setState({class_name:e.target.value.toUpperCase()})}}>
                           <option value="">All</option>
                           {this.state.AllClass.map((item,index)=>{
                                 return(
                                    <option value={item.class_name}>{item.class_name}</option>
                                 )
                            })}
                </select>
                </div>
                <div className="col-2 form-group">
                  <label>Section</label>
                  <select className="form-control" onChange={(e)=>{this.setState({section:e.target.value.toUpperCase(),sectionErrorMessage:undefined})}}>
                             <option value="">All</option>
                             {this.state.AllSection.map((item,index)=>{
                                 if(this.state.class_name == item.class_name.toUpperCase()){
                                 return(
                                    <option value={item.section}>{item.section}</option>
                                 )
                                 }
                             })}
                  </select>
                </div>
                <div className="col-4 form-group">
                  <br/>
                  {/* <button className="btn btn-primary mr-1"><CSVLink filename={"StudentData.csv"} data={csvData}>CSV</CSVLink></button> */}
                  <button className="btn btn-success" id="getBtn" onClick={()=>{this.StudentStrenght()}}>Get Data</button>
                  {/* <button className="btn btn-info ml-1" onClick={()=>{this.printDefaulter()}}>print</button> */}
                </div>
              </div>
              <div className= "row layoutCard">
                  <div className="col-12 text-center">
                    <h3 className="pb-5"> <u>Total Parent Report</u> </h3>
                  </div>
                  <table class="table table-striped">
                        <thead>
                          <tr>
                            <th scope="col">Total</th>    
                            <th scope="col">{this.state.AllStudent.length}</th>    
                                              
                          </tr>
                          
                         

                        </thead>
                       
                      </table>
               </div>
            </>
        )
    }
    
}
export default TotalParentReport;