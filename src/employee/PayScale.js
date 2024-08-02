import React,{useState,useEffect} from 'react'
import DataTable from '@bit/adeoy.utils.data-table';
import $ from 'jquery'; 
import { render } from '@testing-library/react';
// var AllPayTypeWithValueState =[{'PayType':'','category':'','amount':0,'PrecentageOrFixed':''}]
const PayScale = () => {

    useEffect(()=>{
        getPayScale()
        getPayScaleType()
        getPayType()
        getPayCategoty()
       
        $(document).ready(function(){
          
          $('.hideSection').hide();
          $('.Changer').change(function(){
            $('.hideSection').show();
            var val =$(this).val();
            if(val=="PRECENTAGE"){
              $('.precentageInput').show();
              $('.fixedInput').hide();
            }else{
              $('.precentageInput').hide();
              $('.fixedInput').show();
            }
          })
          $('.precentageInput').hide();
        })

    },[])




    const [name,setName]=useState('')
    const [updateBtn,setUpdateBtn]=useState(false)
    const [_id,setId]=useState('')
    const [PayScaleName,setPayScaleName]=useState('')
    let [AllPayTypeWithValueState,setAllPayTypeWithValueState]=useState([{'PayType':'','category':'','amount':0,'PrecentageOrFixed':''}])
    
    const [AllPayScale,setAllPayScale]=useState([])
    const [AllPaySacleType,setAllPayScaleType]=useState([])
    const [AllPayType,setAllPayType]=useState([])
    const [AllPayCategory,setAllPayCategory]=useState([])
    const [AllPayTypeWithValue,setAllPayTypeWithValue]=useState([])
    

    const getPayType = () => {
      
      fetch("http://localhost:4800/getPayType"
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
            
              setAllPayTypeWithValue(AllPayTypeWithValueState)
            }
          })
          
          .then(err => console.log(err))
  }

  const getPayCategoty = () => {
    fetch("http://localhost:4800/getPayCategoty"
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
    const getPayScale = () => {
        fetch("http://localhost:4800/getPayScale"
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
                setAllPayScale(data)
              }
            })
            .then(err => console.log(err))
    }

    const StorePayScale = () => {
      setUpdateBtn(false)
      // console.log(JSON.stringify(AllPayTypeWithValueState))
        const data = new FormData()
        data.append('PayScaleName', PayScaleName)
        data.append('PayScale', JSON.stringify(AllPayTypeWithValueState))
        const url = "http://localhost:4800/StorePayScale"
        fetch(url, {
                method: 'post',
                body: data
            })
            .then(res => res.json())
            .then(data => {
                alert("Created Successfully !") 
                getPayScale() 
                setAllPayTypeWithValueState([{'PayType':'','category':'','amount':0,'PrecentageOrFixed':''}]) 
                setPayScaleName('')   
                setId('')            
            })
            .then(err => {})

    }

    const UpdatePayScale = () => {
      // console.log(JSON.stringify(AllPayTypeWithValueState))
        const data = new FormData()
        data.append('_id', _id)
        data.append('PayScaleName', PayScaleName)
        data.append('PayScale', JSON.stringify(AllPayTypeWithValueState))
        const url = "http://localhost:4800/UpdatePayScale"
        fetch(url, {
                method: 'put',
                body: data
            })
            .then(res => res.json())
            .then(data => {
                alert("Updated Successfully !") 
                getPayScale() 
                setAllPayTypeWithValueState([{'PayType':'','category':'','amount':0,'PrecentageOrFixed':''}]) 
                setPayScaleName('')   
                setId('')          
            })
            .then(err => {})

    }

    const getPayScaleType = () => {
      fetch("http://localhost:4800/getPayScaleType"
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
              setAllPayScaleType(data)
            }
          })
          .then(err => console.log(err))
  }

  let EditObj=(obj)=>{
    setUpdateBtn(true)
    setId(obj._id)
    setPayScaleName(obj.PayScaleName)
    setAllPayTypeWithValueState( JSON.parse(obj.PayScale))

  }
  let DeletePayScale = (id) => {
    const apiUrl = 'http://localhost:4800/DeletePayScale';
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
    alert("Deleted Successfully !")
    getPayScale()
      
    })
    
  }


const AddMore=()=>{
  let newArray=[...AllPayTypeWithValueState]
  newArray.push({'PayType':'','category':'','amount':0,'PrecentageOrFixed':''})
  AllPayTypeWithValueState=newArray
  // AllPayTypeWithValueState.push()
  setAllPayTypeWithValueState(AllPayTypeWithValueState)
  
  // setName(AllPayTypeWithValueState.length)
  // console.log(AllPayTypeWithValueState)
}
const RemoveMore=(item)=>{
  
  // let AllPayTypeWithValueState=JSON.parse(JSON.stringify(AllPayTypeWithValueState))
  // debugger
  let filterdArray=AllPayTypeWithValueState.filter(el=>el !=item)
  // AllPayTypeWithValueState=filterdArray
  // var index =AllPayTypeWithValueState.indexOf(item)
  // if (index > -1) {
  // AllPayTypeWithValueState.splice(index,1)
  // }
  setAllPayTypeWithValueState(filterdArray)
  // setName("vineet"+AllPayTypeWithValueState.length)
  
  // console.log(AllPayTypeWithValueState)
}

  const setvalueCategory= (e,index)=>{
    let itemArray=[...AllPayTypeWithValueState]
    itemArray[index].category=e.target.value
    setAllPayTypeWithValueState(itemArray)
    // console.log(AllPayTypeWithValueState)
  }
  const setvalueName= (e,index)=>{
    let itemArray=[...AllPayTypeWithValueState]
    itemArray[index].PayType=e.target.value
    setAllPayTypeWithValueState(itemArray)
    // console.log(AllPayTypeWithValueState)
  }
  let setvaluePrecentageOrFixed= (e,index)=>{
    let itemArray=[...AllPayTypeWithValueState]
    itemArray[index].PrecentageOrFixed=e.target.value
    setAllPayTypeWithValueState(itemArray)
    // console.log(AllPayTypeWithValueState)
  }
  let setvalueAmount= (e,index)=>{
    let itemArray=[...AllPayTypeWithValueState]
    itemArray[index].amount=e.target.value
    setAllPayTypeWithValueState(itemArray)
    // console.log(AllPayTypeWithValueState)
  }
  // const setvaluePrecentage= (value,index)=>{
  //   AllPayTypeWithValue[index].precentage=value
  //   console.log(AllPayTypeWithValue)
  // }
  




     // Data Table 
     const data =[];
     {AllPayScale.map((item,index)=>{
     data.push( {"sr_no":index+1,"name":item.PayScaleName,'action':<td><button className="bn btn-secondary " onClick={()=>{EditObj(item)}} ><i class="fas fa-pencil-alt"></i></button><button onClick = { () => DeletePayScale(item._id)}className="btn btn-danger ml-2"><i className="fa fa-trash" aria-hidden="true"></i></button></td>})
     })}
       const columns = [
         { title: "SR NO", data: "sr_no" },
         { title: "Name", data: "name" },
         { title: "Action", data: "action" },
        
       ];
       const click = (row) => {
         console.log(row);
       };
    return (
        <>
          <div className="row pb-5 ">
      <div className="col-12">
        <div className="layoutCard ">
            <div className="row pb-5 ">
                <div className="col-12 pb-5">
                <h3>Pay Scale</h3>
                </div>
                <div className="col-6 form-group">
                     <label>Pay Level</label>
                    <select className="form-control" value={PayScaleName} onChange={(e)=>{setPayScaleName(e.target.value)}} >
                    <option value="">Choose Level...</option>
                    {AllPaySacleType.map((item,index)=>{
                      return(
                      <option defaultValue={item.name}>{item.name}</option>
                      )
                    })}
                     </select>
                </div>
                {/* <div className="col-6 form-group" >
                     <label>Fixed/Precentage</label>
                    <select className="form-control Changer" >
                    <option value="">Choose...</option>
                    <option value="FIXED">FIXED</option>
                    <option value="PRECENTAGE">PRECENTAGE</option>
                     </select>
                </div> */}
            </div>
        </div>
        {/* <div className="layoutCard hideSection ">
            <div className="row pb-5 ">
                <div className="col-12 pb-5">
                <h3>ALLOWANCE</h3>
                </div>
       
                    {AllPayTypeWithValue.map((item,index)=>{
                      if(item.category=="ALLOWANCE"){
                      return(
                        <div className="col-12 form-group">
                          <label>{item.name} {PrecentageOrFixed == "PRECENTAGE" ? "%" :null}</label>
                          <input className="form-control fixedInput" defaultValue={item.amount} onChange={(e)=>{setvalueFixed(e.target.value,index)}} />
                         
                          <input className="form-control precentageInput"  defaultValue={item.precentage} onChange={(e)=>{setvaluePrecentage(e.target.value,index)}} />
                       
                        </div>
                      )
                      }
                    })}
                    <div className="col-12 form-group">
                      <br/>
                      <button className="btn btn-success btn-block" onClick={()=>{StorePayScale()}}> Save Details</button>
                    </div>  
            </div>
        </div> */}
      </div>

      <div className="col-12">
      <div className="layoutCard">
        <table className="table PayScaleTable">
          <thead>
            <tr>
            <th>Category</th>
            <th>Pay type</th>
            <th>Amount Type</th>
            <th>Amount</th>
            <th>Add More</th>
            </tr>
          </thead>
          <tbody>


          {
          // console.log("before Map  "+ JSON.stringify(AllPayTypeWithValueState)),
           AllPayTypeWithValueState.map((it,ind)=>{ 
            // console.log("inside the State" +JSON.stringify(AllPayTypeWithValueState))
            return(
            <tr key={ind} className=" m-5" id={ind}>      
            <td><select className=" form-control w-75"  onChange={(e)=>{setvalueCategory(e,ind)}} value={AllPayTypeWithValueState[ind].category}>
            <option value="">Choose...</option>
              {AllPayCategory.map((item,index)=>{
                return(
                <option key={index+"vi"} value={item.name}>{item.name}</option>
                )
              })}
              </select ></td>
              <td><select className=" form-control w-75"  onChange={(e)=>{setvalueName(e,ind)}} value={AllPayTypeWithValueState[ind].PayType}>
              <option value="">Choose...</option>
              {AllPayType.map((item,index)=>{
                 if(item.category==AllPayTypeWithValueState[ind].category){
                return(
                <option key={index+"vin"} className="form-control w-75" value={item.name}>{item.name}</option>
                )
                 }
                
              })}
              
              </select></td>
              <td>
              <select className="form-control w-75 Changer" onChange={(e)=>{setvaluePrecentageOrFixed(e,ind)}} value={AllPayTypeWithValueState[ind].PrecentageOrFixed}>
                    <option value="">Choose...</option>
                    <option value="FIXED">FIXED</option>
                    <option value="PRECENTAGE">PRECENTAGE</option>
              </select>
              </td>
              <td>
                <input className="form-control w-75" key={ind} value={AllPayTypeWithValueState[ind].amount} onChange={(e)=>{setvalueAmount(e,ind)}}/>
            </td>
            <td>
              {ind <1 ? 
                <button className="btn btn-success btn-lg" onClick={()=>{AddMore()}}>  +  </button>
                :
                <button className="btn btn-danger btn-lg" onClick={()=>{RemoveMore(it)}}>  -  </button>
                }
            </td>
              </tr>
               )
              })
            }
          </tbody>
        </table>
                    <div className="col-12 form-group pb-5">
                      <br/>
                      <button className="btn btn-success" style={{float:"right"}} onClick={()=>{StorePayScale()}}> Save Details</button>
                     {updateBtn==true?  <button className="btn btn-secondary mr-2" style={{float:"right"}} onClick={()=>{UpdatePayScale()}}> Update Details</button>:null}
                    </div> 
      </div>
      </div>
     
      

      {/* <div className="col-6">
        <div className="layoutCard hideSection ">
            <div className="row pb-5 ">
                <div className="col-12 pb-5">
                <h3>BASIC</h3>
                </div>
       
                    {AllPayTypeWithValue.map((item,index)=>{
                      if(item.category=="BASIC"){
                      return(
                        <div className="col-12 form-group">
                          <label>{item.name} </label>
                          <input className="form-control " defaultValue={item.amount} onChange={(e)=>{setvalueFixed(e.target.value,index)}} />
                        </div>
                      )
                      }
                    })}
                     
               
            </div>
        </div>
        <div className="layoutCard hideSection ">
            <div className="row pb-5 ">
                <div className="col-12 pb-5">
                <h3>DEDUCTION</h3>
                </div>
       
                    {AllPayTypeWithValue.map((item,index)=>{
                      if(item.category=="DEDUCTION"){
                      return(
                        <div className="col-12 form-group">
                          <label>{item.name}  {PrecentageOrFixed == "PRECENTAGE" ? "%" :null}</label>
                          
                          <input className="form-control fixedInput" defaultValue={item.amount} onChange={(e)=>{setvalueFixed(e.target.value,index)}} />
                         
                          <input className="form-control precentageInput"  defaultValue={item.precentage} onChange={(e)=>{setvaluePrecentage(e.target.value,index)}} />
                       
                        </div>
                      )
                      }
                    })}
                     
               
            </div>
        </div>
      </div> */}
      
       
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

export default PayScale
