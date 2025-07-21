import React from 'react';
import { motion } from 'framer-motion';
import { PageContent } from '../../components/ui/PageContent';
import  Button  from '../../components/ui/Button';

// --- Icons ---
const CalendarIcon = (props) => <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>;
const StarIcon = (props) => <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>;


const InterviewHistoryPage = () => {
    // Dummy data for demonstration
    const dummyHistory = [
        { id: 1, role: 'Frontend Developer', date: 'July 20, 2025', score: 8.5 },
        { id: 2, role: 'Backend Engineer', date: 'July 18, 2025', score: 7.9 },
        { id: 3, role: 'Fullstack Developer', date: 'July 15, 2025', score: 9.1 },
        { id: 4, role: 'UI/UX Designer', date: 'July 12, 2025', score: 8.2 },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 20 }
    };

    return (
        <PageContent title="Interview History">
            <p className="text-slate-600 dark:text-slate-400 mb-8">
                Review your past interview sessions, analyze your performance, and track your improvement over time.
            </p>
            
            <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-4"
            >
                {dummyHistory.map((item) => (
                    <motion.div 
                        key={item.id}
                        variants={itemVariants}
                        className="bg-white dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-between"
                    >
                        <div className="flex items-center gap-4">
                            <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-lg">
                                <CalendarIcon className="w-6 h-6 text-indigo-500" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-slate-800 dark:text-white">{item.role}</h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400">{item.date}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1 text-amber-500">
                                <StarIcon className="w-5 h-5" />
                                <span className="font-bold text-lg">{item.score}</span>
                            </div>
                            <Button variant="outline" className="text-sm !py-1 !px-3">View Report</Button>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </PageContent>
    );
};

export default InterviewHistoryPage;
