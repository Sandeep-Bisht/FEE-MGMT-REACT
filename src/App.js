import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import csv from 'csv';
import Moment from 'moment';

class App extends Component {

  onDrop(files) {

    this.setState({ files });
    var file = files[0];
    const reader = new FileReader();
    reader.onload = () => {
        csv.parse(reader.result, (err, data) => {
        // console.log(err)
        var userList = [];
        //   var AcademicuserList = [];
        
         for (var i = 1; i <=1; i++) {
          var session = '2020-2021';
          var class_name;
          if(data[i][86] == "1"){
           class_name = "PRE-NUR";
          }
          else if(data[i][86] == "2"){
             class_name = "NUR";
          }
          else if(data[i][86] == "3"){
             class_name = "KG";
          }
          else if(data[i][86] == "4"){
             class_name = "1";
          }
          else if(data[i][86] == "5"){
             class_name = "2";
          }
          else if(data[i][86] == "6"){
             class_name = "3";
          }
          else if(data[i][86] == "7"){
             class_name = "4";
          }
          else if(data[i][86] == "8"){
             class_name = "5";
          }
          else if(data[i][86] == "9"){
             class_name = "6";
          }
          else if(data[i][86] == "10"){
             class_name = "7";
          }
          else if(data[i][86] == "11"){
             class_name = "8";
          }
          else if(data[i][86] == "12"){
             class_name = "9SCI";
          }
          else if(data[i][86] == "13"){
             class_name = "9COM";
          }
          else if(data[i][86] == "14"){
             class_name = "10COM";
          }
          else if(data[i][86] == "15"){
             class_name = "10SCI";
          }
          else if(data[i][86] == "16"){
             class_name = "11SCI";
          }
          else if(data[i][86] == "17"){
             class_name = "11COM";
          }
          else if(data[i][86] == "18"){
             class_name = "12SCI";
          }
          else if(data[i][86] == "19"){
             class_name = "12COM";
          }
        // const phoneNumber = data[i][1];
         var house ;
         if(data[i][6] == "2"){
            house = "HOWARD";
         }
         else if(data[i][6] == "4"){
            house = "KHANNA";
         }
         else if(data[i][6] == "6"){
            house = "GARDNER";
         }
         else if(data[i][6] == "7"){
            house = "LYONS";
         }
          const date_of_admission = Moment(data[i][11]).format("YYYY-MM-DD");
          const admission_no = data[i][12];
          const security_no = data[i][14];
          const aadhar_no = data[i][15];
          const name = data[i][16];
          const sex = data[i][17];
          const dob = Moment(data[i][18]).format("YYYY-MM-DD");
          const nationality = data[i][19];
          const fee_concession = data[i][29];
          const tc_status = data[i][30];
          const section = data[i][87];
          const account_no = data[i][52];
          const father_name = data[i][53];
          const mother_name = data[i][54];
          const father_occu = data[i][55];
          const father_designation = data[i][56];
          const father_annual_income = data[i][57]; 
          const mother_occu = data[i][58];
          const mother_designation = data[i][59];
          const mother_annual_income = data[i][60];

          const parent_address = data[i][61];
          const parent_phone = data[i][65];
          const parent_mobile = data[i][66];
          const parent_per_address = data[i][67];
          const parent_per_phone = data[i][71];
          const parent_per_mobile = data[i][72];
          const gaurdian_name = data[i][73];
          const gaurdian_address = data[i][77];
          const gaurdian_phone = data[i][81];
          const gaurdian_mobile = data[i][82];
          var is_full_free_ship;
          if(data[i][33]=="0"){
           is_full_free_ship = "false";
          }else{
           is_full_free_ship = "true";
          }
          var is_teacher_ward;
          if(data[i][34]=="0"){
            is_teacher_ward = "false";
           }else{
            is_teacher_ward = "true";
           }
          const bus_fare_concession = data[i][35];
          var take_computer;
          if(data[i][37]=="0"){
            take_computer = "false";
           }else{
            take_computer = "true";
           }
          const paid_upto_month = Moment("02"+"-"+data[i][24]+"-"+data[i][25]).format("YYYY-DD-MM");
          if( data[i][2] == "12" && data[i][31] == "0" ){
          const newUser = {"school_id":"UT015","father_name":father_name,"mother_name":mother_name,"father_occu":father_occu,"father_designation":father_designation,"father_annual_income":father_annual_income,"mother_occu":mother_occu, "mother_designation":mother_designation,"mother_annual_income":mother_annual_income,"parent_address":parent_address,"parent_phone":parent_phone,"parent_mobile":parent_mobile,"parent_per_address":parent_per_address,"parent_per_phone":parent_per_phone,"parent_per_mobile":parent_per_mobile,"gaurdian_name":gaurdian_name,"gaurdian_address":gaurdian_address,"gaurdian_phone":gaurdian_phone,"gaurdian_mobile":gaurdian_mobile,"section":section,"fee_concession":fee_concession,"account_no":account_no,"unique_id":session+admission_no,"session":session, "class_name":class_name, "house":house,"admission_no":admission_no,"name":name,"sex":sex,"dob":dob,"nationality":nationality,
          "paid_upto_month":paid_upto_month,"security_no":security_no,"date_of_admission": date_of_admission,"aadhar_no":aadhar_no,"is_full_free_ship":is_full_free_ship,"is_teacher_ward":is_teacher_ward,"bus_fare_concession":bus_fare_concession,"take_computer":take_computer,"tc_status":tc_status};
          userList.push(newUser);
          }
        };
        const dataa = new FormData()
        dataa.append('StudentData', JSON.stringify(userList))
        //dataa.append('StudentAcademicData', JSON.stringify(AcademicuserList))
        const url = "http://144:91:110:210:4800/ImportStudent"
        fetch(url, {
                method: 'post',
                body: dataa
            })
            .then(res => res.json())
            .then(dataa => {
                alert("Promote Successfully")    
                // this.setState({session:this.state.to_session})           
            }).catch(err =>{
            });
        
      });
      
    };

    reader.readAsBinaryString(file);
  }

  render() {
    const wellStyles = { maxWidth: 400, margin: '0 auto 10px' };
    const fontSize = 5;
    return (
      <div align="center" oncontextmenu="return false">
        <br /><br /><br />
        <div className="dropzone">
          <Dropzone accept=".csv" onDropAccepted={this.onDrop.bind(this)}>            
          </Dropzone>
          <br /><br /><br />
        </div>
        <h2>Upload or drop your <font size={fontSize} color="#00A4FF">CSV</font><br /> file here.</h2>
      </div>
    )
  }
}

export default App;