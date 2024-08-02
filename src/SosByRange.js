import React from 'react';
import ModalImage from "react-modal-image";
import DataTable from '@bit/adeoy.utils.data-table';
import { Link } from "react-router-dom";
import Moment from 'moment';
import $ from 'jquery'; 
var numberCount =1
class SosByRange extends React.Component{
    constructor(props){
        super(props)
        this.state={
            _id:'',
            session:localStorage.getItem('SessionAccess'),
            date_of_admission:'',
            parent:'',
            admission_no:'',
            security_no:'',
            old_admission_no:'',
            aadhar_no:'',
            class_name:'',
            section:'',
            class_nameCopy:'',
            sectionCopy:'',
            subjects:'',
            is_start_from_first_class:false,
            last_class:'',
            category:'',
            house:'',
            name:'',
            sex:'',
            dob:'',
            nationality:'',
            last_school:'',
            changebalance:'',
            fee_concession:'',
            bus_fare_concession:'',
            vehicle_no:'',
            is_teacher_ward:false,
            paid_upto_month:'',
            paid_upto_year:'',
            last_school_performance:'',
            is_full_free_ship:false,
            avail_transport:false,
            take_computer:false,
            no_exempt_security_deposit:false,
            ncc:false,
            no_exempt_registration:false,
            no_exempt_admission:false,
            is_repeater:false,
            other_details:'',
            misc_details:'',
   
            account_no:'',
            father_name:'',
            mother_name:'',
            father_occu:'',
            father_designation:'',
            father_annual_income:'',
            mother_occu:'',
            mother_designation:'',
            mother_annual_income:'',
            parent_address:'',
            parent_per_address:'',
            parent_city:'',
            parent_state:'',
            parent_country:'',
            parent_phone:'',
            parent_mobile:'',            
   
            gaurdian_name:'',
            gaurdian_occu:'',
            gaurdian_designation:'',
            gaurdian_annual_income:'',
            gaurdian_address:'',
            gaurdian_city:'',
            gaurdian_state:'',
            gaurdian_country:'',
            gaurdian_phone:'',
            gaurdian_mobile:'',
            religion:'',

            image:'',
            image2:'',
            image3:'',
            image4:'',
   
            AllSession:[],
            AllParent:[],
            AllClass:[],
            AllSection:[],
            AllCategory:[],
            AllHouse:[],
            AllStudent:[],
            SingleParent:[],
            AllSubjects:[],

            due:'',
            surplus:'',
            last_fees_date:'',
            AllOldFees:[],
            balance:'',
            AllSibling:[],
            Date:'1',
            ToDate:'10',
            FromDateCopy:'',
            ToDateCopy:''
        }
    }
    componentDidMount=()=>{
       this.getSession()
       this.getClass()
       this.getSection()
       this.getAllCertificateDetails()
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
          .catch(err => console.log(err))
  }
    getClass = async() => {
      await console.log("wait wait")
      fetch("http://localhost:4800/getClass"
      ,{
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        school_id: "UT015",
        session: this.state.session,
      })
    })
          .then(res => res.json())
          .then(data => {
              console.log(data)
              this.setState({AllClass: data})
              this.getSection()
          })
          .catch(err => console.log(err))
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
          .catch(err => console.log(err))
  }
  getAllCertificateDetails = async() => {
    await console.log("wait wait")
    fetch("http://localhost:4800/getAllSosStudents"
    ,{
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      session: this.state.session,
    })
  })
        .then(res => res.json())
        .then(data => {
            this.setState({AllStudent:data})
            
        })
        .catch(err => console.log(err))
      }
  
    handleFocusInput (e){
      e.target.select(); 
    }  
  
    printDefaulter() {
      window.print();
    } 
    setRange() {
     this.setState({FromDateCopy:this.state.Date,ToDateCopy:this.state.ToDate,class_nameCopy:this.state.class_name,sectionCopy:this.state.section})
    }
    render(){
      const data =[];
      {this.state.AllStudent.map((item,index)=>{
      data.push({"admission_no":item.admission_no,"account_no":item.account_no,"student_name":item.student.name,"class_section":item.class_name+"-"+item.section,"parent_name":item.student.mother_name+"/"+item.student.father_name,"gaurdian_name":item.gaurdian_name,"mobile":item.student.parent_mobile+","+item.student.parent_phone,"address":item.parent_address,'action': <button type="button" className="btn btn-info" onClick={() => this.searchByAdmission_no(item.admission_no)} data-dismiss="modal">Get Details</button>})})}
        const columns = [
          { title: "Admn No", data: "admission_no" },
          { title: "Ac No", data: "account_no" },
          { title: "St. Name", data: "student_name" },
          { title: "Class", data: "class_section" },
          { title: "Parent Name", data: "parent_name"},
          { title: "Gaurdian Name", data: "gaurdian_name"},
          { title: "Mobile", data: "mobile"},
          { title: "Address", data: "address"},
          { title: "Action", data: "action"},
        ];
        // numberCount =0
        return(
            <>
             {/* Modal All student */}
             <div id="AllModalStudent" class="modal fade" role="dialog">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content" style={{width:'100%'}}>
                        <div class="modal-header p-3">
                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                        </div>
                        <div className="row">
                            <div className="col-12">                     
                        <div class="modal-header">
                            <h4 class="modal-title">Student Details </h4>
                        </div>
                        <div class="modal-body">
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
                     </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
                <i> </i>
            </div>
 
                <div className= "row layoutCard ">
                  {/* <div className="col-3 form-group">
                    <label>From</label>
                    <input type="date" className="form-control"  onBlur={(e)=>{this.setState({Date:e.target.value})}} />
                  </div>
                  <div className="col-3 form-group">
                    <label>To</label>
                    <input type="date" className="form-control"  onBlur={(e)=>{this.setState({ToDate:e.target.value})}} />
                  </div> */}
                  <div className="col-3 form-group">
                            <label>Class *</label>
                           <select className="form-control" onChange={(e)=>{this.setState({class_name:e.target.value.toUpperCase(),class_nameErrorMessage:undefined })}} >
                               <option value="">All</option>
                               {this.state.AllClass.map((item,index)=>{
                                 return(
                                    <option value={item.class_name}>{item.class_name}</option>
                                 )
                             })}
                           </select>
                           <span className="errorMessage" style={{fontSize:'14px',fontWeight:600}}>{this.state.class_nameErrorMessage}</span>
                        </div>
                  <div className="col-3 form-group">
                            <label>Section *</label>
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
                           <span className="errorMessage" style={{fontSize:'14px',fontWeight:600}}>{this.state.sectionErrorMessage}</span>
                        </div>
                  <div className="col-3 form-group d-flex align-items-end">
                  <br/>
                    <button className="btn btn-success" onClick={(e)=>{this.setRange()}}>Get Data</button>
                    
                  </div>
                  <div className="col-3 form-group d-flex align-items-end">
                    <br/>
                    <button className="btn btn-info" onClick={(e)=>{this.printDefaulter()}}>Print</button>
                    
                  </div>
                </div>     
                  
                 <div className= "row printCard printDefaulter">
                <div className="col-12 text-center">
                  <h4>{this.state.session}</h4>
                </div>
                <div className="col-12 text-center">
                  <h4 className="pb-5">STRUCKOFF STUDENTS</h4>
                </div>
              <div className="col-12 ">
                        <DataTable
                        data={data}
                        columns={columns}
                        striped={true}
                        hover={true}
                        responsive={true}
                         />
                         {this.state.AllStudent != "" ?
                      <table class="table table-striped">
                        <thead>
                          <tr>
                            <th scope="col">SrNo</th>
                            <th scope="col"> Admn </th>
                            <th scope="col"> Accn </th>
                            <th scope="col">Student</th>
                            <th scope="col">Parents</th>
                            <th scope="col">date of StruckOff</th>
                            <th scope="col">remark</th>
                           
                          </tr>
                        </thead>
                        <tbody>
                        
                        {this.state.AllStudent.sort((a,b) => parseInt(a.admission_no) - parseInt(b.admission_no)).map((item,index)=>{
                           
                                if(this.state.class_nameCopy !="" && this.state.sectionCopy !="") { 
                                  if(item.class_name==this.state.class_nameCopy && item.section==this.state.sectionCopy){
                            return(
                              <tr>
                                <td>{index+1}</td>
                                
                                <td>{item.admission_no}</td>
                                <td>{item.account_no}</td>
                                <td>{item.student.name}</td>
                                <td>{item.student.father_name} / <br/>{item.student.mother_name}</td>
                                
                                <td>{Moment(item.date_of_tc).format("DD-MM-YYYY")}</td>
                                
                                
                                <td>{item.reason}</td>
                              </tr>
                            )
                                  }
                                }else if(this.state.class_nameCopy !="" && this.state.sectionCopy =="") { 
                                if(item.class_name==this.state.class_nameCopy){
                                  return(
                                    <tr>
                                      <td>{index+1}</td>
                                      <td>{item.admission_no}</td>
                                      <td>{item.account_no}</td>
                                      <td>{item.student.name}</td>
                                      <td>{item.student.father_name} / <br/>{item.student.mother_name}</td>
                                      
                                      <td>{Moment(item.date_of_tc).format("DD-MM-YYYY")}</td>
                                      
                                      
\\
                                      <td>{item.reason}</td>
                                    </tr>
                                  )
                                }
                              }
                                else{
                                  return(
                                    <tr>
                                      <td>{index+1}</td>
                                      
                                      <td>{item.admission_no}</td>
                                      <td>{item.account_no}</td>
                                      <td>{item.student.name}</td>
                                      <td>{item.student.father_name} / <br/>{item.student.mother_name}</td>
                                      
                                      <td>{Moment(item.date_of_tc).format("DD-MM-YYYY")}</td>
                                      
                                      
                                      <td>{item.reason}</td>
                                    </tr>
                                  )
                                }
                            
                        })
                        }
                      
                         
                        </tbody>
                      </table>
                      :
                      <lottie-player src="https://assets2.lottiefiles.com/private_files/lf30_uilaciwr.json"  background="transparent"  speed="1"  style={{width: "300px", height: "300px",margin:"auto"}}  loop  autoplay></lottie-player>
                    }
              </div>
            </div>
            </>
        )
    }
}
export default SosByRange;