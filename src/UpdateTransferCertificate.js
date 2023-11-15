import React from 'react';
import DataTable from '@bit/adeoy.utils.data-table';
import Moment from 'moment';
class UpdateTransferCertificate extends React.Component{
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
            date_of_cheque:Moment().format('YYYY-MM-DD'),
            cheque_no:'',
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
    getTransferCertificate= async (e)=>{
        // this.setState({})
        await console.log("wait")
        console.log("checking response search by addmission no")
        const admission_no = this.state.admission_no
        if(admission_no =='0'){
             return false;
        }
        fetch("http://144:91:110:210:4800/getTransferCertificate"
        ,{
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          admission_no: this.state.admission_no,
        })
      })
        .then(res => res.json())
        .then(async (data) => {  
            if(data !=undefined){
                // balance:data.balance,
                var left_on
                if(data.class_name =="12SCI" || data.class_name =="12COM" ){
                    left_on="2021-03-31"
                }else{
                    left_on=data.left_on
                }
                this.setState({bank:data.bank,tc_no:data.tc_no,cheque_no:data.cheque_no,_id:data._id,account_no:data.account_no,name:data.name,class_name:data.class_name,section:data.section,date_of_admission:data.date_of_admission,nationality:data.nationality,left_on:left_on,student_id:data.student,academic_id:data.academic_id,address:data.address,category:data.category,security_deposit:data.security_deposit,dob:data.dob,house:data.house,return_mode:data.return_mode,date_of_tc:data.date_of_tc,date_of_application:data.date_of_application,admission_no:data.admission_no,reason:data.reason,working_days:data.working_days,present_days:data.present_days,is_promoted:data.is_promoted,promoted_in:data.promoted_in,result:data.result,last_school:data.last_school,result_remark:data.result_remark,concession:data.concession,concession_remark:data.concession_remark,games_remark:data.games_remark,other_remark:data.other_remark,conduct:data.conduct,father_name:data.student.father_name,mother_name:data.student.mother_name,date_of_cheque:data.date_of_cheque})
               
            }
            else{
                alert("NO RESULT FOUND !")
                this.setState({_id:"",account_no:"",name:"",class_name:"",section:"",avail_transport:"",is_full_free_ship:"",is_teacher_ward:"",take_computer:"",ncc:"",no_exempt_registration:"",tc_status:"",fee_concession:"",no_exempt_admission:"",no_exempt_security_deposit:"",is_repeater:"",paid_upto_month:"",father_name:"",mother_name:"",parent_mobile:"",parent_phone:"",dob:"",house:"",parent_address:"",parent_city:"",parent_state:"",parent_country:"",date_of_admission:"", address:'',nationality:'',
                security_deposit:'',
                return_mode:'BANK',
                bank:'SBI',
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
        .catch((error)=>{
            console.log(error)
        })
    }
    getSection = () => {
        fetch("http://144:91:110:210:4800/getSection"
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
        fetch("http://144:91:110:210:4800/getClass"
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
    getCategory = () => {
        fetch("http://144:91:110:210:4800/getCastCategory")
            .then(res => res.json())
            .then(data => {
                console.log(data)
                this.setState({AllCategory: data})
            })
            .catch(err => console.log(err))
    }
    getHouse = () => {
        fetch("http://144:91:110:210:4800/getHouse")
            .then(res => res.json())
            .then(data => {
                console.log(data)
                this.setState({AllHouse: data})
            })
            .catch(err => console.log(err))
    }
    getBankData = () => {
        fetch("http://144:91:110:210:4800/getBankData"
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
            .catch(err => console.log(err))
    }

    //   checkValidation = () => {
    //     if (this.state.vehicle_type === "") {
    //         this.setState({Vehicle_typeErrorMessage: "Please Enter Vehicle Type"})
    //         return false
    //     }else {
    //         return true
    //     }
    //   }
    UpdateTcData = () => {
        // if (this.checkValidation()) {
        const data = new FormData()
        data.append('_id', this.state._id)
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
       

        const url="http://144:91:110:210:4800/UpdateTcData"
                fetch(url,
                    {
                    method:'put',
                    body:data
                })
                .then(res => res.json())  
            .then(data => {
                alert("Details Updated Successfully") 
                this.setState({ 
                admission_no:'',name:'',account_no:'',parents:'',class_name:'',section:'',category:'',nationality:'',date_of_admission:'',dob:'',house:'',address:'',security_deposit:'',return_mode:'',bank:'SBI',tc_no:'',cheque_no:'',reason:'',working_days:'',present_days:'',is_promoted:'',promoted_in:'',result:'',last_school:'',result_remark:'',concession:'',concession_remark:'',games_remark:'',other_remark:'',conduct:'',parent_address:'',parent_city:'',parent_state:'',parent_country:'',father_name:'',mother_name:'',student_id:'',academic_id:''})             
            })
            .catch(err => console.log(err))
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
                            <input type="text" className="form-control" value={this.state.admission_no}  onChange={(e)=>{{this.setState({admission_no:e.target.value.toUpperCase()})}}} onKeyPress={(e)=>{if(e.key === 'Enter'){this.getTransferCertificate() }}} />
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
                                    <input type="radio" className=""   name="return_mode" value={this.state.return_mode} onChange={(e)=>{this.setState({return_mode:e.target.value.toUpperCase()})}}/>
                                    <label>             BANK  </label>
                                    <input type="radio" className="" checked name="return_mode" value={this.state.return_mode} onChange={(e)=>{this.setState({return_mode:e.target.value.toUpperCase()})}}/>
                        </div> 
                        <div className="col-3">
                            <label>Bank</label>
                            <select  className="form-control"  onChange={(e)=>{this.setState({Rbank:e.target.value.toUpperCase()});}} value={this.state.bank !=''?this.state.bank:"SBI"}  >
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
                            <input type="text" value={this.state.tc_no} className="form-control"  onChange={(e)=>{{this.setState({tc_no:e.target.value.toUpperCase()})}}}/>
                        </div>
                        <div className="col-3 form-group">
                            <label>Cheque No</label>
                            <input type="text" value={this.state.cheque_no} className="form-control"  onChange={(e)=>{{this.setState({cheque_no:e.target.value.toUpperCase()})}}}/>
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
                            <input type="text" className="form-control" value={this.state.reason}  onChange={(e)=>{{this.setState({reason:e.target.value.toUpperCase()})}}}/>
                        </div>
                        <div className="col-3 form-group">
                            <label>Working Days</label>
                            <input type="text" className="form-control" value={this.state.working_days}  onChange={(e)=>{{this.setState({working_days:e.target.value.toUpperCase()})}}}/>
                        </div>
                        <div className="col-3 form-group">
                            <label>Present Days</label>
                            <input type="text" className="form-control"  value={this.state.present_days} onChange={(e)=>{{this.setState({present_days:e.target.value.toUpperCase()})}}}/>
                        </div>
                        <div className="col-3 form-group">
                            <label>Is Promoted</label>
                            <select className="form-control" value={this.state.is_promoted}  onChange={(e)=>{{this.setState({is_promoted:e.target.value.toUpperCase()})}}}>
                                <option value="">Choose...</option>
                                <option value="YES">YES</option>
                                <option value="NO">NO</option>
                            </select>
                        </div>
                        <div className="col-3 form-group">
                            <label>Promoted In</label>
                            <input type="text" className="form-control" value={this.state.promoted_in} onChange={(e)=>{{this.setState({promoted_in:e.target.value.toUpperCase()})}}}/>
                        </div>
                        <div className="col-3 form-group">
                            <label>Result</label>
                            <input type="text" className="form-control" value={this.state.result} onChange={(e)=>{{this.setState({result:e.target.value.toUpperCase()})}}}/>
                        </div>
                        <div className="col-9 form-group">
                            <label>Last School</label>
                            <input type="text" className="form-control" value={this.state.last_school} onChange={(e)=>{{this.setState({last_school:e.target.value.toUpperCase()})}}}/>
                        </div>
                        <div className="col-12 form-group">
                            <label>Result Remark</label>
                            <input type="text" className="form-control" value={this.state.result_remark}  onChange={(e)=>{{this.setState({result_remark:e.target.value.toUpperCase()})}}}/>
                        </div>
                        <div className="col-3 form-group">
                            <label>Concession</label>
                            <input type="text" className="form-control"  value={this.state.concession} onChange={(e)=>{{this.setState({concession:e.target.value.toUpperCase()})}}}/>
                        </div>
                        <div className="col-9 form-group">
                            <label>Concession Remark</label>
                            <input type="text" className="form-control"  value={this.state.concession_remark} onChange={(e)=>{{this.setState({concession_remark:e.target.value.toUpperCase()})}}}/>
                        </div>
                        <div className="col-12 form-group">
                            <label>Games Remark</label>
                            <input type="text" className="form-control" value={this.state.games_remark}  onChange={(e)=>{{this.setState({games_remark:e.target.value.toUpperCase()})}}}/>
                        </div>
                        <div className="col-12 form-group">
                            <label>Other Remark</label>
                            <input type="text" className="form-control" value={this.state.other_remark} onChange={(e)=>{{this.setState({other_remark:e.target.value.toUpperCase()})}}}/>
                        </div>
                        <div className="col-12 form-group">
                            <label>Conduct</label>
                            <input type="text" className="form-control"  value={this.state.conduct} onChange={(e)=>{{this.setState({conduct:e.target.value.toUpperCase()})}}}/>
                        </div>
                        <div className="col-6 form-group">
                         <label> </label>
                         <button className="btn btn-secondary btn-block" onClick={()=>{this.UpdateTcData()}}>Update Details</button>
                        
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
export default UpdateTransferCertificate;