import React,{useState,useEffect} from 'react'
import DataTable from '@bit/adeoy.utils.data-table';

const PayCategory = () => {
    useEffect(()=>{
        getPayCategoty()
    },[])
    const [updateBtn,setUpdateBtn]=useState(false)
    const [_id,setId]=useState('')
    const [name,setName]=useState('')
    const [description,setDescription]=useState('')
    const [AllPayCaregory,setAllPayCategory]=useState([])
    
    const getPayCategoty = () => {
        fetch("http://144.91.110.221:4800/getPayCategoty"
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
                setAllPayCategory(data)
              }
            })
            .then(err => console.log(err))
    }

    const StorePayCategory = () => {
        setUpdateBtn(false)
        const data = new FormData()
        data.append('name', name)
        data.append('description', description)
        const url = "http://144.91.110.221:4800/StorePayCategory"
        fetch(url, {
                method: 'post',
                body: data
            })
            .then(res => res.json())
            .then(data => {
                alert("Created Successfully !") 
                getPayCategoty()               
            })
            .then(err => {})

    }

    let EditObj=(obj)=>{
      setUpdateBtn(true)
      setId(obj._id)
      setName(obj.name)
      setDescription(obj.description)
  
    }
    const UpdatePayCategory = () => {
      // console.log(JSON.stringify(AllPayTypeWithValueState))
        const data = new FormData()
        data.append('_id', _id)
        data.append('name', name)
        data.append('description', description)
        const url = "http://192.168.43.123:4800/UpdatePayCategory"
        fetch(url, {
                method: 'put',
                body: data
            })
            .then(res => res.json())
            .then(data => {
                alert("Updated Successfully !") 
                getPayCategoty()  
                setName('') 
                setDescription('')   
                setId('')          
            })
            .then(err => {})

    }
    let DeletePayCategory = (id) => {
      const apiUrl = 'http://192.168.43.123:4800/DeletePayCategory';
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
        getPayCategoty()
        alert("Deleted Successfully !")
      })
      
    }
     // Data Table 
     const data =[];
     {AllPayCaregory.map((item,index)=>{
     data.push( {"sr_no":index+1,"name":item.name,'description':item.description,'action':<td><button className="bn btn-secondary " onClick={()=>{EditObj(item)}} ><i class="fas fa-pencil-alt"></i></button><button onClick = { () => DeletePayCategory(item._id)}className="btn btn-danger ml-2"><i className="fa fa-trash" aria-hidden="true"></i></button></td>})
     })}
       const columns = [
         { title: "SR NO", data: "sr_no" },
         { title: "Name", data: "name" },
         { title: "Description", data: "description" },
         { title: "Action", data: "action" },
        
       ];
       const click = (row) => {
         console.log(row);
       };
    return (
        <>
        <div className="layoutCard ">
            <div className="row pb-5 ">
                <div className="col-12 pb-5">
                <h3>Pay Category</h3>
                </div>
                <div className="col-4 form-group">
                     <label>Name</label>
                     <input className="form-control" type="text" value={name} onChange={(e)=>{setName(e.target.value.toUpperCase())}} placeholder="Enter Name Here"  />
                </div>
                <div className="col-4 form-group">
                <label>Description</label>
                <input className="form-control" value={description} onChange={(e)=>{setDescription(e.target.value.toUpperCase())}}  />
                </div>
                <div className="col-4 form-group d-flex align-items-end">
                    <br/>
                    <button className="btn btn-success" onClick={()=>{StorePayCategory()}}>Save</button>
                    {updateBtn==true?  <button className="btn btn-secondary mr-2" style={{float:"right"}} onClick={()=>{UpdatePayCategory()}}> Update Details</button>:null}
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

export default PayCategory
