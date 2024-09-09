import React from 'react';
import { useParams } from 'react-router-dom';
import { AreaUserRegistrasi } from "../../components";

const KaryawanEdit = () => {
    const { userId } = useParams(); // Ambil userId dari URL params

    return (
        <div className="content-area">
            <AreaUserRegistrasi isEditMode={true} userId={userId} />
        </div>
    );
};

export default KaryawanEdit;
