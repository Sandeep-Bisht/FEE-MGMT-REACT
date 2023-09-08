import React from 'react';
import ModalImage from "react-modal-image";
import DataTable from '@bit/adeoy.utils.data-table';
import { Link } from "react-router-dom";
import Moment from 'moment';
var StudentData = [];
var IdArray = [];
class StudentSpecificPromotion extends React.Component{
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
           to_class:'',
           show_btn:true
        }
    }
    componentDidMount=()=>{
        // this.getStudent()
        this.getSession()
        this.getToSession()
        // this.getClass()
    }
    getStudentForUpgradeSingle = async() => {
    await console.log("wait wait")
      const url = "http://144.91.110.221:4800/getStudentForUpgradeSingle"
      fetch(url
        , {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            session: this.state.from_session,
            class_name: this.state.from_class,
            section: this.state.from_section
          })
        })
        .then(res => res.json()
        )
        .then(data => {
          this.setState({AllStudent: data})
      })
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
          })
          })
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
    if(this.checkValidation()){
  await console.log("wait")
  this.setState({show_btn:false})
  const data = new FormData()
  data.append('StudentData', JSON.stringify(StudentData))
  data.append('IdArray', JSON.stringify(IdArray))
  const url = "http://144.91.110.221:4800/StoreUpgradeStudent"
  fetch(url, {
          method: 'post',
          body: data
      })
      .then(res => res.json())
      .then(data => {
          alert("Upgraded Successfully")    
          this.getClass()     
          StudentData = [];
          IdArray = [];
          this.setState({  AllStudent:[],
            from_class:'',
            from_session:'',
            from_section:'',
            
            to_session:'',
            to_section:'',
            to_class:'',
            show_btn:true
          })       
      }).catch(err =>{
      });
    }
  }
  setStudent=(item,e)=>{
    if(this.checkValidation()){
    if(e.target.checked ==true){
    StudentData.push({"unique_id":this.state.to_session+item.admission_no+item.account_no,"tc_status":"0","admission_no":item.admission_no,"account_no":item.account_no,"school_id":"100","student":item.student._id,"session":this.state.to_session,"class_name":this.state.to_class,"section":this.state.to_section})
    IdArray.push(item._id)
  }
    if (!e.target.checked) {

      for (var i = 0; i < StudentData.length; i++) {
          // console.log(this.state.AddOn[i].id +"<br>"+ item._id);
          if (StudentData[i].admission_no === item.admission_no) {
            StudentData.splice(i, 1);
          }
      }
      console.log(IdArray.length);
      for (var j = 0; j < IdArray.length; j++) {
        console.log("j  "+item._id);
        if (IdArray[j] === item._id) {
          console.log(" single  " + IdArray[j] +"  id  "+item._id)
          IdArray.splice(j, 1);
        }
    }
  }
    console.log("student data"+JSON.stringify(StudentData))
}else{
  e.target.checked=false
}
  }
  checkValidation = () => {
    if (this.state.from_session === "") {
        this.setState({fromsessionErrorMessage: "Please Select Session"})
        return false
    }else if (this.state.from_class === "") {
        this.setState({from_classErrorMessage: "Please Select Class"})
        return false
    }else if (this.state.from_section === "") {
        this.setState({from_sectionErrorMessage: "Please Select Section"})
        return false
    }
    else if (this.state.to_session === "") {
      this.setState({tosessionErrorMessage: "Please Select Session"})
      return false
    }else if (this.state.to_class === "") {
      this.setState({to_classErrorMessage: "Please Select Class"})
      return false
    }else if (this.state.to_section === "") {
      this.setState({to_sectionErrorMessage: "Please Select Section"})
      return false
    }
    else {
        return true
    }
  }
    render(){
      const data =[];
      {this.state.AllStudent.map((item,index)=>{
      data.push({"select":<input type="checkbox" className="form-control m-0" onChange={(e)=>{this.setStudent(item,e)}} />,"admission_no":parseInt(item.admission_no),"account_no":parseInt(item.student.account_no),"student_name":item.student.name,"class_section":item.class_name+"-"+item.section,"parent_name":item.student.mother_name+"/"+item.student.father_name,"mobile":item.student.parent_mobile,'action': <button type="button" className="btn btn-info" onClick={() => this.searchByAdmission_no(item.student.admission_no)} data-dismiss="modal">Get Details</button>})})}
        const columns = [
          { title: "Select", data: "select" },
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
                            <div className="col-12 form-group text-center">
                              <br/>
                              <label className="text-primary">From </label>
                            </div>
              <div className="col-2 form-group">
                            <label>Session *</label>
                           <select className="form-control" onChange={(e)=>{this.setState({from_session:e.target.value.toUpperCase(),fromsessionErrorMessage:undefined});this.getStudentForUpgradeSingle();this.getClass()}}>
                               <option value="">Select Session</option>
                              {this.state.AllSession.map((item,index)=>{
                                  return(
                                    <option value={item.session_code}>{item.session_code}</option>
                                  )
                              })}
                           </select>
                           <span className="errorMessage" style={{fontSize:'14px',fontWeight:600}}>{this.state.fromsessionErrorMessage}</span>
              </div>
              <div className="col-2 form-group">
                            <label>Class *</label>
                           <select className="form-control" onChange={(e)=>{this.setState({from_class:e.target.value.toUpperCase(),from_classErrorMessage:undefined });this.getSection();this.getStudentForUpgradeSingle()}} >
                               <option value="">Select Class</option>
                               {this.state.AllClass.map((item,index)=>{
                                 return(
                                    <option value={item.class_name}>{item.class_name}</option>
                                 )
                             })}
                           </select>
                           <span className="errorMessage" style={{fontSize:'14px',fontWeight:600}}>{this.state.from_classErrorMessage}</span>
            </div>
                     <div className="col-3 form-group">
                            <label>Section *</label>
                           <select className="form-control" onChange={(e)=>{this.setState({from_section:e.target.value.toUpperCase(),from_sectionErrorMessage:undefined});this.getStudentForUpgradeSingle()}}>
                             <option value="">Select Section</option>
                             {this.state.AllSection.map((item,index)=>{
                                 if(this.state.from_class == item.class_name.toUpperCase()){
                                 return(
                                    <option value={item.section}>{item.section}</option>
                                 )
                                 }
                             })}
                           </select>
                           <span className="errorMessage" style={{fontSize:'14px',fontWeight:600}}>{this.state.from_sectionErrorMessage}</span>
                        </div>
                            <div className="col-12 form-group text-center">
                              <br/>
                              <label className="text-primary">To </label>
                            </div>
            <div className="col-2 form-group">
                            <label>Session *</label>
                           <select className="form-control" onChange={(e)=>{this.setState({to_session:e.target.value.toUpperCase(),tosessionErrorMessage:undefined});this.getStudentForUpgradeSingle();this.getToClass()}}>
                               <option value="">Select Session</option>
                              {this.state.AllToSession.map((item,index)=>{
                                  return(
                                    <option value={item.session_code}>{item.session_code}</option>
                                  )
                              })}
                           </select>
                           <span className="errorMessage" style={{fontSize:'14px',fontWeight:600}}>{this.state.tosessionErrorMessage}</span>
              </div>
              <div className="col-2 form-group">
                            <label>Class *</label>
                           <select className="form-control" onChange={(e)=>{this.setState({to_class:e.target.value.toUpperCase(),to_classErrorMessage:undefined });this.getSection();this.getStudentForUpgradeSingle()}} >
                               <option value="">Select Class</option>
                               {this.state.AllToClass.map((item,index)=>{
                                 return(
                                    <option value={item.class_name}>{item.class_name}</option>
                                 )
                             })}
                           </select>
                           <span className="errorMessage" style={{fontSize:'14px',fontWeight:600}}>{this.state.to_classErrorMessage}</span>
                        </div>
                       
                        <div className="col-3 form-group">
                            <label>Section *</label>
                           <select className="form-control" onChange={(e)=>{this.setState({to_section:e.target.value.toUpperCase(),to_sectionErrorMessage:undefined});this.getStudentForUpgradeSingle()}}>
                             <option value="">Select Section</option>
                             {this.state.AllSection.map((item,index)=>{
                                 if(this.state.from_class == item.class_name.toUpperCase()){
                                 return(
                                    <option value={item.section}>{item.section}</option>
                                 )
                                 }
                             })}
                           </select>
                           <span className="errorMessage" style={{fontSize:'14px',fontWeight:600}}>{this.state.to_sectionErrorMessage}</span>
                        </div>
                        <div className="col-2 form-group d-flex align-items-end">
                          <br/>
                          {this.state.show_btn ==true ?
                          <button onClick={()=>{this.upgradedata()}} className="btn btn-primary">Upgrade</button>
                          :
                          <button  className="btn btn-primary">Please Wait...</button>
                          }                        
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
                        // onClickRow={click}
                    />
                </div>
            </div>
            </>
        )
    }
}
export default StudentSpecificPromotion;