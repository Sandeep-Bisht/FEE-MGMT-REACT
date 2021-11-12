import React from 'react';
import DataTable from '@bit/adeoy.utils.data-table';
import Moment from 'moment';
class RecoverTc extends React.Component{
    constructor(props){
        super(props)
        this.state={
            _id:'',
            vehicle_type:'',
            AllStudentTC:[],
            updateBtn:'',
            session:localStorage.getItem('SessionAccess'),

            date_of_tc:'',
            date_of_application:'',
            left_on:'',
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
            return_mode:'',
            bank:'',
            tc_no:'',
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
        }
    }
    componentDidMount(){
      this.getAllCertificateDetails()
    }
    getAllCertificateDetails = async() => {
        await console.log("wait wait")
        fetch("http://144.91.110.221:4800/getAllTransferCertificate"
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
                console.log(data)
                this.setState({AllStudentTC:data})
                
            })
            .then(err => console.log(err))
    }
    RecoverFromTc =async(item)=>{
      await console.log("wait wait")
      fetch("http://144.91.110.221:4800/RecoverFromTc"
      ,{
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        session: this.state.session,
        admission_no:item.admission_no,
        account_no:item.account_no,
        student_id:item.student._id,
        academic_id:item.academic_id,
        tc_status:'0',
        _id:item._id
      })
    })
          .then(res => res.json())
          .then(data => {
              console.log(data)
              alert("Recover Sucessfully !")
              this.getAllCertificateDetails()
          })
          .then(err => console.log(err))
    }
    render(){
        const data =[];
        {this.state.AllStudentTC.map((item,index)=>{
        data.push( {"sr_no":index+1,"tc_no":item.tc_no,"name":item.name,"admission_no":parseInt(item.admission_no),"account_no":parseInt(item.account_no),"class_name":item.class_name+"-"+item.section,"parents":item.student.father_name+" / "+item.student.mother_name,"action":<td><button className="btn btn-success mr-2" onClick={() => {if(window.confirm('Are You Sure?')){this.RecoverFromTc(item)};}}><i class="fas fa-user-slash"></i></button></td>})
        })}
          const columns = [
            { title: "SR NO", data: "sr_no" },
            { title: "TC NO", data: "tc_no" },
            { title: "Name", data: "name" },
            { title: "Admn No", data: "admission_no" },
            { title: "Acc No", data: "account_no" },
            { title: "Class", data: "class_name" },
            { title: "Parents", data: "parents" },
            { title: "Action", data: "action" },
          ];
          const click = (row) => {
            console.log(row);
          };
        return(
            <>
            {/* <div className="row layoutCard">
                <div className="col-12">
                    <div className="form-row">
                        <div className="col-10 form-group">
                            <label>Admission No</label>
                            <input type="text" placeholder="Enter Admission No" className="form-control" value={this.state.admission_no} onChange={(e)=>{{this.setState({admission_no:e.target.value.toUpperCase()});this.getCertificateDetails()}}}/>
                        </div>
                        <div className="col-2 form-group">
                            <br/>
                            <button className="btn btn-info" onClick={()=>{this.PrintTc()}}>PRINT</button>
                        </div>
                  
                    </div>
                </div>
            </div> */}

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
export default RecoverTc;