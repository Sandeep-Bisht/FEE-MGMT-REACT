import { render } from '@testing-library/react';
import React, { useState } from 'react';
import Moment from 'moment';
import $ from 'jquery'
import { useEffect } from 'react/cjs/react.development';
import "./DropStatus.css"
var Userdata=""
const DropStatus=()=>{
var sameDate='';
var showDate=true;
const [message, Setmessage]=useState("");
const [status, Setstatus]=useState([]);
const [blank, setBlank]=useState();
useEffect(()=>{
   Userdata=localStorage.getItem('user_id');
   console.log(Userdata, "hello data")
   GetMessage();
// scroll()
},[])
$(document).ready(function(){
  $('.show-msg-area').scrollTop($('.show-msg-area')[0].scrollHeight);
});
const SubmitMsg = async () => {
    if(!Userdata==[]){
      await fetch("http://144.91.110.221:4800/DropStatus", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            created_by: Userdata,
            message:message
        }),
      })
        .then((res) => res.json())
        .then(async (data) => {
            GetMessage()
          //  setBlank('')
           Setmessage('')
          }
        )
        .catch((err) => {
          console.log(err, "error");
        });
    }
   
    
  };
   // allcategory api //
   const GetMessage=async()=>{ 
    
    await fetch("http://144.91.110.221:4800/GetDropStatus")
            .then(res =>res.json())
           
            .then(async (data) => {
             
                Setstatus(data)
                console.log(data, "hello")
              }
            )
            .catch((err) => {
             console.log(err,"error");
            });
          }
  // End All Category API//
    return(
        <>
                <div className="container">
                    <div className="row">
                    <div className="col-1"></div>
                    <div className="col-9 drop-status-div">
                        
                        <div className="show-msg-area" onLoad="window.scroll(0,0)">
                       
                        {/* {} */}
                        {status.map((item,ind)=>
                        {   
                          if(sameDate!= Moment(item.createdAt).format('DD/MM/YYYY')){
                            sameDate= Moment(item.createdAt).format('DD/MM/YYYY');
                            showDate = true;
                          }else{
                            showDate = false;
                          }
                            return(
                          <>
                          {showDate?
                          <div className="text-center mb-3"> { Moment(item.createdAt).format('DD/MMM/YYYY')} </div>
                          :null}
                            <div className="status-card">
                         
                                <span>{item.message} <span className="test" data-hover={ Moment(item.createdAt).format('hh:mm:ss')}> {item.created_by.username}</span></span>
                            </div>
                          </>
                        
                        )}  
                        )}          

                        </div>
                        <footer>
                        <textarea placeholder="type here....." rows="5"  value={message} onChange={(e)=>Setmessage(e.target.value)} style={{textTransform:'unset'}}></textarea>
                        
                        <div>
                        <button className="mt-2" onClick={()=>SubmitMsg()}>Submit</button>
                        </div>
                        </footer>
                    </div>
                    <div className="col-2"></div>
                    </div>
                </div>
        </>
    )
}

export default DropStatus;