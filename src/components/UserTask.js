import React, { useState, useEffect } from 'react';

function RestrictedContent() {
  const [user, setUsers] = useState(null);

  useEffect(() => {
    const getUsers = async () => {
        const response = await axios.get('http://localhost:5000/api/admin/api/users');
        setUsers(response.data);
      };
      getUsers();
    }, []);

  return (
    <div>
      {user && user.is_active
        ? <div>Restricted content</div>
        : <div>You do not have access to this content.</div>
      }
    </div>
  );
}

export default RestrictedContent;
