import React from 'react';
import './Sidebar.css';
import {Link} from "react-router-dom";
class AdminLayout extends React.Component{
    constructor (props){
        super(props)
        this.state={
            NavHeading:'Dashboard',
            AllSession:[],
            session: localStorage.getItem('SessionAccess'),
            currentYear: null,
        }
    }
    componentDidMount=()=>{
       this.getSession();
       this.getCurrentDate();
    }
    logout =()=>{
        localStorage.setItem('access','')
        window.location.href='/landing'
    }
    getCurrentDate=()=>{
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        this.setState({ currentYear });
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
    setSession=async(e)=>{
        await console.log("wait")
        if(localStorage.getItem('SessionAccess') == ""){            
        localStorage.setItem('SessionAccess','2021-2022')
        }else if(  localStorage.getItem('SessionAccess') != this.state.session ){
            localStorage.setItem('SessionAccess',this.state.session)            
        }
        else{
            localStorage.setItem('SessionAccess',localStorage.getItem('SessionAccess'))
        }
        window.location.reload();
    }
  render(){
  const { history } = this.props;
  const { currentYear } = this.state;
  return (
  <>
  <div className="row pt-0">
     <div className="col-12">
     <div className="wrapper">
        <nav id="sidebar">
            <div className="sidebar-header text-center constencia-sidebar">
                <div>
            </div>
            <p className="text-center border-text" style={{ marginBottom: "0px"}}>Session - 
                            <select className="text-dark" value= { localStorage.getItem('SessionAccess') == "" ? this.state.session :localStorage.getItem('SessionAccess')}  onChange={(e)=>{this.setState({session:e.target.value.toUpperCase()});this.setSession()}}>
                               <option value="" className="text-dark">Select Session</option>
                                {this.state.AllSession.map((item,index)=>{
                                  return(
                                    <option value={item.session_code} className="text-dark">{item.session_code}</option>
                                    )
                              })}
                            </select>
                </p>
            </div>
            <ul className="list-unstyled components">
                <li>
                    <Link to="/dashboard" onClick={()=>{{this.setState({NavHeading:'Dashboard'})}}}><i class="fas fa-home" ></i>Dashboard</Link>
                </li>
                {/* <li>
                    <Link to="/employees" onClick={()=>{{this.setState({NavHeading:'Employees'})}}}><i class="fas fa-users" ></i>Employees</Link>
                </li> */}
                {localStorage.getItem('access') == "Admin" || localStorage.getItem('access') == "Cashier" ? 
                <li className="">
                    <a href="#orders" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle" onClick={()=>{this.setState({NavHeading:'Fees'})}}><i class="fas fa-money-check-alt"></i>Fees</a>
                    <ul className="collapse list-unstyled" id="orders">
                        <li>
                        <Link to="/FeeReceipt"  onClick={()=>{this.setState({NavHeading:'Fees/Fee transaction'})}}>Fee Transaction</Link>
                        </li>
                        <li>
                        <Link to="/VoucherEntry"  onClick={()=>{this.setState({NavHeading:'Fees/Voucher Entry'})}}>Voucher Entry</Link>
                        </li>
                        <li>
                        <Link to="/FeeVoucher" onClick={()=>{this.setState({NavHeading:'Fees/Day Book'})}}>Day Book</Link>
                        </li>
                        <li>
                        <Link to="/UpdateStudentPreviousSessionAmount"  onClick={()=>{this.setState({NavHeading:'Fees/Update Student Previous Session Amount'})}}>Update Previous Dues/Surplus</Link>
                        </li>
                        <li>
                        <Link to="/FeeStructure"  onClick={()=>{this.setState({NavHeading:'Fees/Fee Structure'})}}>Fee Structure</Link>
                        </li>
                        <li>
                        <Link to="/FeeCategory"  onClick={()=>{this.setState({NavHeading:'Fees/Fee Category'})}}>Fee Category</Link>
                        </li>
                        <li>
                        <Link to="/FeeSubCategory" onClick={()=>{this.setState({NavHeading:'Fees/Fee Sub Category'})}}>Fee Sub Category</Link>
                        </li>
                        <li>
                        <Link to="/FeeSubCategoryFine" onClick={()=>{this.setState({NavHeading:'Fees/Fee Fine'})}}>Late Fee</Link>
                        </li>
                        <li>
                        <Link to="/Defaulter" onClick={()=>{this.setState({NavHeading:'Fees/Defaulter List'})}}>Current Session Defaulter</Link>
                        </li>
                        <li>
                        <Link to="/PreviousDefaulter" onClick={()=>{this.setState({NavHeading:'Fees/Defaulter List'})}}>Previous Session  Defaulter</Link>
                        </li>
                        <li>
                        <Link to="/SuspensionalVoucher" onClick={()=>{this.setState({NavHeading:'Fees/Suspicious Account'})}}>Suspicious Account</Link>
                        </li>
                        <li>
                        <Link to="/SecurityRegisterReport" onClick={()=>{this.setState({NavHeading:'Fees/Security Register(Classwise)'})}}>Security Register(Classwise)</Link>
                        </li>
                        <li>
                        <Link to="/SecurityRegisterReportALL" onClick={()=>{this.setState({NavHeading:'Fees/Security Register(All)'})}}>Security Register(All)</Link>
                        </li>
                        <li>
                        <Link to="/SecurityRegisterByRange" onClick={()=>{this.setState({NavHeading:'Fees/Security Register By Range'})}}>Security Register By Range</Link>
                        </li>
                        <li>
                        <Link to="/Feesbackup" onClick={()=>{this.setState({NavHeading:'Fees/Security Register(All)'})}}>Fees Backup</Link>
                        </li>
                        <li>
                        <Link to="/UpdateReceiptByRange" onClick={()=>{this.setState({NavHeading:'Fees/Update Receipt ByRange'})}}>Update Receipt By Range</Link>
                        </li>
                        
                    </ul>
                </li>
                :null}
                {localStorage.getItem('access') == "Admin" ? 
                <li className="">
                    <a href="#Configuration" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle" onClick={()=>{this.setState({NavHeading:'Fees'})}}><i class="fa fa-cogs"></i>Configuration</a>
                    <ul className="collapse list-unstyled" id="Configuration">
                        <li>
                        <Link to="/SessionCreation"  onClick={()=>{this.setState({NavHeading:'Configuration/Session Creation'})}}>Session Creation</Link>
                        </li>
                        <li>
                        <Link to="/ClassCreation" onClick={()=>{this.setState({NavHeading:'Configuration/Class Creation'})}}>Class Creation</Link>
                        </li>
                        <li>
                        <Link to="/SectionCreation" onClick={()=>{this.setState({NavHeading:'Configuration/Section Creation'})}}>Section Creation</Link>
                        </li>
                        <li>
                        <Link to="/CategoryCreation" onClick={()=>{this.setState({NavHeading:'Configuration/Category Creation'})}}>Category Creation</Link>
                        </li>
                        <li>
                        <Link to="/SubjectCreation" onClick={()=>{this.setState({NavHeading:'Configuration/Subject Creation'})}}>Subject Creation</Link>
                        </li>
                        <li>
                        <Link to="/VehicleTypeCreation" onClick={()=>{this.setState({NavHeading:'Configuration/Vehicle Type Creation'})}}>Vehicle Type Creation</Link>
                        </li>
                        <li>
                        <Link to="/VehicleCreation" onClick={()=>{this.setState({NavHeading:'Configuration/Vehicle Creation '})}}>Vehicle Creation</Link>
                        </li>
                        <li>
                        <Link to="/HouseCreation" onClick={()=>{this.setState({NavHeading:'Configuration/House Creation'})}}>House Creation</Link>
                        </li>
                        <li><Link to="/BankCreation" onClick={()=>{this.setState({NavHeading:'Configuration/Bank'})}}>Bank</Link></li>
                        {/*<li>
                        <Link to="/ParentCreation" onClick={()=>{this.setState({NavHeading:'Configuration/Parent Creation'})}}>Parents</Link>
                        </li> */}
                    </ul>
                </li>
                : null}
                  {localStorage.getItem('access') == "Admin" || localStorage.getItem('access') == "AdmissionCell"? 
                <li className="">
                    <a href="#Student" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle"><i class="fa fa-user"></i>Student</a>
                    <ul className="collapse list-unstyled" id="Student">
                        <li>
                        <Link to="/StudentCreation" onClick={()=>{this.setState({NavHeading:'Student/Student Creation'})}}>Student Creation</Link>
                        </li>
                        <li>
                        <Link to="/StudentEdit" onClick={()=>{this.setState({NavHeading:'Student/Student Update'})}}>Student Update</Link>
                        </li>
                        <li>
                        <Link to="/StudentDisplay" onClick={()=>{this.setState({NavHeading:'Student/Student Display'})}}>Student Display</Link>
                        </li>
                        <li>
                        <Link to="/StudentStrength" onClick={()=>{this.setState({NavHeading:'Student/Student Strength'})}}>Student Strength</Link>
                        </li>
                        <li>
                        <Link to="/StudentStrengthCategoryWise" onClick={()=>{this.setState({NavHeading:'Student/Student Strength'})}}>Student Strength(Category Wise)</Link>
                        </li>
                        <li>
                        <Link to="/StudentStrengthSectionWise" onClick={()=>{this.setState({NavHeading:'Student/Student Strength(Section Wise)'})}}>Student Strength(Section Wise)</Link>
                        </li>
                        <li>
                        <Link to="/StudentStrengthHouseWise" onClick={()=>{this.setState({NavHeading:'Student/Student Strength (House Wise)'})}}>Student Strength (House Wise)</Link>
                        </li>
                        <li>
                        <Link to="/StudentSlipByRange" onClick={()=>{this.setState({NavHeading:'Student/Student Slip By Range'})}}>Student Slip By Range</Link>
                        </li>
                        <li>
                        <Link to="/AadharReport" onClick={()=>{this.setState({NavHeading:'Filled Aadhar Card (Total)'})}}>Filled Aadhar Card (Total)</Link>
                        </li>
                        <li>
                        <Link to="/ComputerStudent" onClick={()=>{this.setState({NavHeading:'Computer Student'})}}>Computer Student</Link>
                        </li>
                        <li>
                        <Link to="/TcOutByRange" onClick={()=>{this.setState({NavHeading:'TC Students'})}}>TC Register</Link>
                        </li>
                        <li>
                        <Link to="/TotalParentReport" onClick={()=>{this.setState({NavHeading:'Total Parent'})}}>Total Parent</Link>
                        </li>
                        <li>
                        <Link to="/SiblingsReport" onClick={()=>{this.setState({NavHeading:'Siblings Report'})}}>Siblings Report</Link>
                        </li>
                        <li>
                        <Link to="/TeacherWardReport" onClick={()=>{this.setState({NavHeading:'Teacher Ward Report'})}}>Teacher Ward Students</Link>
                        </li>
                        <li>
                        <Link to="/UpdateSubjects" onClick={()=>{this.setState({NavHeading:'Update Subjects'})}}>Update Subjects</Link>
                        </li>
                        <li>
                        <Link to="/FeeConcessionReport" onClick={()=>{this.setState({NavHeading:'Fee Concession Details'})}}>Fee Concession Details</Link>
                        </li>  
                        <li>
                        <Link to="/FullFreeShipReport" onClick={()=>{this.setState({NavHeading:'Full Freeship Report'})}}>Full Freeship Report</Link>
                        </li>  
                        <li>
                        <Link to="/SubjectWiseReport" onClick={()=>{this.setState({NavHeading:'Subject Wise Report'})}}>Subject Wise Report</Link>
                        </li>  
                        {/* <li>
                        <Link to="/AddStruckOff" onClick={()=>{this.setState({NavHeading:'Add To StruckOff'})}}>Add To StruckOff</Link>
                        </li>   */}
                        <li>
                        <Link to="/StruckOff" onClick={()=>{this.setState({NavHeading:'Add To StruckOff'})}}>Add To StruckOff</Link>
                        </li> 
                        <li>
                        <Link to="/ListOfStruckOff" onClick={()=>{this.setState({NavHeading:'SOS Recover'})}}>SOS Recover</Link>
                        </li> 
                        <li>
                        <Link to="/SosByRange" onClick={()=>{this.setState({NavHeading:'SOS List'})}}>SOS List</Link>
                        </li> 
                        <li>
                        <Link to="/AddressReport" onClick={()=>{this.setState({NavHeading:'Student/Student Creation'})}}>Address Details</Link>
                        </li>
                                              
                    </ul>
                </li>
                :null
                }
                {localStorage.getItem('access') == "Admin" || localStorage.getItem('access') == "AdmissionCell"? 
                <li className="">
                    <a href="#TransferCertificate" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle"><i class="fa fa-book"></i>Certificates</a>
                    <ul className="collapse list-unstyled" id="TransferCertificate">
                        <li>
                        <Link to="/TransferCertificate" onClick={()=>{this.setState({NavHeading:'Certificates/Given TC'})}}>Given TC</Link>
                        </li>
                        <li>
                        <Link to="/NonTransferCertificate" onClick={()=>{this.setState({NavHeading:'Certificates/Non Transfer Certificate'})}}>Non Transfer Certificate</Link>
                        </li>
                        <li>
                        <Link to="/PrintTc" onClick={()=>{this.setState({NavHeading:'Certificates/Transfer Certificate'})}}>Transfer Certificate</Link>
                        </li>
                        <li>
                        <Link to="/UpdateTransferCertificate" onClick={()=>{this.setState({NavHeading:'Certificates/Update TC'})}}>Update Transfer Certificate</Link>
                        </li>
                        <li>
                        <Link to="/RecoverTc" onClick={()=>{this.setState({NavHeading:'Certificates/Recover TC'})}}>Recover TC</Link>
                        </li>
                        <li>
                        <Link to="/FeeCertificate" onClick={()=>{this.setState({NavHeading:'Certificates/Fee Certificate'})}}>Fee Certificate</Link>
                        </li>
                        <li>
                        <Link to="/Bonafide" onClick={()=>{this.setState({NavHeading:'Certificates/Bonafide'})}}>Bonafide Certificate</Link>
                        </li>
                        <li>
                        <Link to="/CharacterCertificate" onClick={()=>{this.setState({NavHeading:'Certificates/Character Certificate'})}}>Character Certificate</Link>
                        </li>
                        
                        
                        
                    </ul>
                </li>
                :null}
                {localStorage.getItem('access') == "Admin" || localStorage.getItem('access') == "AdmissionCell"? 
                <li className="">
                <a href="#StudentpromotionDemotion" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle"><i class="fa fa-graduation-cap"></i>Student Promotion</a>
                    <ul className="collapse list-unstyled" id="StudentpromotionDemotion">
                        <li>
                        <Link to="/StudentPromotionAll" onClick={()=>{this.setState({NavHeading:'Student/Student Promotion (Classwise)'})}}>Student Promotion (All)</Link>
                        </li>
                        <li>
                        <Link to="/StudentUpgrade" onClick={()=>{this.setState({NavHeading:'Student/Student Promotion (Classwise)'})}}>Student Promotion (Classwise)</Link>
                        </li>
                        <li>
                        <Link to="/StudentSpecificPromotion" onClick={()=>{this.setState({NavHeading:'Student/Student Promotion (9th,11th)'})}}>Student Promotion (9th,11th)</Link>
                        </li>
                        <li>
                        <Link to="/StudentPromotionDemotion" onClick={()=>{this.setState({NavHeading:'Student/Update Failure'})}}>Update Failure</Link>
                        </li>
                      
                    </ul>

                </li>
                :null}
                 {localStorage.getItem('access') == "Admin" ? 
                <li className="">
                <a href="#employees" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle"><i class="fas fa-users"></i>Employees</a>
                    <ul className="collapse list-unstyled" id="employees">
                        <li>
                        <Link to="/Employee" >Employee</Link>
                        </li>
                        <li>
                        <Link to="/Designation" >Designation</Link>
                        </li>
                        <li>
                        <Link to="/pay-category" >Pay category</Link>
                        </li>
                        <li>
                        <Link to="/PayType" >Pay Type</Link>
                        </li>
                        <li>
                        <Link to="/PayScaleType" >Pay Scale Type</Link>
                        </li>
                        <li>
                        <Link to="/PayScale" >Pay Scale</Link>
                        </li>

                       
                      
                    </ul>

                </li>
                :null}
                {/* <li className="">
                    <a href="#configuration" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">Configuration</a>
                    <ul className="collapse list-unstyled" id="configuration">
                        <li>
                            <Link to="/Category"> Category</Link>
                        </li>
                        <li>
                            <Link to="/Timing"> Timing & Holidays</Link>
                        </li>
                    </ul>
                </li> */}
                <li>
                    <Link to="/DropStatus" onClick={()=>{{this.setState({NavHeading:'Dashboard'})}}}><i class="fas fa-file" ></i>Drop Status</Link>
                </li>

            </ul>
            <ul className="list-unstyled CTAs text-center constancia-list-CTAs">
                <li>
                {/* <h6><span>  <img src={require('./images/giks_logo.png').default} style={{height:"23px"}}/></span> {currentYear}</h6> */}
                </li>
            </ul>
        </nav>
        <div id="content" style={{paddingLeft:"10px", paddingRight:"20px"}}>
        <div className='col-12 d-flex justify-content-space-between align-items-center' style={{background:"#285d9c",color:"#fff", cursor:"pointer", position:"sticky", top:"0px", zIndex:"200"}}>
                  <div className='col-1 text-staLrt' >
                  <Link to="/">
            <img src={require('./images/logo.png').default} className='constencia-image' style={{height:"40px"}}/>
            </Link>
            </div>
            <div className='col-9 text-staLrt d-flex align-items-center' >

                    <h3 style={{marginTop:"10px"}}>
                      CONSTANCIA SCHOOL
                    </h3>
                    <h6 className='text-start ml-2'>P.O. MAJRA, DEHRADUN (U.K.)-248001</h6>
                  </div>
                  <div className='col-2  text-right'>
                    <Link to="" onClick={()=>{this.logout()}} style={{fontSize:"17px"}}> <i class="fas fa-sign-out-alt"></i>Logout</Link>
                  </div>
                </div>
            {/* <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <h4 className="m-0" style={{textTransform:"uppercase"}}><u>{this.state.NavHeading}</u></h4>
                    <button type="button" id="sidebarCollapse" className="btn btn-success d-inline-block d-lg-none ml-auto" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <i className="fas fa-align-left"></i>
                        <span>Toggle Sidebar</span>
                    </button>
                 

                  
                </div>
            </nav> */}
            <React.Fragment>
               {this.props.children}
            </React.Fragment>
        </div>
    </div>
    </div>
  </div>
  
  </>
  );
  }
}
export default AdminLayout;

 
   