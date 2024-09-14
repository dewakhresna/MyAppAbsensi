import React from 'react';
import { useParams } from 'react-router-dom';
import { AreaUserRegistrasi } from "../../components";

const UserEdit = () => {
    const { userId } = localStorage.getItem(id);

    return (
        <div className="content-area">
            <AreaUserRegistrasi isEditMode={true} usersID={userId} />
        </div>
    );
};

export default UserEdit;