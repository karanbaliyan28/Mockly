import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLoginStore } from '../../store/useLoginStore'; 
import  Button  from '../ui/Button';
import  FormInput  from '../ui/FormInput';
import { AlertTriangleIcon, CheckCircleIcon } from '../ui/Icons'; // Maan lijiye Icons.jsx exist karti hai

const LoginForm = () => {
    const { userInput, setLoginInput, loginUser, loading, error, success } = useLoginStore();

    const handleChange = (e) => {
        setLoginInput(e.target.name, e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        loginUser();
    };

    return (
        <div className="w-full max-w-md">
            <motion.div 
                className="bg-white dark:bg-slate-900/80 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
            >
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Welcome Back!</h2>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Sign in to continue to Mockly</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <FormInput id="email" label="Email Address" type="email" value={userInput.email} onChange={handleChange} />
                    <FormInput id="password" label="Password" type="password" value={userInput.password} onChange={handleChange} />

                    <div className="h-12 pt-2">
                        <AnimatePresence>
                            {error && (
                                <motion.div
                                    className="flex items-center gap-2 text-sm text-red-500 bg-red-500/10 p-2 rounded-md"
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                >
                                    <AlertTriangleIcon className="h-4 w-4" />
                                    <span>{error}</span>
                                </motion.div>
                            )}
                            {success && (
                                <motion.div
                                    className="flex items-center gap-2 text-sm text-green-500 bg-green-500/10 p-2 rounded-md"
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                >
                                    <CheckCircleIcon className="h-4 w-4" />
                                    <span>Login Successful! Redirecting...</span>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <div>
                        <Button type="submit" className="w-full flex justify-center" disabled={loading || success}>
                            {loading ? (
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                                />
                            ) : success ? (
                                <CheckCircleIcon className="h-6 w-6" />
                            ) : (
                                "Sign In"
                            )}
                        </Button>
                    </div>
                </form>
                 <div className="text-center mt-4 text-sm">
                    <p className="text-slate-600 dark:text-slate-400">
                        Don't have an account?{' '}
                        <Link to="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
                            Sign up
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default LoginForm;