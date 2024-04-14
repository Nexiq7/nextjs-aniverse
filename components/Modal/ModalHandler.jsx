import React, { useState } from 'react'
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';

const ModalHandler = ({ setIsModalOpen, setIsUserLoggedIn }) => {

    const [modalTypeRegister, setModalTypeRegister] = useState(true);

    return (
        <div>
            {modalTypeRegister ? (
                <RegisterModal setIsModalOpen={setIsModalOpen} setModalTypeRegister={setModalTypeRegister} />
            ) : (
                <LoginModal setIsModalOpen={setIsModalOpen} setModalTypeRegister={setModalTypeRegister} setIsUserLoggedIn={setIsUserLoggedIn} />
            )}
        </div>
    )
}

export default ModalHandler