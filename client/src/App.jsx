import React, { useState, useEffect } from 'react';
import axios from "axios";
import Bounties from './components/Bounties';
import CreateBounties from './components/CreateBounties';

function App() {
  const [bountyList, setBountyList] = useState([]);
  const [editToggle, setEditToggle] = useState(false);

  function getBounties() {
    axios.get("/api/bountyBoard")
      .then(res => setBountyList(res.data))
      .catch(err => console.log(err))
  }

  function addBounty(newBounty) {
    axios.post("/api/bountyBoard", newBounty)
      .then(res => {
        setBountyList(prev => [...prev, res.data])
        setEditToggle(false); // Reset editToggle after submitting
      })
      .catch(err => console.log(err))
  }

  function deleteBounty(_id) {
    axios.delete(`/api/bountyBoard/${_id}`)
      .then(res => {
        setBountyList(prev => prev.filter(bounty => bounty._id !== _id))
      })
      .catch(err => console.log(err))
  }

  function editBounty(update, _id) {
    axios.put(`/api/bountyBoard/${_id}`, update)
      .then(res => {
        setBountyList(prev => prev.map(bounty => bounty._id !== _id ? bounty : res.data))
      })
      .catch(err => console.log(err))
  }

  useEffect(getBounties, []);

  return (
    <>
      <h1 className='title'>Bane's bounty board</h1>
      {!editToggle ? (
        <button onClick={() => setEditToggle(true)} className="submit-bounty-button">
          Submit bounty?
        </button>
      ) : (
        <CreateBounties
          {...bountyList}
          submit={addBounty}
          btnTxt="Submit Bounty"
          setEditToggle={setEditToggle} // Pass the function to toggle editToggle to the child component
        />
      )}

      <div className="bountyList-container">
        {bountyList.map(bounty =>
          <div className='bountyList'><Bounties
            submit={addBounty}
            {...bounty}
            key={bounty._id}
            deleteBounty={deleteBounty}
            editBounty={editBounty} />
          </div>)}
      </div>
    </>
  );
}

export default App;
