import React from 'react';
import DataTable from '@bit/adeoy.utils.data-table';
// import { NotificationContainer, NotificationManager } from 'react-notifications-component';
// import 'react-notifications-component/dist/theme.css';


class BankCreation extends React.Component{
    constructor(props){
        super(props)
        this.state={
            _id:'',
            bank:'',
            AllBank:[],
            updateBtn:'',
        }
    
    }
    componentDidMount(){
        this.getBankData()
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
    editVehicleTypeObject = (obj) => {
        this.setState({updateBtn:true})
        let _id   =   obj._id
        let bank = obj.bank
        this.setState({_id,bank})
    }
    UpdateBankData =()=>{
        if (this.checkValidation()) {
        const data = new FormData()
        data.append('_id',this.state._id)
        data.append('bank',this.state.bank)
        data.append('school_id','100')
        const url="http://144.91.110.221:4800/UpdateBankData"
                fetch(url,
                    {
                    method:'put',
                    body:data
                })
                .then(res => res.json())              
                .then((res)=>{  
               alert('Bank updated successfully !');
               this.getBankData()
                })            
                .then(err=>console.log(err))
              }
      }
      deleteBank = (id) => {
        const apiUrl = 'http://144.91.110.221:4800/deleteBank';
        fetch(apiUrl, {
          headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          method:'delete',  
          body:JSON.stringify({_id:id})
        })
        .then((response) => response.json())
        .then((res) => {
        alert("Bank Deleted Successfully")
        this.getBankData()
          
        })
        
      }
      checkValidation = () => {
        if (this.state.bank === "") {
            this.setState({bankErrorMessage: "Please Enter Vehicle Type"})
            return false
        }else {
            return true
        }
      }
    submitBankData = () => {
        if (this.checkValidation()) {
        const data = new FormData()
        data.append('bank', this.state.bank)
        data.append('school_id', "100")
        const url = "http://144.91.110.221:4800/StoreBankData"
        fetch(url, {
                method: 'post',
                body: data
            })
            .then(res => res.json())
            .then(data => {
              // NotificationManager?.success('Bank Created Successfully', 'Success', 3000);
                // alert("Bank Created Successfully") 
                this.getBankData()               
            })
            .then(err => {})
        }
    }
    render(){
        const data =[];
        {this.state.AllBank.map((item,index)=>{
        data.push( {"sr_no":index+1,"Bank":item.bank,"action":<td><button className="btn btn-secondary mr-2" onClick={() => this.editVehicleTypeObject(item)}><i class="fas fa-pencil-alt"></i></button><button onClick = { () => this.deleteBank(item._id)}className="btn btn-danger"><i className="fa fa-trash" aria-hidden="true"></i></button></td>})
        })}
          const columns = [
            { title: "SR NO", data: "sr_no" },
            { title: "Vehicle Type", data: "Bank" },
            { title: "Action", data: "action" },
          ];
          const click = (row) => {
            console.log(row);
          };
        return(
            <>
            <div className="row layoutCard">
                <div className="col-12">
                    <div className="form-row">
                        <div className="col-6 form-group">
                            <label>Bank Name *</label>
                            <input type="text" className="form-control" value={this.state.bank} onChange={(e)=>{{this.setState({bank:e.target.value.toUpperCase(),bankErrorMessage:undefined})}}}/>
                            <span className="errorMessage" style={{fontSize:'14px',fontWeight:600}}>{this.state.BankErrorMessage}</span>
                        </div>
                        <div className="col-6 form-group">
                         <label> </label>
                         <button className="btn btn-info mt-5" onClick={()=>{this.submitBankData()}}>Save</button>
                        {this.state.updateBtn ?
                        <button className="btn btn-secondary ml-3 mt-5" type="submit" onClick={(e) => this.UpdateBankData(e)}>Update</button>
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
export default BankCreation;