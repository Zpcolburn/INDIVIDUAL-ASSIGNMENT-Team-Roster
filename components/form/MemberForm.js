import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createMember, updateMember } from '../../api/membersData';

const initialState = {
  image: '',
  name: '',
  role: '',
};

function MemberForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (obj.firebaseKey) setFormInput(obj);
  }, [obj, user]);

  const handleChange = (e) => {
    console.warn(e.target);
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // If updating member that has a firebasekey, then pull in information fro user to change and push back to firebase. //
    if (obj.firebaseKey) {
      updateMember(formInput).then(() => router.push('/'));
      // If no firebaseKey give blank form for user to imput and when submitted will push new Member to firebase. //
    } else {
      const payload = { ...formInput, uid: user.uid };
      createMember(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateMember(patchPayload).then(() => {
          router.push('/');
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Member</h2>
      <FloatingLabel controlId="floatingInput1" label="Member Image" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter Image URL"
          name="image"
          value={formInput.image}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput2" label="Member Name" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter Member Name"
          name="name"
          value={formInput.name}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingSelect3" label="Member Role" className="mb-3">
        <Form.Select
          type="text"
          placeholder="Enter Member Role"
          name="role"
          value={formInput.role}
          onChange={handleChange}
          required
        >
          <option> Select a Role</option>
          <option value="Center">Center</option>
          <option value="Power Forward">Power Forward</option>
          <option value="Small Forward">Small Forward</option>
          <option value="Shooting Guard">Shooting Guard</option>
        </Form.Select>
      </FloatingLabel>

      {/* A WAY TO HANDLE UPDATES FOR TOGGLES, RADIOS, ETC  */}
      {/* <Form.Check
        className="text-white mb-3"
        type="switch"
        id="favorite"
        name="favorite"
        label="Favorite?"
        checked={formInput.sale}
        onChange={(e) => {
          setFormInput((prevState) => ({
            ...prevState,
            favortie: e.target.checked,
          }));
        }}
      /> */}

      {/* SUBMIT BUTTON  */}
      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Member</Button>
    </Form>
  );
}

MemberForm.propTypes = {
  obj: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    role: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

MemberForm.defaultProps = {
  obj: initialState,
};

export default MemberForm;
