import React from 'react';
import DataTable from '@bit/adeoy.utils.data-table';
import Moment from 'moment';
class TransferCertificate extends React.Component{
    constructor(props){
        super(props)
        this.state={
            _id:'',
            session:localStorage.getItem('SessionAccess'),
            vehicle_type:'',
            AllVehicleType:[],
            updateBtn:'',
            AllBank:[],
            AllCategory:[],
            AllClass:[],
            AllHouse:[],
            AllSection:[],


            date_of_tc:Moment().format('YYYY-MM-DD'),
            date_of_application:Moment().format('YYYY-MM-DD'),
            left_on:Moment().format('YYYY-MM-DD'),
            admission_no:'',
            name:'',
            account_no:'',
            parents:'',
            class_name:'',
            section:'',
            category:'',
            nationality:'',
            date_of_admission:'',
            dob:'',
            house:'',
            address:'',
            security_deposit:'',
            return_mode:'BANK',
            bank:'SBI',
            tc_no:'',
            cheque_no:'',
            date_of_cheque:Moment().format('YYYY-MM-DD'),
            reason:'',
            working_days:'',
            present_days:'',
            is_promoted:'',
            promoted_in:'',
            result:'',
            last_school:'',
            result_remark:'',
            concession:'',
            concession_remark:'',
            games_remark:'',
            other_remark:'',
            conduct:'',
            parent_address:'',
            parent_city:'',
            parent_state:'',
            parent_country:'',
            father_name:'',
            mother_name:'',
            student_id:'',
            academic_id:''

        }
    }
    componentDidMount(){
        this.getBankData()
        this.getCategory()
        this.getClass()
        this.getHouse()
        this.getSection()
    }
    searchByAdmission_noForTc= async (e)=>{
        // this.setState({})
        await console.log("wait")
        console.log("checking response search by addmission no")
        const admission_no = this.state.admission_no
        if(admission_no =='0'){
             return false;
        }
        fetch("http://144.91.210.221:4800/searchByAdmission_noForTc"
            ,{
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                session: this.state.session,
                admission_no: admission_no,
                school_id:"UT015",
              })
            })
        .then((data) => data.json())
        .then(async (data) => {  
            if(data[0] !=undefined){
                // balance:data[0].balance,
                if(data[0].student.tc_status !=1){
                this.setState({_id:data[0]._id,account_no:data[0].account_no,name:data[0].student.name,class_name:data[0].class_name,section:data[0].section,avail_transport:data[0].student.avail_transport,is_full_free_ship:data[0].student.is_full_free_ship,is_teacher_ward:data[0].student.is_teacher_ward,take_computer:data[0].student.take_computer,ncc:data[0].student.ncc,no_exempt_registration:data[0].student.no_exempt_registration,tc_status:data[0].student.tc_status,fee_concession:data[0].student.fee_concession,no_exempt_admission:data[0].student.no_exempt_admission,no_exempt_security_deposit:data[0].student.no_exempt_security_deposit,is_repeater:data[0].student.is_repeater,paid_upto_month:data[0].student.paid_upto_month,father_name:data[0].student.father_name,mother_name:data[0].student.mother_name,parent_mobile:data[0].student.parent_mobile,parent_phone:data[0].student.parent_phone,dob:data[0].student.dob,house:data[0].student.house,parent_address:data[0].student.parent_address,parent_city:data[0].student.parent_city,parent_state:data[0].student.parent_state,parent_country:data[0].student.parent_country,date_of_admission:data[0].student.date_of_admission,nationality:data[0].student.nationality,student_id:data[0].student._id,academic_id:data[0]._id,address:data[0].student.parent_address+","+data[0].student.parent_city+","+data[0].student.parent_state+","+data[0].student.parent_country+","})
               this.SearchOldfee()
                }else{
                    alert("TC ALREADY GIVEN !")
                    this.setState({_id:"",account_no:"",name:"",class_name:"",section:"",avail_transport:"",is_full_free_ship:"",is_teacher_ward:"",take_computer:"",ncc:"",no_exempt_registration:"",tc_status:"",fee_concession:"",no_exempt_admission:"",no_exempt_security_deposit:"",is_repeater:"",paid_upto_month:"",father_name:"",mother_name:"",parent_mobile:"",parent_phone:"",dob:"",house:"",parent_address:"",parent_city:"",parent_state:"",parent_country:"",date_of_admission:"", address:'',nationality:'',
                    security_deposit:'',
                    return_mode:'BANK',
                    bank:'',
                    tc_no:'',
                    cheque_no:'',
                    reason:'',
                    working_days:'',
                    is_promoted:'',
                    promoted_in:'',
                    result:'',
                    last_school:'',
                    result_remark:'',
                    concession:'',
                    concession_remark:'',
                    games_remark:'',
                    other_remark:'',
                    conduct:'',
                    student_id:'',
                    academic_id:''
                })
                }
            }
            else{
                alert("TC ALREADY GIVEN !")
                this.setState({_id:"",account_no:"",name:"",class_name:"",section:"",avail_transport:"",is_full_free_ship:"",is_teacher_ward:"",take_computer:"",ncc:"",no_exempt_registration:"",tc_status:"",fee_concession:"",no_exempt_admission:"",no_exempt_security_deposit:"",is_repeater:"",paid_upto_month:"",father_name:"",mother_name:"",parent_mobile:"",parent_phone:"",dob:"",house:"",parent_address:"",parent_city:"",parent_state:"",parent_country:"",date_of_admission:"", address:'',nationality:'',
                security_deposit:'',
                return_mode:'BANK',
                bank:'',
                tc_no:'',
                cheque_no:'',
                reason:'',
                working_days:'',
                is_promoted:'',
                promoted_in:'',
                result:'',
                last_school:'',
                result_remark:'',
                concession:'',
                concession_remark:'',
                games_remark:'',
                other_remark:'',
                conduct:'',
                student_id:'',
                academic_id:''
            })
            }
        })
    }
    SearchOldfee= async()=>{
       await  console.log("wait wait")
       fetch("http://144.91.210.221:4800/SearchOldfee"
       ,{
           method: 'POST',
           headers: {
               Accept: 'application/json',
               'Content-Type': 'application/json'
           },
           body: JSON.stringify({
               admission_no: this.state.admission_no
           })
       })
       .then((data) => data.json())
       .then(async (data) => {  
           console.log( 'single parent'+data )  
           if(data[0] !=undefined){
            data.map((item,index)=>{
                    if(item.security_fee != '0' )
                    {
                    this.setState({security_deposit:item.security_fee}) 
                    }
             })   
           }
       })
   }
    getSection = () => {
        fetch("http://144.91.210.221:4800/getSection"
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
            .then(err => console.log(err))
    }
    getClass = async() => {
        await console.log("wait wait")
        fetch("http://144.91.210.221:4800/getClass"
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
            .then(err => console.log(err))
    }
    getCategory = () => {
        fetch("http://144.91.210.221:4800/getCastCategory")
            .then(res => res.json())
            .then(data => {
                console.log(data)
                this.setState({AllCategory: data})
            })
            .then(err => console.log(err))
    }
    getHouse = () => {
        fetch("http://144.91.210.221:4800/getHouse")
            .then(res => res.json())
            .then(data => {
                console.log(data)
                this.setState({AllHouse: data})
            })
            .then(err => console.log(err))
    }
    getBankData = () => {
        fetch("http://144.91.210.221:4800/getBankData"
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
                console.log(data)
                this.setState({AllBank: data})
                console.log(data)
            })
            .then(err => console.log(err))
    }

    //   checkValidation = () => {
    //     if (this.state.vehicle_type === "") {
    //         this.setState({Vehicle_typeErrorMessage: "Please Enter Vehicle Type"})
    //         return false
    //     }else {
    //         return true
    //     }
    //   }
    submitTcData = () => {
        // if (this.checkValidation()) {
        const data = new FormData()
        data.append('student_id', this.state.student_id)
        data.append('academic_id', this.state.academic_id)

        data.append('session', this.state.session)
        data.append('tc_status', "1")
        data.append('date_of_tc', this.state.date_of_tc)
        data.append('date_of_cheque', this.state.date_of_cheque)
        
        data.append('date_of_application', this.state.date_of_application)
        data.append('admission_no', this.state.admission_no)
        data.append('name', this.state.name)
        data.append('account_no', this.state.account_no)
        data.append('parents', this.state.parents)
        data.append('class_name', this.state.class_name)
        data.append('section', this.state.section)
        data.append('category', this.state.category)
        data.append('nationality', this.state.nationality)
        data.append('date_of_admission', this.state.date_of_admission)
        data.append('dob', this.state.dob)
        data.append('house', this.state.house)
        data.append('address', this.state.address)
        data.append('security_deposit', this.state.security_deposit)
        data.append('return_mode', this.state.return_mode)
        data.append('bank', this.state.bank)
        data.append('tc_no', this.state.tc_no)
        data.append('cheque_no', this.state.cheque_no)
        data.append('reason', this.state.reason)
        data.append('working_days', this.state.working_days)
        data.append('present_days', this.state.present_days)
        data.append('is_promoted', this.state.is_promoted)
        data.append('promoted_in', this.state.promoted_in)

        data.append('result', this.state.result)
        data.append('last_school', this.state.last_school)
        data.append('result_remark', this.state.result_remark)
        data.append('concession', this.state.concession)
        data.append('concession_remark', this.state.concession_remark)
        data.append('games_remark', this.state.games_remark)
        data.append('other_remark', this.state.other_remark)
        data.append('left_on', this.state.left_on)
        
        data.append('conduct', this.state.conduct)
       

        const url = "http://144.91.210.221:4800/StoreTcDetails"
        fetch(url, {
                method: 'post',
                body: data
            })
            .then(res => res.json())
            .then(data => {
                alert("Details Store Successfully") 
                this.setState({ 
                admission_no:'',name:'',account_no:'',parents:'',class_name:'',section:'',category:'',nationality:'',date_of_admission:'',dob:'',house:'',address:'',security_deposit:'',return_mode:'',bank:'',tc_no:'',cheque_no:'',reason:'',working_days:'',present_days:'',is_promoted:'',promoted_in:'',result:'',last_school:'',result_remark:'',concession:'',concession_remark:'',games_remark:'',other_remark:'',conduct:'',parent_address:'',parent_city:'',parent_state:'',parent_country:'',father_name:'',mother_name:'',student_id:'',academic_id:''})             
            })
            .then(err => {})
        // }
    }
    render(){
    
        const data =[];
        {this.state.AllVehicleType.map((item,index)=>{
        data.push( {"sr_no":index+1,"vehicle_type":item.vehicle_type,"action":<td><button className="btn btn-secondary mr-2" onClick={() => this.editVehicleTypeObject(item)}><i class="fas fa-pencil-alt"></i></button><button onClick = { () => this.deleteVehicleType(item._id)}className="btn btn-danger"><i className="fa fa-trash" aria-hidden="true"></i></button></td>})
        })}
          const columns = [
            { title: "SR NO", data: "sr_no" },
            { title: "Vehicle Type", data: "vehicle_type" },
            { title: "Action", data: "action" },
          ];
          const click = (row) => {
            console.log(row);
          };
        return(
            <>
            <div className="row layoutCard">
                <div className="col-12">
                    <div className="form-row">
                        <div className="col-3 form-group">
                            <label>Date Of TC</label>
                            <input type="date" className="form-control" value={this.state.date_of_tc} onChange={(e)=>{{this.setState({date_of_tc:e.target.value.toUpperCase()})}}}/>
                        </div>
                        <div className="col-3 form-group">
                            <label>Date Of Application</label>
                            <input type="date" className="form-control" value={this.state.date_of_application}  onChange={(e)=>{{this.setState({date_of_application:e.target.value.toUpperCase()})}}}/>
                        </div>
                        <div className="col-3 form-group">
                            <label>Left On</label>
                            <input type="date" className="form-control" value={this.state.left_on}  onChange={(e)=>{{this.setState({left_on:e.target.value.toUpperCase()})}}}/>
                        </div>
                        <div className="col-3 form-group">
                            <label>Admission No</label>
                            <input type="text" className="form-control" value={this.state.admission_no}  onChange={(e)=>{{this.setState({admission_no:e.target.value.toUpperCase()})}}} onKeyPress={(e)=>{if(e.key === 'Enter'){this.searchByAdmission_noForTc() }}} />
                        </div>
                        <div className="col-3 form-group">
                            <label>Student</label>
                            <input type="text" className="form-control" value={this.state.name}  onChange={(e)=>{{this.setState({name:e.target.value.toUpperCase()})}}}/>
                        </div>
                        <div className="col-3 form-group">
                            <label>Account No</label>
                            <input type="text" className="form-control"  value={this.state.account_no} onChange={(e)=>{{this.setState({account_no:e.target.value.toUpperCase()})}}}/>
                        </div>
                        <div className="col-3 form-group">
                            <label>Parents</label>
                            <input type="text" className="form-control" value={this.state.father_name+"/"+this.state.mother_name}  onChange={(e)=>{{this.setState({parents:e.target.value.toUpperCase()})}}}/>
                        </div>
                        <div className="col-3 form-group">
                            <label>Class *</label>
                           <select className="form-control" value={this.state.class_name} onChange={(e)=>{this.setState({class_name:e.target.value.toUpperCase(),class_nameErrorMessage:undefined })}} >
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
                            <label>Section </label>
                           <select className="form-control" value={this.state.section} onChange={(e)=>{this.setState({section:e.target.value.toUpperCase(),sectionErrorMessage:undefined})}}>
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
                        <div className="col-3 form-group">
                            <label>Category</label>
                           <select className="form-control" value={this.state.category} onChange={(e)=>{this.setState({category:e.target.value.toUpperCase()})}}>
                               <option value="">Select Category</option>
                               {this.state.AllCategory.map((item,index)=>{
                                 return(
                                    <option value={item.category}>{item.category}</option>
                                 )
                             })}
                           </select>
                        </div>
                        <div className="col-3 form-group">
                            <label>Nationality</label>
                            <input type="text" className="form-control" value={this.state.nationality}  onChange={(e)=>{{this.setState({nationality:e.target.value.toUpperCase()})}}}/>
                        </div>
                        <div className="col-3 form-group">
                            <label>Date of admission</label>
                            <input type="date" className="form-control" value={this.state.date_of_admission}  onChange={(e)=>{{this.setState({date_of_admission:e.target.value.toUpperCase()})}}}/>
                        </div>
                        <div className="col-3 form-group">
                            <label>Date of Birth</label>
                            <input type="date" className="form-control" value={this.state.dob} onChange={(e)=>{{this.setState({dob:e.target.value.toUpperCase()})}}}/>
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
                            <label>Security Deposit</label>
                            <input type="text" className="form-control" value={this.state.security_deposit}  onChange={(e)=>{{this.setState({security_deposit:e.target.value.toUpperCase()})}}}/>
                        </div>
                        <div className="col-3 form-group">   
                                    <label>Mode Of Return</label><br/>
                                    <label>CASH       </label>
                                    <input type="radio" className=""   name="return_mode" value="CASH" onChange={(e)=>{this.setState({return_mode:e.target.value.toUpperCase()})}}/>
                                    <label>             BANK  </label>
                                    <input type="radio" className="" checked name="return_mode" value="BANK" onChange={(e)=>{this.setState({return_mode:e.target.value.toUpperCase()})}}/>
                        </div> 
                        <div className="col-3">
                            <label>Bank</label>
                            <select  className="form-control" onChange={(e)=>{this.setState({Rbank:e.target.value.toUpperCase()});}} value={this.state.bank}  >
                                                <option value="">Choose Bank</option>
                                            {this.state.AllBank.map((item,index)=>{
                                                return(
                                                    <option value={item.bank}>{item.bank}</option>
                                                )
                                            })}
                            </select> 
                        </div>
                        <div className="col-3 form-group">
                            <label>Tc No</label>
                            <input type="text" className="form-control"  onChange={(e)=>{{this.setState({tc_no:e.target.value.toUpperCase()})}}}/>
                        </div>
                        <div className="col-3 form-group">
                            <label>Cheque No</label>
                            <input type="text" className="form-control"  onChange={(e)=>{{this.setState({cheque_no:e.target.value.toUpperCase()})}}}/>
                        </div>
                        <div className="col-3 form-group">
                            <label>Date Of Cheque</label>
                            <input type="date" className="form-control" value={this.state.date_of_cheque}  onChange={(e)=>{{this.setState({date_of_cheque:e.target.value.toUpperCase()})}}}/>
                        </div>
                        <div className="col-12 form-group">
                            <label>Address</label>
                            <input type="text" className="form-control" value={this.state.address}  onChange={(e)=>{{this.setState({address:e.target.value.toUpperCase()})}}}/>
                        </div>
                        <hr/>
                        <div className="col-12 form-group">
                            <label>Reason</label>
                            <input type="text" className="form-control"  onChange={(e)=>{{this.setState({reason:e.target.value.toUpperCase()})}}}/>
                        </div>
                        <div className="col-3 form-group">
                            <label>Working Days</label>
                            <input type="text" className="form-control"  onChange={(e)=>{{this.setState({working_days:e.target.value.toUpperCase()})}}}/>
                        </div>
                        <div className="col-3 form-group">
                            <label>Present Days</label>
                            <input type="text" className="form-control"  onChange={(e)=>{{this.setState({present_days:e.target.value.toUpperCase()})}}}/>
                        </div>
                        <div className="col-3 form-group">
                            <label>Is Promoted</label>
                            <select className="form-control"  onChange={(e)=>{{this.setState({is_promoted:e.target.value.toUpperCase()})}}}>
                                <option value="">Choose...</option>
                                <option value="YES">YES</option>
                                <option value="NO">NO</option>
                            </select>
                        </div>
                        <div className="col-3 form-group">
                            <label>Promoted In</label>
                            <input type="text" className="form-control"  onChange={(e)=>{{this.setState({promoted_in:e.target.value.toUpperCase()})}}}/>
                        </div>
                        <div className="col-3 form-group">
                            <label>Result</label>
                            <input type="text" className="form-control"  onChange={(e)=>{{this.setState({result:e.target.value.toUpperCase()})}}}/>
                        </div>
                        <div className="col-9 form-group">
                            <label>Last School</label>
                            <input type="text" className="form-control"  onChange={(e)=>{{this.setState({last_school:e.target.value.toUpperCase()})}}}/>
                        </div>
                        <div className="col-12 form-group">
                            <label>Result Remark</label>
                            <input type="text" className="form-control"  onChange={(e)=>{{this.setState({result_remark:e.target.value.toUpperCase()})}}}/>
                        </div>
                        <div className="col-3 form-group">
                            <label>Concession</label>
                            <input type="text" className="form-control"  onChange={(e)=>{{this.setState({concession:e.target.value.toUpperCase()})}}}/>
                        </div>
                        <div className="col-9 form-group">
                            <label>Concession Remark</label>
                            <input type="text" className="form-control"  onChange={(e)=>{{this.setState({concession_remark:e.target.value.toUpperCase()})}}}/>
                        </div>
                        <div className="col-12 form-group">
                            <label>Games Remark</label>
                            <input type="text" className="form-control"  onChange={(e)=>{{this.setState({games_remark:e.target.value.toUpperCase()})}}}/>
                        </div>
                        <div className="col-12 form-group">
                            <label>Other Remark</label>
                            <input type="text" className="form-control"  onChange={(e)=>{{this.setState({other_remark:e.target.value.toUpperCase()})}}}/>
                        </div>
                        <div className="col-12 form-group">
                            <label>Conduct</label>
                            <input type="text" className="form-control"  onChange={(e)=>{{this.setState({conduct:e.target.value.toUpperCase()})}}}/>
                        </div>
                        <div className="col-6 form-group">
                         <label> </label>
                         <button className="btn btn-info btn-block" onClick={()=>{this.submitTcData()}}>Save</button>
                        {this.state.updateBtn ?
                        <button className="btn btn-secondary ml-3 mt-5" type="submit" onClick={(e) => this.updateVehicleTypeData(e)}>Update</button>
                        :null
                        }
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
export default TransferCertificate;