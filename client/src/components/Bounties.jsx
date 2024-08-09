import { useState } from "react";
import CreateBounties from "./CreateBounties";



export default function Bounties(props) {


  const { firstName, lastName, bountyPrice, type, alive, deleteBounty, _id,  editBounty } = props;

  const [editToggle, setEditToggle] = useState(false);
  
  
  const wantedAlive = function  (){
    if(alive === true){return "wanted Alive!"}
    else {return "wanted Dead!"}
    } 



  return (
    <> 
      {!editToggle ? (
        
        <>
          <h1 className="bountyList-firstName"> first Name: {firstName}</h1>
          <h1 className="bountyList-lastName">last name: {lastName}</h1>
          <p className="bountyList-price">price ${bountyPrice}</p>
          <p>{type}</p>
          <p>{wantedAlive()}</p>
          <button onClick={() => deleteBounty(_id)}>X</button>
          <button onClick={() => setEditToggle((prevToggle) => !prevToggle)}>
            Edit
          </button>
       </>
      ) : (
        <div>
          <CreateBounties 
          btnTxt="submit edit" 
          submit={editBounty}
          _id={_id}
          firstName={firstName}
          lastName={lastName}
          alive={alive}
          bountyPrice={bountyPrice}
          type={type}
          setEditToggle={setEditToggle}
      />
          <button onClick={() => setEditToggle((prevToggle) => !prevToggle)}>
            cancel
          </button>
        </div>
      )}
    </>
  );
}
