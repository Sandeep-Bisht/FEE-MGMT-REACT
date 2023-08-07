import React from 'react';
import DataTable from '@bit/adeoy.utils.data-table';
import Moment from 'moment';
import $, { data } from 'jquery';
var AllImportFeeStructure = [];
class FeeStructure extends React.Component{
    constructor (props){
        super(props)
        this.state={
        session:localStorage.getItem('SessionAccess'),
        class_name:'',
        section:'',
        catergory:'',
        prospectus_fee:'0',
        registration_fee:'0',
        admission_fee:'0',
        security_fee:'0',
        total_one_time:'0',
        report_card_and_diary:'0',
        report_card_and_diary_pim:'',
        annual_prize_day:'0',
        annual_prize_day_pim:'',
        development_fund:'0',
        development_fund_pim:'',
        school_magazin:'0',
        school_magazin_pim:'',
        annual_sports_day:'0',
        annual_sports_day_pim:'',
        examination_fee:'0',
        examination_fee_pim:'',
        med_board_reg:'0',
        med_board_reg_pim:'',
        library_fee:'0',
        library_fee_pim:'',
        tution_fee:'0',
        computer_fee:'0',
        science_fee:'0',
        bus_fare:'0',
        total_monthly_fee:'0',
        grand_total:'',
        fees:[],

        total_one_time_fee:'0',
        total_annual_fee:'0',

        AllSession:[],         
        AllClass:[],
        AllSection:[],
        AllCategory:[],
        AllHouse:[],
        AllFeeStructure:[],
        AllSubCategory:[],
        currentMonth:[],

        ImportSession:'',
        }
    }
    componentDidMount(){
        this.getSession()        
        this.getClass()
        this.getSection()
        this.getCategory()
        this.getHouse()
        this.getFeeStructure()
        this.getFeeSubCategory()
    }
    getFeeSubCategory = () => {
        fetch("http://144.91.110.221:4800/getSubCategory")
            .then(res => res.json())
            .then(data => {
                console.log(data)
                const currentMonth =  Moment().format('MM')
                this.setState({AllSubCategory:data,currentMonth:currentMonth})
                data.map((item,index)=>{
                    this.state.fees.push({"fee_category":item.fee_category,"fee_sub_category":item.fee_sub_category,"amount":item.amount,"month":item.month})
                })
            })
            .then(err => console.log(err))
    }
    ImportSession =async()=>{
            await console.log("wait")
            fetch("http://144.91.110.221:4800/getFeeStructure",{
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  school_id: "100",
                  session:this.state.ImportSession
                })
              })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    this.setImportStructure(data)
                })
                .then(err => console.log(err))
    }
            setImportStructure =async(newdata)=>{
                await console.log("wait")
                newdata.map((item,index)=>{
                AllImportFeeStructure.push({'unique_id':this.state.session+item.class_name,'session':this.state.session,'school_id':item.school_id,'class_name':item.class_name,'section':item.section,'total_one_time_fee':item.total_one_time_fee,'fees':item.fees,'total_monthly_fee':item.total_monthly_fee,'total_annual_fee':item.total_annual_fee,'grand_total':item.grand_total})
            })
            await console.log("wait")
            const data = new FormData()
            data.append('AllImportFeeStructure', JSON.stringify(AllImportFeeStructure))
            const url = "http://144.91.110.221:4800/storeImportStructure"
            fetch(url, {
                    method: 'post',
                    body: data
                })
                .then(res => res.json())
                .then(data => {
                    alert("Imported Successfully")      
                    AllImportFeeStructure=[];  
                    this.getFeeStructure()
                }).catch(err =>{
            });
    }
    getSession = async() => {
        await console.log("wait wait")
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
    getClass = async() => {
        await console.log("wait wait")
        this.getFeeStructure()
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
    getSection = () => {
        fetch("http://144.91.110.221:4800/getSection")
            .then(res => res.json())
            .then(data => {
                console.log(data)
                this.setState({AllSection: data})
            })
            .then(err => console.log(err))
    }
    getCategory = () => {
        fetch("http://144.91.110.221:4800/getCategory")
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
    getFeeStructure = () => {
        fetch("http://144.91.110.221:4800/getFeeStructure",{
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              school_id: "100",
              session:this.state.session
            })
          })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                this.setState({AllFeeStructure: data})
            })
            .then(err => console.log(err))
    }
    editFeeStructureObject = (obj) => {
        $("html").scrollTop(0);
        this.setState({updateBtn:true})
        let _id   =   obj._id
        let session = obj.session
        let class_name = obj.class_name
        let section = obj.section
        let AllSubCategory = JSON.parse(obj.fees)
        if(AllSubCategory.length-1 != this.state.AllSubCategory.length-1){
          var result=  this.compare( this.state.AllSubCategory,AllSubCategory)
           console.log("new res",result)
           var new_arr =AllSubCategory.push(result)
           console.log("new new_arr",new_arr)
        }
        this.setState({_id,session,class_name,section,AllSubCategory})
        this.set_total()
    }
    compare(arr1,arr2){
  
        if(!arr1  || !arr2) return
       
         let result;
       
       arr1.forEach((e1,i)=>arr2.forEach(e2=>{
         
              if(e1.length > 1 && e2.length){
                 result = this.compare(e1,e2);
              }else if(e1 !== e2 ){
                 result = e1
              }else{
                 result = true
              }
         })
       )
       return result
       console.log('Chanhe',result)
       
     }
    UpdateFeeStructureData =()=>{
        if (this.checkValidation()) {
        const data = new FormData()
        data.append('_id',this.state._id)
        data.append('unique_id', this.state.session+this.state.class_name)
        data.append('session', this.state.session)
        data.append('class_name', this.state.class_name)
        data.append('section', this.state.section)
        data.append('school_id', "100")
        data.append('fees', JSON.stringify(this.state.AllSubCategory))
        data.append('total_one_time_fee', this.state.total_one_time_fee)
        data.append('total_annual_fee', this.state.total_annual_fee)
        data.append('total_monthly_fee', this.state.total_monthly_fee)
        data.append('grand_total', this.state.grand_total)
        const url="http://144.91.110.221:4800/updateFeeStructure"
                fetch(url,
                    {
                    method:'put',
                    body:data
                })
                .then(res => res.json())              
                .then((res)=>{  
            alert('Fee Sub Category updated successfully !');
            this.getFeeSubCategory()
            this.getFeeStructure() 
                })            
                .then(err=>console.log(err))
            }
      }
      deleteFeeStructure = (id) => {
        const apiUrl = 'http://144.91.110.221:4800/deleteFeeStructure';
        fetch(apiUrl, {
          headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          method:'delete',  
          body:JSON.stringify({_id:id})
        })
        .then((response) => response.json())
        .then((res) => {
        alert("Fee Sub Category Deleted Successfully")
        this.getFeeSubCategory()
        this.getFeeStructure() 
          
        })
      }
      checkValidation = () => {
        if (this.state.session === "") {
            this.setState({sessionErrorMessage: "Please Select Session"})
            return false
        }else if (this.state.class_name === "") {
            this.setState({class_nameErrorMessage: "Please Enter Class Name"})
            return false
        }
        // else if (this.state.section === "") {
        //     this.setState({sectionErrorMessage: "Please Select Section"})
        //     return false
        // }
        else {
            return true
        }
      }
    submitFeeStructureData = () => {
        if (this.checkValidation()) {
        const data = new FormData()
        data.append('unique_id', this.state.session+this.state.class_name)
        data.append('session', this.state.session)
        data.append('class_name', this.state.class_name)
        data.append('section', this.state.section)
        data.append('school_id', "100")
        data.append('fees', JSON.stringify(this.state.AllSubCategory))
        data.append('total_one_time_fee', this.state.total_one_time_fee)
        data.append('total_annual_fee', this.state.total_annual_fee)
        data.append('total_monthly_fee', this.state.total_monthly_fee)
        data.append('grand_total', this.state.grand_total)
        const url = "http://144.91.110.221:4800/StoreFeeStructure"
        fetch(url, {
                method: 'post',
                body: data
            })
            .then(res => res.json())
            .then(data => {
                alert("Fee Structure Created Successfully") 
                this.getFeeStructure()                 
            })
            .then(err => {})
        }
        }

        total_one_time=()=>{
            const total = parseInt(this.state.prospectus_fee)+parseInt(this.state.registration_fee)+parseInt(this.state.admission_fee)+parseInt(this.state.security_fee);
            this.setState({total_one_time:total})
        }
        // total_monthly_fee=()=>{
        //     var total_monthly_fee = 0
        //     this.state.AllSubCategory.map((item,index)=>{
        //         if(item.fee_category=="MONTHLY"){
        //             total_monthly_fee = (parseInt(item.amount))+total_monthly_fee
        //         }
        //         })
        //     {this.setState({total_monthly_fee:total_monthly_fee})}
        // }
        
        set_total=async()=>{
            await console.log("wait")
            let grand_total=0
            var total_monthly_fee=0
            var total_annual_fee=0       
            var calculateOneTimeFee=0       
        // total monthly fee
        this.state.AllSubCategory.map((item,index)=>{
            if(item.fee_category=="MONTHLY"){     
                    total_monthly_fee =total_monthly_fee+parseInt(item.amount)
                    
            }
        
        })
        // end total monthly fee
           // set ANNUAL total
        
           this.state.AllSubCategory.map((item,index)=>{
            if(item.fee_category=="ANNUAL"){
                    total_annual_fee =total_annual_fee+ parseInt(item.amount)
            }
        })
    
    // end ANNUAL total
        // set One time total
        
            this.state.AllSubCategory.map((item,index)=>{
                if(item.fee_category=="ONE TIME"){
                        calculateOneTimeFee =calculateOneTimeFee+ parseInt(item.amount)
                }
            })
                grand_total = total_monthly_fee+total_annual_fee+calculateOneTimeFee
        // end one time total
              this.setState({grand_total:grand_total,total_one_time_fee:calculateOneTimeFee,total_monthly_fee:total_monthly_fee,total_annual_fee:total_annual_fee})
        }
        SetFee=(index,e)=>{
        this.state.AllSubCategory[index].amount=e.target.value
        this.set_total()
        }
        printReceipt() {
            window.print();
          }
        
    render(){
        var data =[];
        {this.state.AllFeeStructure.map((item,index)=>{
        data.push( {"sr_no":index+1,"session":item.session,"class":item.class_name,"monthly":item.total_monthly_fee,"annualy":item.total_annual_fee,"one_time":item.total_one_time_fee,"grand_total":item.grand_total,"action":<td><button className="btn btn-secondary mr-2" onClick={() => this.editFeeStructureObject(item)}><i class="fas fa-pencil-alt"></i></button><button onClick = { () => this.deleteFeeStructure(item._id)} className="btn btn-danger"><i className="fa fa-trash" aria-hidden="true"></i></button></td>})
        })}
          var columns = [
            { title: "SR NO", data: "sr_no" },
            { title: "Session", data: "session" },
            { title: 'Class',data: "class"},
            { title: "One Time", data: "one_time" },
            { title: 'Monthly Fee', data: "monthly"},
            { title: 'Annual Fee', data: "annualy"},
            { title: "Grand Total", data: "grand_total" },
            { title: "Action", data: "action" },
          ];
          const click = (row) => {
            console.log(row);
          };
          const currentMonth = this.state.currentMonth
        return(
            <>
            <div id="myModal" class="modal fade" role="dialog">
                <div class="modal-dialog">

                    {/* <!-- Modal content--> */}
                    <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">Import Fee Structure</h4>
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                    </div>
                    <div class="modal-body">
                        <div className="row">
                            <div className="col-md-3">
                                <label>From Session *</label>
                                <select className="form-control" onChange={(e)=>{{this.setState({ImportSession:e.target.value.toUpperCase()});this.getClass()}}}>
                                    <option value="">Select Session</option>
                                    {this.state.AllSession.map((item,index)=>{
                                        return(
                                            <option value={item.session_code}>{item.session_code}</option>
                                        )
                                    })}
                            </select>
                            </div>
                            <div className="col-md-3">
                                <label>To Session *</label>
                                <select className="form-control" value={this.state.session} onChange={(e)=>{{this.setState({session:e.target.value.toUpperCase()});this.getClass()}}}>
                                    <option value="">Select Session</option>
                                    {this.state.AllSession.map((item,index)=>{
                                        return(
                                            <option value={item.session_code}>{item.session_code}</option>
                                        )
                                    })}
                            </select>
                            </div>
                            <div className="col-md-6">
                                <br/>
                                <button className="btn btn-success btn-block" onClick={()=>{this.ImportSession()}}>Import</button>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    </div>
                    </div>

                </div>
            </div>
{/* end modal */}
             <div className= "row printCard printAllStructure" style={{display:"none"}}  >
                <div className="col-12 ">
                    {/* <div className="col-12 text-center pb-5">
                        <h3>ST. JUDES'S SCHOOL</h3>
                        <p>WEST CANAL ROAD P.O MAJRA, DEHRADUN</p>
                        <p>0135-2640930,0135-2642828,FAX:0135-2644353</p>
                    </div> */}
                    <div className="col-12 text-center pb-2">
                        <h2 className="text-center">FEE STRUCTURE ({this.state.session})</h2>
                    </div>
                <table class="table">
                    <thead>
                      <tr>
                        <th scope="col">CLASS</th>
                        <th scope="col">PROSP</th>
                        <th scope="col">REGN</th>
                        <th scope="col">ADMSN</th>
                        <th scope="col">SEC</th>
                        <th scope="col">TOTAL</th>
                        <th scope="col">CARD&DIARY</th>
                        <th scope="col">PRIZE</th>
                        <th scope="col">DEVELOP</th>
                        <th scope="col">MAGAZINE</th>
                        <th scope="col">SPORTS</th>
                        <th scope="col">EXAM</th>
                        <th scope="col">COMPUTER</th>
                        <th scope="col">CISCE</th>
                        <th scope="col">BOARD</th>
                        <th scope="col">MISC</th>
                        <th scope="col">TOTAL</th>
                        <th scope="col">TUITION</th>
                        <th scope="col">TOTAL</th>
                      </tr>
                    </thead>
                    <tbody>
                {this.state.AllFeeStructure.map((item,index)=>{
                     var computerfee=0
                     var computerfeecount=0
                return(
                      <tr>
                        <th scope="row">{item.class_name}</th>
                        {JSON.parse(item.fees).map((it,ind)=>{
                        if(it.fee_category=="ONE TIME"){
                        return(
                            <td>{it.amount}</td> 
                            )
                        }
                        })}
                        <td>{item.total_one_time_fee}</td>
                       {JSON.parse(item.fees).map((it,ind)=>{
                        if(it.fee_category=="ANNUAL"){
                            if(it.fee_sub_category.includes("COMPUTER")){
                                if(computerfeecount ==0){
                                computerfee= parseInt(computerfee)+parseInt(it.amount)
                                computerfeecount =1
                                }else{
                                    computerfee=parseInt(computerfee)+parseInt(it.amount)
                                    return(
                                        <td>{computerfee}</td>
                                     )
                                }
                            }else{
                        return(
                            <td>{it.amount}</td>
                         )
                        }
                        }
                    })}
                     <td>{item.total_annual_fee}</td>
                     {JSON.parse(item.fees).map((it,ind)=>{
                        if(it.fee_category=="MONTHLY"){
                            if(it.fee_sub_category.includes("TUITION")){
                        return(
                            <td>{it.amount}</td>
                         )
                        }
                        }
                    })}
                     <td>{item.total_monthly_fee}</td>
                      </tr>
                )
                })}
                  </tbody>
                  </table>
                </div>
            </div>
            <div className="row layoutCard firstsection">
                <div className="col-12">
                    <div className="form-row">
                        <div className="col-3 form-group">
                            <label>Session *</label>
                           <select className="form-control" value={this.state.session} onChange={(e)=>{{this.setState({session:e.target.value.toUpperCase()});this.getClass()}}}>
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
                            <label>Class *</label>
                           <select className="form-control" value={this.state.class_name} onChange={(e)=>{{this.setState({class_name:e.target.value.toUpperCase()})}}}>
                           <option value="">Select Class</option>
                           {this.state.AllClass.map((item,index)=>{
                                 return(
                                    <option value={item.class_name}>{item.class_name}</option>
                                 )
                             })}
                           </select>
                           <span className="errorMessage" style={{fontSize:'14px',fontWeight:600}}>{this.state.class_nameErrorMessage}</span>
                        </div>
                        {/* <div className="col-3 form-group">
                            <label>Section *</label>
                           <select className="form-control" value={this.state.section} onChange={(e)=>{{this.setState({section:e.target.value.toUpperCase()})}}}>
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
                        </div> */}
                        <div className="col-3 form-group">
                            <div className="form-row" style={{display:'flex',alignItems:'center'}}>
                                <div className="col-2 form-group">
                                    <br/>
                                    <input id="FirstCLass?" type="Checkbox" className="form-control" />
                                </div>
                                <div className="col-10 form-group">
                                <br/>
                                    <label for="FirstCLass?">Same For All Section</label>
                                </div>
                            </div>
                        </div>
                        <div className="col-3 form-group">
                        <br/>
                        <button className="btn btn-info" data-toggle="modal" data-target="#myModal">Import From Previous Session</button>
                        </div>
                        {/* <div className="col-3 form-group">
                            <label>Category *</label>
                           <select className="form-control" onChange={(e)=>{{this.setState({category:e.target.value.toUpperCase()})}}}>
                           <option value="">Select Category</option>
                             {this.state.AllCategory.map((item,index)=>{
                                 return(
                                    <option value={item.category}>{item.category}</option>
                                 )
                             })}
                           </select>
                        </div> */}
                    </div>
                </div>
            </div>
            <div className="row layoutCard">
                <div className="col-12">
                    <div className="form-row">
                        <div className="col-12 pb-2">
                            <h3>One Time Fee</h3>
                        </div>
                        {this.state.AllSubCategory.map((item,index)=>{
                        if(item.fee_category=="ONE TIME"){
                        return(
                            <div className="col-3 form-group">
                            <label>{item.fee_sub_category}{item.month}</label>
                            <input type="text" className="form-control" value={item.amount} onChange={(e)=>{this.SetFee(index,e)}}/>
                            </div>
                            )
                        }
                        })}
                        {/* <div className="col-2 form-group">
                            <label>Prospectus Fee *</label>
                            <input type="text" className="form-control" value="0" onChange={(e)=>{{this.setState({prospectus_fee:e.target.value.toUpperCase()})}}}/>
                        </div>
                        <div className="col-2 form-group">
                            <label>Registration Fee *</label>
                            <input type="text" className="form-control" value="0" onChange={(e)=>{{this.setState({registration_fee:e.target.value.toUpperCase()})}}}/>
                        </div>
                        <div className="col-2 form-group">
                            <label>Admission Fee *</label>
                            <input type="text" className="form-control" value="0" onChange={(e)=>{{this.setState({admission_fee:e.target.value.toUpperCase()})}}}/>
                        </div>
                        <div className="col-2 form-group">
                            <label>Security Fee *</label>
                            <input type="text" className="form-control" value="0" onChange={(e)=>{{this.setState({security_fee:e.target.value.toUpperCase()})}}}/>
                        </div>
                        <div className="col-2 form-group">
                            <label>Total One Time</label>
                            <input type="text" className="form-control" value={this.state.total_one_time} onClick={()=>{this.total_one_time()}} onChange={(e)=>{{this.setState({total_one_time:e.target.value.toUpperCase()})}}}/>
                        </div> */}
                    </div>
                </div>
            </div>
            <div className="row layoutCard">
                <div className="col-12">
                    <div className="form-row">
                        <div className="col-12 pb-2">
                            <h3>Annual Fee </h3>
                        </div>
                        {this.state.AllSubCategory.map((item,index)=>{
                        if(item.fee_category=="ANNUAL"){
                        return(
                            <div className="col-3 form-group">
                            <label>{item.fee_sub_category} ({item.month})</label>
                            <input type="text" className="form-control" value={item.amount} onChange={(e)=>{this.SetFee(index,e)}} />
                            </div>
                            )
                        }
                        })}
                    </div> 
                </div> 
            </div> 
            <div className="row layoutCard">
                {/* <div className="col-3">
                    <div className="form-row">
                        <div className="col-12 pb-2">
                            <h3>Half Yearly Fee </h3>
                        </div>
                        <div className="col-12 form-group">
                            <label>Computer Fee</label>
                            <input type="text" value={this.state.computer_fee} className="form-control" value="0" />
                        </div>    
                    </div> 
                </div>  */}
                <div className="col-12">
                    <div className="form-row"> 
                        <div className="col-12 pb-2">
                            <h3>Monthly Fee </h3>
                        </div>  
                        {this.state.AllSubCategory.map((item,index)=>{
                        if(item.fee_category=="MONTHLY"){
                        return(
                            <div className="col-3 form-group">
                            <label>{item.fee_sub_category}{item.month}</label>
                            <input type="text" className="form-control" value={item.amount} onChange={(e)=>{this.SetFee(index,e)}} />
                            </div>
                            )
                        }
                        })}   
                        <div className="col-3 form-group">
                            <label>Total One Time Fee</label>
                            <input type="text" value={this.state.total_one_time_fee} className="form-control" />
                        </div>
                        <div className="col-3 form-group">
                            <label>Total Annual Fee</label>
                            <input type="text" value={this.state.total_annual_fee} className="form-control"/>
                        </div>
                        <div className="col-3 form-group">
                            <label>Total Monthly Fee</label>
                            <input type="text" value={this.state.total_monthly_fee} className="form-control" />
                        </div>
                        <div className="col-3 form-group">
                            <label>Grand Total</label>
                            <input type="text" value={this.state.grand_total} className="form-control" />
                        </div>
                       
                        <div className="col-3 form-group">
                         
                         <label> </label>
                         <button className="btn btn-success mt-5" onClick={()=>{this.submitFeeStructureData()}}>Save</button>
                         <label> </label>
                         <button class="hide-on-print btn btn-primary btn-md mt-5" onClick={this.printReceipt}>Print</button>
                         {this.state.updateBtn ?
                        <button className="btn btn-secondary ml-3 mt-5" type="submit" onClick={(e) => this.UpdateFeeStructureData(e)}>Update</button>
                        :null
                        }
                        </div>
                    </div>
                </div>
            </div>
            
            <div className= "row layoutCard datatable">
            <div className="col-12 text-center pb-2">
                        <h3 className="text-center p-4">FEE STRUCTURE ({this.state.session})</h3>
                    </div>
                <div className="col-12">
                <table class="table table-striped">
                    <thead>
                        <tr>
                        <th scope="col">Sr No</th>
                        <th scope="col">Class</th>
                        <th scope="col">One Time</th>
                        <th scope="col">Monthly</th>
                        <th scope="col">Annual</th>
                        <th scope="col">Grand Total</th>
                        <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.state.AllFeeStructure.map((item,index)=>{
                        return(
                        <tr>
                        <td>{index+1}</td>
                        <th >{item.class_name}</th>
                        <td>{item.total_one_time_fee}</td>
                        <td>{item.total_monthly_fee}</td>
                        <td>{item.total_annual_fee}</td>
                        <td>{item.grand_total}</td>
                        <td><button className="btn btn-secondary mr-2" onClick={() => this.editFeeStructureObject(item)}><i class="fas fa-pencil-alt"></i></button><button onClick = { () => this.deleteFeeStructure(item._id)} className="btn btn-danger"><i className="fa fa-trash" aria-hidden="true"></i></button></td>
                        </tr>
                        )
                    })}
                        
                    </tbody>
                </table>
                <DataTable
                pageSize={50}
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
export default FeeStructure;