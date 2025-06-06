import React, { useState } from "react";

// Main component
export default function GitHubProfileSearch() {
  // State to hold the username input
  const [username, setUsername] = useState("");

  // State to store fetched user data
  const [user, setUser] = useState(null);

  // Loading state indicator
  const [loading, setLoading] = useState(false);

  // Error message state
  const [error, setError] = useState(null);

  // Function to fetch user data from GitHub API
  const fetchUser = async () => {
    if (!username) return; // Do nothing if input is empty
    setLoading(true);       // Start loading
    setError(null);         // Clear previous errors
    setUser(null);          // Clear previous user data

    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      if (!response.ok) throw new Error("Nenhum perfil foi encontrado com esse nome de usuário. Tente novamente");
      const data = await response.json();
      setUser(data);       // Set user data in state
    } catch (err) {
      setError(err.message); // Show error message if fetch fails
    } finally {
      setLoading(false);     // Stop loading
    }
  };

return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4 relative overflow-hidden">

        {/* Background blur bubbles for visual effect */}
        <div className="absolute w-90 h-90 bg-blue-600 blur-3xl rounded-full top-[-100px] right-[-100px] opacity-50" />
        <div className="absolute w-96 h-96 bg-blue-700 blur-2xl rounded-full bottom-[-150px] left-[-150px] opacity-40" />

        {/* Page title with GitHub icon */}
        <div className="flex items-center mb-10 text-white gap-2">
            <img src="/media/github-icon.png" alt="Imagem GitHub"/>
            <h1 className="text-6xl">Perfil <span className="font-bold">GitHub</span></h1>
        </div>

        {/* Search input and button */}
        <div className="bg-white p-0.5 rounded-2xl shadow-md w-130">
            <div className="flex gap-2">
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Digite um usuário do GitHub"
                    className="flex-1 p-5 rounded-xl font-bold text-xl" />
                <button onClick={fetchUser} className="bg-blue-600 rounded-xl transition-all duration-300 hover:scale-102 hover:bg-blue-700 p-5">
                    <img src="/media/search-icon.png" alt="" />
                </button>
            </div>
        </div>

    {/* Conditional block to show loading, error, or user profile */}
    {(loading || error || user) && (
        <div className="bg-gray-200 rounded-3xl mt-8 p-7 max-w-250">
            {loading && <p className="text-blue-600 animate-pulse text-xl">Buscando usuário...</p>}
            {error && <p className="text-red-500 text-2xl">{error}</p>}

            {/* User profile display */}
            {user && (
                <div className="text-start flex">
                   <img src={user.avatar_url} alt="Avatar" className="w-60 h-60 rounded-full border-3 border-blue-600" />

                    <div className="p-13">
                        {/* Display name or fallback message */}
                        {user.name ? (
                            <h2 className="text-blue-600 text-xl font-bold">{user.name}</h2>
                        ) : (
                            <h2 className="text-red-500 text-xl font-bold">Usuário sem nome</h2>
                        )}

                        {/* Display bio or fallback message */}
                        {user.bio ? (
                            <p className="text-black-700 mt-4">{user.bio}</p>
                        ) : (
                            <p className="text-red-500 font-bold mt-4">Usuário sem bio</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    )}
    </div>
)
}