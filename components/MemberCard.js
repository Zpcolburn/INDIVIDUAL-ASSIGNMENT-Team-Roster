import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deleteMember } from '../api/membersData';

function MemberCard({ memberObj, onUpdate }) {
  // FOR DELETE, WE NEED TO REMOVE THE MEMBER AND HAVE THE VIEW RERENDER,
  // SO WE PASS THE FUNCTION FROM THE PARENT THAT GETS THE MEMBER
  const deleteThisMember = () => {
    if (window.confirm(`Delete ${memberObj.name}?`)) {
      deleteMember(memberObj.firebaseKey).then(() => onUpdate());
    }
  };
  return (
    <Card style={{ width: '16rem', margin: '10px' }}>
      <Card.Img variant="top" src={memberObj.image} alt={memberObj.name} style={{ height: '250px' }} />
      <Card.Body>
        <Card.Title>{memberObj.name} </Card.Title>
        <Card.Text>{memberObj.role}</Card.Text>
        {/* DYNAMIC LINK TO VIEW THE MEMBER DETAILS  */}
        <Link href={`/member/${memberObj.firebaseKey}`} passHref>
          <Button variant="primary" className="m-2">VIEW</Button>
        </Link>
        {/* DYNAMIC LINK TO EDIT THE MEMBER DETAILS  */}
        <Link href={`/member/edit/${memberObj.firebaseKey}`} passHref>
          <Button variant="info">EDIT</Button>
        </Link>
        <Button variant="danger" onClick={deleteThisMember} className="m-2">
          DELETE
        </Button>
      </Card.Body>
    </Card>
  );
}

MemberCard.propTypes = {
  memberObj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    image: PropTypes.string,
    name: PropTypes.string,
    role: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default MemberCard;
