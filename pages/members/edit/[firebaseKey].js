import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleMember } from '../../../api/membersData';
import MemberForm from '../../../components/form/MemberForm';

export default function EditMember() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  // grab the firebasekey
  const { firebaseKey } = router.query;

  // make a call to the API to get the member data
  useEffect(() => {
    getSingleMember(firebaseKey).then(setEditItem);
  }, [firebaseKey]);

  // pass object to form
  return (<MemberForm obj={editItem} />);
}
