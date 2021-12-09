import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch,Redirect } from "react-router-dom";
import './index.css';
import App from './App';
import FeesImport from './FeesImport';
import AdminLayout from './AdminLayout';
import Employees from './Employees';
import Dashboard from './Dashboard';
import FeeCategory from './FeeCategory';
import FeeSubCategoryFine from './FeeSubCategoryFine';
import FeeWaiverCategory from './FeeWaiverCategory';
import FeeWaiver from './FeeWaiver';
import FeeSubCategory from './FeeSubCategory';
import SessionCreation from './SessionCreation';
import ClassCreation from './ClassCreation';
import SectionCreation from './SectionCreation';
import CategoryCreation from './CategoryCreation';
import VehicleCreation from './VehicleCreation';
import StudentCreation from './StudentCreation';
import StudentDisplay from './StudentDisplay';
import StudentEdit from './StudentEdit';
import StudentUpgrade from './StudentUpgrade';
import SubjectCreation from './SubjectCreation';
import VehicleTypeCreation from './VehicleTypeCreation';
import ParentCreation from './ParentCreation';
import FeeStructure from './FeeStructure';
import HouseCreation from './HouseCreation';
import FeeReceipt from './FeeReceipt';
import PreviousFeeReceipt from './PreviousFeeReceipt';
import Landing from './Landing';
import PrintReceipt from './PrintReceipt';
import reportWebVitals from './reportWebVitals';
import FeeVoucher from './FeeVoucher';
import Defaulter from './Defaulter';
import PreviousDefaulter from './PreviousSessionDefaulter';
import DefaulterMaker from './DefaulterMaker';
import StudentStrength from './StudentStrength';
import BankCreation from './BankCreation';
import StudentPromotionDemotion from './StudentPromotionDemotion';
import StudentSpecificPromotion from './StudentSpecificPromotion';
import StudentPromotionAll from './StudentPromotionAll';
import SuspensionalVoucher from './SuspensionalVoucher';
import TransferCertificate from './TransferCertificate';
import PrintTc from './PrintTc';
import RecoverTc from './RecoverTc';
import FeeCertificate from './FeeCertificate';
import NonTransferCertificate from './NonTransferCertificate';
import UpdateTransferCertificate from './UpdateTransferCertificate';
import StudentStrengthSectionWise from './StudentStrengthSectionWise';
import StudentStrengthHouseWise from './StudentStrengthHouseWise';
import Bonafide from './Bonafide';
import CharacterCertificate from './CharacterCertificate';
import StudentSlipByRange from './StudentSlipByRange';
import StudentStrengthCategoryWise from './StudentStrengthCategoryWise';
import AadharReport from './AadharReport';
import ComputerStudent from './ComputerStudent';
import TcOutByRange from './TcOutByRange';
import UpdateStudentPreviousSessionAmount from './UpdateStudentPreviousSessionAmount';
import SecurityRegisterReport from './SecurityRegisterReport';
import SecurityRegisterReportAll from './SecurityRegisterReportAll';
import Feesbackup from './Feesbackup';
import TotalParentReport from './TotalParentReport';
import SiblingsReport from './SiblingsReport';
import TeacherWardReport from './TeacherWardReport';
import UpdateSubjects from './UpdateSubjects';
import FeeConcessionReport from './FeeConcessionReport';
import FullFreeShipReport from './FullFreeShipReport';
import SubjectWiseReport from './SubjectWiseReport';
import UpdateReceiptByRange from './UpdateReceiptByRange';
import SecurityRegisterByRange from './SecurityRegisterByRange';
import VoucherEntry from './VoucherEntry';
// import AddStruckOff from './AddStruckOff';
import ListOfStruckOff from './ListOfStruckOff';
import AddressReport from './AddressReport'
import StruckOff from './StruckOff';
import SosByRange from './SosByRange';
import DropStatus from './DropStatus';
import ParentUpdate from './ParentUpdate'












// Employess Files

import Eform from './employee/Eform';
import Paytype from './employee/Paytype';

import PayCategory from './employee/PayCategory';
import PayScaleType from './employee/PayScaleType';
import Designation from './employee/Designation';
import PayScale from './employee/PayScale';

const AppRoute = ({component:Component,layout:Layout, ...rest})=>(
  <Route {...rest} render ={props=>(
    <Layout><Component {...props}> </Component></Layout>
  )}></Route>
  )
const dataAccess = localStorage.getItem('access')
ReactDOM.render(
  <BrowserRouter >
      {dataAccess == "Admin" ? 
      <Switch>
      <AppRoute path ="/FeeSubCategory" layout={AdminLayout} component={FeeSubCategory} />
      <AppRoute path ="/FeeVoucher" layout={AdminLayout} component={FeeVoucher} />
      <AppRoute path ="/Defaulter" layout={AdminLayout} component={Defaulter} />
      <AppRoute path ="/PreviousDefaulter" layout={AdminLayout} component={PreviousDefaulter} />
      <AppRoute path ="/DefaulterMaker" layout={AdminLayout} component={DefaulterMaker} />
      <AppRoute path ="/StudentStrength" layout={AdminLayout} component={StudentStrength} />
      <AppRoute path ="/BankCreation" layout={AdminLayout} component={BankCreation} />
      <AppRoute path ="/SuspensionalVoucher" layout={AdminLayout} component={SuspensionalVoucher} />
      <AppRoute path ="/StudentPromotionDemotion" layout={AdminLayout} component={StudentPromotionDemotion} />
      <AppRoute path ="/StudentSpecificPromotion" layout={AdminLayout} component={StudentSpecificPromotion} />
      <AppRoute path ="/StudentPromotionAll" layout={AdminLayout} component={StudentPromotionAll} />
      <AppRoute path ="/FeeCategory" layout={AdminLayout} component={FeeCategory} />
      <AppRoute path ="/FeeSubCategoryFine" layout={AdminLayout} component={FeeSubCategoryFine} />
      <AppRoute path ="/FeeWaiverCategory" layout={AdminLayout} component={FeeWaiverCategory} />
      <AppRoute path ="/FeeWaiver" layout={AdminLayout} component={FeeWaiver} />
      <AppRoute path ="/SessionCreation" layout={AdminLayout} component={SessionCreation} />
      <AppRoute path ="/ClassCreation" layout={AdminLayout} component={ClassCreation} />
      <AppRoute path ="/SectionCreation" layout={AdminLayout} component={SectionCreation} />
      <AppRoute path ="/CategoryCreation" layout={AdminLayout} component={CategoryCreation} />
      <AppRoute path ="/VehicleCreation" layout={AdminLayout} component={VehicleCreation} />
      <AppRoute path ="/StudentCreation" layout={AdminLayout} component={StudentCreation} />
      <AppRoute path ="/StudentDisplay" layout={AdminLayout} component={StudentDisplay} />
      <AppRoute path ="/StudentEdit" layout={AdminLayout} component={StudentEdit} />
      <AppRoute path ="/StudentUpgrade" layout={AdminLayout} component={StudentUpgrade} />
      <AppRoute path ="/SubjectCreation" layout={AdminLayout} component={SubjectCreation} />
      <AppRoute path ="/VehicleTypeCreation" layout={AdminLayout} component={VehicleTypeCreation} />
      <AppRoute path ="/ParentCreation" layout={AdminLayout} component={ParentCreation} />
      <AppRoute path ="/HouseCreation" layout={AdminLayout} component={HouseCreation} />
      <AppRoute path ="/FeeReceipt" layout={AdminLayout} component={FeeReceipt} />
      <AppRoute path ="/FeeStructure" layout={AdminLayout} component={FeeStructure} />
      <AppRoute path ="/TransferCertificate" layout={AdminLayout} component={TransferCertificate} />
      <AppRoute path ="/PrintTc" layout={AdminLayout} component={PrintTc} />
      <AppRoute path ="/RecoverTc" layout={AdminLayout} component={RecoverTc} />
      <AppRoute path ="/FeeCertificate" layout={AdminLayout} component={FeeCertificate} />
      <AppRoute path ="/NonTransferCertificate" layout={AdminLayout} component={NonTransferCertificate} />
      <AppRoute path ="/UpdateTransferCertificate" layout={AdminLayout} component={UpdateTransferCertificate} />
      <AppRoute path ="/StudentStrengthSectionWise" layout={AdminLayout} component={StudentStrengthSectionWise} />
      <AppRoute path ="/StudentStrengthHouseWise" layout={AdminLayout} component={StudentStrengthHouseWise} />
      <AppRoute path ="/Bonafide" layout={AdminLayout} component={Bonafide} />
      <AppRoute path ="/CharacterCertificate" layout={AdminLayout} component={CharacterCertificate} />
      <AppRoute path ="/StudentSlipByRange" layout={AdminLayout} component={StudentSlipByRange} />
      <AppRoute path ="/PreviousFeeReceipt" layout={AdminLayout} component={PreviousFeeReceipt} />
      <AppRoute path ="/StudentStrengthCategoryWise" layout={AdminLayout} component={StudentStrengthCategoryWise} />
      <AppRoute path ="/AadharReport" layout={AdminLayout} component={AadharReport} />
      <AppRoute path ="/ComputerStudent" layout={AdminLayout} component={ComputerStudent} />
      <AppRoute path ="/TcOutByRange" layout={AdminLayout} component={TcOutByRange} />
      <AppRoute path ="/UpdateStudentPreviousSessionAmount" layout={AdminLayout} component={UpdateStudentPreviousSessionAmount} />
      <AppRoute path ="/SecurityRegisterReport" layout={AdminLayout} component={SecurityRegisterReport} />
      <AppRoute path ="/SecurityRegisterReportAll" layout={AdminLayout} component={SecurityRegisterReportAll} />
      <AppRoute path ="/Feesbackup" layout={AdminLayout} component={Feesbackup} />
      <AppRoute path ="/TotalParentReport" layout={AdminLayout} component={TotalParentReport} />
      <AppRoute path ="/SiblingsReport" layout={AdminLayout} component={SiblingsReport} />
      <AppRoute path ="/TeacherWardReport" layout={AdminLayout} component={TeacherWardReport} />
      <AppRoute path ="/UpdateSubjects" layout={AdminLayout} component={UpdateSubjects} />
      <AppRoute path ="/FeeConcessionReport" layout={AdminLayout} component={FeeConcessionReport} />
      <AppRoute path ="/FullFreeShipReport" layout={AdminLayout} component={FullFreeShipReport} />
      <AppRoute path ="/SubjectWiseReport" layout={AdminLayout} component={SubjectWiseReport} />
      <AppRoute path ="/UpdateReceiptByRange" layout={AdminLayout} component={UpdateReceiptByRange} />
      
      <AppRoute path ="/SecurityRegisterByRange" layout={AdminLayout} component={SecurityRegisterByRange} />
      <AppRoute path ="/VoucherEntry" layout={AdminLayout} component={VoucherEntry} />
      {/* <AppRoute path ="/AddStruckOff" layout={AdminLayout} component={AddStruckOff} /> */}
      <AppRoute path ="/ListOfStruckOff" layout={AdminLayout} component={ListOfStruckOff} />
      <AppRoute path="/AddressReport" layout={AdminLayout} component={AddressReport} />
      <AppRoute path="/StruckOff" layout={AdminLayout} component={StruckOff} />
      <AppRoute path="/SosByRange" layout={AdminLayout} component={SosByRange} />
      <AppRoute path="/DropStatus" layout={AdminLayout} component={DropStatus} />
      {/* <AppRoute path="/ParentUpdate" layout={AdminLayout} component={ParentUpdate} /> */}
      {/* Employees Route */}
      <AppRoute path ="/employee" layout={AdminLayout} component={Eform} />
      <AppRoute path ="/PayType" layout={AdminLayout} component={Paytype} />
      <AppRoute path ="/pay-category" layout={AdminLayout} component={PayCategory} />  
      <AppRoute path ="/Designation" layout={AdminLayout} component={Designation} />  
      <AppRoute path ="/PayScaleType" layout={AdminLayout} component={PayScaleType} />  
      <AppRoute path ="/PayScale" layout={AdminLayout} component={PayScale} />  


      <Route path="/PrintReceipt"> 
          <PrintReceipt />
        </Route>
        <Route path="/appdata"> 
          <App />
        </Route> 
        <Route path="/FeesImport"> 
          <FeesImport />
        </Route> 
      <AppRoute path ="/" layout={AdminLayout} component={Dashboard} />
      <AppRoute path ="/employees" layout={AdminLayout} component={Employees} />
      
      </Switch>



      : dataAccess == "Cashier" ? 
      <Switch>
         <AppRoute path="/DropStatus" layout={AdminLayout} component={DropStatus} />
        <AppRoute path ="/FeeReceipt" layout={AdminLayout} component={FeeReceipt} />
        <AppRoute path ="/FeeVoucher" layout={AdminLayout} component={FeeVoucher} />
        <AppRoute path ="/SuspensionalVoucher" layout={AdminLayout} component={SuspensionalVoucher} />
        <AppRoute path ="/Defaulter" layout={AdminLayout} component={Defaulter} />
        <AppRoute path ="/PreviousDefaulter" layout={AdminLayout} component={PreviousDefaulter} />
        <AppRoute path ="/StudentDisplay" layout={AdminLayout} component={StudentDisplay} />
        <AppRoute path ="/FeeStructure" layout={AdminLayout} component={FeeStructure} />
        <AppRoute path ="/FeeSubCategoryFine" layout={AdminLayout} component={FeeSubCategoryFine} />
        <AppRoute path ="/" layout={AdminLayout} component={Dashboard} />
       
        </Switch>
        :
        dataAccess == "AdmissionCell" ? 
        <Switch>
        <AppRoute path="/DropStatus" layout={AdminLayout} component={DropStatus} />
      <AppRoute path="/AddressReport" layout={AdminLayout} component={AddressReport} />
      <AppRoute path="/StruckOff" layout={AdminLayout} component={StruckOff} />
      <AppRoute path="/SosByRange" layout={AdminLayout} component={SosByRange} />

      <AppRoute path ="/StudentCreation" layout={AdminLayout} component={StudentCreation} />
      <AppRoute path ="/StudentDisplay" layout={AdminLayout} component={StudentDisplay} />
      <AppRoute path ="/StudentEdit" layout={AdminLayout} component={StudentEdit} />
      <AppRoute path ="/StudentStrength" layout={AdminLayout} component={StudentStrength} />
      <AppRoute path ="/StudentStrengthSectionWise" layout={AdminLayout} component={StudentStrengthSectionWise} />
      <AppRoute path ="/StudentStrengthHouseWise" layout={AdminLayout} component={StudentStrengthHouseWise} />
      <AppRoute path ="/StudentSlipByRange" layout={AdminLayout} component={StudentSlipByRange} />
      <AppRoute path ="/TransferCertificate" layout={AdminLayout} component={TransferCertificate} />
      <AppRoute path ="/PrintTc" layout={AdminLayout} component={PrintTc} />
      <AppRoute path ="/RecoverTc" layout={AdminLayout} component={RecoverTc} />
      <AppRoute path ="/FeeCertificate" layout={AdminLayout} component={FeeCertificate} />
      <AppRoute path ="/NonTransferCertificate" layout={AdminLayout} component={NonTransferCertificate} />
      <AppRoute path ="/UpdateTransferCertificate" layout={AdminLayout} component={UpdateTransferCertificate} />
      <AppRoute path ="/Bonafide" layout={AdminLayout} component={Bonafide} />
      <AppRoute path ="/CharacterCertificate" layout={AdminLayout} component={CharacterCertificate} />
      <AppRoute path ="/StudentUpgrade" layout={AdminLayout} component={StudentUpgrade} />
      <AppRoute path ="/StudentPromotionDemotion" layout={AdminLayout} component={StudentPromotionDemotion} />
      <AppRoute path ="/StudentSpecificPromotion" layout={AdminLayout} component={StudentSpecificPromotion} />
      <AppRoute path ="/StudentPromotionAll" layout={AdminLayout} component={StudentPromotionAll} />
      <AppRoute path ="/" layout={AdminLayout} component={Dashboard} />

      
          </Switch>:
        <Switch>
        <Route path="/"> 
          <Landing />
        </Route></Switch> }
    </BrowserRouter>,
  document.getElementById('root')
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
