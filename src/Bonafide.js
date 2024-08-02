import React from 'react';
// import DataTable from '@bit/adeoy.utils.data-table';
import Moment from 'moment';
class Bonafide extends React.Component{
    constructor(props){
        super(props)
        this.state={
            _id:'',
            vehicle_type:'',
            AllVehicleType:[],
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
            father_name:"",
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

            admitted_class:'',
            AllClass:[],
        }
    }
    componentDidMount(){
      this.getClass()
    }
    getClass = async() => {
      await console.log("wait wait")
      fetch("http://144.91.110.221:4800/getClass"
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
              this.setState({AllClass: data})
          })
          .catch(err => console.log(err))
        }
    searchByAdmission_no_with_session = async() => {
        this.setState({name:'',account_no:'',class_name:'',section:'',parents:'',fee_concession:'',left_on:'',dob:'',date_of_admission:'',father_name:'',mother_name:'',sex:''})
          await console.log("wait wait")
          fetch("http://144.91.110.221:4800/singlestudentdata_with_session"
          ,{
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            admission_no: this.state.admission_no,
            session: this.state.session,
            school_id:"UT015",
          })
        })
              .then(res => res.json())
              .then(data => {
                  console.log(data)
                  if(data[0] !=undefined){
                  this.setState({
                    name:data[0].student.name,
                    account_no:data[0].account_no,
                    admission_no:data[0].admission_no,
                    class_name:data[0].class_name,
                    section:data[0].section,
                    father_name:data[0].student.father_name,
                    mother_name:data[0].student.mother_name,
                    fee_concession:data[0].student.fee_concession,
                    dob:data[0].student.dob,
                    date_of_admission:data[0].student.date_of_admission,
                    sex:data[0].student.sex
                  })
                  this.FeesClasswise(data[0].class_name,data[0].section); 
                  
                  let date = Moment(this.state.dob).format("DD")
                  let myDiv 
              
                  let oneToTwenty = ['','one ','two ','three ','four ', 'five ','six ','seven ','eight ','nine ','ten ',
                  'eleven ','twelve ','thirteen ','fourteen ','fifteen ','sixteen ','seventeen ','eighteen ','nineteen '];
                  let tenth = ['', '', 'twenty','thirty','forty','fifty', 'sixty','seventy','eighty','ninety'];
              
                  if(date.toString().length > 7) return myDiv.innerHTML = 'overlimit' ;
                  console.log(date);
                  //let num = ('0000000000'+ date).slice(-10).match(/^(\d{1})(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
                let num = ('0000000'+ date).slice(-7).match(/^(\d{1})(\d{1})(\d{2})(\d{1})(\d{2})$/);
                  console.log(num);
                  if(!num) return;
              
                  let outputText = num[1] != 0 ? (oneToTwenty[Number(num[1])] || `${tenth[num[1][0]]} ${oneToTwenty[num[1][1]]}` )+' million ' : ''; 
                
                  outputText +=num[2] != 0 ? (oneToTwenty[Number(num[2])] || `${tenth[num[2][0]]} ${oneToTwenty[num[2][1]]}` )+'hundred ' : ''; 
                  outputText +=num[3] != 0 ? (oneToTwenty[Number(num[3])] || `${tenth[num[3][0]]} ${oneToTwenty[num[3][1]]}`)+' thousand ' : ''; 
                  outputText +=num[4] != 0 ? (oneToTwenty[Number(num[4])] || `${tenth[num[4][0]]} ${oneToTwenty[num[4][1]]}`) +'hundred ': ''; 
                  outputText +=num[5] != 0 ? (oneToTwenty[Number(num[5])] || `${tenth[num[5][0]]} ${oneToTwenty[num[5][1]]} `) : ''; 
              
                  var new_date = outputText;


                  let year = Moment(this.state.dob).format("YYYY")
                  let myDivv 
              
                  let oneToTwentyy = ['','one ','two ','three ','four ', 'five ','six ','seven ','eight ','nine ','ten ',
                  'eleven ','twelve ','thirteen ','fourteen ','fifteen ','sixteen ','seventeen ','eighteen ','nineteen '];
                  let tenthh = ['', '', 'twenty','thirty','forty','fifty', 'sixty','seventy','eighty','ninety'];
              
                  if(year.toString().length > 7) return myDivv.innerHTML = 'overlimit' ;
                  console.log(year);
                  //let num = ('0000000000'+ year).slice(-10).match(/^(\d{1})(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
                let numm = ('0000000'+ year).slice(-7).match(/^(\d{1})(\d{1})(\d{2})(\d{1})(\d{2})$/);
                  console.log(numm);
                  if(!numm) return;
              
                  let outputYear = numm[1] != 0 ? (oneToTwentyy[Number(numm[1])] || `${tenthh[numm[1][0]]} ${oneToTwentyy[numm[1][1]]}` )+' million ' : ''; 
                
                  outputYear +=numm[2] != 0 ? (oneToTwentyy[Number(numm[2])] || `${tenthh[numm[2][0]]} ${oneToTwentyy[numm[2][1]]}` )+'hundred ' : ''; 
                  outputYear +=numm[3] != 0 ? (oneToTwentyy[Number(numm[3])] || `${tenthh[numm[3][0]]} ${oneToTwentyy[numm[3][1]]}`)+' thousand ' : ''; 
                  outputYear +=numm[4] != 0 ? (oneToTwentyy[Number(numm[4])] || `${tenthh[numm[4][0]]} ${oneToTwentyy[numm[4][1]]}`) +'hundred ': ''; 
                  outputYear +=numm[5] != 0 ? (oneToTwentyy[Number(numm[5])] || `${tenthh[numm[5][0]]} ${oneToTwentyy[num[5][1]]} `) : ''; 
              
                  var new_year = outputYear;
                this.setState({newDOB:new_date+""+Moment(this.state.dob).format("MMMM")+" "+new_year})

                }
              })
              .catch(err => console.log(err))
            }
      FeesClasswise=(class_names,sections)=>{    
        console.log("checking response FeesClasswise")
        const currentMonth =  Moment().format('MM')       
         fetch("http://144.91.110.221:4800/FeesClasswise"
         ,{
             method: 'POST',
             headers: {
                 Accept: 'application/json',
                 'Content-Type': 'application/json'
             },
             body: JSON.stringify({
                 class_name: class_names,
                 section: sections,
                 session:this.state.session,
             })
         })
         .then((data) => data.json())
         .then(async (data) => {  
            await console.log( 'Class Wise'+data )  
             if(data[0] !=undefined){
                 this.setState({Allfees:JSON.parse(data[0].fees)})
  
         }
         })
         .catch(err => console.log(err))
     }

    
    PrintTc() {
        window.print();
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
                        <div className="col-5 form-group">
                            <label>Admission No</label>
                            <input type="text" placeholder="Enter Admission No" className="form-control" value={this.state.admission_no} onChange={(e)=>{{this.setState({admission_no:e.target.value.toUpperCase()});this.searchByAdmission_no_with_session()}}}/>
                        </div>
                        <div className="col-3 form-group">
                            <label>Admitted Class</label>
                           <select className="form-control" onChange={(e)=>{this.setState({admitted_class:e.target.value.toUpperCase()})}}>
                           <option value="">Select Class</option>
                           {this.state.AllClass.map((item,index)=>{
                                 return(
                                    <option value={item.class_name}>{item.class_name}</option>
                                 )
                             })}
                           </select>
                        </div>
                        <div className="col-2 form-group d-flex align-items-end">
                            <br/>
                            <button className="btn btn-info" onClick={()=>{this.PrintTc()}}>PRINT</button>
                        </div>
                        {/* <div className="col-6 form-group">
                         <label> </label>
                         <button className="btn btn-info mt-5" onClick={()=>{}}>Save</button>
                        </div> */}
                    </div>
                </div>
            </div>
            {/* <div className= "row printBonafide bg-white pt-2 pb-2 pl-3 ml-2">
            <div className="col-12">
            <div className= "row  ">
                <div className="col-12 text-center mt-3 mb-3">
                <img src={require('./images/logo.png').default} className="certificate-logo"/>
                </div>
                <div className="col-12 text-center">
                <h2 className="m-0"><u>CONSTANCIA SCHOOL (UT056)</u></h2> 
                 <h4><u>WEST CANAL ROAD, P.O MAJRA,DEHRADUN </u></h4>
                <h4 className="m-0 mt-4"><i>[Affilated to Council for the Indian School Certificate Examinations(CISCE), New Delhi<br/>vide letter No. UP-212/2000 dates 13 OCT 2000]</i></h4>
                               </div>
                <div className="col-12">
                <div className="row">
                <div className="col-1"></div>
                <div className="col-5">
                <h5 className="m-3">ADMN NO: <b>{this.state.admission_no}</b></h5>
                </div>
                <div className="col-5"><h5 className="m-3" style={{textAlign:'right'}}>ACCOUNT NO: <b>{this.state.account_no}</b></h5></div>
                <div className="col-1"></div>
                </div>
                </div>
                <div className="col-12 text-center">
                <h4 className="m-0"><u>TO WHOM IT MAY CONCERN</u></h4> 
                </div>
                <div className="col-12 mt-4">
                <div className="row">
                <div className="col-1"></div>
                <div className="col-10">
                  <p>This is certify that <strong>{this.state.name}</strong> {this.state.sex =="MALE" ? "Son" :"Daughter" } of <strong>{this.state.father_name}</strong> and <strong>{this.state.mother_name}</strong> is a bonafide student of this school since <strong>{Moment(this.state.date_of_admission).format("DD-MM-YYYY")}</strong>.</p>
                  <p> {this.state.sex =="MALE" ? "He" :"She" } was admitted in class <strong>{this.state.admitted_class}</strong> and is presently in Class <strong>{this.state.class_name}</strong>.</p><br/>

                  <p>The current Academic Session of the School is from <strong> April </strong> to <strong> March</strong>.</p><br/>

                  <p>{this.state.sex =="MALE" ? "His" :"Her" } Date Of Birth as per the school records is <strong style={{textTransform:"capitalize"}}>{Moment(this.state.dob).format("DD-MM-YYYY")} ({this.state.newDOB})</strong>.</p><br/>

                  <span>Place : Dehradun</span> <p style={{float:'right'}}>Principal</p> <br/>
                  <p>Date : {Moment().format("DD/MM/YYYY")}</p>
                  </div>
                  <div className="col-1"></div>
                </div>
                </div>
                </div>
                </div>
                </div> */}
                <div className='row printBonafide bonafied-certificat bg-white pt-2 pb-2 pl-3 ml-2'>
                {/* <div className='col-12 d-flex'>
                  <div className='col-2'>
                    <img src={require('./images/logo.png').default} alt='constancia-school-logo'style={{height:"100px"}}/>
                  </div>
                  <div className='col-10 text-center'>
                    <h1>
                      CONSTANCIA SCHOOL
                    </h1>
                    <h5>P.O. MAJRA, DEHRADUN (U.K.)-248001</h5>
                    <h5>Affilliated to the Council for the indian School Certificate Examinations</h5>
                    <h5>New Delhi (ICSE & ISC) Recongnised by UK Govt.</h5>
                    <h4>SCHOOL CODE : UT015</h4>
                    <h3>CHARACTER-CUM-EDUCATION CERTIFICATE</h3>
                  </div>
                  </div> */}
                  <div className='col-12 d-flex'>
                  <div className='col-2 text-center'>
                    <p className='m-0'>Estd.-1973</p>
                    <img src={require('./images/logo.png').default} alt='constancia-school-logo' style={{ height: "100px" }} />
                  </div>
                  <div className='col-8 text-center'>
                    <h1>
                      CONSTANCIA SCHOOL
                    </h1>
                    <h5>P.O. MAJRA, DEHRADUN (U.K.)-248001</h5>
                    <h5>Affilliated to the Council for the indian School Certificate Examinations</h5>
                    <h5>New Delhi (ICSE & ISC) Recongnised by UK Govt.</h5>
                    <h4>SCHOOL CODE : UT015</h4>
                    <h3>CHARACTER-CUM-EDUCATION CERTIFICATE</h3>
                  </div>
                  <div className='col-2 p-0 text-center'>
                    <p style={{fontSize:"12px"}}>Ph. 0135-260177,2642360</p>
                  </div>
                </div>
                  <div className='col-12 mt-4'>
                    <div className='row'>
                      <div className='col-3'>
                      <p>Certify that Master / Miss</p>
                      </div>
                      <div className='transfer-certificate-dotted col-9'>{this.state.name}</div>
                    </div>
                  </div>
                  <div className='col-12'>
                    <div className='row'>
                      <div className='col-2'>
                      <p>S/o , D/o Shri</p>
                      </div>
                      <div className='transfer-certificate-dotted col-10'>{this.state.father_name}</div>
                    </div>
                  </div>
                  <div className='col-12'>
                    <div className='row'>
                      <div className='col-4'>
                      <p>was admitted into this school on the (Date)</p>
                      </div>
                      <div className='transfer-certificate-dotted col-8'>{this.state.date_of_admission}</div>
                    </div>
                  </div>
                  <div className='col-12'>
                    <div className='row'>
                      <div className='col-5'>
                      <p>vide Registration / Admission Serial No</p>
                      </div>
                      <div className='transfer-certificate-dotted col-7'>{this.state.admission_no}</div>
                    </div>
                  </div>
                  <div className='col-12'>
                    <div className='row'>
                          <div className='col-4'>
                          <p>He / She Passed  Studing in class</p>
                          </div>
                          <div className='transfer-certificate-dotted col-6'>{this.state.class_name}</div>
                          <div className='col-2 text-right'>
                          <p>of ICSE / ISC</p>
                        </div>
                      </div>
                      </div>
                      <div className='col-12'>
                        <div className='row'>
                          <div className='col-2'>
                            <p>stream in</p>
                          </div>
                          <div className='transfer-certificate-dotted col-10'></div>
                          </div>
                      </div>
                  <div className='col-12'>
                    <div className='row'>
                      <div className='col-12'>
                      <p className=''>
                      He / She has been a bonafide student of this school and bears
                    </p>
                      </div>
                      <div className='col-12'>
                        <h5>
                         GOOD MORAL CHARACTER.
                        </h5>
                      </div>
                    </div>

                  </div>
                  <div className='col-12'>
                    <div contentEditable="true" style={{ border:"none",borderBottom:"1px dotted",width:"100%",minHeight: "20px"}}></div>
                  </div>
                  <div className='col-12 mt-2'>
                    <h5>Station : Dehradun</h5>
                  </div>
                  <div className='col-12 mt-2'>
                    <h5>Date : {Moment().format("DD/MM/YYYY")}</h5>
                  </div>
                  <div className='col-12 mt-5'>
                    <h5 className='text-right'>(Head of the School)</h5>
                  </div>
                </div>
            </>
        )
    }
}
export default Bonafide;