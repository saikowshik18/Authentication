export default function GoogleButton() {
    const handleGoogleLogin = () => {
      window.location.href =
        "http://localhost:5000/api/auth/google";
    };
  
    return (
      <button
        onClick={handleGoogleLogin}
        className="w-full bg-red-500 hover:bg-red-600 text-white p-3 rounded-lg"
      >
        Continue with Google
      </button>
    );
  }
  