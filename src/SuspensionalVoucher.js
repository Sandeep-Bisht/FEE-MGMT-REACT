import React from 'react';
import Moment from 'moment';
import DataTable from '@bit/adeoy.utils.data-table';


class SuspensionalVoucher extends React.Component{
    constructor(props){
        super(props)
        this.state={
            _id:'',
            AllSession:[],
            vehicle_type:'',
            vehicle_no:'',
            root:'',
            root_description:'',
            driver_name:'',
            contact_no:'',
            owner_address:'',
            AllSuspensionalFees:[],
            updateBtn:false,
            session:localStorage.getItem('SessionAccess'),
            AllClass:[],
            receipt_date: Moment().format('YYYY-MM-DD'),
            account_no:'',
            admission_no:'',
            class_name:'',
            amount:'',
            remark:'',
            AllBank:[],
            bank:'',

        }
    
    }
    componentDidMount(){
        this.getSuspensionalFee()
        this.getClass()
        this.getBankData()
        this.getSession()
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
                this.setState({AllSession: data})
            })
            .then(err => console.log(err))
    }
    getBankData = () => {
        fetch("http://144.91.110.221:4800/getBankData"
        , {
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
                this.setState({AllBank: data})
                console.log(data)
            })
            .then(err => console.log(err))
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
                console.log(data)
                this.setState({AllClass: data})
            })
            .then(err => console.log(err))
    }
    getSuspensionalFee= async()=>{
        fetch("http://144.91.110.221:4800/getSuspensionalFeeWithAdmissionNoZero"
        ,{
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                admission_no: '0',
                session:this.state.session,
            })
        })
        .then((data) => data.json())
        .then(async (data) => {  
            console.log( 'single parent'+data )  
            if(data[0] !=undefined){
                this.setState({AllSuspensionalFees: data})
            }
        })
        // await this.setBalance()
    }
    // getSuspensionalFee = () => {
    //     fetch("http://144.91.110.221:4800/getSuspensionalFee")
    //         .then(res => res.json())
    //         .then(data => {
    //             console.log(data)
    //             this.setState({AllSuspensionalFees: data})
    //         })
    //         .then(err => console.log(err))
    // }
    // editSuspensioanalFee = (obj) => {
    //     this.setState({updateBtn:true})
    //     let _id   =   obj._id
    //     let admission_no = obj.admission_no
    //     let bank = obj.bank
    //     let account_no = obj.account_no
    //     let rceipt_date = obj.rceipt_date
    //     let class_name = obj.class_name
    //     let amount= obj.amount
    //     let remark =obj.remark
    //     this.setState({_id,admission_no,account_no,rceipt_date,class_name,amount,remark})
    // }
    // updateSuspensionalFeeData =()=>{
        
    //     const data = new FormData()
    //     data.append('_id',this.state._id)
    //     data.append('receipt_date', this.state.receipt_date)
    //     data.append('bank', this.state.bank)
    //     data.append('admission_no', this.state.admission_no)
    //     data.append('account_no', this.state.account_no)
    //     data.append('class_name', this.state.class_name)
    //     data.append('amount', this.state.amount)
    //     data.append('remark', this.state.remark)
    //     const url="http://144.91.110.221:4800/SuspensionalFeeData"
    //             fetch(url,
    //                 {
    //                 method:'put',
    //                 body:data
    //             })
    //             .then(res => res.json())              
    //             .then((res)=>{  
    //            alert('updated successfully !');
    //            this.getSuspensionalFee()
    //             })            
    //             .then(err=>console.log(err))
              
    //   }
    deleteSuspensionalFee(id){
        const apiUrl = 'http://144.91.110.221:4800/DeleteReceipt';
        fetch(apiUrl, {
          headers : { 
            'Content-Type':'application/json',
            'Accept':'application/json'
          },
          method:'delete',  
          body:JSON.stringify({_id:id})
          })
        .then((response) => response.json())
        .then((res) => {
        alert("Deleted Successfully")
        this.setState({AllOldFees:[]})
        this.getSuspensionalFee()
        })
}
    //   deleteSuspensionalFee = (id) => {
    //     const apiUrl = 'http://144.91.110.221:4800/deleteSuspensionalFee';
    //     fetch(apiUrl, {
    //       headers : { 
    //         'Content-Type': 'application/json',
    //         'Accept': 'application/json'
    //       },
    //       method:'delete',  
    //       body:JSON.stringify({_id:id})
    //     })
    //     .then((response) => response.json())
    //     .then((res) => {
    //     alert("Deleted Successfully")
    //     this.getSuspensionalFee()
          
    //     })
        
    //   }


      submitSuspensionalFeeData = async() => {

            const data = new FormData()
            data.append('receipt_date', this.state.receipt_date)
            data.append('take_computer', '')
            data.append('fee_concession', '')
            data.append('is_teacher_ward', '')
            data.append('is_full_free_ship', '')
            data.append('unique_id', this.state.session)
            data.append('defaulter_month', '')

            
            data.append('last_fee_date', this.state.receipt_date)

            data.append('receipt_no', this.state.receipt_no)
            data.append('ref_receipt_no','')
            data.append('session', this.state.session)
            data.append('admission_no', '0')
            data.append('class_name', '')
            data.append('section', '')
            data.append('account_no', '0')
            data.append('name', 'Suspicious')
            data.append('prospectus_fee', '0')
            data.append('registration_fee', '0')
            data.append('admission_fee', '0')
            data.append('security_fee', '0')
            data.append('paid_fees', JSON.stringify([]))
            data.append('Allfees', JSON.stringify([{"_id":"605ab3a75f0e3067241cd753","fee_category":"ANNUAL","fee_sub_category":"REPORT CARD AND DIARY","amount":0,"month":"4","status":"ACTIVE","createdAt":"2021-03-24T03:36:07.195Z","updatedAt":"2021-03-24T03:36:07.195Z","__v":0},{"_id":"605ab3d35f0e3067241cd754","fee_category":"ANNUAL","fee_sub_category":"ANNUAL PRIZE DAY","amount":0,"month":"4","status":"ACTIVE","createdAt":"2021-03-24T03:36:51.313Z","updatedAt":"2021-03-24T03:36:51.313Z","__v":0},{"_id":"605ab3f95f0e3067241cd755","fee_category":"ANNUAL","fee_sub_category":"DEVELOPMENT FUND","amount":0,"month":"7","status":"ACTIVE","createdAt":"2021-03-24T03:37:29.466Z","updatedAt":"2021-03-24T03:37:29.466Z","__v":0},{"_id":"605ab4145f0e3067241cd756","fee_category":"ANNUAL","fee_sub_category":"SCHOOL MAGAZINE","amount":0,"month":"9","status":"ACTIVE","createdAt":"2021-03-24T03:37:56.199Z","updatedAt":"2021-03-24T03:37:56.199Z","__v":0},{"_id":"605ab44c5f0e3067241cd757","fee_category":"ANNUAL","fee_sub_category":"ANNUAL SPORTS DAY","amount":0,"month":"11","status":"ACTIVE","createdAt":"2021-03-24T03:38:52.435Z","updatedAt":"2021-03-24T03:38:52.435Z","__v":0},{"_id":"605ab4665f0e3067241cd758","fee_category":"ANNUAL","fee_sub_category":"EXAMINATION FEE","amount":0,"month":"1","status":"ACTIVE","createdAt":"2021-03-24T03:39:18.967Z","updatedAt":"2021-03-24T03:39:18.967Z","__v":0},{"_id":"605ab47e5f0e3067241cd759","fee_category":"ANNUAL","fee_sub_category":"COMPUTER (1)","amount":"0","month":"8","status":"ACTIVE","createdAt":"2021-03-24T03:39:42.734Z","updatedAt":"2021-03-24T03:39:42.734Z","__v":0},{"_id":"605ab4885f0e3067241cd75a","fee_category":"ANNUAL","fee_sub_category":"COMPUTER (2)","amount":"0","month":"12","status":"ACTIVE","createdAt":"2021-03-24T03:39:52.971Z","updatedAt":"2021-03-24T03:39:52.971Z","__v":0},{"_id":"605ab4f25f0e3067241cd75b","fee_category":"ANNUAL","fee_sub_category":"REGISTRATION FEE ICSE","amount":0,"month":"8","status":"ACTIVE","createdAt":"2021-03-24T03:41:38.949Z","updatedAt":"2021-03-24T03:41:38.949Z","__v":0},{"_id":"605ab5105f0e3067241cd75c","fee_category":"ANNUAL","fee_sub_category":"BOARD FEE","amount":0,"month":"8","status":"ACTIVE","createdAt":"2021-03-24T03:42:08.362Z","updatedAt":"2021-03-24T03:42:08.362Z","__v":0},{"_id":"605ab55c5f0e3067241cd75d","fee_category":"ONE TIME","fee_sub_category":"PROSPECTUS FEE","amount":0,"month":"","status":"ACTIVE","createdAt":"2021-03-24T03:43:24.314Z","updatedAt":"2021-03-24T03:43:33.296Z","__v":0},{"_id":"605ab5835f0e3067241cd75e","fee_category":"ONE TIME","fee_sub_category":"REGISTRATION FEE","amount":0,"month":"","status":"ACTIVE","createdAt":"2021-03-24T03:44:03.457Z","updatedAt":"2021-03-24T03:44:15.255Z","__v":0},{"_id":"605ab5a25f0e3067241cd75f","fee_category":"ONE TIME","fee_sub_category":"ADMISSION FEE","amount":0,"month":"","status":"ACTIVE","createdAt":"2021-03-24T03:44:34.711Z","updatedAt":"2021-03-24T03:44:34.711Z","__v":0},{"_id":"605ab5b75f0e3067241cd760","fee_category":"ONE TIME","fee_sub_category":"SECURITY FEE","amount":0,"month":"","status":"ACTIVE","createdAt":"2021-03-24T03:44:55.709Z","updatedAt":"2021-03-24T03:44:55.709Z","__v":0},{"_id":"605ab5cc5f0e3067241cd761","fee_category":"MONTHLY","fee_sub_category":"TUITION FEE","amount":this.state.amount,"month":"","status":"ACTIVE","createdAt":"2021-03-24T03:45:16.306Z","updatedAt":"2021-03-24T03:45:25.867Z","__v":0},{"_id":"605ab5ee5f0e3067241cd762","fee_category":"MONTHLY","fee_sub_category":"BUS FARE","amount":"0","month":"","status":"ACTIVE","createdAt":"2021-03-24T03:45:50.649Z","updatedAt":"2021-03-24T03:45:50.649Z","__v":0},{"_id":"605ab6035f0e3067241cd763","fee_category":"ANNUAL","fee_sub_category":"MISC","amount":"0","month":"","status":"ACTIVE","createdAt":"2021-03-24T03:46:11.356Z","updatedAt":"2021-03-24T03:46:11.356Z","__v":0}]))
            data.append('fees', JSON.stringify([]))
            data.append('paid_months', JSON.stringify([]))
            data.append('paid_amount', this.state.amount)
            data.append('fine', '0')
            data.append('balance', '0')
            data.append('paid_month', '0')
            data.append('total_annual_fee', '0')
            data.append('total_one_time_fee', '0')
            data.append('total_monthly_fee', this.state.amount)
            data.append('grand_total', this.state.amount)
            data.append('payment_mode', 'BANK')
            data.append('bank', this.state.bank)
            data.append('bank_v_no','')
            data.append('check_no', '')
            data.append('bank_date', '')
            const url = "http://144.91.110.221:4800/StoreReceipt"
            fetch(url, {
                    method: 'post',
                    body: data
                })
                .then(res => res.json())
               
                .then(data => {
                    alert("Details Stored Successfully !")
                    this.getSuspensionalFee()
                        
                })
                .then(err => {})            
    
        }
    // submitSuspensionalFeeData = () => {
    //     const data = new FormData()
    //     data.append('receipt_date', this.state.receipt_date)
    //     data.append('bank', this.state.bank)
    //     data.append('admission_no', this.state.admission_no)
    //     data.append('account_no', this.state.account_no)
    //     data.append('class_name', this.state.class_name)
    //     data.append('amount', this.state.amount)    
    //     data.append('remark', this.state.remark)  
    //     const url = "http://144.91.110.221:4800/StoreSuspensionalVoucher"
    //     fetch(url, {
    //             method: 'post',
    //             body: data
    //         })
    //         .then(res => res.json())
    //         .then(data => {
    //             alert("Store Successfully") 
    //             this.getSuspensionalFee()               
    //         })
    //         .then(err => {})

    // }
    render(){
        const data =[];
        {this.state.AllSuspensionalFees.map((item,index)=>{
        data.push( {"sr_no":index+1,"admission_no":item.admission_no,"bank":item.bank,"account_no":item.account_no,"receipt_date":item.receipt_date,"amount":item.paid_amount,"action":<td><button onClick={() => {if(window.confirm('Are You Sure?')){this.deleteSuspensionalFee(item._id)};}} className="btn btn-danger"><i className="fa fa-trash" aria-hidden="true"></i></button></td>})
        })}
          const columns = [
            { title: "SR NO", data: "sr_no" },
            { title: 'Receipt Date',data: "receipt_date"},
            { title: 'Bank',data: "bank"},
            { title: "Admission No", data: "admission_no" },
            { title: 'Account No',data: "account_no"},
            { title: 'Amount',data: "amount"},
            { title: 'Action',data: "action"},
          ];
          const click = (row) => {
            console.log(row);
          };
        return(
            <>
            <div className="row layoutCard">
                <div className="col-12">
                    <div className="form-row">
                    <div className="col-3 form-group " >
                                  <label>Session</label>
                                <select className="form-control" value={this.state.session} onChange={(e)=>{this.setState({session:e.target.value.toUpperCase(),sessionErrorMessage:undefined})}}>
                                <option value="">Select Session</option>
                              {this.state.AllSession.map((item,index)=>{
                                  return(
                                    <option value={item.session_code}>{item.session_code}</option>
                                    )
                              })}
                           </select>
                                </div>  
                        <div className="col-3 form-group">
                            <label>Receipt Date</label>
                            <input type="date" value={this.state.receipt_date} className="form-control" onChange={(e)=>{{this.setState({receipt_date:e.target.value.toUpperCase()})}}} />
                           
                        </div>
                        <div className="col-3 form-group"> 
                                    <label>Bank</label>
                                    <select className="form-control" onChange={(e)=>{this.setState({bank:e.target.value.toUpperCase()});}} value={this.state.bank}>
                                        <option value="">Choose Bank</option>
                                       {this.state.AllBank.map((item,index)=>{
                                           return(
                                            <option value={item.bank}>{item.bank}</option>
                                           )
                                       })}
                                    </select>    
                                    <span className="errorMessage" style={{fontSize:'14px',fontWeight:600}}>{this.state.bankErrorMessage}</span>
                        </div>
                        {/* <div className="col-3 form-group">
                            <label>Admission No</label>
                            <input type="text" value={this.state.admission_no} className="form-control" onChange={(e)=>{{this.setState({admission_no:e.target.value.toUpperCase()})}}} />
                           
                        </div>
                        <div className="col-3 form-group">
                            <label>Account No</label>
                            <input type="text" value={this.state.account_no} className="form-control" onChange={(e)=>{{this.setState({account_no:e.target.value.toUpperCase()})}}} />
                        </div> */}
                        {/* <div className="col-3 form-group">
                            <label>Class Name</label>
                            <select className="form-control" onChange={(e)=>{this.setState({class_name:e.target.value.toUpperCase() })}} value={this.state.class_name} >
                               <option value="">Select Class</option>
                               {this.state.AllClass.map((item,index)=>{
                                 return(
                                    <option value={item.class_name}>{item.class_name}</option>
                                 )
                             })}
                           </select>
                        </div> */}
                        <div className="col-2 form-group">
                            <label>Amount</label>
                            <input type="text" value={this.state.amount} className="form-control" onChange={(e)=>{{this.setState({amount:e.target.value.toUpperCase()})}}} />
                        </div>
                        {/* <div className="col-3 form-group">
                            <label>Remark</label>
                            <textarea className="form-control" onChange={(e)=>{{this.setState({remark:e.target.value.toUpperCase()})}}}>{this.state.remark}</textarea>
                        </div> */}
                        
                        <div className="col-1 form-group d-flex align-items-end">
                         <button className="btn btn-success" onClick={()=>{this.submitSuspensionalFeeData()}}>Save</button>
                         {this.state.updateBtn ?
                        <button className="btn btn-secondary ml-3" type="submit" onClick={(e) => this.updateSuspensionalFeeData(e)}>Update</button>
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
export default SuspensionalVoucher;