import React, { Component } from "react";
import * as fiicons from "react-icons/fc";
import { Card, CardText, CardBody, CardTitle, CardHeader } from "reactstrap";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";
import "../asset/css/App.css";

class Cardview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: JSON.parse(localStorage.getItem("loc_sites")), //Fetching sites from local storage
    };
  }

  click(id){
    localStorage.setItem("site_id", id);
    console.log(id);
    //this.props.history.push('/Device');

    fetch("https://localhost:44308/Api/Device/details",{
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Token: localStorage.getItem('tok'),
        id:localStorage.getItem('site_id')
      }),
    }).then((res)=>res.json())
      .then((result)=>{
        
        console.log(result);
        //localStorage.setItem("dev_id",result.id)

          

      })
  }

  componentDidMount() {
    this.setState({
      data: JSON.parse(localStorage.getItem("loc_sites")),
    });
  }

  render() {
    var { data } = this.state;

    return (
      <div className="container">
        <div className="row">
          {data.map((item) => (
            <div  key={item.id} className="col-sm-4">
              <Card className="card-width">
                <CardHeader
                  tag="h6"
                  style={{
                    backgroundColor: "#333",
                    borderColor: "#333",
                    color: "white",
                  }}
                >
                  {item.name}
                </CardHeader>
                <CardBody className="card-box">
                  <CardText>
                    <fiicons.FcElectroDevices size={30} />
                    &nbsp;&nbsp;<b>Devices : {6}</b>
                  </CardText>
                  <br />
                  <br />
                   <Link to="/Device"> 
                    {" "}
                    
                    <Button onClick={()=>this.click(item.id)} >View Details</Button>
                   </Link> 
                </CardBody>
              </Card>{" "}
              <br />
            </div>
          ))}
        </div>{" "}
      </div>
    );
  }
}

export default Cardview;
