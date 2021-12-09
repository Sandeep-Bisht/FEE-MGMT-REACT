import React from 'react';
import DataTable from '@bit/adeoy.utils.data-table';
import Moment from 'moment';
import $ from 'jquery'; 
import { CSVLink, CSVDownload } from "react-csv";

var grand_total=0
var commanIndex=0
var commanIndexTeacherWard=0
var commanAccount




class SiblingsReport extends React.Component{
    constructor(props){
        super(props)
        this.state={
          AllStudent:[],
          AllClass:[],
          class_name:'',
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
      commanIndex=0
      commanIndexTeacherWard=0
      commanAccount=''
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
              if(data[0] != undefined){
                var StudentArray=[]

                var NotSiblingAccountNo=[]
                var SiblingAccountNo=[]

                if(data[0] != undefined){
                  data.map((item,index)=>{
                    if(!NotSiblingAccountNo.includes(item.account_no)){
                      NotSiblingAccountNo.push(item.account_no)
                    }else{
                      SiblingAccountNo.push(item.account_no)
                    }
                  })
                data.map((item,index)=>{
                  if(SiblingAccountNo.includes(item.account_no)){
                  StudentArray.push(item)
                  }
                })
                console.log(JSON.stringify(StudentArray))
               this.setState({AllStudent:StudentArray})
               $("#getBtn").text("Get Data")
              }
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
   printDefaulter() {
    window.print();
  }  
    render(){
      commanIndex=0
      commanIndexTeacherWard=0
      commanAccount=''
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
                  <button className="btn btn-info ml-1" onClick={()=>{this.printDefaulter()}}>print</button>
                </div>
              </div>
              <div className= "row printCard printDefaulter">
                  <div className="col-12 text-center">
                    <h3 className="pb-5"> <u>LIST OF BROTHER AND SISTER</u> </h3>
                  </div>
                  <table class="table table-striped">
                        <thead>
                          <tr>
                            <th scope="col">SrNo</th>
                            <th scope="col"> Admn </th>
                            <th scope="col">Student</th>
                            <th scope="col">Class/Section</th>
                            <th scope="col">Fee Con %</th>  
                            <th scope="col">Bus Con %</th>  
                            <th scope="col">IS TW</th>                                                       
                            {/* <th scope="col">Address</th> */}
                          </tr>
                          <tr><th colspan="8" className="text-info text-center"><h5 className="text-center text-info">NON TEACHER WARD</h5></th></tr>
                        </thead>
                        
                        
                        {this.state.AllStudent.sort((a,b) => parseInt(a.account_no) - parseInt(b.account_no)).map((item,index)=>{
                          if(item.student.is_teacher_ward=="false"){
                          var valcheck=false
                          if(commanAccount !=item.account_no){
                            commanAccount=item.account_no
                            commanIndex=commanIndex+1
                            valcheck=true
                          }
                            return(
                              <tbody>
                              {valcheck ==true ?
                              <tr>
                                <td colspan="8 text-danger">
                                <h5 className="text-danger">{item.student.father_name} / {item.student.mother_name}  A/C:- {item.account_no}</h5>
                                </td>
                              </tr>
                              :null}
                              <tr>
                                <td>{valcheck ==true ?commanIndex:null}</td>
                                <td>{item.admission_no}</td>                                
                                <td>{item.student.name}</td>
                                <td>{item.class_name} / {item.section}</td>
                                <td>{item.student.fee_concession =="" ? '0' :item.student.fee_concession}</td>
                                <td>0</td>
                                <td>NO</td>
                              </tr>
                              </tbody>
                            )
                              }
                         
                        })
                        }
                        <tbody>
                        <tr><th colspan="8"><h5 >TOTAL BROTHER & SISTERS :         {commanIndex}</h5></th></tr>
                        </tbody>
                        <thead>
                       <tr><th colspan="8" className="text-info text-center"><h5 className="text-center text-info">TEACHER WARD</h5></th></tr>
                        </thead>
                         
                        {this.state.AllStudent.sort((a,b) => parseInt(a.account_no) - parseInt(b.account_no)).map((item,index)=>{
                          if(item.student.is_teacher_ward=="true"){
                          var valcheck=false
                          if(commanAccount !=item.account_no){
                            commanAccount=item.account_no
                            commanIndexTeacherWard=commanIndexTeacherWard+1
                            valcheck=true
                          }
                            return(
                              <tbody>
                              {valcheck ==true ?
                              <tr>
                                <td colspan="8 text-danger">
                                <h5 className="text-danger">{item.student.father_name} / {item.student.mother_name}  A/C:- {item.account_no}</h5>
                                </td>
                              </tr>
                              :null}
                              <tr>
                                <td>{valcheck ==true ?commanIndexTeacherWard:null}</td>
                                <td>{item.admission_no}</td>                                
                                <td>{item.student.name}</td>
                                <td>{item.class_name} / {item.section}</td>
                                <td>{item.student.fee_concession =="" ? '0' :item.student.fee_concession}</td>
                                <td>0</td>
                                <td>YES</td>
                              </tr>
                              </tbody>
                            )
                              }
                         
                        })
                        }
                         <tbody>
                        <tr><th colspan="8"><h5 >TOTAL BROTHER & SISTERS :         {commanIndexTeacherWard}</h5></th></tr>
                        </tbody>
                      </table>
               </div>
            </>
        )
    }
    
}
export default SiblingsReport;