import React from 'react';
// import DataTable from '@bit/adeoy.utils.data-table';
import Moment from 'moment';
import $ from 'jquery'; 
import { CSVLink, CSVDownload } from "react-csv";

var grand_total=0
var commanIndex=0
var commanIndexTeacherWard=0
var commanSection
var commanClass
var StudentArray=[]




class StudentStrengthSectionWise extends React.Component{
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
      fetch("http://144:91:110:210:4800/getCastCategory")
          .then(res => res.json())
          .then(data => {
              console.log(data)
              this.setState({AllCategory: data})
          })
          .catch(err => console.log(err))
        }
    getSection = () => {
      fetch("http://144:91:110:210:4800/getSection"
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
          .catch(err => console.log(err))
        }
    getSession = () => {
      fetch("http://144:91:110:210:4800/getSession"
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
          .catch(err => console.log(err))
        }
   
    FeeConcessonStudent=async()=>{
      grand_total=0
      commanIndex=0
      commanIndexTeacherWard=0
      commanSection=''
      commanClass=''
      StudentArray=[]
    $("#getBtn").text("Please Wait...")
    this.setState({AllStudent:[]})
    fetch("http://144:91:110:210:4800/StudentStrenght"
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
            $("#getBtn").text("Get Data")
            this.setState({AllStudent:data})
            }
         //    this.setBalance()
            if(data[0] == undefined){
              $("#getBtn").text("Get Data")
              alert("No Result Found")
            }
    })
    .catch(err => console.log(err))
    }
    FeesClasswise=(item)=>{    
      // console.log("checking response FeesClasswise")
        
       fetch("http://144:91:110:210:4800/FeesClasswise"
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
       .catch(err => console.log(err))
   }
    getClass = () => {
      fetch("http://144:91:110:210:4800/getClass")
          .then(res => res.json())
          .then(data => {
              console.log(data)
              this.setState({AllClass: data})
          })
          .catch(err => console.log(err))
        }    
   printDefaulter() {
    window.print();
  }  
    render(){
      commanIndex=0
      commanIndexTeacherWard=0
      commanSection=''
      commanClass=''
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
                    <h3 className="pb-5"> <u>{this.state.session} TOTAL STRENGTH (SECTION WISE)</u></h3>
                  </div>
                  <table class="table table-striped">
                        <thead>
                          <tr>
                          <th>Class</th>
                          <th>Boys</th>
                          <th>Female</th>
                          <th>Total</th>                                                
                            {/* <th scope="col">Address</th> */}
                          </tr>
                        </thead>
                        {this.state.AllSection.sort((a,b) => parseInt(a.class_name) - parseInt(b.class_name)).map((it,ind)=>{
                          var Male =0
                          var Female =0
                          var commanSectionCount="0"
                          var commanClassCount="0"
                          commanIndex =0
                          if(it.description==""){
                          return(
                        this.state.AllStudent.sort((a,b) => parseInt(a.admission_no) - parseInt(b.admission_no)).map((item,index)=>{
                          if((item.class_name+item.section==it.class_name+it.section) || item.class_name=="PRE-NUR"){ 
                            if(commanSection!=it.class_name+it.section){
                              commanSection=it.class_name+it.section
                              commanSectionCount="1"
                              }else{
                                commanSectionCount="0"
                              } 
                              if(commanClass!=it.class_name){
                                commanClass=it.class_name
                                commanClassCount="1"
                                }else{
                                  commanClassCount="0"
                                } 
                              commanIndex=commanIndex+1  
                              this.state.AllStudent.map((item,index)=>{
                                if(it.class_name==item.class_name && it.section== item.section){
                                  if(item.student.sex =="MALE"){
                                   Male=Male+1
                                  }else if(item.student.sex =="FEMALE"){
                                   Female = Female+1
                                  }
                                 }
                               })
                              //  if(Male+Female > 0){
                               return(
                                <>
                                {commanClassCount=="1" ? 
                                
                                <tr>
                                <td colspan="10 text-danger">
                                <h5 className="text-danger">Class Name :  {it.class_name} </h5>
                                </td>
                                </tr>
                                :null}
                                {commanSectionCount=="1" ?
                                <tbody>
                              <tr>
                              <td>{it.class_name}-{it.section}</td>
                              <td> {Male}</td>
                              <td>{Female}</td>
                              <td>{Male+Female}</td>
                            </tr>
                            </tbody>
                            :null}
                            </>
                                 )
                              //  }
                              }
                        })
 
                          )
                      }
                        
                      })}
                        {/* <tbody>
                        <tr><th colspan="8"><h5 >TOTAL BROTHER & SISTERS :         {commanIndex}</h5></th></tr>
                        </tbody> */}
                         
                       
                      </table>
                      <div className="col-12 text-center">
                          <h4 className="text-center">TOTAL</h4>
                        </div>
                      <div className="col-12 ">
                      <table class="table table-striped">
                        <thead>
                       
                          <tr>
                          <th>Class</th>
                          <th>Boys</th>
                          <th>Female</th>
                          <th>Total</th>
                          </tr>
                        </thead>
                      <tbody>
                      {this.state.AllClass.map((itemm,indexx)=>{
                         var Male =0
                         var Female =0
                         this.state.AllStudent.map((item,index)=>{
                         if(itemm.class_name==item.class_name ){
                           if(item.student.sex =="MALE"){
                            Male=Male+1
                           }else if(item.student.sex =="FEMALE"){
                            Female = Female+1
                           }
                          }
                        })
                        return(
                          <tr>
                            <td><h5 className="text-danger">{itemm.class_name}</h5></td>
                            <td>{Male}</td>
                            <td>{Female}</td>
                            <td>{Male+Female}</td>
                          </tr>
                        )
                        })}
                        
                      </tbody>
                      </table>
              </div>
               </div>

               
                        
            
            </>
        )
    }
    
}
export default StudentStrengthSectionWise;