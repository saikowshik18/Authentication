export default function AuthLayout({ children, title }) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600">
        <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md">
          <h2 className="text-2xl font-bold text-center mb-6">{title}</h2>
          {children}
        </div>
      </div>
    );
  }
  