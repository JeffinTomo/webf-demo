export default function InviteFriends() {
  const handleInvite = async () => {
    // Call Flutter system module to share app link + current user code
    // This is a placeholder - in WebF, you would use the native bridge
    if (window.webf && window.webf.invokeNative) {
      try {
        const userCode = 'USER123'; // This should come from user context
        const appLink = `https://app.example.com/invite?code=${userCode}`;
        await window.webf.invokeNative('share', {
          text: `Join me on this app! Use my code: ${userCode}`,
          url: appLink,
        });
      } catch (error) {
        console.error('Failed to share:', error);
        // Fallback: copy to clipboard
        const userCode = 'USER123';
        const appLink = `https://app.example.com/invite?code=${userCode}`;
        navigator.clipboard.writeText(appLink);
        alert('Link copied to clipboard!');
      }
    } else {
      // Fallback for web
      const userCode = 'USER123';
      const appLink = `https://app.example.com/invite?code=${userCode}`;
      navigator.clipboard.writeText(appLink);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="px-4 py-6 bg-white border-b border-gray-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-red-500 rounded-full flex items-center justify-center mr-4">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
          </div>
          <div>
            <div className="font-semibold text-gray-900">Invite Friends</div>
            <div className="text-sm text-gray-500 mt-1">
              Share and earn points together
            </div>
          </div>
        </div>
        <button
          onClick={handleInvite}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors"
        >
          Invite
        </button>
      </div>
    </div>
  );
}

// Extend window type for WebF
declare global {
  interface Window {
    webf?: {
      invokeNative?: (method: string, params?: any) => Promise<any>;
    };
  }
}

