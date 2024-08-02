import React from 'react';
// import DataTable from '@bit/adeoy.utils.data-table';
import Moment from 'moment';
import $ from 'jquery'; 
import { CSVLink, CSVDownload } from "react-csv";

var grand_total=0
var commanIndex=0
var commanIndexTeacherWard=0
var commanClass
var commanSection
var StudentArray=[]




class FeeConcessionReport extends React.Component{
    constructor(props){
        super(props)
        this.state={
          AllStudent:[],
          AllClass:[],
          class_name:'',
          session:localStorage.getItem('SessionAccess'),
          Allfees:[],
          FeeConcessonStudent:'',
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
      // this.FeeConcessonStudent()
    }
    getCategory = () => {
      fetch("http://localhost:4800/getCastCategory")
          .then(res => res.json())
          .then(data => {
              console.log(data)
              this.setState({AllCategory: data})
          })
          .then(err => console.log(err))
  }
    getSection = () => {
      fetch("http://localhost:4800/getSection"
          ,{
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            school_id: "UT015",
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
      fetch("http://localhost:4800/getSession"
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
              console.log(data)
              this.setState({AllSession: data})
          })
          .then(err => console.log(err))
  }
   
    FeeConcessonStudent=async()=>{
      grand_total=0
      commanIndex=0
      commanIndexTeacherWard=0
      commanClass=''
      commanSection=''
      StudentArray=[]
    $("#getBtn").text("Please Wait...")
     this.setState({AllStudent:[]})
       fetch("http://localhost:4800/StudentStrenght"
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
              if(data[0] != undefined){                 
               data.map((item,index)=>{
                 if(item.student.fee_concession !="" && item.student.fee_concession !='0'){
                this.FeesClasswise(item)
                 }
               })
               $("#getBtn").text("Get Data")
            }
            //    this.setBalance()
               if(data[0] == undefined){
                $("#getBtn").text("Get Data")
                 alert("No Result Found")
               }
              
       })
    }
    FeesClasswise=(item)=>{    
      // console.log("checking response FeesClasswise")
        
       fetch("http://localhost:4800/FeesClasswise"
       ,{
           method: 'POST',
           headers: {
               Accept: 'application/json',
               'Content-Type': 'application/json'
           },
           body: JSON.stringify({
               class_name: item.class_name,
               section: item.section,
               session:this.state.session,
           })
       })
       .then((data) => data.json())
       .then(async (data) => {  
          // await console.log( 'Class Wise'+data )  
           if(data[0] !=undefined){
             StudentArray.push({"class_name":item.class_name,"section":item.section,"tuition_fee":data[0].total_monthly_fee,"admission_no":item.admission_no,"account_no":item.account_no,"name":item.student.name,"father_name":item.student.father_name,"mother_name":item.student.mother_name,"fee_concession":item.student.fee_concession})
               this.setState({AllStudent:StudentArray})
              //  await this.SearchOldfee()
       }
       })
   }
    getClass = () => {
      fetch("http://localhost:4800/getClass")
          .then(res => res.json())
          .then(data => {
              console.log(data)
              this.setState({AllClass: data})
          })
          .then(err => console.log(err))
   }    
   printDefaulter() {
    window.print();
  }  
    render(){
      commanIndex=0
      commanIndexTeacherWard=0
      commanClass=''
      commanSection=''
      grand_total=0
      // StudentArray=[]
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
                <div className="col-4 form-group d-flex align-items-end">
                  <br/>
                  {/* <button className="btn btn-primary mr-1"><CSVLink filename={"StudentData.csv"} data={csvData}>CSV</CSVLink></button> */}
                  <button className="btn btn-success" id="getBtn" onClick={()=>{this.FeeConcessonStudent()}}>Get Data</button>
                  <button className="btn btn-info ml-1" onClick={()=>{this.printDefaulter()}}>print</button>
                </div>
              </div>
              <div className= "row printCard printDefaulter">
                  <div className="col-12 text-center">
                    <h3 className="pb-5"> <u>{this.state.session} Fee Concession Details ({this.state.class_name==""?"ALL CLASSES":this.state.class_name})</u> </h3>
                  </div>
                  <table class="table table-striped">
                        <thead>
                          <tr>
                            <th scope="col">SrNo</th>
                            <th scope="col"> Admn </th>
                            <th scope="col">Student</th>
                            <th scope="col">Parents</th>
                            <th style={{textAlign:"right"}} scope="col">Tuition Fee</th>
                            <th style={{textAlign:"right"}} scope="col">con%</th>  
                            <th style={{textAlign:"right"}} scope="col">conc</th>  
                            <th style={{textAlign:"right"}} scope="col">bus</th>   
                            <th style={{textAlign:"right"}} scope="col">con%</th>  
                            <th style={{textAlign:"right"}} scope="col">conc</th>                                                      
                            {/* <th scope="col">Address</th> */}
                          </tr>
                        </thead>
                        {this.state.AllSection.sort((a,b) => parseInt(a.class_name) - parseInt(b.class_name)).map((it,ind)=>{
                          var commanSectionCount="0"
                          commanIndex =0
                          if(it.description==""){
                            

                          return(
                        this.state.AllStudent.sort((a,b) => parseInt(a.class_name) - parseInt(b.class_name)).map((item,index)=>{
                          
                          if((item.class_name+item.section==it.class_name+it.section) || item.class_name=="PRE-NUR"){ 
                            
                            if(commanClass!=it.class_name+it.section){
                              commanClass=it.class_name+it.section
                              commanSectionCount="1"
                              }else{
                                commanSectionCount="0"
                              }   
                              commanIndex=commanIndex+1                     
                            return(
                              <tbody>
                                {commanSectionCount=="1" ?
                              <tr>
                              <td colspan="10 text-danger">
                              <h5 className="text-danger">Class Name :  {it.class_name} , Section :   {it.section}</h5>
                              </td>
                            </tr>
                          :null}
                              <tr>
                                <td>{commanIndex}</td>
                                <td>{item.admission_no}/{item.account_no}</td>                                
                                <td>{item.name}</td>
                                <td>{item.father_name} / {item.mother_name}</td>
                                <td style={{textAlign:'right'}}>{item.tuition_fee}</td>
                                <td style={{textAlign:'right'}}>{item.fee_concession}</td>
                                <td style={{textAlign:'right'}}>{(parseInt(item.tuition_fee)*item.fee_concession)/100}</td>
                                <td style={{textAlign:'right'}}>0</td>
                                <td style={{textAlign:'right'}}>0</td>
                                <td style={{textAlign:'right'}}>0</td>
                               
                              </tr>
                              {/* {commanSectionCount=="1" ?
                              <tr>
                              <td colspan="10 text-danger">
                              <h5 className="text-success">Total Student {it.class_name}-{it.section}: {commanIndex} </h5>
                              </td>
                            </tr>
                          :null} */}
                              </tbody>
                            )
                              }
                        })
 
                          )
                      }
                        
                      })}
                        {/* <tbody>
                        <tr><th colspan="8"><h5 >TOTAL BROTHER & SISTERS :         {commanIndex}</h5></th></tr>
                        </tbody> */}
                         
                       
                      </table>
               </div>
            </>
        )
    }
    
}
export default FeeConcessionReport;