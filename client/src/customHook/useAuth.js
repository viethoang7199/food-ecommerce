import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react'
import { auth } from '../firebase';

const useAuth = () => {
    const [currentUser, setCurrenUser] = useState({});

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setCurrenUser(user)
            } else {
                setCurrenUser(null)
            }
        })
    })

    return {
        currentUser,
    }
}

export default useAuth