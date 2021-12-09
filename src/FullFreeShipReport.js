import React from 'react';
import DataTable from '@bit/adeoy.utils.data-table';
import Moment from 'moment';
import $ from 'jquery'; 
import { CSVLink, CSVDownload } from "react-csv";

var grand_total=0
var commanIndex=0
var commanIndexTeacherWard=0
var commanClass
var commanSection




class FullFreeShipReport extends React.Component{
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
      commanClass=''
      commanSection=''
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
               this.setState({AllStudent:data})
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
   printDefaulter() {
    window.print();
  }  
    render(){
      commanIndex=0
      commanIndexTeacherWard=0
      commanClass=''
      commanSection=''
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
                    <h3 className="pb-5"> <u>{this.state.session} FULL FREESHIP STUDENTS LIST ({this.state.class_name==""?"ALL CLASSES":this.state.class_name})</u> </h3>
                  </div>
                  <table class="table table-striped">
                        <thead>
                          <tr>
                            <th scope="col">SrNo</th>
                            <th scope="col"> Admn </th>
                            <th scope="col">Student</th>
                            <th scope="col">Parents</th>
                            <th scope="col">Phonenos</th>
                            <th scope="col">Class</th>
                            <th scope="col">doa</th>  
                            <th scope="col">dob</th>  
                            <th scope="col">house</th>                                                       
                            {/* <th scope="col">Address</th> */}
                          </tr>
                        </thead>
                        {this.state.AllSection.sort((a,b) => parseInt(a.class_name) - parseInt(b.class_name)).map((it,ind)=>{
                          var commanSectionCount="0"
                          commanIndex =0
                          if(it.description==""){                            
                          return(
                        this.state.AllStudent.sort((a,b) => parseInt(a.class_name) - parseInt(b.class_name)).map((item,index)=>{
                          
                          if((item.student.is_full_free_ship=="true" && item.class_name+item.section==it.class_name+it.section)){ 
                            
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
                                <td>{item.admission_no}</td>                                
                                <td>{item.student.name}</td>
                                <td>{item.student.father_name} / {item.student.mother_name}</td>
                               <td>{item.student.parent_mobile}</td>
                                <td>{item.class_name} / {item.section}</td>
                                <td>{Moment(item.student.date_of_admission).format("DD-MM-YYYY")}</td>
                                <td>{Moment(item.student.dob).format("DD-MM-YYYY")}</td>
                                <td>{item.student.house}</td>
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
export default FullFreeShipReport;