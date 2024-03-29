import React from "react";
import { Link } from "react-router-dom";
import ModalImage from "react-modal-image";
import DataTable from "@bit/adeoy.utils.data-table";
import Moment, { months } from "moment";
import { Redirect } from "react-router-dom";
import $, { contains, timers } from "jquery";
var SubtractTuitionFee = 0;
var RemainTuitionFee = 0;
var previouspaidamount = 0;
var previousmonthlyamount = 0;
var previousannualamount = 0;
var previousgrandTotal = 0;
var previousfine = 0;
var previousPaidFine = 0;
var previousDuesFine = 0;
var previousTotalPaidAmount = 0;
var previousTotalDuesFee = 0;
var previousDuesFee = 0;
var submitonce = 0;
var nothing = "";
var defaultDate = localStorage.getItem("R_date");
var defaultDateStatus = false;
var countAdmission_no = "";
class FeeReceipt extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      redirect: null,
      _id: "",
      receipt_no: "",
      date_of_admission: "",
      modal_account_no: "",
      modal_admission_no: "",
      security_no: "",
      aadhar_no: "",
      class_name: "",
      section: "",
      subjects: "",
      session: localStorage.getItem("SessionAccess"),
      receipt_date: Moment().format("YYYY-MM-DD"),
      category: "",
      house: "",
      name: "",
      sex: "",
      dob: "",
      annual: false,
      nationality: "",
      father_name: "",
      mother_name: "",
      parent_address: "",
      gaurdian_name: "",
      gaurdian_address: "",
      fee_concession: "",
      bus_fare_concession: "",
      vehicle_no: "",
      storeLastReceiptDate:"",
      storeLastYearMonthlyFee:"",
      is_teacher_ward: false,
      paid_upto_month: "",
      pendingPreviousYearFees:"",
      pendingPreviousYearFine:"",
      paidPendingPreviousYearFees:0,
      paidPendingPreviousYearFine:0,
      manualTutionFeeState: false,
      previousReceiptDate: "",
      delayFineFee: "",
      paid_upto_year: "",
      last_school_performance: "",
      RTE_SW_Student: "",
      is_full_free_ship: false,
      avail_transport: false,
      take_computer: false,
      no_exempt_security_deposit: false,
      ncc: false,
      no_exempt_registration: false,
      getStudentData: false,
      no_exempt_admission: false,
      is_repeater: false,
      other_details: "",
      misc_details: "",
      AllDueFees: 0,
      fine: "",
      previousPaidFine: "",
      previousDuesFine: "",
      previousTotalPaidAmount: "",
      previousTotalDuesFee: "",
      previousDuesFee: "",
      last_fee_status: true,
      last_fee_date: null,
      last_fees_date: "",
      last_session: "",
      admission_no: "",
      account_no: "",
      _fee: "",
      report_card_and_diary: "0",
      annual_prize_day: "0",
      development_fund: "0",
      school_magazin: "0",
      annual_terms_fee: "0",
      examination_fee: "0",
      med_board_reg: "0",
      library_fee: "0",
      tution_fee: "0",
      computer_fee: "0",
      science_fee: "0",
      bus_fare: "0",
      total_monthly_fee: "0",
      paid_total_amount: "0",
      payment_mode: "CASH",
      grand_total: "",
      bank: "",
      bank_v_no: "",
      check_no: "",
      bank_date: "",
      showTotalAnnualFee: false,
      showTotalAdmissionFee: false,
      showTotalExaminationFee: false,
      showTotalRegistrationFee: false,
      allready_fee_paided_student: "",
      annual_fee: "0",
      one_time_fees: "0",
      fees: [],
      Allfees: [],
      AllDummyfees: [],
      Actualfees: [],
      OrignalFeeStructure: [],
      AllOldFees: [],
      paidFees: "",
      currentMonth: "",
      feemonths: "",
      fromtomonths: "",
      months: "",
      balance: "",
      paid_fees: "0",
      remaning_balance: "0",
      surplus: "0",
      due: "0",
      prospectus_fee: "0",
      registration_fee: "0",
      admission_fee: "0",
      security_fee: "0",
      TakeOneTimeFee: false,
      TakeAnnualFee: false,
      TakeHalfYearlyFee: false,
      description: "",
      AllCategory: [],
      AllSession: [],
      AllStudent: [],
      AllSubCategory: [],
      StudentTutionFee: "0",
      RemainStudentTutionFee: "0",
      SubtractStudentTutionFee: "0",
      ModalAllStudent: [],
      fne_date: "",
      defaultFine: "",
      AllBank: [],
      manualFine: "",
      manualFineState: false,
      Rpaidmonth: "",
      Rreceiptdate: "",
      last_receipt_submission_month: "",
      Rlastpaiddate: "",
      Rbank: "",
      Rreceiptno: "",
      Rid: "",
      Rbalance: "",
      studentSession: "",
      TotalPreviosSeissionBalance: "",
      tc_no: "",
      tc_status: "",
      security_deposit: "",
      cheque_no: "",
      left_on: "",
      serverpagi: 1,
      servercontentsize: 20,
      PaginationCount: [],
      totalNewPaybleMonth: 0,
    };
  }
  componentDidMount() {
    $(document).ready(() => {
      $("#admissionno").focus();
      $("#AnnualSection").hide();
      $("#FeeDetailAdmnNo").focus(() => {
        $("#FeeDetailAdmnNo").select();
        if (this.isTextSelected($("#FeeDetailAdmnNo")[0])) {
        } else {
          setInterval(async () => {
            $("#FeeDetailAdmnNo").select();
          }, 15000);
        }
      });
      // });

      $("#ShowAnnual").click(function () {
        $(this).hide();
        $("#AnnualSection").show();
      });
      $("#HideAnnual").click(function () {
        $("#ShowAnnual").show();
        $("#AnnualSection").hide();
      });
    });

    setInterval(async () => {
      // alert("done")
    }, 4000);

    this.getStudent();
    // this.getFeeReceipt();
    this.getFeeCategory();
    this.getSession();
    this.getBankData();
    const admission_no = localStorage.getItem("StudentDisplay");
    if (admission_no != "" && admission_no != 0) {
      this.setState({ admission_no: admission_no });
      this.searchByAdmission_no();
    }
    if (localStorage.getItem("R_date") != null) {
      this.setState({ receipt_date: localStorage.getItem("R_date") });
    }
    if (localStorage.getItem("R_bank") != null) {
      this.setState({ bank: localStorage.getItem("R_bank") });
    }
  }

  isTextSelected = (input) => {
    var startPos = input.selectionStart;
    var endPos = input.selectionEnd;
    var doc = document.selection;

    if (doc && doc.createRange().text.length != 0) {
      return true;
    } else if (!doc && input.value.substring(startPos, endPos).length != 0) {
      return true;
    }
    return false;
  };

  ChangemanualFineState(e) {
    if (e.target.checked) {
      this.setState({ manualFineState: true }, () => {
        this.getFineFee();
      });
    } else {
      this.setState({ manualFineState: false }, () => {
        this.getFineFee();
      });
    }
  }

  // ChangemanualTutionFeeState(e) {
  //   if(e.target.checked)
  //   {
  //     this.setState({
  //       manualTutionFeeState:true,
  //     },
  //     ()=>{
  //       this.getGrandTotal();
  //     })
  //   }
  //   else{
  //     this.setState({
  //       manualTutionFeeState:false,
  //     },
  //     ()=>{
  //       this.getGrandTotal();
  //     })
  //   }
  // }


  getBankData = () => {
    fetch("http://144.91.110.221:4800/getBankData", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        session: this.state.session,
        school_id: "UT015",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        this.setState({ AllBank: data });
      })
      .then((err) => console.log(err));
  };
  getFine = async() => {
    await fetch("http://144.91.110.221:4800/getFine")
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          category: data[0]?.category,
          fine_date: data[0]?.fine_date,
          defaultFine: data[0]?.amount,
        });
      }
      )
      .catch((err) => console.log(err));
  };
  getStudent = async () => {
    fetch("http://144.91.110.221:4800/getStudent", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        session: this.state.session,
        school_id: "UT015",
        page_no: this.state.serverpagi,
        page_content_size: this.state.servercontentsize,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        this.setState({ ModalAllStudent: data });
        this.getStudentCount();
        this.PaginationCall();
      })
      .catch((err) => console.log(err));
  };
  GetDefaulterMoneySingleStudent = async () => {
    var a = this.state.session.split("-")[0];
    a = a - 1;
    var b = this.state.session.split("-")[1];
    b = b - 1;
    var previousSession = a + "-" + b;
    await fetch("http://144.91.110.221:4800/GetDefaulterMoneySingleStudent", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        session: previousSession,
        admission_no: this.state.admission_no,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        this.setState({ balance: parseInt(data.TotalPreviousBalance) * -1 });

        if (parseInt(parseInt(data.TotalPreviousBalance) * -1) > 0) {
          this.setState({ surplus: parseInt(data.TotalPreviousBalance) * -1 });
        } else if (parseInt(data.TotalPreviousBalance) * -1 < 0) {
          this.setState({ due: parseInt(data.TotalPreviousBalance) * -1 });
        }
        // alert(this.state.due)
      })
      .then((err) => console.log(err));
  };
  submitCategoryData = () => {
    const data = new FormData();
    data.append("category", this.state.category);
    data.append("description", this.state.description);
    const url = "http://144.91.110.221:4800/StoreFeeCatogory";
    fetch(url, {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        alert("Category Created Successfully");
        this.getFeeCategory();
      })
      .then((err) => { });
  };
  getFeeCategory = () => {
    fetch("http://144.91.110.221:4800/getCategory")
      .then((res) => res.json())
      .then((data) => {
        this.setState({ AllCategory: data });
      })
      .then((err) => console.log(err));
  };
  getSession = () => {
    fetch("http://144.91.110.221:4800/getSession", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        school_id: "UT015",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        this.setState({ AllSession: data });
      })
      .then((err) => console.log(err));
  };
  viewParent = async () => {
    const account_no = this.state.account_no;
    if (account_no == "0") {
      return false;
    }
    fetch("http://144.91.110.221:4800/singleparentdataWithSession", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        account_no: account_no,
        session: this.state.session,
      }),
    })
      .then((data) => data.json())
      .then(async (data) => {
        this.setState({ AllStudent: data });
      });
  };
  searchByAdmission_no = async (e) => {
    localStorage.setItem("StudentDisplay", "");
    previouspaidamount = 0;
    previousannualamount = 0;
    previousmonthlyamount = 0;
    previousgrandTotal = 0;
    previousfine = 0;
    previousPaidFine = 0;
    previousDuesFine = 0;
    previousTotalPaidAmount = 0;
    previousTotalDuesFee = 0;
    previousDuesFee = 0;
    this.setState({
      TotalPreviosSeissionBalance: "",
      last_fee_status: true,
      paid_fees: "0",
      last_fee_date: "",
      fee_concession: "",
      tc_status: "",
      remaning_balance: "0",
      defaultFine: "",
      fine: "0",
      balance: "0",
      account_no: "",
      total_monthly_fee: "0",
      one_time_fees: "0",
      months: [],
      annual_fee: "0",
      AllOldFees: [],
      month: [],
      shortmonths: [],
      feemonths: [],
      name: "",
      grand_total: "",
      father_name: "",
      parent_mobile: "",
      parent_phone: "",
      mother_name: "",
      Allfees: [],
      AllDummyfees: [],
      Actualfees: [],
      due: "0",
      surplus: "0",
      last_fees_date: "",
      take_computer: "false",
      is_full_free_ship: "false",
      is_teacher_ward: "false",
      StudentTutionFee: "0",
      studentSession: "",
      _id: "",
      tc_no: "",
      tc_status: "",
      security_deposit: "",
      cheque_no: "",
      left_on: "",
    });
    const admission_no = e?.target?.value;
    if (admission_no == "0") {
      return false;
    }
    fetch("http://144.91.110.221:4800/singlestudentdata", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        session: this.state.session,
        admission_no: this.state.admission_no ? this.state.admission_no : admission_no,
        school_id: "UT015",
      }),
    })
      .then((data) => data.json())
      .then(async (data) => {
        if (data[0] != undefined) {
          // balance:data[0].balance,
          this.setState({
            AllStudent: data,
            annual: true,
            _id: data[0].student._id,
            account_no: data[0].account_no,
            name: data[0].student.name,
            class_name: data[0].class_name,
            section: data[0].section,
            avail_transport: data[0].student.avail_transport,
            is_full_free_ship: data[0].student.is_full_free_ship,
            is_teacher_ward: data[0].student.is_teacher_ward,
            take_computer: data[0].student.take_computer,
            ncc: data[0].student.ncc,
            no_exempt_registration: data[0].student.no_exempt_registration,
            tc_status: data[0].student.tc_status,
            fee_concession: data[0].student.fee_concession,
            no_exempt_admission: data[0].student.no_exempt_admission,
            no_exempt_security_deposit:
              data[0].student.no_exempt_security_deposit,
            is_repeater: data[0].student.is_repeater,
            paid_upto_month: data[0].student.paid_upto_month,
            allready_fee_paided_student: data[0]?.student.paid_upto_month == "RTE" || data[0]?.student.paid_upto_month == "S/W" ? data[0].student.paid_upto_month : "",
            last_fees_date: data[0].student.paid_upto_month ? data[0].student.paid_upto_month : "",
            // RTE_SW_Student:(data[0].student.paid_upto_month=="RTE" || data[0].student.paid_upto_month=="S/W") ? data[0].student.paid_upto_month : "",
            date_of_admission: data[0].student.date_of_admission,
            father_name: data[0].student.father_name,
            mother_name: data[0].student.mother_name,
            parent_mobile: data[0].student.parent_mobile,
            parent_phone: data[0].student.parent_phone,
            studentSession: data[0].session,
            getStudentData: true,
          });
          if (data[0].student.tc_status == 1) {
            this.getCertificateDetails();
            if (
              window.confirm(
                "This student is already taken TC !  You still want to collect his fees !"
              )
            ) {
              // tcstatusConfirmBox=false
              this.getFine();
              this.getFineFee()
              this.FeesClasswise(data[0].class_name, data[0].section);
            } else {
              // tcstatusConfirmBox=false
              return false;
            }
          } else {
            this.getFine();
            this.getFineFee()
            this.FeesClasswise(data[0].class_name, data[0].section);
          }
        }
        else {
          this.setState({ AllStudent: [], fees: [], report_card_and_diary: '0', annual_prize_day: '0', development_fund: '0', school_magazin: '0', annual_terms_fee: '0', examination_fee: '0', med_board_reg: '0', library_fee: '0', tution_fee: '0', computer_fee: '0', science_fee: '0', bus_fare: '0', getStudentData: false })
        }
      }).catch((error) => {
        if (error) {
          this.setState({
            getStudentData: false,
          })
        }
      })
  };

  getFineFee = () => {
    const { paid_upto_month, receipt_date, manualFineState } = this.state;
    if (manualFineState) {
      this.setState({
        delayFineFee: 0,
      });
    } else {
      const prevPaidDate = Moment(paid_upto_month, "YYYY-MM");
      const receiptDate = Moment(receipt_date, "YYYY-MM-DD");
      
      const diffInMonths = receiptDate.diff(prevPaidDate, 'months');
  
      let totalFine = 0;
      if (diffInMonths > 0) {
        const dayOfMonth = receiptDate.date();
        if (dayOfMonth > 15) {
          for (let i = 1; i <= diffInMonths; i++) {
            totalFine = (i * 30) + totalFine;
          }
        } else {
          const duesMonthForPay = (diffInMonths) - 1
          for (let i = 1; i <= duesMonthForPay; i++) {
            totalFine = (i * 30) + totalFine;
        }
      }
      }
  
      this.setState({
        delayFineFee: totalFine,
      });
    }
  };
  

  getGrandTotal = () => {

    if (this.state.AllOldFees.length > 0) {
      if (this.state.session!==this.state.last_session) {
        const startDate = Moment(this.state.paid_upto_month, 'YYYY-MM-DD');
        const endDate = Moment(this.state.receipt_date, 'YYYY-MM-DD');
        const monthsDifference = Math.ceil(endDate.diff(startDate, 'months', true));
        return this.state.StudentTutionFee * monthsDifference +
          (this.state.showTotalAdmissionFee ? +Number(this.state.admission_fee) : 0) +
          (this.state.showTotalAnnualFee ? Number(this.state.annual_terms_fee) : 0) +
          (this.state.showTotalExaminationFee ? Number(this.state.examination_fee) : 0) +
          (this.state.showTotalRegistrationFee ? Number(this.state.registration_fee) : 0) +
          (Number(this.state.manualFine) > 0 ? Number(this.state.manualFine) : 0)
      } else {
        const lastDate = this.state.AllOldFees.length > 0 ? this.state.AllOldFees[this.state.AllOldFees.length - 1].last_fee_date : "";
        const currentDate = Moment(this.state.receipt_date).format("MM-YYYY");
        const lastDateMonth = Moment(lastDate).format("MM-YYYY");
        const monthsDifference = Moment(currentDate, "MM-YYYY").diff(Moment(lastDateMonth, "MM-YYYY"), 'months');    
        if (monthsDifference > 0) {
          const tutionFee = this.state.StudentTutionFee;
          return (
            // tutionFee * Number(monthsDifference) +
            (this.state.AllDueFees ? Number(this.state.AllDueFees) : 0) +
            (this.state.showTotalAdmissionFee ? +Number(this.state.admission_fee) : 0) +
            (this.state.showTotalAnnualFee ? Number(this.state.annual_terms_fee) : 0) +
            (this.state.showTotalExaminationFee ? Number(this.state.examination_fee) : 0) +
            (this.state.showTotalRegistrationFee ? Number(this.state.registration_fee) : 0) +
            (Number(this.state.manualFine) > 0 ? Number(this.state.manualFine) : 0)
          );
        } else {
          const currentDate = new Date();
          const paidFeeLastMonths = Moment(this.state.paid_upto_month).format("M");
          const newFormMonths = Moment(currentDate).format("M");
  
          if (Moment(this.state.paid_upto_month).format("YYYY") > Moment(currentDate).format("M")) {
            return this.state.paid_total_amount;
          } else {
            return (
              ((this.state.Allfees && this.state.Allfees.length > 0) ?
                (this.state.Allfees.find((item) => item.fee_category === "MONTHLY" && item.fee_sub_category === 'TUITION FEE') ?
                  parseInt(
                    this.state.admission_no && this.state.AllDueFees > 0 ? 0 : this.state.admission_no ?
                      this.state.StudentTutionFee : 0
                  ) * parseInt(Number(newFormMonths) - Number(paidFeeLastMonths)) :
                  (this.state.admission_no ? this.state.StudentTutionFee : 0)
                ) : 0) +
              (this.state.AllDueFees ? Number(this.state.AllDueFees) : 0) +
              (this.state.showTotalAdmissionFee ? +Number(this.state.admission_fee) : 0) +
              (this.state.showTotalAnnualFee ? Number(this.state.annual_terms_fee) : 0) +
              (this.state.showTotalExaminationFee ? Number(this.state.examination_fee) : 0) +
              (this.state.showTotalRegistrationFee ? Number(this.state.registration_fee) : 0) +
              (Number(this.state.manualFine) > 0 ? Number(this.state.manualFine) : 0) -
              (Number(this.state.pendingPreviousYearFees) > 0 ? Number(this.state.pendingPreviousYearFees) : 0) -
              (Number(this.state.pendingPreviousYearFine) > 0 ? Number(this.state.pendingPreviousYearFine) : 0)
            );
          }
        }
      }
    } else {
      const getAbsoluteMonths = (momentDate) => {
        var months = Number(momentDate.format("MM"));
        var years = Number(momentDate.format("YYYY"));
        return months + (years * 12);
      };
    
      var startMonths = getAbsoluteMonths(Moment(this.state.paid_upto_month, 'YYYY-MM-DD'));
      var endMonths = getAbsoluteMonths(Moment(this.state.receipt_date, 'YYYY-MM-DD'));
      var monthDifference = endMonths - startMonths;
    
      // Now you can use 'monthDifference' in your calculations
      return (
        this.state.StudentTutionFee * monthDifference +
        (this.state.showTotalAdmissionFee ? +Number(this.state.admission_fee) : 0) +
        (this.state.showTotalAnnualFee ? Number(this.state.annual_terms_fee) : 0) +
        (this.state.showTotalExaminationFee ? Number(this.state.examination_fee) : 0) +
        (this.state.showTotalRegistrationFee ? Number(this.state.registration_fee) : 0) +
        (Number(this.state.manualFine) > 0 ? Number(this.state.manualFine) : 0)
      );
    }
    
  };
  
  
  getCertificateDetails = async () => {
    fetch("http://144.91.110.221:4800/getTransferCertificate", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        admission_no: this.state.admission_no,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          left_on: data.left_on,
          date_of_tc: data.date_of_tc,
          cheque_no: data.cheque_no,
          security_deposit: data.security_deposit,
          tc_no: data.tc_no,
        });
        // alert(data.security_deposit)
      })
      .then((err) => console.log(err));
  };
  getFeeReceipt = (class_names, sections) => {
    var fetchPromise = "";
    // const currentMonth =  Moment().format('MM')
    fetchPromise = fetch("http://144.91.110.221:4800/getFeeReceipt", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        session: this.state.session,
      }),
    })
      .then((data) => data.json())
      .then(async (data) => {
        this.set_receipt_no(data);
      });
    // alert(val)
    if (fetchPromise != "") {
      return true;
    }
  };
  set_receipt_no = (data) => {
    if (data && data.receipt_no !== undefined) {
      let formattedReceiptNo;

      // Check if the received receipt_no starts with "PRE" or "SEC"
      if (data.receipt_no.startsWith("PRE")) {
        formattedReceiptNo = data.receipt_no;
      } else if (data.receipt_no.startsWith("SEC")) {
        formattedReceiptNo = data.receipt_no;
      } else {
        // Default to "PRE" format if it doesn't start with "PRE" or "SEC"
        formattedReceiptNo = "PRE" + data.receipt_no.padStart(3, '0');
      }

      this.setState({ receipt_no: formattedReceiptNo });
    } else {
      this.setState({ receipt_no: "PRE001" });
    }
  };


  SearchOldfee = async () => {
    this.setState({ AllOldFees: [] });
    const admission_no = this.state.admission_no.toUpperCase();
    await fetch("http://144.91.110.221:4800/SearchOldfee", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        admission_no: admission_no,
      }),
    })
      .then((data) => data.json())
      .then(async (data) => {
        if (data[0] != undefined) {
          var A = Moment(data[data.length - 1].last_fee_date);
          var aa = this.state.session.split("-")[0];
          var B = Moment(aa + "-04-01");
          this.state.last_receipt_submission_month = Moment(data[data.length - 1].receipt_date).format("MM");
          this.setState({
            storeLastReceiptDate:(data[data.length-1].last_fee_date),
            storeLastYearMonthlyFee:data[data.length-1].total_monthly_fee,
          })
          var last_date;
          // alert(Moment(data[data.length-1].last_fee_date).format("YYYY-MM-DD"))
          data.map((item) => {
            previousmonthlyamount = parseInt(previousmonthlyamount) + parseInt(item.total_monthly_fee);
            previousannualamount = parseInt(previousannualamount) + (parseInt(item.total_annual_fee) > 0 ? parseInt(item.total_annual_fee) : 0);
            previousfine = parseInt(previousfine) + (parseInt(item.fine) > 0 ? parseInt(item.fine) : 0);
            previousPaidFine = parseInt(previousPaidFine) + (parseInt(item.paid_fine) > 0 ? parseInt(item.paid_fine) : 0);
            previousDuesFine = parseInt(previousDuesFine) + (parseInt(item.dues_fine) > 0 ? parseInt(item.dues_fine) : 0);
            previousTotalPaidAmount = parseInt(previousTotalPaidAmount) + (parseInt(item.paid_amount) > 0 ? (parseInt(item.paid_amount)) : 0);
            previousTotalDuesFee = parseInt(previousTotalDuesFee) + ((parseInt(item.dues_fee) + parseInt(item.dues_fine)) > 0 ? (parseInt(item.dues_fee) + parseInt(item.dues_fine)) : 0);
            previousDuesFee = parseInt(previousDuesFee) + (parseInt(item.dues_fee) > 0 ? parseInt(item.dues_fee) : 0);
            previouspaidamount = parseInt(previouspaidamount) + (parseInt(item.paid_fees) > 0 ? parseInt(item.paid_fees) : 0);
          })
          if (parseInt(A.diff(B, "days")) < 0) {
            last_date = aa + "-03-31";
            await this.GetDefaulterMoneySingleStudent();
            await this.setState({
              AllOldFees: data,
              last_session: data[data.length - 1].session,
              last_fee_date: data.last_fee_date,
              previousPaidFine: data[data.length - 1].paid_fine,
              AllDueFees: data[data.length - 1].grand_total - data[data.length - 1].paid_fees,
              receipt_no: data[data.length - 1].receipt_no,
              pendingPreviousYearFees : data[data.length - 1].previous_year_dues_fee,
              pendingPreviousYearFine : data[data.length - 1].previous_year_dues_fine,
            });

          } else {
            last_date = data[data.length - 1].last_fee_date;
            this.setState({
              AllOldFees: data,
              last_session: data[data.length - 1].session,
              last_fee_date: data.last_fee_date,
              balance: data[data.length - 1].balance,
              AllDueFees: data[data.length - 1].dues_fee,
              receipt_no: data[data.length - 1].receipt_no,
              pendingPreviousYearFees : data[data.length - 1].previous_year_dues_fee,
              pendingPreviousYearFine : data[data.length - 1].previous_year_dues_fine,
            });

            if (parseInt(data[data.length - 1].balance) > 0) {
              this.setState({ surplus: data[data.length - 1].balance });
            } else if (parseInt(data[data.length - 1].balance) < 0) {
              this.setState({ due: data[data.length - 1].balance });
            }
          }
        } else {
          if (this.state.AllStudent[0] != undefined) {
            this.setState({
              last_fee_date: this.state.last_fee_date,
              last_session: this.state.studentSession,
              date_of_admission: this.state.date_of_admission,
              last_fee_status: false,
              AllDueFees: 0,
              receipt_no: ""
            },
              () => {
                const currentDate = new Date();
                const currentYear = Moment(currentDate).format("YYYY");
                const march31 = `${currentYear}-03-31`;
                const currentNewDate = new Date();
                const currentYearMonthDate = Moment(currentNewDate).format("YYYY-MM-DD");
                if (Moment(march31).isSameOrBefore(currentYearMonthDate)) {
                  this.previousYearDues();
                }
                this.getFineFee();
              });
            //  await this.setBalance()
          }
        }
      })
      .then(() => {
        const currentDate = new Date();
        const currentYear = Moment(currentDate).format("YYYY");
        const march31 = `${currentYear}-03-31`;
        const currentNewDate = new Date();
        const currentYearMonthDate = Moment(currentNewDate).format("YYYY-MM-DD");
      
        if (Moment(march31).isSameOrBefore(currentYearMonthDate)) {
          this.previousYearDues();
        }
        this.setBalance();
      });
    // await this.setBalance()
  };
  getOneTimeFee = async (e) => {
    if (this.state.TakeOneTimeFee == false) {
      this.setState({ TakeOneTimeFee: true });
      this.searchByAdmission_no();
    } else {
      this.setState({ TakeOneTimeFee: false });
      this.searchByAdmission_no();
    }
    this.FeesClasswise(this.state.class_name, this.state.section);
  };
  getAnnualFee = async () => {
    if (this.state.TakeAnnualFee == false) {
      this.setState({ TakeAnnualFee: true });
    } else {
      this.setState({ TakeAnnualFee: false });
    }
  };
  getHalfYearlyFee = () => {
    if (this.state.TakeHalfYearlyFee == false) {
      this.setState({ TakeHalfYearlyFee: true });
    } else {
      this.setState({ TakeHalfYearlyFee: false });
    }
  };
  FeesClasswise = async(class_names, sections) => {
    const currentMonth = Moment().format("MM");
    await fetch("http://144.91.110.221:4800/FeesClasswise", {
      // fetch("http://144.91.110.221:4800/FeesClasswise", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        class_name: class_names,
        section: sections,
        session: this.state.session,
      }),
    })
      .then((data) => data.json())
      .then(async (data) => {
        if (data[0] != undefined) {
          this.setState({
            Allfees: JSON.parse(data[0].fees),
            AllDummyfees: JSON.parse(data[0].fees),
            Actualfees: JSON.parse(data[0].fees),
            OrignalFeeStructure: JSON.parse(data[0].fees),
            orignaltotalonetime: data[0].total_one_time_fee,
            orignalannualfee: data[0].total_annual_fee,
            orignalmonthlyfee: data[0].total_monthly_fee,
            StudentTutionFee: data[0].total_monthly_fee,
            orignalgrandtotal: data[0].grand_total,
            admission_fee: data[0].admission_fee,
            annual_terms_fee: data[0].annual_terms_fee,
            examination_fee: data[0].examination_fee,
            registration_fee: data[0].registration_fee,
          });
          await this.SearchOldfee();
        }
      }).catch((error) => {
      })
  };
  setBalance = async () => {
    if (
      this.state.is_full_free_ship == "false" ||
      this.state.is_full_free_ship == "" ||
      this.state.is_full_free_ship == undefined
    ) {
      if (this.state.last_fees_date == "") {
        this.searchByAdmission_no();
      }
      // alert(this.state.paid_fees)
      var calculateOneTimeFee = 0;
      var grand_total = 0;
      var monthlytotal = 0;
      var annual_fees_sub = 0;
      this.state.Allfees.map((item, index) => {
        if (item.fee_category == "MONTHLY") {
          // if(this.state.is_teacher_ward=="false"){
          if (item.fee_sub_category == "TUITION FEE") {
            if (
              parseInt(this.state.fee_concession) >= 0 &&
              this.state.fee_concession != ""
            ) {
              this.setState({
                StudentTutionFee:
                  parseInt(item.amount) -
                  (this.state.fee_concession.includes("%") ? parseInt(item.amount) * parseInt(this.state.fee_concession) / 100 :
                    parseInt(this.state.fee_concession))
              });
              monthlytotal =
                parseInt(item.amount) -
                (this.state.fee_concession.includes("%") ? parseInt(item.amount) * parseInt(this.state.fee_concession) / 100 :
                  parseInt(this.state.fee_concession))
            } else {
              this.setState({ StudentTutionFee: item.amount });
              monthlytotal = item.amount;
            }
          } else {
            monthlytotal = item.amount;
          }
          monthlytotal =
            parseInt(monthlytotal) + parseInt(this.state.StudentTutionFee);
          // }
        }
      });
      if (this.state.TakeOneTimeFee == true) {
        this.state.Allfees.map((item, index) => {
          if (item.fee_category == "ONE TIME") {
            if (item.fee_sub_category == "REGISTRATION FEE") {
              this.setState({ registration_fee: item.amount });
            }
            if (item.fee_sub_category == "PROSPECTUS FEE") {
              this.setState({ prospectus_fee: item.amount });
            }
            if (item.fee_sub_category == "ADMISSION FEE") {
              this.setState({ admission_fee: item.amount });
            }
            if (item.fee_sub_category == "SECURITY FEE") {
              this.setState({ security_fee: item.amount });
            }
            calculateOneTimeFee = calculateOneTimeFee + parseInt(item.amount);
          }
        });
      }
      this.state.Allfees.map((item, index) => {
        if (item.fee_category == "ANNUAL") {
          if (item.fee_sub_category.includes("COMPUTER") != true) {
            annual_fees_sub = annual_fees_sub + parseInt(item.amount);
          } else {
            if (this.state.take_computer == "true") {
              annual_fees_sub = annual_fees_sub + parseInt(item.amount);
            }
          }
        }
      });
      var paidFees = [];
      var paidAmount = parseInt(this.state.paid_fees);
      paidAmount =
        paidAmount + parseInt(this.state.surplus) + parseInt(this.state.due);
      var setpaidAmount =
        paidAmount + parseInt(this.state.surplus) + parseInt(this.state.due);
      var student_tuition_fee = parseInt(this.state.StudentTutionFee);
      var months = [];
      var finemonths = 0;
      var fromtomonths = [];
      var lastmonth = [];
      var shortmonths = [];
      var remainbalance = parseInt(this.state.balance);
      var getOneTimeFeesinpaidAmount = true;
      var getOneTimeFees = true;

      var getgrandtotal = true;
      var plus_one_time_fees = 0;
      var show_annual_fees = 0;
      var total_monthly_fee = 0;
      if (this.state.paid_fees == "0") {
       
        var dateStart = Moment(this.state.last_fees_date).add(1, "month");
        var dateEnd = Moment(this.state.receipt_date);
        if (
          dateEnd.isAfter(dateStart, "days") ||
          dateStart.format("M") === dateEnd.format("M")
        ) {
          // this or condition remove from while || dateStart.format('M') === dateEnd.format('M')
          while (
            dateEnd.isAfter(dateStart, "days") ||
            dateStart.format("M") === dateEnd.format("M")
          ) {
            if (

              Moment(this.state.last_fees_date).format("M") == "3" &&
              this.state.session == this.state.last_session &&
              this.state.last_fee_status == true
            ) {
              break;
            }
            if (shortmonths.includes("3") == true) {
              break;
            }
            months.push(dateStart.format("YYYY-MM-DD"));
            fromtomonths.push(dateStart.format("M"));
            shortmonths.push(dateStart.format("M"));
            dateStart.add(1, "month");
          }
        } else {
          // alert("doe")
          this.setOneTimeFeeForExtraAmontInMarchMonth();
        }
      } else {
        var EndDate = Moment(this.state.last_fees_date);
        if (
          
          Moment(this.state.last_fees_date).format("M") == "3" &&
          this.state.session == this.state.last_session &&
          this.state.last_fee_status == true
        ) {
          // alert("done")
          this.setOneTimeFeeForExtraAmontInMarchMonth();
          fromtomonths.push("3");
          this.state.Allfees.map((item, index) => {
            if (item.fee_category == "ANNUAL") {
              if (this.state.is_teacher_ward == "false") {
                if (item.fee_sub_category == "MISC") {
                  this.state.Allfees[index].amount = this.state.paid_fees;
                }
              }
            }
          });
          paidFees.push({
            tuition_fee: 0,
            fee_month: 3,
            annual_fees:
              parseInt(this.state.paid_fees) + parseInt(this.state.balance),
            one_time: 0,
          });
          this.setState(
            {
              
              fromtomonths: fromtomonths,
              fine: 0,
              remaning_balance:
                parseInt(this.state.paid_fees) + parseInt(this.state.balance),
              annual_fee: parseInt(this.state.paid_fees),
              one_time_fees: 0,
              total_monthly_fee: 0,
              grand_total:
                parseInt(this.state.paid_fees) + parseInt(this.state.balance),
              last_fee_date: this.state.last_fees_date,
            }
          );

        } else {
          // this code for set All fees not paid to set 0
          {
            this.state.Allfees.map((item, index) => {
              if (item.fee_category == "ONE TIME") {
                if (this.state.TakeOneTimeFee != true) {
                  this.state.Allfees[index].amount = 0;
                } else {
                  this.FeesClasswise(this.state.class_name,this.state.section)
                }
              }
              if (item.fee_category == "ANNUAL") {
                if (item.fee_sub_category.includes("COMPUTER") != true) {
                  if (
                    this.state.months.includes(item.month) != true &&
                    item.month != ""
                  ) {
                    this.state.Allfees[index].amount = 0;
                  } else {
                    this.state.Allfees[index].amount =
                      this.state.AllDummyfees[index].amount;
                    this.setState({ Allfees: this.state.Allfees });
                  }
                } else {
                  if (this.state.take_computer == "true") {
                    if (
                      this.state.months.includes(item.month) != true &&
                      item.month != ""
                    ) {
                      this.state.Allfees[index].amount = 0;
                    } else {
                      this.state.Allfees[index].amount =
                        this.state.AllDummyfees[index].amount;
                      this.setState({ Allfees: this.state.Allfees });
                    }
                  }
                }
              }
            });
          }
          //End this code for set All fees not paid to set 0
          if (paidAmount <= 0) {
            var monthlyfee = 0;
            var LastPaidDate = Moment(this.state.last_fees_date);
            if (Moment(this.state.last_fees_date).format("MM") == 3) {
              LastPaidDate.add(1, "month");
              monthlyfee = monthlytotal;
            }
            remainbalance = paidAmount - parseInt(monthlyfee);
            months.push(LastPaidDate.format("YYYY-MM-DD"));
            fromtomonths.push(LastPaidDate.format("M"));
            lastmonth.push(LastPaidDate.format("YYYY-MM-DD"));
            shortmonths.push(LastPaidDate.format("M"));
            var last_fee_date = lastmonth[months.length - 1];
            {
              this.setState({
                remaning_balance: remainbalance,
                months: shortmonths,
                feemonths: months,
                fromtomonths: fromtomonths,
                last_fee_date: last_fee_date,
                total_monthly_fee: monthlyfee,
                grand_total: this.state.paid_fees,
              });
            }
            return false;
          }

          while (paidAmount > 0) {
           
            if (
              Moment(this.state.last_fees_date).format("M") == "3" &&
              this.state.session == this.state.last_session &&
              this.state.last_fee_status == true
            ) {
              break;
            }
            if (shortmonths.includes("3") == true) {
              break;
            }
            EndDate.add(1, "month");
            months.push(EndDate.format("YYYY-MM-DD"));
            fromtomonths.push(EndDate.format("M"));
            lastmonth.push(EndDate.format("YYYY-MM-DD"));
            shortmonths.push(EndDate.format("M"));
            if (this.state.is_teacher_ward == "true") {
              if (this.state.take_computer == "false") {
                this.state.Allfees.map((item, index) => {
                  if (fromtomonths[fromtomonths.length - 1] == item.month) {
                    // alert(fromtomonths+" month"+item.month+" amount"+item.amount)
                    if (!item.fee_sub_category.includes("COMPUTER")) {
                      paidAmount = paidAmount - parseInt(item.amount);
                    }
                  }
                });
                paidAmount = paidAmount - student_tuition_fee;
                // alert(paidAmount)
              } else {
                this.state.Allfees.map((item, index) => {
                  if (fromtomonths[fromtomonths.length - 1] == item.month) {
                    // alert(fromtomonths+" month"+item.month+" amount"+item.amount)
                    paidAmount = paidAmount - parseInt(item.amount);
                  }
                });
                paidAmount = paidAmount - student_tuition_fee;
              }
            } else {
              if (getOneTimeFeesinpaidAmount == true) {
                getOneTimeFeesinpaidAmount = false;

                if (this.state.take_computer == "false") {
                  this.state.Allfees.map((item, index) => {
                    if (fromtomonths[fromtomonths.length - 1] == item.month) {
                      // alert(fromtomonths+" month"+item.month+" amount"+item.amount)
                      if (!item.fee_sub_category.includes("COMPUTER")) {
                        paidAmount = paidAmount - parseInt(item.amount);
                      }
                    }
                  });
                  paidAmount =
                    paidAmount - student_tuition_fee - calculateOneTimeFee;
                } else {
                  this.state.Allfees.map((item, index) => {
                    if (fromtomonths[fromtomonths.length - 1] == item.month) {
                      // alert(fromtomonths+" month"+item.month+" amount"+item.amount)
                      paidAmount = paidAmount - parseInt(item.amount);
                    }
                  });
                  paidAmount =
                    paidAmount - student_tuition_fee - calculateOneTimeFee;
                }
              } else if (getOneTimeFeesinpaidAmount == false) {
                if (this.state.is_teacher_ward == "false") {
                  if (this.state.take_computer == "false") {
                    this.state.Allfees.map((item, index) => {
                      if (fromtomonths[fromtomonths.length - 1] == item.month) {
                        // alert(fromtomonths+" month"+item.month+" amount"+item.amount)
                        if (!item.fee_sub_category.includes("COMPUTER")) {
                          paidAmount = paidAmount - parseInt(item.amount);
                        }
                      }
                    });
                    paidAmount = paidAmount - student_tuition_fee;
                    // alert(paidAmount)
                  } else {
                    this.state.Allfees.map((item, index) => {
                      if (fromtomonths[fromtomonths.length - 1] == item.month) {
                        // alert(fromtomonths+" month"+item.month+" amount"+item.amount)
                        paidAmount = paidAmount - parseInt(item.amount);
                      }
                    });
                    paidAmount = paidAmount - student_tuition_fee;
                  }
                }

                else {
                  paidAmount = paidAmount - student_tuition_fee - 1100;
                }
              } else {
                remainbalance = paidAmount;
              }
            }
                  }
          
        }
      }
      // if(Moment(this.state.last_fees_date).format('M')!="3"){
      var last_fee_date = lastmonth[months.length - 1];
      {
        this.setState({
          months: shortmonths,
          feemonths: months,
          fromtomonths: fromtomonths,
          last_fee_date: last_fee_date,
        },
          () => {
            this.getFineFee();
          });
      }

      this.state.Allfees.map((item, index) => {
        if (item.fee_category == "MONTHLY") {
          // if(this.state.is_teacher_ward=="false"){
          if (item.fee_sub_category == "TUITION FEE") {
            if (
              parseInt(this.state.fee_concession) > 0 &&
              this.state.fee_concession != ""
            ) {
              this.setState({
                total_monthly_fee: this.state.StudentTutionFee
              })

            } else {
              this.setState({
                total_monthly_fee: this.state.StudentTutionFee
              })
            }
            if (parseInt(this.state.fee_concession) == 100) {
              total_monthly_fee = 0;
              this.setState({
                total_monthly_fee: 0
              })
            }
          } else {
            this.setState({
              total_monthly_fee: this.state.StudentTutionFee
            })
          }
          // }
        }
      });
    }
    if (
      parseInt(total_monthly_fee) +
      show_annual_fees +
      plus_one_time_fees +
      parseInt(this.state.fine) -
      parseInt(this.state.due) -
      parseInt(this.state.surplus) ==
      parseInt(this.state.remaning_balance) * -1 &&
      parseInt(total_monthly_fee) +
      show_annual_fees +
      plus_one_time_fees +
      parseInt(this.state.fine) !=
      "0"
    ) {
      this.setState({
        paid_fees: parseInt(this.state.remaning_balance) * -1,
      });
      if (this.state.remaning_balance != 0) {
        this.setBalance();
      }
      if (defaultDateStatus == true) {
        this.setState({ receipt_date: defaultDate });
        defaultDateStatus = false;
      }
    }

    if (this.state.defaultFine == "") {
      this.searchByAdmission_no();
    }
  };

  SetAddOrSubFee = (index, a) => {
    this.state.Allfees[index].amount = a;
    this.setState({ fees: this.state.Allfees });
  };

  ChangeFeeDate = async (e) => {
    if (defaultDateStatus == false) {
      defaultDate = localStorage.getItem("R_date");
      defaultDateStatus = true;
    }

    var fee_date = Moment(this.state.last_fees_date).add(
      e.target.value,
      "month"
    );
    this.setState({ receipt_date: fee_date.format("YYYY-MM-DD") });
    await this.searchByAdmission_no();

    // alert(fee_date.format("YYYY-MM-DD"))
  };

  searchByAdmission = (admsn_no) => {
    {
      this.setState({ admission_no: admsn_no });
    }
    this.searchByAdmission_no();
  };

  componentDidUpdate(prevProps, prevState) {
    // Check if the state or props that you depend on have changed
    if (
      prevProps.shortmonths !== this.props.shortmonths ||
      prevState.Allfees !== this.state.Allfees
    ) {
      const AnnualFees = this.state.Allfees.filter((ele) => {
        return ele.fee_category === "ANNUAL";
      });

      let annualFee = 0;
      AnnualFees.forEach((item) => {
        annualFee = Number(annualFee) + Number(item.amount);
      });

      // Total One Time fee for every class
      const OneTimeFee = this.state.Allfees.filter((ele) => {
        return ele.fee_category === "ONE TIME";
      });

      let oneTimeFee = 0;
      OneTimeFee.forEach((item) => {
        oneTimeFee = Number(oneTimeFee) + Number(item.amount);
      });

      this.setState({
        one_time_fees: oneTimeFee,
        annual_fee: annualFee,
        // grand_total:oneTimeFee+annualFee+this.state.StudentTutionFee*this.state.fromtomonths.length
      },
      );
    }
  }
  closeAnnualFeeModal = () => {
    this.setState({
      showTotalAnnualFee: false
    })
  }

  ShowModal = async (data) => {
    localStorage.setItem("StudentDisplay", data);
    this.setState({ redirect: true });
  };

  checkValidation = () => {
    if (this.state.receipt_date === undefined) {
      this.setState({
        receipt_dateErrorMessage: "Please Choose Pay Up to field",
      });
      return false;
    } else if (this.state.session === undefined) {
      this.setState({ sessionErrorMessage: "Please Select Session" });
      return false;
    } else if (this.state.admission_no === "") {
      this.setState({
        admission_noErrorMessage: "Please Enter Adnission Number",
      });
      return false;
    } else if (this.state.account_no === "") {
      this.setState({ account_noErrorMessage: "Please Enter Account Number" });
      return false;
    } else if (this.state.payment_mode == "BANK" && this.state.bank === "") {
      this.setState({ bankErrorMessage: "Please Select Bank" });
      return false;
    } else {
      return true;
    }
  };
  submitReceiptData = async () => {
    if (
      this.state.session == this.state.last_session ||
      this.state.fromtomonths[this.state.fromtomonths.length - 1] != 3 ||
      this.state.fromtomonths[0] == 4
    ) {
      if (this.checkValidation()) {
        if (submitonce == 0) {
          submitonce = 1;
          const data = new FormData();
          data.append("receipt_date", this.state.receipt_date);
          data.append("take_computer", this.state.take_computer);
          data.append("fee_concession", this.state.fee_concession);
          data.append("is_teacher_ward", this.state.is_teacher_ward);
          data.append("is_full_free_ship", this.state.is_full_free_ship);
          data.append("unique_id", this.state.session + this.state.receipt_no);
          data.append(
            "defaulter_month",
            Moment(this.state.receipt_date).format("M")
          );

          if (
            Moment(this.state.last_fees_date).format("M") == "3" &&
            this.state.session == this.state.last_session &&
            this.state.last_fee_status == true
          ) {
            data.append("last_fee_date", "2021-03-31");
          } else {
            data.append("last_fee_date", this.state.last_fee_date);
          }
          data.append("receipt_no", this.state.receipt_no);
          data.append("ref_receipt_no", this.state.ref_receipt_no);
          data.append("session", this.state.session);
          data.append("admission_no", this.state.admission_no);
          data.append("class_name", this.state.class_name);
          data.append("section", this.state.section);
          data.append("account_no", this.state.account_no);
          data.append("name", this.state.name);
          data.append("prospectus_fee", this.state.prospectus_fee);
          data.append("registration_fee", this.state.showTotalRegistrationFee ? this.state.registration_fee : 0);
          data.append("admission_fee", this.state.showTotalAdmissionFee ? this.state.admission_fee : 0);
          data.append("annual_terms_fee", this.state.showTotalAnnualFee ? this.state.annual_terms_fee : 0);
          data.append("examination_fee", this.state.showTotalExaminationFee ? this.state.examination_fee : 0);
          data.append("security_fee", this.state.security_fee);
          data.append("paid_amount", this.state.paid_total_amount);
          data.append("Allfees", JSON.stringify(this.state.Allfees));
          data.append("fees", JSON.stringify(this.state.Actualfees));
          data.append("paid_months", JSON.stringify(this.state.months));
          data.append("paid_fees", this.state.paid_fees);
          data.append("fine", this.state.delayFineFee);
          data.append("paid_fine", this.state.manualFine > 0 ? this.state.manualFine : 0)
          data.append("dues_fine", (this.state.delayFineFee - this.state.manualFine))
          data.append("dues_fee", this.getGrandTotal() > 0 && (this.getGrandTotal() - Number(this.state.paid_total_amount)) > 0 ? (this.getGrandTotal() - Number(this.state.paid_total_amount)) : 0)
          data.append("balance", this.getGrandTotal() <= Number(this.state.paid_total_amount) ? Number(this.state.paid_total_amount) - this.getGrandTotal() : 0);
          data.append(
            "paid_month",
            this.state.fromtomonths[this.state.fromtomonths.length - 1]
          );
          data.append("total_annual_fee", this.state.showTotalAnnualFee ? this.state.annual_fee : 0);
          data.append("total_one_time_fee", this.state.one_time_fees);
          data.append("total_monthly_fee", this.state.total_monthly_fee);
          data.append("grand_total", this.getGrandTotal());
          data.append("payment_mode", this.state.payment_mode);
          data.append("bank", this.state.bank);
          data.append("bank_v_no", this.state.bank_v_no);
          data.append("check_no", this.state.check_no);
          data.append("bank_date", this.state.bank_date);
          data.append("previous_year_dues_fee", Number(this.state.pendingPreviousYearFees)>0 ? this.state.pendingPreviousYearFees - this.state.paidPendingPreviousYearFees: 0);
          data.append("previous_year_dues_fine", Number(this.state.pendingPreviousYearFine)>0 ? this.state.pendingPreviousYearFine - this.state.paidPendingPreviousYearFine: 0);
          data.append("paid_previous_year_fees",Number(this.state.paidPendingPreviousYearFees)>0 ? this.state.paidPendingPreviousYearFees : 0)
          data.append("paid_previous_year_fine",Number(this.state.paidPendingPreviousYearFine)>0 ? this.state.paidPendingPreviousYearFine : 0)
          const url = "http://144.91.110.221:4800/StoreReceipt";
          fetch(url, {
            method: "post",
            body: data,
          })
            .then((res) => res.json())
            .then((data) => {
              this.UpdateBalance();
            })
            .then((data) => {
              alert("Receipt Details Stored Successfully !");

              // window.location.reload(false);
              SubtractTuitionFee = 0;
              RemainTuitionFee = 0;
              previouspaidamount = 0;
              previousmonthlyamount = 0;
              previousannualamount = 0;
              previousgrandTotal = 0;
              previousfine = 0;
              previousPaidFine = 0;
              previousDuesFine = 0;
              previousTotalPaidAmount = 0;
              previousTotalDuesFee = 0;
              previousDuesFee = 0;
              submitonce = 0;
              nothing = "";
              defaultDate = localStorage.getItem("R_date");
              defaultDateStatus = false;
              countAdmission_no = "";
              this.setState({
                balance: "0",
                account_no: "",
                total_monthly_fee: "0",
                one_time_fees: "0",
                annual_fee: "0",
                AllOldFees: [],
                month: [],
                shortmonths: [],
                feemonths: [],
                grand_total: "",
                Allfees: [],
                due: "0",
                surplus: "0",
              });

              this.setState({
                redirect: null,
                _id: "",
                receipt_no: "",
                date_of_admission: "",
                modal_account_no: "",
                modal_admission_no: "",
                security_no: "",
                aadhar_no: "",
                class_name: "",
                section: "",
                subjects: "",
                // session:localStorage.getItem('SessionAccess'),
                // receipt_date: Moment().format('YYYY-MM-DD'),
                category: "",
                house: "",
                name: "",
                sex: "",
                dob: "",
                nationality: "",
                father_name: "",
                mother_name: "",
                parent_address: "",
                gaurdian_name: "",
                gaurdian_address: "",
                paid_total_amount: 0,
                fee_concession: "",
                bus_fare_concession: "",
                vehicle_no: "",
                is_teacher_ward: false,
                paid_upto_month: "",
                paid_upto_year: "",
                last_school_performance: "",
                is_full_free_ship: false,
                avail_transport: false,
                take_computer: false,
                no_exempt_security_deposit: false,
                ncc: false,
                no_exempt_registration: false,
                no_exempt_admission: false,
                is_repeater: false,
                other_details: "",
                misc_details: "",
                paidPendingPreviousYearFees:0,
                paidPendingPreviousYearFine:0,
                pendingPreviousYearFees:"0",
                pendingPreviousYearFine:"0",
                fine: "",
                manualFine: "",
                last_fee_status: true,
                last_fee_date: null,
                last_fees_date: "",
                last_session: "",
                admission_no: "",
                account_no: "",
                _fee: "",
                report_card_and_diary: "0",
                annual_prize_day: "0",
                development_fund: "0",
                school_magazin: "0",
                annual_terms_fee: "0",
                examination_fee: "0",
                med_board_reg: "0",
                library_fee: "0",
                tution_fee: "0",
                computer_fee: "0",
                science_fee: "0",
                bus_fare: "0",
                total_monthly_fee: "0",
                payment_mode: "CASH",
                grand_total: "",
                // bank:'',
                bank_v_no: "",
                check_no: "",
                bank_date: "",

                annual_fee: "0",
                one_time_fees: "0",
                fees: [],
                Allfees: [],
                AllDummyfees: [],
                Actualfees: [],
                OrignalFeeStructure: [],
                AllOldFees: [],
                paidFees: "",
                currentMonth: "",
                feemonths: "",
                fromtomonths: "",
                months: "",
                balance: "",
                paid_fees: "0",
                remaning_balance: "0",
                surplus: "0",
                due: "0",
                prospectus_fee: "0",
                registration_fee: "0",
                admission_fee: "0",
                security_fee: "0",
                // TakeOneTimeFee: false,
                TakeAnnualFee: false,
                TakeHalfYearlyFee: false,
                description: "",
                AllCategory: [],
                // AllSession:[],
                // AllStudent:[],
                AllSubCategory: [],
                StudentTutionFee: "0",
                RemainStudentTutionFee: "0",
                SubtractStudentTutionFee: "0",

                // ModalAllStudent:[],

                fne_date: "",
                defaultFine: "",
                // AllBank:[],
                manualFine: "",
                manualFineState: false,
                showTotalAdmissionFee: false,
                showTotalAnnualFee: false,
                showTotalExaminationFee: false,
                showTotalRegistrationFee: false,
                Rpaidmonth: "",
                Rreceiptdate: "",
                Rlastpaiddate: "",
                Rbank: "",
                Rreceiptno: "",
                Rid: "",
                Rbalance: "",
                studentSession: "",
                TotalPreviosSeissionBalance: "",
                tc_no: "",
                tc_status: "",
                security_deposit: "",
                cheque_no: "",
                left_on: "",
              });

              this.getFeeReceipt();
              $("#admissionno").focus();
            })
            .then((err) => { });
        }
      }
    } else {
      window.confirm(
        "Student Previous Session (" +
        this.state.last_session +
        ") Fee is not paid! Please First Pay Previous Session Fee"
      );
    }
  };

  UpdateBalance = () => {
    if (this.checkValidation()) {
      const data = new FormData();
      data.append("_id", this.state._id);
      data.append("balance", this.state.balance);
      data.append("paid_upto_month", this.state.last_fee_date);
      const url = "http://144.91.110.221:4800/UpdateBalance";
      fetch(url, {
        method: "PATCH",
        body: data,
      })
        .then((res) => res.json())
        .then((res) => {
        })
        .catch((err) => console.log(err));
    }
  };

  SetFee = async (index, e) => {
    this.state.AllDummyfees[index].amount = e.target.value;
    if (this.state.AllDummyfees[index].amount == "") {
      this.state.AllDummyfees[index].amount = 0;
    }
    this.state.Allfees[index].amount = e.target.value;
    if (this.state.Allfees[index].amount == "") {
      this.state.Allfees[index].amount = 0;
    }
    this.setBalance();
  };
  setOneTimeFeeForExtraAmontInMarchMonth() {
    if (
      Moment(this.state.last_fees_date).format("M") == "3" &&
      this.state.session == this.state.last_session &&
      this.state.last_fee_status == true
    ) {
      this.state.Allfees.map((item, index) => {
        if (item.fee_category == "ONE TIME") {
          this.state.Allfees[index].amount = 0;
        }
      });

      this.state.Allfees.map((item, index) => {
        if (item.fee_category == "ANNUAL") {
          if (item.fee_sub_category != "MISC") {
            this.state.Allfees[index].amount = 0;
          }
        }
      });
    }
  }
  printReceipt() {
    window.print();
  }

  DeleteReceipt(id) {
    const apiUrl = "http://144.91.110.221:4800/DeleteReceipt";
    fetch(apiUrl, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      method: "delete",
      body: JSON.stringify({ _id: id }),
    })
      .then((response) => response.json())
      .then((res) => {
        alert("Deleted Successfully");
        this.setState({ AllOldFees: [] });
        this.SearchOldfee();
      });
  }

  handleFocusInput(e) {
    e.target.select();
  }

  editReceiptObject = (obj) => {
    this.setState({
      Rid: "",
      Rpaidmonth: "",
      Rreceiptdate: "",
      Rbank: "",
      Rreceiptno: "",
      Rlastpaiddate: "",
      Rbalance: "",
    });
    let Rpaidmonth = obj.paid_month;
    let Rreceiptdate = obj.receipt_date;
    let Rlastpaiddate = obj.last_fee_date;
    let Rbank = obj.bank;
    let Rreceiptno = obj.receipt_no;
    let Rid = obj._id;
    let Rbalance = obj.balance;
    this.setState({
      Rbalance,
      Rid,
      Rpaidmonth,
      Rreceiptdate,
      Rbank,
      Rreceiptno,
      Rlastpaiddate,
    });
  };
  UpdateReceipt = () => {
    // if (this.checkValidation()) {
    const data = new FormData();
    data.append("_id", this.state.Rid);
    data.append("bank", this.state.Rbank);
    data.append("last_fee_date", this.state.Rlastpaiddate);
    data.append("paid_month", this.state.Rpaidmonth);
    data.append("receipt_no", this.state.Rreceiptno);
    data.append("receipt_date", this.state.Rreceiptdate);
    data.append("balance", this.state.Rbalance);
    const url = "http://144.91.110.221:4800/UpdateReceipt";
    fetch(url, {
      method: "put",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        alert("Fees updated successfully !");
      })
      .then((err) => console.log(err));
  };
  //   }

  // Server Pagination Function
  PaginationCall = async (e) => {
    let arr = [];
    for (
      let i = 1;
      i <=
      Math.ceil(
        localStorage.getItem("AllStudentcount") / this.state.servercontentsize
      );
      i++
    ) {
      arr.push(i);
    }

    await this.setState({ PaginationCount: arr });
  };
  ServerPagination = async (e) => {
    await this.setState({ serverpagi: e.target.value });

    await this.getStudent();
  };
  RangeContentSize = async (e) => {
    await this.setState({ servercontentsize: e.target.value });

    await this.setState({ serverpagi: 1 });
    await this.getStudent();
  };
  PageIncreament = async () => {
    await this.setState({ serverpagi: parseInt(this.state.serverpagi) + 1 });

    await this.getStudent();
  };

  PageDecreament = async () => {
    if (this.state.serverpagi > 1) {
      await this.setState({ serverpagi: parseInt(this.state.serverpagi) - 1 });

      await this.getStudent();
    } else {
      alert("no previous page");
    }
  };

  // End Server Pagination Function

  // StudentCount Api Start
  // GetAllStudentCount Api
  getStudentCount = () => {
    fetch("http://144.91.110.221:4800/getStudentCount", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        session: this.state.session,
        school_id: "UT015",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        this.setState({ AllStudentcount: data.count });
        localStorage.setItem("AllStudentcount", this.state.AllStudentcount);
      })
      .catch((err) => console.log(err));
  };

  getAnnualFeeAmount = () => {
    if (this.state.showTotalAnnualFee) {
      this.setState({
        showTotalAnnualFee: false,
      }, () => {
        this.calculateTotalAmount();
      })
    }
    else {
      this.setState({
        showTotalAnnualFee: true,
      }, () => {
        this.calculateTotalAmount();
      })
    }
  }
  getAdmissionFeeAmount = () => {
    if (this.state.showTotalAdmissionFee) {
      this.setState({
        showTotalAdmissionFee: false,
      }, () => {
        this.calculateTotalAmount();
      })
    }
    else {
      this.setState({
        showTotalAdmissionFee: true,
      }, () => {
        this.calculateTotalAmount();
      })
    }
  }
  getExaminationFeeAmount = () => {
    if (this.state.showTotalExaminationFee) {
      this.setState({
        showTotalExaminationFee: false,
      }, () => {
        this.calculateTotalAmount();
      })
    }
    else {
      this.setState({
        showTotalExaminationFee: true,
      }, () => {
        this.calculateTotalAmount();
      })
    }
  }
  getRegistrationFeeAmount = () => {
    if (this.state.showTotalRegistrationFee) {
      this.setState({
        showTotalRegistrationFee: false,
      }, () => {
        this.calculateTotalAmount();
      })
    }
    else {
      this.setState({
        showTotalRegistrationFee: true,
      }, () => {
        this.calculateTotalAmount();
      })
    }
  }

  calculateTotalAmount = () => {
    this.setState((prevState) => ({
      paid_total_amount:
        Number(this.state.showTotalAdmissionFee ? this.state.admission_fee : 0) +
        Number(this.state.showTotalRegistrationFee ? this.state.registration_fee : 0) +
        Number(this.state.showTotalAnnualFee ? this.state.annual_terms_fee : 0) +
        Number(this.state.showTotalExaminationFee ? this.state.examination_fee : 0) +
        Number(this.state.paid_fees > 0 ? this.state.paid_fees : 0) +
        Number(this.state.manualFine > 0 ? this.state.manualFine : 0) 
        // Number(this.state.paidPendingPreviousYearFees > 0 ? this.state.paidPendingPreviousYearFees : 0) +
        // Number(this.state.paidPendingPreviousYearFine > 0 ? this.state.paidPendingPreviousYearFine : 0),
    }));
  };

   numberToWords = function convertNumberToWords(number) {
    const oneDigit = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"];
    const twoDigits = ["", "Ten", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
    const teens = ["", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];

    function twoDigitToWords(num) {
        if (num < 10) {
            return oneDigit[num];
        } else if (num >= 11 && num <= 19) {
            return teens[num - 10];
        } else {
            const tens = Math.floor(num / 10);
            const ones = num % 10;
            return twoDigits[tens] + (ones > 0 ? " " + oneDigit[ones] : "");
        }
    }

    if (number === 0) {
        return "Zero";
    }

    let result = "";

    if (Math.floor(number / 1000) > 0) {
        result += convertNumberToWords(Math.floor(number / 1000)) + " Thousand";
        number %= 1000;
    }

    if (Math.floor(number / 100) > 0) {
        result += (result !== "" ? " " : "") + oneDigit[Math.floor(number / 100)] + " Hundred";
        number %= 100;
    }

    if (number > 0) {
        result += (result !== "" ? " " : "") + twoDigitToWords(number);
    }

    return result;
};


  handlePaymentModeChange = (e) => {
    this.setState({
      payment_mode: e.target.value.toUpperCase(),
    });
  }

  previousYearDues = async () => {
    const currentDate = new Date();
    const currentYear = Moment(currentDate).format("YYYY");
    const march31 = `${currentYear}-03-31`;
    const formattedDate = Moment(march31, "YYYY-MM-DD");
    const diffInMonths = formattedDate.diff(this.state.storeLastReceiptDate, 'months');
    if(diffInMonths>0)
    {
      let previousFine=0;
      for(let i=1; i<=diffInMonths; i++)
      {
        previousFine = i*30 + previousFine
      }
      this.setState({
        pendingPreviousYearFees :this.state.storeLastYearMonthlyFee*diffInMonths,
        pendingPreviousYearFine :previousFine,
      })
    }
  }
  // End GetAllStudentCount Api

  // End StudentCount Api
  render() {
    $("#focusguard-2").on("focus", function () {
      // "last" focus guard got focus: set focus to the first field
      $("#firstInput").focus();
    });

    $("#focusguard-1").on("focus", function () {
      // "first" focus guard got focus: set focus to the last field
      $("#lastInput").focus();
    });
    if (this.state.redirect) {
      return <Redirect to={"/StudentDisplay"} />;
    }
    window.addEventListener("keyup", (event) => {
      if (event.keyCode == 120) {
        this.submitReceiptData();
      }
    });
    const data = [];
    {
      this.state.ModalAllStudent.map((item, index) => {
        data.push({
          admission_no: item?.admission_no,
          account_no: item?.account_no,
          student_name: item?.student?.name,
          class_section: item?.class_name + "-" + item?.section,
          parent_name:
            item?.student?.mother_name + "/" + item?.student?.father_name,
          gaurdian_name: item?.gaurdian_name,
          mobile: item?.student?.parent_mobile + "," + item?.student?.parent_phone,
          address: item?.parent_address,
          action: (
            <button
              type="button"
              className="btn btn-info"
              onClick={() => this.searchByAdmission(item.admission_no)}
              data-dismiss="modal"
            >
              Get Details
            </button>
          ),
        });
      });
    }
    const columns = [
      { title: "Admn No", data: "admission_no" },
      { title: "Ac No", data: "account_no" },
      { title: "St. Name", data: "student_name" },
      { title: "Class", data: "class_section" },
      { title: "Parent Name", data: "parent_name" },
      { title: "Gaurdian Name", data: "gaurdian_name" },
      { title: "Mobile", data: "mobile" },
      // { title: "Address", data: "address"},
      { title: "Action", data: "action" },
    ];

    const currentMonth = this.state.currentMonth;
    defaultDate = localStorage.getItem("R_date");
    // defaultDateStatus=false

    countAdmission_no = "";

    return (
      <>
        {/* Confirmation Modal */}
        {this.state.ConfModal == true ? (
          <div id="ConfirmationModal" class="modal show" role="dialog">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h4 class="modal-title">Enter Password</h4>
                  <button
                    type="button"
                    class="close"
                    onClick={() => {
                      this.setState({ ConfModal: false });
                    }}
                  >
                    &times;
                  </button>
                </div>
                <div class="modal-body">
                  <input
                    type="password"
                    className="form-control"
                    onKeyPress={(e) => {
                      if (e.key == "Enter") {
                        this.DeleteReceipt(e.target.value);
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        ) : null}
        {/*End Confirmation Modal */}
        {/* edit modal */}
        <div id="EditModal" class="modal fade" role="dialog">
          <div class="modal-dialog modal-md">
            <div class="modal-content">
              <div class="modal-header">
                <h4 class="modal-title">Edit Fee Detail</h4>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  data-toggle="modal"
                  data-target="#OldFeeModal"
                >
                  &times;
                </button>
              </div>
              <div class="modal-body">
                <div className="row">
                  <div className="col-3">
                    <label>Receipt No</label>
                    <input
                      type="text"
                      className="form-control"
                      value={this.state.Rreceiptno}
                      onChange={(e) => {
                        {
                          this.setState({
                            Rreceiptno: e.target.value.toUpperCase(),
                          });
                        }
                      }}
                    />
                  </div>
                  <div className="col-3">
                    <label>Receipt Date</label>
                    <input
                      type="date"
                      className="form-control"
                      value={this.state.Rreceiptdate}
                      onChange={(e) => {
                        {
                          this.setState({
                            Rreceiptdate: e.target.value.toUpperCase(),
                          });
                        }
                      }}
                    />
                  </div>
                  <div className="col-3">
                    <label>Paid upto</label>
                    <select
                      className="form-control"
                      value={this.state.Rpaidmonth}
                      onChange={(e) => {
                        {
                          this.setState({
                            Rpaidmonth: e.target.value.toUpperCase(),
                          });
                        }
                      }}
                    >
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
                    <input
                      type="date"
                      className="form-control"
                      value={this.state.Rlastpaiddate}
                      onChange={(e) => {
                        {
                          this.setState({
                            Rlastpaiddate: e.target.value.toUpperCase(),
                          });
                        }
                      }}
                    />
                  </div>
                  <div className="col-3">
                    <label>Bank</label>
                    <select
                      className="form-control"
                      onChange={(e) => {
                        this.setState({ Rbank: e.target.value.toUpperCase() });
                      }}
                      value={this.state.Rbank}
                    >
                      <option value="">Choose Bank</option>
                      {this.state.AllBank.map((item, index) => {
                        return <option value={item.bank}>{item.bank}</option>;
                      })}
                    </select>
                  </div>
                  <div className="col-3">
                    <label>Dues/Surplus</label>
                    <input
                      type="text"
                      className="form-control"
                      value={this.state.Rbalance}
                      onChange={(e) => {
                        {
                          this.setState({
                            Rbalance: e.target.value.toUpperCase(),
                          });
                        }
                      }}
                    />
                  </div>
                  <div className="col-3">
                    <br />
                    <button
                      onClick={() => {
                        this.UpdateReceipt();
                      }}
                      className="btn btn-secondary "
                    >
                      Update
                    </button>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-default"
                  data-dismiss="modal"
                  data-toggle="modal"
                  data-target="#OldFeeModal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* end edit modal */}
        <div id="myModal" class="modal fade" role="dialog">
          <div className="row">
            <div className="col-4">
              <ModalImage
                small={"http://144.91.110.221:4800/" + this.state.image}
                medium={"http://144.91.110.221:4800/" + this.state.image}
                large={"http://144.91.110.221:4800/" + this.state.image}
                alt={this.state.image}
              />
              ;
            </div>
            <div className="col-4">
              <ModalImage
                small={"http://144.91.110.221:4800/" + this.state.image}
                medium={"http://144.91.110.221:4800/" + this.state.image}
                large={"http://144.91.110.221:4800/" + this.state.image}
                alt={this.state.image}
              />
              ;
            </div>
            <div className="col-4">
              <ModalImage
                small={"http://144.91.110.221:4800/" + this.state.image}
                medium={"http://144.91.110.221:4800/" + this.state.image}
                large={"http://144.91.110.221:4800/" + this.state.image}
                alt={this.state.image}
              />
              ;
            </div>
          </div>
          <div class="modal-dialog modal-lg">
            <div class="modal-content" style={{ width: "100%" }}>
              <div class="modal-header p-3">
                <button type="button" class="close" data-dismiss="modal">
                  &times;
                </button>
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
                          <td>
                            {this.state.class_name} {this.state.section}
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">Category</th>
                          <td>{this.state.category}</td>
                        </tr>
                        <tr>
                          <th scope="row">House</th>
                          <td>
                            {this.state.house == "GARDNER" ? (
                              <button class_name="btn btn-success">
                                {this.state.house}
                              </button>
                            ) : this.state.house == "HOWARD" ? (
                              <button class_name="btn btn-primary">
                                {this.state.house}
                              </button>
                            ) : this.state.house == "KHANNA" ? (
                              <button class_name="btn btn-danger">
                                {this.state.house}
                              </button>
                            ) : this.state.house == "LYONS" ? (
                              <button
                                class_name="btn "
                                style={{
                                  color: "white",
                                  backgroundColor: "yellow",
                                }}
                              >
                                {this.state.house}
                              </button>
                            ) : null}{" "}
                          </td>
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
                          <td>
                            {Moment(this.state.date_of_admission).format(
                              "DD-MM-YYYY"
                            )}
                          </td>
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
                <button
                  type="button"
                  class="btn btn-default"
                  data-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Old Fee Modal */}
        <div id="OldFeeModal" class="modal fade w-100" role="dialog">
          <div class="modal-dialog modal-xl w-100 ">
            <div class="modal-content w-100">
              {/* <div class="modal-header p-3">
                            <h4 class="modal-title">Previous Fee Details </h4>
                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                        </div> */}
              <div class="modal-body printReciept">
                <div className="row">
                  <div className="col-12 text-center pb-3">
                    <h3 className="m-0">
                      CONSTANCIA SCHOOL ({" "}
                      <select
                        value={this.state.session}
                        className="receiptSession"
                        onChange={(e) => {
                          {
                            this.setState({
                              session: e.target.value.toUpperCase(),
                            });
                          }
                        }}
                      >
                        <option value="">All Session</option>
                        {this.state.AllSession.map((item, index) => {
                          return (
                            <option value={item.session_code}>
                              {item.session_code}
                            </option>
                          );
                        })}
                        cf
                      </select>{" "}
                      )
                    </h3>
                    {this.state.AllOldFees.map((item, index) => {
                      // if(item.security_fee !='0' ){
                      // if(item.prospectus_fee !='0' || item.registration_fee !='0'  || item.admission_fee !='0'  || item.security_fee !='0' ){
                      return (
                        <div>
                          {item.security_fee != "0" ? (
                            <h4 className="w-100">
                              {" "}
                              Security Dep-{item.security_fee}
                            </h4>
                          ) : null}
                        </div>
                      );
                      // }
                    })}
                    {this.state.is_teacher_ward == "true" ? (
                      <h4 className="w-100"> Security Dep- 0</h4>
                    ) : null}
                    {/* <p>WEST CANAL ROAD P.O MAJRA, DEHRADUN</p>
                                    <p>0135-2640930,0135-2642828,FAX:0135-2644353</p> */}
                  </div>
                  <div className="col-5">
                    <strong>Admn No - </strong>
                    <input
                      id="FeeDetailAdmnNo"
                      value={this.state.admission_no}
                      onFocus={(e) => {
                        this.handleFocusInput(e);
                      }}
                      onChange={(e) => {
                        this.setState({ admission_no: e.target.value });
                        this.searchByAdmission_no(e);
                      }}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          this.searchByAdmission_no(e);
                        }
                      }}
                    />{" "}
                    <button
                      type="button"
                      onClick={() => {
                        this.getStudent();
                      }}
                      class="btn btn-success btn-sm"
                      data-toggle="modal"
                      data-target="#AllModalStudent"
                    >
                      ...
                    </button>
                    <span>
                      {" "}
                      / <strong>{this.state.account_no}</strong>
                    </span>
                    <br />
                    <label> Student Name - </label> {this.state.name}
                    <br />
                  </div>
                  <div className="col-4">
                    <label> Class/Section - </label> {this.state.class_name}-
                    {this.state.section}
                    <br />
                    <label> Parents Name - </label> {this.state.mother_name} /{" "}
                    {this.state.father_name}
                    <br />
                  </div>
                  <div className="col-3">
                    <label> Mo. - </label> {this.state.parent_mobile}
                    <br />
                    {this.state.parent_phone}
                    <br />
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
                {this.state.tc_status == 1 ? (
                  <table class="table table-bordered">
                    <tr className="bg-danger text-white">
                      <th>Tc No</th>
                      <td width="2%">:</td>
                      <td>{this.state.tc_no}</td>

                      <th>Left On</th>
                      <td width="2%">:</td>
                      <td>{Moment(this.state.left_on).format("DD-MM-YYYY")}</td>

                      <th>Security Amount</th>
                      <td width="2%">:</td>
                      <td>{this.state.security_deposit}</td>
                      <th>Cheque no</th>
                      <td width="2%">:</td>
                      <td>{this.state.cheque_no}</td>
                    </tr>
                  </table>
                ) : null}
                <table class="table print_table">
                  <thead class="thead-light">
                    <tr>
                      <th>Tuition Fee : {this.state.StudentTutionFee}</th>
                      <th>
                        Take Computer :{" "}
                        {this.state.take_computer == "true" ? "YES" : "NO"}
                      </th>
                      <th>Fee Concession : {this.state.fee_concession}</th>
                    </tr>
                  </thead>
                </table>
                <table class="table print_table">
                  <thead class="thead-light">
                    <tr>
                      <th>Admission Fee: {this.state.AllOldFees.map((item) => {
                        if (item.admission_fee > 0) {
                          return (
                            <span key={item.id}> Paid {item.admission_fee} ({Moment(item.receipt_date).format("DD-MM-YYYY")}) </span>
                          );
                        }
                        return null;
                      })}</th>
                      <th>
                        Registration Fee :{this.state.AllOldFees.map((item) => {
                          if (item.registration_fee > 0) {
                            return (
                              <span key={item.id}>{item.registration_fee} ({Moment(item.receipt_date).format("DD-MM-YYYY")})</span>
                            )
                          }
                          return null;
                        })}
                      </th>
                      <th>Annual/Terms Fee : {this.state.AllOldFees.map((item) => {
                        if (item.annual_terms_fee > 0) {
                          return (
                            <span key={item.id}>{item.annual_terms_fee} ({Moment(item.receipt_date).format("DD-MM-YYYY")})</span>
                          )
                        }
                        return null;
                      })}</th>
                      <th>Examination Fee : {this.state.AllOldFees.map((item) => {
                        if (item.examination_fee > 0) {
                          return (
                            <span key={item.id}>{item.examination_fee} ({Moment(item.receipt_date).format("DD-MM-YYYY")})</span>
                          )
                        }
                        return null;
                      })}</th>
                    </tr>
                  </thead>
                </table>
                <table class="table print_table">
                  <thead class="thead-light">
                    <tr>
                      <th scope="col">RECEIPT DATE</th>
                      <th scope="col">MONTH</th>
                      <th scope="col">Mode</th>
                      <th scope="col">R.NO</th>
                      <th scope="col">MONTHLY</th>
                      <th scope="col">FINE</th>
                      <th scope="col">PAID FINE</th>
                      <th scope="col">PAID FEE</th>
                      <th scope="col">DUES FINE</th>
                      <th scope="col">DUES FEE</th>
                      <th scope="col">TOTAL DUES</th>
                      <th scope='col'>PAID AMOUNT</th>
                      <th scope="col">SURPLUS</th>
                      <th scope="col">ACTION</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.AllOldFees.map((item, index) => {
                      // {JSON.parse(item.paid_fees).map((e,i)=>{
                      //         if(e.fee_sub_category =="TUITION FEE"){
                      //             SubtractTuitionFee = e.amount
                      //         }
                      // })}
                      if (item.session == this.state.session) {
                        return (
                          <tr>
                            <td>
                              {Moment(item.receipt_date).format("DD/MM/YYYY")}
                            </td>
                            <td>
                              {item.paid_month == "1"
                                ? "Jan" +
                                "-" +
                                Moment(item.last_fee_date).format("YYYY")
                                : item.paid_month == "2"
                                  ? "Feb" +
                                  "-" +
                                  Moment(item.last_fee_date).format("YYYY")
                                  : item.paid_month == "3"
                                    ? "Mar" +
                                    "-" +
                                    Moment(item.last_fee_date).format("YYYY")
                                    : item.paid_month == "4"
                                      ? "Apr" +
                                      "-" +
                                      Moment(item.last_fee_date).format("YYYY")
                                      : item.paid_month == "5"
                                        ? "May" +
                                        "-" +
                                        Moment(item.last_fee_date).format("YYYY")
                                        : item.paid_month == "6"
                                          ? "Jun" +
                                          "-" +
                                          Moment(item.last_fee_date).format("YYYY")
                                          : item.paid_month == "7"
                                            ? "July" +
                                            "-" +
                                            Moment(item.last_fee_date).format("YYYY")
                                            : item.paid_month == "8"
                                              ? "Aug" +
                                              "-" +
                                              Moment(item.last_fee_date).format("YYYY")
                                              : item.paid_month == "9"
                                                ? "Sept" +
                                                "-" +
                                                Moment(item.last_fee_date).format("YYYY")
                                                : item.paid_month == "10"
                                                  ? "Oct" +
                                                  "-" +
                                                  Moment(item.last_fee_date).format("YYYY")
                                                  : item.paid_month == "11"
                                                    ? "Nov" +
                                                    "-" +
                                                    Moment(item.last_fee_date).format("YYYY")
                                                    : item.paid_month == "12"
                                                      ? "Dec" +
                                                      "-" +
                                                      Moment(item.last_fee_date).format("YYYY")
                                                      : null}
                            </td>
                            <td>{item.payment_mode}</td>
                            <td>{item.receipt_no}</td>
                            <td>
                              {/* {parseInt(item.paid_fees) -
                                (parseInt(item.total_one_time_fee) +
                                  parseInt(item.total_annual_fee) +
                                  parseInt(item.balance)) >
                                0
                                ? parseInt(item.paid_fees) -
                                (parseInt(item.total_one_time_fee) +
                                  parseInt(item.total_annual_fee) +
                                  parseInt(item.balance))
                                : 0} */}
                              {this.state.StudentTutionFee}
                            </td>
                            <td>{item.fine}</td>
                            <td>{item.paid_fine}</td>
                            {/* <td>{item.grand_total}</td> */}
                            <td>{item.paid_fees}</td>
                            <td>{item.fine - item.paid_fine}</td>
                            <td>
                              {parseInt(item.dues_fee)}
                            </td>
                            <td>
                              {parseInt(Number(item.dues_fee) + Number(item.dues_fine))}
                            </td>
                            <td>{item.paid_amount}</td>

                            <td>
                              {parseInt(item.balance) > 0 ? item.balance : "0"}
                            </td>
                            <td>
                              <button
                                data-dismiss="modal"
                                onClick={() => this.editReceiptObject(item)}
                                className="btn btn-secondary mr-2"
                                data-toggle="modal"
                                data-target="#EditModal"
                              >
                                <i class="fas fa-pencil-alt"></i>
                              </button>
                              <button
                                className="btn btn-sm btn-danger"
                                data-dismiss="modal"
                                data-toggle="modal"
                                onClick={() => {
                                  if (window.confirm("Are You Sure?")) {
                                    this.DeleteReceipt(item._id);
                                  }
                                }}
                              >
                                <i
                                  className="fa fa-trash"
                                  aria-hidden="true"
                                ></i>
                              </button>
                            </td>
                            {/* onClick={() => {this.setState({ConfModal:true,DeleteId:item._id})}} */}
                          </tr>
                        );
                      }
                      if (this.state.session == "") {
                        return (
                          <tr>
                            <td>
                              {Moment(item.receipt_date).format("DD/MM/YYYY")}
                            </td>
                            <td>
                              {item.paid_month == "1"
                                ? "Jan"
                                : item.paid_month == "2"
                                  ? "Feb"
                                  : item.paid_month == "3"
                                    ? "Mar"
                                    : item.paid_month == "4"
                                      ? "Apr"
                                      : item.paid_month == "5"
                                        ? "May"
                                        : item.paid_month == "6"
                                          ? "Jun"
                                          : item.paid_month == "7"
                                            ? "July"
                                            : item.paid_month == "8"
                                              ? "Aug"
                                              : item.paid_month == "9"
                                                ? "Sept"
                                                : item.paid_month == "10"
                                                  ? "Oct"
                                                  : item.paid_month == "11"
                                                    ? "Nov"
                                                    : item.paid_month == "12"
                                                      ? "Dec"
                                                      : null}
                            </td>
                            <td>{item.bank}</td>
                            <td>{item.receipt_no}</td>
                            <td>{item.total_one_time_fee}</td>
                            <td>{item.total_annual_fee}</td>
                            <td>
                              {/* {parseInt(item.paid_fees) -
                                (parseInt(item.total_one_time_fee) +
                                  parseInt(item.total_annual_fee) +
                                  parseInt(item.balance)) >
                                0
                                ? parseInt(item.paid_fees) -
                                (parseInt(item.total_one_time_fee) +
                                  parseInt(item.total_annual_fee) +
                                  parseInt(item.balance))
                                : 0} */}
                              {item.total_monthly_fee}
                            </td>
                            <td>{item.fine}</td>
                            {/* <td>{item.grand_total}</td> */}
                            <td>{item.paid_fees}</td>
                            <td>
                              {parseInt(item.balance) < 0 ? item.balance : "0"}
                            </td>
                            <td>
                              {parseInt(item.balance) > 0 ? item.balance : "0"}
                            </td>
                            <td>
                              <button
                                className="btn btn-sm btn-danger"
                                data-dismiss="modal"
                                data-toggle="modal"
                                onClick={() => {
                                  if (window.confirm("Are You Sure?")) {
                                    this.DeleteReceipt(item._id);
                                  }
                                }}
                              >
                                <i
                                  className="fa fa-trash"
                                  aria-hidden="true"
                                ></i>
                              </button>
                            </td>
                            {/* onClick={() => {this.setState({ConfModal:true,DeleteId:item._id})}} */}
                          </tr>
                        );
                      }
                    })}
                    {/* {this.state.AllOldFees.map((item, index) => {
                      if (item.session == this.state.session) {
                        previouspaidamount =
                          parseInt(previouspaidamount) +
                          parseInt(item.paid_fees) +
                          parseInt(item.fine);
                        //   alert(previouspaidamount)
                        previousannualamount =
                          parseInt(previousannualamount) +
                          parseInt(item.total_annual_fee);
                        var a;
                        if (
                          parseInt(item.paid_fees) -
                          (parseInt(item.total_one_time_fee) +
                            parseInt(item.total_annual_fee) +
                            parseInt(item.balance)) >
                          0
                        ) {
                          a =
                            parseInt(item.paid_fees) -
                            (parseInt(item.total_one_time_fee) +
                              parseInt(item.total_annual_fee) +
                              parseInt(item.balance));
                        } else {
                          a = 0;
                        }
                        previousmonthlyamount =
                          parseInt(previousmonthlyamount) + a;
                        previousgrandTotal =
                          parseInt(previousgrandTotal) +
                          parseInt(item.grand_total);
                        previousfine =
                          parseInt(previousfine) + parseInt(item.fine);
                      }
                    })} */}
                    {/* 
                    {this.state.AllOldFees.map((item, index) => {
                      if (this.state.session == "") {
                        // previouspaidamount =
                        //   parseInt(previouspaidamount) +
                        //   parseInt(item.paid_fees) +
                        //   parseInt(item.fine);
                        // //   alert(previouspaidamount)
                        // previousannualamount =
                        //   parseInt(previousannualamount) +
                        //   parseInt(item.total_annual_fee);
                        // var a;
                        // if (
                        //   parseInt(item.paid_fees) -
                        //   (parseInt(item.total_one_time_fee) +
                        //     parseInt(item.total_annual_fee) +
                        //     parseInt(item.balance)) >
                        //   0
                        // ) {
                        //   a =
                        //     parseInt(item.paid_fees) -
                        //     (parseInt(item.total_one_time_fee) +
                        //       parseInt(item.total_annual_fee) +
                        //       parseInt(item.balance));
                        // } else 
                        //   a = 0;
                        // }
                        //   parseInt(previousmonthlyamount) + a;
                        // previousgrandTotal =
                        //   parseInt(previousgrandTotal) +
                        //   parseInt(item.grand_total);
                        // previousfine =
                        //   parseInt(previousfine) + parseInt(item.fine);
                      }


                    })} */}

                    <td>
                      <strong>GRAND_TOTAL</strong>
                    </td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>
                      <strong>{previousmonthlyamount}</strong>
                    </td>
                    <td>
                      <strong>{previousfine > 0 ? previousfine : 0}</strong>
                    </td>
                    <td>
                      <strong>{previousPaidFine > 0 ? previousPaidFine : 0}</strong>
                    </td>
                    <td>
                      <strong>{parseInt(previouspaidamount)}</strong>
                    </td>
                    <td><strong>{previousDuesFine > 0 ? previousDuesFine : 0}</strong></td>
                    <td><strong>{previousDuesFee > 0 ? previousDuesFee : 0}</strong></td>
                    <td><strong>{previousTotalDuesFee > 0 ? previousTotalDuesFee : 0}</strong></td>
                    <td><strong>{previousTotalPaidAmount > 0 ? previousTotalPaidAmount : 0}</strong></td>
                    {
                      this.state.AllOldFees.map((item, index) => {
                        if (index === this.state.AllOldFees.length - 1) {
                          // Initialize a variable to store the sum of balances
                          let totalBalance = 0;

                          // Iterate through the array and sum up the balances
                          for (let i = 0; i <= index; i++) {
                            totalBalance += parseInt(this.state.AllOldFees[i].balance);
                          }

                          return (
                            <td>
                              <strong>{totalBalance >= 0 ? totalBalance : 0}</strong>
                            </td>
                          );
                        } else {
                          return null; // or any other JSX element if needed
                        }
                      })
                    }


                    {/* {previouspaidamount-previousgrandTotal < 0 ? <td><strong>{previouspaidamount-previousgrandTotal}</strong></td> : <td></td>}

                            {previouspaidamount-previousgrandTotal  >= 0 ? <td><strong>{previouspaidamount-previousgrandTotal}</strong></td> : <td></td>} */}
                  </tbody>
                </table>
              </div>

              <div class="modal-footer">
                <button
                  class="hide-on-print btn btn-success btn-md"
                  onClick={this.printReceipt}
                >
                  Print
                </button>
                <button
                  type="button"
                  class="btn btn-default"
                  data-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* End Old Fee Modal */}
        {/* Modal All student */}
        <div id="AllModalStudent" class="modal fade" role="dialog">
          <div class="modal-dialog modal-lg">
            <div class="modal-content" style={{ width: "100%" }}>
              <div class="modal-header p-3">
                <button type="button" class="close" data-dismiss="modal">
                  &times;
                </button>
              </div>
              <div className="row">
                <div className="col-12">
                  <div class="modal-header">
                    <h4 class="modal-title">Student Details </h4>
                  </div>
                  {/* Server Side Filter Code */}
                  <div class="server-filter-div modal-header">
                    <div className="col-9">
                      {this.state.serverpagi == 1 ? (
                        <button
                          onClick={() => this.PageDecreament()}
                          className="btn btn-danger"
                          disabled
                        >
                          Prev
                        </button>
                      ) : (
                        <button
                          onClick={() => this.PageDecreament()}
                          className="btn btn-danger"
                        >
                          Prev
                        </button>
                      )}
                      {this.state.AllStudent.length <=
                        this.state.servercontentsize ? (
                        <span className="ml-5">
                          <b>
                            <select
                              onChange={(e) => this.ServerPagination(e)}
                              value={this.state.serverpagi}
                              style={{ border: "0px", outline: "0px" }}
                            >
                              {this.state.PaginationCount.map((item, ind) => (
                                <option value={item}>{item}</option>
                              ))}
                            </select>
                          </b>{" "}
                          ({this.state.servercontentsize})
                        </span>
                      ) : (
                        <span className="ml-5">
                          <b>Loading...</b>
                        </span>
                      )}

                      {this.state.serverpagi ==
                        Math.ceil(
                          localStorage.getItem("AllStudentcount") /
                          this.state.servercontentsize
                        ) ? (
                        <button
                          onClick={() => this.PageIncreament()}
                          className="btn btn-danger ml-5"
                          disabled
                        >
                          Next
                        </button>
                      ) : (
                        <button
                          onClick={() => this.PageIncreament()}
                          className="btn btn-danger ml-5"
                        >
                          Next
                        </button>
                      )}
                    </div>
                    <div className="col-3 d-flex justify-content-center align-items-center">
                      <span className="mr-2">
                        <b>Load</b>
                      </span>
                      <select
                        onChange={(e) => this.RangeContentSize(e)}
                        value={this.state.servercontentsize}
                        className="form-control"
                      >
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                        <option value={250}>250</option>
                        <option value={500}>500</option>
                        <option value={localStorage.getItem("AllStudentcount")}>
                          ALL
                        </option>
                      </select>
                      <span className="ml-2">
                        <b>Entries</b>
                      </span>
                    </div>
                  </div>

                  {/* End Server Side Filter Code */}
                  <div class="modal-body">
                    {this.state.ModalAllStudent != "" ? (
                      <DataTable
                        data={data}
                        columns={columns}
                        striped={true}
                        hover={true}
                        responsive={true}
                      />
                    ) : (
                      <lottie-player
                        src="https://assets2.lottiefiles.com/private_files/lf30_uilaciwr.json"
                        background="transparent"
                        speed="1"
                        style={{
                          width: "300px",
                          height: "300px",
                          margin: "auto",
                        }}
                        loop
                        autoplay
                      ></lottie-player>
                    )}
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-default"
                  data-dismiss="modal"
                >
                  Close
                </button>
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
                <button type="button" class="close" data-dismiss="modal">
                  &times;
                </button>
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
                      {this.state.OrignalFeeStructure.map((item, index) => {
                        if (item.fee_category == "ONE TIME") {
                          return <td>{item.amount}</td>;
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
                      {this.state.OrignalFeeStructure.map((item, index) => {
                        if (item.fee_category == "ANNUAL") {
                          return (
                            <td>
                              {item.amount} (
                              {item.month == "1"
                                ? "Jan"
                                : item.month == "2"
                                  ? "Feb"
                                  : item.month == "3"
                                    ? "Mar"
                                    : item.month == "4"
                                      ? "Apr"
                                      : item.month == "5"
                                        ? "May"
                                        : item.month == "6"
                                          ? "Jun"
                                          : item.month == "7"
                                            ? "July"
                                            : item.month == "8"
                                              ? "Aug"
                                              : item.month == "9"
                                                ? "Sept"
                                                : item.month == "10"
                                                  ? "Oct"
                                                  : item.month == "11"
                                                    ? "Nov"
                                                    : item.month == "12"
                                                      ? "Dec"
                                                      : null}
                              )
                            </td>
                          );
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
                      {this.state.OrignalFeeStructure.map((item, index) => {
                        if (item.fee_category == "MONTHLY") {
                          return <td>{item.amount} </td>;
                        }
                      })}
                      <td>{this.state.orignalmonthlyfee}</td>
                    </tr>
                  </tbody>
                </table>
                <h2 style={{ float: "right" }}>
                  GRAND TOTAL = {this.state.orignalgrandtotal}
                </h2>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-default"
                  data-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* end fee structure Modal */}

        {/* Print Fee receipt modal */}
        <div id="CurrentFeeReceipt" class="modal fade col-6" style={{ border: "1px solid black", paddingRight: "30px" }} role="dialog">
          <div class="modal-dialog modal-xl w-100">
            <div class="modal-content printReciept w-100 mt-3">
              <button type="button" class="close d-none" data-dismiss="modal">
                &times;
              </button>
              <div className="moda-body" style={{ border: "1px solid black" }}>
                <div className="row">
                  <div className="col-12">
                    <div className="col-12 text-center pb-2">
                      <h3 className="m-1">
                        CONSTANCIA SCHOOL
                      </h3>
                      {this.state.AllOldFees.map((item, index) => {
                        // if(item.security_fee !='0' ){
                        // if(item.prospectus_fee !='0' || item.registration_fee !='0'  || item.admission_fee !='0'  || item.security_fee !='0' ){
                        return (
                          <div>
                            {item.security_fee != "0" ? (
                              <h4 className="w-100">
                                {" "}
                                Security Dep-{item.security_fee}
                              </h4>
                            ) : null}
                          </div>
                        );
                        // }
                      })}
                      {this.state.is_teacher_ward == "true" ? (
                        <h4 className="w-100"> Security Dep- 0</h4>
                      ) : null}
                      {/* <p>WEST CANAL ROAD P.O MAJRA, DEHRADUN</p>
                                    <p>0135-2640930,0135-2642828,FAX:0135-2644353</p> */}
                    </div>
                    <div className="col-12 text-center pb-1">
                      <h5 className="m-1">Majra, Dehradun(UK), Ph : 0135-2640177</h5>
                    </div>
                    <div className="col-12 text-center pb-1">
                      <h5 className="m-1">Session 2023-2024</h5>
                    </div>
                    <div className="col-12 text-center pb-1" style={{ borderTop: "1px solid black", borderBottom: "1px solid black" }}>
                      <h5 className="m-1">Fee Receipt</h5>
                    </div>
                    <div className="col-12 mt-2">
                      <div className="row">
                        <div className="col-6 p-0">
                          <div className="d-flex align-items-center">
                            <h5>Receipt No</h5>
                            {
                              this.state.AllOldFees.length > 0 && this.state.AllOldFees.map((item, index) => {
                                if (this.state.AllOldFees.length - 1 == index) {
                                  return (
                                    <span>.  {item.receipt_no}</span>
                                  )
                                }
                                return null;
                              })
                            }
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="d-flex align-items-center">
                            <h5>Admission No.</h5>
                            {
                              this.state.AllOldFees.length > 0 && this.state.AllOldFees.map((item, index) => {
                                if (this.state.AllOldFees.length - 1 == index) {
                                  return (
                                    <span className="ml-2">{item.admission_no}</span>
                                  )
                                }
                                return null;
                              })
                            }
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 mt-2 pt-1">
                      <div className="row">
                        <div className="col-6 d-flex align-items-center">
                          <h5>Month </h5>
                          {
                            this.state.allready_fee_paided_student == "S/W" ?
                              this.state.AllStudent.length > 0 && this.state.AllStudent.map((item, index) => {
                                if (this.state.AllStudent.length - 1 == index) {
                                  return (
                                    <span> : {Moment(item.receipt_date).format("MM") == "1" ? "Jan" + "-" + Moment(item.receipt_date).format("YYYY")
                                      : Moment(item.receipt_date).format("MM") == "2" ? "Feb" + "-" + Moment(item.receipt_date).format("YYYY")
                                      : Moment(item.receipt_date).format("MM") == "3" ? "March" + "-" + Moment(item.receipt_date).format("YYYY")
                                      : Moment(item.receipt_date).format("MM") == "4" ? "Apr" + "-" + Moment(item.receipt_date).format("YYYY")
                                      : Moment(item.receipt_date).format("MM") == "5" ? "May" + "-" + Moment(item.receipt_date).format("YYYY")
                                      : Moment(item.receipt_date).format("MM") == "6" ? "Jun" + "-" + Moment(item.receipt_date).format("YYYY")
                                      : Moment(item.receipt_date).format("MM") == "7" ? "July" + "-" + Moment(item.receipt_date).format("YYYY")
                                      : Moment(item.receipt_date).format("MM") == "8" ? "Aug" + "-" + Moment(item.receipt_date).format("YYYY")
                                      : Moment(item.receipt_date).format("MM") == "9" ? "Sep" + "-" + Moment(item.receipt_date).format("YYYY")
                                      : Moment(item.receipt_date).format("MM") == "10" ? "Oct" + "-" + Moment(item.receipt_date).format("YYYY")
                                      : Moment(item.receipt_date).format("MM") == "11" ? "Nov" + "-" + Moment(item.receipt_date).format("YYYY")
                                      : Moment(item.receipt_date).format("MM") == "12" ? "Dec" + "-" + Moment(item.receipt_date).format("YYYY")
                                      : null
                                    }
                                    </span>
                                  )
                                }
                                return null;
                              })
                              :
                              this.state.AllOldFees.length > 1 && this.state.last_session != this.state.session  ?
                                   <span className="ml-2">Apr {this.state.session.substring(0, 4)}-</span>
                              :
                                this.state.AllOldFees.length > 1 ? this.state.AllOldFees.map((item, index) => {
                                if (this.state.AllOldFees.length - 2 == index) {
                                  if(Moment(item?.last_fee_date).format("MM") === "12") 
                                  {
                                    return   <span className="ml-2">
                                    {Number(Moment(item?.last_fee_date).format("MM")) + 1 == 13
                                      ? `Jan ${Number(Moment(item.last_fee_date).format("YYYY")) + 1} - `
                                      : null
                                    }
                                  </span>
                                  }
                                  else{
                                    return (
                                      <>
                                        <span className="ml-2">
                                          {Number(Moment(item?.last_fee_date).format("MM")) + 1 == "1"
                                            ? "Jan" + " " + Moment(item.last_fee_date).format("YYYY") +
                                            " - "
                                            : Number(Moment(item?.last_fee_date).format("MM"))  + 1 == "2"
                                              ? "Feb" + " " + Moment(item.last_fee_date).format("YYYY") +
                                              " - "
                                              : Number(Moment(item?.last_fee_date).format("MM"))  + 1 == "3"
                                                ? "Mar" + " " + Moment(item.last_fee_date).format("YYYY") +
                                                " - "
                                                : Number(Moment(item?.last_fee_date).format("MM"))  + 1 == "4"
                                                  ? "Apr" + " " + Moment(item.last_fee_date).format("YYYY") +
                                                  " - "
                                                  : Number(Moment(item?.last_fee_date).format("MM"))  + 1 == "5"
                                                    ? "May" + " " + Moment(item.last_fee_date).format("YYYY") +
                                                    " - "
                                                    : Number(Moment(item?.last_fee_date).format("MM"))  + 1 == "6"
                                                      ? "Jun" + " " + Moment(item.last_fee_date).format("YYYY") +
                                                      " - "
                                                      : Number(Moment(item?.last_fee_date).format("MM"))  + 1 == "7"
                                                        ? "July" + " " + Moment(item.last_fee_date).format("YYYY") +
                                                        " - "
                                                        : Number(Moment(item?.last_fee_date).format("MM"))  + 1 == "8"
                                                          ? "Aug" + " " + Moment(item.last_fee_date).format("YYYY") +
                                                          " - "
                                                          : Number(Moment(item?.last_fee_date).format("MM"))  + 1 == "9"
                                                            ? "Sept" + " " + Moment(item.last_fee_date).format("YYYY") +
                                                            " - "
                                                            : Number(Moment(item?.last_fee_date).format("MM")) + 1 == "10"
                                                              ? "Oct" + " " + Moment(item.last_fee_date).format("YYYY") +
                                                              " - "
                                                              : Number(Moment(item?.last_fee_date).format("MM")) + 1 == "11"
                                                                ? "Nov" + " " + Moment(item.last_fee_date).format("YYYY") +
                                                                " - "
                                                                : Number(Moment(item?.last_fee_date).format("MM")) + 1 == "12"
                                                                  ? "Dec" + " " + Moment(item.last_fee_date).format("YYYY") +
                                                                  " - "
                                                                  : null
                                          }
                                        </span>
                                      </>
                                    )
                                  }
                                }
                              })
                                :
                                <span className="ml-2">Apr {this.state.session.substring(0, 4)}-</span>
                          }
                          {
                            this.state.allready_fee_paided_student == "S/W" ? null :
                              this.state.AllOldFees.length > 0 && this.state.AllOldFees.map((item, index) => {
                                if (this.state.AllOldFees.length > 0 && this.state.AllOldFees.length - 1 == index) {
                                  return (
                                    <>
                                      <span className="ml-2">
                                      {Moment(item.last_fee_date).format("MMM YYYY")}
                                      </span>
                                    </>
                                  )
                                }
                              })
                          }
                        </div>
                        <div className="col-6">
                          <div className="d-flex align-items-center">
                            <h5>Date</h5>
                            {
                              this.state.AllOldFees.length > 0 && this.state.AllOldFees.map((item, index) => {
                                if (this.state.AllOldFees.length - 1 == index) {
                                  return (
                                    <span> : {Moment(item.receipt_date).format("DD-MM-YYYY")}</span>
                                  )
                                }
                                return null;
                              })
                            }
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 mt-2 ">
                      <div className="row">
                        <div className="col-6 d-flex align-items-center">
                          <h5>Received from</h5>
                          {
                            this.state.AllOldFees.length > 0 && this.state.AllOldFees.map((item, index) => {
                              if (this.state.AllOldFees.length - 1 == index) {
                                return (
                                  <span className="ml-2">{item.name}</span>
                                )
                              }
                              return null;
                            })
                          }
                        </div>
                        <div className="col-6 d-flex align-items-center">
                          <h5>Class</h5>
                          {
                            this.state.AllOldFees.length > 0 && this.state.AllOldFees.map((item, index) => {
                              if (this.state.AllOldFees.length - 1 == index) {
                                return (
                                  <span className="ml-2">{item.class_name} {item.section == "KG" || item.section == "PG" || item.section == "NURSERY" ? "" : item.section}</span>
                                )
                              }
                              return null;
                            })
                          }
                        </div>
                      </div>

                    </div>
                    <div className="col-12 mt-2 ">
                      <div className="row">
                        <div className="col-6 d-flex align-items-center">
                          <h5>Father's Name</h5>
                          {
                            this.state.AllStudent.length > 0 && this.state.AllStudent.map((item, index) => {
                              if (this.state.AllStudent.length - 1 == index) {
                                return (
                                  <span className="ml-2">{item.student.father_name}</span>
                                )
                              }
                              return null;
                            })
                          }
                        </div>
                        <div className="col-6 d-flex align-items-center">
                          <h5>Mother's Name</h5>
                          {
                            this.state.AllStudent.length > 0 && this.state.AllStudent.map((item, index) => {
                              if (this.state.AllStudent.length - 1 == index) {
                                return (
                                  <span className="ml-2">{item.student.mother_name}</span>
                                )
                              }
                              return null;
                            })
                          }
                        </div>
                      </div>

                    </div>
                    <div className="col-12 mt-2">
                      <table class="table print_table">
                        <tbody className="">
                          <tr>
                            <th ><h4 className="table-print-receipt">S/NO.</h4></th>
                            <th >Particulars</th>
                            <th ><h4 className="table-print-receipt">Amount</h4></th>
                            <th></th>
                          </tr>
                          {
                            this.state.allready_fee_paided_student == "S/W" ? null
                              :
                              this.state.AllOldFees.length > 0 && this.state.AllOldFees.map((item, index) => {
                                if (this.state.AllOldFees.length - 1 == index) {
                                  return (
                                    <>
                                      <tr className="currentReceiptTableRow">
                                        <td><h4 className="table-print-receipt-data">1</h4></td>
                                        <td><h4 className="table-print-receipt">Tuition Fees</h4></td>
                                        <td><p className="table-print-receipt-data">{item.paid_fees}</p></td>
                                      </tr>
                                    </>
                                  )
                                }
                              })
                          }
                          {
                            this.state.allready_fee_paided_student == "S/W" ? null
                              :
                              this.state.AllOldFees.length > 0 && this.state.AllOldFees.map((item, index) => {
                                if (this.state.AllOldFees.length - 1 == index && this.state.manualFineState == false) {
                                  return (
                                    <>
                                      <tr className="currentReceiptTableRow">
                                        <td><h4 className="table-print-receipt-data">2</h4></td>
                                        <td><h4 className="table-print-receipt">Late Fees</h4></td>
                                        <td><p className="table-print-receipt-data">{item.paid_fine > 0 ? item.paid_fine : 0}</p></td>
                                      </tr>
                                    </>
                                  )
                                }
                                return null;
                              })
                          }
                          {this.state.AllOldFees.map((item, index) => {
                            if ((this.state.AllOldFees.length - 1 == index) && (item.admission_fee > 0)) {
                              return (
                                <>
                                  <tr className="currentReceiptTableRow">
                                    <td>
                                      {
                                        <h4 className="table-print-receipt-data">
                                          {this.state.allready_fee_paided_student == "S/W" ? "1" : "3"}
                                        </h4>
                                      }
                                    </td>
                                    <td><h4 className="table-print-receipt">Admission Fees</h4></td>
                                    <td><p className="table-print-receipt-data">
                                      {item.admission_fee}
                                    </p></td>
                                  </tr>
                                </>
                              );
                            }
                            return null;
                          })}
                          {this.state.AllOldFees.map((item, index) => {
                            if ((this.state.AllOldFees.length - 1 == index) && item.registration_fee > 0) {
                              return (
                                <>
                                  <tr className="currentReceiptTableRow">
                                    <td><h4 className="table-print-receipt-data">
                                      {this.state.allready_fee_paided_student == "S/W" ? "1" : "3"}
                                    </h4></td>
                                    <td><h4 className="table-print-receipt">Registration Fees</h4></td>
                                    <td><p className="table-print-receipt-data">
                                      {item.registration_fee}
                                    </p></td>
                                  </tr>
                                </>
                              );
                            }
                            return null;
                          })}
                           {this.state.AllOldFees.map((item, index) => {
                            if ((this.state.AllOldFees.length - 1 == index) && item.paid_previous_year_fees > 0) {
                              return (
                                <>
                                  <tr className="currentReceiptTableRow">
                                    <td><h4 className="table-print-receipt-data">
                                      {this.state.allready_fee_paided_student == "S/W" ? "1" : "3"}
                                    </h4></td>
                                    <td><h4 className="table-print-receipt">Paid Previous year Fees</h4></td>
                                    <td><p className="table-print-receipt-data">
                                      {item.paid_previous_year_fees}
                                    </p></td>
                                  </tr>
                                </>
                              );
                            }
                            return null;
                          })}
                                                     {this.state.AllOldFees.map((item, index) => {
                            if ((this.state.AllOldFees.length - 1 == index) && item.paid_previous_year_fine > 0) {
                              return (
                                <>
                                  <tr className="currentReceiptTableRow">
                                    <td><h4 className="table-print-receipt-data">
                                      {this.state.allready_fee_paided_student == "S/W" ? "1" : "3"}
                                    </h4></td>
                                    <td><h4 className="table-print-receipt">Paid Previous year Fine</h4></td>
                                    <td><p className="table-print-receipt-data">
                                      {item.paid_previous_year_fine}
                                    </p></td>
                                  </tr>
                                </>
                              );
                            }
                            return null;
                          })}
                          {this.state.AllOldFees.map((item, index) => {
                            if ((this.state.AllOldFees.length - 1 == index) && item.annual_terms_fee > 0) {
                              return (
                                <>
                                  <tr className="currentReceiptTableRow">
                                    <td><h4 className="table-print-receipt-data">
                                      {this.state.allready_fee_paided_student == "S/W" ? "1" : "3"}
                                    </h4></td>
                                    <td><h4 className="table-print-receipt">Term Fees(Games,Library,Other Activites)</h4></td>
                                    <td><p className="table-print-receipt-data">
                                      {item.annual_terms_fee}
                                    </p></td>
                                  </tr>
                                </>
                              );
                            }
                            return null;
                          })}
                          {this.state.AllOldFees.map((item, index) => {
                            if ((this.state.AllOldFees.length - 1 == index) && item.examination_fee > 0) {
                              return (
                                <>
                                  <tr className="currentReceiptTableRow">
                                    <td><h4 className="table-print-receipt-data">
                                      {this.state.allready_fee_paided_student == "S/W" ? "1" : "3"}
                                    </h4></td>
                                    <td><h4 className="table-print-receipt">Examination Fees</h4></td>
                                    <td><p className="table-print-receipt-data">
                                      {item.examination_fee}
                                    </p></td>
                                  </tr>
                                </>
                              );
                            }
                            return null;
                          })}
                          <tr className="currentReceiptTableRow">
                            <td><h4 className="table-print-receipt">Total Paid Amount</h4></td>
                            <td><p className="table-print-receipt-data"></p></td>
                            <td><p className="table-print-receipt-data">
                              {
                                this.state.AllOldFees.length > 0 && this.state.AllOldFees.map((item, index) => {
                                  if (this.state.AllOldFees.length - 1 == index) {
                                    return item.paid_amount;
                                  }
                                })
                              }
                            </p></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div className="col-12 mt-2 ">
                      <div className="row">
                        <div className="col-5 d-flex align-items-center p-0">
                          <h5>Amount Received Rupees</h5>
                        </div>
                        <div className="col-7 d-flex align-items-center  p-0" style={{ position: "relative", right: "16px" }}>
                          {this.state.AllOldFees.length > 0 && this.state.AllOldFees.map((item, index) => {
                            if (this.state.AllOldFees.length - 1 == index) {
                              return (
                                <span className="ml-2 m">{this.numberToWords(item.paid_amount)} only </span>
                              )
                            }
                            return null
                          })}
                        </div>
                      </div>
                      <div className="col-12 d-flex align-items-center mt-1 p-0" >
                        <h5 className="ml-2"> through CASH / UPI / BANK.</h5>
                      </div>
                    </div>

                    <div className="col-12 mt-3">
                      <div className="d-flex align-items-center">
                        <h6 className="table-print-receipt">Balance Due as on Date is RS</h6>
                        <span style={{ fontSize: "11px", marginLeft: "5px" }}> {this.state.AllOldFees.length > 0 &&
                          this.state.AllOldFees.map((item, index) => {
                            if (this.state.AllOldFees.length - 1 == index) {
                              return Number(item.dues_fee) + Number(item.dues_fine);
                            }
                          })}
                          .
                        </span>
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="text-right mr-5" style={{ marginTop: "50px" }}>
                        <h5>For Principal</h5>
                      </div>
                    </div>
                    <div className="col-12 mt-3 mb-2">
                      <div className="d-flex align-items-center">
                        <h5 style={{ fontWeight: "bold", fontSize: "15px" }}>Note :</h5><sapn>Fee Once Paid is Not Refundable Or Transferable</sapn>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="text-right mt-2">
                <button
                  class="hide-on-print btn btn-success btn-md mr-2"
                  onClick={this.printReceipt}
                >
                  Print
                </button>
                <button
                  type="button"
                  class="btn btn-default mr-2"
                  data-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Print Fee receipt modal */}

        <div className="row">
          <div className="col-12">
            <div className="row ReceiptLayoutCard">
              <div className="col-12">
                <div className="form-row">
                  <div className="col-3 form-group" style={{ marginBottom: "0px" }}>
                    <div className="form-row">
                      <div className="col-4 form-group" style={{ marginBottom: "0px" }}>
                        <label>Session *</label>
                      </div>
                      <div className="col-8 form-group " style={{ marginBottom: "0px" }} id="focusguard-1">
                        <select
                          className=""
                          value={this.state.session}
                          onChange={(e) => {
                            this.setState({
                              session: e.target.value.toUpperCase(),
                              sessionErrorMessage: undefined,
                            });
                          }}
                        >
                          <option value="">Select Session</option>
                          {this.state.AllSession.map((item, index) => {
                            return (
                              <option value={item.session_code}>
                                {item.session_code}
                              </option>
                            );
                          })}
                        </select>
                        <span
                          className="errorMessage"
                          style={{ fontSize: "14px", fontWeight: 600 }}
                        >
                          {this.state.sessionErrorMessage}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-3 form-group" style={{ marginBottom: "0px" }}>
                    <div className="form-row">
                      <div className="col-4 form-group">
                        <label id="recpddate" className="bg-primary text-white">
                          Recp_Date
                        </label>
                      </div>
                      <div className="col-8 form-group " style={{ marginBottom: "0px" }} id="focusguard-1">
                        <input
                          type="date"
                          className="w-100"
                          id="firstInput"
                          value={this.state.receipt_date}
                          onChange={(e) => {
                            this.setState({
                              receipt_date: e.target.value.toUpperCase(),
                            });
                          }}
                        />
                        <span
                          className="errorMessage"
                          style={{ fontSize: "14px", fontWeight: 600 }}
                        >
                          {this.state.receipt_dateErrorMessage}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-3 form-group" style={{ marginBottom: "0px" }}>
                    <div className="form-row">
                      <div className="col-4 form-group" style={{ marginBottom: "0px" }}>
                        <label>Admn No </label>
                      </div>
                      <div className="col-8 form-group" style={{ marginBottom: "0px" }}>
                        <input
                          type="text"
                          id="admissionno"
                          value={this.state.admission_no}
                          onFocus={(e) => {
                            this.handleFocusInput(e);
                          }}
                          onChange={(e) => {
                            const newValue = e.target.value;
                            this.setState({
                              admission_no: newValue,
                              admission_noErrorMessage: undefined,
                            }, () => {
                              if (newValue) {
                                this.searchByAdmission_no(e);
                              } else {
                                this.setState({
                                  annual: false,
                                });
                              }
                            });
                          }}
                          onKeyPress={(e) => {
                            if (e.key === "Enter") {
                              this.searchByAdmission_no(e);
                            }
                          }}
                          tabIndex="2" // corrected attribute name to tabIndex
                          className="w-50"
                        />


                        <button
                          type="button"
                          onClick={() => {
                            this.getStudent();
                          }}
                          class="btn btn-success btn-sm ml-2"
                          data-toggle="modal"
                          data-target="#AllModalStudent"
                        >
                          ...
                        </button>
                        <span
                          className="errorMessage"
                          style={{ fontSize: "14px", fontWeight: 600 }}
                        >
                          {this.state.admission_noErrorMessage}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="col-3 form-group" style={{ marginBottom: "0px" }}>
                    <div className="form-row">
                      <div className="col-4 form-group" style={{ marginBottom: "0px" }}>
                        <label>Recp_No </label>
                      </div>
                      <div className="col-8 form-group" style={{ marginBottom: "0px" }}>
                        <input
                          type="text"
                          value={this.state.receipt_no}
                          onChange={(e) => {
                            this.setState({
                              receipt_no: e.target.value.toUpperCase(),
                            });
                          }}
                          className="w-100"
                        />
                      </div>
                    </div>
                  </div>
                  {/* <div className="col-3 form-group">
                            <label>Ref Receipt No *</label>
                            <input type="text" onChange={(e)=>{this.setState({ref_receipt_no:e.target.value.toUpperCase()})}} className="" />
                        </div> */}
                  <div className="col-4 form-group">
                    <div className="form-row">
                      <div className="col-4 form-group" style={{ marginBottom: "0px" }}>
                        <label>Account No </label>
                      </div>
                      <div className="col-6 form-group" style={{ marginBottom: "0px" }}>
                        <input
                          type="text"
                          value={this.state.account_no}
                          onChange={(e) => {
                            this.setState({
                              account_no: e.target.value.toUpperCase(),
                              account_noErrorMessage: undefined,
                            });
                            this.viewParent();
                          }}
                          onClick={(e) => {
                            this.viewParent(e);
                          }}
                          className="w-100"
                        />
                        <span
                          className="errorMessage"
                          style={{ fontSize: "14px", fontWeight: 600 }}
                        >
                          {this.state.account_noErrorMessage}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-4 form-group" style={{ marginBottom: "0px" }}>
                    <div className="form-row">
                      <div className="col-4 form-group" style={{ marginBottom: "0px" }}>
                        <label>Payment</label>
                      </div>
                      <div className="col-8 form-group" style={{ marginBottom: "0px" }}>
                        <label>CASH   </label>
                        <input
                          type="radio"
                          className=""
                          checked={this.state.payment_mode === "CASH"} name="payment_mode"
                          value="CASH"
                          onChange={(e) => this.handlePaymentModeChange(e)}
                        />
                        <label>  BANK  </label>
                        <input
                          type="radio"
                          className=""
                          checked={this.state.payment_mode === "BANK"} name="payment_mode"
                          value="BANK"
                          onChange={(e) => this.handlePaymentModeChange(e)}
                        />
                        {/* <label>  UPI</label>
                        <input
                          type="radio"
                          className=""
                          checked
                          name="payment_mode"
                          value="UPI"
                          onChange={(e) => {
                            this.setState({
                              payment_mode: e.target.value.toUpperCase(),
                            });
                          }}
                        /> */}
                      </div>
                    </div>
                  </div>
                  <div className="col-4 form-group" style={{ marginBottom: "0px" }}>
                    <div className="form-row">
                      <div className="col-4 form-group" style={{ marginBottom: "0px" }}>
                        <label>Select Bank</label>
                      </div>
                      <div className="col-8 form-group" style={{ marginBottom: "0px" }}>
                        <select
                          onChange={(e) => {
                            this.setState({
                              bank: e.target.value.toUpperCase(),
                              bankErrorMessage: undefined,
                            });
                          }}
                          value={this.state.bank}
                          onBlur={(e) => {
                            localStorage.setItem("R_bank", e.target.value);
                          }}
                          id="selectbank"
                          tabindex="3"
                        >
                          <option value="">Choose Bank</option>
                          {this.state.AllBank.map((item, index) => {
                            return (
                              <option value={item.bank}>{item.bank}</option>
                            );
                          })}
                        </select>
                        <span
                          className="errorMessage"
                          style={{ fontSize: "14px", fontWeight: 600 }}
                        >
                          {this.state.bankErrorMessage}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-1 form-group" style={{ marginBottom: "10px" }}>
                    <button
                      type="button"
                      class="btn btn-info btn-sm"
                      data-toggle="modal"
                      data-target="#OldFeeModal"
                    >
                      Fee Details
                    </button>
                    {/* <button type="button" onClick={()=>{this.ShowModalStudent(this.state.admission_no);this.setState({admission_no:this.state.admission_no});this.searchByAdmission_no()}} class="btn btn-info btn-sm" data-toggle="modal" data-target="#OldFeeModal">Fee Details</button>    */}
                  </div>
                  <div className="col-1 form-group ml-4" style={{ marginBottom: "10px" }}>
                    <button
                      type="button"
                      class="btn btn-info btn-sm"
                      data-toggle="modal"
                      data-target="#CurrentFeeReceipt"
                    >
                      Fee Receipt
                    </button>
                    {/* <button type="button" onClick={()=>{this.ShowModalStudent(this.state.admission_no);this.setState({admission_no:this.state.admission_no});this.searchByAdmission_no()}} class="btn btn-info btn-sm" data-toggle="modal" data-target="#OldFeeModal">Fee Details</button>    */}
                  </div>
                  {/* <div className="col-4 form-group">
                            <label>Bank V No</label>
                            <input type="text" className="" defaultValue="0" value={this.state.bank_v_no} onChange={(e)=>{this.setState({bank_v_no:e.target.value.toUpperCase()})}}/>
                        </div>
                        <div className="col-4 form-group">
                            <label>Check No</label>
                            <input type="text" className="" defaultValue="0" value={this.state.check_no} onChange={(e)=>{this.setState({check_no:e.target.value.toUpperCase()})}}/>
                        </div> */}

                  {this?.state?.AllStudent?.length > 0 && (
                    <>
                      <table class="table" id="FeeTransectionDate">
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
                          {this.state.admission_no && this.state.AllStudent.map((item, index) => {
                            if (item.admission_no != countAdmission_no) {
                              countAdmission_no = item.admission_no;
                              return (
                                <tr
                                  className={
                                    (item.class_name == "12SCI" ||
                                      item.class_name == "12COM") &&
                                      item.session != this.state.session &&
                                      item.student.tc_status == 0
                                      ? "bg-primary"
                                      : item.student.tc_status == 1
                                        ? "bg-danger"
                                        : item.student.tc_status == "sos"
                                          ? "bg-primary"
                                          : null
                                  }
                                >
                                  {/* <tr  className={item.student.tc_status==1 ? "bg-danger":null}> */}
                                  <td>{item.admission_no}</td>
                                  <td>{item.account_no}</td>
                                  <td>{item.student.name}</td>
                                  <td>
                                    {item.class_name}-{item.section}
                                  </td>
                                  <td>
                                    {item.student.father_name} /{" "}
                                    {item.student.mother_name}
                                  </td>
                                  <td>{item.student.parent_mobile}</td>
                                  <td>
                                    <button
                                      type="button"
                                      className="btn btn-info btn-sm"
                                      onClick={(e) => {
                                        this.viewParent();
                                      }}
                                    >
                                      Get Details
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        this.ShowModal(item.admission_no);
                                      }}
                                      class="btn btn-info btn-sm ml-2"
                                      data-toggle="modal"
                                      data-target="#myModal"
                                    >
                                      Show
                                    </button>
                                  </td>
                                </tr>
                              );
                            }
                          })}
                        </tbody>
                      </table>
                      {this.state.allready_fee_paided_student == ""
                        ?
                        <div className="col-2 ">
                          <label
                            style={{
                              backgroundColor: "#000a80",
                              color: "white",
                              padding: "5px",
                            }}
                          >
                            Paid Upto :{" "}
                            {Moment(this.state.admission_no ? this.state.last_fees_date : "").format("M") == "1"
                              ? "Jan " +
                              Moment(this.state.admission_no ? this.state.last_fees_date : "").format("YYYY")
                              : Moment(this.state.admission_no ? this.state.last_fees_date : "").format("M") == "2"
                                ? "Feb " +
                                Moment(this.state.admission_no ? this.state.last_fees_date : "").format("YYYY")
                                : Moment(this.state.admission_no ? this.state.last_fees_date : "").format("M") == "3"
                                  ? "Mar " +
                                  Moment(this.state.admission_no ? this.state.last_fees_date : "").format("YYYY")
                                  : Moment(this.state.admission_no ? this.state.last_fees_date : "").format("M") == "4"
                                    ? "Apr " +
                                    Moment(this.state.admission_no ? this.state.last_fees_date : "").format("YYYY")
                                    : Moment(this.state.admission_no ? this.state.last_fees_date : "").format("M") == "5"
                                      ? "May " +
                                      Moment(this.state.admission_no ? this.state.last_fees_date : "").format("YYYY")
                                      : Moment(this.state.admission_no ? this.state.last_fees_date : "").format("M") == "6"
                                        ? "Jun " +
                                        Moment(this.state.admission_no ? this.state.last_fees_date : "").format("YYYY")
                                        : Moment(this.state.admission_no ? this.state.last_fees_date : "").format("M") == "7"
                                          ? "July " +
                                          Moment(this.state.admission_no ? this.state.last_fees_date : "").format("YYYY")
                                          : Moment(this.state.admission_no ? this.state.last_fees_date : "").format("M") == "8"
                                            ? "Aug " +
                                            Moment(this.state.admission_no ? this.state.last_fees_date : "").format("YYYY")
                                            : Moment(this.state.admission_no ? this.state.last_fees_date : "").format("M") == "9"
                                              ? "Sept " +
                                              Moment(this.state.admission_no ? this.state.last_fees_date : "").format("YYYY")
                                              : Moment(this.state.admission_no ? this.state.last_fees_date : "").format("M") == "10"
                                                ? "Oct " +
                                                Moment(this.state.admission_no ? this.state.last_fees_date : "").format("YYYY")
                                                : Moment(this.state.admission_no ? this.state.last_fees_date : "").format("M") == "11"
                                                  ? "Nov " +
                                                  Moment(this.state.admission_no ? this.state.last_fees_date : "").format("YYYY")
                                                  : Moment(this.state.admission_no ? this.state.last_fees_date : "").format("M") == "12"
                                                    ? "Dec " +
                                                    Moment(this.state.admission_no ? this.state.last_fees_date : "").format("YYYY")
                                                    : null}
                          </label>
                        </div>
                        :
                        <div className="col-2 ">
                          <label
                            style={{
                              backgroundColor: "#000a80",
                              color: "white",
                              padding: "5px",
                            }}
                          >
                            Paid Upto :{" "}
                            {this.state.allready_fee_paided_student}
                          </label>
                        </div>
                      }
                      {/* } */}
                      <div className="col-2 ">
                        {
                          this.state.admission_no ?
                            <label>
                              Fee From :
                              {this.state.fromtomonths[0] == "1"
                                ? "Jan " +
                                Moment(this.state.feemonths[0]).format("YYYY")
                                : this.state.fromtomonths[0] == "2"
                                  ? "Feb " +
                                  Moment(this.state.feemonths[0]).format("YYYY")
                                  : this.state.fromtomonths[0] == "3"
                                    ? "Mar " +
                                    Moment(this.state.feemonths[0]).format("YYYY")
                                    : this.state.fromtomonths[0] == "4"
                                      ? "Apr " +
                                      Moment(this.state.feemonths[0]).format("YYYY")
                                      : this.state.fromtomonths[0] == "5"
                                        ? "May " +
                                        Moment(this.state.feemonths[0]).format("YYYY")
                                        : this.state.fromtomonths[0] == "6"
                                          ? "Jun " +
                                          Moment(this.state.feemonths[0]).format("YYYY")
                                          : this.state.fromtomonths[0] == "7"
                                            ? "July " +
                                            Moment(this.state.feemonths[0]).format("YYYY")
                                            : this.state.fromtomonths[0] == "8"
                                              ? "Aug " +
                                              Moment(this.state.feemonths[0]).format("YYYY")
                                              : this.state.fromtomonths[0] == "9"
                                                ? "Sept " +
                                                Moment(this.state.feemonths[0]).format("YYYY")
                                                : this.state.fromtomonths[0] == "10"
                                                  ? "Oct " +
                                                  Moment(this.state.feemonths[0]).format("YYYY")
                                                  : this.state.fromtomonths[0] == "11"
                                                    ? "Nov " +
                                                    Moment(this.state.feemonths[0]).format("YYYY")
                                                    : this.state.fromtomonths[
                                                      this.state.fromtomonths.length - 1
                                                    ] == "12"
                                                      ? "Dec " +
                                                      Moment(
                                                        this.state.feemonths[
                                                        this.state.fromtomonths.length - 1
                                                        ]
                                                      ).format("YYYY") : null}

                            </label> :
                            <label>
                              Fee From :
                            </label>
                        }

                      </div>
                      <div className="col-2 ">
                        {
                          this.state.admission_no ?
                            <label>
                              Fee To :
                              {this.state.fromtomonths[
                                this.state.fromtomonths.length - 1
                              ] == "1"
                                ? "Jan " +
                                Moment(
                                  this.state.feemonths[
                                  this.state.fromtomonths.length - 1
                                  ]
                                ).format("YYYY")
                                : this.state.fromtomonths[
                                  this.state.fromtomonths.length - 1
                                ] == "2"
                                  ? "Feb " +
                                  Moment(
                                    this.state.feemonths[
                                    this.state.fromtomonths.length - 1
                                    ]
                                  ).format("YYYY")
                                  : this.state.fromtomonths[
                                    this.state.fromtomonths.length - 1
                                  ] == "3"
                                    ? "Mar " +
                                    Moment(
                                      this.state.feemonths[
                                      this.state.fromtomonths.length - 1
                                      ]
                                    ).format("YYYY")
                                    : this.state.fromtomonths[
                                      this.state.fromtomonths.length - 1
                                    ] == "4"
                                      ? "Apr " +
                                      Moment(
                                        this.state.feemonths[
                                        this.state.fromtomonths.length - 1
                                        ]
                                      ).format("YYYY")
                                      : this.state.fromtomonths[
                                        this.state.fromtomonths.length - 1
                                      ] == "5"
                                        ? "May " +
                                        Moment(
                                          this.state.feemonths[
                                          this.state.fromtomonths.length - 1
                                          ]
                                        ).format("YYYY")
                                        : this.state.fromtomonths[
                                          this.state.fromtomonths.length - 1
                                        ] == "6"
                                          ? "Jun " +
                                          Moment(
                                            this.state.feemonths[
                                            this.state.fromtomonths.length - 1
                                            ]
                                          ).format("YYYY")
                                          : this.state.fromtomonths[
                                            this.state.fromtomonths.length - 1
                                          ] == "7"
                                            ? "July " +
                                            Moment(
                                              this.state.feemonths[
                                              this.state.fromtomonths.length - 1
                                              ]
                                            ).format("YYYY")
                                            : this.state.fromtomonths[
                                              this.state.fromtomonths.length - 1
                                            ] == "8"
                                              ? "Aug " +
                                              Moment(
                                                this.state.feemonths[
                                                this.state.fromtomonths.length - 1
                                                ]
                                              ).format("YYYY")
                                              : this.state.fromtomonths[
                                                this.state.fromtomonths.length - 1
                                              ] == "9"
                                                ? "Sept " +
                                                Moment(
                                                  this.state.feemonths[
                                                  this.state.fromtomonths.length - 1
                                                  ]
                                                ).format("YYYY")
                                                : this.state.fromtomonths[
                                                  this.state.fromtomonths.length - 1
                                                ] == "10"
                                                  ? "Oct " +
                                                  Moment(
                                                    this.state.feemonths[
                                                    this.state.fromtomonths.length - 1
                                                    ]
                                                  ).format("YYYY")
                                                  : this.state.fromtomonths[
                                                    this.state.fromtomonths.length - 1
                                                  ] == "11"
                                                    ? "Nov " +
                                                    Moment(
                                                      this.state.feemonths[
                                                      this.state.fromtomonths.length - 1
                                                      ]
                                                    ).format("YYYY")
                                                    : this.state.fromtomonths[
                                                      this.state.fromtomonths.length - 1
                                                    ] == "12"
                                                      ? "Dec " +
                                                      Moment(
                                                        this.state.feemonths[
                                                        this.state.fromtomonths.length - 1
                                                        ]
                                                      ).format("YYYY") : null}
                            </label>
                            :
                            <label>
                              Fee To :
                            </label>
                        }

                      </div>
                      <div className="col-2">
                        <label>Surplus : {this.state.surplus}</label>
                      </div>
                      <div className="col-2 ">
                        <label>Dues : {Number(this.state.AllDueFees) > 0 ? Number(this.state.AllDueFees) : 0}</label>
                      </div>
                      <div className="col-2 ">
                        <label>Fee Concession : {this.state.fee_concession ? this.state.fee_concession : 0}</label>
                      </div>

                      {/* next row */}
                      <div className="col-2 ">
                        <th>
                          Month :{" "}
                          <input
                            type="text"
                            className="w-25"
                            onFocus={(e) => {
                              this.handleFocusInput(e);
                            }}
                            value={this.state.fromtomonths.length}
                            onChange={(e) => {
                              this.ChangeFeeDate(e);
                            }}
                          // disabled
                          />
                        </th>
                      </div>
                      <div className="col-2 ">
                        <label>
                          COMPUTER :{" "}
                          {this.state.take_computer == "true" ? "YES" : "NO"}
                        </label>
                      </div>
                      <div className="col-2 ">
                        <label>
                          TRANSPORT :{" "}
                          {this.state.avail_transport == "true" ? "YES" : "NO"}
                        </label>
                      </div>
                      <div className="col-2 ">
                        <label>
                          {" "}
                          {this.state.tc_status == "0" ? (
                            <span className="bg-success">TAKEN TC</span>
                          ) : (
                            <span className="bg-danger">TAKEN TC</span>
                          )}{" "}
                          : {this.state.tc_status == "0" ? "NO" : "YES"}
                        </label>
                      </div>
                      <div className="col-2 ">
                        <label>
                          STRUCK OF :{" "}
                          {this.state.tc_status == "true" ? "YES" : "NO"}
                        </label>
                      </div>

                    </>
                  )}
                </div>
              </div>
            </div>
            <div
              className="row ReceiptLayoutCard feesLayoutCard"
              id="AnnualSection"
            >
              <div className="col-12">
                <div className="form-row">
                  {/* <div className="col-9">
                 <h3 className="receipt_h3">One Time Fee</h3>
                </div> */}
                  <div className="col-2">
                    <button
                      className="btn btn-info btn-xs"
                      onClick={() => {
                        this.getOneTimeFee();
                      }}
                    >
                      Take One Time Fee
                    </button>
                  </div>
                  <div className="col-10">
                    <button
                      className="btn btn-success btn-xs"
                      data-toggle="modal"
                      data-target="#feestructuremodal"
                    >
                      See Orignal Fee Structure
                    </button>
                  </div>
                </div>
                {this.state.TakeOneTimeFee == true ? (
                  <div className="form-row">
                    <div className="col-12 text-center ">
                      <h3 className="receipt_h3 pb-3">
                        <u>One Time Fee</u>
                      </h3>
                    </div>
                    {this.state.Allfees.map((item, index) => {
                      if (item.fee_category == "ONE TIME") {
                        return (
                          <div className="col-4 form-group">
                            <label>{item.fee_sub_category}   </label>
                            <input
                              type="text"
                              className=""
                              defaultValue="0"
                              value={item.amount}
                              onChange={(e) => {
                                this.setState(this.SetFee(index, e));
                              }}
                            />
                          </div>
                        );
                      }
                    })}
                  </div>
                ) : null}
              </div>
              <div className="col-12">
                <div className="form-row">
                  <div className="col-12 text-center">
                    <h3 className="receipt_h3 pb-5  ">
                      <u>Annual Fee</u>
                      <span style={{ float: "right" }}>
                        <button
                          className="btn btn-danger btn-sm mb-2"
                          id="HideAnnual"
                          onClick={() => this.closeAnnualFeeModal()}
                        >
                          - Annual Fee
                        </button>
                      </span>
                    </h3>
                  </div>
                  {this.state.is_full_free_ship != "true"
                    ? this.state.Allfees.map((item, index) => {
                      if (item.fee_category == "ANNUAL") {
                        if (
                          item.fee_sub_category.includes("COMPUTER") != true
                        ) {
                          return (
                            <div className="col-4 form-group">
                              <label>{item.fee_sub_category}  </label>
                              <input
                                type="text"
                                className=""
                                defaultValue="0"
                                value={item.amount}
                                onChange={(e) => {
                                  this.setState(this.SetFee(index, e));
                                }}
                              />
                            </div>
                          );
                        } else {
                          if (this.state.take_computer == "true") {
                            return (
                              <div className="col-4 form-group">
                                <label>{item.fee_sub_category}  </label>
                                <input
                                  type="text"
                                  className=""
                                  value={item.amount}
                                  onChange={(e) => {
                                    this.setState(this.SetFee(index, e));
                                  }}
                                />
                              </div>
                            );
                          }
                        }
                      }
                    })
                    : this.state.Allfees.map((item, index) => {
                      if (item.fee_category == "ANNUAL") {
                        if (
                          item.fee_sub_category.includes("COMPUTER") != true
                        ) {
                          return (
                            <div className="col-4 form-group">
                              <label>{item.fee_sub_category}  </label>
                              <input
                                type="text"
                                className=""
                                value="0"
                                onChange={(e) => {
                                  this.setState(this.SetFee(index, e));
                                }}
                              />
                            </div>
                          );
                        } else {
                          if (this.state.take_computer == "true") {
                            return (
                              <div className="col-4 form-group">
                                <label>{item.fee_sub_category}  </label>
                                <input
                                  type="text"
                                  className=""
                                  value="0"
                                  onChange={(e) => {
                                    this.setState(this.SetFee(index, e));
                                  }}
                                />
                              </div>
                            );
                          }
                        }
                      }
                    })}
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
            </div>
            {
              this.state.allready_fee_paided_student == "" || this.state.allready_fee_paided_student == "S/W" ?
                <div className="row ReceiptLayoutCard feesLayoutCard">
                  <div className="col-12">
                    <div className="form-row">
                      <div className="col-12 text-center">
                        <h3 className="receipt_h3 pb-5 ">
                          <u>Monthly Fee Class wise</u>
                          <span style={{ float: "right" }}>
                            {
                              this.state.AllOldFees.some(item => item.annual_terms_fee > 0) ? null : (
                                <button
                                  className={`btn btn-success btn-sm ml-2 ${this.state.annual ? '' : 'd-none'}`}
                                  // id="ShowAnnual"
                                  onClick={() => this.getAnnualFeeAmount()}
                                >
                                  {this.state.showTotalAnnualFee ? "- Annual/Terms Fee" : "+ Annual/Terms Fee"}
                                </button>
                              )
                            }
                            {
                              this.state.AllOldFees.some(item => item.examination_fee > 0) ? null : (
                                <button
                                  className={`btn btn-success btn-sm ml-2 ${this.state.annual ? '' : 'd-none'}`}
                                  // id="ShowAnnual"
                                  onClick={() => this.getExaminationFeeAmount()}
                                >
                                  {this.state.showTotalExaminationFee ? "- Examination Fee" : "+ Examination fee"}
                                </button>
                              )
                            }
                            {
                              this.state.AllOldFees.some(item => item.registration_fee > 0) ? null : (
                                <button
                                  className={`btn btn-success btn-sm ml-2 ${this.state.annual ? '' : 'd-none'}`}
                                  // id="ShowAnnual"
                                  onClick={() => this.getRegistrationFeeAmount()}
                                >
                                  {this.state.showTotalRegistrationFee ? "- Registration Fee" : "+ Registration Fee"}
                                </button>
                              )
                            }
                            {
                              this.state.AllOldFees.some(item => item.admission_fee > 0) ? null : (
                                <button
                                  className={`btn btn-success btn-sm ml-2 ${this.state.annual ? '' : 'd-none'}`}
                                  // id="ShowAnnual"
                                  onClick={() => this.getAdmissionFeeAmount()}
                                >
                                  {this.state.showTotalAdmissionFee ? "- Admission Fee" : "+ Admission Fee"}
                                </button>
                              )
                            }
                          </span>
                        </h3>
                      </div>
                      {this.state.Allfees.map((item, index) => {
                        if (item.fee_category === "MONTHLY" && item.fee_sub_category === 'TUITION FEE') {
                          if (this.state.allready_fee_paided_student == "S/W") {
                            return null
                          }
                          return (
                            <div className="col-3 form-group">
                              <label>
                                {item.fee_sub_category}{" "}
                                {item.fee_sub_category == "TUITION FEE"
                                  ? "(" + this.state.admission_no ? this.state.StudentTutionFee : "" + ")"
                                  : null}

                              </label>
                              <input
                                type="text"
                                className="ml-2"
                                value={
                                  item.fee_sub_category === "TUITION FEE"
                                    ? parseInt(this.state.admission_no ? this.state.StudentTutionFee : 0) *
                                    (this.state.totalNewPaybleMonth > 0
                                      ? this.state.totalNewPaybleMonth
                                      : parseInt(this.state.feemonths.length))
                                    : this.state.admission_no
                                      ? this.state.StudentTutionFee
                                      : 0
                                }

                                onChange={(e) => {
                                  this.setState(this.SetFee(index, e));
                                }}
                                disabled
                              />
                            </div>
                          );
                          // }
                        }
                      })}
                      {
                        this.state.allready_fee_paided_student == "S/W" ? null :
                          <div className="col-2 form-group">
                            <label>
                              Fine
                            </label>
                            <input
                              className="checkbox-for-tuition-fee"
                              style={{ width: "22px" }}
                              type="checkbox"
                              onChange={(e) => {
                                this.ChangemanualFineState(e);
                              }}
                            />
                            <input
                              type="text"
                              className="defaultFine ml-2"
                              style={{ width: "30%" }}
                              value={this.state.getStudentData && this.state.admission_no ? this.state.delayFineFee : 0}
                            />
                          </div>
                      }
                      {
                        this.state.allready_fee_paided_student == "S/W" ? null :
                          <div className="col-2 form-group">
                            <label>
                              Paid_Fine
                            </label>
                            <input
                              type="text"
                              className="manualFine ml-2"
                              value={this.state.manualFine}
                              onChange={(e) => {
                                this.setState({ manualFine: e.target.value.toUpperCase() },
                                  () => {
                                    this.calculateTotalAmount();
                                  });
                                this.setBalance();
                              }}
                            />

                          </div>
                      }
                      {
                        this.state.allready_fee_paided_student == "S/W" ? null :
                          <div className="col-2 form-group">
                            <label>Total_Dues  </label>
                            <input
                              type="text"
                              style={{ backgroundColor: "blue", color: "white" }}
                              value={
                                // parseInt(this.state.remaning_balance) < 0
                                //   ? parseInt(this.state.remaning_balance) * -1
                                //   : "0"
                                this.state.getStudentData && this.state.admission_no && this.getGrandTotal() > 0 ? this.getGrandTotal() - Number(this.state.paid_total_amount) : 0

                              }
                              onChange={() => {
                                this.setState({
                                  remaning_balance: (this.getGrandTotal() - Number(this.state.paid_total_amount)) <= 0 ? Math.abs((this.getGrandTotal() - Number(this.state.paid_total_amount))) : 0
                                })
                              }}
                            />
                          </div>
                      }
                      {
                        this.state.allready_fee_paided_student == "S/W" ? null :
                          <div className="col-3 form-group">
                            <label>Paid_Fee  </label>
                            <input
                              type="text"
                              id="lastInput"
                              className=""
                              value={this.state.paid_fees}
                              onChange={(e) => {
                                this.setState({
                                  paid_fees: e.target.value.toUpperCase(),
                                }, () => {
                                  this.calculateTotalAmount();
                                });
                                this.setBalance();
                              }}
                              onKeyUp={() => {
                                this.setBalance();
                              }}
                              tabindex="4"
                            />
                          </div>
                      }
                      <div className="col-4 form-group">
                        <label>Paid_Amount  </label>
                        <input
                          type="number"
                          id="lastInput"
                          className=""
                          value={this.state.paid_total_amount}
                          onChange={(e) => {
                            this.setState({
                              paid_total_amount: e.target.value
                            });
                            // this.setBalance();
                          }}
                          onKeyUp={() => {
                            this.setBalance();
                          }}
                          tabindex="4"
                        />
                      </div>
                      {
                        this.state.pendingPreviousYearFees>0 &&
                        <div className="col-4 form-group">
                        <label>Previous year_Dues  </label>
                        <input
                          type="number"
                          id="lastInput"
                          className=""
                          value={this.state.pendingPreviousYearFees}
                          // onChange={(e) => {
                          //   this.setState({
                          //     paid_total_amount: e.target.value
                          //   });
                            // this.setBalance();
                          // }}
                          // onKeyUp={() => {
                          //   this.setBalance();
                          // }}
                          tabindex="4"
                        />
                      </div>
                      }
                         {
                        this.state.pendingPreviousYearFees>0 &&
                        <div className="col-4 form-group">
                        <label>Paid Previous year_Dues  </label>
                        <input
                          type="number"
                          // id="lastInput"
                          className=""
                          value={this.state.paidPendingPreviousYearFees}
                          onChange={(e) => {
                            this.setState({
                              paidPendingPreviousYearFees: e.target.value,
                            }, ()=>{
                              this.calculateTotalAmount();
                            });
                          }}
                          // onKeyUp={() => {
                          //   this.setBalance();
                          // }}
                          tabindex="4"
                        />
                      </div>
                      }
                      {
                        this.state.pendingPreviousYearFine>0 &&
                        <div className="col-4 form-group">
                        <label>Previous year_fine  </label>
                        <input
                          type="number"
                          id="lastInput"
                          className=""
                          value={this.state.pendingPreviousYearFine}
                          // onChange={(e) => {
                          //   this.setState({
                          //     paid_total_amount: e.target.value
                          //   });
                            // this.setBalance();
                          // }}
                          // onKeyUp={() => {
                          //   this.setBalance();
                          // }}
                          tabindex="4"
                        />
                      </div>
                      }
                                            {
                        this.state.pendingPreviousYearFine>0 &&
                        <div className="col-4 form-group">
                        <label>Paid Previous year_fine  </label>
                        <input
                          type="number"
                          id="lastInput"
                          className=""
                          value={this.state.paidPendingPreviousYearFine}
                          onChange={(e) => {
                            this.setState({
                              paidPendingPreviousYearFine: e.target.value
                            }, ()=>{
                              this.calculateTotalAmount();
                            });
                          }}
                          // onKeyUp={() => {
                          //   this.setBalance();
                          // }}
                          tabindex="4"
                        />
                      </div>
                      }
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-row">
                      {
                        this.state.showTotalAdmissionFee &&
                        <div className="col-3 form-group">
                          <label>Admission Fee </label>
                          <input
                            type="text"
                            style={{ backgroundColor: "orange" }}
                            className=""
                            value={this.state.showTotalAdmissionFee ? this.state.admission_fee : 0}
                            onChange={(e) => {
                              this.setState({ admission_fee: e.target.value.toUpperCase() },
                                () => {
                                  this.calculateTotalAmount();
                                });
                            }}
                          />
                        </div>
                      }
                      {
                        this.state.showTotalRegistrationFee &&
                        <div className="col-3 form-group">
                          <label>Registration Fee  </label>
                          <input
                            type="text"
                            style={{ backgroundColor: "orange" }}
                            className=""
                            value={this.state.showTotalRegistrationFee && this.state.admission_no ? Number(this.state.registration_fee) : 0}
                            onChange={(e) => {
                              this.setState({
                                registration_fee: e.target.value.toUpperCase(),
                              });
                            }}
                          />
                        </div>
                      }
                      {
                        this.state.showTotalAnnualFee &&
                        <div className="col-4 form-group">
                          <label>Annual / Terms Fee  </label>
                          <input
                            type="text"
                            style={{ backgroundColor: "orange" }}
                            className=""
                            value={this.state.showTotalAnnualFee && this.state.admission_no ? this.state.annual_terms_fee : 0}
                            onChange={(e) => {
                              this.setState({
                                annual_terms_fee: e.target.value.toUpperCase(),
                              },
                                () => {
                                  this.calculateTotalAmount();
                                });
                            }}
                          />
                        </div>
                      }
                      {
                        this.state.showTotalExaminationFee &&
                        <div className="col-3 form-group">
                          <label>Examination Fee  </label>
                          <input
                            type="text"
                            style={{ backgroundColor: "orange" }}
                            className=""
                            value={this.state.showTotalExaminationFee && this.state.admission_no ? this.state.examination_fee : 0}
                            onChange={(e) => {
                              this.setState({
                                examination_fee: e.target.value.toUpperCase(),
                              },
                                () => {
                                  this.calculateTotalAmount();
                                });
                            }}
                          />
                        </div>
                      }
                      {
                        this.state.allready_fee_paided_student == "S/W" ? null :
                          <div className="col-3 form-group">
                            <label>Monthly Fee  </label>
                            <input
                              type="text"
                              style={{ backgroundColor: "orange" }}
                              className=""
                              value={this.state.admission_no ? this.state.StudentTutionFee : 0}
                              onChange={(e) => {
                                this.setState({
                                  total_monthly_fee: e.target.value.toUpperCase(),
                                });
                              }}
                            />
                          </div>
                      }
                      <div className="col-3 form-group">
                        <label>Grand Total  </label>
                        <input
                          type="text"
                          style={{ backgroundColor: "orange" }}
                          className=""
                          value={
                            this.state.getStudentData && this.state.admission_no && this.getGrandTotal() > 0 ? this.getGrandTotal() : 0}
                        />
                      </div>
                      {
                        this.state.allready_fee_paided_student == "S/W" ? null :
                          <div className="col-3 form-group">
                            <label>Dues  </label>
                            <input
                              type="text"
                              style={{ backgroundColor: "red" }}
                              className="bg-danger"
                              value={

                                this.state.getStudentData && this.state.admission_no && Number(this.state.AllDueFees) > 0 ? Number(this.state.AllDueFees) : 0
                                // this.getGrandTotal()-Number(this.state.paid_fees)
                              }
                            />
                          </div>
                      }
                      {
                        this.state.allready_fee_paided_student == "S/W" ? null :
                          <div className="col-3 form-group">
                            <label>Surplus  </label>
                            <input
                              type="text"
                              className="bg-success"
                              value={
                                parseInt(this.state.remaning_balance) > 0
                                  ? this.state.remaning_balance
                                  : "0"
                              }
                            />
                          </div>
                      }
                      {/* <div className="col-4 form-group">
                            <label>Date</label>
                            <input type="date" className="" />
                        </div>  */}
                      <div className="col-6 form-group">
                        <button
                          className="btn btn-success  btn-md w-50"
                          // id="focusguard-2"
                          onClick={() => this.submitReceiptData()}
                          tabindex="5"
                        >
                          Save
                        </button>
                        <Link
                          className="btn btn-info btn-md ml-2"
                          to="/SuspensionalVoucher"
                        >
                          Suspicious Amount
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                :
                null
            }
          </div>
        </div>
      </>
    );
  }
}
export default FeeReceipt;
