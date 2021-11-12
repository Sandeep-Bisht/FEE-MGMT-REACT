import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import csv from 'csv';
import Moment from 'moment';
var CallFeeClassWise=false
var DuplicateArray=[]
var global_receipt_no=1
var ShowArray=[]
class VoucherEntry extends Component {
    constructor(props){
        super(props)
        this.state={
            session:localStorage.getItem('SessionAccess'),
            fine_date:'',
            defaultFine:'0',
            fine:'0' , 
            manualFine:'0',
            manualFineState:'false',  
            bank:'',
            AllBank:[],
            receipt_date:'',
            receipt_no:'',
            ShowArray:[]       
        }
    }
componentDidMount(){
this.getFine()
this.getBankData()
this.getFeeReceipt()
}
getFeeReceipt=(class_names,sections)=>{ 
    var fetchPromise = "" ;   
    console.log("checking response FeesClasswise")
    // const currentMonth =  Moment().format('MM')       
      fetchPromise=  fetch("http://144.91.110.221:4800/getFeeReceipt"
     ,{
         method: 'POST',
         headers: {
             Accept: 'application/json',
             'Content-Type': 'application/json'
        },
        body: JSON.stringify({
             session:this.state.session,
        })
     })
     .then((data) => data.json())
     .then(async (data) => {  
        await console.log( 'Class Wise'+data ) 
            this.set_receipt_no(data)
            await console.log( 'Class Wise'+data ) 
     })
    // alert(val)
    if(fetchPromise !=""){
        return true
    }
    
 }
set_receipt_no=(data)=>{
    if(data != ""){          
        console.log('receiptno '+data.receipt_no)
        var receipt_no=parseInt(data.receipt_no)+1
        global_receipt_no  =  parseInt(data.receipt_no) 
        }else{
        this.setState({global_receipt_no:1})
    }
    return true
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
        session: this.state.session,
        school_id: "100"
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
checkValidation = () => {
    if (this.state.receipt_date === undefined || this.state.receipt_date == "") {
        this.setState({receipt_dateErrorMessage: "Please Choose Receipt Date"})
        return false
    }else if (this.state.bank === "") {
        this.setState({bankErrorMessage: "Please Select Bank"})
        return false
    }
    else {
        return true
    }
  }
submitReceiptData = async(StudentData,paidFees,remainbalance,plus_one_time_fees,total_monthly_fee,show_annual_fees,grand_total,fine,shortmonths,last_fee_date) => {

    if(!DuplicateArray.includes(StudentData.admission_no)){
        DuplicateArray.push(StudentData.admission_no)
    // await  console.log(JSON.stringify(this.state.Allfees))
    // alert("AlL Fees Data "+StudentData.paid_amount)
    global_receipt_no=global_receipt_no+1

      if (this.checkValidation()) {
        ShowArray.push({"admission_no":StudentData.admission_no,"paid_amount":StudentData.paid_amount,"name":StudentData.name})
        this.setState({ShowArray:ShowArray})
      const data = new FormData()
      data.append('receipt_date', this.state.receipt_date)
      data.append('take_computer', StudentData.take_computer)
      data.append('fee_concession', StudentData.fee_concession)
      data.append('is_teacher_ward', StudentData.is_teacher_ward)
      data.append('is_full_free_ship', StudentData.is_full_free_ship)
      data.append('unque_id', this.state.session+this.state.receipt_no)
      data.append('defaulter_month',  Moment(this.state.receipt_date).format("M"))

      if(Moment(StudentData.last_fees_date).format('M')=="3" && this.state.session == StudentData.last_session && StudentData.last_fee_status==true ){
          data.append('last_fee_date', "2021-03-31")  
      }else{
      data.append('last_fee_date',last_fee_date)
      }
      data.append('receipt_no', global_receipt_no)
      data.append('ref_receipt_no', this.state.ref_receipt_no)
      data.append('session', this.state.session)
      data.append('admission_no', StudentData.admission_no)
      data.append('class_name', StudentData.class_name)
      data.append('section', StudentData.section)
      data.append('account_no', StudentData.account_no)
      data.append('name', StudentData.name)
      data.append('prospectus_fee', 0)
      data.append('registration_fee', 0)
      data.append('admission_fee', 0)
      data.append('security_fee', 0)
      data.append('paid_fees', JSON.stringify(paidFees))
      data.append('Allfees', JSON.stringify(StudentData.AllFees))
      data.append('fees', JSON.stringify([]))
      data.append('paid_months', JSON.stringify(shortmonths))
      data.append('paid_amount', StudentData.paid_amount)
      data.append('fine', fine)
      data.append('balance', remainbalance)
      data.append('paid_month', shortmonths[shortmonths.length-1])
      data.append('total_annual_fee', show_annual_fees)
      data.append('total_one_time_fee', plus_one_time_fees)
      data.append('total_monthly_fee', total_monthly_fee)
      data.append('grand_total', grand_total)
      data.append('payment_mode', "CASH")
      data.append('bank', this.state.bank)
      data.append('bank_v_no', this.state.bank_v_no)
      data.append('check_no', this.state.check_no)
      data.append('bank_date', this.state.bank_date)
      console.log("data  ,, "+JSON.stringify(StudentData))

      const url = "http://144.91.110.221:4800/StoreCSVentry"
      fetch(url, {
              method: 'post',
              body: data
          })
          .then(res => res.json())
          .then(data => {
            //   alert("Receipt Details Stored Successfully !")                                  
          })
          .then(err => {})
      }
    }
      }
getFine = () => {
    fetch("http://144.91.110.221:4800/getFine")
        .then(res => res.json())
        .then(data => {
            console.log(data)
            this.setState({fine_date:data[0].fine_date,defaultFine:data[0].amount})
        })
        .then(err => console.log(err))
}
  onDrop(files) {

    this.setState({ files });

    var file = files[0];

    const reader = new FileReader();

    reader.onload = () => {
      csv.parse(reader.result, (err, data) => {
        // console.log(err)
        var userList = [];
        DuplicateArray=[];
        ShowArray=[];
        this.setState({ShowArray:[]})
        // this.getFeeReceipt()
        for (var i = 1; i < data.length; i++) {
          //   var AcademicuserList = [];
          var session = '2021-2022';  
          this.searchByAdmission_no(data[i][0],data[i][1])

      }
        // console.log(JSON.stringify(userList))
        // const dataa = new FormData()
        // dataa.append('AllFeeData', JSON.stringify(userList))
        // //   dataa.append('StudentAcademicData', JSON.stringify(AcademicuserList))
        // const url = "http://144.91.110.221:4800/ImportallFees"
        // fetch(url, {
        //         // headers : { 
        //         //   'Content-Type':'application/json',
        //         //   'Accept':'application/json'
        //         // },
        //         method: 'post',
        //         body: dataa
        //     })
        //     .then(res => res.json())
        //     .then(dataa => {
        //         // alert("Promote Successfully")    
        //         // this.setState({session:this.state.to_session})           
        //     }).catch(err =>{
        //     });
        // userList= []
        // console.log("old data "+ JSON.stringify(userList))
      });
      
    };

    reader.readAsBinaryString(file);
  }

  searchByAdmission_no= async (admission_no,paid_amount)=>{
    await console.log("wait")
    fetch("http://144.91.110.221:4800/singlestudentdata"
        ,{
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            session: this.state.session,
            admission_no: admission_no,
            school_id:"100",
          })
        })
    .then((data) => data.json())
    .then(async (data) => {  
        if(data[0] !=undefined){
            // balance:data[0].balance,
           
            // this.getFine();
            // this.getNewSeeionFees(data[0].class_name,data[0].section)
            this.FeesClasswise(data,paid_amount);     
          }        
    })
} 
      FeesClasswise=(dataa,paid_amount)=>{    
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
                class_name: dataa[0].class_name,
                section: dataa[0].section,
                session:this.state.session,
            })
        })
        .then((data) => data.json())
        .then(async (data) => {  
            await console.log( 'Class Wise'+data )  
            if(data[0] !=undefined){
              await this.SearchOldfee(JSON.parse(data[0].fees),dataa,paid_amount)
        }
        })
      }
      SearchOldfee= async(AllFees,dataa,paid_amount)=>{
        this.setState({AllOldFees:[]})
        await  console.log("wait wait")
        const admission_no = dataa[0].admission_no
        var StudentData=[]
        fetch("http://144.91.110.221:4800/SearchOldfee"
        ,{
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                admission_no: admission_no
            })
        })
        .then((data) => data.json())
        .then(async (data) => {   
                if(data[0] !=undefined){
                    var A = Moment(data[data.length-1].last_fee_date)
                    var aa =this.state.session.split("-")[0];
                    var B= Moment(aa+"-04-01")
                    var last_date 
                    if(parseInt(A.diff(B, 'days')) < 0){
                      last_date= aa+"-03-31"
                      await this.GetDefaulterMoneySingleStudent(last_date,AllFees,dataa,admission_no,paid_amount,data[data.length-1].session)
                    }
                    else{
                      last_date=data[data.length-1].last_fee_date                      
                      var surplus = 0
                      var due = 0
                      if(parseInt(data[data.length-1].balance) >0  ){
                        surplus=data[data.length-1].balance
                      }else if(parseInt(data[data.length-1].balance) <0 ){
                        due=data[data.length-1].balance
                      }
                      StudentData.push({"AllFees":AllFees,"paid_amount":paid_amount,"admission_no":dataa[0].admission_no,"account_no":dataa[0].account_no,"name":dataa[0].student.name,"class_name":dataa[0].class_name,"section":dataa[0].section,"is_full_free_ship":dataa[0].student.is_full_free_ship,"is_teacher_ward":dataa[0].student.is_teacher_ward,"take_computer":dataa[0].student.take_computer,"tc_status":dataa[0].student.tc_status,"fee_concession":dataa[0].student.fee_concession,"paid_upto_month":dataa[0].student.paid_upto_month,"is_full_free_ship":dataa[0].student.is_full_free_ship,"AllOldFees":data,"last_session":data[data.length-1].session,"last_fees_date":last_date,"balance":data[data.length-1].balance,"surplus":surplus,"due":due})

                      this.setBalance(StudentData,StudentData.length-1)
                    }  
                }
            else{               
                if(dataa[0] != undefined)
                {   
                   await StudentData.push({"AllFees":AllFees,"paid_amount":paid_amount,"admission_no":dataa[0].admission_no,"account_no":dataa[0].account_no,"name":dataa[0].student.name,"class_name":dataa[0].class_name,"section":dataa[0].section,"is_full_free_ship":dataa[0].student.is_full_free_ship,"is_teacher_ward":dataa[0].student.is_teacher_ward,"take_computer":dataa[0].student.take_computer,"tc_status":dataa[0].student.tc_status,"fee_concession":dataa[0].student.fee_concession,"paid_upto_month":dataa[0].student.paid_upto_month,"is_full_free_ship":dataa[0].student.is_full_free_ship,"AllOldFees":data,"last_session":'',"last_fees_date":dataa[0].student.paid_upto_month,"balance":'',"surplus":0,"due":0})

                   this.setBalance(StudentData,StudentData.length-1)
                //    this.setState({last_fees_date:this.state.paid_upto_month,last_session:this.state.studentSession,last_fee_status:false})
                }
            }
        })
    }
    GetDefaulterMoneySingleStudent = async(last_date,AllFees,dataa,admission_no,paid_amount,last_session) => {
      await console.log("wait wait")
      var StudentData=[]
      var a =this.state.session.split("-")[0];
      a =a-1
      var b =this.state.session.split("-")[1];
      b=b-1
      var previousSession =a+"-"+b
     await fetch("http://144.91.110.221:4800/GetDefaulterMoneySingleStudent"
          , {
            method: 'POST',
            headers: {
               Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              session: previousSession,
              admission_no:admission_no
            })
          })
          .then(res => res.json())
          .then(data => {                     
              var surplus = 0
              var due = 0
              if(parseInt(parseInt(data.TotalPreviousBalance)*-1) >0  ){
                 surplus=parseInt(data.TotalPreviousBalance)*-1
              }else if(parseInt(data.TotalPreviousBalance)*-1 <0 ){
                 due=parseInt(data.TotalPreviousBalance)*-1
              }
              StudentData.push({"AllFees":AllFees,"paid_amount":paid_amount,"admission_no":dataa[0].admission_no,"account_no":dataa[0].account_no,"name":dataa[0].student.name,"class_name":dataa[0].class_name,"section":dataa[0].section,"is_full_free_ship":dataa[0].student.is_full_free_ship,"is_teacher_ward":dataa[0].student.is_teacher_ward,"take_computer":dataa[0].student.take_computer,"tc_status":dataa[0].student.tc_status,"fee_concession":dataa[0].student.fee_concession,"paid_upto_month":dataa[0].student.paid_upto_month,"is_full_free_ship":dataa[0].student.is_full_free_ship,"AllOldFees":data,"last_session":last_session,"last_fees_date":last_date,"balance":(parseInt(data.TotalPreviousBalance)*-1),"surplus":surplus,"due":due})
              // alert(this.state.due)
          })
          .then(()=>{
            this.setBalance(StudentData,StudentData.length-1)
          })
          .then(err => console.log(err))
    }


    setBalance =async(StudentData,superIndex)=>{
        // if(StudentData[superIndex]==undefined){
        //     return false
        // }
    
    if(StudentData[superIndex].is_full_free_ship=="false"){
    if(StudentData[superIndex].last_fees_date == ""){
        this.searchByAdmission_no()
    } 
    console.log("checking response setBalance")
    await console.log("wait")
    // alert(StudentData[superIndex].paid_amount)
    var calculateOneTimeFee = 0;
    var grand_total = 0;
    var monthlytotal = 0;
    var annual_fees_sub =0
    var StudentTutionFee=0
                     StudentData[superIndex].AllFees.map((item,index)=>{
                     if(item.fee_category=="MONTHLY"){
                        // if(StudentData[superIndex].is_teacher_ward=="false"){
                        if(item.fee_sub_category == "TUITION FEE" ){
                            if(parseInt(StudentData[superIndex].fee_concession) >= 0 && StudentData[superIndex].fee_concession != ""){
                                StudentTutionFee= parseInt(item.amount)-(parseInt(item.amount)*parseInt(StudentData[superIndex].fee_concession))/100
                                monthlytotal = parseInt(item.amount)-(parseInt(item.amount)*parseInt(StudentData[superIndex].fee_concession))/100
                            }else{
                                StudentTutionFee=item.amount
                                monthlytotal = item.amount
                            }
                        }else{
                                monthlytotal = item.amount
                        }
                        monthlytotal=parseInt(monthlytotal)+parseInt(StudentTutionFee)
                    // }
                     }
                     })
                     if(StudentData[superIndex].TakeOneTimeFee==true){
                        StudentData[superIndex].AllFees.map((item,index)=>{
                            if(item.fee_category=="ONE TIME"){
                                if(item.fee_sub_category =='REGISTRATION FEE'){
                                    this.setState({registration_fee:item.amount})
                                }
                                if(item.fee_sub_category =='PROSPECTUS FEE'){
                                    this.setState({prospectus_fee:item.amount})
                                }
                                if(item.fee_sub_category =='ADMISSION FEE'){
                                    this.setState({admission_fee:item.amount})
                                }
                                if(item.fee_sub_category =='SECURITY FEE'){
                                    this.setState({security_fee:item.amount})
                                }
                                calculateOneTimeFee =calculateOneTimeFee+ parseInt(item.amount)
                            }
                        })
                    }
                    StudentData[superIndex].AllFees.map((item,index)=>{
                        if(item.fee_category=="ANNUAL"){
                                if(item.fee_sub_category.includes("COMPUTER") !=true ){
                                    annual_fees_sub =annual_fees_sub+parseInt(item.amount)
                                }else{
                                    if(StudentData[superIndex].take_computer=="true"){
                                        annual_fees_sub =annual_fees_sub+parseInt(item.amount)
                                }
                            }
                        }
                    })
    var paidFees= [];
    var paidAmount = parseInt(StudentData[superIndex].paid_amount)
    paidAmount = paidAmount+ parseInt(StudentData[superIndex].surplus)+ parseInt(StudentData[superIndex].due)
    var  setpaidAmount = paidAmount+ parseInt(StudentData[superIndex].surplus)+ parseInt(StudentData[superIndex].due)
    var student_tuition_fee =parseInt( StudentTutionFee)
    var months = [];
    var finemonths=0
    var fromtomonths = [];
    var lastmonth=[];
    var shortmonths = [];
    var remainbalance = parseInt(StudentData[superIndex].balance)

    var getOneTimeFeesinpaidAmount=true
    var getOneTimeFees=true
    
    var getgrandtotal=true
    var plus_one_time_fees=0;
    var show_annual_fees = 0;
    var total_monthly_fee = 0

    var EndDate = Moment(StudentData[superIndex].last_fees_date)
    if(Moment(StudentData[superIndex].last_fees_date).format('M')=="3" && this.state.session == this.state.last_session && this.state.last_fee_status==true ){
        // alert("done")
        this.setOneTimeFeeForExtraAmontInMarchMonth()
        fromtomonths.push('3');
        this.state.AllFees.map((item,index)=>{
            if(item.fee_category=="ANNUAL"){
               if(this.state.is_teacher_ward=="false"){
               if(item.fee_sub_category == "MISC" ){
                this.state.AllFees[index].amount=this.state.paid_amount
               }
            }
            }
            })
            paidFees.push({"tuition_fee":0,"fee_month":3,"annual_fees":parseInt(this.state.paid_amount)+parseInt(this.state.balance),"one_time":0})
            this.setState({fromtomonths:fromtomonths,fine:0,remaning_balance:parseInt(this.state.paid_amount)+parseInt(this.state.balance),annual_fee:parseInt(this.state.paid_amount),one_time_fees:0,total_monthly_fee:0,grand_total:parseInt(this.state.paid_amount)+parseInt(this.state.balance),last_fee_date:StudentData[superIndex].last_fees_date})
    }else{ 
    // this code for set All fees not paid to set 0
        {StudentData[superIndex].AllFees.map((item,index)=>{
            if(item.fee_category=="ONE TIME"){
                if(StudentData[superIndex].TakeOneTimeFee!=true){
                    StudentData[superIndex].AllFees[index].amount = 0
                }else{                           
                    // this.FeesClasswise(StudentData[superIndex].class_name,StudentData[superIndex].section)
                }
            }
            if(item.fee_category=="ANNUAL"){
            if(item.fee_sub_category.includes("COMPUTER") !=true){
                if(fromtomonths.includes(item.month) !=true && item.month != ""){
                    StudentData[superIndex].AllFees[index].amount = 0
                }else{
                    // StudentData[superIndex].AllFees[index].amount = StudentData[superIndex].AllDummyfees[index].amount
                    // this.setState({AllFees:StudentData[superIndex].AllFees})
                }
            }else{
                if(StudentData[superIndex].take_computer=="true"){
                    if(fromtomonths.includes(item.month) !=true && item.month != ""){
                        StudentData[superIndex].AllFees[index].amount = 0
                    }else{
                        // StudentData[superIndex].AllFees[index].amount = StudentData[superIndex].AllDummyfees[index].amount
                        // this.setState({AllFees:StudentData[superIndex].AllFees})
                    } 
                }
            }
        }
    })}    
     if(paidAmount<=0){
         remainbalance=paidAmount-parseInt(StudentData[superIndex].total_monthly_fee)
         this.setState({remaning_balance:remainbalance})
         return false
     }
    while( paidAmount >0  ){
        if( Moment(StudentData[superIndex].last_fees_date).format('M')=="3" && StudentData[superIndex].session == StudentData[superIndex].last_session && StudentData[superIndex].last_fee_status==true )  {
            break ;
        }
        if(shortmonths.includes('3')==true)
        {  
            break ;
        }
        EndDate.add(1,'month');
        months.push(EndDate.format('YYYY-MM-DD'));
        fromtomonths.push(EndDate.format('M'));
        lastmonth.push(EndDate.format('YYYY-MM-DD'));
        shortmonths.push(EndDate.format('M'));

        if(StudentData[superIndex].is_teacher_ward=="true"){                
            if(StudentData[superIndex].take_computer=="false"){
                StudentData[superIndex].AllFees.map((item,index)=>{
                    if(fromtomonths[fromtomonths.length-1]==item.month){
                        // alert(fromtomonths+" month"+item.month+" amount"+item.amount)  
                        if(!item.fee_sub_category.includes("COMPUTER")){                      
                        paidAmount = paidAmount-parseInt(item.amount)
                        }
                    }
                })
                paidAmount = paidAmount - student_tuition_fee
                // alert(paidAmount)     
            }else{
                StudentData[superIndex].AllFees.map((item,index)=>{
                    if(fromtomonths[fromtomonths.length-1]==item.month){
                        paidAmount = paidAmount-parseInt(item.amount)                            
                    }
                })
                paidAmount = paidAmount - student_tuition_fee
            }
        }else{
         if(getOneTimeFeesinpaidAmount == true ){
            getOneTimeFeesinpaidAmount= false

            if(StudentData[superIndex].take_computer=="false"){
                StudentData[superIndex].AllFees.map((item,index)=>{
                    if(fromtomonths[fromtomonths.length-1]==item.month){
                        if(!item.fee_sub_category.includes("COMPUTER")){                      
                        paidAmount = paidAmount-parseInt(item.amount)
                        }
                    }
                })
                paidAmount = paidAmount - student_tuition_fee-calculateOneTimeFee    
            }else{
                StudentData[superIndex].AllFees.map((item,index)=>{
                    if(fromtomonths[fromtomonths.length-1]==item.month){
                        paidAmount = paidAmount-parseInt(item.amount)                            
                    }
                })
                paidAmount = paidAmount - student_tuition_fee-calculateOneTimeFee
            }
        }
    else if(getOneTimeFeesinpaidAmount== false){
        if(StudentData[superIndex].is_teacher_ward=="false"){ 
            if(StudentData[superIndex].take_computer=="false"){
                StudentData[superIndex].AllFees.map((item,index)=>{
                    if(fromtomonths[fromtomonths.length-1]==item.month){
                        if(!item.fee_sub_category.includes("COMPUTER")){                      
                        paidAmount = paidAmount-parseInt(item.amount)
                        }
                    }
                })
                paidAmount = paidAmount - student_tuition_fee    
            }else{
                StudentData[superIndex].AllFees.map((item,index)=>{
                    if(fromtomonths[fromtomonths.length-1]==item.month){ 
                        paidAmount = paidAmount-parseInt(item.amount)                            
                    }
                })
                paidAmount = paidAmount - student_tuition_fee
            }                
        }
        else{
            paidAmount = paidAmount - student_tuition_fee-1100
        }
    }
    else{
        remainbalance = paidAmount
    }
}
    }
}
    }
    
//  end paid amount calculation


    // if(Moment(StudentData[superIndex].last_fees_date).format('M')!="3"){
    var last_fee_date = lastmonth[months.length-1] 
    {this.setState({months:shortmonths,feemonths:months,fromtomonths:fromtomonths,last_fee_date:last_fee_date})}
    // }
    await console.log("short Monts"+shortmonths)
    shortmonths.map((i,ind)=>{
        var annual_fees = 0;
        var one_time_fees = 0;
        StudentData[superIndex].AllFees.map((item,index)=>{
            if(item.fee_category=="ANNUAL"){
                if(i==item.month){
                    if(item.fee_sub_category.includes("COMPUTER") !=true ){
                    annual_fees =annual_fees+parseInt(item.amount)
                    }else{
                        if(StudentData[superIndex].take_computer=="true"){
                            annual_fees =annual_fees+parseInt(item.amount)
                        }
                    }
                }else if(item.month==""){
                    if(item.fee_sub_category.includes("COMPUTER") !=true ){
                            if(parseInt(item.amount)>0){
                                annual_fees =(annual_fees+parseInt(item.amount))
                            }else{
                            annual_fees =(annual_fees+parseInt(item.amount))
                            }
                        }else{
                            if(StudentData[superIndex].take_computer=="true"){
                                if(parseInt(item.amount)>0){
                                annual_fees =(annual_fees+parseInt(item.amount))
                                }
                                else{
                                    annual_fees =(annual_fees+parseInt(item.amount))
                                }
                            }
                        }
                }
                else{
                    StudentData[superIndex].AllFees[index].amount=0
                    annual_fees = annual_fees+0
                }
            }
        })
        // alert(annual_fees)
        StudentData[superIndex].AllFees.map((item,index)=>{
                   
            if(item.fee_category=="ONE TIME"){
                    StudentData[superIndex].AllFees[index].amount=0
            }
            getOneTimeFees=false
            })
        show_annual_fees=show_annual_fees+annual_fees
        if(StudentData[superIndex].TakeOneTimeFee==true){
            if(getOneTimeFees==true){
            StudentData[superIndex].AllFees.map((item,index)=>{
                 
            if(item.fee_category=="ONE TIME"){
                    StudentData[superIndex].AllFees[index].amount=0
                    one_time_fees =one_time_fees+ parseInt(item.amount)
                    plus_one_time_fees=parseInt(one_time_fees)
            }
            getOneTimeFees=false
            })
        }
    }
   
    StudentData[superIndex].AllFees.map((item,index)=>{
        if(item.fee_category=="MONTHLY"){     
            // if(StudentData[superIndex].is_teacher_ward=="false"){
                if(item.fee_sub_category == "TUITION FEE" ){
                    if(parseInt(StudentData[superIndex].fee_concession) > 0 && StudentData[superIndex].fee_concession != ""){
                        total_monthly_fee = total_monthly_fee+((parseInt(item.amount)*parseInt(StudentData[superIndex].fee_concession))/100)
                    }else{
                        total_monthly_fee = total_monthly_fee+parseInt(item.amount)
                    }
                    if(parseInt(StudentData[superIndex].fee_concession) == 100 ){
                        total_monthly_fee=0
                    }
            }else{
                total_monthly_fee = total_monthly_fee+parseInt(item.amount)
            }
        // }
    }
    })      
    if(StudentData[superIndex].is_teacher_ward=="false"){  
    if(fromtomonths.length-1 > 1 || parseInt(Moment(this.state.receipt_date).format('D')) > parseInt(this.state.fine_date)){
        var finemonthscount 
        finemonthscount = fromtomonths.length-1
        finemonths = finemonthscount*parseInt(this.state.defaultFine)
        if(parseInt(Moment(this.state.receipt_date).format('D')) > parseInt(this.state.fine_date)){
            finemonths= finemonths+parseInt(this.state.defaultFine)
        }
    }
        if(this.state.manualFineState =="false" ){
        this.setState({fine:finemonths})
        }else{
            this.setState({fine:this.state.manualFine})
        }
    }
    paidFees.push({"tuition_fee":StudentTutionFee,"fee_month":i,"annual_fees":annual_fees,"one_time":one_time_fees})
    if(getgrandtotal==true){
        grand_total = grand_total+monthlytotal+annual_fees+plus_one_time_fees+parseInt(this.state.fine)
        getgrandtotal = false            
    }else{
        grand_total = grand_total+monthlytotal+annual_fees
    }
    
    remainbalance = parseInt(StudentData[superIndex].paid_amount)+parseInt(StudentData[superIndex].surplus)+ parseInt(StudentData[superIndex].due)-grand_total
    {this.setState({total_monthly_fee:total_monthly_fee,grand_total:grand_total,paidFees:paidFees,remaning_balance:remainbalance,one_time_fees:plus_one_time_fees,annual_fee:show_annual_fees})}
    console.log("paid Fees"+JSON.stringify(paidFees)) 
    
    console.log("ALLFees "+JSON.stringify(StudentData[superIndex].AllFees))
    
    // alert("annual="+annual_fees+" , , "+StudentData[superIndex].admission_no+"   , , , ,   "+remainbalance+" , , , , "+StudentData[superIndex].paid_amount+"===="+grand_total) 

})
this.submitReceiptData(StudentData[superIndex],paidFees,remainbalance,plus_one_time_fees,total_monthly_fee,show_annual_fees,grand_total,this.state.fine,shortmonths,last_fee_date)
}


render() {
    const wellStyles = { maxWidth: 400, margin: '0 auto 10px' };
    const fontSize = 5;
    return (
      <div align="center" oncontextmenu="return false">
          <div className="row">
                <div className="col-3">
                    <label>Receipt Date</label>
                    <input type="date" className="w-100 form-control" id="firstInput" value={this.state.receipt_date} onChange={(e)=>{this.setState({receipt_date:e.target.value.toUpperCase(),receipt_dateErrorMessage:undefined})}}/>
                    <span className="errorMessage" style={{fontSize:'14px',fontWeight:600}}>{this.state.receipt_dateErrorMessage}</span>
                </div>
                <div className="col-3">
                    <label>Bank</label>
                    <select  className="form-control" onChange={(e)=>{this.setState({bank:e.target.value.toUpperCase(),bankErrorMessage:undefined})}} value={this.state.bank}  >
                                        <option value="">Choose Bank</option>
                                       {this.state.AllBank.map((item,index)=>{
                                           return(
                                            <option value={item.bank}>{item.bank}</option>
                                           )
                                       })}
                    </select> 
                    <span className="errorMessage" style={{fontSize:'14px',fontWeight:600}}>{this.state.bankErrorMessage}</span>
                </div>
            </div>
        <br /><br /><br />
        <div className="dropzone">
          <Dropzone accept=".csv" onDropAccepted={this.onDrop.bind(this)}>            
          </Dropzone>
          <br /><br /><br />
        </div>
        <h2>Upload or drop your <font size={fontSize} color="#00A4FF">CSV</font><br /> file here.</h2>
        <div className="col-12">
            <h1 className="text-center">Fees Details</h1>
        </div>
        <div className="col-12">
                                <table className="table">
                                    <tr>
                                        <th>SrNo</th>
                                        <th>Admission No</th>
                                        <th>Student Name</th>
                                        <th>Paid Amount</th>
                                    </tr>
                                    {this.state.ShowArray.map((item,index)=>{
                                        return(
                                    <tr>
                                        <td>{index+1}</td>
                                        <td>{item.admission_no}</td>
                                        <td>{item.name}</td>
                                        <td>{item.paid_amount}</td>
                                    </tr>
                                        )
                                    })}
                                </table>
        </div>
      </div>
    )
  }
}

export default VoucherEntry;