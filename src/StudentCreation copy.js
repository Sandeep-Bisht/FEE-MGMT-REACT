import React from 'react';
import DataTable from '@bit/adeoy.utils.data-table';
import Moment from 'moment';
import { now } from 'jquery';
class StudentCreation extends React.Component{
    constructor (props){
        super(props)
        this.state={
         session:localStorage.getItem('SessionAccess'),
         date_of_admission:Moment().format('YYYY-MM-DD'),
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
         nationality:'INDIAN',
         last_school:'',
         balance:'',
         changebalance:'',
         fee_concession:'',
         bus_fare_concession:'',
         vehicle_no:'',
         is_teacher_ward:false,
         paid_upto_month:Moment().format('YYYY-MM-DD'),
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
         religion:'',
         
         reg_no:'',
         roll_no:'',
         board_roll_no:'',
         parent_per_address:'',
         parent_per_city:'',
         parent_per_state:'',
         parent_per_country:'',
         gaurdian_per_address:'',
         gaurdian_per_city:'',
         gaurdian_per_state:'',
         gaurdian_per_country:'',
         parentcopyaddress:false,
         gaurdiancopyaddress:false,

         parentcopyaddressASgaurdian:false,

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
         parent_city:'DEHRADUN',
         parent_state:'UTTARAKHAND',
         parent_country:'INDIA',
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
         AllStudentAccount_no:[]
        }
    }
    componentDidMount(){
        this.getadmission_no()
        this.getSession()
        this.getParent()
        this.getClass()
        this.getSection()
        this.getCategory()
        this.getHouse()
        this.getStudent()
        this.getStudentAccount_no()
        // this.getSubjects()
    }
    getSubjects = async(e) => {
        await console.log("wait")
        this.getStudent()
        fetch("http://144.91.110.221:4800/getSubjects")
            .then(res => res.json())
            .then(data => {
                console.log(data)
                this.setState({AllSubjects: data})
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
    getParent = () => {
        fetch("http://144.91.110.221:4800/getParent")
            .then(res => res.json())
            .then(data => {
                console.log(data)
                this.setState({AllParent: data})
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
    getClass = async() => {
        await console.log("wait wait")
        this.getSubjects()
        fetch("http://144.91.110.221:4800/getClass"
        ,{
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          school_id: "100",
          session: this.state.session,
        })
      })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                this.setState({AllClass: data})
                this.getSection()
            })
            .then(err => console.log(err))
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
    getHouse = () => {
        fetch("http://144.91.110.221:4800/getHouse")
            .then(res => res.json())
            .then(data => {
                console.log(data)
                this.setState({AllHouse: data})
            })
            .then(err => console.log(err))
    }
    getStudent = async() => {
        await console.log("wait wait")
        fetch("http://144.91.110.221:4800/getStudent"
            , {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                session: this.state.session,
                school_id:"100"
              })
            })
            .then(res => res.json())
            .then(data => {                
                this.setState({AllStudent:data})
            })
            .then(err => console.log(err))
      }
      getStudentAccount_no = async() => {
        await console.log("wait wait")

        fetch("http://144.91.110.221:4800/getStudentAccount_no"
            , {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                school_id:"100"
              })
            })
            .then(res => res.json())
            .then(data => {              
                this.setState({AllStudentAccount_no:data})
            })
            .then(err => console.log(err))
      }
      
    getadmission_no = async() => {
        await console.log("wait wait")
        fetch("http://144.91.110.221:4800/getadmission_no"
            , {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                session: this.state.session,
                school_id:"100"
              })
            })
            .then(res => res.json())
            .then(data => {                
                this.admission_no(data)
            })
            .then(err => console.log(err))
      }
    admission_no = (data) => {
        if(data != ""){
        var admission_no=parseInt(data.admission_no)+1
        var security_no=parseInt(data.security_no)+1
        var account_no=parseInt(data.account_no)+1
        {this.setState({admission_no:admission_no,security_no:security_no,account_no:account_no})}
        }else{
            this.setState({admission_no:'1',security_no:'5',account_no:'10'})
        }
    }
    checkValidation = () => {
        if (this.state.session === "") {
            this.setState({sessionErrorMessage: "Please Select Session"})
            return false
        }else if (this.state.date_of_admission === "") {
            this.setState({date_of_admissionErrorMessage: "Please Select Date of Admission"})
            return false
        }else if (this.state.class_name === "") {
            this.setState({class_nameErrorMessage: "Please Select Class name"})
            return false
        }else if (this.state.name === "") {
            this.setState({nameErrorMessage: "Please Enter Student Name"})
            return false
        }
        else if (this.state.sex === "") {
            this.setState({sexErrorMessage: "Please Gender"})
            return false
        }else if (this.state.dob === "") {
            this.setState({dobErrorMessage: "Please Select Date Of Birth"})
            return false
        }else if (this.state.account_no === "") {
            this.setState({account_noErrorMessage: "Please Enter Account Number"})
            return false
        }
        // else if (this.state.image === "") {
        //     this.setState({imageErrorMessage: "Please Choose Image"})
        //     return false
        // }
        else {
            return true
        }
      }
    submitStudentData = async() => {
       await console.log(this.state.parent_per_city)
        if(this.checkValidation()){
        const data = new FormData()
        data.append('session', this.state.session)
        data.append('date_of_admission',Moment(this.state.date_of_admission).format('YYYY-MM-DD'))
        data.append('parent', this.state.parent)
        data.append('admission_no', this.state.admission_no)
        data.append('security_no', this.state.security_no)
        data.append('old_admission_no', this.state.old_admission_no)
        data.append('aadhar_no', this.state.aadhar_no)
        data.append('class_name', this.state.class_name)
        data.append('subjects', this.state.subjects)
        data.append('section', this.state.section)
        data.append('is_start_from_first_class', this.state.is_start_from_first_class)
        data.append('last_class', this.state.last_class)
        data.append('category', this.state.category)
        data.append('house', this.state.house)
        data.append('name', this.state.name)
        data.append('sex', this.state.sex)
        data.append('dob', this.state.dob)
        data.append('nationality', this.state.nationality)
        data.append('last_school', this.state.last_school)
        data.append('balance', this.state.balance)
        data.append('fee_concession', this.state.fee_concession)
        data.append('bus_fare_concession', this.state.bus_fare_concession)
        data.append('vehicle_no', this.state.vehicle_no)
        data.append('is_teacher_ward', this.state.is_teacher_ward)
        data.append('paid_upto_month', this.state.paid_upto_month)
        data.append('paid_upto_year', this.state.paid_upto_year)
        data.append('last_school_performance', this.state.last_school_performance)
        data.append('is_full_free_ship', this.state.is_full_free_ship)
        data.append('avail_transport', this.state.avail_transport)
        data.append('take_computer', this.state.take_computer)
        data.append('no_exempt_security_deposit', this.state.no_exempt_security_deposit)
        data.append('ncc', this.state.ncc)
        data.append('no_exempt_registration', this.state.no_exempt_registration)
        data.append('no_exempt_admission', this.state.no_exempt_admission)
        data.append('is_repeater', this.state.is_repeater)
        data.append('misc_details', this.state.misc_details)
        data.append('religion', this.state.religion)

        data.append('account_no', this.state.account_no)
        data.append('father_name', this.state.father_name)
        data.append('mother_name', this.state.mother_name)
        data.append('father_occu', this.state.father_occu)
        data.append('father_designation', this.state.father_designation)
        data.append('father_annual_income', this.state.father_annual_income)
        data.append('mother_occu', this.state.mother_occu)
        data.append('mother_designation', this.state.mother_designation)
        data.append('mother_annual_income', this.state.mother_annual_income)
        data.append('parent_address', this.state.parent_address)
        data.append('parent_city', this.state.parent_city)
        data.append('parent_state', this.state.parent_state)
        data.append('parent_country', this.state.parent_country)
        data.append('parent_per_address', this.state.parent_per_address)
        data.append('parent_per_city', this.state.parent_per_city)
        data.append('parent_per_state', this.state.parent_per_state)
        data.append('parent_per_country', this.state.parent_per_country)
        data.append('parent_phone', this.state.parent_phone)
        data.append('parent_mobile', this.state.parent_mobile)

        data.append('gaurdian_name', this.state.gaurdian_name)
        data.append('gaurdian_occu', this.state.gaurdian_occu)
        data.append('gaurdian_designation', this.state.gaurdian_designation)
        data.append('gaurdian_annual_income', this.state.gaurdian_annual_income)
        data.append('gaurdian_address', this.state.gaurdian_address)
        data.append('gaurdian_city', this.state.gaurdian_city)
        data.append('gaurdian_state', this.state.gaurdian_state)
        data.append('gaurdian_country', this.state.gaurdian_country)
        data.append('gaurdian_per_address', this.state.gaurdian_per_address)
        data.append('gaurdian_per_city', this.state.gaurdian_per_city)
        data.append('gaurdian_per_state', this.state.gaurdian_per_state)
        data.append('gaurdian_per_country', this.state.gaurdian_per_country)
        data.append('gaurdian_phone', this.state.gaurdian_phone)
        data.append('gaurdian_mobile', this.state.gaurdian_mobile)
        data.append('school_id', "100")
        data.append('unique_id', this.state.session+this.state.admission_no)
        data.append('image', this.state.image)
        data.append('image2', this.state.image2)
        data.append('image3', this.state.image3)
        data.append('image4', this.state.image4)
        const url = "http://144.91.110.221:4800/StoreStudent"
        var res =fetch(url, {
                method: 'post',
                body: data
            })
            .then(res => res.json())
            .then(data => {
                alert("Student Created Successfully") 
                this.setState({parent:'',admission_no:'',security_no:'',old_admission_no:'',aadhar_no:'',class_name:'',section:'',subjects:'',is_start_from_first_class:false,last_class:'',category:'',house:'',name:'',sex:'',dob:'',last_school:'',balance:'',changebalance:'',fee_concession:'',bus_fare_concession:'',vehicle_no:'',is_teacher_ward:false,paid_upto_year:'',last_school_performance:'',is_full_free_ship:false,avail_transport:false,take_computer:false,no_exempt_security_deposit:false,ncc:false,no_exempt_registration:false,no_exempt_admission:false,is_repeater:false,other_details:'',misc_details:'',religion:'',reg_no:'',roll_no:'',board_roll_no:'',parent_per_address:'',parent_per_city:'',parent_per_state:'',parent_per_country:'',gaurdian_per_address:'',gaurdian_per_city:'',gaurdian_per_state:'',gaurdian_per_country:'',parentcopyaddress:false,gaurdiancopyaddress:false,parentcopyaddressASgaurdian:false,account_no:'',father_name:'',mother_name:'',father_occu:'',father_designation:'',father_annual_income:'',mother_occu:'',mother_designation:'',mother_annual_income:'',parent_address:'',parent_phone:'',parent_mobile:'',gaurdian_name:'',gaurdian_occu:'',gaurdian_designation:'',gaurdian_annual_income:'',gaurdian_address:'',gaurdian_city:'',gaurdian_state:'',gaurdian_country:'',gaurdian_phone:'',gaurdian_mobile:'',image:'',image2:'',image3:'',image4:'', 
                nationality:'INDIA',
                parent_city:'DEHRADUN',
                parent_state:'UTTARAKHAND',
                parent_country:'INDIA',})
                this.getStudent()   
                this.getadmission_no()  
                this.getClass()
                this.getSection()          
            })
            .then(err => {})
        }
        console.log("error"+JSON.stringify(res))
    }
    is_start_from_first_class(){
             alert(this.state.is_start_from_first_class)
     }
     viewParent=(e)=>{
        const account_no = e.target.value.toUpperCase()
        if(account_no =='0'){
             return false;
        }
        fetch("http://144.91.110.221:4800/singleparentdata"
        , {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                account_no: account_no,
                session:this.state.session
            })
        })
        .then((data) => data.json())
        .then(async (data) => {  
            console.log( 'single parent'+data )    
            this.setState({account_no:data[0].account_no,father_name:data[0].student.father_name,mother_name:data[0].student.mother_name,father_occu:data[0].student.father_occu,father_designation:data[0].student.father_designation,father_annual_income:data[0].student.father_annual_income,mother_occu:data[0].student.mother_occu,mother_designation:data[0].student.mother_designation,mother_annual_income:data[0].student.mother_annual_income,parent_address:data[0].student.parent_address,parent_mobile:data[0].student.parent_mobile,gaurdian_name:data[0].student.gaurdian_name,gaurdian_address:data[0].student.gaurdian_address,gaurdian_mobile:data[0].student.gaurdian_mobile,gaurdian_annual_income:data[0].student.gaurdian_annual_income,gaurdian_occu:data[0].student.gaurdian_occu,gaurdian_designation:data[0].student.gaurdian_designation})
        })
     }
     FeeAmount= async()=>{
      await console.log(this.state.class_name)
        fetch("http://144.91.110.221:4800/FeeAmount"
        , {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                class_name: this.state.class_name,
                section: this.state.section
            })
        })
        .then((data) => data.json())
        .then(async (data) => {  
            if(data[0] != undefined){
                console.log(data[0].total_monthly_fee)
            this.setState({balance:data[0].total_monthly_fee,changebalance:data[0].total_monthly_fee})
            console.log(this.state.balance)
            }
            })
     }
     SelectSubjects = async(e) => {
        let value = Array.from(e.target.selectedOptions, option => option.value);
        await this.setState({subjects:value})
        console.log(this.state.subjects)
      }
      calculateBalance = async(e)=>{
       await this.setState({paid_upto_month:e.target.value.toUpperCase(),balance:this.state.changebalance})
       var d2= new Date(e.target.value)
       var d1 = new Date()
       var months = (d2.getFullYear() - d1.getFullYear()) * 12;

        months -= d1.getMonth()
        months += d2.getMonth()
        
       var newbalance =0
       newbalance = parseInt(this.state.balance) * months
       this.setState({balance:newbalance})
      }
    //   studentBalance=()=>{
    //       alert(this.state.admission_no)
    //   }
    render(){
        const data =[];
        {this.state.AllStudent.map((item,index)=>{
        data.push( {"sr_no":index+1,"name":item.student.name,"admission_no":parseInt(item.student.admission_no),"account_no":parseInt(item.student.account_no),"session":item.session,"class":item.class_name,"section":item.section})
        })}
          const columns = [
            { title: "SR NO", data: "sr_no" },
            { title: "Name", data: "name" },
            { title: 'Admission No',data: "admission_no"},
            { title: 'Account No', data: "account_no"},
            { title: "Session", data: "session" },
            { title: "Class", data: "class" },
            { title: "Section", data: "section" },
          ];
          const click = (row) => {
            console.log(row);
          };
        return(
            <>
            <div className="row layoutCard">
                <div className="col-12">
                    <div className="form-row">
                        <div className="col-12 form-group">
                            <h3>Academic Details</h3>
                        </div>
                        <div className="col-3 form-group">
                            <label>Session *</label>
                           <select className="form-control" value={this.state.session} onChange={(e)=>{this.setState({session:e.target.value.toUpperCase(),sessionErrorMessage:undefined});this.getClass();}}>
                               <option value="">Select Session</option>
                              {this.state.AllSession.map((item,index)=>{
                                  return(
                                    <option value={item.session_code}>{item.session_code}</option>
                                  )
                              })}
                           </select>
                           <span className="errorMessage" style={{fontSize:'14px',fontWeight:600}}>{this.state.sessionErrorMessage}</span>
                        </div>
                        <div className="col-3 form-group">
                            <label>Date Of Admission *</label>
                            <input type="date" className="form-control" value={this.state.date_of_admission} onChange={(e)=>{this.setState({date_of_admission:e.target.value.toUpperCase(),date_of_admissionErrorMessage:undefined})}}/>
                            <span className="errorMessage" style={{fontSize:'14px',fontWeight:600}}>{this.state.date_of_admissionErrorMessage}</span>
                        </div>
                        <div className="col-3 form-group">
                            <label>Admission No  *</label>
                            <input type="text" className="form-control" value={this.state.admission_no} onChange={(e)=>{this.setState({admission_no:e.target.value.toUpperCase()})}} />
                        </div>
                        <div className="col-3 form-group">
                            <label>Security No  </label>
                            <input type="text" className="form-control" defaultValue={this.state.security_no} onChange={(e)=>{this.setState({security_no:e.target.value.toUpperCase()})}}/>
                        </div>
                        {/* <div className="col-3 form-group">
                            <label>Old Admission No</label>
                            <input type="text" className="form-control" onChange={(e)=>{this.setState({old_admission_no:e.target.value.toUpperCase()})}}/>
                        </div> */}
                        <div className="col-3 form-group">
                            <label>Last Class </label>
                           <select className="form-control" onChange={(e)=>{this.setState({last_class:e.target.value.toUpperCase()})}}>
                           <option value="">Select Class</option>
                           {this.state.AllClass.map((item,index)=>{
                                 return(
                                    <option value={item.class_name}>{item.class_name}</option>
                                 )
                             })}
                           </select>
                        </div>
                        <div className="col-3 form-group">
                            <label>Last School</label>
                            <input type="text" className="form-control" onChange={(e)=>{this.setState({last_school:e.target.value.toUpperCase()})}}/>
                        </div>
                        <div className="col-3 form-group">
                            <label>Last School Performance</label>
                            <input type="text" className="form-control" onChange={(e)=>{this.setState({last_school_performance:e.target.value.toUpperCase()})}}/>
                        </div>
                        <div className="col-3 form-group">
                            <label>Paid Upto</label>
                            <input type="date" className="form-control" value={this.state.paid_upto_month}  onChange={(e)=>{this.setState({paid_upto_month:e.target.value.toUpperCase()})}}/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row layoutCard">
                <div className="col-12">
                    <div className="form-row">
                        
                        <div className="col-12 form-group">
                            <h3>Student Details</h3>
                        </div>
                        <div className="col-3 form-group">
                            <label>Class *</label>
                           <select className="form-control" onChange={(e)=>{this.setState({class_name:e.target.value.toUpperCase(),class_nameErrorMessage:undefined });this.FeeAmount();this.getSubjects(e)}} >
                               <option value="">Select Class</option>
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
                           <select className="form-control" onChange={(e)=>{this.setState({section:e.target.value.toUpperCase(),sectionErrorMessage:undefined});this.FeeAmount()}}>
                             <option value="">Select Section</option>
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
                        {/* <div className="col-3 form-group">
                            <div className="form-row" style={{display:'flex',alignItems:'center'}}>
                                <div className="col-1 form-group">
                                    <input id="from_first_class?" type="Checkbox" onChange={(e)=>{this.setState({is_start_from_first_class:e.target.checked})}} className="form-control" />
                                </div>
                                <div className="col-11 form-group">
                                    <label for="from_first_class?">Is Start From First Class ?</label>
                                </div>
                            </div>
                        </div> */}
                        <div className="col-3 form-group">
                            <label>Category</label>
                           <select className="form-control" onChange={(e)=>{this.setState({category:e.target.value.toUpperCase()})}}>
                               <option value="">Select Category</option>
                               {this.state.AllCategory.map((item,index)=>{
                                 return(
                                    <option value={item.category}>{item.category}</option>
                                 )
                             })}
                           </select>
                        </div>
                        <div className="col-3 form-group">
                            <label>House</label>
                           <select className="form-control" value={this.state.house} onChange={(e)=>{this.setState({house:e.target.value.toUpperCase()})}}>
                               <option value="">Select House</option>
                               {this.state.AllHouse.map((item,index)=>{
                                  return(
                                    <option value={item.house_name}>{item.house_name}</option>
                                  )
                              })}
                           </select>
                        </div>
                        <div className="col-3 form-group">
                            <label>Name  *</label>
                            <input type="text" className="form-control" onChange={(e)=>{this.setState({name:e.target.value.toUpperCase(),nameErrorMessage:undefined})}}/>
                            <span className="errorMessage" style={{fontSize:'14px',fontWeight:600}}>{this.state.nameErrorMessage}</span>
                        </div>
                        <div className="col-3 form-group">
                            <label>Gender</label>
                           <select className="form-control" value={this.state.sex} onChange={(e)=>{this.setState({sex:e.target.value.toUpperCase(),sexErrorMessage:undefined})}}>
                               <option value="">Select Gender</option>
                               <option value="MALE">MALE</option>
                               <option value="FEMALE">FEMALE</option>
                           </select>
                           <span className="errorMessage" style={{fontSize:'14px',fontWeight:600}}>{this.state.sexErrorMessage}</span>
                        </div>
                        <div className="col-3 form-group">
                            <label>DOB  *</label>
                            <input type="date" className="form-control" onChange={(e)=>{this.setState({dob:e.target.value.toUpperCase(),dobErrorMessage:undefined})}}/>
                            <span className="errorMessage" style={{fontSize:'14px',fontWeight:600}}>{this.state.dobErrorMessage}</span>
                        </div>
                        <div className="col-3 form-group">
                            <label>Nationality</label>
                            <input type="text" className="form-control" value={this.state.nationality} onChange={(e)=>{this.setState({nationality:e.target.value.toUpperCase()})}}/>
                        </div>
                        <div className="col-3 form-group">
                            <label>Aadhar No </label>
                            <input type="text" className="form-control" onChange={(e)=>{this.setState({aadhar_no:e.target.value.toUpperCase()})}}/>
                        </div>
                        <div className="col-3 form-group">
                            <label>Registration No </label>
                            <input type="text" className="form-control" onChange={(e)=>{this.setState({reg_no:e.target.value.toUpperCase()})}}/>
                        </div>
                        <div className="col-3 form-group">
                            <label>Roll No </label>
                            <input type="text" className="form-control" onChange={(e)=>{this.setState({roll_no:e.target.value.toUpperCase()})}}/>
                        </div>
                        <div className="col-3 form-group">
                            <label>Board Roll No </label>
                            <input type="text" className="form-control" onChange={(e)=>{this.setState({board_roll_no:e.target.value.toUpperCase()})}}/>
                        </div>
                        <div className="col-3 form-group">
                            <label>Subject *</label>
                           <select className="form-control" multiple={true} onChange={(e)=>{this.SelectSubjects(e)}} >
                             <option value="">Select Subjects</option>
                             {this.state.AllSubjects.map((item,index)=>{
                                 if(item.class_name=== this.state.class_name){
                                 return(
                                    <option value={item.subject}>{item.subject }</option>
                                 )
                                 }
                             })}
                           </select>
                        </div>
                        <div className="col-3 form-group">
                            <label>Religion</label>
                            <select className="form-control" onChange={(e)=>{this.setState({religion:e.target.value})}}>
                                <option value="">Choose Religion</option>
                                <option value="HINDUISM">HINDUISM</option>
                                <option value="ISLAM">ISLAM</option>
                                <option value="CHRISTANITY">CHRISTANITY</option>
                                <option value="SIKHISM">SIKHISM</option>
                                <option value="BUDDHISM">BUDDHISM</option>
                                <option value="JAINISM">JAINISM</option>
                            </select>
                        </div>
                        <div className="col-3 form-group">
                            <label>Other Details</label>
                            <input type="text" className="form-control" onChange={(e)=>{this.setState({other_details:e.target.value.toUpperCase()})}}/>
                        </div>
                        <div className="col-3 form-group">
                            <label>Misc Details</label>
                            <input type="text" className="form-control" onChange={(e)=>{this.setState({misc_details:e.target.value.toUpperCase()})}}/>
                        </div>
                        <div className="col-3 form-group">
                            <label>Admission Form</label>
                            <input type="file" onChange={(e)=>{this.setState({image:e.target.files[0],imageErrorMessage:undefined})}}/>
                            <span className="errorMessage" style={{fontSize:'14px',fontWeight:600}}>{this.state.imageErrorMessage}</span>
                        </div>
                        <div className="col-3 form-group">
                            <label>Photo 2</label>
                            <input type="file"  onChange={(e)=>{this.setState({image2:e.target.files[0]})}}/>
                            {/* <span className="errorMessage" style={{fontSize:'14px',fontWeight:600}}>{this.state.imageErrorMessage}</span> */}
                        </div>
                        <div className="col-3 form-group">
                            <label>Photo 3</label>
                            <input type="file"  onChange={(e)=>{this.setState({image3:e.target.files[0]})}}/>
                            {/* <span className="errorMessage" style={{fontSize:'14px',fontWeight:600}}>{this.state.imageErrorMessage}</span> */}
                        </div>
                        <div className="col-3 form-group">
                            <label>Photo 4</label>
                            <input type="file"  onChange={(e)=>{this.setState({image4:e.target.files[0]})}}/>
                            {/* <span className="errorMessage" style={{fontSize:'14px',fontWeight:600}}>{this.state.imageErrorMessage}</span> */}
                        </div>
                        {/* <div className="col-3 form-group">
                            <label>Paid Up To</label>
                            <input type="date" className="form-control" onChange={(e)=>{this.calculateBalance(e)}}/>
                        </div> */}
                    </div>
                </div>
            </div>
            <div className="row layoutCard">
                <div className="col-12">
                    <div className="form-row">
                        <div className="col-12 form-group">
                            <h3>Fee Details</h3>
                        </div>
                        {/* <div className="col-3 form-group">
                            <label>Balance</label>
                            <input type="text" className="form-control" value={this.state.balance} onChange={(e)=>{this.setState({balance:e.target.value.toUpperCase()})}}/>
                        </div> */}
                        <div className="col-3 form-group">
                            <label>Fee Concession % </label>
                            <input type="text" className="form-control" onChange={(e)=>{this.setState({fee_concession:e.target.value.toUpperCase()})}}/>
                        </div>
                        <div className="col-3 form-group">
                            <div className="form-row" style={{display:'flex',alignItems:'center'}}>
                                <div className="col-2 form-group">
                                    <input id="avail_transport?" type="Checkbox" className="form-control" onChange={(e)=>{this.setState({avail_transport:e.target.checked})}}/>
                                </div>
                                <div className="col-10 form-group">
                                    <label for="avail_transport?">Avail Transport ?</label>
                                </div>
                            </div>
                        </div>
                        <div className="col-3 form-group">
                            <label>Bus Fare Concession % </label>
                            <input type="text" className="form-control" onChange={(e)=>{this.setState({bus_fare_concession:e.target.value.toUpperCase()})}}/>
                        </div>
                        <div className="col-3 form-group">
                            <label>Vehicle No </label>
                            <input type="text" className="form-control" onChange={(e)=>{this.setState({vehicle_no:e.target.value.toUpperCase()})}}/>
                        </div>
                        <div className="col-3 form-group">
                            <div className="form-row" style={{display:'flex',alignItems:'center'}}>
                                <div className="col-2 form-group">
                                    <input id="is_full_free_ship" type="Checkbox" className="form-control" onChange={(e)=>{this.setState({is_full_free_ship:e.target.checked})}}/>
                                </div>
                                <div className="col-10 form-group">
                                    <label for="is_full_free_ship">Is Full Free Ship ?</label>
                                </div>
                            </div>
                        </div>
                        <div className="col-3 form-group">
                            <div className="form-row" style={{display:'flex',alignItems:'center'}}>
                                <div className="col-2 form-group">
                                    <input id="is_teacher_ward?" type="Checkbox" className="form-control" onChange={(e)=>{this.setState({is_teacher_ward:e.target.checked})}}/>
                                </div>
                                <div className="col-10 form-group">
                                    <label for="is_teacher_ward?">Is Teacher Ward ?</label>
                                </div>
                            </div>
                        </div>
                       
                        <div className="col-3 form-group">
                            <div className="form-row" style={{display:'flex',alignItems:'center'}}>
                                <div className="col-2 form-group">
                                    <input id="FirstCLass?" type="Checkbox" className="form-control" onChange={(e)=>{this.setState({take_computer:e.target.checked})}}/>
                                </div>
                                <div className="col-10 form-group">
                                    <label for="FirstCLass?">Take Computer</label>
                                </div>
                            </div>
                        </div>
                        {/* <div className="col-3 form-group">
                            <div className="form-row" style={{display:'flex',alignItems:'center'}}>
                                <div className="col-1 form-group">
                                    <input id="FirstCLass?" type="Checkbox" className="form-control" onChange={(e)=>{this.setState({ncc:e.target.checked})}}/>
                                </div>
                                <div className="col-11 form-group">
                                    <label for="FirstCLass?">NCC</label>
                                </div>
                            </div>
                        </div> */}
                        {/* <div className="col-3 form-group">
                            <div className="form-row" style={{display:'flex',alignItems:'center'}}>
                                <div className="col-1 form-group">
                                    <input id="FirstCLass?" type="Checkbox" className="form-control" onChange={(e)=>{this.setState({no_exempt_registration:e.target.checked})}}/>
                                </div>
                                <div className="col-11 form-group">
                                    <label for="FirstCLass?">No Exempt Registration</label>
                                </div>
                            </div>
                        </div> */}
                        {/* <div className="col-3 form-group">
                            <div className="form-row" style={{display:'flex',alignItems:'center'}}>
                                <div className="col-1 form-group">
                                    <input id="FirstCLass?" type="Checkbox" className="form-control" onChange={(e)=>{this.setState({no_exempt_admission:e.target.checked})}}/>
                                </div>
                                <div className="col-11 form-group">
                                    <label for="FirstCLass?">No Exempt Admission</label>
                                </div>
                            </div>
                        </div> */}
                        {/* <div className="col-3 form-group">
                            <div className="form-row" style={{display:'flex',alignItems:'center'}}>
                                <div className="col-1 form-group">
                                    <input id="FirstCLass?" type="Checkbox" className="form-control" onChange={(e)=>{this.setState({no_exempt_security_deposit:e.target.checked})}}/>
                                </div>
                                <div className="col-11 form-group">
                                    <label for="FirstCLass?">No Exempt Security Deposit</label>
                                </div>
                            </div>
                        </div> */}
                        <div className="col-3 form-group">
                            <div className="form-row" style={{display:'flex',alignItems:'center'}}>
                                <div className="col-2 form-group">
                                    <input id="FirstCLass?" type="Checkbox" className="form-control" onChange={(e)=>{this.setState({is_repeater:e.target.checked})}}/>
                                </div>
                                <div className="col-10 form-group">
                                    <label for="FirstCLass?">Is Repeater</label>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
            <div className="row layoutCard">
                <div className="col-12">
                    <div className="form-row">
                        <div className="col-12 form-group">
                            <h3>Parent Details</h3>
                        </div>
                        <div className="col-3 form-group">
                           <label>Parent/Gaurdian Account No </label>
                           <select className="form-control" onChange={(e)=>{this.setState({parent:e.target.value.toUpperCase()});this.viewParent(e)}}>
                             <option value="0">Select Account no.</option>
                             {this.state.AllStudentAccount_no.map((item,index)=>{
                                 return(
                                    <option value={item.student.account_no}>{item.student.account_no}</option>
                                 )
                             })}
                           </select>
                        </div>
                        <div className="col-3 form-group">
                            <label>Account No *</label>
                            <input type="text" className="form-control" value={this.state.account_no} onChange={(e)=>{{this.setState({account_no:e.target.value.toUpperCase(),account_noErrorMessage:undefined})}}}/> 
                            <span className="errorMessage" style={{fontSize:'14px',fontWeight:600}}>{this.state.account_noErrorMessage}</span>
                        </div>
                        <div className="col-3 form-group">
                            <label>Whatsapp No</label>
                            <input type="text" className="form-control" value={this.state.parent_phone} onChange={(e)=>{{this.setState({parent_phone:e.target.value.toUpperCase()})}}}/>
                        </div>
                        <div className="col-3 form-group">
                            <label>Mobile No</label>
                            <input type="text" className="form-control" value={this.state.parent_mobile} onChange={(e)=>{{this.setState({parent_mobile:e.target.value.toUpperCase()})}}}/>
                        </div>
                        <div className="col-3 form-group">
                            <label>Father Name *</label>
                            <input type="text" className="form-control" value={this.state.father_name} onChange={(e)=>{{this.setState({father_name:e.target.value.toUpperCase()})}}}/>
                        </div>
                        <div className="col-3 form-group">
                            <label>Father Occu. </label>
                            <input type="text" className="form-control"value={this.state.father_occu}  onChange={(e)=>{{this.setState({father_occu:e.target.value.toUpperCase()})}}}/>
                        </div>
                        <div className="col-3 form-group">
                            <label>Father Designation </label>
                            <input type="text" className="form-control" value={this.state.father_designation} onChange={(e)=>{{this.setState({father_designation:e.target.value.toUpperCase()})}}}/>
                        </div>
                        <div className="col-3 form-group">
                            <label>Father Annual Income </label>
                            <input type="text" className="form-control" value={this.state.father_annual_income} onChange={(e)=>{{this.setState({father_annual_income:e.target.value.toUpperCase()})}}}/>
                        </div>
                        <div className="col-3 form-group">
                            <label>Mother Name *</label>
                            <input type="text" className="form-control" value={this.state.mother_name} onChange={(e)=>{{this.setState({mother_name:e.target.value.toUpperCase()})}}}/>
                        </div>
                        <div className="col-3 form-group">
                            <label>Mother Occu </label>
                            <input type="text" className="form-control" value={this.state.mother_occu} onChange={(e)=>{{this.setState({mother_occu:e.target.value.toUpperCase()})}}}/>
                        </div>
                        <div className="col-3 form-group">
                            <label>Mother Designation </label>
                            <input type="text" className="form-control" value={this.state.mother_designation} onChange={(e)=>{{this.setState({mother_designation:e.target.value.toUpperCase()})}}}/>
                        </div>
                        <div className="col-3 form-group">
                            <label>Mother Annual Income </label>
                            <input type="text" className="form-control" value={this.state.mother_annual_income} onChange={(e)=>{{this.setState({mother_annual_income:e.target.value.toUpperCase()})}}}/>
                        </div>
                     
                        <div className="col-12 form-group">
                        <h5 className="text-center text-success">Present Address</h5>
                        </div>
                        <div className="col-3 form-group">
                            <label> Address</label>
                            <input type="text" className="form-control" value={this.state.parent_address} onChange={(e)=>{{this.setState({parent_address:e.target.value.toUpperCase()})}}}/>
                        </div>
                        <div className="col-3 form-group">
                            <label> City</label>
                            <input type="text" className="form-control" value={this.state.parent_city} onChange={(e)=>{{this.setState({parent_city:e.target.value.toUpperCase()})}}}/>
                        </div>
                        <div className="col-3 form-group">
                            <label> State</label>
                            <input type="text" className="form-control" value={this.state.parent_state} onChange={(e)=>{{this.setState({parent_state:e.target.value.toUpperCase()})}}}/>
                        </div>
                        <div className="col-3 form-group">
                            <label> Country</label>
                            <input type="text" className="form-control" value={this.state.parent_country} onChange={(e)=>{{this.setState({parent_country:e.target.value.toUpperCase()})}}}/>
                        </div>
                        <div className="col-12 form-group">
                        <h5 className="text-center text-success ">Permanent Address</h5>
                        <button className="btn btn-success btn-xs" onClick={()=>{if(this.state.parentcopyaddress==true){this.setState({parentcopyaddress:false,parent_per_city:this.state.parent_city,parent_per_state:this.state.parent_state,parent_per_country:this.state.parent_country,parent_per_address:this.state.parent_address})}else{this.setState({parentcopyaddress:true})}}}>Copy Present Address</button>
                        </div>
                        <div className="col-3 form-group">
                            <label> Address</label>
                            <input type="text" className="form-control" defaultValue= {this.state.parent_per_address} onChange={(e)=>{{this.setState({parent_per_address:e.target.value.toUpperCase()})}}}/>
                        </div>
                        <div className="col-3 form-group">
                            <label> City</label>
                            <input type="text" className="form-control" defaultValue= {this.state.parent_per_city}  onChange={(e)=>{{this.setState({parent_per_city:e.target.value.toUpperCase()})}}}/>
                        </div>
                        <div className="col-3 form-group">
                            <label> State</label>
                            <input type="text" className="form-control" defaultValue= {this.state.parent_per_state} onChange={(e)=>{{this.setState({parent_per_state:e.target.value.toUpperCase()})}}}/>
                        </div>
                        <div className="col-3 form-group">
                            <label> Country</label>
                            <input type="text" className="form-control" defaultValue= {this.state.parent_per_country} onChange={(e)=>{{this.setState({parent_per_country:e.target.value.toUpperCase()})}}}/>
                        </div>
                     
                        <div className="col-12 form-group">
                           <h3 className="text-center">Gaurdian Details<button className="btn btn-info btn-xs ml-2" onClick={()=>{if(this.state.parentcopyaddressASgaurdian==true){this.setState({parentcopyaddressASgaurdian:false,gaurdian_city:this.state.parent_city,gaurdian_state:this.state.parent_state,gaurdian_country:this.state.parent_country,gaurdian_address:this.state.parent_address})}else{this.setState({parentcopyaddressASgaurdian:true})}}}>Copy Parent Address</button></h3>
                        </div>
                        <div className="col-3 form-group">
                            <label>Name</label>
                            <input type="text" className="form-control" value={this.state.gaurdian_name} onChange={(e)=>{{this.setState({gaurdian_name:e.target.value.toUpperCase()})}}}/>
                        </div>
                        <div className="col-3 form-group">
                            <label>Whatsapp No</label>
                            <input type="text" className="form-control" value={this.state.gaurdian_phone} onChange={(e)=>{{this.setState({gaurdian_phone:e.target.value.toUpperCase()})}}}/>
                        </div>
                        <div className="col-3 form-group">
                            <label>Mobile No</label>
                            <input type="text" className="form-control" value={this.state.gaurdian_mobile} onChange={(e)=>{{this.setState({gaurdian_mobile:e.target.value.toUpperCase()})}}}/>
                        </div>
                        <div className="col-3 form-group">
                            <label>Occu.</label>
                            <input type="text" className="form-control" value={this.state.gaurdian_occu} onChange={(e)=>{{this.setState({gaurdian_occu:e.target.value.toUpperCase()})}}}/>
                        </div>
                        <div className="col-3 form-group">
                            <label>Designation</label>
                            <input type="text" className="form-control" value={this.state.gaurdian_designation} onChange={(e)=>{{this.setState({gaurdian_designation:e.target.value.toUpperCase()})}}}/>
                        </div>
                        <div className="col-3 form-group">
                            <label>Annual Income</label>
                            <input type="text" className="form-control" value={this.state.gaurdian_annual_income} onChange={(e)=>{{this.setState({gaurdian_annual_income:e.target.value.toUpperCase()})}}}/>
                        </div>
                        <div className="col-12 form-group">
                        <h5 className="text-center text-success">Present Address</h5>
                        </div>
                        <div className="col-3 form-group">
                            <label>Address</label>
                            <input type="text" className="form-control" value={this.state.gaurdian_address} onChange={(e)=>{{this.setState({gaurdian_address:e.target.value.toUpperCase()})}}}/>
                        </div>
                        <div className="col-3 form-group">
                            <label>City</label>
                            <input type="text" className="form-control" value={this.state.gaurdian_city} onChange={(e)=>{{this.setState({gaurdian_city:e.target.value.toUpperCase()})}}}/>
                        </div>
                        <div className="col-3 form-group">
                            <label>State</label>
                            <input type="text" className="form-control" value={this.state.gaurdian_state} onChange={(e)=>{{this.setState({gaurdian_state:e.target.value.toUpperCase()})}}}/>
                        </div>
                        <div className="col-3 form-group">
                            <label>Country</label>
                            <input type="text" className="form-control" value={this.state.gaurdian_country} onChange={(e)=>{{this.setState({gaurdian_country:e.target.value.toUpperCase()})}}}/>
                        </div>
                        <div className="col-12 form-group">
                        <h5 className="text-center text-success">Permanent Address</h5>
                        <button className="btn btn-success btn-xs" onClick={()=>{if(this.state.gaurdiancopyaddress==true){this.setState({gaurdiancopyaddress:false,gaurdian_per_city:this.state.gaurdian_city,gaurdian_per_state:this.state.gaurdian_state,gaurdian_per_country:this.state.gaurdian_country,gaurdian_per_address:this.state.gaurdian_address})}else{this.setState({gaurdiancopyaddress:true})}}}>Copy Present Address</button>
                        </div>
                        <div className="col-3 form-group">
                            <label> Address</label>
                            <input type="text" className="form-control" defaultValue= {this.state.gaurdian_per_address} onChange={(e)=>{{this.setState({gaurdian_per_address:e.target.value.toUpperCase()})}}}/>
                        </div>
                        <div className="col-3 form-group">
                            <label> City</label>
                            <input type="text" className="form-control" defaultValue= {this.state.gaurdian_per_city}  onChange={(e)=>{{this.setState({gaurdian_per_city:e.target.value.toUpperCase()})}}}/>
                        </div>
                        <div className="col-3 form-group">
                            <label> State</label>
                            <input type="text" className="form-control" defaultValue= {this.state.gaurdian_per_state} onChange={(e)=>{{this.setState({gaurdian_per_state:e.target.value.toUpperCase()})}}}/>
                        </div>
                        <div className="col-3 form-group">
                            <label> Country</label>
                            <input type="text" className="form-control" defaultValue= {this.state.gaurdian_per_country} onChange={(e)=>{{this.setState({gaurdian_per_country:e.target.value.toUpperCase()})}}}/>
                        </div>
                       
                        <div className="col-12 form-group">
                         <label> </label>
                         <button className="btn btn-info btn-block"  onClick={()=>{this.submitStudentData()}}>Save</button>
                        </div>
                    </div>
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
                onClickRow={click}
                />
                </div>
            </div>
            </>
        )
    }
}
export default StudentCreation;