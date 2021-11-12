import React, {
  Component
} from 'react';
import Dropzone from 'react-dropzone';
import csv from 'csv';
import Moment from 'moment';
class FeesImport extends Component {
  onDrop(files) {
    this.setState({
      files
    });
    var file = files[0];
    const reader = new FileReader();
    reader.onload = () => {
      csv.parse(reader.result, (err, data) => {
        console.log(data.length)
        var userList = [];
        for (var j = 26201; j < 26275; j=j+100) {
        //   var AcademicuserList = [];
        for (var i = j; i < j+75; i++) {
          var session = '2019-2020';
          var unique_id = session + data[i][94]+data[i][12]+data[i][52]+i;
          var class_name;
          if (data[i][86] == "1") {
            class_name = "PRE-NUR";
            var fees = []
          } else if (data[i][86] == "2") {
            class_name = "NUR";
            var fees = []
          } else if (data[i][86] == "3") {
            class_name = "K.G.";
            var fees = []
          } else if (data[i][86] == "4") {
            class_name = "1";
            var fees = []
          } else if (data[i][86] == "5") {
            class_name = "2";
            var fees = []
          } else if (data[i][86] == "6") {
            class_name = "3";
            var fees = []
          } else if (data[i][86] == "7") {
            class_name = "4";
            var fees = []
          } else if (data[i][86] == "8") {
            class_name = "5";
            var fees = []
          } else if (data[i][86] == "9") {
            class_name = "6";
            var fees = []
          } else if (data[i][86] == "10") {
            class_name = "7";
            var fees = []
          } else if (data[i][86] == "11") {
            class_name = "8";
            var fees = []
          } else if (data[i][86] == "12") {
            class_name = "9SCI";
            var fees = []
          } else if (data[i][86] == "13") {
            class_name = "9COM";
            var fees = []
          } else if (data[i][86] == "14") {
            class_name = "10COM";
            var fees = []
          } else if (data[i][86] == "15") {
            class_name = "10SCI";
            var fees = []
          } else if (data[i][86] == "16") {
            class_name = "11SCI";
            var fees = []
          } else if (data[i][86] == "17") {
            class_name = "11COM";
            var fees = []
          } else if (data[i][86] == "18") {
            class_name = "12SCI";
            var fees = []
          } else if (data[i][86] == "19") {
            class_name = "12COM";
            var fees = []
          }
          // const phoneNumber = data[i][1];
          const admission_no = data[i][12];
          const receipt_no = data[i][94];
          const section = data[i][87];
          const account_no = data[i][52];
          const receipt_date = Moment(data[i][96]).format("YYYY-MM-DD");
          const defaulter_month = Moment(data[i][96]).format("M");
          const name = data[i][16];
          const fine = data[i][118];
          const paid_amount = data[i][121];
          const grand_total = data[i][133];
          const payment_mode = "BANK";
          const balance = parseInt(-data[i][122]) + parseInt(data[i][123])

          const fee_concession = data[i][29];
          var is_full_free_ship;
          if (data[i][33] == "0") {
            is_full_free_ship = "false";
          } else {
            is_full_free_ship = "true";
          }
          var is_teacher_ward;
          if (data[i][34] == "0") {
            is_teacher_ward = "false";
          } else {
            is_teacher_ward = "true";
          }
          var take_computer;
          if (data[i][37] == "0") {
            take_computer = "false";
          } else {
            take_computer = "true";
          }
          const prospectus_fee = data[i][99];
          const registration_fee = data[i][100];
          const admission_fee = data[i][101];
          const security_fee = data[i][102];

          const total_one_time_fee = data[i][103];
          const total_annual_fee = data[i][112];
          const total_monthly_fee = data[i][120];
          const paid_month = Moment(data[i][98]).format("M")

          const last_fee_date = Moment(data[i][98]).format("YYYY-MM-DD");
          var bank;
          if (data[i][93] == "3220") {
            bank = "PNB"
          } else {
            bank = "SBI"
          }
          const paid_fees = [{
            'tuition_fee': data[i][113],
            'fee_month': Moment(data[i][98]).format("M"),
            'annual_fees': data[i][112],
            'one_time': data[i][103]
          }]
          const Allfees = [{
              'fee_category': "ANNUAL",
              "fee_sub_category": "REPORT CARD AND DIARY",
              "amount": data[i][104],
              "month": "4"
            }, {
              'fee_category': "ANNUAL",
              "fee_sub_category": "ANNUAL PRIZE DAY",
              "amount": data[i][105],
              "month": "4"
            }, {
              'fee_category': "ANNUAL",
              "fee_sub_category": "DEVELOPMENT FUND",
              "amount": data[i][106],
              "month": "7"
            }, {
              'fee_category': "ANNUAL",
              "fee_sub_category": "SCHOOL MAGAZINE",
              "amount": data[i][107],
              "month": "9"
            }, {
              'fee_category': "ANNUAL",
              "fee_sub_category": "ANNUAL SPORTS DAY",
              "amount": data[i][108],
              "month": "11"
            }, {
              'fee_category': "ANNUAL",
              "fee_sub_category": "EXAMINATION FEE",
              "amount": data[i][109],
              "month": "1"
            }, {
              'fee_category': "ANNUAL",
              "fee_sub_category": "COMPUTER(1)",
              "amount": data[i][114],
              "month": "8"
            }, {
              'fee_category': "ANNUAL",
              "fee_sub_category": "COMPUTER(2)",
              "amount": "",
              "month": "12"
            }, {
              'fee_category': "ANNUAL",
              "fee_sub_category": "REGISTRATION FEE ICSE",
              "amount": '',
              "month": "8"
            },
            {
              'fee_category': "ANNUAL",
              "fee_sub_category": "BOARD FEE",
              "amount": data[i][110],
              "month": "8"
            },
            {
              'fee_category': "ONE TIME",
              "fee_sub_category": "PROSPECTUS FEE",
              "amount": data[i][99],
              "month": ""
            },
            {
              'fee_category': "ONE TIME",
              "fee_sub_category": "REGISTRATION FEE",
              "amount": data[i][100],
              "month": ""
            },
            {
              'fee_category': "ONE TIME",
              "fee_sub_category": "ADMISSION FEE",
              "amount": data[i][101],
              "month": ""
            }, {
              'fee_category': "ONE TIME",
              "fee_sub_category": "SECURITY FEE",
              "amount": data[i][102],
              "month": ""
            },
            {
              'fee_category': "MONTHLY",
              "fee_sub_category": "TUITION FEE",
              "amount": data[i][113],
              "month": ""
            },
            {
              'fee_category': "MONTHLY",
              "fee_sub_category": "BUS FARE",
              "amount": "",
              "month": ""
            },
             {
              'fee_category': "ANNUAL",
              "fee_sub_category": "MISC",
              "amount": data[i][119],
              "month": "4"
            },
          ]
          const newUser = {
            "school_id": "100",
            "receipt_no": receipt_no,
            "session": session,
            'class_name': class_name,
            'section': section,
            'account_no': account_no,
            'admission_no': admission_no,
            'name': name,
            "receipt_date": Moment(receipt_date).format("YYYY-MM-DD"),
            'paid_fees': JSON.stringify(paid_fees),
            "Allfees": JSON.stringify(Allfees),
            "bank": bank,
            "last_fee_date": last_fee_date,
            "fine": fine,
            'payment_mode': payment_mode,
            'total_one_time_fee': total_one_time_fee,
            "total_annual_fee": total_annual_fee,
            'total_monthly_fee': total_monthly_fee,
            "balance": balance,
            "paid_amount": paid_amount,
            "grand_total": grand_total,
            "prospectus_fee": prospectus_fee,
            "registration_fee": registration_fee,
            "admission_fee": admission_fee,
            "security_fee": security_fee,
            "defaulter_month": defaulter_month,
            "paid_month": paid_month,
            "fees": JSON.stringify(fees),
            "take_computer": take_computer,
            "is_teacher_ward": is_teacher_ward,
            'is_full_free_ship': is_full_free_ship,
            "fee_concession": fee_concession,
            "unique_id": unique_id
          }
          userList.push(newUser);
        }
        const dataa = new FormData()
        console.log(userList.length)
        dataa.append('AllFeeData', JSON.stringify(userList))
        // dataa.append('StudentAcademicData', JSON.stringify(AcademicuserList))
        const url = "http://192.168.29.123:4800/Importallfees"
        fetch(url, {
            // headers : { 
            //   'Content-Type':'application/json',
            //   'Accept':'application/json'
            // },
            method: 'post',
            body: dataa
          })
          .then(res => res.json())
          .then(dataa => {
            // alert("Promote Successfully")
            // this.setState({session:this.state.to_session})           
          }).catch(err => {});
          userList= []
      }
      
        // console.log("old data "+ JSON.stringify(userList))
      });

    };

    reader.readAsBinaryString(file);
  }
  render() {
    const wellStyles = {
      maxWidth: 400,
      margin: '0 auto 10px'
    };
    const fontSize = 5;
    return ( <
      div align = "center"
      oncontextmenu = "return false" >
      <
      br / > < br / > < br / >
      <
      div className = "dropzone" >
      <
      Dropzone accept = ".csv"
      onDropAccepted = {
        this.onDrop.bind(this)
      } >
      <
      /Dropzone> <
      br / > <br / > < br / >
      <
      /div> <
      h2 > Upload or drop your < font size = {
        fontSize
      }
      color = "#00A4FF" > CSV < /font><br / > file here. < /h2> <
      /div>
    )
  }
}

export default FeesImport;