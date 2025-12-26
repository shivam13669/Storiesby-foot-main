import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Mail, User, MapPin, Phone, LogOut, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Account = () => {
  const navigate = useNavigate();
  const { user, userDoc, loading, logout } = useAuth();

  // Redirect to home if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      navigate("/");
    }
  }, [user, loading, navigate]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
        <Navigation />
        <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
          <div className="flex flex-col items-center gap-3">
            <Loader className="h-8 w-8 animate-spin text-orange-500" />
            <p className="text-white/60 font-medium">Loading your profile...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      <Navigation />
      
      <main className="pt-20 pb-16">
        <div className="mx-auto w-full max-w-4xl px-4 sm:px-6">
          {/* Header with Back Button */}
          <div className="flex items-center gap-3 mb-8">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="text-sm font-medium">Back to Home</span>
            </button>
          </div>

          {/* Profile Section */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
            {/* Profile Header */}
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-6 sm:px-8 py-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-orange-600 font-bold text-2xl">
                  {user.displayName ? user.displayName.charAt(0).toUpperCase() : user.email?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">
                    {user.displayName || "Welcome!"}
                  </h1>
                  <p className="text-white/80 text-sm">{user.email}</p>
                </div>
              </div>
            </div>

            {/* Profile Details */}
            <div className="px-6 sm:px-8 py-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Profile Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Name */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-gray-600 mb-2">
                    <User className="h-4 w-4" />
                    <span className="text-sm font-medium">Full Name</span>
                  </div>
                  <p className="text-lg font-semibold text-gray-900">
                    {user.displayName || "Not set"}
                  </p>
                </div>

                {/* Email */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-gray-600 mb-2">
                    <Mail className="h-4 w-4" />
                    <span className="text-sm font-medium">Email</span>
                  </div>
                  <p className="text-lg font-semibold text-gray-900 break-all">
                    {user.email}
                  </p>
                </div>

                {/* Phone (if available from Firestore) */}
                {userDoc?.mobileNumber && (
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-gray-600 mb-2">
                      <Phone className="h-4 w-4" />
                      <span className="text-sm font-medium">Mobile Number</span>
                    </div>
                    <p className="text-lg font-semibold text-gray-900">
                      {userDoc.mobileNumber}
                    </p>
                  </div>
                )}

                {/* Country (if available from Firestore) */}
                {userDoc?.country && (
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-gray-600 mb-2">
                      <MapPin className="h-4 w-4" />
                      <span className="text-sm font-medium">Country</span>
                    </div>
                    <p className="text-lg font-semibold text-gray-900">
                      {userDoc.country}
                    </p>
                  </div>
                )}
              </div>

              {/* Account Created */}
              <div className="bg-gray-50 rounded-lg p-4 mb-8">
                <p className="text-sm text-gray-600">Account created on</p>
                <p className="text-lg font-semibold text-gray-900">
                  {user.metadata?.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }) : "Unknown"}
                </p>
              </div>

              {/* Logout Button */}
              <div className="flex gap-3">
                <Button
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 h-auto flex items-center gap-2 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              </div>
            </div>
          </div>

          {/* Bookings Section */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="px-6 sm:px-8 py-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Your Bookings</h2>
              
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-gray-100 mb-4">
                  <MapPin className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No bookings yet</h3>
                <p className="text-gray-600 mb-6">
                  Start exploring amazing destinations and create your first booking!
                </p>
                <Button
                  onClick={() => navigate("/destinations")}
                  className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2 h-auto"
                >
                  Explore Destinations
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Account;
