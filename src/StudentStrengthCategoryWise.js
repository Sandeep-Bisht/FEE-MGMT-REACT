import React from 'react';
import DataTable from '@bit/adeoy.utils.data-table';
import Moment from 'moment';
import $ from 'jquery'; 
import { CSVLink, CSVDownload } from "react-csv";

var grand_total=0
class StudentStrengthCategoryWise extends React.Component{
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
      grand_total=0
        return(
            <>
              <div className= "row layoutCard ">
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
                    <h3 className="pb-5"> <u>Strength Category Wise</u> </h3>
                  </div>
                <table className="table">
                    <thead>
                          <tr>
                            <th scope="col">SrNo</th>
                            <th scope="col">Admn </th>
                            <th scope="col">Accn </th>
                            <th scope="col">Student</th>
                            <th scope="col">Parents</th>
                            <th scope="col">Mobile</th>
                            <th scope="col">Gen </th>
                            <th scope="col">Class</th>
                            <th scope="col">DOA</th>
                            <th scope="col">DOB</th>
                            <th scope="col">House</th>
                            {/* <th scope="col">Address</th> */}
                          </tr>
                    </thead>
              {this.state.AllCategory.map((item,index)=>{
                var total=0
                var sr =0
                return(
                <tbody>
                <tr className="pb-3 pt-3"> <th colspan="20  " className=" text-center"><h5>{item.category}</h5></th></tr>
                {this.state.AllStudent.sort((a,b) => parseInt(a.admission_no) - parseInt(b.admission_no)).map((i,ind)=>{
                  if(item.category==i.student.category){
                    total=total+1
                    sr=sr+1
                  return(
                    <tr>
                    <td>{sr}</td>
                    <td>{i.admission_no}</td>
                    <td>{i.account_no}</td>
                    <td>{i.student.name}</td>
                    <td>{i.student.father_name} / <br/>{i.student.mother_name}</td>
                    <td>{i.student.parent_mobile}</td>
                    <td style={{width:'1ch'}}> {i.student.sex.slice(0,1)}</td>
                    <td>{i.class_name}-{i.section}</td>
                    <td>{Moment(i.student.date_of_admission).format("DD-MM-YY")}</td>
                    <td>{Moment(i.student.dob).format("DD-MM-YY")}</td>
                    <td>{i.student.house}</td>
                  </tr>
                  )
                  }
                })}
                    <tr>
                    <td>Total</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>{total}</td>
                  </tr>
                </tbody>
                )
              })}
              </table>
               </div>
            </>
        )
    }
    
}
export default StudentStrengthCategoryWise;