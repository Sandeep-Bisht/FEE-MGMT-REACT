import React from 'react';
import ModalImage from "react-modal-image";
import DataTable from '@bit/adeoy.utils.data-table';
import { Link } from "react-router-dom";
import Moment from 'moment';

class StudentUpgrade extends React.Component{
    constructor(props){
        super(props)
        this.state={
           AllStudent:[],
           AllClass:[],
           AllToClass:[],
           AllSection:[],
           AllSession:[],
           AllToSession:[],
           from_class:'',
           from_session:'',
           from_section:'',
           
           to_session:'',
           to_section:'',
        }
    }
    componentDidMount=()=>{
        // this.getStudent()
        this.getSession()
        this.getToSession()
        // this.getClass()
    }
    getStudentForUpgrade = async() => {
    await console.log("wait wait")
      const url = "http://144.91.110.221:4800/getStudentForUpgrade"
      fetch(url
        , {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            session: this.state.from_session,
            class_name: this.state.from_class
            // section: this.state.from_section
          })
        })
        .then(res => res.json()
        )
        .then(data => {
          this.setState({AllStudent: data})
      })
    }
    getSection = () => {
      fetch("http://144.91.110.221:4800/getSection")
          .then(res => res.json())
          .then(data => {
              console.log(data)
              this.setState({AllSection: data})
          })
          .then(err => console.log(err))
    }
    // getStudent = () => {
    //     fetch("http://144.91.110.221:4800/getStudent")
    //         .then(res => res.json())
    //         .then(data => {
    //             console.log(data)
    //             this.setState({AllStudent: data})
    //         })
    //         .then(err => console.log(err))
    // }
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
    getToSession = () => {
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
              this.setState({AllToSession: data})
          })
          .then(err => console.log(err))
    }
    getToClass = async() => {
      await console.log("wait wait")
      const url = "http://144.91.110.221:4800/getClass"
      fetch(url
        , {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            session: this.state.to_session,
            school_id:"100"
          })
        })
        .then(res => res.json()
        )
        .then(data => {
          this.setState({AllToClass: data})
      })
    }
    getClass = async() => {
    await console.log("wait wait")
    const url = "http://144.91.110.221:4800/getClass"
    fetch(url
      , {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          session: this.state.from_session,
          school_id:"100"
        })
      })
      .then(res => res.json()
      )
      .then(data => {
        this.setState({AllClass: data})
    })
  }
  upgradedata=async()=>{
    var StudentData = [];
  await console.log("wait wait")
  {this.state.AllStudent.map((item,index)=>{
    StudentData.push({"unique_id":this.state.to_session+item.admission_no,"admission_no":parseInt(item.admission_no),"account_no":parseInt(item.account_no),"school_id":"100","student":item.student._id,"session":this.state.to_session,"class_name":this.state.to_class,"section":item.section,"tc_status":"0"})
  })
  await console.log("wait")
  const data = new FormData()
  data.append('StudentData', JSON.stringify(StudentData))
  const url = "http://144.91.110.221:4800/StoreUpgradeStudent"
  fetch(url, {
          method: 'post',
          body: data
      })
      .then(res => res.json())
      .then(data => {
          alert("Upgraded Successfully Created Successfully")    
          this.getClass()            
      }).catch(err =>{
      });
}
  }
    render(){
      const data =[];
      {this.state.AllStudent.map((item,index)=>{
      data.push({"admission_no":parseInt(item.admission_no),"account_no":item.student.account_no,"student_name":item.student.name,"class_section":item.class_name+"-"+item.section,"parent_name":item.student.mother_name+"/"+item.student.father_name,"mobile":item.student.parent_mobile,'action': <button type="button" className="btn btn-info" onClick={() => this.searchByAdmission_no(item.student.admission_no)} data-dismiss="modal">Get Details</button>})})}
        const columns = [
          { title: "Admn No", data: "admission_no" },
          { title: "Ac No", data: "account_no" },
          { title: "St. Name", data: "student_name" },
          { title: "Class", data: "class_section" },
          { title: "Parent Name", data: "parent_name"},
          { title: "Mobile", data: "mobile"},
          // { title: "Action", data: "action"},
        ];
        return(
            <>
            <div className= "row layoutCard">
                            <div className="col-1 form-group text-center">
                              <br/>
                              <label className="text-primary">From </label>
                            </div>
              <div className="col-2 form-group">
                            <label>Session *</label>
                           <select className="form-control" onChange={(e)=>{this.setState({from_session:e.target.value.toUpperCase(),sessionErrorMessage:undefined});this.getStudentForUpgrade();this.getClass()}}>
                               <option value="">Select Session</option>
                              {this.state.AllSession.map((item,index)=>{
                                  return(
                                    <option value={item.session_code}>{item.session_code}</option>
                                  )
                              })}
                           </select>
                           <span className="errorMessage" style={{fontSize:'14px',fontWeight:600}}>{this.state.sessionErrorMessage}</span>
              </div>
              <div className="col-2 form-group">
                            <label>Class *</label>
                           <select className="form-control" onChange={(e)=>{this.setState({from_class:e.target.value.toUpperCase(),class_nameErrorMessage:undefined });this.getSection();this.getStudentForUpgrade()}} >
                               <option value="">Select Class</option>
                               {this.state.AllClass.map((item,index)=>{
                                 return(
                                    <option value={item.class_name}>{item.class_name}</option>
                                 )
                             })}
                           </select>
                           <span className="errorMessage" style={{fontSize:'14px',fontWeight:600}}>{this.state.class_nameErrorMessage}</span>
            </div>
                            <div className="col-1 form-group text-center">
                              <br/>
                              <label className="text-primary">To </label>
                            </div>
            <div className="col-2 form-group">
                            <label>Session *</label>
                           <select className="form-control" onChange={(e)=>{this.setState({to_session:e.target.value.toUpperCase(),sessionErrorMessage:undefined});this.getStudentForUpgrade();this.getToClass()}}>
                               <option value="">Select Session</option>
                              {this.state.AllToSession.map((item,index)=>{
                                  return(
                                    <option value={item.session_code}>{item.session_code}</option>
                                  )
                              })}
                           </select>
                           <span className="errorMessage" style={{fontSize:'14px',fontWeight:600}}>{this.state.sessionErrorMessage}</span>
              </div>
              <div className="col-2 form-group">
                            <label>Class *</label>
                           <select className="form-control" onChange={(e)=>{this.setState({to_class:e.target.value.toUpperCase(),class_nameErrorMessage:undefined });this.getSection();this.getStudentForUpgrade()}} >
                               <option value="">Select Class</option>
                               {this.state.AllToClass.map((item,index)=>{
                                 return(
                                    <option value={item.class_name}>{item.class_name}</option>
                                 )
                             })}
                           </select>
                           <span className="errorMessage" style={{fontSize:'14px',fontWeight:600}}>{this.state.class_nameErrorMessage}</span>
              </div>
              <div className="col-2 form-group">
                          <br/>
                          <button onClick={()=>{this.upgradedata()}} className="btn btn-primary">Upgrade</button>
                        </div>
                        {/* <div className="col-3 form-group">
                            <label>Section *</label>
                           <select className="form-control" onChange={(e)=>{this.setState({from_section:e.target.value.toUpperCase(),sectionErrorMessage:undefined});this.getStudentForUpgrade()}}>
                             <option value="">Select Section</option>
                             {this.state.AllSection.map((item,index)=>{
                                 if(this.state.from_class == item.class_name.toUpperCase()){
                                 return(
                                    <option value={item.section}>{item.section}</option>
                                 )
                                 }
                             })}
                           </select>
                           <span className="errorMessage" style={{fontSize:'14px',fontWeight:600}}>{this.state.sectionErrorMessage}</span>
                        </div> */}
            </div>
            <div className= "row layoutCard">
                <div className="col-12">
                    <DataTable
                        data={data}
                        columns={columns}
                        striped={true}
                        hover={true}
                        responsive={true}
                        // onClickRow={click}
                    />
                </div>
            </div>
            </>
        )
    }
}
export default StudentUpgrade;