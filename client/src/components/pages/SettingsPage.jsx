import React, { useEffect , useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useProfileStore from "../../store/useProfileStore";
import Button from "../../components/ui/Button";
import FormInput from "../../components/ui/FormInput";
import {
  AlertTriangleIcon,
  CheckCircleIcon,
  CameraIcon,
} from "../../components/ui/Icons";
import { SkeletonForm } from "../../components/ui/Skeletons"; // SkeletonForm ko import karein

const ProfilePicture = ({ photoURL }) => {
  const { uploadProfilePicture, isUploadingPhoto } = useProfileStore();
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      uploadProfilePicture(file);
    }
  };

  return (
    <div className="relative w-32 h-32 mx-auto">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/png, image/jpeg"
        className="hidden"
      />
      <div className="relative w-full h-full group">
        <img
          src={photoURL}
          alt="Profile"
          className="w-full h-full rounded-full object-cover border-4 border-white dark:border-slate-800 shadow-lg"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "https://placehold.co/128x128/e0e7ff/4f46e5?text=User";
          }}
        />
        <button
          onClick={() => fileInputRef.current.click()}
          className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
          disabled={isUploadingPhoto}
        >
          <div className="text-center text-white">
            <CameraIcon className="h-6 w-6 mx-auto" />
            <span className="text-xs font-semibold">Change</span>
          </div>
        </button>

        {isUploadingPhoto && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/70 rounded-full">
            <div className="w-8 h-8 border-4 border-white border-t-indigo-500 rounded-full animate-spin"></div>
          </div>
        )}
      </div>
    </div>
  );
};

const ProfileForm = ({ profileData }) => {
  const { setProfileField, updateProfile, isUpdating, error, success } =
    useProfileStore();

  const handleChange = (e) => {
    setProfileField(e.target.name, e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 mt-8">
      <FormInput
        id="fullName"
        label="Full Name"
        type="text"
        value={profileData.fullName}
        onChange={handleChange}
      />
      <FormInput
        id="email"
        label="Email Address"
        type="email"
        value={profileData.email}
        onChange={handleChange}
      />
      <FormInput
        id="graduationYear"
        label="Graduation Year"
        type="number"
        value={profileData.graduationYear}
        onChange={handleChange}
      />

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
              <span>Profile updated successfully!</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex justify-end">
        <Button
          type="submit"
          className="w-48 flex justify-center"
          disabled={isUpdating}
        >
          {isUpdating ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
            />
          ) : (
            "Save Changes"
          )}
        </Button>
      </div>
    </form>
  );
};

const SettingsPage = () => {
  const { profile, loading, fetchProfile, resetStatus } = useProfileStore();

  useEffect(() => {
    fetchProfile();
    return () => resetStatus();
  }, [fetchProfile, resetStatus]);

  return (
    <AnimatePresence mode="wait">
      {loading || !profile ? (
        <motion.div key="skeleton">
          <SkeletonForm />
        </motion.div>
      ) : (
        <motion.div
          key="content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-2xl mx-auto">
            <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-lg">
              <div className="mb-8">
                <ProfilePicture photoURL={profile.photoURL} />
              </div>
              <h1 className="text-3xl font-bold text-slate-800 dark:text-white text-center">
                Profile Settings
              </h1>
              <p className="mt-2 text-gray-600 dark:text-gray-300 text-center">
                Update your personal information.
              </p>
              <ProfileForm profileData={profile} />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SettingsPage;
