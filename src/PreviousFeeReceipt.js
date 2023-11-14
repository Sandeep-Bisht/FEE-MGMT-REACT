import React from 'react';
import { Link } from "react-router-dom";
import ModalImage from "react-modal-image";
// import DataTable from '@bit/adeoy.utils.data-table';
import Moment from 'moment';
import { Redirect } from "react-router-dom";
import $, { contains } from 'jquery';
var SubtractTuitionFee = 0
var RemainTuitionFee = 0
var previouspaidamount =0
var previousmonthlyamount=0
var previousannualamount=0
var previousgrandTotal=0
var previousfine=0
var submitonce =0
var nothing=''
var defaultDate=localStorage.getItem('R_date')
var defaultDateStatus=false
var countAdmission_no=''
var tcstatusConfirmBox=true
class PreviousFeeReceipt extends React.Component{
    constructor(props){
        super(props)
        this.state={
            redirect:null,
            _id:'',
            receipt_no:'',
            date_of_admission:'',
            modal_account_no:'',
            modal_admission_no:'',
            security_no:'',
            aadhar_no:'',
            class_name:'',
            section:'',
            subjects:'',
            session:"2020-2021",
            // session:localStorage.getItem('SessionAccess'),
            receipt_date: Moment().format('YYYY-MM-DD'),
            category:'',
            house:'',
            name:'',
            sex:'',
            dob:'',
            nationality:'',
            father_name:'',
            mother_name:'',
            parent_address:'',
            gaurdian_name:'',
            gaurdian_address:'',
            
            fee_concession:'',
            bus_fare_concession:'',
            vehicle_no:'',
            is_teacher_ward:false,
            paid_upto_month:'',
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

            fine:'',
            
            last_fee_status:true,
            last_fee_date:null,
            last_fees_date:"",
            last_session:'',
            admission_no:'',
            account_no:'',
            _fee:'',
            report_card_and_diary:'0',
            annual_prize_day:'0',
            development_fund:'0',
            school_magazin:'0',
            annual_sports_day:'0',
            examination_fee:'0',
            med_board_reg:'0',
            library_fee:'0',
            tution_fee:'0',
            computer_fee:'0',
            science_fee:'0',
            bus_fare:'0',
            total_monthly_fee:'0',
            payment_mode:'BANK',
            grand_total:'',
            bank:'',
            bank_v_no:'',
            check_no:'',
            bank_date:'',

            annual_fee:'0',
            one_time_fees:'0',
            fees:[],
            Allfees:[],
            AllDummyfees:[],
            Actualfees:[],
            OrignalFeeStructure:[],
            AllOldFees:[],
            paidFees:'',
            currentMonth:'',
            feemonths:'',
            fromtomonths:'',
            months:'',
            balance:'',
            paid_amount:'0',
            remaning_balance:"0",
            surplus:'0',
            due:'0',
            prospectus_fee:'0',
            registration_fee:'0',
            admission_fee:'0',
            security_fee:'0',
            TakeOneTimeFee:false,
            TakeAnnualFee:false,
            TakeHalfYearlyFee:false,            
            description:'',
            AllCategory:[],
            AllSession:[],
            AllStudent:[],
            AllSubCategory:[],
            StudentTutionFee:"0",
            RemainStudentTutionFee:"0",
            SubtractStudentTutionFee:"0",

            ModalAllStudent:[],

            fne_date:'',
            defaultFine:'',
            AllBank:[],
            manualFine:'',
            manualFineState:'false',

            Rpaidmonth:'',
            Rreceiptdate:'',
            Rlastpaiddate:'',
            Rbank:'',
            Rreceiptno:'',
            Rid:'',
            Rbalance:'',
            studentSession:''
        }
    }
    componentDidMount(){
      this.getStudent()
      this.getFeeReceipt()
      this.getFeeCategory()
      this.getSession()
      this.getBankData()
      const admission_no=localStorage.getItem('StudentDisplay')
      if(admission_no !="" && admission_no !=0){
      this.setState({admission_no:admission_no})
      this.searchByAdmission_no_with_session()
      }
      if(localStorage.getItem('R_date') != null){
          this.setState({receipt_date:localStorage.getItem('R_date')})
      }
        if(localStorage.getItem('R_bank') != null){
        this.setState({bank:localStorage.getItem('R_bank')})
        }
    }
    // getFeeSubCategory = () => {
    //     fetch("http://144:91:110:210:4800/getSubCategory")
    //         .then(res => res.json())
    //         .then(data => {

    //             const currentMonth =  Moment().format('MM')
    //             this.setState({AllSubCategory:data,currentMonth:currentMonth})
    //             data.map((item,index)=>{
    //                 this.state.fees.push({"fee_sub_category":item.fee_sub_category,"amount":item.amount,"month":item.month})
    //             })
    //         })
    //         .then(err => console.log(err))
    // }
    ChangemanualFineState(e){
        if(e.target.checked){
            this.setState({manualFineState:"true"})
            $(document).ready(function(){
                $('.manualFine').css('display','block')
                $('.manualFine').css('display','initial')
                $('.defaultFine').css('display','none')
            })
        }else{
                this.setState({manualFineState:"false"})
                $('.manualFine').css('display','none')
                $('.defaultFine').css('display','block')
                $('.defaultFine').css('display','initial')
        }
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
            .then(err => console.log(err))
    }
    getFine = () => {
        fetch("http://144:91:110:210:4800/getFine")
            .then(res => res.json())
            .then(data => {
                console.log(data)
                this.setState({category: data[0].category,fine_date:data[0].fine_date,defaultFine:data[0].amount})
            })
            .then(err => console.log(err))
    }
    getStudent = async() => {
        await console.log("wait wait")
        fetch("http://144:91:110:210:4800/getStudent"
            , {
              method: 'POST',
              headers: {
                 Accept: 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                session: this.state.session,
                school_id:"UT015"
              })
            })
            .then(res => res.json())
            .then(data => {          
                this.setState({ModalAllStudent:data})
            })
            .then(err => console.log(err))
      }
    submitCategoryData = () => {
            const data = new FormData()
            data.append('category', this.state.category)
            data.append('description', this.state.description)
            const url = "http://144:91:110:210:4800/StoreFeeCatogory"
            fetch(url, {
                    method: 'post',
                    body: data
                })
                .then(res => res.json())
                .then(data => {
                    alert("Category Created Successfully")      
                    this.getFeeCategory()            
                })
                .then(err => {})
    }
    getFeeCategory = () => {
        fetch("http://144:91:110:210:4800/getCategory")
            .then(res => res.json())
            .then(data => {
                this.setState({AllCategory: data})
            })
            .then(err => console.log(err))
    }
    getSession = () => {
        fetch("http://144:91:110:210:4800/getSession"
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
        viewParent= async()=>{
        await console.log("wait wait")
        const account_no = this.state.account_no        
        if(account_no =='0'){
             return false;
        }
        fetch("http://144:91:110:210:4800/singleparentdataWithSession"
        ,{
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                account_no: account_no,
                session: this.state.session
            })
        })
        .then((data) => data.json())
        .then(async (data) => {  
            this.setState({AllStudent:data})
        })
        }
    searchByAdmission_no_with_session= async (e)=>{

        localStorage.setItem('StudentDisplay','')
        previouspaidamount = 0
        previousannualamount = 0
        previousmonthlyamount = 0
        previousgrandTotal = 0
        previousfine=0
        this.setState({last_fee_status:true,paid_amount:'0',last_fee_date:'',fee_concession:'',tc_status:'',remaning_balance:'0',defaultFine:'',fine:'0',balance:'0',account_no:'', total_monthly_fee:'0',one_time_fees:'0',months:[],annual_fee:'0',AllOldFees:[],month:[],shortmonths:[],feemonths:[],name:'',grand_total:'',father_name:'',parent_mobile:'',parent_phone:'',mother_name:'',Allfees:[],AllDummyfees:[],Actualfees:[],due:'0',surplus:'0',last_fees_date:'',take_computer:"",is_full_free_ship:"",is_teacher_ward:"",StudentTutionFee:'0',studentSession:'',_id:''})
        await console.log("wait")
        console.log("checking response search by addmission no")
        const admission_no = this.state.admission_no
        if(admission_no =='0'){
             return false;
        }
        fetch("http://144:91:110:210:4800/singlestudentdata_with_session"
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
                this.setState({AllStudent:data,_id:data[0].student._id,account_no:data[0].account_no,name:data[0].student.name,class_name:data[0].class_name,section:data[0].section,avail_transport:data[0].student.avail_transport,is_full_free_ship:data[0].student.is_full_free_ship,is_teacher_ward:data[0].student.is_teacher_ward,take_computer:data[0].student.take_computer,ncc:data[0].student.ncc,no_exempt_registration:data[0].student.no_exempt_registration,tc_status:data[0].student.tc_status,fee_concession:data[0].student.fee_concession,no_exempt_admission:data[0].student.no_exempt_admission,no_exempt_security_deposit:data[0].student.no_exempt_security_deposit,is_repeater:data[0].student.is_repeater,paid_upto_month:data[0].student.paid_upto_month,father_name:data[0].student.father_name,mother_name:data[0].student.mother_name,parent_mobile:data[0].student.parent_mobile,parent_phone:data[0].student.parent_phone,studentSession:data[0].session})
                
                // if(parseInt(data[0].balance) >0  ){
                //     this.setState({surplus:data[0].balance})
                // }else if(parseInt(data[0].balance) <0 ){
                //     this.setState({due:data[0].balance})
                // }

                if(data[0].student.tc_status==1 ){
     
                    if (window.confirm("This student is already taken TC !  You still want to collect his fees !")) {
                        // tcstatusConfirmBox=false
                        this.getFine();
                
                this.FeesClasswise(data[0].class_name,data[0].section);
                      } else {
                        // tcstatusConfirmBox=false
                        return false;
                      }
                }else{
                this.getFine();
                
                this.FeesClasswise(data[0].class_name,data[0].section);
                }
               
            }
            else{
                this.setState({AllStudent:[],fees:[],report_card_and_diary:'0',annual_prize_day:'0',development_fund:'0',school_magazin:'0',annual_sports_day:'0',examination_fee:'0',med_board_reg:'0',library_fee:'0', tution_fee:'0',computer_fee:'0',science_fee:'0',bus_fare:'0'})
            }
        })
    }
    // getFeeReceipt = () => {
    //     fetch("http://144:91:110:210:4800/getFeeReceipt")
    //         .then(res => res.json())
    //         .then(data => {
    //             this.set_receipt_no(data)
    //         })
    //         .then(err => console.log(err))
    // }
    getFeeReceipt=(class_names,sections)=>{ 
        var fetchPromise = "" ;   
        console.log("checking response FeesClasswise")
        // const currentMonth =  Moment().format('MM')       
          fetchPromise=  fetch("http://144:91:110:210:4800/getFeeReceipt"
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
            this.setState({receipt_no:receipt_no})
            }else{
            this.setState({receipt_no:'1'})
        }
        return true
    }
    
    SearchOldfee= async()=>{
        this.setState({AllOldFees:[]})
        console.log("checking response SearchOldfee")
        await  console.log("wait wait")
        const admission_no = this.state.admission_no.toUpperCase()
        fetch("http://144:91:110:210:4800/SearchOldfee"
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
                this.setState({AllOldFees: data,last_session:data[data.length-1].session,last_fees_date:data[data.length-1].last_fee_date,balance:data[data.length-1].balance}) 
                
                if(parseInt(data[data.length-1].balance) >0  ){
                    this.setState({surplus:data[data.length-1].balance})
                }else if(parseInt(data[data.length-1].balance) <0 ){
                    this.setState({due:data[data.length-1].balance})
                }
            }else{
          
               
                if(this.state.AllStudent[0] != undefined)
                {   
                    console.log(" PAID UPTO MONTH state "+this.state.paid_upto_month)
                   await this.setState({last_fees_date:this.state.paid_upto_month,last_session:this.state.studentSession,last_fee_status:false})
                   await this.setBalance()
                }
            }
            // this.setState({account_no:data[0].account_no,father_name:data[0].father_name,mother_name:data[0].mother_name,father_occu:data[0].father_occu,father_designation:data[0].father_designation,father_annual_income:data[0].father_annual_income,mother_occu:data[0].mother_occu,mother_designation:data[0].mother_designation,mother_annual_income:data[0].mother_annual_income,parent_address:data[0].parent_address,parent_mobile:data[0].parent_mobile,gaurdian_name:data[0].gaurdian_name,gaurdian_address:data[0].gaurdian_address,gaurdian_mobile:data[0].gaurdian_mobile,gaurdian_annual_income:data[0].gaurdian_annual_income,gaurdian_occu:data[0].gaurdian_occu,gaurdian_designation:data[0].gaurdian_designation})
        })
        await this.setBalance()
    }
    getOneTimeFee= async(e)=>{   
        if(this.state.TakeOneTimeFee==false){     
        this.setState({TakeOneTimeFee:true}) 
        this.searchByAdmission_no_with_session()         
        }else{
            this.setState({TakeOneTimeFee:false}) 
            this.searchByAdmission_no_with_session()  
        }
        this.FeesClasswise(this.state.class_name,this.state.section)
     }
     getAnnualFee= async()=>{
         if(this.state.TakeAnnualFee==false){
            this.setState({TakeAnnualFee:true})
         }else{
            this.setState({TakeAnnualFee:false})
         }
     }
     getHalfYearlyFee =()=>{
        if(this.state.TakeHalfYearlyFee==false){
            this.setState({TakeHalfYearlyFee:true})
         }else{
            this.setState({TakeHalfYearlyFee:false})
         }
     }
    FeesClasswise=(class_names,sections)=>{    
       console.log("checking response FeesClasswise")
       const currentMonth =  Moment().format('MM')       
        fetch("http://144:91:110:210:4800/FeesClasswise"
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
                this.setState({Allfees:JSON.parse(data[0].fees),AllDummyfees:JSON.parse(data[0].fees),Actualfees:JSON.parse(data[0].fees),OrignalFeeStructure:JSON.parse(data[0].fees),orignaltotalonetime:data[0].total_one_time_fee,orignalannualfee:data[0].total_annual_fee,orignalmonthlyfee:data[0].total_monthly_fee,orignalgrandtotal:data[0].grand_total})
                await this.SearchOldfee()

        }
        })
    }
    setBalance =async()=>{
        // this.FeesClasswise(this.state.class_name,this.state)
        // f gfgfvgdfg
       
    
        await console.log("wait")
        if(this.state.is_full_free_ship=="false"){
        if(this.state.last_fees_date == ""){
            this.searchByAdmission_no_with_session()
        } 
        console.log("checking response setBalance")
        await console.log("wait")
        // alert(this.state.paid_amount)
        var calculateOneTimeFee = 0;
        var grand_total = 0;
        var monthlytotal = 0;
        var annual_fees_sub =0
                         this.state.Allfees.map((item,index)=>{
                         if(item.fee_category=="MONTHLY"){
                            // if(this.state.is_teacher_ward=="false"){
                            if(item.fee_sub_category == "TUITION FEE" ){
                                if(parseInt(this.state.fee_concession) >= 0 && this.state.fee_concession != ""){
                                    this.setState({StudentTutionFee: parseInt(item.amount)-(parseInt(item.amount)*parseInt(this.state.fee_concession))/100})
                                    monthlytotal = parseInt(item.amount)-(parseInt(item.amount)*parseInt(this.state.fee_concession))/100
                                }else{
                                    this.setState({StudentTutionFee:item.amount})
                                    monthlytotal = item.amount
                                }
                            }else{
                                    monthlytotal = item.amount
                            }
                            monthlytotal=parseInt(monthlytotal)+parseInt(this.state.StudentTutionFee)
                        // }
                         }
                         })
                         if(this.state.TakeOneTimeFee==true){
                            this.state.Allfees.map((item,index)=>{
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
                        this.state.Allfees.map((item,index)=>{
                            if(item.fee_category=="ANNUAL"){
                                    if(item.fee_sub_category.includes("COMPUTER") !=true ){
                                        annual_fees_sub =annual_fees_sub+parseInt(item.amount)
                                    }else{
                                        if(this.state.take_computer=="true"){
                                            annual_fees_sub =annual_fees_sub+parseInt(item.amount)
                                    }
                                }
                            }
                        })
        var paidFees= [];
        var paidAmount = parseInt(this.state.paid_amount)
        paidAmount = paidAmount+ parseInt(this.state.surplus)+ parseInt(this.state.due)
        var  setpaidAmount = paidAmount+ parseInt(this.state.surplus)+ parseInt(this.state.due)
        var student_tuition_fee =parseInt( this.state.StudentTutionFee)
        var months = [];
        var finemonths=0
        var fromtomonths = [];
        var lastmonth=[];
        var shortmonths = [];
        var remainbalance = parseInt(this.state.balance)
        var getOneTimeFeesinpaidAmount=true
        var getOneTimeFees=true
        
        var getgrandtotal=true
        var plus_one_time_fees=0;
        var show_annual_fees = 0;
        var total_monthly_fee = 0
        if(this.state.paid_amount=="0"){
            await console.log("wair")
            var dateStart = Moment(this.state.last_fees_date).add(1,'month');
            var dateEnd = Moment(this.state.receipt_date)
            while (dateEnd > dateStart || dateStart.format('M') === dateEnd.format('M') ) {
                if( Moment(this.state.last_fees_date).format('M')=="3" && this.state.session == this.state.last_session && this.state.last_fee_status==true )  {
                    break ;
                }
                if(shortmonths.includes('3')==true)
                {   
                    break ;
                }
               months.push(dateStart.format('YYYY-MM-DD'));
               fromtomonths.push(dateStart.format('M'));
               shortmonths.push(dateStart.format('M'));
               dateStart.add(1,'month');
            }
                await console.log("month set")
        }else{
        var EndDate = Moment(this.state.last_fees_date)
        if(Moment(this.state.last_fees_date).format('M')=="3" && this.state.session == this.state.last_session && this.state.last_fee_status==true ){
            this.setOneTimeFeeForExtraAmontInMarchMonth()
            // alert("done")
            fromtomonths.push('3');
            this.state.Allfees.map((item,index)=>{
                if(item.fee_category=="ANNUAL"){
                   if(this.state.is_teacher_ward=="false"){
                   if(item.fee_sub_category == "MISC" ){
                    this.state.Allfees[index].amount=this.state.paid_amount
                   }
                }
                }
                })
                paidFees.push({"tuition_fee":0,"fee_month":3,"annual_fees":parseInt(this.state.paid_amount)+parseInt(this.state.balance),"one_time":0})
                this.setState({fromtomonths:fromtomonths,fine:0,remaning_balance:parseInt(this.state.paid_amount)+parseInt(this.state.balance),annual_fee:parseInt(this.state.paid_amount),one_time_fees:0,total_monthly_fee:0,grand_total:parseInt(this.state.paid_amount)+parseInt(this.state.balance),last_fee_date:this.state.last_fees_date})
        }else{      


        // this code for set All fees not paid to set 0
            {this.state.Allfees.map((item,index)=>{
                if(item.fee_category=="ONE TIME"){
                    if(this.state.TakeOneTimeFee!=true){
                        this.state.Allfees[index].amount = 0
                    }else{                           
                        // this.FeesClasswise(this.state.class_name,this.state.section)
                    }
                }
                if(item.fee_category=="ANNUAL"){
                if(item.fee_sub_category.includes("COMPUTER") !=true){
                    if(this.state.months.includes(item.month) !=true && item.month != ""){
                        this.state.Allfees[index].amount = 0
                    }else{
                        this.state.Allfees[index].amount = this.state.AllDummyfees[index].amount
                        this.setState({Allfees:this.state.Allfees})
                    }
                }else{
                    if(this.state.take_computer=="true"){
                        if(this.state.months.includes(item.month) !=true && item.month != ""){
                            this.state.Allfees[index].amount = 0
                        }else{
                            this.state.Allfees[index].amount = this.state.AllDummyfees[index].amount
                            this.setState({Allfees:this.state.Allfees})
                        } 
                    }
                }
            }
        })}    
         //End this code for set All fees not paid to set 0
        while( paidAmount >0  ){
            if( Moment(this.state.last_fees_date).format('M')=="3" && this.state.session == this.state.last_session && this.state.last_fee_status==true )  {
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
            if(getOneTimeFeesinpaidAmount == true ){
                getOneTimeFeesinpaidAmount= false
                
                if(parseInt(this.state.fee_concession) > 0 && this.state.fee_concession != ""){
                    if(parseInt(this.state.fromtomonths.length) < 5){
                        paidAmount = paidAmount - student_tuition_fee-calculateOneTimeFee-1050
                    }else{
                        paidAmount = paidAmount - student_tuition_fee-calculateOneTimeFee-2400
                    }
               
                }else{
                    paidAmount = paidAmount - (student_tuition_fee/2)-calculateOneTimeFee-monthlytotal             
                }
            }
        else if(getOneTimeFeesinpaidAmount== false){
            if(this.state.is_teacher_ward=="false"){  
                if(this.state.take_computer=="false"){
                    paidAmount = paidAmount - student_tuition_fee-(annual_fees_sub*8/100)-10
                    //  paidAmount = paidAmount - student_tuition_fee-annual_fees_sub
                }
                if(this.state.take_computer=="true"){

                    paidAmount = paidAmount - student_tuition_fee-100

                    // ****** this code when computer fess is aplicable  ******

                    //  paidAmount = paidAmount - student_tuition_fee-1400

                    // ****** End this code when computer fess is aplicable  ******
                    
                }
            }else if(this.state.is_teacher_ward=="true"){
                if(this.state.take_computer=="false"){
                    paidAmount = paidAmount - student_tuition_fee-200
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
        // if(Moment(this.state.last_fees_date).format('M')!="3"){
        var last_fee_date = lastmonth[months.length-1] 
        {this.setState({months:shortmonths,feemonths:months,fromtomonths:fromtomonths,last_fee_date:last_fee_date})}
        // }
        await console.log("short Monts"+shortmonths)
        shortmonths.map((i,ind)=>{
            var annual_fees = 0;
            var one_time_fees = 0;
            this.state.Allfees.map((item,index)=>{
                if(item.fee_category=="ANNUAL"){
                    if(i==item.month){
                        if(item.fee_sub_category.includes("COMPUTER") !=true ){
                        annual_fees =annual_fees+parseInt(item.amount)
                        }else{
                            if(this.state.take_computer=="true"){
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
                                if(this.state.take_computer=="true"){
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
                        annual_fees = annual_fees+0
                    }
                }
            })
            // alert(annual_fees)
            show_annual_fees=show_annual_fees+annual_fees
            if(this.state.TakeOneTimeFee==true){
                if(getOneTimeFees==true){
                this.state.Allfees.map((item,index)=>{
                     
                if(item.fee_category=="ONE TIME"){
                        one_time_fees =one_time_fees+ parseInt(item.amount)
                        plus_one_time_fees=parseInt(one_time_fees)
                }
                getOneTimeFees=false
                })
            }
        }
       
        this.state.Allfees.map((item,index)=>{
            if(item.fee_category=="MONTHLY"){     
                // if(this.state.is_teacher_ward=="false"){
                    if(item.fee_sub_category == "TUITION FEE" ){
                        if(parseInt(this.state.fee_concession) > 0 && this.state.fee_concession != ""){
                            total_monthly_fee = total_monthly_fee+((parseInt(item.amount)*parseInt(this.state.fee_concession))/100)
                        }else{
                            total_monthly_fee = total_monthly_fee+parseInt(item.amount)
                        }
                        if(parseInt(this.state.fee_concession) == 100 ){
                            total_monthly_fee=0
                        }
                }else{
                    total_monthly_fee = total_monthly_fee+parseInt(item.amount)
                }
            // }
        }
        })      
        if(this.state.is_teacher_ward=="false"){  
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
        paidFees.push({"tuition_fee":this.state.StudentTutionFee,"fee_month":i,"annual_fees":annual_fees,"one_time":one_time_fees})
        if(getgrandtotal==true){
            grand_total = grand_total+monthlytotal+annual_fees+plus_one_time_fees+parseInt(this.state.fine)
            getgrandtotal = false            
        }else{
            grand_total = grand_total+monthlytotal+annual_fees
        }
        remainbalance = parseInt(this.state.paid_amount)+parseInt(this.state.surplus)+ parseInt(this.state.due)-grand_total
        {this.setState({total_monthly_fee:total_monthly_fee,grand_total:grand_total,paidFees:paidFees,remaning_balance:remainbalance,one_time_fees:plus_one_time_fees,annual_fee:show_annual_fees})}
        console.log("paid Fees"+JSON.stringify(paidFees))        
    })
    }
    // else{
    //     {this.setState({total_monthly_fee:0,grand_total:0,paidFees:0,remaning_balance:0,one_time_fees:0,annual_fee:0})}
    // }
    // this.FeesClasswise(this.state.class_name,this.state.section)
    await console.log("wait")
        if(parseInt(total_monthly_fee)+show_annual_fees+plus_one_time_fees+parseInt(this.state.fine)-parseInt(this.state.due)-parseInt(this.state.surplus) == parseInt(this.state.remaning_balance)*-1 && parseInt(total_monthly_fee)+show_annual_fees+plus_one_time_fees+parseInt(this.state.fine) != '0'){  
           

            this.setState({paid_amount:parseInt(this.state.remaning_balance)*-1})
            this.setBalance()
        
            if(defaultDateStatus == true){
                this.setState({receipt_date:defaultDate})
                defaultDateStatus=false
            }
        }
     
        if(this.state.defaultFine == ""){
            this.searchByAdmission_no_with_session()
        }
       
}
    SetAddOrSubFee=(index,a)=>{
        this.state.Allfees[index].amount=a
        this.setState({fees:this.state.Allfees})
    }
    // total_monthly_fee=()=>{
    //     var total_monthly_fee = 0
    //     this.state.fees.map((item,index)=>{
    //         if(item.fee_category=="MONTHLY"){
    //             total_monthly_fee = (parseInt(item.amount))+total_monthly_fee
    //         }
    //         })
    //         total_monthly_fee = total_monthly_fee *parseInt(this.state.feemonths.length)
    //     {this.setState({total_monthly_fee:total_monthly_fee})}
    // }
    ChangeFeeDate=async(e)=>{
        if(defaultDateStatus == false){
            
        defaultDate= localStorage.getItem('R_date')
        defaultDateStatus = true
        }
        
       var fee_date = Moment(this.state.last_fees_date).add(e.target.value,'month');
       this.setState({receipt_date:fee_date.format("YYYY-MM-DD")})
       await this.searchByAdmission_no_with_session()

     
        // alert(fee_date.format("YYYY-MM-DD"))
    }
    grand_total=()=>{
    //    let grand_total = parseInt(this.state.tution_fee)+parseInt(this.state.science_fee)+parseInt(this.state.bus_fare)  
        const paidFees = []      
         let grand_total=0
         if(this.state.TakeOneTimeFee == true) {           
            this.state.fees.map((item,index)=>{
                if(item.fee_category=="ONE TIME"){
                    grand_total = parseInt(item.amount)+grand_total
                    paidFees.push({'fee_category':item.fee_category,'fee_sub_category':item.fee_sub_category,'amount':item.amount})
                }
            })
           }
           this.state.fees.map((item,index)=>{
            if(item.fee_category=="ANNUAL" && this.state.months.includes(item.month)){
                grand_total = parseInt(item.amount)+grand_total
                paidFees.push({'fee_category':item.fee_category,'fee_sub_category':item.fee_sub_category,'amount':item.amount,'month':item.month})
            }
            })
            this.state.fees.map((item,index)=>{
                if(item.fee_category=="MONTHLY"){
                    grand_total = (parseInt(item.amount))+grand_total
                    paidFees.push({'fee_category':item.fee_category,'fee_sub_category':item.fee_sub_category,'amount':item.amount})
                }
                })
           this.setState({grand_total:grand_total,paidFees:paidFees})
    }
    searchByAdmission=(admsn_no)=>{
        {this.setState({admission_no:admsn_no})}
        this.searchByAdmission_no_with_session()
    }
    ShowModalStudent=async(data)=>{
    const admission_no = data 
     if(admission_no =='0'){
             return false;
        }
        fetch("http://144:91:110:210:4800/singlestudentdata"
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
            console.log( 'single parent'+data )  
            if(data[0] !=undefined){
                this.setState({modal_account_no:data[0].account_no,date_of_admission:data[0].student.date_of_admission,modal_admission_no:data[0].admission_no,security_no:data[0].student.security_no,class_name:data[0].class_name,section:data[0].section,category:data[0].student.category,house:data[0].student.house,name:data[0].student.name,sex:data[0].student.sex,dob:data[0].student.dob,aadhar_no:data[0].student.aadhar_no,father_name:data[0].student.father_name,mother_name:data[0].student.mother_name,gaurdian_name:data[0].student.gaurdian_name,parent_address:data[0].student.parent_address,parent_mobile:data[0].student.parent_mobile,gaurdian_address:data[0].student.gaurdian_address,fee_concession:data[0].student.fee_concession,avail_transport:data[0].student.avail_transport,bus_fare_concession:data[0].student.bus_fare_concession,vehicle_no:data[0].student.vehicle_no,is_full_free_ship:data[0].student.is_full_free_ship,is_teacher_ward:data[0].student.is_teacher_ward,take_computer:data[0].student.take_computer,ncc:data[0].student.ncc,no_exempt_registration:data[0].student.no_exempt_registration,no_exempt_admission:data[0].student.no_exempt_admission,no_exempt_security_deposit:data[0].student.no_exempt_security_deposit,is_repeater:data[0].student.is_repeater,other_details:data[0].student.other_details,misc_details:data[0].student.misc_details,subjects:data[0].student.subjects,image:data[0].student.image})
            }
        })
    }
    ShowModal=async(data)=>{
        await console.log("wait")
        localStorage.setItem('StudentDisplay',data)
        this.setState({redirect:true})
        // if(admission_no =='0'){
        //      return false;
        // }
        // fetch("http://144:91:110:210:4800/singlestudentdata"
        // ,{
        //     method: 'POST',
        //     headers: {
        //         Accept: 'application/json',
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         admission_no: admission_no
        //     })
        // })
        // .then((data) => data.json())
        // .then(async (data) => {
        //     console.log( 'single parent'+data )  
        //     if(data[0] !=undefined){
        //         this.setState({modal_account_no:data[0].account_no,date_of_admission:data[0].date_of_admission,modal_admission_no:data[0].admission_no,security_no:data[0].security_no,class_name:data[0].class_name,section:data[0].section,category:data[0].category,house:data[0].house,name:data[0].name,sex:data[0].sex,dob:data[0].dob,aadhar_no:data[0].aadhar_no,father_name:data[0].father_name,mother_name:data[0].mother_name,gaurdian_name:data[0].gaurdian_name,parent_address:data[0].parent_address,parent_mobile:data[0].parent_mobile,gaurdian_address:data[0].gaurdian_address,fee_concession:data[0].fee_concession,avail_transport:data[0].avail_transport,bus_fare_concession:data[0].bus_fare_concession,vehicle_no:data[0].vehicle_no,is_full_free_ship:data[0].is_full_free_ship,is_teacher_ward:data[0].is_teacher_ward,take_computer:data[0].take_computer,ncc:data[0].ncc,no_exempt_registration:data[0].no_exempt_registration,no_exempt_admission:data[0].no_exempt_admission,no_exempt_security_deposit:data[0].no_exempt_security_deposit,is_repeater:data[0].is_repeater,other_details:data[0].other_details,misc_details:data[0].misc_details,subjects:data[0].subjects,image:data[0].image})
        //     }
           
        //     // this.setState({account_no:data[0].account_no,father_name:data[0].father_name,mother_name:data[0].mother_name,father_occu:data[0].father_occu,father_designation:data[0].father_designation,father_annual_income:data[0].father_annual_income,mother_occu:data[0].mother_occu,mother_designation:data[0].mother_designation,mother_annual_income:data[0].mother_annual_income,parent_address:data[0].parent_address,parent_mobile:data[0].parent_mobile,gaurdian_name:data[0].gaurdian_name,gaurdian_address:data[0].gaurdian_address,gaurdian_mobile:data[0].gaurdian_mobile,gaurdian_annual_income:data[0].gaurdian_annual_income,gaurdian_occu:data[0].gaurdian_occu,gaurdian_designation:data[0].gaurdian_designation})
        // })
    }
    checkValidation = () => {
        if (this.state.receipt_date === undefined) {
            this.setState({receipt_dateErrorMessage: "Please Choose Pay Up to field"})
            return false
        }else if (this.state.session === undefined) {
            this.setState({sessionErrorMessage: "Please Select Session"})
            return false
        }else if (this.state.admission_no === "") {
            this.setState({admission_noErrorMessage: "Please Enter Adnission Number"})
            return false
        }else if (this.state.account_no === "") {
            this.setState({account_noErrorMessage: "Please Enter Account Number"})
            return false
        }else if (this.state.bank === "") {
            this.setState({bankErrorMessage: "Please Select Bank"})
            return false
        }
        else {
            return true
        }
      }
    submitReceiptData = async() => {
        // alert(this.state.receipt_no)
      if(this.state.session == this.state.last_session || this.state.fromtomonths[this.state.fromtomonths.length-1] != 3 || this.state.fromtomonths[0] == 4){
            console.log("wait")
            console.log(JSON.stringify(this.state.Allfees))
            if (this.checkValidation() ) {
                if(submitonce ==0){
                submitonce =1
            const data = new FormData()
            data.append('receipt_date', this.state.receipt_date)
            data.append('take_computer', this.state.take_computer)
            data.append('fee_concession', this.state.fee_concession)
            data.append('is_teacher_ward', this.state.is_teacher_ward)
            data.append('is_full_free_ship', this.state.is_full_free_ship)
            data.append('unique_id', this.state.session+this.state.receipt_no)
            data.append('defaulter_month',  Moment(this.state.receipt_date).format("M"))


            if(Moment(this.state.last_fees_date).format('M')=="3" && this.state.session == this.state.last_session && this.state.last_fee_status==true ){
                data.append('last_fee_date', "2021-03-31")  
            }else{
            data.append('last_fee_date', this.state.last_fee_date)
            }
            data.append('receipt_no', this.state.receipt_no)
            data.append('ref_receipt_no', this.state.ref_receipt_no)
            data.append('session', this.state.session)
            data.append('admission_no', this.state.admission_no)
            data.append('class_name', this.state.class_name)
            data.append('section', this.state.section)
            data.append('account_no', this.state.account_no)
            data.append('name', this.state.name)
            data.append('prospectus_fee', this.state.prospectus_fee)
            data.append('registration_fee', this.state.registration_fee)
            data.append('admission_fee', this.state.admission_fee)
            data.append('security_fee', this.state.security_fee)
            data.append('paid_fees', JSON.stringify(this.state.paidFees))
            data.append('Allfees', JSON.stringify(this.state.Allfees))
            data.append('fees', JSON.stringify(this.state.Actualfees))
            data.append('paid_months', JSON.stringify(this.state.months))
            data.append('paid_amount', this.state.paid_amount)
            data.append('fine', this.state.fine)
            data.append('balance', this.state.remaning_balance)
            data.append('paid_month', this.state.fromtomonths[this.state.fromtomonths.length-1])
            data.append('total_annual_fee', this.state.annual_fee)
            data.append('total_one_time_fee', this.state.one_time_fees)
            data.append('total_monthly_fee', this.state.total_monthly_fee)
            data.append('grand_total', this.state.grand_total)
            data.append('payment_mode', this.state.payment_mode)
            data.append('bank', this.state.bank)
            data.append('bank_v_no', this.state.bank_v_no)
            data.append('check_no', this.state.check_no)
            data.append('bank_date', this.state.bank_date)
            const url = "http://144:91:110:210:4800/StoreReceipt"
            fetch(url, {
                    method: 'post',
                    body: data
                })
                .then(res => res.json())
                .then(()=>{
                    this.UpdateBalance()  
                })
                .then(data => {
                    alert("Receipt Details Stored Successfully !")
                   
                    window.location.reload(false);  
                    this.setState({balance:'0',account_no:'', total_monthly_fee:'0',one_time_fees:'0',annual_fee:'0',AllOldFees:[],month:[],shortmonths:[],feemonths:[],grand_total:'',Allfees:[],due:'0',surplus:'0'})    
                })
                .then(err => {})
            }
        }
    }else{       
        window.confirm("Student Previous Session ("+ this.state.last_session +") Fee is not paid! Please First Pay Previous Session Fee")
    }
        }
        UpdateBalance=()=>{
            if (this.checkValidation()) {
            const data = new FormData()
            data.append('_id',this.state._id)   
            data.append('balance',this.state.balance)   
            data.append('paid_upto_month',this.state.last_fee_date)    
            const url="http://144:91:110:210:4800/UpdateBalance"
                    fetch(url,
                        {
                        method:'PATCH',
                        body:data
                    })
                    .then(res => res.json())              
                    .then((res)=>{  
                    })            
                    .then(err=>console.log(err))
                }
        }
        SetFee=async(index,e)=>{
            this.state.AllDummyfees[index].amount=e.target.value
            if(this.state.AllDummyfees[index].amount ==''){
                this.state.AllDummyfees[index].amount=0
            }
            this.state.Allfees[index].amount=e.target.value
            if(this.state.Allfees[index].amount ==''){
                this.state.Allfees[index].amount=0
            }
            this.setBalance()
            }

            setOneTimeFeeForExtraAmontInMarchMonth(){
                if(Moment(this.state.last_fees_date).format('M')=="3" && this.state.session == this.state.last_session && this.state.last_fee_status==true ){
                    this.state.Allfees.map((item,index)=>{
                        if(item.fee_category == "ONE TIME"){
                            this.state.Allfees[index].amount=0
                        }
                    })
                    this.state.Allfees.map((item,index)=>{
                        if(item.fee_category == "ANNUAL"){
                            if(item.fee_sub_category !="MISC"){
                            this.state.Allfees[index].amount=0
                            }
                        }
                    })
                }
            }
          
            // SetFFee=async()=>{
               
            //     }
    
            printReceipt() {
                window.print();
              }      
        DeleteReceipt(id){
                const apiUrl = 'http://144:91:110:210:4800/DeleteReceipt';
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
                this.SearchOldfee()
                })
        }
        //     indexFunction(e) {
        //     var x = document.getElementsByTagName("input")[9].tabIndex;
        //    if(x==4){
        //        if(this.state.bank == ""){
        //         alert("Please Select Bank !")
        //        }
        //    }
        // }   
        handleFocusInput (e){
             e.target.select(); 
        }

        editReceiptObject = (obj) => {
            this.setState({Rid:'',Rpaidmonth:'',Rreceiptdate:'',Rbank:'',Rreceiptno:'',Rlastpaiddate:'',Rbalance:""})
            let Rpaidmonth   = obj.paid_month
            let Rreceiptdate   = obj.receipt_date
            let Rlastpaiddate = obj.last_fee_date
            let Rbank   = obj.bank
            let Rreceiptno   = obj.receipt_no
            let Rid = obj._id
            let Rbalance   = obj.balance
            this.setState({Rbalance,Rid,Rpaidmonth,Rreceiptdate,Rbank,Rreceiptno,Rlastpaiddate})
        }
        UpdateReceipt =()=>{
            // if (this.checkValidation()) {
            const data = new FormData()
            data.append('_id',this.state.Rid)
            data.append('bank', this.state.Rbank)
            data.append('last_fee_date', this.state.Rlastpaiddate)
            data.append('paid_month', this.state.Rpaidmonth)
            data.append('receipt_no', this.state.Rreceiptno)
            data.append('receipt_date', this.state.Rreceiptdate)
            data.append('balance', this.state.Rbalance)
            const url="http://144:91:110:210:4800/UpdateReceipt"
                    fetch(url,
                        {
                        method:'put',
                        body:data
                    })
                    .then(res => res.json())              
                    .then((res)=>{  
                alert('Fees updated successfully !');
                    })            
                    .then(err=>console.log(err))
                  }
        //   }
    render(){


        
     
        $('#recpddate').on('click', function() {
            localStorage.setItem('R_date',Moment().format('YYYY-MM-DD'))
            localStorage.setItem('R_bank','')
            window.location.reload()
        });
        $('#focusguard-2').on('focus', function() {
            // "last" focus guard got focus: set focus to the first field
            $('#firstInput').focus();
        });
          
        $('#focusguard-1').on('focus', function() {
            // "first" focus guard got focus: set focus to the last field
        $('#lastInput').focus();
        });
        if (this.state.redirect) {
            return <Redirect to={'/StudentDisplay'} />
        }
        window.addEventListener('keyup', (event) => {
        if(event.keyCode == 120){
          this.submitReceiptData()
        }
          });
        
        const data =[];
        {this.state.ModalAllStudent.map((item,index)=>{
        data.push({"admission_no":item.admission_no,"account_no":item.account_no,"student_name":item.student.name,"class_section":item.class_name+"-"+item.section,"parent_name":item.student.mother_name+"/"+item.student.father_name,"gaurdian_name":item.gaurdian_name,"mobile":item.student.parent_mobile+","+item.student.parent_phone,"address":item.parent_address,'action': <button type="button" className="btn btn-info" onClick={() => this.searchByAdmission(item.admission_no)} data-dismiss="modal">Get Details</button>})})}
          const columns = [
            { title: "Admn No", data: "admission_no" },
            { title: "Ac No", data: "account_no" },
            { title: "St. Name", data: "student_name" },
            { title: "Class", data: "class_section" },
            { title: "Parent Name", data: "parent_name"},
            { title: "Gaurdian Name", data: "gaurdian_name"},
            { title: "Mobile", data: "mobile"},
            // { title: "Address", data: "address"},
            { title: "Action", data: "action"},
          ];
        //   const click = (row) => {
        //     console.log(row);
        //   };

        //   const dataa =[];
        //   { this.state.AllStudent.map((item,index)=>{
        //   dataa.push( {"sr_no":index+1,"name":item.name,"admission_no":item.admission_no,"account_no":item.account_no,"session":item.session,"class":item.class_name,"section":item.section,'action': <button type="button" className="btn btn-info" onClick={() => this.searchByAdmission(item.admission_no)}>Get Details</button>,"show":<button type="button" onClick={()=>{this.ShowModal(item.admission_no)}} class="btn btn-info" data-toggle="modal" data-target="#myModal">SHOW</button>})
        //   })}
        //     const columnss = [
        //       { title: "SR NO", dataa: "sr_no" },
        //       { title: "Name", dataa: "name" },
        //       { title: 'Admission No',dataa: "admission_no"},
        //       { title: 'Account No', dataa: "account_no"},
        //       { title: "Session", dataa: "session" },
        //       { title: "Class", dataa: "class" },
        //       { title: "Section", dataa: "section" },
        //       { title: "Action", dataa: "action" },
        //       { title: "Show", dataa: "show"},
        //     ];
        const currentMonth = this.state.currentMonth
        defaultDate=localStorage.getItem('R_date')
        // defaultDateStatus=false

        countAdmission_no=''
        return(
            <>
            {/* edit modal */}
            <div id="EditModal" class="modal fade" role="dialog">
        <div class="modal-dialog modal-md">            
            <div class="modal-content">
            <div class="modal-header">
            <h4 class="modal-title">Edit Fee Detail</h4>
            <button type="button" class="close" data-dismiss="modal" data-toggle="modal" data-target="#OldFeeModal">&times;</button>
            </div>
            <div class="modal-body">  
            <div className="row">
                <div className="col-3">
                    <label>Receipt No</label>
                    <input type="text" className="form-control" value={this.state.Rreceiptno} onChange={(e)=>{{this.setState({Rreceiptno:e.target.value.toUpperCase()})}}}/>
                </div>
                <div className="col-3">
                    <label>Receipt Date</label>
                    <input type="date" className="form-control" value={this.state.Rreceiptdate} onChange={(e)=>{{this.setState({Rreceiptdate:e.target.value.toUpperCase()})}}}/>
                </div>
                <div className="col-3">
                    <label>Paid upto</label>
                    <select className="form-control" value={this.state.Rpaidmonth} onChange={(e)=>{{this.setState({Rpaidmonth:e.target.value.toUpperCase()})}}}>
                           <option value="">Select...</option>
                                <option value="1">January</option>
                                <option value="2">February</option>
                                <option value="3">March</option>
                                <option value="4">April</option>
                                <option value="5">May</option>
                                <option value="6">June</option>
                                <option value="7">July</option>
                                <option value="8">August</option>
                                <option value="9">September</option>
                                <option value="10">October</option>
                                <option value="11">November</option>
                                <option value="12">December</option>
                           </select>
                </div>
                <div className="col-3">
                    <label>Paid upto Date</label>
                    <input type="date" className="form-control" value={this.state.Rlastpaiddate} onChange={(e)=>{{this.setState({Rlastpaiddate:e.target.value.toUpperCase()})}}}/>
                </div>
                <div className="col-3">
                    <label>Bank</label>
                    <select  className="form-control" onChange={(e)=>{this.setState({Rbank:e.target.value.toUpperCase()});}} value={this.state.Rbank}  >
                                        <option value="">Choose Bank</option>
                                       {this.state.AllBank.map((item,index)=>{
                                           return(
                                            <option value={item.bank}>{item.bank}</option>
                                           )
                                       })}
                    </select> 
                </div>
                <div className="col-3">
                    <label>Dues/Surplus</label>
                    <input type="text" className="form-control" value={this.state.Rbalance} onChange={(e)=>{{this.setState({Rbalance:e.target.value.toUpperCase()})}}}/>
                </div>
                <div className="col-3">
                    <br/>
                    <button onClick={()=>{this.UpdateReceipt()}} className="btn btn-secondary ">Update</button>
                </div>
            </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal" data-toggle="modal" data-target="#OldFeeModal">Close</button>
            </div>
            </div>

        </div>
        </div>
            {/* end edit modal */}
            <div id="myModal" class="modal fade" role="dialog">
                <div className="row">
                    <div className="col-4">
                                <ModalImage
                                small={"http://144:91:110:210:4800/" + this.state.image}
                                medium={"http://144:91:110:210:4800/" + this.state.image}
                                large={"http://144:91:110:210:4800/" + this.state.image}
                                alt={this.state.image}
                                />;
                    </div>
                    <div className="col-4">
                                <ModalImage
                                small={"http://144:91:110:210:4800/" + this.state.image}
                                medium={"http://144:91:110:210:4800/" + this.state.image}
                                large={"http://144:91:110:210:4800/" + this.state.image}
                                alt={this.state.image}
                                />;
                    </div>
                    <div className="col-4">
                                <ModalImage
                                small={"http://144:91:110:210:4800/" + this.state.image}
                                medium={"http://144:91:110:210:4800/" + this.state.image}
                                large={"http://144:91:110:210:4800/" + this.state.image}
                                alt={this.state.image}
                                />;
                    </div>
                </div>
                <div class="modal-dialog modal-lg">
                    <div class="modal-content" style={{width:'100%'}}>
                        <div class="modal-header p-3">
                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                        </div>
                        <div className="row">
                            <div className="col-6">                     
                        <div class="modal-header">
                            <h4 class="modal-title">Student Details </h4>
                        </div>
                        <div class="modal-body">
                            <table class="table">
                                <tbody>
                                    <tr>
                                    <th scope="row">Addmission Number</th>
                                    <td>{this.state.modal_admission_no}</td>
                                    </tr>
                                    <tr>
                                    <th scope="row">Security Number</th>
                                    <td>{this.state.security_no}</td>
                                    </tr>
                                    <tr>
                                    <th scope="row">Name</th>
                                    <td>{this.state.name}</td>
                                    </tr>
                                    <tr>
                                    <th scope="row">Class / Section</th>
                                    <td>{this.state.class_name} {this.state.section}</td>
                                    </tr>
                                    <tr>
                                    <th scope="row">Category</th>
                                    <td>{this.state.category}</td>
                                    </tr>
                                    <tr>
                                    <th scope="row">House</th>
                                    <td>{this.state.house=="GARDNER" ? <button class_name="btn btn-success">{this.state.house}</button> : this.state.house=="HOWARD" ? <button class_name="btn btn-primary">{this.state.house}</button> : this.state.house=="KHANNA" ? <button class_name="btn btn-danger">{this.state.house}</button> : this.state.house=="LYONS" ? <button class_name="btn " style={{color:'white',backgroundColor:"yellow"}}>{this.state.house}</button> :null } </td> 
                                    </tr>
                                    <tr>
                                    <th scope="row">Gender</th>
                                    <td>{this.state.sex}</td>
                                    </tr>
                                    <tr>
                                    <th scope="row">Date Of Birth</th>
                                    <td>{this.state.dob}</td>
                                    </tr>
                                    <tr>
                                    <th scope="row">Date Of addmission</th>
                                    <td>{ Moment(this.state.date_of_admission).format("DD-MM-YYYY")}</td>
                                    </tr>
                                    <tr>
                                    <th scope="row">Nationality</th>
                                    <td>{this.state.nationality}</td>
                                    </tr>
                                    <tr>
                                    <th scope="row">Aadhar Number</th>
                                    <td>{this.state.aadhar_no}</td>
                                    </tr>
                                    <tr>
                                    <th scope="row">Subjects </th>
                                    <td>{this.state.subjects}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        </div>
                        <div className="col-6">
                        <div class="modal-header">
                            <h4 class="modal-title">Parents Details </h4>
                        </div>
                        <div class="modal-body">
                        <table class="table">
                            <tbody>
                            <tr>
                                <th scope="row">parents Mobile No</th>
                                <td>{this.state.parent_mobile}</td>
                                </tr>
                                <tr>
                                <th scope="row">Account No</th>
                                <td>{this.state.modal_account_no}</td>
                                </tr>
                                <tr>
                                <th scope="row">Father Name</th>
                                <td>{this.state.father_name}</td>
                                </tr>
                                <tr>
                                <th scope="row">Mother Name</th>
                                <td>{this.state.mother_name}</td>
                                </tr>
                                <tr>
                                <th scope="row">Gaurdian Name</th>
                                <td>{this.state.gaurdian_name}</td>
                                </tr>
                                <tr>
                                <th scope="row">Parents Address</th>
                                <td>{this.state.parent_address}</td>
                                </tr>
                                <tr>
                                <th scope="row">Gaurdian Address</th>
                                <td>{this.state.gaurdian_address}</td>
                                </tr>
                                {/* <tr>
                                <th scope="row">Admission Form</th>                                
                                <td>
                                    </td>
                                </tr> */}
                            </tbody>
                        </table>
                        </div>
                      
                        </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* Old Fee Modal */}
            <div id="OldFeeModal" class="modal fade" role="dialog">
                <div class="modal-dialog modal-xl w-100">
                    <div class="modal-content  w-100" >
                        {/* <div class="modal-header p-3">
                            <h4 class="modal-title">Previous Fee Details </h4>
                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                        </div> */}
                        <div class="modal-body printReciept">
                            <div className="row">
                                <div className="col-12 text-center pb-3">
                                <h3 className="m-0">CONSTANCIA SCHOOL ( <select value={this.state.session} className="receiptSession" onChange={(e)=>{{this.setState({session:e.target.value.toUpperCase()})}}}> 
                             <option value="">All Session</option>
                              {this.state.AllSession.map((item,index)=>{
                                  return(
                                    <option value={item.session_code}>{item.session_code}</option>
                                  )
                              })}
                           </select> )</h3>
                                {this.state.AllOldFees.map((item,index)=>{
                                    // if(item.security_fee !='0' ){
                                        // if(item.prospectus_fee !='0' || item.registration_fee !='0'  || item.admission_fee !='0'  || item.security_fee !='0' ){
                                        return(
                                            <div>
                                            {item.security_fee != '0' ? 
                                             <h4 className="w-100"> Security Dep-{item.security_fee}</h4>
                                            :null}
                                            </div>
                                        )
                                    // }
                                })
                            }
                                    {/* <p>WEST CANAL ROAD P.O MAJRA, DEHRADUN</p>
                                    <p>0135-2640930,0135-2642828,FAX:0135-2644353</p> */}
                                </div>
                                <div className="col-5">
                                    <strong>Admn No - </strong> <input type="text"  value={this.state.admission_no} onFocus={(e)=>{this.handleFocusInput(e)}} onChange={(e)=>{this.setState({admission_no:e.target.value});this.searchByAdmission_no_with_session()}} /> <button type="button" onClick={()=>{this.getStudent()}} class="btn btn-success btn-sm" data-toggle="modal" data-target="#AllModalStudent">...</button><span> / <strong>{this.state.account_no}</strong></span><br/>
                                    <label> Student Name  - </label> {this.state.name}<br/>
                                </div>
                                <div className="col-4">
                                <label> Class/Section   - </label> {this.state.class_name}-{this.state.section}<br/>
                                    <label> Parents Name   - </label> {this.state.mother_name} / {this.state.father_name}<br/>
                                   
                                </div>
                                <div className="col-3">
                                <label> Mo.  - </label> {this.state.parent_mobile}<br/>{this.state.parent_phone}<br/>
                                       {/* { 
                                        previouspaidamount =0,
                                        previousannualamount=0,
                                        previousmonthlyamount=0,
                                        previousgrandTotal=0,
                                        previousfine=0,
                                        nothing = ""
                                        } */}
                                </div>
                            </div>
                            <table class="table print_table">
                                <thead class="thead-light">
                                <tr>
                                    <th >Tuition Fee : {this.state.StudentTutionFee}</th>
                                    <th >Take Computer : {this.state.take_computer == "true" ? "YES" : "NO"}</th>
                                    <th >Fee Concession : {this.state.fee_concession}</th>
                                    </tr>
                                </thead>
                            </table>    
                        <table class="table print_table">
                        <thead class="thead-light">
                            <tr>
                            <th scope="col">RECEIPT DATE</th>
                            <th scope="col">MONTH</th>
                            <th scope="col">BANK</th>
                            <th scope="col">R.NO</th>
                            <th scope="col">ONETIME </th>
                            <th scope="col">ANNUAL</th>
                            <th scope="col">MONTHLY</th>
                            <th scope="col">FINE</th>
                            <th scope="col">PAID</th>
                            <th scope="col">DUES</th>
                            <th scope="col">SURPLUS</th>
                            <th scope="col">ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.AllOldFees.map((item,index)=>{
                            // {JSON.parse(item.paid_fees).map((e,i)=>{
                            //         if(e.fee_sub_category =="TUITION FEE"){
                            //             SubtractTuitionFee = e.amount
                            //         }
                            // })}
                            if(item.session==this.state.session){
                                return(
                                            <tr>
                                                <td>{Moment(item.receipt_date).format('DD/MM/YYYY')}</td>
                                                <td>{item.paid_month=='1' ? "Jan"+"-"+Moment(item.last_fee_date).format('YYYY') : item.paid_month=='2' ? "Feb"+"-"+Moment(item.last_fee_date).format('YYYY') : item.paid_month=='3' ? "Mar"+"-"+Moment(item.last_fee_date).format('YYYY')  : item.paid_month=='4' ? "Apr"+"-"+Moment(item.last_fee_date).format('YYYY') : item.paid_month=='5' ? "May"+"-"+Moment(item.last_fee_date).format('YYYY') : item.paid_month=='6' ? "Jun"+"-"+Moment(item.last_fee_date).format('YYYY') : item.paid_month=='7' ? "July"+"-"+Moment(item.last_fee_date).format('YYYY') : item.paid_month=='8' ? "Aug"+"-"+Moment(item.last_fee_date).format('YYYY') : item.paid_month=='9' ? "Sept"+"-"+Moment(item.last_fee_date).format('YYYY') : item.paid_month=='10' ? "Oct"+"-"+Moment(item.last_fee_date).format('YYYY') : item.paid_month=='11' ? "Nov"+"-"+Moment(item.last_fee_date).format('YYYY') : item.paid_month=='12' ? "Dec"+"-"+Moment(item.last_fee_date).format('YYYY'):null}</td>
                                                <td>{item.bank}</td>
                                                <td>{item.receipt_no}</td>
                                                <td>{item.total_one_time_fee}</td>
                                                <td>{item.total_annual_fee}</td>                                            
                                                <td>{parseInt(item.paid_amount)-(parseInt(item.total_one_time_fee)+parseInt(item.total_annual_fee)+parseInt(item.balance)) > 0 ? parseInt(item.paid_amount)-(parseInt(item.total_one_time_fee)+parseInt(item.total_annual_fee)+parseInt(item.balance)) : 0}</td>
                                                <td>{item.fine}</td>
                                                {/* <td>{item.grand_total}</td> */}
                                                <td>{item.paid_amount}</td>
                                                <td>   
                                                {parseInt(item.balance) < 0 ? item.balance : "0"}
                                                </td>
                                                <td>{parseInt(item.balance) > 0 ? item.balance : "0"}</td>
                                                <td><button data-dismiss="modal" onClick={() => this.editReceiptObject(item)} className="btn btn-secondary mr-2"  data-toggle="modal" data-target="#EditModal" ><i class="fas fa-pencil-alt"></i></button><button className="btn btn-sm btn-danger" onClick={() => {if(window.confirm('Are You Sure?')){this.DeleteReceipt(item._id)};}} ><i className="fa fa-trash" aria-hidden="true"></i></button></td>
                                            </tr>
                                )
                            }
                            if(this.state.session==""){
                                return(
                                            <tr>
                                                <td>{Moment(item.receipt_date).format('DD/MM/YYYY')}</td>
                                                <td>{item.paid_month=='1' ? "Jan" : item.paid_month=='2' ? "Feb" : item.paid_month=='3' ? "Mar"  : item.paid_month=='4' ? "Apr" : item.paid_month=='5' ? "May" : item.paid_month=='6' ? "Jun" : item.paid_month=='7' ? "July" : item.paid_month=='8' ? "Aug" : item.paid_month=='9' ? "Sept" : item.paid_month=='10' ? "Oct" : item.paid_month=='11' ? "Nov" : item.paid_month=='12' ? "Dec":null}</td>
                                                <td>{item.bank}</td>
                                                <td>{item.receipt_no}</td>
                                                <td>{item.total_one_time_fee}</td>
                                                <td>{item.total_annual_fee}</td>                                            
                                                <td>{parseInt(item.paid_amount)-(parseInt(item.total_one_time_fee)+parseInt(item.total_annual_fee)+parseInt(item.balance)) > 0 ? parseInt(item.paid_amount)-(parseInt(item.total_one_time_fee)+parseInt(item.total_annual_fee)+parseInt(item.balance)) : 0}</td>
                                                <td>{item.fine}</td>
                                                {/* <td>{item.grand_total}</td> */}
                                                <td>{item.paid_amount}</td>
                                                <td>   
                                                {parseInt(item.balance) < 0 ? item.balance : "0"}
                                                </td>
                                                <td>{parseInt(item.balance) > 0 ? item.balance : "0"}</td>
                                                <td><button className="btn btn-sm btn-danger" onClick={() => {if(window.confirm('Are You Sure?')){this.DeleteReceipt(item._id)};}} ><i className="fa fa-trash" aria-hidden="true"></i></button></td>
                                            </tr>
                                )
                            }
                            })}
                            {this.state.AllOldFees.map((item,index)=>{
                                 if(item.session==this.state.session){
                              previouspaidamount  = parseInt(previouspaidamount)+parseInt(item.paid_amount)+parseInt(item.fine)
                            //   alert(previouspaidamount)
                              previousannualamount =parseInt(previousannualamount) +parseInt(item.total_annual_fee)
                              var a 
                              if((parseInt(item.paid_amount)-(parseInt(item.total_one_time_fee)+parseInt(item.total_annual_fee)+parseInt(item.balance))) > 0){
                                a=(parseInt(item.paid_amount)-(parseInt(item.total_one_time_fee)+parseInt(item.total_annual_fee)+parseInt(item.balance)))
                              }else{
                                  a=0
                              }
                              previousmonthlyamount=parseInt(previousmonthlyamount)+a
                              previousgrandTotal= parseInt(previousgrandTotal)+parseInt(item.grand_total)
                              previousfine = parseInt(previousfine)+parseInt(item.fine)
                            }
                            })}

                             {this.state.AllOldFees.map((item,index)=>{
                                 if(this.state.session==""){
                              previouspaidamount  = parseInt(previouspaidamount)+parseInt(item.paid_amount)+parseInt(item.fine)
                            //   alert(previouspaidamount)
                              previousannualamount =parseInt(previousannualamount) +parseInt(item.total_annual_fee)
                              var a 
                              if((parseInt(item.paid_amount)-(parseInt(item.total_one_time_fee)+parseInt(item.total_annual_fee)+parseInt(item.balance))) > 0){
                                a=(parseInt(item.paid_amount)-(parseInt(item.total_one_time_fee)+parseInt(item.total_annual_fee)+parseInt(item.balance)))
                              }else{
                                  a=0
                              }
                              previousmonthlyamount=parseInt(previousmonthlyamount)+a
                              previousgrandTotal=parseInt(previousgrandTotal)+parseInt(item.grand_total)
                              previousfine =parseInt(previousfine)+parseInt(item.fine)
                            }
                            })}
                            
                            <td><strong>GRAND_TOTAL</strong></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td><strong>{previousannualamount}</strong></td>
                            <td><strong>{previousmonthlyamount}</strong></td>
                            <td><strong>{previousfine}</strong></td>
                            {/* <td><strong>{previousgrandTotal}</strong></td> */}
                            <td><strong>{parseInt(previouspaidamount)}</strong></td>

                            {this.state.AllOldFees.map((item,index)=>{
                                if(index == this.state.AllOldFees.length-1){
                                    if(parseInt(item.balance) <= 0 ){
                                        return(<td><strong>{parseInt(item.balance)}</strong></td>)
                                    }else{
                                        return(<td><strong>0</strong></td>) 
                                    }
                                }
                            })
                            }
                                {this.state.AllOldFees.map((item,index)=>{
                                if(index ==this.state.AllOldFees.length-1){
                                    
                                    if(parseInt(item.balance) >=0 ){
                                        return(<td><strong>{parseInt(item.balance)}</strong></td>)
                                    }else{
                                        return(<td><strong>0</strong></td>) 
                                    }
                                }
                            })
                        }

                            {/* {previouspaidamount-previousgrandTotal < 0 ? <td><strong>{previouspaidamount-previousgrandTotal}</strong></td> : <td></td>}

                            {previouspaidamount-previousgrandTotal  >= 0 ? <td><strong>{previouspaidamount-previousgrandTotal}</strong></td> : <td></td>} */}
                           
                        </tbody>
                    </table>
                        </div>
                        
                        
                        <div class="modal-footer">
                        <button class="hide-on-print btn btn-success btn-md" onClick={this.printReceipt}>Print</button>
                            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                        </div>
                    </div>

                </div>
            </div>
            {/* End Old Fee Modal */}
            {/* Modal All student */}
            <div id="AllModalStudent" class="modal fade" role="dialog">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content" style={{width:'100%'}}>
                        <div class="modal-header p-3">
                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                        </div>
                        <div className="row">
                            <div className="col-12">                     
                        <div class="modal-header">
                            <h4 class="modal-title">Student Details </h4>
                        </div>
                        <div class="modal-body">
                            {this.state.ModalAllStudent !="" ?
                            "data"
                    //     <DataTable
                    //     data={data}
                    //     columns={columns}
                    //     striped={true}
                    //     hover={true}
                    //     responsive={true}
                      
                    // />
                    :
                    <lottie-player src="https://assets2.lottiefiles.com/private_files/lf30_uilaciwr.json"  background="transparent"  speed="1"  style={{width: "300px", height: "300px",margin:"auto"}}  loop  autoplay></lottie-player>
                  }
                        </div>
                        </div>
                     </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* end all modal student */}
            {/* Fee Stucture Modal */}
            <div id="feestructuremodal" class="modal fade" role="dialog">
                <div class="modal-dialog modal-xl w-100">
                    <div class="modal-content">
                    <div class="modal-header">
                    <h4 class="modal-title">Orignal Fee Structure</h4>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    </div>
                    <div class="modal-body">
                    <h3 className="text-center">ONE TIME FEE</h3>
                    <table class="table orignalfeestructureTable">
                            <thead class="thead-light">
                              <tr>
                                <th scope="col">PROSPECTUS</th>
                                <th scope="col">REGISTRATION</th>
                                <th scope="col">ADDMISSION</th>
                                <th scope="col">SECURITY DEPOSIT</th>
                                <th scope="col">TOTAL ONE TIME</th>
                              </tr>
                            </thead>
                            <tbody>
                            <tr>
                    {this.state.OrignalFeeStructure.map((item,index)=>{
                        if(item.fee_category=="ONE TIME"){
                        return( 
                                <td>{item.amount}</td>
                            )
                        }
                        })}
                        <td>{this.state.orignaltotalonetime}</td>
                         </tr>
                           </tbody>
                          </table>

                    <h3 className="text-center">ANNUAL FEE</h3>
                    <table class="table orignalfeestructureTable">
                            <thead class="thead-light">
                              <tr>
                              {/* {this.state.OrignalFeeStructure.map((item,index)=>{
                        if(item.fee_category=="ANNUAL"){
                        return( 
                                <th>{item.fee_sub_category}</th>
                            )
                        }
                        })} */}
                                <th scope="col">CARD & DIARY</th>
                                <th scope="col">PRIZE</th>
                                <th scope="col">DEVELOPMENT</th>
                                <th scope="col">MAGAZINE</th>
                                <th scope="col">SPORTS</th>
                                <th scope="col">EXAMINATION</th>
                                <th scope="col">COMPUTER(1)</th>
                                <th scope="col">COMPUTER(2)</th>
                                <th scope="col">ICSE</th>
                                <th scope="col">BOARD</th>
                                <th scope="col">TOTAL</th>
                              </tr>
                            </thead>
                            <tbody>
                            <tr>
                    {this.state.OrignalFeeStructure.map((item,index)=>{
                        if(item.fee_category=="ANNUAL"){
                        return( 
                                <td>{item.amount}   ({item.month=='1' ? "Jan" : item.month=='2' ? "Feb" : item.month=='3' ? "Mar"  : item.month=='4' ? "Apr" : item.month=='5' ? "May" : item.month=='6' ? "Jun" : item.month=='7' ? "July" : item.month=='8' ? "Aug" : item.month=='9' ? "Sept" : item.month=='10' ? "Oct" : item.month=='11' ? "Nov" : item.month=='12' ? "Dec":null})</td>
                            )
                        }
                        })}
                        <td>{this.state.orignalannualfee}</td>
                         </tr>
                           </tbody>
                          </table>
                          <h3 className="text-center">MONTHLY FEE</h3>
                         <table class="table orignalfeestructureTable">
                            <thead class="thead-light">
                              <tr>
                                <th scope="col">TUITION FEE</th>
                                <th scope="col">TOTAL MONTHLY FEE</th>
                              </tr>
                            </thead>
                            <tbody>
                            <tr>
                    {this.state.OrignalFeeStructure.map((item,index)=>{
                        if(item.fee_category=="MONTHLY"){
                        return( 
                                <td>{item.amount} </td>
                            )
                        }
                        })}
                        <td>{this.state.orignalmonthlyfee}</td>
                         </tr>
                           </tbody>
                          </table>
                          <h2 style={{float:"right"}}>GRAND TOTAL =  {this.state.orignalgrandtotal}</h2>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    </div>
                    </div>
                </div>
            </div>
            {/* end fee structure Modal */}
            <div className="row">
            <div className="col-12">
            <div className="row ReceiptLayoutCard">
                <div className="col-12" >
                    <div className="form-row">
                        <div className="col-3 form-group">
                            <div className="form-row">
                                <div className="col-4 form-group">
                                <label>Session *</label>
                                </div>  
                                <div className="col-8 form-group " id="focusguard-1">
                                <select className="" value={this.state.session} onChange={(e)=>{this.setState({session:e.target.value.toUpperCase(),sessionErrorMessage:undefined})}}>
                                <option value="">Select Session</option>
                              {this.state.AllSession.map((item,index)=>{
                                  return(
                                    <option value={item.session_code}>{item.session_code}</option>
                                    )
                              })}
                           </select>
                           <span className="errorMessage" style={{fontSize:'14px',fontWeight:600}}>{this.state.sessionErrorMessage}</span>
                                </div>  
                            </div>
                        </div>
                        <div className="col-3 form-group">
                            <div className="form-row">
                                <div className="col-4 form-group">
                                    <label id="recpddate" className="bg-primary text-white">Recp_Date </label>
                                </div>  
                                <div className="col-8 form-group " id="focusguard-1">
                                    <input type="date" className="w-100" id="firstInput" value={this.state.receipt_date} onChange={(e)=>{this.setState({receipt_date:e.target.value.toUpperCase(),receipt_dateErrorMessage:undefined});this.setBalance()}} onBlur={(e)=>{localStorage.setItem('R_date',e.target.value)}} tabindex="1"  />
                                    <span className="errorMessage" style={{fontSize:'14px',fontWeight:600}}>{this.state.receipt_dateErrorMessage}</span>
                                </div>  
                            </div>
                        </div>
                        <div className="col-3 form-group">
                            <div className="form-row">
                                <div className="col-4 form-group">
                                    <label>Recp_No </label>
                                </div>
                                <div className="col-8 form-group">
                                    <input type="text" value={this.state.receipt_no} onChange={(e)=>{this.setState({receipt_no:e.target.value.toUpperCase()})}} className="w-100" />
                                </div>
                            </div>    
                        </div>
                        {/* <div className="col-3 form-group">
                            <label>Ref Receipt No *</label>
                            <input type="text" onChange={(e)=>{this.setState({ref_receipt_no:e.target.value.toUpperCase()})}} className="" />
                        </div> */}
                     
                        <div className="col-3 form-group">
                            <div className="form-row">
                                    <div className="col-4 form-group">
                                        <label>Admn No </label> 
                                    </div>
                                    <div className="col-8 form-group">    
                                        <input type="text"   value={this.state.admission_no} onFocus={(e)=>{this.handleFocusInput(e)}} onChange={(e)=>{this.setState({admission_no:e.target.value.toUpperCase(),admission_noErrorMessage:undefined}); this.searchByAdmission_no_with_session(e)}} tabindex="2" className="w-50" />
                                        <button type="button" onClick={()=>{this.getStudent();}}  class="btn btn-success btn-sm" data-toggle="modal" data-target="#AllModalStudent">...</button>
                                        <span className="errorMessage" style={{fontSize:'14px',fontWeight:600}}>{this.state.admission_noErrorMessage}</span>
                                    </div>
                            </div>
                        </div>
                        <div className="col-4 form-group">
                            <div className="form-row">
                                    <div className="col-4 form-group">
                                        <label>Account No </label>
                                    </div>
                                    <div className="col-6 form-group">
                                        <input type="text" value={this.state.account_no} onChange={(e)=>{this.setState({account_no:e.target.value.toUpperCase(),account_noErrorMessage:undefined});this.viewParent();}} onClick={(e)=>{this.viewParent(e)}} className="w-100" />
                                        <span className="errorMessage" style={{fontSize:'14px',fontWeight:600}}>{this.state.account_noErrorMessage}</span>
                                    </div>
                            </div>
                        </div>
                        <div className="col-3 form-group">
                            <div className="form-row">
                                <div className="col-4 form-group">
                                    <label>Payment</label>
                                </div>
                                <div className="col-8 form-group">   
                                    <label>CASH       </label>
                                    <input type="radio" className=""   name="payment_mode" value="CASH" onChange={(e)=>{this.setState({payment_mode:e.target.value.toUpperCase()})}}/>
                                    <label>             BANK  </label>
                                    <input type="radio" className="" checked name="payment_mode" value="BANK" onChange={(e)=>{this.setState({payment_mode:e.target.value.toUpperCase()})}}/>
                                </div>    
                            </div>    
                        </div>  
                        <div className="col-4 form-group">
                            <div className="form-row">
                                <div className="col-4 form-group">
                                    <label>Select Bank</label>
                                </div>   
                                <div className="col-8 form-group"> 
                                    <select  onChange={(e)=>{this.setState({bank:e.target.value.toUpperCase(),bankErrorMessage:undefined});}} value={this.state.bank} onBlur={(e)=>{localStorage.setItem('R_bank',e.target.value)}} id="selectbank"  tabindex="3">
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
                        </div>  
                        <div className="col-1 form-group">
                        <button type="button" onClick={()=>{this.ShowModalStudent(this.state.admission_no);this.setState({admission_no:this.state.admission_no});this.searchByAdmission_no_with_session()}} class="btn btn-info btn-sm" data-toggle="modal" data-target="#OldFeeModal">Fee Details</button>   
                        </div>            
                        {/* <div className="col-4 form-group">
                            <label>Bank V No</label>
                            <input type="text" className="" defaultValue="0" value={this.state.bank_v_no} onChange={(e)=>{this.setState({bank_v_no:e.target.value.toUpperCase()})}}/>
                        </div>
                        <div className="col-4 form-group">
                            <label>Check No</label>
                            <input type="text" className="" defaultValue="0" value={this.state.check_no} onChange={(e)=>{this.setState({check_no:e.target.value.toUpperCase()})}}/>
                        </div> */}
                        <table class="table">
                        <thead class="thead-light">
                            <tr>
                            <th scope="col">Admn No.</th>
                            <th scope="col">Ac No.</th>
                            <th scope="col">Student Name</th>
                            <th scope="col">Class/Section</th>
                            <th scope="col">Parents Name</th>
                            <th scope="col">Mobile No.</th>
                            
                            <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        {this.state.AllStudent.map((item,index)=>{
                            
                            if(item.admission_no!=countAdmission_no){
                            countAdmission_no =item.admission_no
                            return(
                            <tr className={item.student.tc_status==1 ? "bg-danger":null}>
                            <td>{item.admission_no}</td>
                            <td>{item.account_no}</td>
                            <td>{item.student.name}</td>
                            <td>{item.class_name}-{item.section}</td>
                            <td>{item.student.father_name}/{item.student.mother_name}</td>
                            <td>{item.student.parent_mobile}</td>
                            <td><button type="button" className="btn btn-info btn-sm" onClick={(e) =>{ this.viewParent()}}>Get Details</button><button type="button" onClick={()=>{this.ShowModal(item.admission_no)}} class="btn btn-info btn-sm" data-toggle="modal" data-target="#myModal">Show</button></td>
                            </tr>
                            )
                            }
                        })}
                        </tbody>
                    </table>
                         <div className="col-3 ">
                            <label style={{backgroundColor:"#000a80",color:"white",padding:"5px"}}>Paid Upto : {Moment(this.state.last_fees_date).format("M")=='1' ? "Jan "+Moment(this.state.last_fees_date).format("YYYY") : Moment(this.state.last_fees_date).format("M")=='2' ? "Feb "+Moment(this.state.last_fees_date).format("YYYY") : Moment(this.state.last_fees_date).format("M")=='3' ? "Mar "+Moment(this.state.last_fees_date).format("YYYY")  : Moment(this.state.last_fees_date).format("M")=='4' ? "Apr "+Moment(this.state.last_fees_date).format("YYYY") : Moment(this.state.last_fees_date).format("M")=='5' ? "May "+Moment(this.state.last_fees_date).format("YYYY") : Moment(this.state.last_fees_date).format("M")=='6' ? "Jun "+Moment(this.state.last_fees_date).format("YYYY") : Moment(this.state.last_fees_date).format("M")=='7' ? "July "+Moment(this.state.last_fees_date).format("YYYY") : Moment(this.state.last_fees_date).format("M")=='8' ? "Aug "+Moment(this.state.last_fees_date).format("YYYY") : Moment(this.state.last_fees_date).format("M")=='9' ? "Sept "+Moment(this.state.last_fees_date).format("YYYY") : Moment(this.state.last_fees_date).format("M")=='10' ? "Oct "+Moment(this.state.last_fees_date).format("YYYY") : Moment(this.state.last_fees_date).format("M")=='11' ? "Nov "+Moment(this.state.last_fees_date).format("YYYY") : Moment(this.state.last_fees_date).format("M")=='12' ? "Dec "+Moment(this.state.last_fees_date).format("YYYY"):null}
                            </label>
                        </div>
                        <div className="col-2 ">
                            <label>Fee From : {this.state.fromtomonths[0]=='1' ? "Jan "+Moment(this.state.feemonths[0]).format("YYYY") : this.state.fromtomonths[0]=='2' ? "Feb "+Moment(this.state.feemonths[0]).format("YYYY") : this.state.fromtomonths[0]=='3' ? "Mar "+Moment(this.state.feemonths[0]).format("YYYY")  : this.state.fromtomonths[0]=='4' ? "Apr "+Moment(this.state.feemonths[0]).format("YYYY") : this.state.fromtomonths[0]=='5' ? "May "+Moment(this.state.feemonths[0]).format("YYYY") : this.state.fromtomonths[0]=='6' ? "Jun "+Moment(this.state.feemonths[0]).format("YYYY") : this.state.fromtomonths[0]=='7' ? "July "+Moment(this.state.feemonths[0]).format("YYYY") : this.state.fromtomonths[0]=='8' ? "Aug "+Moment(this.state.feemonths[0]).format("YYYY") : this.state.fromtomonths[0]=='9' ? "Sept "+Moment(this.state.feemonths[0]).format("YYYY") : this.state.fromtomonths[0]=='10' ? "Oct "+Moment(this.state.feemonths[0]).format("YYYY") : this.state.fromtomonths[0]=='11' ? "Nov "+Moment(this.state.feemonths[0]).format("YYYY") : this.state.fromtomonths[this.state.fromtomonths.length-1]=='12' ? "Dec "+Moment(this.state.feemonths[this.state.fromtomonths.length-1]).format("YYYY"):null}
                            </label>
                        </div>
                        <div className="col-2 ">
                            <label>Fee To : {this.state.fromtomonths[this.state.fromtomonths.length-1]=='1' ? "Jan "+Moment(this.state.feemonths[this.state.fromtomonths.length-1]).format("YYYY")  : this.state.fromtomonths[this.state.fromtomonths.length-1]=='2' ? "Feb "+Moment(this.state.feemonths[this.state.fromtomonths.length-1]).format("YYYY") : this.state.fromtomonths[this.state.fromtomonths.length-1]=='3' ? "Mar "+Moment(this.state.feemonths[this.state.fromtomonths.length-1]).format("YYYY")  : this.state.fromtomonths[this.state.fromtomonths.length-1]=='4' ? "Apr "+Moment(this.state.feemonths[this.state.fromtomonths.length-1]).format("YYYY") : this.state.fromtomonths[this.state.fromtomonths.length-1]=='5' ? "May "+Moment(this.state.feemonths[this.state.fromtomonths.length-1]).format("YYYY") : this.state.fromtomonths[this.state.fromtomonths.length-1]=='6' ? "Jun "+Moment(this.state.feemonths[this.state.fromtomonths.length-1]).format("YYYY") : this.state.fromtomonths[this.state.fromtomonths.length-1]=='7' ? "July "+Moment(this.state.feemonths[this.state.fromtomonths.length-1]).format("YYYY") : this.state.fromtomonths[this.state.fromtomonths.length-1]=='8' ? "Aug "+Moment(this.state.feemonths[this.state.fromtomonths.length-1]).format("YYYY") : this.state.fromtomonths[this.state.fromtomonths.length-1]=='9' ? "Sept "+Moment(this.state.feemonths[this.state.fromtomonths.length-1]).format("YYYY") : this.state.fromtomonths[this.state.fromtomonths.length-1]=='10' ? "Oct "+Moment(this.state.feemonths[this.state.fromtomonths.length-1]).format("YYYY") : this.state.fromtomonths[this.state.fromtomonths.length-1]=='11' ? "Nov "+Moment(this.state.feemonths[this.state.fromtomonths.length-1]).format("YYYY") : this.state.fromtomonths[this.state.fromtomonths.length-1]=='12' ? "Dec "+Moment(this.state.feemonths[this.state.fromtomonths.length-1]).format("YYYY"):null}</label>
                        </div>
                        <div className="col-2 ">
                            <label>Surplus : {this.state.surplus}</label>
                        </div>
                        <div className="col-2 ">
                            <label>Dues : {this.state.due}</label>
                        </div>
                        <div className="col-1 ">
                            <label>% : {this.state.fee_concession}</label>
                        </div>

                        {/* next row */}
                        <div className="col-2 ">
                         <th >Month : <input type="text" className="w-25" onFocus={(e)=>{this.handleFocusInput(e)}}  value={this.state.fromtomonths.length} onChange={(e)=>{this.ChangeFeeDate(e)}} /></th>
                        </div>
                        <div className="col-2 ">
                            <label>COMPUTER : {this.state.take_computer=='true' ?"YES" : "NO" }</label>
                        </div>
                        <div className="col-2 ">
                            <label>TRANSPORT : {this.state.avail_transport=='true' ?"YES" : "NO" }</label>
                        </div>
                        <div className="col-2 ">
                            <label> {this.state.tc_status=='0' ?<span className="bg-success">TAKEN TC</span> : <span className="bg-danger">TAKEN TC</span> }  : {this.state.tc_status=='0' ?"NO" : "YES" }</label>
                        </div>
                        <div className="col-2 ">
                            <label>STRUCK OF : {this.state.tc_status=='true' ?"YES" : "NO" }</label>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row ReceiptLayoutCard feesLayoutCard">
            <div className="col-12">
                <div className="form-row">
                {/* <div className="col-9">
                 <h3 className="receipt_h3">One Time Fee</h3>
                </div> */}
                <div className="col-2">
                 <button className="btn btn-info btn-xs" onClick={()=>{this.getOneTimeFee()}}>Take One Time Fee</button>
                </div>
                <div className="col-10">
                 <button className="btn btn-success btn-xs" data-toggle="modal" data-target="#feestructuremodal">See Orignal Fee Structure</button>
                </div>
                </div>
                {this.state.TakeOneTimeFee ==true? 
                    <div className="form-row">
                         <div className="col-12 text-center ">
                         <h3 className="receipt_h3 pb-3"><u>One Time Fee</u></h3>
                        </div>
                        {this.state.Allfees.map((item,index)=>{
                        if(item.fee_category=="ONE TIME"){
                        return(
                            <div className="col-4 form-group">
                            <label>{item.fee_sub_category}   </label>
                            <input type="text" className="" defaultValue="0"  value={item.amount} onChange={(e)=>{this.setState(this.SetFee(index,e))}}/>
                            </div>
                            )
                        }
                        })}
                    </div>
                     :
                     null
                }
            </div>
            <div className="col-12">
                <div className="form-row">
                <div className="col-12 text-center" >
                 <h3 className="receipt_h3 pb-4  "><u>Annual Fee</u></h3>
                </div>
                {this.state.is_full_free_ship !="true" ? 
                this.state.Allfees.map((item,index)=>{
                        if(item.fee_category=="ANNUAL"){
                            if(item.fee_sub_category.includes("COMPUTER") !=true){
                        return(
                <div className="col-4 form-group">
                    <label>{item.fee_sub_category}  </label>
                    <input type="text" className="" defaultValue="0"  value={item.amount}  onChange={(e)=>{this.setState(this.SetFee(index,e))}}/>
                </div>
                    )
                        }else{
                            if(this.state.take_computer=="true"){
                                return(
                                    <div className="col-4 form-group">
                                        <label>{item.fee_sub_category}  </label>
                                        <input type="text" className=""   value={item.amount} onChange={(e)=>{this.setState(this.SetFee(index,e))}}/>
                                    </div>
                                        )
                            }
                        }
                }
                })
                :

                this.state.Allfees.map((item,index)=>{
                    if(item.fee_category=="ANNUAL"){
                        if(item.fee_sub_category.includes("COMPUTER") !=true){
                    return(
            <div className="col-4 form-group">
                <label>{item.fee_sub_category}  </label>
                <input type="text" className="" value="0"   onChange={(e)=>{this.setState(this.SetFee(index,e))}}/>
            </div>
                )
                    }else{
                        if(this.state.take_computer=="true"){
                            return(
                                <div className="col-4 form-group">
                                    <label>{item.fee_sub_category}  </label>
                                    <input type="text" className=""   value='0' onChange={(e)=>{this.setState(this.SetFee(index,e))}}/>
                                </div>
                                    )
                        }
                    }
            }
            })
                }
                </div>
                   
                    {/* <table class="table">
                    <tbody>
                        {this.state.Allfees.map((item,index)=>{
                        if(item.fee_category=="ANNUAL"){
                        return(
                            <tr>
                            <th>{item.fee_sub_category}</th>
                            <td>
                            <input type="text" className=""  value={ this.state.months.includes(item.month) ==true ? this.state.Allfees[index].amount : 0} onChange={(e)=>{this.SetFee(index,e)}}/>
                            </td>
                            </tr>
                            )
                        }
                        })}
                        </tbody>
                        </table>                 */}
            </div>
            <div className="col-12">
                    <div className="form-row">
                        <div className="col-12 text-center">
                            <h3 className="receipt_h3 pb-4 " ><u>Monthly Fee</u></h3>
                        </div>
                        {this.state.Allfees.map((item,index)=>{
                            if(item.fee_category==="MONTHLY"){
                                // if(this.state.is_teacher_ward == "false"){
                            return(
                        <div className="col-3 form-group">
                        <label>{item.fee_sub_category} {item.fee_sub_category == "TUITION FEE" ? "("+this.state.StudentTutionFee +")" : null} </label>
                        <input type="text" className=""    value={ item.fee_sub_category == "TUITION FEE" ? parseInt(this.state.StudentTutionFee)*parseInt(this.state.feemonths.length) : item.amount }  onChange={(e)=>{this.setState(this.SetFee(index,e))}}/>
                        </div>
                            )
                                // }
                        }
                        })}
                         <div className="col-2 form-group">
                            <label>Fine  <input type="checkbox" onChange={(e)=>{this.ChangemanualFineState(e)}}/></label>
                         
                            <input type="text" className="defaultFine" value={this.state.fine}  onChange={(e)=>{this.setState({defaultFine:e.target.value.toUpperCase()}); this.setBalance()}} />
                            <input type="text" className="manualFine" style={{display:'none'}} value={this.state.manualFine}  onChange={(e)=>{this.setState({manualFine:e.target.value.toUpperCase()}); this.setBalance()}} />
                         
                        </div>
                        <div className="col-2 form-group">
                            <label>Total_Dues  </label>
                            <input type="text"  style={{backgroundColor:"blue",color:"white"}} value={parseInt(this.state.remaning_balance) < 0 ? parseInt(this.state.remaning_balance)*-1 :"0"} />
                        </div> 
                        <div className="col-2 form-group">
                            <label>Paid_Amount  </label>
                            <input type="text" id="lastInput" className="" value={this.state.paid_amount}  onChange={(e)=>{this.setState({paid_amount:e.target.value.toUpperCase()});this.setBalance();}} onKeyUp={()=>{this.setBalance()}} tabindex="4" />
                        </div>
                    </div>    
                    {/* <table class="table">
                        <tbody>
                            {this.state.Allfees.map((item,index)=>{
                            if(item.fee_category==="MONTHLY"){
                            return(
                                <tr>
                                <th>{item.fee_sub_category} ({item.fee_sub_category == "TUITION FEE" ? this.state.StudentTutionFee : null})</th>
                                <td>
                                <input type="text" className=""   value={parseInt(item.amount)*parseInt(this.state.feemonths.length)} onChange={(e)=>{this.setState(this.SetFee(index,e))}}/>
                                </td>
                                </tr>
                               
                                )
                            }
                            })}
                        </tbody>
                    </table>   */}
            </div>
                <div className="col-12">
                    <div className="form-row">
                        {/* <div className="col-4 form-group">
                            <label>Tution Fee</label>
                            <input type="text" className="" defaultValue="0" value={this.state.tution_fee}  onChange={(e)=>{this.setState({tution_fee:e.target.value.toUpperCase()})}}/>
                        </div>
                        <div className="col-4 form-group">
                            <label>Science Fee</label>
                            <input type="text" className="" defaultValue="0" value={this.state.science_fee} onChange={(e)=>{this.setState({science_fee:e.target.value.toUpperCase()})}}/>
                        </div>
                        <div className="col-4 form-group">
                            <label>Bus Fare</label>
                            <input type="text" className="" defaultValue="0" value={this.state.bus_fare} onChange={(e)=>{this.setState({bus_fare:e.target.value.toUpperCase()})}}/>
                        </div> */}
                        <div className="col-3 form-group">
                            <label>One Time Fee  </label>
                            <input type="text"  style={{backgroundColor:"orange"}} className="" Value={this.state.one_time_fees} />
                        </div>  
                      
                        <div className="col-3 form-group">
                            <label>Annual Fee  </label>
                            <input type="text"  style={{backgroundColor:"orange"}} className="" value={this.state.annual_fee} />
                        </div>  
                        <div className="col-3 form-group">
                            <label>Monthly Fee  </label>
                            <input type="text"  style={{backgroundColor:"orange"}} className="" value={this.state.total_monthly_fee} onChange={(e)=>{this.setState({total_monthly_fee:e.target.value.toUpperCase()})}}/>
                        </div>
                        <div className="col-3 form-group">
                            <label>Grand Total  </label>
                            <input type="text" style={{backgroundColor:"orange"}} className="" value={this.state.grand_total} />
                        </div>  
                        <div className="col-3 form-group">
                            <label>Dues  </label>
                            <input type="text"  style={{backgroundColor:"red"}} className="bg-danger" value={parseInt(this.state.remaning_balance) < 0 ? this.state.remaning_balance :"0"} />
                        </div> 
                        <div className="col-3 form-group">
                            <label>Surplus  </label>
                            <input type="text"  className="bg-success"  value={parseInt(this.state.remaning_balance) > 0 ? this.state.remaning_balance :"0"} />
                        </div> 
                        {/* <div className="col-4 form-group">
                            <label>Date</label>
                            <input type="date" className="" />
                        </div>  */}
                        <div className="col-6 form-group">
                       
                         <button className="btn btn-success  btn-md w-50" id="focusguard-2"  onClick={()=>{this.submitReceiptData()}} tabindex="5">Save</button>
                         <Link className="btn btn-info btn-md ml-2" to="/FeeVoucher">Day Book</Link>
                         
                        </div>
                    </div>
                </div>
             
            </div>
        </div>
    </div> 
</>
        )
    }
    
}
export default PreviousFeeReceipt;