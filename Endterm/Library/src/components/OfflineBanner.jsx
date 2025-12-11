import React from 'react';

function OfflineBanner() {
  const [isOffline, setIsOffline] = React.useState(!navigator.onLine);

  React.useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!isOffline) return null;
  return (
    <div style={{background:'#ffcc00',color:'#222',padding:'10px',textAlign:'center',position:'fixed',top:0,left:0,right:0,zIndex:1000}}>
      <strong>Offline:</strong> You are currently offline. Some features may be unavailable.
    </div>
  );
}

export default OfflineBanner;
