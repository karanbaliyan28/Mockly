import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../auth/LoginForm';
import {useLoginStore} from '../../store/useLoginStore';
import  Button  from '../ui/Button';
export default function LoginPage() {
    const resetForm = useLoginStore(state => state.resetForm);
    useEffect(() => {
        // Form state ko reset karein jab page load ho
        resetForm();
        return () => resetForm();
    }, [resetForm]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-950 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] py-12 px-4 sm:px-6 lg:px-8">
            <div className="absolute top-4 left-4">
                <Link to="/">
                    <Button variant="outline">Back to Home</Button>
                </Link>
            </div>
            <LoginForm />
        </div>
    );
};
