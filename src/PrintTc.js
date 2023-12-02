import React from 'react';
// import DataTable from '@bit/adeoy.utils.data-table';
import Moment from 'moment';
// import {logo} from 
class PrintTc extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      _id: '',
      vehicle_type: '',
      AllVehicleType: [],
      updateBtn: '',

      session: localStorage.getItem('SessionAccess'),
      date_of_tc: '',
      date_of_application: '',
      left_on: '',
      admission_no: '',
      name: '',
      account_no: '',
      parents: '',
      class_name: '',
      section: '',
      category: '',
      nationality: '',
      date_of_admission: '',
      dob: '',
      house: '',
      address: '',
      security_deposit: '',
      return_mode: '',
      bank: '',
      tc_no: '',
      cheque_no: '',
      reason: '',
      working_days: '',
      present_days: '',
      is_promoted: '',
      promoted_in: '',
      result: '',
      last_school: '',
      result_remark: '',
      concession: '',
      concession_remark: '',
      games_remark: '',
      other_remark: '',
      conduct: '',
      open_class_wise:true,
    }
  }
  // getCertificateDetails = async() => {
  //   // this.setState({name:'',account_no:'',class_name:'',section:'',parents:'',fee_concession:'',left_on:'',dob:'',date_of_admission:''})
  //     fetch("http://144.91.110.221:4800/singlestudentdata_with_session"
  //     ,{
  //     method: 'POST',
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       admission_no: this.state.admission_no,
  //       session: this.state.session,
  //       school_id:"100",       
  //      })
  //   })
  //         .then(res => res.json())
  //         .then(data => {
  //           console.log(data[0]?.student.name,"check the data inside the get transfer certificate")
  //             this.setState({
  //               result_remark:data[0]?.result_remark,
  //               name:data[0]?.name,
  //               admission_no:data[0]?.admission_no,
  //               class_name:data[0]?.class_name,section:data[0]?.section,
  //               left_on:data[0]?.left_on,
  //               parents:data[0]?.student?.father_name+" / "+data[0]?.student?.mother_name,
  //               dob:data[0]?.dob,
  //               date_of_tc:data[0]?.date_of_tc,
  //               date_of_admission:data[0]?.student.date_of_admission
  //             })
  //               let date = Moment(this.state.dob).format("DD")
  //               let myDiv 

  //               let oneToTwenty = ['','one ','two ','three ','four ', 'five ','six ','seven ','eight ','nine ','ten ',
  //               'eleven ','twelve ','thirteen ','fourteen ','fifteen ','sixteen ','seventeen ','eighteen ','nineteen '];
  //               let tenth = ['', '', 'twenty','thirty','forty','fifty', 'sixty','seventy','eighty','ninety'];

  //               if(date.toString().length > 7) return myDiv.innerHTML = 'overlimit' ;
  //               console.log(date);
  //               //let num = ('0000000000'+ date).slice(-10).match(/^(\d{1})(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
  //             let num = ('0000000'+ date).slice(-7).match(/^(\d{1})(\d{1})(\d{2})(\d{1})(\d{2})$/);
  //               console.log(num);
  //               if(!num) return;

  //               let outputText = num[1] != 0 ? (oneToTwenty[Number(num[1])] || `${tenth[num[1][0]]} ${oneToTwenty[num[1][1]]}` )+' million ' : ''; 

  //               outputText +=num[2] != 0 ? (oneToTwenty[Number(num[2])] || `${tenth[num[2][0]]} ${oneToTwenty[num[2][1]]}` )+'hundred ' : ''; 
  //               outputText +=num[3] != 0 ? (oneToTwenty[Number(num[3])] || `${tenth[num[3][0]]} ${oneToTwenty[num[3][1]]}`)+' thousand ' : ''; 
  //               outputText +=num[4] != 0 ? (oneToTwenty[Number(num[4])] || `${tenth[num[4][0]]} ${oneToTwenty[num[4][1]]}`) +'hundred ': ''; 
  //               outputText +=num[5] != 0 ? (oneToTwenty[Number(num[5])] || `${tenth[num[5][0]]} ${oneToTwenty[num[5][1]]} `) : ''; 

  //               var new_date = outputText;


  //               let year = Moment(this.state.dob).format("YYYY")
  //               let myDivv 

  //               let oneToTwentyy = ['','one ','two ','three ','four ', 'five ','six ','seven ','eight ','nine ','ten ',
  //               'eleven ','twelve ','thirteen ','fourteen ','fifteen ','sixteen ','seventeen ','eighteen ','nineteen '];
  //               let tenthh = ['', '', 'twenty','thirty','forty','fifty', 'sixty','seventy','eighty','ninety'];

  //               if(year.toString().length > 7) return myDivv.innerHTML = 'overlimit' ;
  //               console.log(year);
  //               //let num = ('0000000000'+ year).slice(-10).match(/^(\d{1})(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
  //             let numm = ('0000000'+ year).slice(-7).match(/^(\d{1})(\d{1})(\d{2})(\d{1})(\d{2})$/);
  //               console.log(numm);
  //               if(!numm) return;

  //               let outputYear = numm[1] != 0 ? (oneToTwentyy[Number(numm[1])] || `${tenthh[numm[1][0]]} ${oneToTwentyy[numm[1][1]]}` )+' million ' : ''; 

  //               outputYear +=numm[2] != 0 ? (oneToTwentyy[Number(numm[2])] || `${tenthh[numm[2][0]]} ${oneToTwentyy[numm[2][1]]}` )+'hundred ' : ''; 
  //               outputYear +=numm[3] != 0 ? (oneToTwentyy[Number(numm[3])] || `${tenthh[numm[3][0]]} ${oneToTwentyy[numm[3][1]]}`)+' thousand ' : ''; 
  //               outputYear +=numm[4] != 0 ? (oneToTwentyy[Number(numm[4])] || `${tenthh[numm[4][0]]} ${oneToTwentyy[numm[4][1]]}`) +'hundred ': ''; 
  //               outputYear +=numm[5] != 0 ? (oneToTwentyy[Number(numm[5])] || `${tenthh[numm[5][0]]} ${oneToTwentyy[num[5][1]]} `) : ''; 

  //               var new_year = outputYear;
  //             this.setState({newDOB:new_date+""+Moment(this.state.dob).format("MMMM")+" "+new_year})
  //             this.searchByAdmission_no()

  //         })
  //         .catch(err => console.log(err))
  // }
  getCertificateDetails = async () => {
    this.setState({ name: '', account_no: '', class_name: '', section: '', parents: '', fee_concession: '', left_on: '', dob: '', date_of_admission: '', father_name: '', mother_name: '', sex: '' })
    await console.log("wait wait")
    fetch("http://144.91.110.221:4800/singlestudentdata_with_session"
      , {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          admission_no: this.state.admission_no,
          session: this.state.session,
          school_id: "UT015",
        })
      })
      .then(res => res.json())
      .then(data => {
        const classNamesToCheck = ["VI", "VII", "VIII", "IX", "X", "XI", "XII"];
        if (data[0] != undefined) {
          const classNameParts = data[0].class_name.split('-');
          const classPrefix = classNameParts[0].trim().toUpperCase();
          const open_class_wise = classNamesToCheck.includes(classPrefix);
            this.setState({
            name: data[0].student.name,
            account_no: data[0].account_no,
            admission_no: data[0].admission_no,
            class_name: data[0].class_name,
            open_class_wise,
            section: data[0].section,
            father_name: data[0].student.father_name,
            mother_name: data[0].student.mother_name,
            parents: data[0]?.student?.father_name + " / " + data[0]?.student?.mother_name,
            fee_concession: data[0].student.fee_concession,
            dob: data[0].student.dob,
            date_of_admission: data[0].student.date_of_admission,
            sex: data[0].student.sex
          })
          this.FeesClasswise(data[0].class_name, data[0].section);

          let date = Moment(this.state.dob).format("DD")
          let myDiv

          let oneToTwenty = ['', 'one ', 'two ', 'three ', 'four ', 'five ', 'six ', 'seven ', 'eight ', 'nine ', 'ten ',
            'eleven ', 'twelve ', 'thirteen ', 'fourteen ', 'fifteen ', 'sixteen ', 'seventeen ', 'eighteen ', 'nineteen '];
          let tenth = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

          if (date.toString().length > 7) return myDiv.innerHTML = 'overlimit';
          console.log(date);
          //let num = ('0000000000'+ date).slice(-10).match(/^(\d{1})(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
          let num = ('0000000' + date).slice(-7).match(/^(\d{1})(\d{1})(\d{2})(\d{1})(\d{2})$/);
          console.log(num);
          if (!num) return;

          let outputText = num[1] != 0 ? (oneToTwenty[Number(num[1])] || `${tenth[num[1][0]]} ${oneToTwenty[num[1][1]]}`) + ' million ' : '';

          outputText += num[2] != 0 ? (oneToTwenty[Number(num[2])] || `${tenth[num[2][0]]} ${oneToTwenty[num[2][1]]}`) + 'hundred ' : '';
          outputText += num[3] != 0 ? (oneToTwenty[Number(num[3])] || `${tenth[num[3][0]]} ${oneToTwenty[num[3][1]]}`) + ' thousand ' : '';
          outputText += num[4] != 0 ? (oneToTwenty[Number(num[4])] || `${tenth[num[4][0]]} ${oneToTwenty[num[4][1]]}`) + 'hundred ' : '';
          outputText += num[5] != 0 ? (oneToTwenty[Number(num[5])] || `${tenth[num[5][0]]} ${oneToTwenty[num[5][1]]} `) : '';

          var new_date = outputText;


          let year = Moment(this.state.dob).format("YYYY")
          let myDivv

          let oneToTwentyy = ['', 'one ', 'two ', 'three ', 'four ', 'five ', 'six ', 'seven ', 'eight ', 'nine ', 'ten ',
            'eleven ', 'twelve ', 'thirteen ', 'fourteen ', 'fifteen ', 'sixteen ', 'seventeen ', 'eighteen ', 'nineteen '];
          let tenthh = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

          if (year.toString().length > 7) return myDivv.innerHTML = 'overlimit';
          console.log(year);
          //let num = ('0000000000'+ year).slice(-10).match(/^(\d{1})(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
          let numm = ('0000000' + year).slice(-7).match(/^(\d{1})(\d{1})(\d{2})(\d{1})(\d{2})$/);
          console.log(numm);
          if (!numm) return;

          let outputYear = numm[1] != 0 ? (oneToTwentyy[Number(numm[1])] || `${tenthh[numm[1][0]]} ${oneToTwentyy[numm[1][1]]}`) + ' million ' : '';

          outputYear += numm[2] != 0 ? (oneToTwentyy[Number(numm[2])] || `${tenthh[numm[2][0]]} ${oneToTwentyy[numm[2][1]]}`) + 'hundred ' : '';
          outputYear += numm[3] != 0 ? (oneToTwentyy[Number(numm[3])] || `${tenthh[numm[3][0]]} ${oneToTwentyy[numm[3][1]]}`) + ' thousand ' : '';
          outputYear += numm[4] != 0 ? (oneToTwentyy[Number(numm[4])] || `${tenthh[numm[4][0]]} ${oneToTwentyy[numm[4][1]]}`) + 'hundred ' : '';
          outputYear += numm[5] != 0 ? (oneToTwentyy[Number(numm[5])] || `${tenthh[numm[5][0]]} ${oneToTwentyy[num[5][1]]} `) : '';

          var new_year = outputYear;
          this.setState({ newDOB: new_date + "" + Moment(this.state.dob).format("MMMM") + " " + new_year })

        }
      })
      .catch(err => console.log(err))
  }
  PrintTc() {
    window.print();
  }
  searchByAdmission_no = async (e) => {
    this.setState({ sex: '' })
    await console.log("wait")
    console.log("checking response search by addmission no")
    const admission_no = this.state.admission_no
    if (admission_no == '0') {
      return false;
    }
    fetch("http://144.91.110.221:4800/singlestudentdata"
      , {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          session: this.state.session,
          admission_no: admission_no,
          school_id: "UT015",
        })
      })
      .then((data) => data.json())
      .then(async (data) => {
        if (data[0] != undefined) {
          this.setState({ sex: data[0].student.sex })
        }
        else {
          this.setState({ sex: '' })
        }
      })
      .catch(err => console.log(err))
  }

   dateToWords=(dateString)=> {
    const months = [
      "zero", "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
  
    const numbers = [
      "zero", "first", "second", "third", "fourth", "fifth", "sixth",
      "seventh", "eighth", "ninth", "tenth", "eleventh", "twelfth",
      "thirteenth", "fourteenth", "fifteenth", "sixteenth", "seventeenth",
      "eighteenth", "nineteenth", "twentieth", "twenty-first", "twenty-second",
      "twenty-third", "twenty-fourth", "twenty-fifth", "twenty-sixth",
      "twenty-seventh", "twenty-eighth", "twenty-ninth", "thirtieth", "thirty-first"
    ];
  
    const dateParts = dateString.split("-");
    const year = parseInt(dateParts[0]);
    const monthIndex = parseInt(dateParts[1]);
    const day = parseInt(dateParts[2]);
  
    const month = months[monthIndex];
    const dayInWords = numbers[day];
    const yearInWords = numbers[Math.floor(year / 1000)] + " thousand " + numbers[year % 1000];
  
    return `${numbers[day]} ${month} ${yearInWords}`;
  }
  

  FeesClasswise=(class_names,sections)=>{    
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
             class_name: class_names,
             section: sections,
             session:this.state.session,
         })
     })
     .then((data) => data.json())
     .then(async (data) => {  
        await console.log( 'Class Wise'+data )  
         if(data[0] !=undefined){
             this.setState({Allfees:JSON.parse(data[0].fees)})

     }
     })
     .catch(err => console.log(err))
 }


  render() {
    console.log(this.state.dob,"for checking correct class")
    const data = [];
    {
      this.state.AllVehicleType.map((item, index) => {
        data.push({ "sr_no": index + 1, "vehicle_type": item.vehicle_type, "action": <td><button className="btn btn-secondary mr-2" onClick={() => this.editVehicleTypeObject(item)}><i class="fas fa-pencil-alt"></i></button><button onClick={() => this.deleteVehicleType(item._id)} className="btn btn-danger"><i className="fa fa-trash" aria-hidden="true"></i></button></td> })
      })
    }
    const columns = [
      { title: "SR NO", data: "sr_no" },
      { title: "Vehicle Type", data: "vehicle_type" },
      { title: "Action", data: "action" },
    ];
    const click = (row) => {
      console.log(row);
    };
    return (
      <>
        <div className="row layoutCard">
          <div className="col-12">
            <div className="form-row">
              <div className="col-4 form-group">
                <label>Admission No</label>
                <input type="text" placeholder="Enter Admission No" className="form-control" value={this.state.admission_no}
                  onChange={(e) => { this.setState({ admission_no: e.target.value.toUpperCase() }, this.getCertificateDetails) }} />
              </div>
              <div className="col-3 form-group">
                <label>Left On</label>
                <input type="date" className="form-control" value={this.state.left_on} onChange={(e) => { { this.setState({ left_on: e.target.value.toUpperCase() }); } }} />
              </div>
              <div className="col-4 form-group">
                <label>Result Remark</label>
                <input type="text" className="form-control" value={this.state.result_remark} onChange={(e) => { { this.setState({ result_remark: e.target.value.toUpperCase() }); } }} />
              </div>
              <div className="col-2 form-group">
                <br />
                <button className="btn btn-info" onClick={() => { this.PrintTc() }}>PRINT</button>
              </div>
            </div>
          </div>
        </div>
                {
                  this.state.open_class_wise ? 
                  <div className='row printTc transfer-certificat bg-white pt-2 pb-2 pl-3 ml-2'>
                <div className='col-12 d-flex'>
                  <div className='col-2 text-center'>
                    <p className='m-0'>Estd.-1973</p>
                    <img src={require('./images/logo.png').default} alt='constancia-school-logo' style={{ height: "100px" }} />
                  </div>
                  <div className='col-8 text-center'>
                    <h1>
                      CONSTANCIA SCHOOL
                    </h1>
                    <h5>P.O. MAJRA, DEHRADUN (U.K.)-248001</h5>
                    <h5>Affilliated to the Council for the indian School Certificate Examinations</h5>
                    <h5>New Delhi (ICSE & ISC) Recongnised by UK Govt.</h5>
                    <h4>SCHOOL CODE : UT015</h4>
                    <h3 className='mt-1'>TRANSFER CERTIFICATE</h3>
                  </div>
                  <div className='col-2 p-0 text-center'>
                    <p style={{fontSize:"12px"}}>Ph. 0135-260177,2642360</p>
                  </div>
                </div>
                  <div className='col-12 mt-2'>
                    <p>Serial No.......</p>
                  </div>
                  <div className='col-12'>
                    <div className='row'>
                      <div className='col-4'>
                        <div className='row'>
                          <div className='col-4'>
                            <p>Index No.</p>
                          </div>
                          <div className='col-8 w-100 transfer-certificate-dotted-tc'>
                          </div>
                        </div>
                      </div>
                      <div className='col-4'>
                        <div className='row'>
                          <div className='col-4'>
                            <p>Roll No.</p>
                          </div>
                          <div className='col-8 w-100 transfer-certificate-dotted-tc'>
                          </div>
                        </div>
                      </div>
                      <div className='col-4'>
                        <div className='row'>
                          <div className='col-6'>
                            <p>Adm./Regn.No.</p>
                          </div>
                          <div className='col-6 w-100 transfer-certificate-dotted-tc'>
                            {this.state.admission_no}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='col-12 w-100'>
                    <div className='row'>
                      <div className='col-5'>
                        <p>This is to certify that Master / Miss
                        </p>
                      </div>
                      <div className='transfer-certificate-dotted-tc col-7'>{this.state.name}</div>
                    </div>
        
                  </div>
                  <div className='col-12'>
                    <div className='row'>
                      <div className='col-7'>
                        <div className='row'>
                          <div className='col-3'>
                            <p>S/o, D/o</p>
                          </div>
                          <div className='transfer-certificate-dotted-tc col-9'>{this.state.parents}</div>
                        </div>
                      </div>
                      <div className='col-5'>
                        <p>Was admitted into this school on the
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className='col-12'>
                    <div className='row'>
                      <div className='col-4'>
                        <div className='row'>
                          <div className='col-2'>
                            <p>(Date)</p>
                          </div>
                          <div className='transfer-certificate-dotted-tc col-10'>
                            {this.state.date_of_admission}
                          </div>
                        </div>
                      </div>
                      <div className='col-8'>
                        <div className='row'>
                          <div className='col-4'>
                            <p>on a transfer from
                            </p>
                          </div>
                          <div className="col-8" contentEditable="true" style={{ border:"none",borderBottom:"1px dotted",width:"100%",minHeight: "20px"}}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='col-12'>
                    <div className='row'>
                      <div className='col-2'>
                        <p>and left on</p>
                      </div>
                      <div className='col-2'>
                        <p>01 April</p>
                      </div>
                      <div className='col-8'>
                        <p>with a <span className='transfer-character'> GOOD CHARACTER</span></p>
                      </div>
                    </div>
                  </div>
                  <div className='col-12'>
                    <p>He / She was then studying in (*) XII (Twelth) class of the (**) ISC stream.</p>
                  </div>
                  <div className='col-12'>
                    <div className='row'>
                      <div className='col-4'>
                        <p>The school year being from (*X)</p>
                      </div>
                      <div className='col-2'>
                        <h5>01 April</h5>
                      </div>
                      <div className='col-1'>
                        <p>to</p>
                      </div>
                      <div className='col-5'>
                        <h5>31 March</h5>
                      </div>
                    </div>
                  </div>
                  <div className='col-12'>
                    <p className='text-center'>
                      All sums due (***) to this school on his / her accounts have been remitted or satisfactorily arranged for.
                    </p>
                  </div>
                  <div className='col-12'>
                    <div className='row'>
                      <div className='col-9'>
                        <p>His / Her date of birth according to the Admission Register is (in figure)</p>
                      </div>
                      <div className='transfer-certificate-dotted-tc col-3'>
                        {this.state.dob}
                      </div>
        
                    </div>
                  </div>
                  <div className='col-12'>
                    <div className='row'>
                      <div className='col-2'>
                        <p>(in words)</p>
                      </div>
                      <div className='transfer-certificate-dotted-tc col-10'>{this.state.dob ? this.dateToWords(this.state.dob) : ""}</div>
                    </div>
                  </div>
                  <div className='col-12'>
                    <div className='d-flex'>
                      <p>Promotion has been (XX*)</p>
                      <h5>Granted / Refused</h5>
                    </div>
                  </div>
                  <div className='col-12'>
                    <p>Station : Dehradun</p>
                  </div>
                  <div className='col-12'>
                    <div className='row'>
                      <div className='col-6'>
                        <div className='row'>
                          <div className='col-2'>
                            <p>Date :</p>
                          </div>
                          <div className='transfer-certificate-dotted-tc col-5'>{Moment().format("MM/DD/YYYY")}</div>
                          <div className='col-5'></div>
                        </div>
                      </div>
                      <div className='col-6'>
                        <div className='row'>
                          <div className='col-3'>
                            <p>Signature</p>
                          </div>
                          <div className='transfer-certificate-dotted-tc col-5'></div>
                          <div className='col-4'></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='col-12 transfer-certificate-head-sign'>
                    <p className='text-right'>(Head of the School)</p>
                  </div>
                  <div className='col-12'>
                    <p>(*)  to be given in words</p>
                    <p>(**)  Mention whether ISC / ICSE Stream</p>
                    <p>(***)  sums to the school include payments for which provision is made in the rules supplied to the parent /
                      guardian when the scholar was admitted into the school (Article 59 of the code)
                    </p>
                    <p>(XX*)  Granted / Refused / not applicable</p>
                    <p>(*X)  insert month and year</p>
                  </div>
                  </div>
                :
                  <div className='row printTc transfer-certificat bg-white pt-2 pb-2 pl-3 ml-2'>
                <div className='col-12 d-flex'>
                  <div className='col-2 text-center'>
                    <p className='m-0'>Estd.-1973</p>
                    <img src={require('./images/logo.png').default} alt='constancia-school-logo' style={{ height: "100px" }} />
                  </div>
                  <div className='col-8 text-center'>
                    <h1>
                      CONSTANCIA SCHOOL
                    </h1>
                    <h5>P.O. MAJRA, DEHRADUN (U.K.)-248001</h5>
                    <h5>Affilliated to the Council for the indian School Certificate Examinations</h5>
                    <h5>New Delhi (ICSE & ISC) Recongnised by UK Govt.</h5>
                    <h4>SCHOOL CODE : UT015</h4>
                    <h3 className='mt-1'>TRANSFER CERTIFICATE</h3>
                  </div>
                  <div className='col-2 p-0 text-center'>
                    <p style={{fontSize:"12px"}}>Ph. 0135-260177,2642360</p>
                  </div>
                </div>
                 <div className='col-12'>
                  <div className='row'>
                    <div className='col-5'>
                      <div className='row'>
                        <div className='col-4'>
                          <p>TC Serial No.</p>
                        </div>
                        <div className='col-8 w-100 transfer-certificate-dotted-tc'>
                        </div>
                      </div>
                    </div>
                    <div className='col-7'>
                      <div className='row'>
                        <div className='col-6'>
                          <p>Admission / Registration No.</p>
                        </div>
                        <div className='col-6 w-100 transfer-certificate-dotted-tc'>
                          {this.state.admission_no}
                        </div>
                      </div>
                    </div>
                  </div>
                </div> 
                <div className='col-12 w-100'>
                  <div className='row'>
                    <div className='col-5'>
                      <p>This is to certify that Master / Miss
                      </p>
                    </div>
                    <div className='transfer-certificate-dotted-tc col-5'>{this.state.name}</div>
                  </div>
      
                </div>
                <div className='col-12'>
                  <div className='row'>
                    <div className='col-9'>
                      <div className='row'>
                        <div className='col-2'>
                          <p>S/o, D/o</p>
                        </div>
                        <div className='transfer-certificate-dotted-tc col-10'>{this.state.parents}</div>
                      </div>
                    </div>
                    <div className='col-3'>
                      <p>on a transfer from
                      </p>
                    </div>
                  </div>
                </div>
                <div className='col-12'>
                  <div className='row'>
                    <div className='col-6'>
                    <div contentEditable="true" style={{ border:"none",borderBottom:"1px dotted",width:"100%",minHeight: "px"}}></div>
                    </div>
                    <div className='col-6'>
                      <div className='row'>
                        <div className='col-9'>
                          <p>and was admitted in this School on
                          </p>
                        </div>
                        <div className='transfer-certificate-dotted-tc col-3'>
                          {Moment(this.state.date_of_admission).format("DD/MM/YYYY")}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='col-12'>
                  <div className='row'>
                    <div className='col-2'>
                      <p>and left on</p>
                    </div>
                    <div className='col-4'>
                    <div className='transfer-certificate-dotted-tc'>{Moment().format("DD/MM/YYYY")}</div>
                    </div>
                    <div className='col-6'>
                      <p>with a <span className='transfer-character'> GOOD CHARACTER</span></p>
                    </div>
                  </div>
                </div>
                <div className='col-12'>
                <div className='row'>
                  <div className='col-4'>
                  <p>He / She was then studying in (*)</p>
                </div>
                <div className='transfer-certificate-dotted-tc col-6'>{this.state.class_name}</div>
                <div className='col-2'>
                  <p>class of</p>
                </div>
                </div>
                </div>
                <div className='col-12'>
                  <div className='row'>
                    <div className='col-2'>
                      <p>The (**)</p>
                    </div>
                    <div className='transfer-certificate-dotted-tc col-6'>ICSE</div>
                    <div className='col-2'>
                      <p>Stream.</p>
                    </div>
                  </div>
                </div>
                <div className='col-12'>
                  <div className='row'>
                    <div className='col-7'>
                      <div className='row'>
                        <div className='col-7'>
                          <p>The school year being from (*X)</p>
                        </div>
                        <div className='transfer-certificate-dotted-tc col-5'>01/April/{Moment(this.state.date_of_admission).format("YYYY")}</div>
                      </div>
                    </div>
                    <div className='col-5'>
                      <div className='row'>
                        <div className='col-2'>
                          <p>to</p>
                        </div>
                        <div className='transfer-certificate-dotted-tc col-10'>31/March/{Moment().format("YYYY")}</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='col-12'>
                  <p className='text-center'>
                    All sums due (***) to this school on his / her accounts have been remitted or satisfactorily arranged for
                  </p>
                </div>
                <div className='col-12'>
                  <div className='row'>
                    <div className='col-9'>
                      <p>His / Her date of birth according to the Admission Register is (in figure)</p>
                    </div>
                    <div className='transfer-certificate-dotted-tc col-3'>
                      {Moment(this.state.dob).format("DD/MM/YYYY")}
                    </div>
      
                  </div>
                </div>
                <div className='col-12'>
                  <div className='row'>
                    <div className='col-2'>
                      <p>(in words)</p>
                    </div>
                    <div className='transfer-certificate-dotted-tc col-10'>{this.state.dob ? this.dateToWords(this.state.dob) : ""}</div>
                  </div>
                </div>
                <div className='col-12'>
                  <div className='d-flex'>
                    <p>Promotion has been (XX*)</p>
                    <h5>Granted / Refused / Not applicable /Remark</h5>
                  </div>
                </div>
                <div className='col-12'>
                  <p>Station : Dehradun</p>
                </div>
                <div className='col-12'>
                  <div className='row'>
                    <div className='col-6'>
                      <div className='row'>
                        <div className='col-2'>
                          <p>Date :</p>
                        </div>
                        <div className='transfer-certificate-dotted-tc col-5'>{Moment().format("MM/DD/YYYY")}</div>
                        <div className='col-5'></div>
                      </div>
                    </div>
                    <div className='col-6'>
                      <div className='row'>
                        <div className='col-3'>
                          <p>Signature</p>
                        </div>
                        <div className='transfer-certificate-dotted-tc col-5'></div>
                        <div className='col-4'></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='col-12 transfer-certificate-head-sign'>
                  <p className='text-right'>(Head of the School)</p>
                </div>
                <div className='col-12'>
                  <p>(*)  to be given in words</p>
                  <p>(**)  Mention whether ISC / ICSE Stream</p>
                  <p>(***)  sums to the school include payments for which provision is made in the rules supplied to the parent /
                    guardian when the scholar was admitted into the school (Article 59 of the code)
                  </p>
                  <p>(XX*)  Granted / Refused / not applicable</p>
                  <p>(*X)  insert month and year</p>
                </div>
                  </div>
                }

      </>
    )
  }
}
export default PrintTc;