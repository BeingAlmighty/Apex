import * as React from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"

const SignUp1 = () => {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [agreeToTerms, setAgreeToTerms] = React.useState(false);
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();
  const { register } = useAuth();
 
  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhone = (phone) => {
    return /^[\d\s\-\+\(\)]+$/.test(phone) && phone.replace(/\D/g, '').length >= 10;
  };
 
  const handleSignUp = async () => {
    // Validation
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      setError("Please fill in all required fields.");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (phoneNumber && !validatePhone(phoneNumber)) {
      setError("Please enter a valid phone number.");
      return;
    }
    if (!agreeToTerms) {
      setError("Please agree to the terms and conditions.");
      return;
    }
    
    setError("");
    setLoading(true);

    try {
      // Combine first and last name
      const fullName = `${firstName} ${lastName}`;
      
      // Call register from AuthContext (will auto-login)
      await register(email, password, fullName);
      
      console.log("Registration successful!");
      
      // Redirect to Vector chatbot after successful registration
      navigate("/vector");
      
    } catch (err) {
      console.error("Registration error:", err);
      setError(err.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };
 
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-[#121212] relative overflow-hidden w-full ">
      {/* Centered glass card */}
      <div
        className="relative z-10 w-full max-w-md rounded-3xl bg-linear-to-r from-[#ffffff10] to-[#121212] backdrop-blur-sm  shadow-2xl p-8 flex flex-col items-center">
        {/* Logo */}
        <div
          className="flex items-center justify-center w-12 h-12 rounded-full bg-white/20 mb-6 shadow-lg">
          <img src="http://hextaui.com/logo.svg" />
        </div>
        {/* Title */}
        <h2 className="text-2xl font-semibold text-white mb-6 text-center">
          Create Your Account
        </h2>
        {/* Form */}
        <div className="flex flex-col w-full gap-4">
          <div className="w-full flex flex-col gap-3">
            {/* Name Fields */}
            <div className="flex gap-3">
              <input
                placeholder="First Name"
                type="text"
                value={firstName}
                className="w-full px-5 py-3 rounded-xl bg-white/10 text-white placeholder-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                placeholder="Last Name"
                type="text"
                value={lastName}
                className="w-full px-5 py-3 rounded-xl bg-white/10 text-white placeholder-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            {/* Email */}
            <input
              placeholder="Email Address"
              type="email"
              value={email}
              className="w-full px-5 py-3 rounded-xl bg-white/10 text-white placeholder-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
              onChange={(e) => setEmail(e.target.value)}
            />

            {/* Phone Number */}
            <input
              placeholder="Phone Number (Optional)"
              type="tel"
              value={phoneNumber}
              className="w-full px-5 py-3 rounded-xl bg-white/10 text-white placeholder-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
              onChange={(e) => setPhoneNumber(e.target.value)}
            />

            {/* Password */}
            <input
              placeholder="Password (min 8 characters)"
              type="password"
              value={password}
              className="w-full px-5 py-3 rounded-xl bg-white/10 text-white placeholder-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
              onChange={(e) => setPassword(e.target.value)}
            />

            {/* Confirm Password */}
            <input
              placeholder="Confirm Password"
              type="password"
              value={confirmPassword}
              className="w-full px-5 py-3 rounded-xl bg-white/10 text-white placeholder-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            {/* Terms and Conditions */}
            <label className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer">
              <input
                type="checkbox"
                checked={agreeToTerms}
                onChange={(e) => setAgreeToTerms(e.target.checked)}
                className="w-4 h-4 rounded accent-white/80"
              />
              <span>
                I agree to the{" "}
                <a href="#" className="underline text-white/80 hover:text-white">
                  Terms & Conditions
                </a>
              </span>
            </label>

            {error && (
              <div className="text-sm text-red-400 text-left">{error}</div>
            )}
          </div>
          <hr className="opacity-10" />
          <div>
            <button
              onClick={handleSignUp}
              disabled={loading}
              className="w-full bg-white/10 text-white font-medium px-5 py-3 rounded-full shadow hover:bg-white/20 transition mb-3 text-sm disabled:opacity-50 disabled:cursor-not-allowed">
              {loading ? "Creating account..." : "Sign Up"}
            </button>
            <button
              className="w-full flex items-center justify-center gap-2 bg-linear-to-b from-[#232526] to-[#2d2e30] rounded-full px-5 py-3 font-medium text-white shadow hover:brightness-110 transition mb-2 text-sm">
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="w-5 h-5" />
              Continue with Google
            </button>
            <div className="w-full text-center mt-2">
              <span className="text-xs text-gray-400">
                Already have an account?{" "}
                <a href="/signin" className="underline text-white/80 hover:text-white">
                  Sign in here
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { SignUp1 };