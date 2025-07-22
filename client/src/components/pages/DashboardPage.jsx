import { motion, AnimatePresence } from "framer-motion";
import { Camera, X, User, Mail, Calendar, Upload } from "lucide-react";

import useAuthStore from "../../store/useAuthStore";
import useDashboardStore from "../../store/useDashboardStore";
import useProfileStore from "../../store/useProfileStore";

import { Icons } from "../../components/ui/Icons";
import Button from "../../components/ui/Button";
import FormInput from "../../components/ui/FormInput"; // Assuming this exists for the modal
import { PageContent } from "../../components/ui/PageContent";
import { SkeletonCard } from "../../components/ui/Skeletons";

import ResumeUploaderPage from "./ResumeUploaderPage";
import InterviewPage from "./InterviewPage";
import SavedFeedbackPage from "./SavedFeedbackPage";
import StatsPage from "./StatsPage";
import InterviewHistoryPage from "./InterviewHistoryPage";

const pages = {
  Dashboard: () => <DashboardContent />,
  "Interview History": () => <InterviewHistoryPage />,
  "Saved Feedback": () => <SavedFeedbackPage />,
  "Resume Uploader": () => <ResumeUploaderPage />,
  "Start Interview": () => <InterviewPage />,
  Stats: () => <StatsPage />,
};

export default function DashboardPage() {
  const { activePage } = useDashboardStore();
  const CurrentPage = pages[activePage] || (() => <div>Page Not Found</div>);

  return (
    <div className="min-h-screen w-full flex bg-slate-100 dark:bg-slate-950">
      <div className="flex flex-start w-full flex-col">
        <main className="flex-start p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePage}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <CurrentPage />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

const DashboardContent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    profile,
    loading,
    error,
    fetchProfile,
    setProfileField,
    updateProfile,
    uploadProfilePicture,
  } = useProfileStore();
  const { user } = useAuthStore();

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const displayUser = profile || user;

  if (loading && !profile) {
    return <div>Loading Dashboard...</div>;
  }
  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }
  if (!displayUser) {
    return <div>Could not load user profile.</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
          Welcome back, {displayUser.fullName}!
        </h1>
        <Button
          onClick={() => setIsModalOpen(true)}
          variant="outline"
          className="flex items-center gap-2"
        >
          <Icons.Settings className="w-4 h-4" /> Edit Profile
        </Button>
      </div>
      <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 flex flex-col items-center text-center">
          {user.photoURL ? (
            <img
              src={`http://localhost:5000/${
                user.photoURL
              }?key=${new Date().getTime()}`}
              alt="Avatar"
              className="w-32 h-32 rounded-full object-cover mb-4"
            />
          ) : (
            <Icons.UserCircle className="w-32 h-32 text-slate-400 mb-4" />
          )}
          <h2 className="text-xl font-bold text-slate-800 dark:text-white">
            {displayUser.fullName}
          </h2>
          <p className="text-slate-500 dark:text-slate-400">
            {displayUser.email}
          </p>
        </div>
        <div className="md:col-span-2 bg-slate-50 dark:bg-slate-900/50 p-6 rounded-lg">
          <h3 className="font-semibold mb-4 text-slate-700 dark:text-white">
            Profile Details
          </h3>
          <ul className="space-y-2 text-slate-700 dark:text-slate-300">
            <li>
              <strong>Graduation Year:</strong> {displayUser.graduationYear}
            </li>
            <li>
              <strong>Member Since:</strong>{" "}
              {new Date(displayUser.createdAt).toLocaleDateString()}
            </li>
          </ul>
        </div>
      </div>
      <AnimatePresence>
        {isModalOpen && (
          <ProfileEditModal
            profile={profile}
            setProfileField={setProfileField}
            updateProfile={updateProfile}
            uploadProfilePicture={uploadProfilePicture}
            closeModal={() => setIsModalOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};


const ProfileEditModal = ({
  profile,
  setProfileField,
  updateProfile,
  uploadProfilePicture,
  closeModal,
  isOpen = true,
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuthStore();
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      uploadProfilePicture(e.target.files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      uploadProfilePicture(e.dataTransfer.files[0]);
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await updateProfile();
      closeModal();
    } finally {
      setIsLoading(false);
    }
  };

  // Mock data for demonstration
  const mockProfile = profile || {
    fullName: "John Doe",
    email: "john@example.com",
    graduationYear: "2024",
    photoURL: null,
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={closeModal}
          />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 10 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden"
          >
            {/* Header */}
            <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={closeModal}
                className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
              >
                <X size={20} />
              </motion.button>
              <motion.h2
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-xl font-bold text-white"
              >
                Edit Profile
              </motion.h2>
            </div>

            <div className="p-6">
              {/* Profile Picture Section */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mb-8"
              >
                <div className="flex flex-col items-center">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className={`relative group cursor-pointer ${
                      isDragOver ? "scale-105" : ""
                    } transition-transform duration-200`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                  >
                    <div className="relative w-24 h-24 rounded-full overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 border-4 border-white dark:border-gray-600 shadow-lg">
                      {user.photoURL ? (
                        <img
                          src={`http://localhost:5000/${
                            user.photoURL
                          }?key=${new Date().getTime()}`}
                          alt="Avatar"
                          className="w-32 h-32 rounded-full object-cover"
                        />
                      ) : (
                        <Icons.UserCircle className="w-32 h-32 text-slate-400 mb-4" />
                      )}

                      {/* Overlay */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center"
                      >
                        <Camera size={20} className="text-white" />
                      </motion.div>
                    </div>

                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                  </motion.div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-3 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-sm font-medium rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-all duration-200 flex items-center gap-2"
                  >
                    <Upload size={16} />
                    Change Photo
                  </motion.button>
                </div>
              </motion.div>

              {/* Form Fields */}
              <div className="space-y-6">
                {/* Full Name */}
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    <User size={16} className="inline mr-2" />
                    Full Name
                  </label>
                  <motion.input
                    whileFocus={{ scale: 1.02 }}
                    type="text"
                    value={mockProfile?.fullName || ""}
                    onChange={(e) =>
                      setProfileField &&
                      setProfileField("fullName", e.target.value)
                    }
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                    placeholder="Enter your full name"
                  />
                </motion.div>

                {/* Email */}
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    <Mail size={16} className="inline mr-2" />
                    Email Address
                  </label>
                  <motion.input
                    whileFocus={{ scale: 1.02 }}
                    type="email"
                    value={mockProfile?.email || ""}
                    onChange={(e) =>
                      setProfileField &&
                      setProfileField("email", e.target.value)
                    }
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                    placeholder="Enter your email"
                  />
                </motion.div>

                {/* Graduation Year */}
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    <Calendar size={16} className="inline mr-2" />
                    Graduation Year
                  </label>
                  <motion.input
                    whileFocus={{ scale: 1.02 }}
                    type="text"
                    value={mockProfile?.graduationYear || ""}
                    onChange={(e) =>
                      setProfileField &&
                      setProfileField("graduationYear", e.target.value)
                    }
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                    placeholder="e.g., 2024"
                  />
                </motion.div>
              </div>

              {/* Action Buttons */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex gap-3 mt-8"
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={closeModal}
                  className="flex-1 px-6 py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  Cancel
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSave}
                  disabled={isLoading}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-xl hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  <motion.span
                    animate={isLoading ? { opacity: 0.7 } : { opacity: 1 }}
                    className="flex items-center justify-center gap-2"
                  >
                    {isLoading && (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                      />
                    )}
                    {isLoading ? "Saving..." : "Save Changes"}
                  </motion.span>
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
