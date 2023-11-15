import React from 'react';
import ModalImage from "react-modal-image";
import DataTable from '@bit/adeoy.utils.data-table';
import { Link } from "react-router-dom";
import Moment from 'moment';
import $ from 'jquery'; 
var numberCount =1
class StudentSlipByRange extends React.Component{
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
            FromAdmissionNo:'1',
            ToAdmissionNo:'10',
            FromAdmissionNoCopy:'1',
            ToAdmissionNoCopy:'10'
        }
    }
    componentDidMount=()=>{
       this.getSession()
       this.getStudent()
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
    getStudent = () => {      
      fetch("http://144:91:110:210:4800/getStudent"
          , {
            method: 'POST',
            headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
            },
              body: JSON.stringify({
              session: this.state.session,
              school_id: "UT015"
            })
          })
          .then(res => res.json())
          .then(data => {
            console.log("dfds"+data.length)
              this.setState({AllStudent: data})
          })
          .catch(err => console.log(err))
        }

    // DisplayStudentObject = (obj) => {
    //     let _id   =   obj._id
    //     let session = obj.session
    //     let date_of_admission =obj.date_of_admission
    //     let parent= obj.parent
    //     let admission_no=obj.admission_no
    //     let security_no = obj.security_no
    //     let old_admission_no=obj.old_admission_no
    //     let aadhar_no = obj.aadhar_no
    //     let class_name = obj.class_name
    //     let section = obj.section
    //     let subjects = obj.subjects
    //     let is_start_from_first_class = obj.is_start_from_first_class
    //     let last_class = obj.last_class
    //     let category = obj.category
    //     let house = obj.house
    //     let name = obj.name
    //     let sex = obj.sex
    //     let dob = obj.dob
    //     let nationality = obj.nationality
    //     let last_school = obj.last_school
    //     let balance = obj.balance
    //     let fee_concession = obj.fee_concession
    //     let bus_fare_concession = obj.bus_fare_concession
    //     let vehicle_no = obj.vehicle_no
    //     let is_teacher_ward = obj.is_teacher_ward
    //     let paid_upto_month = obj.paid_upto_month
    //     let paid_upto_year = obj.paid_upto_year
    //     let last_school_performance = obj.last_school_performance
    //     let is_full_free_ship = obj.is_full_free_ship
    //     let avail_transport = obj.avail_transport
    //     let take_computer = obj.take_computer
    //     let no_exempt_security_deposit = obj.no_exempt_security_deposit
    //     let ncc = obj.ncc
    //     let no_exempt_registration = obj.no_exempt_registration
    //     let no_exempt_admission = obj.no_exempt_admission
    //     let is_repeater = obj.is_repeater
    //     let other_details = obj.other_details
    //     let misc_details = obj.misc_details

    //     let account_no = obj.account_no
    //     let father_name = obj.father_name
    //     let mother_name = obj.mother_name
    //     let father_occu = obj.father_occu
    //     let father_designation = obj.father_designation
    //     let father_annual_income = obj.father_annual_income
    //     let mother_occu = obj.mother_occu
    //     let mother_designation = obj.mother_designation
    //     let mother_annual_income = obj.mother_annual_income
    //     let parent_address = obj.parent_address
    //     let parent_per_address = obj.parent_per_address
    //     let parent_city = obj.parent_city
    //     let parent_state = obj.parent_state
    //     let parent_country = obj.parent_country
    //     let parent_phone = obj.parent_phone
    //     let parent_mobile = obj.parent_mobile

    //     let gaurdian_name = obj.gaurdian_name
    //     let gaurdian_occu = obj.gaurdian_occu
    //     let gaurdian_designation = obj.gaurdian_designation
    //     let gaurdian_annual_income = obj.gaurdian_annual_income
    //     let gaurdian_address = obj.gaurdian_address
    //     let gaurdian_city = obj.gaurdian_city
    //     let gaurdian_state = obj.gaurdian_state
    //     let gaurdian_country = obj.gaurdian_country
    //     let gaurdian_phone = obj.gaurdian_phone
    //     let gaurdian_mobile = obj.gaurdian_mobile
    //     let image= obj.image

        

    //     this.setState({image,_id,session,date_of_admission,parent,admission_no,security_no,old_admission_no,aadhar_no,class_name,section,subjects,is_start_from_first_class,last_class,category,house,name,sex,dob,nationality,last_school,balance,fee_concession,bus_fare_concession,vehicle_no,is_teacher_ward,paid_upto_month,paid_upto_year,last_school_performance,is_full_free_ship,avail_transport,take_computer,no_exempt_security_deposit,ncc,no_exempt_registration,no_exempt_admission,is_repeater,other_details,misc_details,account_no,father_name,mother_name,father_occu,father_designation,father_annual_income,mother_occu,mother_designation,mother_annual_income,parent_address,parent_per_address,parent_city,parent_state,parent_country,parent_phone,parent_mobile,gaurdian_name,gaurdian_occu,gaurdian_designation,gaurdian_annual_income,gaurdian_address,gaurdian_city,gaurdian_state,gaurdian_country,gaurdian_phone,gaurdian_mobile})
    // }
   
  
    handleFocusInput (e){
      e.target.select(); 
    }
    // PrintStudentDislay() {
    //   $('.printStudentSlip').hide()
    //   window.print();
    //   $('.printStudentSlip').show()
    // }
    printStudentSlip() {
      $('.layoutCard').hide()
      $('.navbar').hide()
      $('.printStudentSlip').css('margin-top','-30px')
       
      window.print();
      $('.layoutCard').show()
      $('.navbar').show()
      $('.printStudentSlip').css('margin-top','0px')
    }
    setRange() {
     this.setState({FromAdmissionNoCopy:this.state.FromAdmissionNo,ToAdmissionNoCopy:this.state.ToAdmissionNo})
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
            {/* end all modal student */}
            {/* <!-- Student Profile --> */}
  <div class="student-profile py-4">
    <div class="row">
      {/* <div class="col-lg-12">
        <div class="card shadow-sm">
          <div class="card-body">
            <p class="mb-0"><strong class="pr-1">Admission No:</strong><input type="text" onChange={(e)=>{this.searchByAdmission_no(e)}} defaultValue={this.state.admission_no} /></p>
            <p class="mb-0"><strong class="pr-1">Class:</strong>{this.state.class_name}</p>
            <p class="mb-0"><strong class="pr-1">Date Of Birth:</strong>{this.state.dob}</p>
          </div>
          <div class="card-header bg-transparent text-center">
            <img class="profile_img" src="https://placeimg.com/640/480/arch/any" alt="" />
            <h3>{this.state.name}</h3>
          </div>
        </div>
      </div> */}    
    </div>
</div>


                <div className= "row layoutCard ">
                  <div className="col-3 form-group">
                    <label>From</label>
                    <input type="text" className="form-control"  onBlur={(e)=>{this.setState({FromAdmissionNo:e.target.value})}} />
                  </div>
                  <div className="col-3 form-group">
                    <label>To</label>
                    <input type="text" className="form-control"  onBlur={(e)=>{this.setState({ToAdmissionNo:e.target.value})}} />
                  </div>
                  <div className="col-3 form-group d-flex align-items-end">
                  <br/>
                    <button className="btn btn-success" onClick={(e)=>{this.setRange()}}>Get Data</button>
                    
                  </div>
                  <div className="col-3 form-group d-flex align-items-end">
                    <button className="btn btn-info" onClick={(e)=>{this.printStudentSlip()}}>Print</button>
                    
                  </div>
                </div>
                <div className= "row bg-white printStudentSlip  pl-5">
                <div className="col-12 ">
           {this.state.AllStudent !="" ?
              this.state.AllStudent.map((item,index)=>{
                if(parseInt(item.admission_no) >= parseInt(this.state.FromAdmissionNoCopy) && parseInt(item.admission_no) <= parseInt(this.state.ToAdmissionNoCopy)){
                  numberCount=numberCount+1
                return(
                  // {index%4==0 ? :null}
              <div className= "row bg-white  mb-3 pt-5 pb-5" style={{borderBottom:"2px dashed black"}}>
                <div className="col-12 text-center">
                  <h3>  CONSTANCIA SCHOOL</h3>
                  <h6>WEST CANAL ROAD, P.O MAJRA DEHRADUN<br/>
                  0135-2640930,0135-2642828,FAX:0135-2644353
                  </h6>
                  <p className="pt-3"><u><strong>ADMISSION SLIP</strong></u></p>
                </div>
                <div className="col-6 text-center"> <p style={{fontWeight:"900"}}><strong>ADMISSION NO : {item.admission_no}</strong></p></div>
                <div className="col-6 text-center"><p style={{fontWeight:"900"}}><strong>ACCOUNT NO : {item.account_no}</strong></p></div>

                <div className="col-4 " > 
                <p>Name : <strong>{item.student.name}</strong></p>
                <p>Father Name : {item.student.father_name} </p>
                <p>Mother Name : {item.student.mother_name}</p>
                
                </div>
                <div className="col-4 " style={{padding:"0px 60px"}}> 
                <p>Gender : {item.student.sex}</p>
                <p><strong>Class/Section :{item.class_name}/{item.section} </strong></p>
                <p>Category : </p>
              
                </div>
                <div className="col-4 "> 
                <p>DOB : {Moment(item.student.dob).format("DD/MM/YYYY")}   DOA : {Moment(item.student.date_of_admission).format("DD/MM/YYYY")}</p>
                <p>House : {item.student.house}</p>
                </div>
                <div className="col-12" > 
                <p>Address Name : {item.student.parent_address}</p>
                <p>Contact No's : {item.student.parent_mobile} , {item.student.parent_phone} </p>
                </div>
                <div className="col-6  text-center" style={{paddingTop:"20px"}} > 
                <p>(Signature of Accountant)</p>
                </div>
                <div className="col-6  text-center" style={{paddingTop:"20px"}} > 
                <p>(Signature of the Principal)</p>
                </div>
              </div>
                )
                }
              })
               :
                    <lottie-player src="https://assets2.lottiefiles.com/private_files/lf30_uilaciwr.json"  background="transparent"  speed="1"  style={{width: "300px", height: "300px",margin:"auto"}}  loop  autoplay></lottie-player>
                  }
                </div>
                </div>
           
            </>
        )
    }
}
export default StudentSlipByRange;