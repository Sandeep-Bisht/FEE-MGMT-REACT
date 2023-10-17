import React ,{useEffect,useState}from 'react'
import DataTable from '@bit/adeoy.utils.data-table';
// import './Eform.css';


const Eform = () => {
    useEffect(()=>{
        getEmployees()
        getPayType()
        getDesignation()
    },[]);


    
    const [name,setName]=useState('')
    const [dob,setDob]=useState('')
    const [doa,setDoa]=useState('')
    const [sex,setGender]=useState('')
    const [designation,setDesignation]=useState('')
    const [pay_level,setPayLevel]=useState('')
    const [AllEmployees,setAllEmployees]=useState([])
    const [AllPayTypes,setAllPayType]=useState([])
    const [AllDesignation,setAllDesignation]=useState([])

    const getDesignation = () => {
      fetch("http://144.91.210.221:4800/getDesignation"
      , {
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
            if(data[0] !=undefined){
              setAllDesignation(data)
            }
          })
          .then(err => console.log(err))
  }
   const getEmployees = () => {
        fetch("http://144.91.210.221:4800/getEmployees"
        , {
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
              if(data[0] !=undefined){
                setAllEmployees(data)
              }
            })
            .then(err => console.log(err))
    }
    const StoreEmployee = () => {
        
        const data = new FormData()
        data.append('name', name)
        data.append('dob', dob)
        data.append('doa', doa)
        data.append('sex', sex)
        data.append('designation', designation)
        data.append('pay_level', pay_level)
        const url = "http://144.91.210.221:4800/StoreEmployee"
        fetch(url, {
                method: 'post',
                body: data
            })
            .then(res => res.json())
            .then(data => {
                alert("Employee Created Successfully") 
                getEmployees()               
            })
            .then(err => {})

    }

    const getPayType = () => {
        fetch("http://144.91.210.221:4800/getPayType"
        , {
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
              if(data[0] !=undefined){
                setAllPayType(data)
              }
            })
            
            .then(err => console.log(err))
    }

    // Data Table 
    const data =[];
    {AllEmployees.map((item,index)=>{
    data.push( {"sr_no":index+1,"name":item.name,'designation':item.designation,'pay_level':item.pay_level.name,"doa":item.doa})
    })}
      const columns = [
        { title: "SR NO", data: "sr_no" },
        { title: "Name", data: "name" },
        { title: "Designation", data: "designation" },
        { title: "Pay Level", data: "pay_level" },
        { title: "DOA", data: "doa" },
      ];
      const click = (row) => {
        console.log(row);
      };
    return (
        <>
        <div className="layoutCard ">
            <div className="row pb-5 ">
                <div className="col-12 pb-5">
                <h3>Employee</h3>
                </div>
                <div className="col-4 form-group">
                     <label>Name</label>
                     <input className="form-control" type="text" onChange={(e)=>{setName(e.target.value.toUpperCase())}} placeholder="Enter Name Here"  />
                </div>
                <div className="col-4 form-group">
                <label>DOB</label>
                <input className="form-control" onChange={(e)=>{setDob(e.target.value.toUpperCase())}} type="date"  />
                </div>
                <div className="col-4 form-group">
                <label>DOA</label>
                <input className="form-control" onChange={(e)=>{setDoa(e.target.value.toUpperCase())}} type="date"  />
                </div>
                <div className="col-4 form-group">
                <label>Gender</label>
                <select className="form-control" onChange={(e)=>{setGender(e.target.value.toUpperCase())}} >
                    <option>Choose Gender...</option>
                    <option value="MALE">MALE</option>
                    <option value="FEMALE">FEMALE</option>
                </select>
                </div>
                <div className="col-4 form-group">
                <label>Designation</label>
                <select className="form-control"  onChange={(e)=>{setDesignation(e.target.value.toUpperCase())}} >
                    <option>Choose Designation...</option>
                    {AllDesignation.map((item,index)=>{
                      return(
                        <option value={item.name}>{item.name}</option>
                      )
                    })}  
                </select>
                </div>
                {/* <div className="col-4 form-group">
                <label>Pay level</label>
                <select className="form-control" onChange={(e)=>{setPayLevel(e.target.value.toUpperCase())}} >
                    <option value="">Choose Level...</option>
                    {AllPayTypes.map((item,index)=>{
                        return(
                        <option value={item._id}>{item.name}</option>
                        )
                    })}
                </select>
                </div> */}
                <div className="col-4 form-group d-flex align-items-end">
                    <br/>
                    <button className="btn btn-success btn-block" onClick={()=>{StoreEmployee()}}>Save</button>
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

export default Eform
