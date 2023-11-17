import React from 'react';
import ModalImage from "react-modal-image";
import DataTable from '@bit/adeoy.utils.data-table';
import { Link } from "react-router-dom";
import Moment from 'moment';

class StudentPromotionAll extends React.Component{
    constructor(props){
        super(props)
        this.state={
           AllStudent:[],
           AllSession:[],
           from_session:localStorage.getItem('SessionAccess'),
           to_session:'',
           show_btn:true,
           show_btn_text:"Please Wait..."
        }
    }
    componentDidMount=()=>{
        this.getStudent()
        this.getSession()
        // this.getClass()
    }
    getStudent = async() => {
    await console.log("wait wait")
    this.setState({AllStudent:[]})
      const url = "http://144.91.110.221:4800/getStudent"
      fetch(url
        , {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            session: this.state.from_session,
            school_id: "UT015"
            // section: this.state.from_section
          })
        })
        .then(res => res.json()
        )
        .then(data => {
          this.setState({AllStudent: data})
      })
      .catch(err => console.log(err))
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

  upgradedata=async()=>{
  var StudentData = [];
  this.setState({show_btn:false})
  await console.log("wait wait")
  {this.state.AllStudent.map((item,index)=>{
    
    if(item.class_name=="PRE-NUR"){
    StudentData.push({"unique_id":this.state.to_session+item.admission_no,"tc_status":"0","admission_no":item.admission_no,"account_no":item.account_no,"school_id":"UT015","student":item.student._id,"session":this.state.to_session,"class_name":'NUR',"section":item.section})
    }
    else if(item.class_name=="NUR"){
      StudentData.push({"unique_id":this.state.to_session+item.admission_no,"tc_status":"0","admission_no":item.admission_no,"account_no":item.account_no,"school_id":"UT015","student":item.student._id,"session":this.state.to_session,"class_name":'KG',"section":item.section})
    }
    else if(item.class_name=="KG"){
      StudentData.push({"unique_id":this.state.to_session+item.admission_no,"tc_status":"0","admission_no":item.admission_no,"account_no":item.account_no,"school_id":"UT015","student":item.student._id,"session":this.state.to_session,"class_name":'1',"section":item.section})
    }
    else if(item.class_name=="1"){
      StudentData.push({"unique_id":this.state.to_session+item.admission_no,"tc_status":"0","admission_no":item.admission_no,"account_no":item.account_no,"school_id":"UT015","student":item.student._id,"session":this.state.to_session,"class_name":'2',"section":item.section})
    }
    else if(item.class_name=="2"){
      StudentData.push({"unique_id":this.state.to_session+item.admission_no,"tc_status":"0","admission_no":item.admission_no,"account_no":item.account_no,"school_id":"UT015","student":item.student._id,"session":this.state.to_session,"class_name":'3',"section":item.section})
    }
    else if(item.class_name=="3"){
      StudentData.push({"unique_id":this.state.to_session+item.admission_no,"tc_status":"0","admission_no":item.admission_no,"account_no":item.account_no,"school_id":"UT015","student":item.student._id,"session":this.state.to_session,"class_name":'4',"section":item.section})
    }
    else if(item.class_name=="4"){
      StudentData.push({"unique_id":this.state.to_session+item.admission_no,"tc_status":"0","admission_no":item.admission_no,"account_no":item.account_no,"school_id":"UT015","student":item.student._id,"session":this.state.to_session,"class_name":'5',"section":item.section})
    }
    else if(item.class_name=="5"){
      StudentData.push({"unique_id":this.state.to_session+item.admission_no,"tc_status":"0","admission_no":item.admission_no,"account_no":item.account_no,"school_id":"UT015","student":item.student._id,"session":this.state.to_session,"class_name":'6',"section":item.section})
    }
    else if(item.class_name=="6"){
      StudentData.push({"unique_id":this.state.to_session+item.admission_no,"tc_status":"0","admission_no":item.admission_no,"account_no":item.account_no,"school_id":"UT015","student":item.student._id,"session":this.state.to_session,"class_name":'7',"section":item.section})
    }
    else if(item.class_name=="7"){
      StudentData.push({"unique_id":this.state.to_session+item.admission_no,"tc_status":"0","admission_no":item.admission_no,"account_no":item.account_no,"school_id":"UT015","student":item.student._id,"session":this.state.to_session,"class_name":'8',"section":item.section})
    }
    else if(item.class_name=="8"){
      StudentData.push({"unique_id":this.state.to_session+item.admission_no,"tc_status":"0","admission_no":item.admission_no,"account_no":item.account_no,"school_id":"UT015","student":item.student._id,"session":this.state.to_session,"class_name":'9SCI',"section":item.section})
    }
    else if(item.class_name=="9COM"){
      StudentData.push({"unique_id":this.state.to_session+item.admission_no,"tc_status":"0","admission_no":item.admission_no,"account_no":item.account_no,"school_id":"UT015","student":item.student._id,"session":this.state.to_session,"class_name":'10COM',"section":item.section})
    }
    else if(item.class_name=="9SCI"){
      StudentData.push({"unique_id":this.state.to_session+item.admission_no,"tc_status":"0","admission_no":item.admission_no,"account_no":item.account_no,"school_id":"UT015","student":item.student._id,"session":this.state.to_session,"class_name":'10SCI',"section":item.section})
    }
    else if(item.class_name=="10SCI"){
      StudentData.push({"unique_id":this.state.to_session+item.admission_no,"tc_status":"0","admission_no":item.admission_no,"account_no":item.account_no,"school_id":"UT015","student":item.student._id,"session":this.state.to_session,"class_name":'11SCI',"section":item.section})
    }
    else if(item.class_name=="10COM"){
      StudentData.push({"unique_id":this.state.to_session+item.admission_no,"tc_status":"0","admission_no":item.admission_no,"account_no":item.account_no,"school_id":"UT015","student":item.student._id,"session":this.state.to_session,"class_name":'11COM',"section":item.section})
    }
    else if(item.class_name=="11COM"){
      StudentData.push({"unique_id":this.state.to_session+item.admission_no,"tc_status":"0","admission_no":item.admission_no,"account_no":item.account_no,"school_id":"UT015","student":item.student._id,"session":this.state.to_session,"class_name":'12COM',"section":item.section})
    }
    else if(item.class_name=="11SCI"){
      StudentData.push({"unique_id":this.state.to_session+item.admission_no,"tc_status":"0","admission_no":item.admission_no,"account_no":item.account_no,"school_id":"UT015","student":item.student._id,"session":this.state.to_session,"class_name":'12SCI',"section":item.section})
    }
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
          alert("Promote Successfully")    
          this.setState({session:this.state.to_session,show_btn_text:"Promoted"})           
      }).catch(err =>{
      });
  
  }
  }
    render(){
      const data =[];
      {this.state.AllStudent.map((item,index)=>{
      data.push({"admission_no":item.admission_no,"account_no":item.student.account_no,"student_name":item.student.name,"class_section":item.class_name+"-"+item.section,"parent_name":item.student.mother_name+"/"+item.student.father_name,"mobile":item.student.parent_mobile,'action': <button type="button" className="btn btn-info" onClick={() => this.searchByAdmission_no(item.student.admission_no)} data-dismiss="modal">Get Details</button>})})}
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
              <div className="col-3 form-group">
              </div>
              <div className="col-2 form-group">
                            <label>From Session *</label>
                           <select className="form-control" value={this.state.from_session} onChange={(e)=>{this.setState({from_session:e.target.value.toUpperCase(),sessionErrorMessage:undefined});this.getStudent();}}>
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
                            <label>To Session *</label>
                           <select className="form-control" onChange={(e)=>{this.setState({to_session:e.target.value.toUpperCase(),sessionErrorMessage:undefined})}}>
                               <option value="">Select Session</option>
                              {this.state.AllSession.map((item,index)=>{
                                  return(
                                    <option value={item.session_code}>{item.session_code}</option>
                                  )
                              })}
                           </select>
                           <span className="errorMessage" style={{fontSize:'14px',fontWeight:600}}>{this.state.sessionErrorMessage}</span>
              </div>
                        <div className="col-2 form-group d-flex align-items-end">
                          <br/>
                          {this.state.show_btn ==true ?
                          <button onClick={()=>{this.upgradedata()}} className="btn btn-primary">Promote All</button>
                          :
                          <button  className="btn btn-primary">{this.state.show_btn_text}</button>
                          }
                        </div>
                        {/* <div className="col-3 form-group">
                            <label>Section *</label>
                           <select className="form-control" onChange={(e)=>{this.setState({from_section:e.target.value.toUpperCase(),sectionErrorMessage:undefined});this.getStudent()}}>
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
                {this.state.AllStudent !="" ?
               
                     
                     <DataTable
                     data={data}
                     columns={columns}
                     striped={true}
                     hover={true}
                     responsive={true}
                 />
                 :
                 <lottie-player src="https://assets2.lottiefiles.com/private_files/lf30_uilaciwr.json"  background="transparent"  speed="1"  style={{width: "300px", height: "300px",margin:"auto"}}  loop  autoplay></lottie-player>
               }
                </div>
            </div>
            </>
        )
    }
}
export default StudentPromotionAll;