import React from 'react';
class Landing extends React.Component{
    constructor(props){
        super(props)
        this.state={
            username:'',
            password:'',
        }
    }
    login = () => {
        const url = "http://144:91:110:210:4800/signin"
        fetch(url
          , {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              username: this.state.username,
              password: this.state.password
            })
          })
          .then(res => res.json()
          )
          .then((res) => {
            try{
                console.log(res.user + "this is admin data")
            if (res.user.role === "Admin"  ) {
              localStorage.setItem('access', res.user.role);
              localStorage.setItem('user_id', res.user._id);
              localStorage.setItem('SessionAccess','2023-2024')
              localStorage.setItem('username',res.user.username)
              window.location.href = "/";
            }
            else if (res.user.role ==="Cashier"  ) {
              localStorage.setItem('access', res.user.role);
              localStorage.setItem('user_id', res.user._id);
              localStorage.setItem('SessionAccess','2023-2024')
              localStorage.setItem('username',res.user.username)
              window.location.href = "/";
            }
            else if (res.user.role === "AdmissionCell"  ) {
              localStorage.setItem('access', res.user.role);
              localStorage.setItem('user_id', res.user._id);
              localStorage.setItem('SessionAccess','2023-2024')
              localStorage.setItem('username',res.user.username)
              window.location.href = "/";
            }
            else {
              this.setState({errorMsg:'Username or password is not valid'})
            }
          }
          catch{
               this.setState({errorMsg:'Username or password is not valid'})
          }
          })
          .then(err => console.log(err))
      }

    render(){
        return(
            <>
           {/* <div className="row" style={{ display: "flex",alignItems: "center",height: '100vh'}}>
               <div className="col-4">
               </div>
               <div className="col-3" style={{padding:"70px",    backgroundColor:"#285d9c6e",borderRadius:"80px"}}>
                   <div className="form-row">
                       <h6 className="text-center" style={{color:"#c60000"}}>{this.state.errorMsg}</h6>
                       <div className="col-12 form-group">
                           <label>USERNAME</label>
                           <input type="text" className="form-control" onChange={(e) => { this.setState({ username: e.target.value.toUpperCase() }) }}placeholder="Enter Username"/>
                           
                       </div>
                       <div className="col-12 form-group">
                           <label>PASSWORD</label>
                           <input type="password" className="form-control" onChange={(e) => { this.setState({ password: e.target.value.toUpperCase() }) }}placeholder="Enter Password"/>
                       </div>
                       <div className="col-12 form-group">
                           <button className="btn btn-info btn-block" onClick={()=>{this.login()}}>LOGIN</button> 
                       </div>
                   </div>
               </div>
               <div className="col-4">
               </div>
           </div> */}

           <div class="container-fluid loginBackground" >
		<div class="row main-content bg-success text-center">
			<div class="col-md-4 text-center company__info">
				<span class="company__logo"><h2><span ><img src={require('./images/logo.png').default} style={{height:"100px"}} /></span></h2></span>
				<h4 class="company_title">CONSTANCIA SCHOOL FEES SYSTEM</h4>
			</div>
			<div class="col-md-8 col-xs-12 col-sm-12 login_form ">
				<div class="container-fluid">
					<div class="row">
						<h2>Log In</h2>
					</div>
					<div class="row">
          <h6 className="text-center" style={{color:"#c60000"}}>{this.state.errorMsg}</h6>
						<form control="" class="form-group">
              
							<div class="row">
								<input type="text" name="username" id="username" class="form__input form" onFocus={(e)=>{this.setState({errorMsg:""})}} onChange={(e) => { this.setState({ username: e.target.value.toUpperCase() }) }}placeholder="Enter Username" />
							</div>
							<div class="row">
								{/* <!-- <span class="fa fa-lock"></span> --> */}
								<input type="password" name="password" id="password" class="form__input" onFocus={(e)=>{this.setState({errorMsg:""})}}  onChange={(e) => { this.setState({ password: e.target.value.toUpperCase() }) }}placeholder="Enter Password"/>
							</div>
							{/* <div class="row">
								<input type="checkbox" name="remember_me" id="remember_me" class="" />
								<label for="remember_me">Remember Me!</label>
							</div> */}
							<div class="row">
								<input type="button" onClick={()=>{this.login()}} value="Login" class="btn" />
							</div>
						</form>
					</div>
					<div class="row">
						{/* <p>Don't have an account? <a href="#">Register Here</a></p> */}
					</div>
				</div>
			</div>
		</div>
	</div>
	{/* <!-- Footer --> */}
	<div class="container-fluid text-center footer">
	<p>	Coded with &hearts; by <a target="_blank" href="https://giksindia.com">GIKS.</a></p>
	</div>
            </>
        )
    }
}
export default Landing;