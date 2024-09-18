import React from 'react';
import { useParams } from 'react-router-dom';
import { AreaUserEdit } from "../../components";

const UserEdit = () => {
     const { userId } = useParams();

    return (
        <div className="content-area">
            <AreaUserEdit isEditMode={true} usersID={userId} />
        </div>
    );
};

export default UserEdit;