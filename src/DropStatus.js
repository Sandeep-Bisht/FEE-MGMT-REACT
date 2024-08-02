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
   
   
   GetMessage();
// scroll()
},[])
$(document).ready(function(){
  $('.show-msg-area').scrollTop($('.show-msg-area')[0].scrollHeight);
});
const SubmitMsg = async () => {
    if(!Userdata==[]){
      if(message !=""){
      await fetch("http://localhost:4800/DropStatus", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            created_by: Userdata,
            message:message,
           
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
    else{
      alert("please enter text")
    }
  }
    
  };
   // allcategory api //
   const GetMessage=async()=>{ 
    
    await fetch("http://localhost:4800/GetDropStatus")
            .then(res =>res.json())
           
            .then(async (data) => {
             
                Setstatus(data)
               
              }
            )
            .catch((err) => {
             console.log(err,"error");
            });
          }
  // End All Category API//
    return(
        <>
        <div className="chat-bg">
                <div className="container ">
                <div className="col-11 drop-status-div text-center" style={{postion:'fixed'}}>
                  <h4 style={{color:'darkgreen'}}>CONTANCIA Fees Management Status Group</h4>
                </div>
                    <div className="row">
                   
                    <div className="col-11 drop-status-div">
                        
                        <div className="show-msg-area" onLoad="window.scroll(0,0)">
                       
                       
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
                          <div className="text-center mb-3 date-div"> <span>{ Moment(item.createdAt).format('DD/MMM/YYYY')} </span></div>
                          :null}
                          {item.created_by.username==localStorage.getItem('username')?
                            <div className="row pl-4 pr-5">
                              <div className="col-8"></div>
                            <div className="status-card actived col-4">
                         
                                <span style={{cursor:'pointer'}}>{item.message} <span className="test" data-hover={ Moment(item.createdAt).format('hh:mm:ss')} > {item.created_by.username}</span></span>
                            </div>
                            {/* <div className="col-1"></div> */}
                            </div>:
                            <div className="row pl-4 pr-4">
                            
                            <div className="status-card not-active col-4">
                              <div>
                                <span style={{cursor:'pointer'}}>{item.message} <span className="test" data-hover={ Moment(item.createdAt).format('hh:mm:ss')} > {item.created_by.username}</span></span>
                                </div>
                            </div>
                            <div className="col-8"></div>
                            </div>
                        }
                            
                          </>
                        
                        )}  
                        )}          

                        </div>
                        
                        
                        <div className="row align-items-center footer">
                        <div className="col-1"></div>
                        <div className="col-10 p-0">
                        <input type="text" placeholder="type here....." className="form-control msg textarea" value={message}  onChange={(e)=>Setmessage(e.target.value)} onKeyPress={(e)=>{if(e.key=="Enter"){SubmitMsg(e)}}} style={{textTransform:'unset'}} />
                      
                        </div>
                        <div className="col-1"></div>
                        </div>
                    
                    
                        
                        </div>
                        <div className="col-1"></div>
                    </div>
                </div>
                </div>
        </>
    )
}

export default DropStatus;