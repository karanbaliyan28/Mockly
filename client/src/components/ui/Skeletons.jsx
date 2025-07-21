import React from 'react';
import { motion } from 'framer-motion';

// Base Skeleton component with the shimmer animation
const Skeleton = ({ className }) => (
    <div className={`bg-slate-200 dark:bg-slate-800 animate-pulse rounded-md ${className}`} />
);

// Skeleton loader that mimics a dashboard card
export const SkeletonCard = () => (
    <div className="w-full bg-white dark:bg-slate-900 p-6 md:p-8 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-800">
        <Skeleton className="h-8 w-1/2 mb-6" />
        <div className="space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-3/4" />
        </div>
    </div>
);

// Skeleton loader that mimics the Profile Settings form
export const SkeletonForm = () => (
    <div className="max-w-2xl mx-auto">
        <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-lg">
            {/* Profile Picture Skeleton */}
            <div className="mb-8 flex justify-center">
                <Skeleton className="w-32 h-32 rounded-full" />
            </div>
            {/* Heading Skeleton */}
            <div className="flex flex-col items-center gap-2">
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-4 w-64" />
            </div>
            {/* Form Fields Skeleton */}
            <div className="space-y-8 mt-8">
                <div className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-10 w-full" />
                </div>
                <div className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-10 w-full" />
                </div>
                <div className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-10 w-full" />
                </div>
            </div>
            {/* Button Skeleton */}
            <div className="flex justify-end mt-8">
                <Skeleton className="h-12 w-48" />
            </div>
        </div>
    </div>
);