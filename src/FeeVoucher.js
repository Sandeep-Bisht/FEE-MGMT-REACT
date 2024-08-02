import React from 'react';
import { Link } from "react-router-dom";
import DataTable from '@bit/adeoy.utils.data-table';
import $ from 'jquery'; 
import Moment from 'moment';
import { CSVLink, CSVDownload } from "react-csv";
var paidamountbydate = 0
var paidamountbyclass = 0
var total_annual_fee = 0
var total_one_time_fee = 0
var print_total_annual_fee = 0
var print_one_time_fee = 0
var xl_total_annual_fee = 0
var xl_total_one_time_fee = 0

var sumOfTutionFeeDetail = 0
var sumOfTutionFeeDetailSBI = 0
var sumOfTutionFeeDetailPNB = 0

var sumOfTutionFeeSummary = 0
var sumOfTutionFeeSummarySBI = 0
var sumOfTutionFeeSummaryPNB = 0

var sumOfFineDetail = 0
var sumOfFineDetailCSV = 0
var sumOfFineDetailSBII = 0
var sumOfFineDetailPNBB = 0
var sumOfFineDetailSBI = 0
var sumOfFineDetailPNB = 0

var sumOfFineSummary = 0
var sumOfFineSummarySBI = 0
var sumOfFineSummaryPNB = 0

var paidamountbySBI =0
var paidamountbyPNB =0

var paidamountSummary =0
var paidamountSummarybySBI =0
var paidamountSummarybyPNB =0

var paidamountbyPrintSBI =0
var paidamountbyPrintPNB =0

var sumOfTutionFeePrint = 0
var sumOfTutionFeePrintSBI = 0
var sumOfTutionFeePrintPNB = 0

var sumOfFinePrint = 0
var sumOfFinePrintSBI = 0
var sumOfFinePrintPNB = 0

var rowTotalDetail = 0
var rowTotalPrint = 0

var totalSuspiciousAmount = 0
var ShowtotalSuspiciousAmount = 0

var sbi_sr_no=0
var pnb_sr_no=0

var print_sbi_sr_no=0
var print_pnb_sr_no=0


var Showprint_totalSuspiciousAmount = 0
var print_totalSuspiciousAmount = 0
var SuspiciousVoucherByDatebydate = 0
var testing_data=[{
  "paid_amount":"5000",
  "Allfees" : "[{\"_id\":\"605ab3a75f0e3067241cd753\",\"fee_category\":\"ANNUAL\",\"fee_sub_category\":\"REPORT CARD AND DIARY\",\"amount\":5000,\"month\":\"4\",\"status\":\"ACTIVE\",\"createdAt\":\"2021-03-24T03:36:07.195Z\",\"updatedAt\":\"2021-03-24T03:36:07.195Z\",\"__v\":0},{\"_id\":\"605ab3d35f0e3067241cd754\",\"fee_category\":\"ANNUAL\",\"fee_sub_category\":\"ANNUAL PRIZE DAY\",\"amount\":0,\"month\":\"4\",\"status\":\"ACTIVE\",\"createdAt\":\"2021-03-24T03:36:51.313Z\",\"updatedAt\":\"2021-03-24T03:36:51.313Z\",\"__v\":0},{\"_id\":\"605ab3f95f0e3067241cd755\",\"fee_category\":\"ANNUAL\",\"fee_sub_category\":\"DEVELOPMENT FUND\",\"amount\":0,\"month\":\"7\",\"status\":\"ACTIVE\",\"createdAt\":\"2021-03-24T03:37:29.466Z\",\"updatedAt\":\"2021-03-24T03:37:29.466Z\",\"__v\":0},{\"_id\":\"605ab4145f0e3067241cd756\",\"fee_category\":\"ANNUAL\",\"fee_sub_category\":\"SCHOOL MAGAZINE\",\"amount\":0,\"month\":\"9\",\"status\":\"ACTIVE\",\"createdAt\":\"2021-03-24T03:37:56.199Z\",\"updatedAt\":\"2021-03-24T03:37:56.199Z\",\"__v\":0},{\"_id\":\"605ab44c5f0e3067241cd757\",\"fee_category\":\"ANNUAL\",\"fee_sub_category\":\"ANNUAL SPORTS DAY\",\"amount\":0,\"month\":\"11\",\"status\":\"ACTIVE\",\"createdAt\":\"2021-03-24T03:38:52.435Z\",\"updatedAt\":\"2021-03-24T03:38:52.435Z\",\"__v\":0},{\"_id\":\"605ab4665f0e3067241cd758\",\"fee_category\":\"ANNUAL\",\"fee_sub_category\":\"EXAMINATION FEE\",\"amount\":\"0\",\"month\":\"1\",\"status\":\"ACTIVE\",\"createdAt\":\"2021-03-24T03:39:18.967Z\",\"updatedAt\":\"2021-03-24T03:39:18.967Z\",\"__v\":0},{\"_id\":\"605ab47e5f0e3067241cd759\",\"fee_category\":\"ANNUAL\",\"fee_sub_category\":\"COMPUTER (1)\",\"amount\":\"0\",\"month\":\"8\",\"status\":\"ACTIVE\",\"createdAt\":\"2021-03-24T03:39:42.734Z\",\"updatedAt\":\"2021-03-24T03:39:42.734Z\",\"__v\":0},{\"_id\":\"605ab4885f0e3067241cd75a\",\"fee_category\":\"ANNUAL\",\"fee_sub_category\":\"COMPUTER (2)\",\"amount\":\"0\",\"month\":\"12\",\"status\":\"ACTIVE\",\"createdAt\":\"2021-03-24T03:39:52.971Z\",\"updatedAt\":\"2021-03-24T03:39:52.971Z\",\"__v\":0},{\"_id\":\"605ab4f25f0e3067241cd75b\",\"fee_category\":\"ANNUAL\",\"fee_sub_category\":\"REGISTRATION FEE ICSE\",\"amount\":0,\"month\":\"8\",\"status\":\"ACTIVE\",\"createdAt\":\"2021-03-24T03:41:38.949Z\",\"updatedAt\":\"2021-03-24T03:41:38.949Z\",\"__v\":0},{\"_id\":\"605ab5105f0e3067241cd75c\",\"fee_category\":\"ANNUAL\",\"fee_sub_category\":\"BOARD FEE\",\"amount\":0,\"month\":\"8\",\"status\":\"ACTIVE\",\"createdAt\":\"2021-03-24T03:42:08.362Z\",\"updatedAt\":\"2021-03-24T03:42:08.362Z\",\"__v\":0},{\"_id\":\"605ab55c5f0e3067241cd75d\",\"fee_category\":\"ONE TIME\",\"fee_sub_category\":\"PROSPECTUS FEE\",\"amount\":0,\"month\":\"\",\"status\":\"ACTIVE\",\"createdAt\":\"2021-03-24T03:43:24.314Z\",\"updatedAt\":\"2021-03-24T03:43:33.296Z\",\"__v\":0},{\"_id\":\"605ab5835f0e3067241cd75e\",\"fee_category\":\"ONE TIME\",\"fee_sub_category\":\"REGISTRATION FEE\",\"amount\":0,\"month\":\"\",\"status\":\"ACTIVE\",\"createdAt\":\"2021-03-24T03:44:03.457Z\",\"updatedAt\":\"2021-03-24T03:44:15.255Z\",\"__v\":0},{\"_id\":\"605ab5a25f0e3067241cd75f\",\"fee_category\":\"ONE TIME\",\"fee_sub_category\":\"ADMISSION FEE\",\"amount\":0,\"month\":\"\",\"status\":\"ACTIVE\",\"createdAt\":\"2021-03-24T03:44:34.711Z\",\"updatedAt\":\"2021-03-24T03:44:34.711Z\",\"__v\":0},{\"_id\":\"605ab5b75f0e3067241cd760\",\"fee_category\":\"ONE TIME\",\"fee_sub_category\":\"SECURITY FEE\",\"amount\":0,\"month\":\"\",\"status\":\"ACTIVE\",\"createdAt\":\"2021-03-24T03:44:55.709Z\",\"updatedAt\":\"2021-03-24T03:44:55.709Z\",\"__v\":0},{\"_id\":\"605ab5cc5f0e3067241cd761\",\"fee_category\":\"MONTHLY\",\"fee_sub_category\":\"TUITION FEE\",\"amount\":\"2950\",\"month\":\"\",\"status\":\"ACTIVE\",\"createdAt\":\"2021-03-24T03:45:16.306Z\",\"updatedAt\":\"2021-03-24T03:45:25.867Z\",\"__v\":0},{\"_id\":\"605ab5ee5f0e3067241cd762\",\"fee_category\":\"MONTHLY\",\"fee_sub_category\":\"BUS FARE\",\"amount\":\"0\",\"month\":\"\",\"status\":\"ACTIVE\",\"createdAt\":\"2021-03-24T03:45:50.649Z\",\"updatedAt\":\"2021-03-24T03:45:50.649Z\",\"__v\":0},{\"_id\":\"605ab6035f0e3067241cd763\",\"fee_category\":\"ANNUAL\",\"fee_sub_category\":\"MISC\",\"amount\":\"600\",\"month\":\"\",\"status\":\"ACTIVE\",\"createdAt\":\"2021-03-24T03:46:11.356Z\",\"updatedAt\":\"2021-03-24T03:46:11.356Z\",\"__v\":0}]"},
{
  "paid_amount":"10000",
  "Allfees" : "[{\"_id\":\"605ab3a75f0e3067241cd753\",\"fee_category\":\"ANNUAL\",\"fee_sub_category\":\"REPORT CARD AND DIARY\",\"amount\":0,\"month\":\"4\",\"status\":\"ACTIVE\",\"createdAt\":\"2021-03-24T03:36:07.195Z\",\"updatedAt\":\"2021-03-24T03:36:07.195Z\",\"__v\":0},{\"_id\":\"605ab3d35f0e3067241cd754\",\"fee_category\":\"ANNUAL\",\"fee_sub_category\":\"ANNUAL PRIZE DAY\",\"amount\":0,\"month\":\"4\",\"status\":\"ACTIVE\",\"createdAt\":\"2021-03-24T03:36:51.313Z\",\"updatedAt\":\"2021-03-24T03:36:51.313Z\",\"__v\":0},{\"_id\":\"605ab3f95f0e3067241cd755\",\"fee_category\":\"ANNUAL\",\"fee_sub_category\":\"DEVELOPMENT FUND\",\"amount\":0,\"month\":\"7\",\"status\":\"ACTIVE\",\"createdAt\":\"2021-03-24T03:37:29.466Z\",\"updatedAt\":\"2021-03-24T03:37:29.466Z\",\"__v\":0},{\"_id\":\"605ab4145f0e3067241cd756\",\"fee_category\":\"ANNUAL\",\"fee_sub_category\":\"SCHOOL MAGAZINE\",\"amount\":0,\"month\":\"9\",\"status\":\"ACTIVE\",\"createdAt\":\"2021-03-24T03:37:56.199Z\",\"updatedAt\":\"2021-03-24T03:37:56.199Z\",\"__v\":0},{\"_id\":\"605ab44c5f0e3067241cd757\",\"fee_category\":\"ANNUAL\",\"fee_sub_category\":\"ANNUAL SPORTS DAY\",\"amount\":0,\"month\":\"11\",\"status\":\"ACTIVE\",\"createdAt\":\"2021-03-24T03:38:52.435Z\",\"updatedAt\":\"2021-03-24T03:38:52.435Z\",\"__v\":0},{\"_id\":\"605ab4665f0e3067241cd758\",\"fee_category\":\"ANNUAL\",\"fee_sub_category\":\"EXAMINATION FEE\",\"amount\":\"0\",\"month\":\"1\",\"status\":\"ACTIVE\",\"createdAt\":\"2021-03-24T03:39:18.967Z\",\"updatedAt\":\"2021-03-24T03:39:18.967Z\",\"__v\":0},{\"_id\":\"605ab47e5f0e3067241cd759\",\"fee_category\":\"ANNUAL\",\"fee_sub_category\":\"COMPUTER (1)\",\"amount\":\"0\",\"month\":\"8\",\"status\":\"ACTIVE\",\"createdAt\":\"2021-03-24T03:39:42.734Z\",\"updatedAt\":\"2021-03-24T03:39:42.734Z\",\"__v\":0},{\"_id\":\"605ab4885f0e3067241cd75a\",\"fee_category\":\"ANNUAL\",\"fee_sub_category\":\"COMPUTER (2)\",\"amount\":\"0\",\"month\":\"12\",\"status\":\"ACTIVE\",\"createdAt\":\"2021-03-24T03:39:52.971Z\",\"updatedAt\":\"2021-03-24T03:39:52.971Z\",\"__v\":0},{\"_id\":\"605ab4f25f0e3067241cd75b\",\"fee_category\":\"ANNUAL\",\"fee_sub_category\":\"REGISTRATION FEE ICSE\",\"amount\":0,\"month\":\"8\",\"status\":\"ACTIVE\",\"createdAt\":\"2021-03-24T03:41:38.949Z\",\"updatedAt\":\"2021-03-24T03:41:38.949Z\",\"__v\":0},{\"_id\":\"605ab5105f0e3067241cd75c\",\"fee_category\":\"ANNUAL\",\"fee_sub_category\":\"BOARD FEE\",\"amount\":0,\"month\":\"8\",\"status\":\"ACTIVE\",\"createdAt\":\"2021-03-24T03:42:08.362Z\",\"updatedAt\":\"2021-03-24T03:42:08.362Z\",\"__v\":0},{\"_id\":\"605ab55c5f0e3067241cd75d\",\"fee_category\":\"ONE TIME\",\"fee_sub_category\":\"PROSPECTUS FEE\",\"amount\":0,\"month\":\"\",\"status\":\"ACTIVE\",\"createdAt\":\"2021-03-24T03:43:24.314Z\",\"updatedAt\":\"2021-03-24T03:43:33.296Z\",\"__v\":0},{\"_id\":\"605ab5835f0e3067241cd75e\",\"fee_category\":\"ONE TIME\",\"fee_sub_category\":\"REGISTRATION FEE\",\"amount\":0,\"month\":\"\",\"status\":\"ACTIVE\",\"createdAt\":\"2021-03-24T03:44:03.457Z\",\"updatedAt\":\"2021-03-24T03:44:15.255Z\",\"__v\":0},{\"_id\":\"605ab5a25f0e3067241cd75f\",\"fee_category\":\"ONE TIME\",\"fee_sub_category\":\"ADMISSION FEE\",\"amount\":0,\"month\":\"\",\"status\":\"ACTIVE\",\"createdAt\":\"2021-03-24T03:44:34.711Z\",\"updatedAt\":\"2021-03-24T03:44:34.711Z\",\"__v\":0},{\"_id\":\"605ab5b75f0e3067241cd760\",\"fee_category\":\"ONE TIME\",\"fee_sub_category\":\"SECURITY FEE\",\"amount\":0,\"month\":\"\",\"status\":\"ACTIVE\",\"createdAt\":\"2021-03-24T03:44:55.709Z\",\"updatedAt\":\"2021-03-24T03:44:55.709Z\",\"__v\":0},{\"_id\":\"605ab5cc5f0e3067241cd761\",\"fee_category\":\"MONTHLY\",\"fee_sub_category\":\"TUITION FEE\",\"amount\":\"2950\",\"month\":\"\",\"status\":\"ACTIVE\",\"createdAt\":\"2021-03-24T03:45:16.306Z\",\"updatedAt\":\"2021-03-24T03:45:25.867Z\",\"__v\":0},{\"_id\":\"605ab5ee5f0e3067241cd762\",\"fee_category\":\"MONTHLY\",\"fee_sub_category\":\"BUS FARE\",\"amount\":\"0\",\"month\":\"\",\"status\":\"ACTIVE\",\"createdAt\":\"2021-03-24T03:45:50.649Z\",\"updatedAt\":\"2021-03-24T03:45:50.649Z\",\"__v\":0},{\"_id\":\"605ab6035f0e3067241cd763\",\"fee_category\":\"ANNUAL\",\"fee_sub_category\":\"MISC\",\"amount\":\"10000\",\"month\":\"\",\"status\":\"ACTIVE\",\"createdAt\":\"2021-03-24T03:46:11.356Z\",\"updatedAt\":\"2021-03-24T03:46:11.356Z\",\"__v\":0}]"},

{
  "paid_amount":"7000",
  "Allfees" : "[{\"_id\":\"605ab3a75f0e3067241cd753\",\"fee_category\":\"ANNUAL\",\"fee_sub_category\":\"REPORT CARD AND DIARY\",\"amount\":0,\"month\":\"4\",\"status\":\"ACTIVE\",\"createdAt\":\"2021-03-24T03:36:07.195Z\",\"updatedAt\":\"2021-03-24T03:36:07.195Z\",\"__v\":0},{\"_id\":\"605ab3d35f0e3067241cd754\",\"fee_category\":\"ANNUAL\",\"fee_sub_category\":\"ANNUAL PRIZE DAY\",\"amount\":0,\"month\":\"4\",\"status\":\"ACTIVE\",\"createdAt\":\"2021-03-24T03:36:51.313Z\",\"updatedAt\":\"2021-03-24T03:36:51.313Z\",\"__v\":0},{\"_id\":\"605ab3f95f0e3067241cd755\",\"fee_category\":\"ANNUAL\",\"fee_sub_category\":\"DEVELOPMENT FUND\",\"amount\":0,\"month\":\"7\",\"status\":\"ACTIVE\",\"createdAt\":\"2021-03-24T03:37:29.466Z\",\"updatedAt\":\"2021-03-24T03:37:29.466Z\",\"__v\":0},{\"_id\":\"605ab4145f0e3067241cd756\",\"fee_category\":\"ANNUAL\",\"fee_sub_category\":\"SCHOOL MAGAZINE\",\"amount\":0,\"month\":\"9\",\"status\":\"ACTIVE\",\"createdAt\":\"2021-03-24T03:37:56.199Z\",\"updatedAt\":\"2021-03-24T03:37:56.199Z\",\"__v\":0},{\"_id\":\"605ab44c5f0e3067241cd757\",\"fee_category\":\"ANNUAL\",\"fee_sub_category\":\"ANNUAL SPORTS DAY\",\"amount\":0,\"month\":\"11\",\"status\":\"ACTIVE\",\"createdAt\":\"2021-03-24T03:38:52.435Z\",\"updatedAt\":\"2021-03-24T03:38:52.435Z\",\"__v\":0},{\"_id\":\"605ab4665f0e3067241cd758\",\"fee_category\":\"ANNUAL\",\"fee_sub_category\":\"EXAMINATION FEE\",\"amount\":\"0\",\"month\":\"1\",\"status\":\"ACTIVE\",\"createdAt\":\"2021-03-24T03:39:18.967Z\",\"updatedAt\":\"2021-03-24T03:39:18.967Z\",\"__v\":0},{\"_id\":\"605ab47e5f0e3067241cd759\",\"fee_category\":\"ANNUAL\",\"fee_sub_category\":\"COMPUTER (1)\",\"amount\":\"0\",\"month\":\"8\",\"status\":\"ACTIVE\",\"createdAt\":\"2021-03-24T03:39:42.734Z\",\"updatedAt\":\"2021-03-24T03:39:42.734Z\",\"__v\":0},{\"_id\":\"605ab4885f0e3067241cd75a\",\"fee_category\":\"ANNUAL\",\"fee_sub_category\":\"COMPUTER (2)\",\"amount\":\"0\",\"month\":\"12\",\"status\":\"ACTIVE\",\"createdAt\":\"2021-03-24T03:39:52.971Z\",\"updatedAt\":\"2021-03-24T03:39:52.971Z\",\"__v\":0},{\"_id\":\"605ab4f25f0e3067241cd75b\",\"fee_category\":\"ANNUAL\",\"fee_sub_category\":\"REGISTRATION FEE ICSE\",\"amount\":0,\"month\":\"8\",\"status\":\"ACTIVE\",\"createdAt\":\"2021-03-24T03:41:38.949Z\",\"updatedAt\":\"2021-03-24T03:41:38.949Z\",\"__v\":0},{\"_id\":\"605ab5105f0e3067241cd75c\",\"fee_category\":\"ANNUAL\",\"fee_sub_category\":\"BOARD FEE\",\"amount\":0,\"month\":\"8\",\"status\":\"ACTIVE\",\"createdAt\":\"2021-03-24T03:42:08.362Z\",\"updatedAt\":\"2021-03-24T03:42:08.362Z\",\"__v\":0},{\"_id\":\"605ab55c5f0e3067241cd75d\",\"fee_category\":\"ONE TIME\",\"fee_sub_category\":\"PROSPECTUS FEE\",\"amount\":0,\"month\":\"\",\"status\":\"ACTIVE\",\"createdAt\":\"2021-03-24T03:43:24.314Z\",\"updatedAt\":\"2021-03-24T03:43:33.296Z\",\"__v\":0},{\"_id\":\"605ab5835f0e3067241cd75e\",\"fee_category\":\"ONE TIME\",\"fee_sub_category\":\"REGISTRATION FEE\",\"amount\":0,\"month\":\"\",\"status\":\"ACTIVE\",\"createdAt\":\"2021-03-24T03:44:03.457Z\",\"updatedAt\":\"2021-03-24T03:44:15.255Z\",\"__v\":0},{\"_id\":\"605ab5a25f0e3067241cd75f\",\"fee_category\":\"ONE TIME\",\"fee_sub_category\":\"ADMISSION FEE\",\"amount\":0,\"month\":\"\",\"status\":\"ACTIVE\",\"createdAt\":\"2021-03-24T03:44:34.711Z\",\"updatedAt\":\"2021-03-24T03:44:34.711Z\",\"__v\":0},{\"_id\":\"605ab5b75f0e3067241cd760\",\"fee_category\":\"ONE TIME\",\"fee_sub_category\":\"SECURITY FEE\",\"amount\":0,\"month\":\"\",\"status\":\"ACTIVE\",\"createdAt\":\"2021-03-24T03:44:55.709Z\",\"updatedAt\":\"2021-03-24T03:44:55.709Z\",\"__v\":0},{\"_id\":\"605ab5cc5f0e3067241cd761\",\"fee_category\":\"MONTHLY\",\"fee_sub_category\":\"TUITION FEE\",\"amount\":\"2950\",\"month\":\"\",\"status\":\"ACTIVE\",\"createdAt\":\"2021-03-24T03:45:16.306Z\",\"updatedAt\":\"2021-03-24T03:45:25.867Z\",\"__v\":0},{\"_id\":\"605ab5ee5f0e3067241cd762\",\"fee_category\":\"MONTHLY\",\"fee_sub_category\":\"BUS FARE\",\"amount\":\"0\",\"month\":\"\",\"status\":\"ACTIVE\",\"createdAt\":\"2021-03-24T03:45:50.649Z\",\"updatedAt\":\"2021-03-24T03:45:50.649Z\",\"__v\":0},{\"_id\":\"605ab6035f0e3067241cd763\",\"fee_category\":\"ANNUAL\",\"fee_sub_category\":\"MISC\",\"amount\":\"500\",\"month\":\"\",\"status\":\"ACTIVE\",\"createdAt\":\"2021-03-24T03:46:11.356Z\",\"updatedAt\":\"2021-03-24T03:46:11.356Z\",\"__v\":0}]"},

]
class FeeVoucher extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      AllVoucher: [],
      VoucherDate: Moment().format("YYYY-MM-DD"),
      Bank: '',
      voucher_by_date: [],
      voucher_in_detail: [],
      voucher_by_class: [],
      AllClass: [],
      class_name: '',
      AllBank: [],
      summaryFrom: '',
      summaryTo: '',
      SummaryData: [],
      SummaryDataPNB:[],
      SummaryDataCSV:[],
      printvoucherbydate: [],
      SuspiciousVoucherByDate: [],
      sumOfAllFeeDetail: [],
      sumOfAllFeeDetailSBI: [],
      sumOfAllFeeDetailPNB: [],

      sumOfAllFeePrintSBI:[],
      sumOfAllFeePrintPNB:[],
      sumOfAllFeePrint: [],

      sumOfAllFeeSummary:[],
      sumOfAllFeeSummarySBI:[],
      sumOfAllFeeSummaryPNB:[]
    }
  }
  componentDidMount() {
    // this.getFeeReceipt()
    this.getClass()
    this.getBankData()
    this.printvoucherbydate()
    this.SuspiciousVoucherByDate()
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
          school_id: "UT015"
        })
      })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        this.setState({ AllBank: data })
        console.log(data)
      })
      .catch(err => console.log(err))
  }
  getFeeReceipt = () => {
    fetch("http://144.91.110.221:4800/getFeeReceipt")
      .then(res => res.json())
      .then(data => {
        console.log(data)
        this.setState({ AllVoucher: data })
      })
      .then(err => console.log(err))
  }
  getFeeSummary = async () => {
    await console.log("wait")
    // this.printvoucherbydate()
    // this.SuspiciousVoucherByDate()
    this.setState({ voucher_by_date: [], voucher_in_detail: [], voucher_by_class: [], SummaryData: [],SummaryDataPNB:[],SummaryDataCSV:[]})
    $(".get_data_btn").text("Please Wait...")
    paidamountbydate = 0
    paidamountbyclass = 0



    sumOfTutionFeeSummary =0
    sumOfTutionFeeSummarySBI =0
    sumOfTutionFeeSummaryPNB =0

    sumOfFineDetailCSV=0
    sumOfFineDetailPNBB=0
    sumOfFineDetailSBII=0

    sumOfFineSummary =0
    sumOfFineSummarySBI =0
    sumOfFineSummaryPNB =0

    paidamountSummary =0
    paidamountSummarybySBI =0
    paidamountSummarybyPNB =0

  
    

    await console.log("wait")
    fetch("http://144.91.110.221:4800/getFeeSummary"
      , {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          summaryFrom: this.state.summaryFrom,
          summaryTo: this.state.summaryTo,
          bank: this.state.Bank
        })
      })
      .then((data) => data.json())
      .then(async (data) => {

        // for CSV FILE ALL DATA

        if (data[0] != undefined) {
          $(".get_data_btn").text("Get Data")
          var holder = {};
          var obj2 = [];
          var totalonetime = 0;
          var totalannual = 0;
          var totalmonthly = 0;
          var datesame = true
          var lastdate = ''
          var paid_amount=0
          var fine=0
          var tuition_fee=0
          var show_receipt_date =''

          var lastIndex

          data.map((item, index) => {
            lastIndex=index
          });

          await data.map((item, index) => {
            if (datesame == true) {
              console.log("receipt date "+item.receipt_date)
              lastdate = item.receipt_date
              datesame=false
            }

            if (lastdate != item.receipt_date) {
        
              if(paid_amount -totalonetime-totalannual >0){
                tuition_fee =paid_amount -totalonetime-totalannual 
              }else{
                tuition_fee=0
              }
              

              holder.hasOwnProperty("show_receipt_date")
              holder["show_receipt_date"]=lastdate

              holder.hasOwnProperty("tuition_fee")
              holder["tuition_fee"]=tuition_fee

              holder.hasOwnProperty("paid_amount")
              holder["paid_amount"]=paid_amount

              holder.hasOwnProperty("fine")
              holder["fine"]=fine


              obj2.push(holder);
              holder={}
              tuition_fee=0;
              totalannual=0;
              totalonetime=0;
              paid_amount=0;
              fine=0;
              console.log("not same date")
              lastdate = item.receipt_date
            }
            if (lastdate == item.receipt_date) {
              paid_amount=  paid_amount+parseInt(item.paid_amount)
              fine=fine+parseInt(fine)
              JSON.parse(data[index].Allfees).forEach(function (d) {
                if (d.fee_category == "ONE TIME") {
                  if (d.fee_sub_category.includes("PROSPECTUS") != true) {
                    if (holder.hasOwnProperty(d.fee_sub_category)) {
                      if (d.amount == "") {
                        d.amount = 0
                      }
                      holder[d.fee_sub_category] = parseInt(holder[d.fee_sub_category]) + parseInt(d.amount);
                      totalonetime = parseInt(totalonetime) + parseInt(d.amount);
                    } else {
                      if (d.amount == "") {
                        d.amount = 0
                      }
                      holder[d.fee_sub_category] = parseInt(d.amount);
                      totalonetime = parseInt(totalonetime) + parseInt(d.amount);
                    }
                  }
                }
              });
              var computerfeeCount = 0;
              var computerfee = 0;
              JSON.parse(data[index].Allfees).forEach(function (d) {
                if (d.fee_category == "ANNUAL") {
                  if (holder.hasOwnProperty(d.fee_sub_category)) {
                    if (d.amount == "") {
                      d.amount = 0
                    }
                    if (d.fee_sub_category.includes("COMPUTER")) {
                      if(d.amount==""){
                        d.amount=0
                      }
                      if (computerfeeCount == 0) {
                        computerfee = parseInt(d.amount);
                        computerfeeCount = 1
                      } else {
                        holder[d.fee_sub_category] = parseInt(holder[d.fee_sub_category]) + parseInt(d.amount) + computerfee;
                        totalannual = parseInt(totalannual) + parseInt(d.amount) + computerfee;
                      }
                    } else {
                      if(d.amount==""){
                        d.amount=0
                      }
                      holder[d.fee_sub_category] = parseInt(holder[d.fee_sub_category]) + parseInt(d.amount);
                      totalannual = parseInt(totalannual) + parseInt(d.amount);
                    }

                  } else {
                    if (d.amount == "") {
                      d.amount = 0
                    }
                    if (d.fee_sub_category.includes("COMPUTER")) {
                      if(d.amount==""){
                        d.amount=0
                      }
                      if (computerfeeCount == 0) {
                        computerfee = parseInt(d.amount);
                        computerfeeCount = 1
                      } else {
                        holder[d.fee_sub_category] = parseInt(d.amount) + computerfee;
                        totalannual = parseInt(totalannual) + parseInt(d.amount) + computerfee;
                      }
                    } else {
                      if(d.amount==""){
                        d.amount=0
                      }
                      holder[d.fee_sub_category] = parseInt(d.amount);
                      totalannual = parseInt(totalannual) + parseInt(d.amount);
                    }
                  }
                }
              });


              totalmonthly = totalmonthly + parseInt(item.paid_amount)
              sumOfFineDetailCSV = sumOfFineDetailCSV + parseInt(item.fine);
            }
            if (index == lastIndex) {
              if(paid_amount -totalonetime-totalannual >0){
                tuition_fee =paid_amount -totalonetime-totalannual 
              }else{
                tuition_fee=0
              }

              holder.hasOwnProperty("show_receipt_date")
              holder["show_receipt_date"]=lastdate

              holder.hasOwnProperty("tuition_fee")
              holder["tuition_fee"]=tuition_fee

              holder.hasOwnProperty("paid_amount")
              holder["paid_amount"]=paid_amount

              holder.hasOwnProperty("fine")
              holder["fine"]=fine


              obj2.push(holder);
              holder={}
              tuition_fee=0;
              totalannual=0;
              totalonetime=0;
              paid_amount=0;
              fine=0;
              console.log("not same date")
              lastdate = item.receipt_date
            }
          
          })
          sumOfTutionFeeDetail = parseInt(totalmonthly) - (totalannual + totalonetime)
          // for (var prop in holder) {
          //   obj2.push({ fee_sub_category: prop, amount: holder[prop] });
          // }
          // console.log("obj 2 "+prop);
          console.log("obj 2 " + JSON.stringify(holder));
          console.log("obr array result" + obj2.length);
          console.log("summary state" + this.state.SummaryDataCSV)
          this.setState({ SummaryDataCSV:obj2} )
        }


        // for SBI
        if (data[0] == undefined) {
          alert("No Result Found")
          $(".get_data_btn").text("Get Data")
        } else {
          // this.setState({SummaryData:data})
          if (data[0] != undefined) {
            $(".get_data_btn").text("Get Data")
            var holder = {};
            var obj2 = [];
            var totalonetime = 0;
            var totalannual = 0;
            var totalmonthly = 0;
            var datesame = true
            var lastdate = ''
            var paid_amount=0
            var fine=0
            var tuition_fee=0
            var show_receipt_date =''

            var lastIndexSBI

            data.map((item, index) => {
            if(item.bank == "SBI"){
              lastIndexSBI=index
            }
            });

            await data.map((item, index) => {
             if(item.bank == "SBI"){
              if (datesame==true) {
                console.log("receipt date "+item.receipt_date)
                lastdate = item.receipt_date
                datesame=false
              }

              if (lastdate != item.receipt_date) {
          
                if(paid_amount -totalonetime-totalannual >0){
                  tuition_fee =paid_amount -totalonetime-totalannual 
                }else{
                  tuition_fee=0
                }
                

                holder.hasOwnProperty("show_receipt_date")
                holder["show_receipt_date"]=lastdate

                holder.hasOwnProperty("tuition_fee")
                holder["tuition_fee"]=tuition_fee
  
                holder.hasOwnProperty("paid_amount")
                holder["paid_amount"]=paid_amount
  
                holder.hasOwnProperty("fine")
                holder["fine"]=fine


                obj2.push(holder);
                holder={}
                tuition_fee=0;
                totalannual=0;
                totalonetime=0;
                paid_amount=0;
                fine=0;
                console.log("not same date")
                lastdate = item.receipt_date
              }
              if (lastdate == item.receipt_date) {
                paid_amount=  paid_amount+parseInt(item.paid_amount)
                fine=fine+parseInt(fine)
                JSON.parse(data[index].Allfees).forEach(function (d) {
                  if (d.fee_category == "ONE TIME") {
                    if (d.fee_sub_category.includes("PROSPECTUS") != true) {
                      if (holder.hasOwnProperty(d.fee_sub_category)) {
                        if (d.amount == "") {
                          d.amount = 0
                        }
                        holder[d.fee_sub_category] = parseInt(holder[d.fee_sub_category]) + parseInt(d.amount);
                        totalonetime = parseInt(totalonetime) + parseInt(d.amount);
                      } else {
                        if (d.amount == "") {
                          d.amount = 0
                        }
                        holder[d.fee_sub_category] = parseInt(d.amount);
                        totalonetime = parseInt(totalonetime) + parseInt(d.amount);
                      }
                    }
                  }
                });
                var computerfeeCount = 0;
                var computerfee = 0;
                JSON.parse(data[index].Allfees).forEach(function (d) {
                  if (d.fee_category == "ANNUAL") {
                    if (holder.hasOwnProperty(d.fee_sub_category)) {
                      if (d.amount == "") {
                        d.amount = 0
                      }
                      if (d.fee_sub_category.includes("COMPUTER")) {
                        if(d.amount==""){
                          d.amount=0
                        }
                        if (computerfeeCount == 0) {
                          computerfee = parseInt(d.amount);
                          computerfeeCount = 1
                        } else {
                          holder[d.fee_sub_category] = parseInt(holder[d.fee_sub_category]) + parseInt(d.amount) + computerfee;
                          totalannual = parseInt(totalannual) + parseInt(d.amount) + computerfee;
                        }
                      } else {
                        if(d.amount==""){
                          d.amount=0
                        }
                        holder[d.fee_sub_category] = parseInt(holder[d.fee_sub_category]) + parseInt(d.amount);
                        totalannual = parseInt(totalannual) + parseInt(d.amount);
                      }

                    } else {
                      if (d.amount == "") {
                        d.amount = 0
                      }
                      if (d.fee_sub_category.includes("COMPUTER")) {
                        if(d.amount==""){
                          d.amount=0
                        }
                        if (computerfeeCount == 0) {
                          computerfee = parseInt(d.amount);
                          computerfeeCount = 1
                        } else {
                          holder[d.fee_sub_category] = parseInt(d.amount) + computerfee;
                          totalannual = parseInt(totalannual) + parseInt(d.amount) + computerfee;
                        }
                      } else {
                        if(d.amount==""){
                          d.amount=0
                        }
                        holder[d.fee_sub_category] = parseInt(d.amount);
                        totalannual = parseInt(totalannual) + parseInt(d.amount);
                      }
                    }
                  }
                });


                totalmonthly = totalmonthly + parseInt(item.paid_amount)
                sumOfFineDetailSBII = sumOfFineDetailSBII + parseInt(item.fine);
              }
              if (index == lastIndexSBI) {
                if(paid_amount -totalonetime-totalannual >0){
                  tuition_fee =paid_amount -totalonetime-totalannual 
                }else{
                  tuition_fee=0
                }
  
                holder.hasOwnProperty("show_receipt_date")
                holder["show_receipt_date"]=lastdate

                holder.hasOwnProperty("tuition_fee")
                holder["tuition_fee"]=tuition_fee
  
                holder.hasOwnProperty("paid_amount")
                holder["paid_amount"]=paid_amount
  
                holder.hasOwnProperty("fine")
                holder["fine"]=fine


                obj2.push(holder);
                holder={}
                tuition_fee=0;
                totalannual=0;
                totalonetime=0;
                paid_amount=0;
                fine=0;
                console.log("not same date")
                lastdate = item.receipt_date
              }
            }
            })
            sumOfTutionFeeDetail = parseInt(totalmonthly) - (totalannual + totalonetime)
            // for (var prop in holder) {
            //   obj2.push({ fee_sub_category: prop, amount: holder[prop] });
            // }
            // console.log("obj 2 "+prop);
            console.log("obj 2 " + JSON.stringify(holder));
            console.log("obr array result" + obj2.length);
            console.log("summary state" + this.state.SummaryData)
            this.setState({ SummaryData:obj2} )
          }




          // FOR PNB BANK
          if (data[0] != undefined) {
            $(".get_data_btn").text("Get Data")
            var holder = {};
            var obj2 = [];
            var totalonetime = 0;
            var totalannual = 0;
            var totalmonthly = 0;
            var datesame = true
            var lastdate = ''
            var paid_amount=0
            var fine=0
            var tuition_fee=0
            var show_receipt_date =''

            var lastIndexPNB

            data.map((item, index) => {
            if(item.bank == "PNB"){
              lastIndexPNB=index
            }
            });

            await data.map((item, index) => {
              if(item.bank == "PNB"){
              if (datesame == true) {
                console.log("receipt date "+item.receipt_date)
                lastdate = item.receipt_date
                datesame=false
              }

              if (lastdate != item.receipt_date) {
          
                if(paid_amount -totalonetime-totalannual >0){
                  tuition_fee =paid_amount -totalonetime-totalannual 
                }else{
                  tuition_fee=0
                }
                

                holder.hasOwnProperty("show_receipt_date")
                holder["show_receipt_date"]=lastdate

                holder.hasOwnProperty("tuition_fee")
                holder["tuition_fee"]=tuition_fee
  
                holder.hasOwnProperty("paid_amount")
                holder["paid_amount"]=paid_amount
  
                holder.hasOwnProperty("fine")
                holder["fine"]=fine


                obj2.push(holder);
                holder={}
                tuition_fee=0;
                totalannual=0;
                totalonetime=0;
                paid_amount=0;
                fine=0;
                console.log("not same date")
                lastdate = item.receipt_date
              }
              if (lastdate == item.receipt_date) {
                paid_amount=  paid_amount+parseInt(item.paid_amount)
                fine=fine+parseInt(fine)
                JSON.parse(data[index].Allfees).forEach(function (d) {
                  if (d.fee_category == "ONE TIME") {
                    if (d.fee_sub_category.includes("PROSPECTUS") != true) {
                      if (holder.hasOwnProperty(d.fee_sub_category)) {
                        if (d.amount == "") {
                          d.amount = 0
                        }
                        holder[d.fee_sub_category] = parseInt(holder[d.fee_sub_category]) + parseInt(d.amount);
                        totalonetime = parseInt(totalonetime) + parseInt(d.amount);
                      } else {
                        if (d.amount == "") {
                          d.amount = 0
                        }
                        holder[d.fee_sub_category] = parseInt(d.amount);
                        totalonetime = parseInt(totalonetime) + parseInt(d.amount);
                      }
                    }
                  }
                });
                var computerfeeCount = 0;
                var computerfee = 0;
                JSON.parse(data[index].Allfees).forEach(function (d) {
                  if (d.fee_category == "ANNUAL") {
                    if (holder.hasOwnProperty(d.fee_sub_category)) {
                      if (d.amount == "") {
                        d.amount = 0
                      }
                      if (d.fee_sub_category.includes("COMPUTER")) {
                        if(d.amount==""){
                          d.amount=0
                        }
                        if (computerfeeCount == 0) {
                          computerfee = parseInt(d.amount);
                          computerfeeCount = 1
                        } else {
                          holder[d.fee_sub_category] = parseInt(holder[d.fee_sub_category]) + parseInt(d.amount) + computerfee;
                          totalannual = parseInt(totalannual) + parseInt(d.amount) + computerfee;
                        }
                      } else {
                        if(d.amount==""){
                          d.amount=0
                        }
                        holder[d.fee_sub_category] = parseInt(holder[d.fee_sub_category]) + parseInt(d.amount);
                        totalannual = parseInt(totalannual) + parseInt(d.amount);
                      }

                    } else {
                      if (d.amount == "") {
                        d.amount = 0
                      }
                      if (d.fee_sub_category.includes("COMPUTER")) {
                        if(d.amount==""){
                          d.amount=0
                        }
                        if (computerfeeCount == 0) {
                          computerfee = parseInt(d.amount);
                          computerfeeCount = 1
                        } else {
                          holder[d.fee_sub_category] = parseInt(d.amount) + computerfee;
                          totalannual = parseInt(totalannual) + parseInt(d.amount) + computerfee;
                        }
                      } else {
                        if(d.amount==""){
                          d.amount=0
                        }
                        holder[d.fee_sub_category] = parseInt(d.amount);
                        totalannual = parseInt(totalannual) + parseInt(d.amount);
                      }
                    }
                  }
                });


                totalmonthly = totalmonthly + parseInt(item.paid_amount)
                sumOfFineDetailPNBB = sumOfFineDetailPNBB + parseInt(item.fine);
              }
              if (index == lastIndexPNB) {
                if(paid_amount -totalonetime-totalannual >0){
                  tuition_fee =paid_amount -totalonetime-totalannual 
                }else{
                  tuition_fee=0
                }
  
                holder.hasOwnProperty("show_receipt_date")
                holder["show_receipt_date"]=lastdate

                holder.hasOwnProperty("tuition_fee")
                holder["tuition_fee"]=tuition_fee
  
                holder.hasOwnProperty("paid_amount")
                holder["paid_amount"]=paid_amount
  
                holder.hasOwnProperty("fine")
                holder["fine"]=fine


                obj2.push(holder);
                holder={}
                tuition_fee=0;
                totalannual=0;
                totalonetime=0;
                paid_amount=0;
                fine=0;
                console.log("not same date")
                lastdate = item.receipt_date
              }
            }
            })
            sumOfTutionFeeDetail = parseInt(totalmonthly) - (totalannual + totalonetime)
            // for (var prop in holder) {
            //   obj2.push({ fee_sub_category: prop, amount: holder[prop] });
            // }
            // console.log("obj 2 "+prop);
            console.log("obj 2 " + JSON.stringify(holder));
            console.log("obr array result" + obj2.length);
            console.log("summary state" + this.state.SummaryDataPNB)
            this.setState({ SummaryDataPNB:obj2} )
          }


          // ************ for Bottom Row Total **************

        // For Row TOTAL for All
         if (data[0] != undefined) {
          var holder = {};
          var obj2 = [];
          var totalonetime = 0;
          var totalannual = 0;
          var totalmonthly = 0;


          data.map((item, index) => {
            JSON.parse(data[index].Allfees).forEach(function (d) {
              if (d.fee_category == "ONE TIME") {
                if (d.fee_sub_category.includes("PROSPECTUS") != true && d.fee_sub_category.includes("REGISTRATION") !=true) {
                  if (holder.hasOwnProperty(d.fee_sub_category)) {
                    if (d.amount == "") {
                      d.amount = 0
                    }
                    holder[d.fee_sub_category] = parseInt(holder[d.fee_sub_category]) + parseInt(d.amount);
                    totalonetime = parseInt(totalonetime) + parseInt(d.amount);
                  } else {
                    if (d.amount == "") {
                      d.amount = 0
                    }
                    holder[d.fee_sub_category] = parseInt(d.amount);
                    totalonetime = parseInt(totalonetime) + parseInt(d.amount);
                  }
                }
              }
            });
          })

          data.map((item, index) => {
            var computerfeeCount = 0;
            var computerfee = 0;
            JSON.parse(data[index].Allfees).forEach(function (d) {
              if (d.fee_category == "ANNUAL") {
                if (holder.hasOwnProperty(d.fee_sub_category)) {
                  if (d.amount == "") {
                    d.amount = 0
                  }
                  if (d.fee_sub_category.includes("COMPUTER")) {
                    if (computerfeeCount == 0) {
                      computerfee = parseInt(d.amount);
                      computerfeeCount = 1
                    } else {
                      holder[d.fee_sub_category] = parseInt(holder[d.fee_sub_category]) + parseInt(d.amount) + computerfee;
                      totalannual = parseInt(totalannual) + parseInt(d.amount) + computerfee;
                    }
                  } else {
                    holder[d.fee_sub_category] = parseInt(holder[d.fee_sub_category]) + parseInt(d.amount);
                    totalannual = parseInt(totalannual) + parseInt(d.amount);
                  }

                } else {


                  if (d.amount == "") {
                    d.amount = 0
                  }
                  if (d.fee_sub_category.includes("COMPUTER")) {
                    if (computerfeeCount == 0) {
                      computerfee = parseInt(d.amount);
                      computerfeeCount = 1
                    } else {
                      holder[d.fee_sub_category] = parseInt(d.amount) + computerfee;
                      totalannual = parseInt(totalannual) + parseInt(d.amount) + computerfee;
                    }
                  } else {
                    holder[d.fee_sub_category] = parseInt(d.amount);
                    totalannual = parseInt(totalannual) + parseInt(d.amount);
                  }


                }
              }
            });
          })
          data.map((item, index) => {
            totalmonthly = totalmonthly + parseInt(item.paid_amount)
            sumOfFineSummary = sumOfFineSummary + parseInt(item.fine);

            paidamountSummary=paidamountSummary+parseInt(item.paid_amount);
          })
          sumOfTutionFeeSummary = parseInt(totalmonthly) - (totalannual + totalonetime)

          for (var prop in holder) {
            obj2.push({ fee_sub_category: prop, amount: holder[prop] });
          }
          console.log("obj 2 " + JSON.stringify(obj2));
          this.setState({ sumOfAllFeeSummary: obj2 })
        }



        // For SBI Row TOTAL
        if (data[0] != undefined) {
          var holder = {};
          var obj2 = [];
          var totalonetime = 0;
          var totalannual = 0;
          var totalmonthly = 0;


          data.map((item, index) => {
            if(item.bank=="SBI"){
            JSON.parse(data[index].Allfees).forEach(function (d) {
              if (d.fee_category == "ONE TIME") {
                if (d.fee_sub_category.includes("PROSPECTUS") != true && d.fee_sub_category.includes("REGISTRATION") !=true) {
                  if (holder.hasOwnProperty(d.fee_sub_category)) {
                    if (d.amount == "") {
                      d.amount = 0
                    }
                    holder[d.fee_sub_category] = parseInt(holder[d.fee_sub_category]) + parseInt(d.amount);
                    totalonetime = parseInt(totalonetime) + parseInt(d.amount);
                  } else {
                    if (d.amount == "") {
                      d.amount = 0
                    }
                    holder[d.fee_sub_category] = parseInt(d.amount);
                    totalonetime = parseInt(totalonetime) + parseInt(d.amount);
                  }
                }
              }
            });
          }
          })

          data.map((item, index) => {
            if(item.bank=="SBI"){
            var computerfeeCount = 0;
            var computerfee = 0;
            JSON.parse(data[index].Allfees).forEach(function (d) {
              if (d.fee_category == "ANNUAL") {
                if (holder.hasOwnProperty(d.fee_sub_category)) {
                  if (d.amount == "") {
                    d.amount = 0
                  }
                  if (d.fee_sub_category.includes("COMPUTER")) {
                    if (computerfeeCount == 0) {
                      computerfee = parseInt(d.amount);
                      computerfeeCount = 1
                    } else {
                      holder[d.fee_sub_category] = parseInt(holder[d.fee_sub_category]) + parseInt(d.amount) + computerfee;
                      totalannual = parseInt(totalannual) + parseInt(d.amount) + computerfee;
                    }
                  } else {
                    holder[d.fee_sub_category] = parseInt(holder[d.fee_sub_category]) + parseInt(d.amount);
                    totalannual = parseInt(totalannual) + parseInt(d.amount);
                  }

                } else {


                  if (d.amount == "") {
                    d.amount = 0
                  }
                  if (d.fee_sub_category.includes("COMPUTER")) {
                    if (computerfeeCount == 0) {
                      computerfee = parseInt(d.amount);
                      computerfeeCount = 1
                    } else {
                      holder[d.fee_sub_category] = parseInt(d.amount) + computerfee;
                      totalannual = parseInt(totalannual) + parseInt(d.amount) + computerfee;
                    }
                  } else {
                    holder[d.fee_sub_category] = parseInt(d.amount);
                    totalannual = parseInt(totalannual) + parseInt(d.amount);
                  }


                }
              }
            });
          }
          })
          data.map((item, index) => {
            if(item.bank=="SBI"){
            totalmonthly = totalmonthly + parseInt(item.paid_amount)
            sumOfFineSummarySBI = sumOfFineSummarySBI + parseInt(item.fine);

            paidamountSummarybySBI=paidamountSummarybySBI+parseInt(item.paid_amount);
            }
          })
          sumOfTutionFeeSummarySBI = parseInt(totalmonthly) - (totalannual + totalonetime)

          for (var prop in holder) {
            obj2.push({ fee_sub_category: prop, amount: holder[prop] });
          }
          console.log("obj 2 " + JSON.stringify(obj2));
          this.setState({ sumOfAllFeeSummarySBI: obj2 })
        }

          // For PNB Row TOTAL
          if (data[0] != undefined) {
            var holder = {};
            var obj2 = [];
            var totalonetime = 0;
            var totalannual = 0;
            var totalmonthly = 0;
  
  
            data.map((item, index) => {
              if(item.bank=="PNB"){
              JSON.parse(data[index].Allfees).forEach(function (d) {
                if (d.fee_category == "ONE TIME") {
                  if (d.fee_sub_category.includes("PROSPECTUS") != true && d.fee_sub_category.includes("REGISTRATION") !=true) {
                    if (holder.hasOwnProperty(d.fee_sub_category)) {
                      if (d.amount == "") {
                        d.amount = 0
                      }
                      holder[d.fee_sub_category] = parseInt(holder[d.fee_sub_category]) + parseInt(d.amount);
                      totalonetime = parseInt(totalonetime) + parseInt(d.amount);
                    } else {
                      if (d.amount == "") {
                        d.amount = 0
                      }
                      holder[d.fee_sub_category] = parseInt(d.amount);
                      totalonetime = parseInt(totalonetime) + parseInt(d.amount);
                    }
                  }
                }
              });
            }
            })
  
            data.map((item, index) => {
              if(item.bank=="PNB"){
              var computerfeeCount = 0;
              var computerfee = 0;
              JSON.parse(data[index].Allfees).forEach(function (d) {
                if (d.fee_category == "ANNUAL") {
                  if (holder.hasOwnProperty(d.fee_sub_category)) {
                    if (d.amount == "") {
                      d.amount = 0
                    }
                    if (d.fee_sub_category.includes("COMPUTER")) {
                      if (computerfeeCount == 0) {
                        computerfee = parseInt(d.amount);
                        computerfeeCount = 1
                      } else {
                        holder[d.fee_sub_category] = parseInt(holder[d.fee_sub_category]) + parseInt(d.amount) + computerfee;
                        totalannual = parseInt(totalannual) + parseInt(d.amount) + computerfee;
                      }
                    } else {
                      holder[d.fee_sub_category] = parseInt(holder[d.fee_sub_category]) + parseInt(d.amount);
                      totalannual = parseInt(totalannual) + parseInt(d.amount);
                    }
  
                  } else {
  
  
                    if (d.amount == "") {
                      d.amount = 0
                    }
                    if (d.fee_sub_category.includes("COMPUTER")) {
                      if (computerfeeCount == 0) {
                        computerfee = parseInt(d.amount);
                        computerfeeCount = 1
                      } else {
                        holder[d.fee_sub_category] = parseInt(d.amount) + computerfee;
                        totalannual = parseInt(totalannual) + parseInt(d.amount) + computerfee;
                      }
                    } else {
                      holder[d.fee_sub_category] = parseInt(d.amount);
                      totalannual = parseInt(totalannual) + parseInt(d.amount);
                    }
  
  
                  }
                }
              });
            }
            })
            data.map((item, index) => {
              if(item.bank=="PNB"){
              totalmonthly = totalmonthly + parseInt(item.paid_amount)
              sumOfFineSummaryPNB = sumOfFineSummaryPNB + parseInt(item.fine);
  
              paidamountSummarybyPNB=paidamountSummarybyPNB+parseInt(item.paid_amount);
              }
            })
            sumOfTutionFeeSummaryPNB = parseInt(totalmonthly) - (totalannual + totalonetime)
  
            for (var prop in holder) {
              obj2.push({ fee_sub_category: prop, amount: holder[prop] });
            }
            console.log("obj 2 " + JSON.stringify(obj2));
            this.setState({ sumOfAllFeeSummaryPNB: obj2 })
          }




        }
      })
      .then(async()=>{ await 
      // console.log("data is here",this.state.SummaryData)    
      // .then(async()=>{ await this.setState({ SummaryData:parseInt(obj2) })
      this.trestfunct()
    })
  }
  trestfunct(){
    this.state.SummaryData.map((i,ind)=>{
      console.log("Zeo ewala dsta "+i.MISC)
    })
  }
  // getFeeSummary=async()=>{
  //   this.setState({ voucher_by_date:[],voucher_in_detail:[],voucher_by_class:[],SummaryData:[]})
  //   paidamountbydate=0
  //   paidamountbyclass=0
  //   fetch("http://144.91.110.221:4800/getFeeSummary")
  //   .then(res => res.json())
  //   .then(data => {
  //       console.log(data)
  //       var holder = {};
  //       var obj2 = [];
  //       data.map((item,index)=>{
  //       if(Moment(item.receipt_date).isAfter(this.state.summaryFrom) && Moment(item.receipt_date).isBefore(this.state.summaryTo)){
  //       JSON.parse(data[index].Allfees).forEach(function(d) {
  //         if (holder.hasOwnProperty(d.fee_sub_category)) {
  //           holder[d.fee_sub_category] = parseInt(holder[d.fee_sub_category]) + parseInt(d.amount);
  //         } else {
  //           holder[d.fee_sub_category] = parseInt(d.amount);
  //         }
  //       });
  //     }
  //     })         
  //       for (var prop in holder) {
  //         obj2.push({ fee_sub_category: prop, amount: holder[prop] });
  //       }
  //       console.log("obj 2 "+JSON.stringify(obj2));
  //       this.setState({SummaryData:data})
  //   })
  //   .then(err => console.log(err))
  // }
  VoucherByDate = async () => {
    await console.log("wait")
    this.printvoucherbydate()
    this.SuspiciousVoucherByDate()
    $(".get_data_by_date").text("Please Wait...")
    this.setState({ voucher_by_date: [], voucher_in_detail: [], voucher_by_class: [], SummaryData: [],SummaryDataPNB:[],SummaryDataCSV:[] })
    paidamountbydate = 0
    paidamountbyclass = 0
    await console.log("wait")
    fetch("http://144.91.110.221:4800/VoucherByDate"
      , {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          Bank: this.state.Bank,
          VoucherDate: this.state.VoucherDate
        })
      })
      .then((data) => data.json())
      .then(async (data) => {
        this.setState({ voucher_by_date: data })
        if (data[0] == undefined) {
          alert("No Result Found")
        }
        $(".get_data_by_date").text("By Date")
      })
      .catch((error)=>{
        console.log(error)
      })
  }
  printvoucherbydate = async () => {
    sumOfTutionFeePrint = 0
    sumOfTutionFeePrintSBI = 0
    sumOfTutionFeePrintPNB = 0

    sumOfFinePrint = 0
    sumOfFinePrintSBI = 0
    sumOfFinePrintPNB = 0
    paidamountbyPrintPNB=0
    paidamountbyPrintSBI=0

    rowTotalPrint = 0
    await console.log("wait")
    this.setState({ voucher_by_date: [], voucher_in_detail: [], voucher_by_class: [], SummaryData: [],SummaryDataPNB:[],SummaryDataCSV:[] })
    paidamountbydate = 0
    paidamountbyclass = 0
    fetch("http://144.91.110.221:4800/printvoucherbydate"
      , {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          Bank: this.state.Bank,
          VoucherDate: this.state.VoucherDate
        })
      })
      .then((data) => data.json())
      .then(async (data) => {
        this.setState({ printvoucherbydate: data })
        if (data[0] != undefined) {
          var holder = {};
          var obj2 = [];
          var totalonetime = 0;
          var totalannual = 0;
          var totalmonthly = 0;

          data.map((item, index) => {
            JSON.parse(data[index].Allfees).forEach(function (d) {
              if (d.fee_category == "ONE TIME") {
                if (d.fee_sub_category.includes("PROSPECTUS") != true && d.fee_sub_category.includes("REGISTRATION") !=true) {
                  if (holder.hasOwnProperty(d.fee_sub_category)) {
                    if (d.amount == "") {
                      d.amount = 0
                    }
                    holder[d.fee_sub_category] = parseInt(holder[d.fee_sub_category]) + parseInt(d.amount);
                    totalonetime = parseInt(totalonetime) + parseInt(d.amount);
                  } else {
                    if (d.amount == "") {
                      d.amount = 0
                    }
                    holder[d.fee_sub_category] = parseInt(d.amount);
                    totalonetime = (totalonetime) + parseInt(d.amount);
                  }
                }
              }
            });
          })

          data.map((item, index) => {
            var computerfee = 0
            var computerfeeCount = 0
            JSON.parse(data[index].Allfees).forEach(function (d) {
              if (d.fee_category == "ANNUAL") {
                if (holder.hasOwnProperty(d.fee_sub_category)) {
                  if (d.amount == "") {
                    d.amount = 0
                  }

                  if (d.fee_sub_category.includes("COMPUTER")) {
                    if (computerfeeCount == 0) {
                      computerfee = parseInt(d.amount);
                      computerfeeCount = 1
                    } else {


                      holder[d.fee_sub_category] = parseInt(holder[d.fee_sub_category]) + parseInt(d.amount) + computerfee;
                      totalannual = parseInt(totalannual) + parseInt(d.amount) + computerfee;
                    }
                  } else {
                    holder[d.fee_sub_category] = parseInt(holder[d.fee_sub_category]) + parseInt(d.amount);
                    totalannual = parseInt(totalannual) + parseInt(d.amount);
                  }


                } else {


                  if (d.amount == "") {
                    d.amount = 0
                  }
                  if (d.fee_sub_category.includes("COMPUTER")) {
                    if (computerfeeCount == 0) {
                      computerfee = parseInt(d.amount);
                      computerfeeCount = 1
                    } else {
                      holder[d.fee_sub_category] = parseInt(d.amount) + computerfee;
                      totalannual = parseInt(totalannual) + parseInt(d.amount) + computerfee;
                    }
                  } else {
                    holder[d.fee_sub_category] = parseInt(d.amount);
                    totalannual = parseInt(totalannual) + parseInt(d.amount);
                  }


                }
              }
            });
          })
          data.map((item, index) => {
            totalmonthly = totalmonthly + parseInt(item.paid_amount)
            sumOfFinePrint = sumOfFinePrint + parseInt(item.fine);
          })
          sumOfTutionFeePrint = parseInt(totalmonthly) - (totalannual + totalonetime)

          for (var prop in holder) {
            obj2.push({ fee_sub_category: prop, amount: holder[prop] });
          }
          console.log("obj 2 " + JSON.stringify(obj2));
          this.setState({ sumOfAllFeePrint: obj2 })
        }

        // For SBI

        if (data[0] != undefined) {
          var holder = {};
          var obj2 = [];
          var totalonetime = 0;
          var totalannual = 0;
          var totalmonthly = 0;

          data.map((item, index) => {
            if(item.bank=="SBI"){
            JSON.parse(data[index].Allfees).forEach(function (d) {
              if (d.fee_category == "ONE TIME") {
                if (d.fee_sub_category.includes("PROSPECTUS") != true && d.fee_sub_category.includes("REGISTRATION") !=true) {
                  if (holder.hasOwnProperty(d.fee_sub_category)) {
                    if (d.amount == "") {
                      d.amount = 0
                    }
                    holder[d.fee_sub_category] = parseInt(holder[d.fee_sub_category]) + parseInt(d.amount);
                    totalonetime = parseInt(totalonetime) + parseInt(d.amount);
                  } else {
                    if (d.amount == "") {
                      d.amount = 0
                    }
                    holder[d.fee_sub_category] = parseInt(d.amount);
                    totalonetime = (totalonetime) + parseInt(d.amount);
                  }
                }
              }
            });
          }
          })

          data.map((item, index) => {
            if(item.bank=="SBI"){
            var computerfee = 0
            var computerfeeCount = 0
            JSON.parse(data[index].Allfees).forEach(function (d) {
              if (d.fee_category == "ANNUAL") {
                if (holder.hasOwnProperty(d.fee_sub_category)) {
                  if (d.amount == "") {
                    d.amount = 0
                  }

                  if (d.fee_sub_category.includes("COMPUTER")) {
                    if (computerfeeCount == 0) {
                      computerfee = parseInt(d.amount);
                      computerfeeCount = 1
                    } else {


                      holder[d.fee_sub_category] = parseInt(holder[d.fee_sub_category]) + parseInt(d.amount) + computerfee;
                      totalannual = parseInt(totalannual) + parseInt(d.amount) + computerfee;
                    }
                  } else {
                    holder[d.fee_sub_category] = parseInt(holder[d.fee_sub_category]) + parseInt(d.amount);
                    totalannual = parseInt(totalannual) + parseInt(d.amount);
                  }


                } else {


                  if (d.amount == "") {
                    d.amount = 0
                  }
                  if (d.fee_sub_category.includes("COMPUTER")) {
                    if (computerfeeCount == 0) {
                      computerfee = parseInt(d.amount);
                      computerfeeCount = 1
                    } else {
                      holder[d.fee_sub_category] = parseInt(d.amount) + computerfee;
                      totalannual = parseInt(totalannual) + parseInt(d.amount) + computerfee;
                    }
                  } else {
                    holder[d.fee_sub_category] = parseInt(d.amount);
                    totalannual = parseInt(totalannual) + parseInt(d.amount);
                  }


                }
              }
            });
          }
          })
          data.map((item, index) => {
            if(item.bank=="SBI"){
            totalmonthly = totalmonthly + parseInt(item.paid_amount)
            sumOfFinePrintSBI = sumOfFinePrintSBI + parseInt(item.fine);
            paidamountbyPrintSBI = paidamountbyPrintSBI + parseInt(item.paid_amount);
            }
          })
          sumOfTutionFeePrintSBI = parseInt(totalmonthly) - (totalannual + totalonetime)

          for (var prop in holder) {
            obj2.push({ fee_sub_category: prop, amount: holder[prop] });
          }
          console.log("obj 2 " + JSON.stringify(obj2));
          this.setState({ sumOfAllFeePrintSBI: obj2 })
        }


         // For PNB

         if (data[0] != undefined) {
          var holder = {};
          var obj2 = [];
          var totalonetime = 0;
          var totalannual = 0;
          var totalmonthly = 0;

          data.map((item, index) => {
            if(item.bank=="PNB"){
            JSON.parse(data[index].Allfees).forEach(function (d) {
              if (d.fee_category == "ONE TIME") {
                if (d.fee_sub_category.includes("PROSPECTUS") != true && d.fee_sub_category.includes("REGISTRATION") !=true) {
                  if (holder.hasOwnProperty(d.fee_sub_category)) {
                    if (d.amount == "") {
                      d.amount = 0
                    }
                    holder[d.fee_sub_category] = parseInt(holder[d.fee_sub_category]) + parseInt(d.amount);
                    totalonetime = parseInt(totalonetime) + parseInt(d.amount);
                  } else {
                    if (d.amount == "") {
                      d.amount = 0
                    }
                    holder[d.fee_sub_category] = parseInt(d.amount);
                    totalonetime = (totalonetime) + parseInt(d.amount);
                  }
                }
              }
            });
          }
          })

          data.map((item, index) => {
            if(item.bank=="PNB"){
            var computerfee = 0
            var computerfeeCount = 0
            JSON.parse(data[index].Allfees).forEach(function (d) {
              if (d.fee_category == "ANNUAL") {
                if (holder.hasOwnProperty(d.fee_sub_category)) {
                  if (d.amount == "") {
                    d.amount = 0
                  }

                  if (d.fee_sub_category.includes("COMPUTER")) {
                    if (computerfeeCount == 0) {
                      computerfee = parseInt(d.amount);
                      computerfeeCount = 1
                    } else {


                      holder[d.fee_sub_category] = parseInt(holder[d.fee_sub_category]) + parseInt(d.amount) + computerfee;
                      totalannual = parseInt(totalannual) + parseInt(d.amount) + computerfee;
                    }
                  } else {
                    holder[d.fee_sub_category] = parseInt(holder[d.fee_sub_category]) + parseInt(d.amount);
                    totalannual = parseInt(totalannual) + parseInt(d.amount);
                  }


                } else {


                  if (d.amount == "") {
                    d.amount = 0
                  }
                  if (d.fee_sub_category.includes("COMPUTER")) {
                    if (computerfeeCount == 0) {
                      computerfee = parseInt(d.amount);
                      computerfeeCount = 1
                    } else {
                      holder[d.fee_sub_category] = parseInt(d.amount) + computerfee;
                      totalannual = parseInt(totalannual) + parseInt(d.amount) + computerfee;
                    }
                  } else {
                    holder[d.fee_sub_category] = parseInt(d.amount);
                    totalannual = parseInt(totalannual) + parseInt(d.amount);
                  }


                }
              }
            });
          }
          })
          data.map((item, index) => {
            if(item.bank=="PNB"){
            totalmonthly = totalmonthly + parseInt(item.paid_amount)
            sumOfFinePrintPNB = sumOfFinePrintPNB + parseInt(item.fine);
            paidamountbyPrintPNB = paidamountbyPrintPNB + parseInt(item.paid_amount);
            }
          })
          sumOfTutionFeePrintPNB = parseInt(totalmonthly) - (totalannual + totalonetime)

          for (var prop in holder) {
            obj2.push({ fee_sub_category: prop, amount: holder[prop] });
          }
          console.log("obj 2 " + JSON.stringify(obj2));
          this.setState({ sumOfAllFeePrintPNB: obj2 })
        }
      }).catch((error)=>{
        console.log(error)
      })
  }
  SuspiciousVoucherByDate = async () => {

    await console.log("wait")
    this.setState({ SuspiciousVoucherByDate: [] })
    fetch("http://144.91.110.221:4800/SuspiciousVoucherByDate"
      , {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          Bank: this.state.Bank,
          VoucherDate: this.state.VoucherDate

        })
      })
      .then((data) => data.json())
      .then(async (data) => {
        this.setState({ SuspiciousVoucherByDate: data })
        console.log("sespiciol data " + JSON.stringify(this.state.SuspiciousVoucherByDate))
      }).catch((error)=>{
        console.log(error)
      })
  }
  VoucherInDetail = async () => {
    sumOfTutionFeeDetail = 0
    sumOfTutionFeeDetailSBI = 0
    sumOfTutionFeeDetailPNB = 0

    rowTotalDetail = 0

    sumOfFineDetail = 0
    sumOfFineDetailCSV = 0
    sumOfFineDetailSBII = 0
    sumOfFineDetailPNBB = 0
    
    

    sumOfFineDetailSBI = 0
    sumOfFineDetailPNB = 0

    paidamountbySBI =0
    paidamountbyPNB =0
    this.printvoucherbydate()
    this.SuspiciousVoucherByDate()
    $(".get_data_in_detail").text("Please Wait...")
    this.setState({ voucher_by_date: [], SuspiciousVoucherByDate: [], voucher_in_detail: [], voucher_by_class: [], SummaryData: [],SummaryDataPNB:[],SummaryDataCSV:[] })
    paidamountbydate = 0
    paidamountbyclass = 0
    await console.log("wait")
    fetch("http://144.91.110.221:4800/VoucherInDetail"
      , {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          Bank: this.state.Bank,
          VoucherDate: this.state.VoucherDate
        })
      })
      .then((data) => data.json())
      .then(async (data) => {
        this.setState({ voucher_in_detail: data })

        // Sum For All 
        if (data[0] != undefined) {
          $(".get_data_in_detail").text("Fee Report")
          var holder = {};
          var obj2 = [];
          var totalonetime = 0;
          var totalannual = 0;
          var totalmonthly = 0;


          data.map((item, index) => {
            JSON.parse(data[index].Allfees).forEach(function (d) {
              if (d.fee_category == "ONE TIME") {
                if (d.fee_sub_category.includes("PROSPECTUS") != true && d.fee_sub_category.includes("REGISTRATION") !=true) {
                  if (holder.hasOwnProperty(d.fee_sub_category)) {
                    if (d.amount == "") {
                      d.amount = 0
                    }
                    holder[d.fee_sub_category] = parseInt(holder[d.fee_sub_category]) + parseInt(d.amount);
                    totalonetime = parseInt(totalonetime) + parseInt(d.amount);
                  } else {
                    if (d.amount == "") {
                      d.amount = 0
                    }
                    holder[d.fee_sub_category] = parseInt(d.amount);
                    totalonetime = parseInt(totalonetime) + parseInt(d.amount);
                  }
                }
              }
            });
          })

          data.map((item, index) => {
            var computerfeeCount = 0;
            var computerfee = 0;
            JSON.parse(data[index].Allfees).forEach(function (d) {
              if (d.fee_category == "ANNUAL") {
                if (holder.hasOwnProperty(d.fee_sub_category)) {
                  if (d.amount == "") {
                    d.amount = 0
                  }
                  if (d.fee_sub_category.includes("COMPUTER")) {
                    if (computerfeeCount == 0) {
                      computerfee = parseInt(d.amount);
                      computerfeeCount = 1
                    } else {
                      holder[d.fee_sub_category] = parseInt(holder[d.fee_sub_category]) + parseInt(d.amount) + computerfee;
                      totalannual = parseInt(totalannual) + parseInt(d.amount) + computerfee;
                    }
                  } else {
                    holder[d.fee_sub_category] = parseInt(holder[d.fee_sub_category]) + parseInt(d.amount);
                    totalannual = parseInt(totalannual) + parseInt(d.amount);
                  }

                } else {


                  if (d.amount == "") {
                    d.amount = 0
                  }
                  if (d.fee_sub_category.includes("COMPUTER")) {
                    if (computerfeeCount == 0) {
                      computerfee = parseInt(d.amount);
                      computerfeeCount = 1
                    } else {
                      holder[d.fee_sub_category] = parseInt(d.amount) + computerfee;
                      totalannual = parseInt(totalannual) + parseInt(d.amount) + computerfee;
                    }
                  } else {
                    holder[d.fee_sub_category] = parseInt(d.amount);
                    totalannual = parseInt(totalannual) + parseInt(d.amount);
                  }


                }
              }
            });
          })
          data.map((item, index) => {
            totalmonthly = totalmonthly + parseInt(item.paid_amount)
            sumOfFineDetail = sumOfFineDetail + parseInt(item.fine);
            
          })
          sumOfTutionFeeDetail = parseInt(totalmonthly) - (totalannual + totalonetime)

          for (var prop in holder) {
            obj2.push({ fee_sub_category: prop, amount: holder[prop] });
          }
          console.log("obj 2 " + JSON.stringify(obj2));
          this.setState({ sumOfAllFeeDetail: obj2 })
        }

        // For SBI
        if (data[0] != undefined) {
          $(".get_data_in_detail").text("Fee Report")
          var holder = {};
          var obj2 = [];
          var totalonetime = 0;
          var totalannual = 0;
          var totalmonthly = 0;


          data.map((item, index) => {
            if(item.bank=="SBI"){
            JSON.parse(data[index].Allfees).forEach(function (d) {
              if (d.fee_category == "ONE TIME") {
                if (d.fee_sub_category.includes("PROSPECTUS") != true && d.fee_sub_category.includes("REGISTRATION") !=true) {
                  if (holder.hasOwnProperty(d.fee_sub_category)) {
                    if (d.amount == "") {
                      d.amount = 0
                    }
                    holder[d.fee_sub_category] = parseInt(holder[d.fee_sub_category]) + parseInt(d.amount);
                    totalonetime = parseInt(totalonetime) + parseInt(d.amount);
                  } else {
                    if (d.amount == "") {
                      d.amount = 0
                    }
                    holder[d.fee_sub_category] = parseInt(d.amount);
                    totalonetime = parseInt(totalonetime) + parseInt(d.amount);
                  }
                }
              }
            });
          }
          })

          data.map((item, index) => {
            if(item.bank=="SBI"){
            var computerfeeCount = 0;
            var computerfee = 0;
            JSON.parse(data[index].Allfees).forEach(function (d) {
              if (d.fee_category == "ANNUAL") {
                if (holder.hasOwnProperty(d.fee_sub_category)) {
                  if (d.amount == "") {
                    d.amount = 0
                  }
                  if (d.fee_sub_category.includes("COMPUTER")) {
                    if (computerfeeCount == 0) {
                      computerfee = parseInt(d.amount);
                      computerfeeCount = 1
                    } else {
                      holder[d.fee_sub_category] = parseInt(holder[d.fee_sub_category]) + parseInt(d.amount) + computerfee;
                      totalannual = parseInt(totalannual) + parseInt(d.amount) + computerfee;
                    }
                  } else {
                    holder[d.fee_sub_category] = parseInt(holder[d.fee_sub_category]) + parseInt(d.amount);
                    totalannual = parseInt(totalannual) + parseInt(d.amount);
                  }

                } else {


                  if (d.amount == "") {
                    d.amount = 0
                  }
                  if (d.fee_sub_category.includes("COMPUTER")) {
                    if (computerfeeCount == 0) {
                      computerfee = parseInt(d.amount);
                      computerfeeCount = 1
                    } else {
                      holder[d.fee_sub_category] = parseInt(d.amount) + computerfee;
                      totalannual = parseInt(totalannual) + parseInt(d.amount) + computerfee;
                    }
                  } else {
                    holder[d.fee_sub_category] = parseInt(d.amount);
                    totalannual = parseInt(totalannual) + parseInt(d.amount);
                  }


                }
              }
            });
          }
          })
          data.map((item, index) => {
            if(item.bank=="SBI"){
            totalmonthly = totalmonthly + parseInt(item.paid_amount)
            sumOfFineDetailSBI = sumOfFineDetailSBI + parseInt(item.fine);

            paidamountbySBI=paidamountbySBI+parseInt(item.paid_amount);
            }
          })
          sumOfTutionFeeDetailSBI = parseInt(totalmonthly) - (totalannual + totalonetime)

          for (var prop in holder) {
            obj2.push({ fee_sub_category: prop, amount: holder[prop] });
          }
          console.log("obj 2 " + JSON.stringify(obj2));
          this.setState({ sumOfAllFeeDetailSBI: obj2 })
        }


          // For PNB
          if (data[0] != undefined) {
            $(".get_data_in_detail").text("Fee Report")
            var holder = {};
            var obj2 = [];
            var totalonetime = 0;
            var totalannual = 0;
            var totalmonthly = 0;
  
  
            data.map((item, index) => {
              if(item.bank=="PNB"){
              JSON.parse(data[index].Allfees).forEach(function (d) {
                if (d.fee_category == "ONE TIME") {
                  if (d.fee_sub_category.includes("PROSPECTUS") != true && d.fee_sub_category.includes("REGISTRATION") !=true) {
                    if (holder.hasOwnProperty(d.fee_sub_category)) {
                      if (d.amount == "") {
                        d.amount = 0
                      }
                      holder[d.fee_sub_category] = parseInt(holder[d.fee_sub_category]) + parseInt(d.amount);
                      totalonetime = parseInt(totalonetime) + parseInt(d.amount);
                    } else {
                      if (d.amount == "") {
                        d.amount = 0
                      }
                      holder[d.fee_sub_category] = parseInt(d.amount);
                      totalonetime = parseInt(totalonetime) + parseInt(d.amount);
                    }
                  }
                }
              });
            }
            })
  
            data.map((item, index) => {
              if(item.bank=="PNB"){
              var computerfeeCount = 0;
              var computerfee = 0;
              JSON.parse(data[index].Allfees).forEach(function (d) {
                if (d.fee_category == "ANNUAL") {
                  if (holder.hasOwnProperty(d.fee_sub_category)) {
                    if (d.amount == "") {
                      d.amount = 0
                    }
                    if (d.fee_sub_category.includes("COMPUTER")) {
                      if (computerfeeCount == 0) {
                        computerfee = parseInt(d.amount);
                        computerfeeCount = 1
                      } else {
                        holder[d.fee_sub_category] = parseInt(holder[d.fee_sub_category]) + parseInt(d.amount) + computerfee;
                        totalannual = parseInt(totalannual) + parseInt(d.amount) + computerfee;
                      }
                    } else {
                      holder[d.fee_sub_category] = parseInt(holder[d.fee_sub_category]) + parseInt(d.amount);
                      totalannual = parseInt(totalannual) + parseInt(d.amount);
                    }
  
                  } else {
  
  
                    if (d.amount == "") {
                      d.amount = 0
                    }
                    if (d.fee_sub_category.includes("COMPUTER")) {
                      if (computerfeeCount == 0) {
                        computerfee = parseInt(d.amount);
                        computerfeeCount = 1
                      } else {
                        holder[d.fee_sub_category] = parseInt(d.amount) + computerfee;
                        totalannual = parseInt(totalannual) + parseInt(d.amount) + computerfee;
                      }
                    } else {
                      holder[d.fee_sub_category] = parseInt(d.amount);
                      totalannual = parseInt(totalannual) + parseInt(d.amount);
                    }
  
  
                  }
                }
              });
            }
            })
            data.map((item, index) => {
              if(item.bank=="PNB"){
              totalmonthly = totalmonthly + parseInt(item.paid_amount)
              sumOfFineDetail = sumOfFineDetail + parseInt(item.fine);

              paidamountbyPNB=paidamountbyPNB+parseInt(item.paid_amount);
              }
            })
            sumOfTutionFeeDetailPNB = parseInt(totalmonthly) - (totalannual + totalonetime)
  
            for (var prop in holder) {
              obj2.push({ fee_sub_category: prop, amount: holder[prop] });
            }
            console.log("obj 2 " + JSON.stringify(obj2));
            this.setState({ sumOfAllFeeDetailPNB: obj2 })
          }
        if (data[0] == undefined) {
          alert("No Result Found")
        }
        $(".get_data_in_detail").text("Fee Report")
      })
  }
  VoucherByClass = async () => {
    this.setState({ voucher_by_date: [], voucher_in_detail: [], voucher_by_class: [], SummaryData: [],SummaryDataPNB:[],SummaryDataCSV:[] })
    this.SuspiciousVoucherByDate()
    $(".get_data_by_class").text("Please Wait...")
    paidamountbydate = 0
    paidamountbyclass = 0
    await console.log("wait")
    fetch("http://144.91.110.221:4800/VoucherByClass"
      , {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          Bank: this.state.Bank,
          VoucherDate: this.state.VoucherDate,
          class_name: this.state.class_name
        })
      })
      .then((data) => data.json())
      .then(async (data) => {
        this.setState({ voucher_by_class: data })
        if (data[0] == undefined) {
          alert("No Result Found")
        }
        $(".get_data_by_class").text("Classwise")
      })

  }
  getClass = () => {
    fetch("http://144.91.110.221:4800/getClass")
      .then(res => res.json())
      .then(data => {
        console.log(data)
        this.setState({ AllClass: data })
      })
      .catch(err => console.log(err))
  }
  printVoucher() {
    $('.printsummary').hide()
    $('.printvoucherbydate').show()
    $('.printvoucherbydate').css('display','block')
 
    window.print();
    $('.printsummary').show()
    $('.printvoucherbydate').css('display','none')
  }
  printsummary() {
  
    // $('.printsummary').show()
    // $('.printvoucherbydate').hide()
    window.print();
    // $('.printvoucherbydate').show()
    // $('.printsummary').show()
  }
  render() {
    paidamountbydate = 0
    paidamountbyclass = 0

    //  sumOfTutionFeePrint =0
    sumOfFinePrint = 0
    rowTotalPrint = 0

    //  sumOfTutionFeeDetail =0
    rowTotalDetail = 0
    sumOfFineDetail = 0
    sumOfFineDetailCSV = 0
    sumOfFineDetailSBII = 0
    sumOfFineDetailPNBB = 0

    totalSuspiciousAmount = 0
    print_totalSuspiciousAmount = 0

    ShowtotalSuspiciousAmount = 0
    Showprint_totalSuspiciousAmount = 0

    SuspiciousVoucherByDatebydate = 0
    // const data =[];
    // {this.state.AllVoucher.map((item,index)=>{
    // data.push( {"sr_no":index+1,"admission_no":item.admission_no,"receipt_date":Moment(item.receipt_date).format("DD-MM-YYYY"),"bank":item.bank,"receipt_no":ite.receipt_no,"paid_amount":item.paid_amount})
    // })}
    //   const columns = [
    //     { title: "SR NO", data: "sr_no" },
    //     { title: 'Admission No',data: "admission_no"},
    //     { title: "Receipt Date", data: "receipt_date" },
    //     { title: 'Bank',data: "bank"},
    //     { title: 'Receipt No',data: "receipt_no"},
    //     { title: 'Paid Amount ',data: "paid_amount"},
    //   ];
    //   const click = (row) => {
    //     console.log(row);
    //   };
    var heading = ["ADMISSION NO", "NAME"]
    {
      this.state.printvoucherbydate.map((itemm, index) => {
        if (index == this.state.printvoucherbydate.length - 1) {
          return (
            JSON.parse(itemm.Allfees).map((it, ind) => {
              if (it.fee_category == "ONE TIME") {
                return (
                  heading.push([it.fee_sub_category])
                )
              }
            })
          )
        }
      })
    }
    {
      this.state.printvoucherbydate.map((itemm, index) => {
        if (index == this.state.printvoucherbydate.length - 1) {
          return (
            JSON.parse(itemm.Allfees).map((it, ind) => {
              if (it.fee_category == "ANNUAL") {
                return (
                  heading.push([it.fee_sub_category])
                )
              }
            })
          )
        }
      })
    }
    heading.push(["TUITION"])
    heading.push(["FINE"])
    heading.push(["TOTAL"])
    // ["Reciept Date","Bank","Addmission No","Class","One Time","Annual","Monthly","Fine","Total","Paid Amount"]
    const csvData = [
      heading
    ];
    {
      this.state.printvoucherbydate.map((item, ind) => {
        var xldata = [];
        xl_total_annual_fee = 0
        xl_total_one_time_fee = 0
        xldata.push(item.admission_no + "/" + item.account_no
        )
        xldata.push(item.name
        )
        JSON.parse(item.Allfees).map((it, ind) => {
          if (it.fee_category == "ONE TIME") {
            if (it.amount != "") {
              xl_total_one_time_fee = xl_total_one_time_fee + parseInt(it.amount)
              return (
                xldata.push(it.amount)
              )
            } else {
              xl_total_one_time_fee = xl_total_one_time_fee + 0
              return (
                xldata.push(0)
              )
            }
          }

        })
        JSON.parse(item.Allfees).map((it, ind) => {
          if (it.fee_category == "ANNUAL") {
            if (it.amount != "") {
              xl_total_annual_fee = xl_total_annual_fee + parseInt(it.amount)
              return (
                xldata.push(it.amount)
              )
            } else {
              xl_total_annual_fee = xl_total_annual_fee + 0
              return (
                xldata.push(0)
              )
            }
          }
        })
        var monthly = 0
        if (item.paid_amount - xl_total_annual_fee - xl_total_one_time_fee > 0) {
          monthly = item.paid_amount - xl_total_annual_fee - xl_total_one_time_fee
        } else {
          monthly = 0
        }
        xldata.push(monthly, item.fine, item.paid_amount)
        csvData.push(xldata)
      })
    }
    console.log("csv data" + csvData)

    // CSV FOR FEE SUMMARY

    const csvDataa = [
      ["DATE","ADMISSSION FEE", "SECURITY FEE", "REPORT CARD & DAIRY" ,"ANNUAL PRIZE DAY" , "DEVELOPMENT FUND" ,"SCHOOL MAGAZINE","ANNUAL SPORTS DAY","EXAMINATION FEE","COMPUTER FEE","CISCE","BOARD FEE","MISC","TUITION FEE","FINE","TOTAL"],
    ];
    
    {this.state.SummaryDataCSV.map((item,ind)=>{
     
      
      csvDataa.push( [Moment(item['show_receipt_date']).format("DD-MM-YYYY"),item['ADMISSION FEE'],item['SECURITY FEE'],item['REPORT CARD AND DIARY'],item['ANNUAL PRIZE DAY'],item['DEVELOPMENT FUND'],item['SCHOOL MAGAZINE'],item['ANNUAL SPORTS DAY'],item['EXAMINATION FEE'],item['COMPUTER (2)'],item['REGISTRATION FEE ICSE'],item['BOARD FEE'],item['MISC'],item['tuition_fee'],item['fine'],item['paid_amount']])
      
   
    })
    }
    // {this.state.SummaryData.map((item,ind)=>{
   
    //   csvDataa.push( [Moment(item['show_receipt_date']).format("DD-MM-YYYY"),item['ADMISSION FEE'],item['SECURITY FEE'],item['REPORT CARD AND DIARY'],item['ANNUAL PRIZE DAY'],item['DEVELOPMENT FUND'],item['SCHOOL MAGAZINE'],item['ANNUAL SPORTS DAY'],item['EXAMINATION FEE'],item['COMPUTER (2)'],item['REGISTRATION FEE ICSE'],item['BOARD FEE'],item['MISC'],item['tuition_fee'],item['fine'],item['paid_amount']])
      
   
    // })
    // }

sbi_sr_no=0
pnb_sr_no=0

print_sbi_sr_no=0
print_pnb_sr_no=0
    return (
      <>
        <div className="row layoutCard">
          <div className="col-12 form-group">
            <Link to="/FeeReceipt" style={{ float: "left" }} className="btn btn-secondary btn-sm mr-3 pl-4 pr-4"><i class="fas fa-arrow-left"></i>Back</Link>
          </div>
          <div className="col-3 form-group">
            <label>Date</label>
            <input type="date" className="form-control" value={this.state.VoucherDate} onChange={(e) => { this.setState({ VoucherDate: e.target.value }) }} />
          </div>
          <div className="col-2 form-group">
            <label>Select Bank</label>
            <select className="form-control" onChange={(e) => { this.setState({ Bank: e.target.value }) }}>
              <option value="">All Bank</option>
              {this.state.AllBank.map((item, index) => {
                return (
                  <option value={item.bank}>{item.bank}</option>
                )
              })}
            </select>
          </div>
          <div className="col-2 form-group">
            <label>Select Class</label>
            <select className="form-control" onChange={(e) => { this.setState({ class_name: e.target.value.toUpperCase() }) }}>
              <option value="">Choose Class</option>
              {this.state.AllClass.map((item, index) => {
                return (
                  <option value={item.class_name}>{item.class_name}</option>
                )
              })}
            </select>
          </div>
          <div className="col-5 form-group d-flex align-items-end">
            <br />
            <button onClick={() => { this.VoucherByDate() }} className="btn btn-primary mr-1 get_data_by_date">By Date</button>
            <button onClick={() => { this.VoucherInDetail() }} className="btn btn-primary mr-1 get_data_in_detail">Fee Report</button>
            <button onClick={() => { this.VoucherByClass() }} className="btn btn-primary mr-1 get_data_by_class">Classwise</button>
            <button onClick={() => { this.printVoucher() }} className="btn btn-info mr-1">Print</button>
            <button className="btn btn-primary">
            <CSVLink filename={"DayBook.csv"} data={csvDataa}>CSV</CSVLink></button>
          </div>
          {/* <div className="col-4">
                <div className="form-group">
                  <label>Date</label>
                  <input type="date" className="form-control" onChange={(e)=>{this.setState({VoucherDate:e.target.value})}} />
                </div>
                <div className="form-group">
                  <label>Select Bank</label>
                  <select className="form-control" onChange={(e)=>{this.setState({Bank:e.target.value})}}>
                    <option value="">Choose Bank</option>
                    <option value="SBI">SBI</option>
                    <option value="OBC">OBC</option>
                  </select>
                </div>
                <div className="form-group">
                </div>
              </div> */}
        </div>
        <div className="row layoutCard ">
          <div className="col-12">
            <h4 className="text-center">FEE SUMMARY </h4>
          </div>
          <div className="col-3">
            <label >From</label>
            <input onChange={(e) => { this.setState({ summaryFrom: e.target.value }) }} className="form-control" type="date" />
          </div>
          <div className="col-3">
            <label >To</label>
            <input onChange={(e) => { this.setState({ summaryTo: e.target.value }) }} className="form-control" type="date" />
          </div>
          <div className="col-2 form-group">
            <label>Select Bank</label>
            <select className="form-control" onChange={(e) => { this.setState({ Bank: e.target.value }) }}>
              <option value="">All Bank</option>
              {this.state.AllBank.map((item, index) => {
                return (
                  <option value={item.bank}>{item.bank}</option>
                )
              })}
            </select>
          </div>
          <div className="col-4 form-group d-flex align-items-end">
            <br />
            <button className="btn btn-primary get_data_btn mr-1" onClick={() => { this.getFeeSummary() }}>Get Data</button>
            <button onClick={() => { this.printsummary() }} className="btn btn-info mr-1">Print</button>
            <button className="btn btn-primary">
            <CSVLink filename={"FeeSummary.csv"} data={csvDataa}>CSV</CSVLink></button>
          </div>
        </div>
        {this.state.voucher_by_date != '' ?
          <div className="row layoutCard">
            {this.state.voucher_by_date.map((item, index) => {
              paidamountbydate = parseInt(paidamountbydate) + parseInt(item.paid_amount)
            })}
            {this.state.SuspiciousVoucherByDate.map((item, index) => {
              SuspiciousVoucherByDatebydate = parseInt(SuspiciousVoucherByDatebydate) + parseInt(item.amount)
            })}
            <h3> Total  : {paidamountbydate} / {this.state.voucher_by_date.length}</h3>
            <table class="table ">
              <thead>
                <tr>
                  <th scope="col">Date</th>
                  <th scope="col">Bank</th>
                  <th scope="col">Amount</th>
                </tr>
              </thead>
              <tbody>
                {this.state.voucher_by_date.map((ite, ind) => {
                  if (ind == 0) {
                    return (
                      <tr>
                        <td>{Moment(ite.receipt_date).format("DD-MM-YYYY")}</td>
                        <td> {this.state.Bank == '' ? "All" : ite.bank}</td>
                        <th scope="col">{paidamountbydate + parseInt(SuspiciousVoucherByDatebydate)}</th>
                      </tr>
                    )
                  }
                })
                }
              </tbody>
            </table>
          </div>
          :
          null}
        {this.state.voucher_in_detail != '' ?
          <div className="row layoutCard">
            {this.state.voucher_in_detail.map((item, index) => {
              paidamountbydate = parseInt(paidamountbydate) + parseInt(item.paid_amount)
            })}
            {this.state.SuspiciousVoucherByDate.map((item, index) => {
              ShowtotalSuspiciousAmount = parseInt(ShowtotalSuspiciousAmount) + parseInt(item.amount)
            })}
            <h3>{Moment(this.state.voucher_in_detail[0].receipt_date).format("DD-MM-YYYY")}</h3>
            <h3 className="text-center w-100"> Total  : {paidamountbydate + ShowtotalSuspiciousAmount} / {this.state.voucher_in_detail.length + this.state.SuspiciousVoucherByDate.length}</h3>
            <table class="table table-responsive">
              <thead>
                <tr >
                <th scope="col">SR NO</th>
                <th scope="col">R.NO</th>
                  <th scope="col"> AdmnNo </th>
                  <th scope="col">Name</th>
                  {this.state.voucher_in_detail.map((itemm, index) => {
                    if (index == this.state.voucher_in_detail.length - 1) {
                      return (
                        JSON.parse(itemm.Allfees).map((it, ind) => {
                          if (it.fee_category == "ONE TIME") {
                            if (it.fee_sub_category.includes("PROSPECTUS") != true && it.fee_sub_category.includes("REGISTRATION") !=true) {
                              if (it.fee_sub_category.includes("ADMISSION")) {
                                return (
                                  <th scope="col"> ADMN.  </th>
                                )
                              } 
                              // else if (it.fee_sub_category.includes("REGISTRATION")) {
                              //   return (
                              //     <th scope="col"> REG. </th>
                              //   )
                              // }
                              else if (it.fee_sub_category.includes("SECURITY")) {
                                return (
                                  <th scope="col"> SECU. </th>
                                )
                              }
                              else {
                                return (
                                  <th scope="col"> {it.fee_sub_category} </th>
                                )
                              }
                            }

                          }
                        })
                      )
                    }
                  })}
                  {this.state.voucher_in_detail.map((itemm, index) => {
                 
                    if (index == this.state.voucher_in_detail.length - 1) {
                      var compValue = true
                      return (
                        JSON.parse(itemm.Allfees).map((it, ind) => {
                          if (it.fee_category == "ANNUAL") {
                            if (it.fee_sub_category.includes("COMPUTER") != true) {
                              if (it.fee_sub_category.includes("REPORT CARD")) {
                                return (
                                  <th scope="col"> Card & Diary </th>
                                )
                              }
                              else if (it.fee_sub_category.includes("ANNUAL PRIZE")) {
                                return (
                                  <th scope="col"> prize day </th>
                                )
                              }
                              else if (it.fee_sub_category.includes("DEVELOPMENT")) {
                                return (
                                  <th scope="col">DEV. FUND </th>
                                )
                              } else if (it.fee_sub_category.includes("MAGAZINE")) {
                                return (
                                  <th scope="col">MAGAZINE </th>
                                )
                              }
                              else if (it.fee_sub_category.includes("SPORTS")) {
                                return (
                                  <th scope="col">SPORTS </th>
                                )
                              }
                              else if (it.fee_sub_category.includes("EXAMINATION")) {
                                return (
                                  <th scope="col">EXAM.</th>
                                )
                              }
                              else if (it.fee_sub_category.includes("ICSE")) {
                                return (
                                  <th scope="col">ICSE </th>
                                )
                              }
                              else if (it.fee_sub_category.includes("BOARD FEE")) {
                                return (
                                  <th scope="col">BOARD</th>
                                )
                              }
                              else {
                                return (
                                  <th scope="col">{it.fee_sub_category}</th>
                                )
                              }
                            }
                            else {
                              if (compValue == true) {
                                compValue = false
                                return (
                                  <th scope="col">COMP.</th>
                                )

                              }
                            }
                          }
                        })
                      )
                    }
                  })}
                  <th scope="col"> Tuition </th>
                  <th scope="col"> Fine </th>
                  <th scope="col"> Total </th>
                  
                </tr>
              </thead>
              <tbody className='dashboard-table'>
                {this.state.Bank == '' || this.state.Bank == "SBI" ?
                  <tr><td colspan="20"><h4 className="text-center">SBI</h4></td></tr>
                  : null}
                {this.state.voucher_in_detail.map((ite, ind) => {
                  
                  var compValue = true
                  var computerfee = 0
                  total_annual_fee = 0
                  total_one_time_fee = 0
                  if (ite.bank == "SBI") {
                    sbi_sr_no=sbi_sr_no+1
                    return (
                      <tr>
                        <td>{sbi_sr_no}</td>
                        <td>{ite.receipt_no}</td>
                        <td> {ite.admission_no}/{ite.account_no} </td>
                        <td> {ite.name} </td>
                        {
                          JSON.parse(ite.Allfees).map((it, ind) => {
                            if (it.fee_category == "ONE TIME") {
                              if (it.fee_sub_category.includes("PROSPECTUS") != true && it.fee_sub_category.includes("REGISTRATION") !=true) {
                                if (it.amount != "") {
                                  total_one_time_fee = total_one_time_fee + parseInt(it.amount)
                                  return (
                                    <td style={{ textAlign: "right" }}>{it.amount} </td>
                                  )
                                } else {
                                  total_one_time_fee = total_one_time_fee + 0
                                  return (
                                    <td style={{ textAlign: "right" }}>0</td>
                                  )
                                }
                              }
                            }
                          })
                        }
                        {
                          JSON.parse(ite.Allfees).map((it, ind) => {
                            if (it.fee_category == "ANNUAL") {

                              if (it.fee_sub_category.includes("COMPUTER") != true) {
                                if (it.amount != "") {
                                  total_annual_fee = total_annual_fee + parseInt(it.amount)
                                  return (
                                    <td style={{ textAlign: "right" }}> {it.amount} </td>
                                  )
                                } else {
                                  total_annual_fee = total_annual_fee + 0
                                  return (
                                    <td style={{ textAlign: "right" }}> 0 </td>
                                  )
                                }
                              }
                              else {
                                if (compValue == true) {
                                  compValue = false
                                  if (it.amount != "") {
                                    total_annual_fee = total_annual_fee + parseInt(it.amount)
                                    computerfee = parseInt(computerfee) + parseInt(it.amount)
                                    // return(
                                    //     <td style={{textAlign:"right"}}> {it.amount} </td>
                                    // )
                                  } else {
                                    total_annual_fee = total_annual_fee + 0
                                    computerfee = parseInt(computerfee) + 0
                                    // return (
                                    //   <td style={{ textAlign: "right" }}> 0 </td>
                                    // )
                                  }

                                } else {
                                  if (it.amount != "") {
                                    total_annual_fee = total_annual_fee + parseInt(it.amount)
                                    computerfee = parseInt(computerfee) + parseInt(it.amount)
                                    return (
                                      <td style={{ textAlign: "right" }}> {computerfee} </td>
                                    )
                                  } else {
                                    total_annual_fee = total_annual_fee + 0
                                    computerfee = parseInt(computerfee) + 0
                                    return (
                                      <td style={{ textAlign: "right" }}> 0 </td>
                                    )
                                  }
                               
                                }

                              }
                            }
                          })
                        }

                        <td style={{ textAlign: "right" }}> {ite.paid_amount - total_annual_fee - total_one_time_fee > 0 ? ite.paid_amount - total_annual_fee - total_one_time_fee : (ite.paid_amount - total_annual_fee - total_one_time_fee) * (-1)} </td>

                        <td style={{ textAlign: "right" }}> {ite.fine} </td>
                      
                        <td style={{ textAlign: "right" }}>  {ite.paid_amount}</td>
                      </tr>
                    )
                  }
                })
                }
                {this.state.Bank == '' || this.state.Bank == "SBI" ?
                  <tr>
                  <th scope="col">TOTAL</th>
                  <td></td>
                  <td></td>
                  <td></td>
                  {this.state.sumOfAllFeeDetailSBI.map((item, index) => {
                    rowTotalDetail = rowTotalDetail + parseInt(item.amount)
                    return (
                      <td style={{ textAlign: "right", fontWeight: "bold" }}>{item.amount}</td>
                    )
                  })}
                  <td style={{ textAlign: "right", fontWeight: "bold" }}>{parseInt(sumOfTutionFeeDetailSBI)}</td>
                  <td style={{ textAlign: "right", fontWeight: "bold" }}>{sumOfFineDetailSBI}</td>
                  <td style={{ textAlign: "right", fontWeight: "bold" }}>  {parseInt(paidamountbySBI)}</td>
                </tr>
                :
                null}

                {this.state.Bank == '' || this.state.Bank == "PNB" ?
                  <tr><td colspan="20"><h4 className="text-center">PNB</h4></td></tr>
                  : null}
                {this.state.voucher_in_detail.map((ite, ind) => {
                  
                  var compValue = true
                  var computerfee = 0
                  total_annual_fee = 0
                  total_one_time_fee = 0
                  if (ite.bank == "PNB") {
                    pnb_sr_no=pnb_sr_no+1
                    return (
                      <tr>
                        <td>{pnb_sr_no}</td>
                        <td>{ite.receipt_no}</td>
                        <td> {ite.admission_no}/{ite.account_no} </td>
                        <td> {ite.name} </td>
                        {
                          JSON.parse(ite.Allfees).map((it, ind) => {
                            if (it.fee_category == "ONE TIME") {
                              if (it.fee_sub_category.includes("PROSPECTUS") != true && it.fee_sub_category.includes("REGISTRATION") !=true) {
                                if (it.amount != "") {
                                  total_one_time_fee = total_one_time_fee + parseInt(it.amount)
                                  return (
                                    <td style={{ textAlign: "right" }}> {it.amount} </td>
                                  )
                                } else {
                                  total_one_time_fee = total_one_time_fee + 0
                                  return (
                                    <td style={{ textAlign: "right" }}> 0 </td>
                                  )
                                }
                              }
                            }
                          })
                        }
                        {
                          JSON.parse(ite.Allfees).map((it, ind) => {
                            if (it.fee_category == "ANNUAL") {

                              if (it.fee_sub_category.includes("COMPUTER") != true) {
                                if (it.amount != "") {
                                  total_annual_fee = total_annual_fee + parseInt(it.amount)
                                  return (
                                    <td style={{ textAlign: "right" }}> {it.amount} </td>
                                  )
                                } else {
                                  total_annual_fee = total_annual_fee + 0
                                  return (
                                    <td style={{ textAlign: "right" }}> 0 </td>
                                  )
                                }
                              }
                              else {
                                if (compValue == true) {
                                  compValue = false
                                  if (it.amount != "") {
                                    total_annual_fee = total_annual_fee + parseInt(it.amount)
                                    computerfee = parseInt(computerfee) + parseInt(it.amount)
                                  
                                  } else {
                                    total_annual_fee = total_annual_fee + 0
                                    computerfee = parseInt(computerfee) + 0
                                    // return (
                                    //   <td style={{ textAlign: "right" }}> 0 </td>
                                    // )
                                  }

                                } else {
                                  if (it.amount != "") {
                                    total_annual_fee = total_annual_fee + parseInt(it.amount)
                                    computerfee = parseInt(computerfee) + parseInt(it.amount)
                                    return (
                                      <td style={{ textAlign: "right" }}> {computerfee} </td>
                                    )
                                  } else {
                                    total_annual_fee = total_annual_fee + 0
                                    computerfee = parseInt(computerfee) + 0
                                    return (
                                      <td style={{ textAlign: "right" }}> 0 </td>
                                    )
                                  }
                               
                                }

                              }
                            }
                          })
                        }
                        <td style={{ textAlign: "right" }}> {ite.paid_amount - total_annual_fee - total_one_time_fee > 0 ? ite.paid_amount - total_annual_fee - total_one_time_fee : (ite.paid_amount - total_annual_fee - total_one_time_fee) * (-1)} </td>
                        <td style={{ textAlign: "right" }}> {ite.fine} </td>
                        {/* <td style={{textAlign:"right"}}> {ite.grand_total} </td> */}
                        <td style={{ textAlign: "right" }}>{ite.paid_amount} </td>
                        {/* <td style={{textAlign:"right"}}> {parseInt(ite.balance)<0 ? ite.balance:"0"} </td>
              <td style={{textAlign:"right"}}> {parseInt(ite.balance)>0 ? ite.balance:"0"} </td> */}
                      </tr>
                    )

                  }

                })
                }
                {this.state.SuspiciousVoucherByDate[0] != undefined ?
                  <tr><td colspan="20"><h4 className="text-center">Suspicious Account</h4></td></tr>
                  : null
                }
                {this.state.SuspiciousVoucherByDate[0] != undefined ?
                  this.state.SuspiciousVoucherByDate.map((item, index) => {
                    totalSuspiciousAmount = totalSuspiciousAmount + parseInt(item.amount)
                    return (
                      <tr>
                        <td>0</td>
                        <td>{item.bank}</td>
                        {/* <td style={{ textAlign: "right" }}>0</td> */}
                        <td style={{ textAlign: "right" }}>0</td>
                        <td style={{ textAlign: "right" }}>0</td>
                        <td style={{ textAlign: "right" }}>0</td>
                        <td style={{ textAlign: "right" }}>0</td>
                        <td style={{ textAlign: "right" }}>0</td>
                        <td style={{ textAlign: "right" }}>0</td>
                        <td style={{ textAlign: "right" }}>0</td>
                        <td style={{ textAlign: "right" }}>0</td>
                        <td style={{ textAlign: "right" }}>0</td>
                        <td style={{ textAlign: "right" }}>0</td>
                        <td style={{ textAlign: "right" }}>0</td>
                        <td style={{ textAlign: "right" }}>0</td>
                        <td style={{ textAlign: "right" }}>{item.amount}</td>
                        <td style={{ textAlign: "right" }}>0</td>
                        <td style={{ textAlign: "right", fontWeight: "bold" }}>{item.amount}</td>
                      </tr>
                    )
                  })
                  : null
                } 
                {this.state.Bank == '' || this.state.Bank == "PNB" ?
                  <tr>
                  <th scope="col">TOTAL</th>
                  <td></td>
                  <td></td>
                  <td></td>
                  {this.state.sumOfAllFeeDetailPNB.map((item, index) => {
                    rowTotalDetail = rowTotalDetail + parseInt(item.amount)
                    return (
                      <td style={{ textAlign: "right", fontWeight: "bold" }}>{item.amount}</td>
                    )
                  })}
                  <td style={{ textAlign: "right", fontWeight: "bold" }}>{parseInt(sumOfTutionFeeDetailPNB)}</td>
                  <td style={{ textAlign: "right", fontWeight: "bold" }}>{sumOfFineDetailPNB}</td>
                  <td style={{ textAlign: "right", fontWeight: "bold" }}>  {parseInt(paidamountbyPNB)}</td>
                </tr>
                :
                null}

            {this.state.sumOfAllFeeDetailPNB !="" && this.state.sumOfAllFeeDetailSBI !="" ?
                <tr>
                  <th scope="col">Grand TOTAL</th>
                  <td></td>
                  <td></td>
                  <td></td>
                  {this.state.sumOfAllFeeDetail.map((item, index) => {
                    
                    return (
                      <td style={{ textAlign: "right", fontWeight: "bold" }}>{item.amount}</td>
                    )
                  })}
                  <td style={{ textAlign: "right", fontWeight: "bold" }}>{parseInt(sumOfTutionFeeDetail) + parseInt(totalSuspiciousAmount)}</td>
                  <td style={{ textAlign: "right", fontWeight: "bold" }}>{sumOfFineDetail}</td>
                  <td style={{ textAlign: "right", fontWeight: "bold" }}>  {parseInt(paidamountbydate) + parseInt(totalSuspiciousAmount)}</td>
                </tr>
                :null
                }
                <tr>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                  <th scope="col" colspan="2">Row Total : </th>
                  <th scope="col">{parseInt(rowTotalDetail) + parseInt(sumOfTutionFeeDetail + parseInt(totalSuspiciousAmount))}</th>
                  <th></th>
                  <th scope="col">Dif : </th>
                  <th scope="col">{parseInt(paidamountbydate) - (parseInt(rowTotalDetail) + parseInt(sumOfTutionFeeDetail))}</th>
                </tr>
              </tbody>
            </table>


          </div>
          :
          null}

        {this.state.voucher_by_class != '' ?
          <div className="row layoutCard">
            {this.state.voucher_by_class.map((item, index) => {
              paidamountbyclass = parseInt(paidamountbyclass) + parseInt(item.paid_amount)
            })}
            <h3> Total  :{paidamountbyclass} / {this.state.voucher_by_class.length}</h3>
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">Date</th>
                  <th scope="col">Class</th>
                  <th scope="col">Bank</th>
                  <th scope="col">Amount</th>
                </tr>
              </thead>
              <tbody>

                {this.state.voucher_by_class.map((ite, ind) => {
                  if (ind == 0) {
                    return (
                      <tr>
                        <td>{Moment(ite.receipt_date).format("DD-MM-YYYY")}</td>
                        <td>{ite.class_name}</td>
                        <td> {this.state.Bank == '' ? "All" : ite.bank}</td>
                        <th scope="col">{paidamountbyclass}</th>
                      </tr>
                    )
                  }
                })
                }
              </tbody>
            </table>


          </div>
          :
          null}


        <div className="row bg-white printvoucherbydate" style={{display:'none'}}>
        <div className="col-12 text-center pb-5">
                <h3>CONSTANCIA SCHOOL (UT056)</h3>
                <h4 className="pt-2" style={{fontWeight:"unset"}}>WEST CANAL ROAD, P.O MAJRA, DEHRADUN<br/>
                0135-2640930,0135-262828,FAX:0135-2644353</h4>
        </div>
          <div className="col-12"><h3 className="text-center">Day Book ({Moment(this.state.VoucherDate).format("DD-MM-YYYY")})</h3></div>
          {this.state.SuspiciousVoucherByDate.map((item, index) => {
            Showprint_totalSuspiciousAmount = parseInt(Showprint_totalSuspiciousAmount) + parseInt(item.amount)
          })}
          <h4 className="text-center mt-4"> Total  : {paidamountbydate + Showprint_totalSuspiciousAmount} / {this.state.printvoucherbydate.length + this.state.SuspiciousVoucherByDate.length}</h4>
          <table class="table">
            <thead>
              <tr style={{ borderBottom: "3px solid black" }}>
              <th scope="col">SR NO</th>
                <th scope="col">Admn No</th>
                <th scope="col">Name</th>
                {this.state.printvoucherbydate.map((itemm, index) => {
                  if (index == this.state.printvoucherbydate.length - 1) {
                    return (
                      JSON.parse(itemm.Allfees).map((it, ind) => {
                        if (it.fee_category == "ONE TIME") {
                          if (it.fee_sub_category.includes("PROSPECTUS") != true && it.fee_sub_category.includes("REGISTRATION") !=true) {
                            if (it.fee_sub_category.includes("ADMISSION")) {
                              return (
                                <th scope="col"> ADMN.  </th>
                              )
                            } 
                            // else if (it.fee_sub_category.includes("REGISTRATION")) {
                            //   return (
                            //     <th scope="col"> REG. </th>
                            //   )
                            // }
                            else if (it.fee_sub_category.includes("SECURITY")) {
                              return (
                                <th scope="col"> SECU. </th>
                              )
                            }
                            else {
                              return (
                                <th scope="col"> {it.fee_sub_category} </th>
                              )
                            }
                          }

                        }
                      })
                    )
                  }
                })}
                {this.state.printvoucherbydate.map((itemm, index) => {
                  if (index == this.state.printvoucherbydate.length - 1) {
                    var compValue = true
                    return (
                      JSON.parse(itemm.Allfees).map((it, ind) => {

                        if (it.fee_category == "ANNUAL") {
                          if (it.fee_sub_category.includes("COMPUTER") != true) {
                            if (it.fee_sub_category.includes("REPORT CARD")) {
                              return (
                                <th scope="col"> Card & Diary </th>
                              )
                            }
                            else if (it.fee_sub_category.includes("ANNUAL PRIZE")) {
                              return (
                                <th scope="col"> prize day </th>
                              )
                            }
                            else if (it.fee_sub_category.includes("DEVELOPMENT")) {
                              return (
                                <th scope="col">DEV. FUND </th>
                              )
                            } else if (it.fee_sub_category.includes("MAGAZINE")) {
                              return (
                                <th scope="col">MAGAZINE </th>
                              )
                            }
                            else if (it.fee_sub_category.includes("SPORTS")) {
                              return (
                                <th scope="col">SPORTS </th>
                              )
                            }
                            else if (it.fee_sub_category.includes("EXAMINATION")) {
                              return (
                                <th scope="col">EXAM.</th>
                              )
                            }
                            else if (it.fee_sub_category.includes("ICSE")) {
                              return (
                                <th scope="col">ICSE </th>
                              )
                            }
                            else if (it.fee_sub_category.includes("BOARD FEE")) {
                              return (
                                <th scope="col">BOARD</th>
                              )
                            }
                            else {
                              return (
                                <th scope="col">{it.fee_sub_category}</th>
                              )
                            }
                          }
                          else {
                            if (compValue == true) {
                              compValue = false
                              return (
                                <th scope="col">COMP.</th>
                              )

                            }
                          }
                        }

                      })
                    )
                  }
                })}
                <th scope="col">Tuition</th>
                <th scope="col">Fine</th>
                <th scope="col">Total</th>
                {/* <th scope="col">Paid</th> */}
                {/* <th scope="col">Dues</th>
                 <th scope="col">Surplus</th> */}
              </tr>
            </thead>
            <tbody>
              {this.state.printvoucherbydate.map((item, index) => {
                paidamountbydate = parseInt(paidamountbydate) + parseInt(item.paid_amount)
              })}
              {this.state.Bank == '' || this.state.Bank == "SBI" ?
                <tr><td colspan="20"><h4 className="text-center">SBI</h4></td></tr>
                : null}
              {this.state.printvoucherbydate.map((ite, ind) => {
                
                var compValue = true
                var computerfee = 0
                print_one_time_fee = 0
                print_total_annual_fee = 0
                if (ite.bank == "SBI") {
                  print_sbi_sr_no=print_sbi_sr_no+1
                  return (
                    <tr>
                      <td>{print_sbi_sr_no}</td>
                      <td>{ite.admission_no}/{ite.account_no}</td>
                      <td> {ite.name} </td>
                      {
                        JSON.parse(ite.Allfees).map((it, ind) => {
                          if (it.fee_category == "ONE TIME") {
                            if (it.fee_sub_category.includes("PROSPECTUS") != true && it.fee_sub_category.includes("REGISTRATION") !=true) {
                              if (it.amount != "") {
                                print_one_time_fee = print_one_time_fee + parseInt(it.amount)
                                return (
                                  <td style={{ textAlign: "right" }}>{it.amount} </td>
                                )
                              } else {
                                print_one_time_fee = print_one_time_fee + 0
                                return (
                                  <td style={{ textAlign: "right" }}>0</td>
                                )
                              }
                            }
                          }
                        })
                      }
                      {
                        JSON.parse(ite.Allfees).map((it, ind) => {
                          if (it.fee_category == "ANNUAL") {

                            if (it.fee_sub_category.includes("COMPUTER") != true) {
                              if (it.amount != "") {
                                print_total_annual_fee = print_total_annual_fee + parseInt(it.amount)
                                return (
                                  <td style={{ textAlign: "right" }}> {it.amount} </td>
                                )
                              } else {
                                print_total_annual_fee = print_total_annual_fee + 0
                                return (
                                  <td style={{ textAlign: "right" }}> 0 </td>
                                )
                              }
                            }
                            else {
                              if (compValue == true) {
                                compValue = false
                                if (it.amount != "") {
                                  print_total_annual_fee = print_total_annual_fee + parseInt(it.amount)
                                  computerfee = parseInt(computerfee) + parseInt(it.amount)
                                  // return(
                                  //     <td style={{textAlign:"right"}}> {it.amount} </td>
                                  // )
                                } else {
                                  print_total_annual_fee = print_total_annual_fee + 0
                                  computerfee = parseInt(computerfee) + 0
                                  // return (
                                  //   <td style={{ textAlign: "right" }}> 0 </td>
                                  // )
                                }

                              } else {
                                if (it.amount != "") {
                                  print_total_annual_fee = print_total_annual_fee + parseInt(it.amount)
                                  computerfee = parseInt(computerfee) + parseInt(it.amount)
                                  return (
                                    <td style={{ textAlign: "right" }}> {computerfee} </td>
                                  )
                                } else {
                                  print_total_annual_fee = print_total_annual_fee + 0
                                  computerfee = parseInt(computerfee) + 0
                                  return (
                                    <td style={{ textAlign: "right" }}> 0 </td>
                                  )
                                }
                                //   computerfee=parseInt(computerfee)+parseInt(it.amount)
                                //   return(
                                //     <td style={{textAlign:"right"}}> {computerfee} </td>
                                // )
                              }

                            }
                          }

                        })
                      }
                      <td style={{ textAlign: "right" }}> {ite.paid_amount - print_total_annual_fee - print_one_time_fee > 0 ? ite.paid_amount - print_total_annual_fee - print_one_time_fee : (ite.paid_amount - print_total_annual_fee - print_one_time_fee) * (-1)} </td>
                      <td style={{ textAlign: "right" }}>{ite.fine} </td>
                      <td style={{ textAlign: "right"}}>{ite.paid_amount}   </td>
                      {/* <td>{parseInt(ite.balance)<0 ? ite.balance:"0"}</td>
              <td>{parseInt(ite.balance)>0 ? ite.balance:"0"}</td> */}
                    </tr>
                  )
                }
              })
              }
              {this.state.Bank == '' || this.state.Bank == "SBI" ?
                  <tr>
                  <th scope="col">TOTAL</th>
                  <td></td>
                  <td></td>
                  {this.state.sumOfAllFeePrintSBI.map((item, index) => {
                    rowTotalPrint = rowTotalPrint + parseInt(item.amount)
                    return (
                      <td style={{ textAlign: "right", fontWeight: "bold" }}>{item.amount}</td>
                    )
                  })}
                  <td style={{ textAlign: "right", fontWeight: "bold" }}>{parseInt(sumOfTutionFeePrintSBI)}</td>
                  <td style={{ textAlign: "right", fontWeight: "bold" }}>{sumOfFinePrintSBI} </td>
                  <td style={{ fontWeight: "bold",textAlign:"right" }}>{parseInt(paidamountbyPrintSBI)}   </td>
                </tr>
                :
                null}

              {this.state.Bank == '' || this.state.Bank == "PNB" ?
                <tr><td colspan="20"><h4 className="text-center">PNB</h4></td></tr>
                : null}
              {this.state.printvoucherbydate.map((ite, ind) => {
                var compValue = true
                var computerfee = 0
                print_one_time_fee = 0
                print_total_annual_fee = 0
                if (ite.bank == "PNB") {
                  print_pnb_sr_no = print_pnb_sr_no+1
                  return (
                    <tr>
                      <td>{print_pnb_sr_no}</td>
                      <td>{ite.admission_no}/{ite.account_no}</td>
                      <td> {ite.name} </td>

                      {
                        JSON.parse(ite.Allfees).map((it, ind) => {
                          if (it.fee_category == "ONE TIME") {
                            if (it.fee_sub_category.includes("PROSPECTUS") != true&& it.fee_sub_category.includes("REGISTRATION") !=true) {
                              if (it.amount != "") {
                                print_one_time_fee = print_one_time_fee + parseInt(it.amount)
                                return (
                                  <td style={{ textAlign: "right" }}>{it.amount} </td>
                                )
                              } else {
                                print_one_time_fee = print_one_time_fee + 0
                                return (
                                  <td style={{ textAlign: "right" }}>0</td>
                                )
                              }
                            }
                          }
                        })
                      }
                      {
                        JSON.parse(ite.Allfees).map((it, ind) => {
                          if (it.fee_category == "ANNUAL") {

                            if (it.fee_sub_category.includes("COMPUTER") != true) {
                              if (it.amount != "") {
                                print_total_annual_fee = print_total_annual_fee + parseInt(it.amount)
                                return (
                                  <td style={{ textAlign: "right" }}> {it.amount} </td>
                                )
                              } else {
                                print_total_annual_fee = print_total_annual_fee + 0
                                return (
                                  <td style={{ textAlign: "right" }}> 0 </td>
                                )
                              }
                            }
                            else {
                              if (compValue == true) {
                                compValue = false
                                if (it.amount != "") {
                                  print_total_annual_fee = print_total_annual_fee + parseInt(it.amount)
                                  computerfee = parseInt(computerfee) + parseInt(it.amount)
                                  // return(
                                  //     <td style={{textAlign:"right"}}> {it.amount} </td>
                                  // )
                                } else {
                                  print_total_annual_fee = print_total_annual_fee + 0
                                  computerfee = parseInt(computerfee) + 0
                                  // return (
                                  //   <td style={{ textAlign: "right" }}> 0 </td>
                                  // )
                                }

                              } else {
                                if (it.amount != "") {
                                  print_total_annual_fee = print_total_annual_fee + parseInt(it.amount)
                                  computerfee = parseInt(computerfee) + parseInt(it.amount)
                                  return (
                                    <td style={{ textAlign: "right" }}> {computerfee} </td>
                                  )
                                } else {
                                  print_total_annual_fee = print_total_annual_fee + 0
                                  computerfee = parseInt(computerfee) + 0
                                  return (
                                    <td style={{ textAlign: "right" }}> 0 </td>
                                  )
                                }
                                //   computerfee=parseInt(computerfee)+parseInt(it.amount)
                                //   return(
                                //     <td style={{textAlign:"right"}}> {computerfee} </td>
                                // )
                              }

                            }
                          }

                        })
                      }
                      <td style={{ textAlign: "right" }}> {ite.paid_amount - print_total_annual_fee - print_one_time_fee > 0 ? ite.paid_amount - print_total_annual_fee - print_one_time_fee : (ite.paid_amount - print_total_annual_fee - print_one_time_fee) * (-1)} </td>
                      <td style={{ textAlign: "right" }}>{ite.fine} </td>
                      <td  style={{ textAlign: "right"}}>{ite.paid_amount}   </td>
                      {/* <td>{parseInt(ite.balance)<0 ? ite.balance:"0"}</td>
               <td>{parseInt(ite.balance)>0 ? ite.balance:"0"}</td> */}
                    </tr>
                  )
                }
              })
              }


              {this.state.SuspiciousVoucherByDate[0] != undefined ?
                <tr><td colspan="20"><h4 className="text-center">Suspicious Account</h4></td></tr>
                : null
              }
              {this.state.SuspiciousVoucherByDate[0] != undefined ?
                this.state.SuspiciousVoucherByDate.map((item, index) => {
                  print_totalSuspiciousAmount = print_totalSuspiciousAmount + parseInt(item.amount)
                  return (
                    <tr>
                      <td>0</td>
                      <td>{item.bank}</td>
                      {/* <td style={{ textAlign: "right" }}>0</td> */}
                      <td style={{ textAlign: "right" }}>0</td>
                      <td style={{ textAlign: "right" }}>0</td>
                      <td style={{ textAlign: "right" }}>0</td>
                      <td style={{ textAlign: "right" }}>0</td>
                      <td style={{ textAlign: "right" }}>0</td>
                      <td style={{ textAlign: "right" }}>0</td>
                      <td style={{ textAlign: "right" }}>0</td>
                      <td style={{ textAlign: "right" }}>0</td>
                      <td style={{ textAlign: "right" }}>0</td>
                      <td style={{ textAlign: "right" }}>0</td>
                      <td style={{ textAlign: "right" }}>0</td>
                      <td style={{ textAlign: "right" }}>0</td>
                      <td style={{ textAlign: "right" }}>{item.amount}</td>
                      <td style={{ textAlign: "right" }}>0 </td>
                      <td style={{ textAlign: "right", fontWeight: "bold" }}>{item.amount}</td>
                    </tr>
                  )
                })
                : null
              }

                {this.state.Bank == '' || this.state.Bank == "PNB" ?
                  <tr>
                  <th scope="col">TOTAL</th>
                  <td></td>
                  <td></td>
                  {this.state.sumOfAllFeePrintPNB.map((item, index) => {
                    rowTotalPrint = rowTotalPrint + parseInt(item.amount)
                    return (
                      <td style={{ textAlign: "right", fontWeight: "bold" }}>{item.amount}</td>
                    )
                  })}
                  <td style={{ textAlign: "right", fontWeight: "bold" }}>{parseInt(sumOfTutionFeePrintPNB)}</td>
                  <td style={{ textAlign: "right", fontWeight: "bold" }}>{sumOfFinePrintPNB} </td>
                  <td style={{  fontWeight: "bold" ,textAlign:"right"}}>{parseInt(paidamountbyPrintPNB)}   </td>
                </tr>
                :
                null}
                 {this.state.sumOfAllFeePrintPNB !="" && this.state.sumOfAllFeePrintSBI ?
               <tr>
                <th scope="col">Grand TOTAL</th>
                <td></td>
                <td></td>
                {this.state.sumOfAllFeePrint.map((item, index) => {
                  return (
                    <td style={{ textAlign: "right", fontWeight: "bold" }}>{item.amount}</td>
                  )
                })}
                <td style={{ textAlign: "right", fontWeight: "bold" }}>{parseInt(sumOfTutionFeePrint) + parseInt(print_totalSuspiciousAmount)}</td>
                <td style={{ textAlign: "right", fontWeight: "bold" }}>{sumOfFinePrint} </td>
                <td style={{ fontWeight: "bold",textAlign:"right" }}>{(parseInt(paidamountbydate / 2)) + parseInt(print_totalSuspiciousAmount)}   </td>
              </tr>
              :null
              }
              <tr>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th scope="col" colspan="2">Row Total</th>
                <th scope="col">{paidamountbydate / 2 + parseInt(print_totalSuspiciousAmount)}</th>
                <th></th>
                <th scope="col">Dif</th>
                <th scope="col">{(parseInt(paidamountbydate / 2)) - (parseInt(sumOfTutionFeePrint) + parseInt(rowTotalPrint))}</th>
              </tr>
            </tbody>
          </table>


        </div>
             { this.state.SummaryData != '' || this.state.SummaryDataPNB != ''?
          <div className="row bg-white printsummary">
          <div className="col-12">
            <h4 className="text-center pb-5">FEE SUMMARY FROM {Moment(this.state.summaryFrom).format("DD-MM-YYYY")} TO {Moment(this.state.summaryTo).format("DD-MM-YYYY")} ({this.state.Bank=="" ? "ALL" : this.state.Bank})</h4>
          </div>
            <table class="table">
            <thead>
                <tr>
                 <th scope="col" >DATE </th>
                  {/* <th scope="col" >REG. </th> */}
                  <th scope="col">ADMN.</th>
                  <th scope="col">SEC.</th>
                  <th scope="col">R.CARD&DAIRY</th>
                  <th scope="col">PRIZE</th>
                  <th scope="col">DEV.</th>
                  <th scope="col">MAGAZINE</th>
                  <th scope="col">SPORTS</th>
                  <th scope="col">EXAM.</th>
                  <th scope="col">COMPUTER</th>
                  <th scope="col">CISCE</th>
                  <th scope="col">BOARD</th>
                  
                  
                  <th scope="col">MISC</th>
                  <th scope="col">TUITION</th>
                  <th scope="col">FINE</th>
                  <th scope="col">TOTAL</th>
                
                </tr>
            </thead>
            <tbody>
            {this.state.SummaryData != '' ?
                <tr><td colspan="20"><h4 className="text-center">SBI</h4></td></tr>
                : null}
              {this.state.SummaryData.map((item,index)=>{
                return(
                  <tr>
                  <td>{Moment(item['show_receipt_date']).format("DD-MM-YYYY")}</td>
                  {/* <td style={{ textAlign: "right"}}>{item['REGISTRATION FEE']}</td> */}
                  <td style={{ textAlign: "right"}}>{item['ADMISSION FEE']}</td>
                  <td style={{ textAlign: "right"}}>{item['SECURITY FEE']}</td>
                  <td style={{ textAlign: "right"}}>{item['REPORT CARD AND DIARY']}</td>
                  <td style={{ textAlign: "right"}}>{item['ANNUAL PRIZE DAY']}</td>
                  <td style={{ textAlign: "right"}}>{item['DEVELOPMENT FUND']}</td>
                  <td style={{ textAlign: "right"}}>{item['SCHOOL MAGAZINE']}</td>
                  <td style={{ textAlign: "right"}}>{item['ANNUAL SPORTS DAY']}</td>
                  <td style={{ textAlign: "right"}}>{item['EXAMINATION FEE']}</td>
                  <td style={{ textAlign: "right"}}>{item['COMPUTER (2)']}</td>
                  <td style={{ textAlign: "right"}}>{item['REGISTRATION FEE ICSE']}</td>
                  <td style={{ textAlign: "right"}}>{item['BOARD FEE']}</td>
                  <td style={{ textAlign: "right"}}>{item['MISC']}</td>
                  <td style={{ textAlign: "right"}}>{item['tuition_fee']}</td>
                  <td style={{ textAlign: "right"}}>{item['fine']} </td>
                  <td style={{ textAlign: "right"}}>{item['paid_amount']}   </td>
                  </tr>
                )
              })}
               {this.state.Bank == '' || this.state.Bank == "SBI" ?
                  <tr>
                  <th scope="col">TOTAL</th>
                
                  {this.state.sumOfAllFeeSummarySBI.map((item, index) => {
                    
                    return (
                      <td style={{ textAlign: "right", fontWeight: "bold" }}>{item.amount}</td>
                    )
                  })}
                  <td style={{ textAlign: "right", fontWeight: "bold" }}>{parseInt(sumOfTutionFeeSummarySBI)}</td>
                  <td style={{ textAlign: "right", fontWeight: "bold" }}>{sumOfFineSummarySBI} </td>
                  <td style={{  fontWeight: "bold",textAlign: "right" }}>{parseInt(paidamountSummarybySBI)}   </td>
                </tr>
                :
                null}
              {this.state.SummaryDataPNB != '' ?
                <tr><td colspan="20"><h4 className="text-center">PNB</h4></td></tr>
                : null}
              {this.state.SummaryDataPNB.map((item,index)=>{
                return(
                  <tr>
                  <td >{Moment(item['show_receipt_date']).format("DD-MM-YYYY")}</td>
                  {/* <td style={{ textAlign: "right"}}>{item['REGISTRATION FEE']}</td> */}
                  <td style={{ textAlign: "right"}}>{item['ADMISSION FEE']}</td>
                  <td style={{ textAlign: "right"}}>{item['SECURITY FEE']}</td>
                  <td style={{ textAlign: "right"}}>{item['REPORT CARD AND DIARY']}</td>
                  <td style={{ textAlign: "right"}}>{item['ANNUAL PRIZE DAY']}</td>
                  <td style={{ textAlign: "right"}}>{item['DEVELOPMENT FUND']}</td>
                  <td style={{ textAlign: "right"}}>{item['SCHOOL MAGAZINE']}</td>
                  <td style={{ textAlign: "right"}}>{item['ANNUAL SPORTS DAY']}</td>
                  <td style={{ textAlign: "right"}}>{item['EXAMINATION FEE']}</td>
                  <td style={{ textAlign: "right"}}>{item['COMPUTER (2)']}</td>
                  <td style={{ textAlign: "right"}}>{item['REGISTRATION FEE ICSE']}</td>
                  <td style={{ textAlign: "right"}}>{item['BOARD FEE']}</td>
                  <td style={{ textAlign: "right"}}>{item['MISC']}</td>
                  <td style={{ textAlign: "right"}}>{item['tuition_fee']}</td>
                  <td style={{ textAlign: "right"}}>{item['fine']}</td>
                  <td style={{ textAlign: "right"}}>{item['paid_amount']}   </td>
                  </tr>
                )
              })}

                {this.state.Bank == '' || this.state.Bank == "PNB" ?
                  <tr>
                  <th scope="col">TOTAL</th>
                  
                  {this.state.sumOfAllFeeSummaryPNB.map((item, index) => {
                    
                    return (
                      <td style={{ textAlign: "right", fontWeight: "bold" }}>{item.amount}</td>
                    )
                  })}
                  <td style={{ textAlign: "right", fontWeight: "bold" }}>{parseInt(sumOfTutionFeeSummaryPNB)}</td>
                  <td style={{ textAlign: "right", fontWeight: "bold" }}>{sumOfFineSummaryPNB} </td>
                  <td style={{  fontWeight: "bold",textAlign:"right" }}>{parseInt(paidamountSummarybyPNB)}   </td>
                </tr>
                :
                null}

                {/* For ALL */}
                
                  <tr>
                  <th scope="col"> Grand TOTAL</th>
              
                  {this.state.sumOfAllFeeSummary.map((item, index) => {
                    
                    return (
                      <td style={{ textAlign: "right", fontWeight: "bold" }}>{item.amount}</td>
                    )
                  })}
                  <td style={{ textAlign: "right", fontWeight: "bold" }}>{parseInt(sumOfTutionFeeSummary)}</td>
                  <td style={{ textAlign: "right", fontWeight: "bold" }}>{sumOfFineSummary} </td>
                  <td style={{  fontWeight: "bold",textAlign:"right" }}>{parseInt(paidamountSummary)}   </td>
                </tr>
              </tbody>
              </table>
              </div>
              :null}
      </>
    )
  }

}
export default FeeVoucher;