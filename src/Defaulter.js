import React from 'react';
// import DataTable from '@bit/adeoy.utils.data-table';
import Moment from 'moment';
import $ from 'jquery'; 
import { CSVLink, CSVDownload } from "react-csv";
import moment from 'moment';
var paidamountbydate=0
var paidamountbyclass=0
var defaulterList =[];

var global_class_name=''
var count=0
var studentArray=[]
var studentArrayWithFee=[]

var PreviousStudentArray=[]
var PreviousStudentArrayWithFee=[]

var paidFees=[]
var PreviousPaidFees=[]
var counter =0
var FinalDefaulter=[]
var loop_i =0;
class Defaulter extends React.Component{
    constructor(props){
        super(props)
        this.state={
          AllDefaulter:[],
          AllClass:[],
          class_name:'',
          session:localStorage.getItem('SessionAccess'),
          Allfees:[],
          DefaulterByMonth:'',
          defaultFine:'',
          fine_date:'',
          AllSession:[],
          AllSection:[],
          section:'',
          AllStudent:[],
          studentArray:[],
          studentArrayWithFee:[],
          PreviousStudentArray:[],
          PreviousStudentArrayWithFee:[],
          paidFees:[],
          PreviousPaidFees:[],
          FinalDefaulter:[]
        }
    }
    componentDidMount(){
      // this.getFeeReceipt()
      this.getClass()
      this.getFine()
      this.getSession()
      this.getSection()
    }
    // getFeeReceipt = () => {
    //   fetch("http://144.91.110.221:4800/getFeeReceipt")
    //       .then(res => res.json())
    //       .then(data => {
    //           console.log(data)
    //           this.setState({AllDefaulter:data})
    //       })
    //       .then(err => console.log(err))
    // }



// ***********  For Previus Session Amount




// PreviousStudentStrenght= async (item)=>{
//   var a =this.state.session.split("-")[0];
//   a =a-1
//   var b =this.state.session.split("-")[1];
//   b=b-1
//   var previousSession =a+"-"+b
//   fetch("http://144.91.110.221:4800/singlestudentdata_with_session"
//       ,{
//         method: 'POST',
//         headers: {
//           Accept: 'application/json',
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//           session: previousSession,
//           admission_no: item.admission_no,
//           school_id:"100",
//         })
//       })
//   .then((data) => data.json())
//   .then(async (data) => {  
//       if(data[0] !=undefined){
//         this.PreviousSearchOldfee(data[0])
         
//       }
//       else{
       
//         PreviousPaidFees.push({"class_name":item.class_name,"monthly":0,"annual_fees":0,"admission_no":item.admission_no,"name":item.name,"account_no":item.account_no,"student_balance":0})
//       this.setState({PreviousPaidFees:PreviousPaidFees})
//       }
//   })
// }

//  PreviousSearchOldfee= async(item)=>{
//    this.setState({PreviousStudentArray:[]})
//   console.log("checking response SearchOldfee")
//   await  console.log("wait wait")
//   const admission_no = item.admission_no
//   fetch("http://144.91.110.221:4800/SearchOldfee"
//   ,{
//       method: 'POST',
//       headers: {
//           Accept: 'application/json',
//           'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//           admission_no: admission_no
//       })
//   })
//   .then((data) => data.json())
//   .then(async (data) => {  
//       console.log( 'single parent'+data )  
//       if(data[0] !=undefined){
//         // var A = Moment(data[data.length-1].last_fee_date)
//         // var B= Moment("2021-04-01")
//         // var last_date 
//         // // alert(Moment(data[data.length-1].last_fee_date).format("YYYY-MM-DD"))
//         // if(parseInt(A.diff(B, 'days')) < 0){
//         //   last_date= "2021-03-31"
//         // }
//         // else{
//         //   last_date=data[data.length-1].last_fee_date
//         // }

//         // "student_balance":data[data.length-1].balance
// if( !JSON.stringify(PreviousStudentArray).includes(item.admission_no+item.account_no+item.class_name)){
//         PreviousStudentArray.push({"paid_upto_month_status":true,"class_name":item.class_name,"section":item.section,"name":item.student.name,"admission_no":admission_no,"account_no":item.account_no,"fee_concession":item.student.fee_concession,"paid_upto_month":data[data.length-1].last_fee_date,"student_balance":data[data.length-1].balance,"unique_key":item.admission_no+item.account_no+item.class_name})
//         this.setState({PreviousStudentArray:PreviousStudentArray})
// }
// this.PrevioussetStudentFeeStructure() 
//         // console.log("student array niche wala"+ JSON.stringify(studentArray)) 
        
//         // this.setState({AllOldFees: data,last_session:data[data.length-1].session,last_fees_date:data[data.length-1].last_fee_date,balance:data[data.length-1].balance}) 
          
//           // if(parseInt(data[data.length-1].balance) >0  ){
//           //     this.setState({surplus:data[data.length-1].balance})
//           // }else if(parseInt(data[data.length-1].balance) <0 ){
//           //     this.setState({due:data[data.length-1].balance})
//           // }
//       }else{
    
//         if( !JSON.stringify(PreviousStudentArray).includes(item.admission_no+item.account_no+item.class_name)){
//           PreviousStudentArray.push({"paid_upto_month_status":false,"class_name":item.class_name,"section":item.section,"name":item.student.name,"admission_no":admission_no,"account_no":item.account_no,"fee_concession":item.student.fee_concession,"paid_upto_month":item.student.paid_upto_month,"student_balance":0,"unique_key":item.admission_no+item.account_no+item.class_name})
//           this.setState({PreviousStudentArray:PreviousStudentArray})
// }
// this.PrevioussetStudentFeeStructure() 
         
//           // if(this.state.AllStudent[0] != undefined)
//           // {   
//           //     this.setState({last_fees_date:this.state.paid_upto_month,last_session:this.state.studentSession})
//           //     this.setBalance()
//           // }
//       }
//       // this.setState({account_no:data[0].account_no,father_name:data[0].father_name,mother_name:data[0].mother_name,father_occu:data[0].father_occu,father_designation:data[0].father_designation,father_annual_income:data[0].father_annual_income,mother_occu:data[0].mother_occu,mother_designation:data[0].mother_designation,mother_annual_income:data[0].mother_annual_income,parent_address:data[0].parent_address,parent_mobile:data[0].parent_mobile,gaurdian_name:data[0].gaurdian_name,gaurdian_address:data[0].gaurdian_address,gaurdian_mobile:data[0].gaurdian_mobile,gaurdian_annual_income:data[0].gaurdian_annual_income,gaurdian_occu:data[0].gaurdian_occu,gaurdian_designation:data[0].gaurdian_designation})
//   })
// }
// PrevioussetStudentFeeStructure =async()=>{
// // console.log("setStudentFeeStructure " +this.state.studentArrayWithFee.length)
// await this.state.PreviousStudentArray.map((item,index)=>{
 
//   this.PreviousFeesClasswise(item)
  
// })
// }
// PreviousFeesClasswise=(item)=>{    
// this.setState({PreviousStudentArrayWithFee:[]})
// console.log("checking response FeesClasswise " +item.class_name)
// const currentMonth =  Moment().format('MM')       
//  fetch("http://144.91.110.221:4800/FeesClasswise"
//  ,{
//      method: 'POST',
//      headers: {
//          Accept: 'application/json',
//          'Content-Type': 'application/json'
//      },
//      body: JSON.stringify({
//          class_name: item.class_name,
//          section: '',
//          session:this.state.session,
//      })
//  })
//  .then((data) => data.json())
//  .then(async (data) => {  
//     await console.log( 'Class Wise'+data )  
//      if(data[0] !=undefined){
//         //  this.setState({Allfees:JSON.parse(data[0].fees)})
//         if(!JSON.stringify(PreviousStudentArrayWithFee).includes(item.admission_no+item.account_no+item.class_name+item.name)){
//         PreviousStudentArrayWithFee.push({"paid_upto_month_status":item.paid_upto_month_status,"student_balance":item.student_balance,"unique_key":item.admission_no+item.account_no+item.class_name+item.name,"class_name":item.class_name,"section":item.section,"name":item.name,"admission_no":item.admission_no,"account_no":item.account_no,"fee_concession":item.fee_concession,"Allfees":data[0].fees,"paid_upto_month":item.paid_upto_month})
//         this.setState({PreviousStudentArrayWithFee:PreviousStudentArrayWithFee})
//         }
        
//         //  await this.SearchOldfee()
//         console.log("student with fee niche wala"+JSON.stringify(PreviousStudentArrayWithFee))

//  }
//  })
//  .then(()=>{
//    this.PrevioussetDefaulter()
//  })

// }
// PrevioussetDefaulter =async()=>{

//   this.state.PreviousStudentArrayWithFee.map((item,indexx)=>{
//     var fee_concession =item.fee_concession
//     var student_balance =item.student_balance
//     // console.log("studentArrayWithFee length " + this.state.studentArrayWithFee.length)
//   var shortmonths=[]
//   var dateStart = Moment(item.paid_upto_month).add(1,'month');
//   // alert("PaidUptomonth"+ item.paid_upto_month)
//   var a =this.state.session.split("-")[0];
//   var uptodate = Moment(a+"-03-31")
//   var dateEnd = uptodate
//   console.log("annual fees "+ dateStart )
//     while (dateEnd > dateStart || dateStart.format('M') === dateEnd.format('M') ) {
//       if( Moment(this.state.last_fees_date).format('M')=="3" && this.state.session == this.state.last_session )  {
//           break ;
//       }
//       shortmonths.push(dateStart.format('M'));
//      dateStart.add(1,'month');
//   }
  
//   var annual_fees = 0;
//   var total_monthly_fee=0
//   var getOneTimeFees=true
//   var one_time_fees = 0;
//   shortmonths.map((i,ind)=>{
   
   
//     JSON.parse(item.Allfees).map((el,index)=>{
//         if(el.fee_category=="ANNUAL"){
//             if(i==el.month){
//                 if(el.fee_sub_category.includes("COMPUTER") !=true ){
//                 annual_fees =annual_fees+parseInt(el.amount)
//                 }else{
//                     if(this.state.take_computer=="true"){
//                         annual_fees =annual_fees+parseInt(el.amount)
//                     }
//                 }
//             }else if(el.month==""){
//                 if(el.fee_sub_category.includes("COMPUTER") !=true ){
//                         if(parseInt(el.amount)>0){
//                             annual_fees =(annual_fees+parseInt(el.amount))
//                         }else{
//                         annual_fees =(annual_fees+parseInt(el.amount))
//                         }
//                     }else{
//                         if(this.state.take_computer=="true"){
//                             if(parseInt(el.amount)>0){
//                             annual_fees =(annual_fees+parseInt(el.amount))
//                             }
//                             else{
//                                 annual_fees =(annual_fees+parseInt(el.amount))
//                             }
//                         }
//                     }
//             }
//             else{
//                 annual_fees = annual_fees+0
//             }
//         }
//     })
//   JSON.parse(item.Allfees).map((el,index)=>{
//     if(el.fee_category=="MONTHLY"){     
//         // if(this.state.is_teacher_ward=="false"){
//             if(el.fee_sub_category == "TUITION FEE" ){
//                 if(parseInt(fee_concession) > 0 && fee_concession != ""){
//                     total_monthly_fee = total_monthly_fee+((parseInt(el.amount)*parseInt(fee_concession))/100)
//                 }else{
//                     total_monthly_fee = total_monthly_fee+parseInt(el.amount)
//                 }
//                 if(parseInt(fee_concession) == 100 ){
//                   // alert(item.admission_no)
//                     total_monthly_fee=0
//                 }
//         }else{
//             total_monthly_fee = total_monthly_fee+parseInt(el.amount)
//         }
//     // }
//   }
//   })      
//   })
//   PreviousPaidFees.push({"class_name":item.class_name,"section":item.section,"monthly":total_monthly_fee,"annual_fees":annual_fees,"admission_no":item.admission_no,"name":item.name,"account_no":item.account_no,"student_balance":student_balance})
//     })
//     await this.setState({PreviousPaidFees:PreviousPaidFees})
    
//     this.SetFinalDefaulter()
//     console.log("this is Previous paid fees array "+PreviousPaidFees)


//     console.log("this is paid fees array  length "+PreviousPaidFees.length)
//    }

// *********** End Previous Session Amount






// SetFinaldefaulter(){

//   if(this.state.){

//   }
// }





GetDefaulterMoneySingleStudent = async(item,last_date) => {
  // alert(item.admission_no+"  ,, "+last_date)
  await console.log("wait wait")
  var a =this.state.session.split("-")[0];
  a =a-1
  var b =this.state.session.split("-")[1];
  b=b-1
  var previousSession =a+"-"+b
  var previousSessionBalance=0
 await fetch("http://144.91.110.221:4800/GetDefaulterMoneySingleStudent"
      , {
        method: 'POST',
        headers: {
           Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          session: previousSession,
          admission_no:item.admission_no
        })
      })
      .then(res => res.json())
      .then(data => {          
          previousSessionBalance=parseInt(data.TotalPreviousBalance)*-1
console.log(JSON.stringify(studentArray).includes(item.admission_no+item.account_no+item.class_name)+" admission no "+item.admission_no)
          if( !JSON.stringify(studentArray).includes(item.admission_no+item.account_no+item.class_name)){
            studentArray.push({"is_full_free_ship":item.student.is_full_free_ship,"paid_upto_month_status":true,"class_name":item.class_name,"section":item.section,"name":item.student.name,"admission_no":item.admission_no,"account_no":item.account_no,"fee_concession":item.student.fee_concession,"paid_upto_month":last_date,"student_balance":previousSessionBalance,"unique_key":item.admission_no+item.account_no+item.class_name})
            this.setState({studentArray:studentArray})
            // this.setStudentFeeStructure() 
          }
      })
      .then(err => console.log(err))
      return true ;
}


    // StudentStrenght=async()=>{
    //   loop_i=0
    //   $("#getBtn").text("Please Wait...")
    //   this.setState({AllStudent:[],paidFees:[],PreviousPaidFees:[]})
    //   studentArray=[]
    //   studentArrayWithFee=[]
    //   paidFees=[]
    //   PreviousPaidFees=[]
    //   PreviousStudentArray=[]
    //   PreviousStudentArrayWithFee=[]
    //   PreviousPaidFees=[]
    //     fetch("http://192.168.43.123:4800/StudentStrenghtForDefaulter"
    //     ,{
    //         method: 'POST',
    //         headers: {
    //             Accept: 'application/json',
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({
    //             session:this.state.session,
    //             class_name: this.state.class_name,
    //             section:this.state.section,
    //             DefaulterByMonth:this.state.DefaulterByMonth
    //         })
    //     })
    //     .then((studentArrayWithFee) => studentArrayWithFee.json())
    //     .then(async (studentArrayWithFee) => {  
    //             console.log("studentArrayWithFee "+JSON.stringify(studentArrayWithFee))
    //            await this.setState({studentArrayWithFee:studentArrayWithFee})
    //            this.setDefaulter()
    //             if(studentArrayWithFee[0] == undefined){
    //               alert("No Result Found")
    //             }
    //     })
    //     console.log("student array "+ studentArray)
    //  }

    StudentStrenght=async()=>{
      loop_i=0
      $("#getBtn").text("Please Wait...")
      this.setState({AllStudent:[],paidFees:[],PreviousPaidFees:[]})
      studentArray=[]
      studentArrayWithFee=[]
      paidFees=[]
      PreviousPaidFees=[]
      PreviousStudentArray=[]
      PreviousStudentArrayWithFee=[]
      PreviousPaidFees=[]

      if(this.state.class_name!=""){
        fetch("http://144.91.110.221:4800/StudentStrenght"
        ,{
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                session:this.state.session,
                class_name: this.state.class_name,
                section:this.state.section,
            })
        })
        .then((data) => data.json())
        .then(async (data) => {  
                this.setState({AllStudent:data})
                data.map((item,index)=>{
                    this.SearchOldfee(item)
                })
                // this.myLoop(studentArrayWithFee)
                if(data[0] == undefined){
                  alert("No Result Found")
                }
        })
        console.log("student array "+ studentArray)
      }else{
        // alert("in")
        fetch("http://192.168.43.123:4800/StudentStrenghtForDefaulter"
        ,{
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                session:this.state.session,
                class_name: this.state.class_name,
                section:this.state.section,
                DefaulterByMonth:this.state.DefaulterByMonth
            })
        })
        .then((studentArrayWithFee) => studentArrayWithFee.json())
        .then(async (studentArrayWithFee) => {  
                console.log("studentArrayWithFee "+JSON.stringify(studentArrayWithFee))
               await this.setState({studentArrayWithFee:studentArrayWithFee})
               this.setDefaulter()
                if(studentArrayWithFee[0] == undefined){
                  alert("No Result Found")
                }
        })
        console.log("student array "+ studentArray)
      }
     }
      myLoop=(data)=> {            
      //  create a loop function
      var time = 1
      if(loop_i%800 == 0 && loop_i != 0){
        time=20000
        // alert("time Change "+time)
      }
      setTimeout(()=> {   //  call a 3s setTimeout when the loop is called
        //  your code here
            console.log("length "+data.length)               //  increment the counter
        if (loop_i < data.length) { 
         
          console.log('hello loop i '+loop_i); 
          // console.log('hello  '+JSON.stringify(data[loop_i])); 
          this.SearchOldfee(data[loop_i])    //  if the counter < data.length, call the loop function
          console.log('hello search old fees');
          loop_i++;
          this.myLoop(data)
                  //  ..  again which will trigger another    
        }     
                 //  ..  setTimeout()
                 
      }, time)
    }
     SearchOldfee= async(item)=>{
       this.setState({studentArray:[]})
      console.log("checking response SearchOldfee")
      await  console.log("wait wait")
      const admission_no = item.admission_no
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
          console.log( 'single parent'+data )  
          if(data[0] !=undefined){
            var A = Moment(data[data.length-1].last_fee_date)
            var aa =this.state.session.split("-")[0];
            var B= Moment(aa+"-04-01")
            var last_date 
            // alert(Moment(data[data.length-1].last_fee_date).format("YYYY-MM-DD"))
            if(parseInt(A.diff(B, 'days')) < 0){
              last_date= aa+"-03-31"
              await this.GetDefaulterMoneySingleStudent(item,last_date)

            }
            else{
              last_date=data[data.length-1].last_fee_date

              if(Moment(last_date=data[data.length-1].last_fee_date).format("MM-YYYY") > Moment(this.state.DefaulterByMonth).format("MM-YYYY")){
                if( !JSON.stringify(studentArray).includes(item.admission_no+item.account_no+item.class_name)){
                  studentArray.push({"is_full_free_ship":item.student.is_full_free_ship,"paid_upto_month_status":false,"class_name":item.class_name,"section":item.section,"name":item.student.name,"admission_no":admission_no,"account_no":item.account_no,"fee_concession":item.student.fee_concession,"paid_upto_month":last_date,"student_balance":0,"unique_key":item.admission_no+item.account_no+item.class_name})
                  this.setState({studentArray:studentArray})
      }
              }else{
              if( !JSON.stringify(studentArray).includes(item.admission_no+item.account_no+item.class_name)){
                studentArray.push({"is_full_free_ship":item.student.is_full_free_ship,"paid_upto_month_status":true,"class_name":item.class_name,"section":item.section,"name":item.student.name,"admission_no":admission_no,"account_no":item.account_no,"fee_concession":item.student.fee_concession,"paid_upto_month":last_date,"student_balance":data[data.length-1].balance,"unique_key":item.admission_no+item.account_no+item.class_name})
                this.setState({studentArray:studentArray})
              }
            }
            }
this.setStudentFeeStructure() 
           
          }else{
        
            if( !JSON.stringify(studentArray).includes(item.admission_no+item.account_no+item.class_name)){
              studentArray.push({"is_full_free_ship":item.student.is_full_free_ship,"paid_upto_month_status":false,"class_name":item.class_name,"section":item.section,"name":item.student.name,"admission_no":admission_no,"account_no":item.account_no,"fee_concession":item.student.fee_concession,"paid_upto_month":item.student.paid_upto_month,"student_balance":0,"unique_key":item.admission_no+item.account_no+item.class_name})
              this.setState({studentArray:studentArray})
  }
  this.setStudentFeeStructure() 
          }
          // this.setState({account_no:data[0].account_no,father_name:data[0].father_name,mother_name:data[0].mother_name,father_occu:data[0].father_occu,father_designation:data[0].father_designation,father_annual_income:data[0].father_annual_income,mother_occu:data[0].mother_occu,mother_designation:data[0].mother_designation,mother_annual_income:data[0].mother_annual_income,parent_address:data[0].parent_address,parent_mobile:data[0].parent_mobile,gaurdian_name:data[0].gaurdian_name,gaurdian_address:data[0].gaurdian_address,gaurdian_mobile:data[0].gaurdian_mobile,gaurdian_annual_income:data[0].gaurdian_annual_income,gaurdian_occu:data[0].gaurdian_occu,gaurdian_designation:data[0].gaurdian_designation})
      })
  }
  setStudentFeeStructure =async()=>{
     console.log("setStudentFeeStructure " +this.state.studentArrayWithFee.length)
     await this.state.studentArray.map((item,index)=>{
     console.log("student data in new way "+JSON.stringify(this.state.studentArray));
      this.FeesClasswise(item)
    
      
    })
  }
  FeesClasswise=(item)=>{    
    this.setState({studentArrayWithFee:[]})
    console.log("checking response FeesClasswise " +item.class_name)
    const currentMonth =  Moment().format('MM')       
     fetch("http://144.91.110.221:4800/FeesClasswise"
     ,{
         method: 'POST',
         headers: {
             Accept: 'application/json',
             'Content-Type': 'application/json'
         },
         body: JSON.stringify({
             class_name: item.class_name,
             section: '',
             session:this.state.session,
         })
     })
     .then((data) => data.json())
     .then(async (data) => {  
        await console.log( 'Class Wise'+data )  
         if(data[0] !=undefined){
            //  this.setState({Allfees:JSON.parse(data[0].fees)})
            if(!JSON.stringify(studentArrayWithFee).includes(item.admission_no+item.account_no+item.class_name+item.name)){
            studentArrayWithFee.push({"is_full_free_ship":item.is_full_free_ship,"paid_upto_month_status":item.paid_upto_month_status,"student_balance":item.student_balance,"unique_key":item.admission_no+item.account_no+item.class_name+item.name,"class_name":item.class_name,"section":item.section,"name":item.name,"admission_no":item.admission_no,"account_no":item.account_no,"fee_concession":item.fee_concession,"Allfees":data[0].fees,"paid_upto_month":item.paid_upto_month})
            this.setState({studentArrayWithFee:studentArrayWithFee})
            }
            
            //  await this.SearchOldfee()
            console.log("student with fee niche wala"+JSON.stringify(studentArrayWithFee))
   
     }
     })
     .then(()=>{
       this.setDefaulter()
     })

 }
setDefaulter(){
$("#getBtn").text("Get Defaulter")
console.log("new array come "+JSON.stringify(this.state.studentArrayWithFee))
this.state.studentArrayWithFee.map((item,indexx)=>{
console.log("studentArrayWithFee length " + this.state.studentArrayWithFee.length)

var fee_concession =item.fee_concession
var student_balance =item.student_balance
var shortmonths=[]
var dateStart = Moment(item.paid_upto_month).add(1,'month');
// alert("PaidUptomonth"+ item.paid_upto_month)
var dateEnd = Moment(this.state.DefaulterByMonth)
console.log("annual fees "+ dateStart )
  while (dateEnd > dateStart || dateStart.format('M') === dateEnd.format('M') ) {
    if( Moment(this.state.last_fees_date).format('M')=="3" && this.state.session == this.state.last_session ){
        break ;
    }
    shortmonths.push(dateStart.format('M'));
   dateStart.add(1,'month');
}

var annual_fees = 0;
var total_monthly_fee=0
var getOneTimeFees=true
var one_time_fees = 0;
shortmonths.map((i,ind)=>{
 
 
  JSON.parse(item.Allfees).map((el,index)=>{
      if(el.fee_category=="ANNUAL"){
          if(i==el.month){
              if(el.fee_sub_category.includes("COMPUTER") !=true ){
              annual_fees =annual_fees+parseInt(el.amount)
              }else{
                  if(this.state.take_computer=="true"){
                      annual_fees =annual_fees+parseInt(el.amount)
                  }
              }
          }else if(el.month==""){
              if(el.fee_sub_category.includes("COMPUTER") !=true ){
                      if(parseInt(el.amount)>0){
                          annual_fees =(annual_fees+parseInt(el.amount))
                      }else{
                      annual_fees =(annual_fees+parseInt(el.amount))
                      }
                  }else{
                      if(this.state.take_computer=="true"){
                          if(parseInt(el.amount)>0){
                          annual_fees =(annual_fees+parseInt(el.amount))
                          }
                          else{
                              annual_fees =(annual_fees+parseInt(el.amount))
                          }
                      }
                  }
          }
          else{
              annual_fees = annual_fees+0
          }
      }
  })
JSON.parse(item.Allfees).map((el,index)=>{
  if(el.fee_category=="MONTHLY"){     
      // if(this.state.is_teacher_ward=="false"){
          if(el.fee_sub_category == "TUITION FEE" ){
              if(parseInt(fee_concession) > 0 && fee_concession != ""){
                  total_monthly_fee = total_monthly_fee+((parseInt(el.amount)*parseInt(fee_concession))/100)
              }else{
                  total_monthly_fee = total_monthly_fee+parseInt(el.amount)
              }
              if(parseInt(fee_concession) == 100 ){
                  total_monthly_fee=0
              }
      }else{
          total_monthly_fee = total_monthly_fee+parseInt(el.amount)
      }
  // }
}
})      
})
paidFees.push({"fee_concession":fee_concession,"is_full_free_ship":item.is_full_free_ship,"session":this.state.session,"class_name":item.class_name,"monthly":total_monthly_fee,"annual_fees":annual_fees,"admission_no":item.admission_no,"section":item.section,"name":item.name,"account_no":item.account_no,"student_balance":student_balance})
// console.log("this is paid annual Fees "+annual_fees)
  })
  console.log("this is paid fees array "+paidFees)
  console.log("this is paid fees array lenght  "+paidFees.length)
  this.setState({paidFees:paidFees})
  // this.SetFinalDefaulter()
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
    getFine = () => {
        fetch("http://144.91.110.221:4800/getFine")
            .then(res => res.json())
            .then(data => {
                console.log(data)
                this.setState({_id:data[0].id,category: data[0].category,fine_date:data[0].fine_date,defaultFine:data[0].amount})
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
    DefaulterByMonth=async()=>{
     this.setState({AllDefaulter:[]})
      await console.log(this.state.DefaulterByMonth)
       fetch("http://144.91.110.221:4800/DefaulterByMonth"
       ,{
           method: 'POST',
           headers: {
               Accept: 'application/json',
               'Content-Type': 'application/json'
           },
           body: JSON.stringify({
               session:this.state.session,
               DefaulterByMonth: this.state.DefaulterByMonth,
               class_name:this.state.class_name,
               section:this.state.section
           })
       })
       .then((data) => data.json())
       .then(async (data) => {  
               this.setState({AllDefaulter:data})
            //    this.setBalance()
               if(data[0] == undefined){
                 alert("No Result Found")
               }
       })
    }
    getClass = () => {
      fetch("http://144.91.110.221:4800/getClass")
          .then(res => res.json())
          .then(data => {
              console.log(data)
              this.setState({AllClass: data})
          })
          .then(err => console.log(err))
   }
   getFeesOfStudent=(class_name)=>{ 
    global_class_name =  class_name
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
             class_name: class_name,
             session:this.state.session,
         })
     })
     .then((data) => data.json())
     .then(async (data) => {  
        await console.log( 'Class Wise'+data )  
         if(data[0] !=undefined){
             this.setState({Allfees:JSON.parse(data[0].fees)})
            //  console.log("done")
     }
     })
 }
//  setDefaulterList =async()=>{
//   this.state.AllDefaulter.map((item,index)=>{
//     await console.log("wair")
//     var dateStart = Moment(this.state.last_fees_date).add(1,'month');
//     var dateEnd = Moment(this.state.receipt_date)
//     while (dateEnd > dateStart || dateStart.format('M') === dateEnd.format('M') ) {
//         if(shortmonths.includes('3')==true)
//         {   
//             break ;
//         }
//        months.push(dateStart.format('YYYY-MM-DD'));
//        fromtomonths.push(dateStart.format('M'));
//        shortmonths.push(dateStart.format('M'));
//        dateStart.add(1,'month');
//     }
//   }
//  }
printDefaulter() {
  window.print();
}    

SetFinalDefaulter() {
  $("#getBtn").text("Get Defaulter")
  FinalDefaulter=[]
if(this.state.PreviousPaidFees !="" && this.state.paidFees !=""){

  this.state.paidFees.map((el,ind)=>{                   
    if(JSON.stringify(this.state.PreviousPaidFees).includes(el.admission_no)){                       
    var monthly = parseInt(this.state.paidFees[ind].monthly)+ parseInt(this.state.PreviousPaidFees[this.state.PreviousPaidFees.findIndex(this.checkIndex,el.admission_no)].monthly)

    var annual_fees = parseInt(this.state.paidFees[ind].annual_fees)+ parseInt(this.state.PreviousPaidFees[this.state.PreviousPaidFees.findIndex(this.checkIndex,el.admission_no)].annual_fees)

    var student_balance = parseInt(this.state.paidFees[ind].student_balance)+ parseInt(this.state.PreviousPaidFees[this.state.PreviousPaidFees.findIndex(this.checkIndex,el.admission_no)].student_balance)

    FinalDefaulter.push({"fee_concession":el.fee_concession,"is_full_free_ship":el.is_full_free_ship,"class_name":el.class_name,"section":el.section,"monthly":monthly,"annual_fees":annual_fees,"admission_no":el.admission_no,"name":el.name,"account_no":el.account_no,"student_balance":student_balance})
    }
})

this.setState({FinalDefaulter:FinalDefaulter})
}
}
 checkIndex(element){
  return element.admission_no == this;
}



    render(){
      // loop_i=0
      studentArrayWithFee=[]
      studentArray=[]

      count =0
        const data =[];
        // {this.state.AllDefaulter.map((item,index)=>{
        //   data.push( {"sr_no":index+1,"name":item.name,"admission_no":item.admission_no,
        //   "account_no":item.account_no,"class_name":item.class_name+"-"+item.section,"dues":item.balance})
        // })}
          const columns = [
            { title: "SR NO", data: "sr_no" },
            { title: 'Admission No',data: "admission_no"},
            { title: 'Account No',data: "account_no"},
            { title: 'Name',data: "name"},
            { title: 'Class',data: "class_name"},
            { title: 'Dues ',data: "dues"},
          ];
          const click = (row) => {
            console.log(row);
          };

          
          const csvData = [
            ["ADMISSSION NO", "ACCOUNT NO", "STUDENT" ,"CLASS" , "ANNUAL" ,"MONTHLY","PREV DUES","PREV SURPLUS","FINE","TOTAL"],
          ];
          {this.state.paidFees.map((item,ind)=>{
            var prevDues=0
            var prevSurplus=0
            if(parseInt(item.student_balance)  <=0){
              prevDues=  parseInt(item.student_balance)*-1
            }else{
              prevDues=0
            }
            if(parseInt(item.student_balance)  >=0){
              prevSurplus=parseInt(item.student_balance)
            }else{
              prevSurplus=0
            }
            if(item.annual_fees+item.monthly+(parseInt(item.student_balance)*-1) >0 && (item.is_full_free_ship =="false" || item.is_full_free_ship == "")){
            csvData.push( [item.admission_no,item.account_no,item.name,item.class_name+"-"+item.section,item.annual_fees,item.monthly,prevDues,prevSurplus,0,item.annual_fees+item.monthly+(parseInt(item.student_balance)*-1)])
            }
          // })}
          })
          }
          
        counter=0
        PreviousPaidFees=[]
        FinalDefaulter=[]

       
        return(
            <>
              <div className= "row layoutCard">
                <div className="col-3 form-group">
                      <label>Session</label>
                      <select value={this.state.session} className="form-control" onChange={(e)=>{{this.setState({session:e.target.value.toUpperCase()})}}}> 
                                    <option value="">All Session</option>
                                      {this.state.AllSession.map((item,index)=>{
                                          return(
                                            <option value={item.session_code}>{item.session_code}</option>
                                          )
                                      })}
                      </select> 
                </div>
                <div className="col-3 form-group">
                  <label>Date</label>
                  <input type="date" className="form-control" value={this.state.DefaulterByMonth} onChange={(e)=>{this.setState({DefaulterByMonth:e.target.value})}} />
                </div>
                <div className="col-3 form-group">
                <label>Select Class</label>
                <select className="form-control" onChange={(e)=>{this.setState({class_name:e.target.value.toUpperCase()})}}>
                           <option value="">All</option>
                           {this.state.AllClass.map((item,index)=>{
                                 return(
                                    <option value={item.class_name}>{item.class_name}</option>
                                 )
                            })}
                </select>
                </div>
                <div className="col-3 form-group">
                            <label>Section *</label>
                           <select className="form-control" onChange={(e)=>{this.setState({section:e.target.value.toUpperCase()})}}>
                             <option value="">Select Section</option>
                             {this.state.AllSection.map((item,index)=>{
                                 if(this.state.class_name == item.class_name.toUpperCase()){
                                 return(
                                    <option value={item.section}>{item.section}</option>
                                 )
                                 }
                             })}
                           </select>
                        </div>
                
                <div className="col-12 form-group">
                  <button className="btn btn-success" id="getBtn" onClick={()=>{this.StudentStrenght()}}>Get Defaulter</button>
                  <button className="btn btn-info ml-1" onClick={()=>{this.printDefaulter()}}>print</button>
                  <button className="btn btn-primary ml-1"><CSVLink filename={"StudentData.csv"} data={csvData}>CSV</CSVLink></button>
                </div>
              </div>

{/* {this.state.PreviousPaidFees !='' &&  this.state.paidFees !="" ?   */}

            <div className= "row printCard">
              <div className="col-12 printDefaulter">
                <h3 className="text-center">DEFAULTER LIST OF {this.state.class_name} - {this.state.section} ({ Moment(this.state.DefaulterByMonth).format("MMMM").slice(0,3)}-{ Moment(this.state.DefaulterByMonth).format("YYYY")})</h3>
                      <table class="table table-striped">
                        <thead>
                          <tr>
                            <th scope="col">Sr No</th>
                            <th scope="col">Admn No</th>
                            <th scope="col">Account no</th>
                            <th scope="col">Student</th>
                            <th scope="col">Class</th>
                            <th scope="col">Annual</th>
                            <th scope="col">Monthly</th>
                            <th scope="col">Prev Dues</th>
                            <th scope="col">Prev Surplus</th>
                            <th scope="col">Fine</th>
                            <th scope="col">Total</th>
                          </tr>
                        </thead>
                        <tbody>
                        
                        {this.state.paidFees.sort((a,b) => parseInt(a.admission_no) - parseInt(b.admission_no)).map((item,indexx)=>{
                            
                            if(item.annual_fees+item.monthly+(parseInt(item.student_balance)*-1) >0 && (item.is_full_free_ship =="false" || item.is_full_free_ship == "")){
                              counter=counter+1
                              return(
                              <tr>
                              <td>{counter}</td>
                              <td>{item.admission_no}</td>
                              <td>{item.account_no}</td>
                              <td>{item.name}</td>
                              <td>{item.class_name}- {item.section}</td>
                              <td>{item.annual_fees}</td>
                              <td>{item.monthly}</td>
                              <td>{parseInt(item.student_balance)  <=0 ? parseInt(item.student_balance)*-1 :'0'}</td>
                              <td>{parseInt(item.student_balance)  >=0 ? parseInt(item.student_balance) :'0'}</td>
                              <td>0</td>
                              <td>{item.annual_fees+item.monthly+(parseInt(item.student_balance)*-1)}</td>
                          
                              </tr>
                              )
                            }
                        })}
                      
                       
                        </tbody>
                      </table>
              </div>
            </div>
            {/* :null} */}
            </>
        )
    }
    
}
export default Defaulter;