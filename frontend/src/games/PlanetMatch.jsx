import { useNavigate } from "react-router-dom";

export default function SpaceCollectEmbed({ onClose }) {
  const navigate = useNavigate();

  const handleClose = () => {
    if (typeof onClose === "function") {
      onClose();
      return;
    }
    // fallback: navigate back if router is available, otherwise use history
    try {
      navigate(-1);
    } catch {
      window.history.back();
    }
  };

  return (
    <div className="flex flex-col items-center p-6 bg-black text-white min-h-screen relative">
      {/* Close button (red, top-right) */}
      <button
        onClick={handleClose}
        aria-label="Close"
        className="absolute top-4 right-4 z-50 bg-red-600 hover:bg-red-700 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg"
      >
        ✖
      </button>

      <h1 className="text-3xl font-bold mb-4">🚀 Space Collect 2</h1>
      <p className="mb-4">Play the game below!</p>

      <iframe
        src="https://gd.games/cbdragongames/space-collect-2"
        title="Space Collect 2"
        width="960"
        height="600"
        allowFullScreen
        frameBorder="0"
        className="rounded-2xl shadow-lg border-2 border-indigo-500"
      ></iframe>

      <p className="text-sm mt-4 opacity-75">
        Powered by{" "}
        <a
          href="https://gd.games"
          target="_blank"
          rel="noopener noreferrer"
          className="underline text-indigo-400"
        >
          GDevelop
        </a>
      </p>
    </div>
  );
}
