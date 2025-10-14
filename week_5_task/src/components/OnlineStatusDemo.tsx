import { useOnlineStatus } from '../hooks/useCustomHooks'

/**
 * Online Status Demo - Demonstrates custom hook (useOnlineStatus)
 * Monitors browser's online/offline status
 */
function OnlineStatusDemo() {
  const isOnline = useOnlineStatus()

  return (
    <div className="demo-card">
      <h2>🌐 Custom Hook: Online Status</h2>
      <p>Monitor network connectivity in real-time</p>

      <div style={{ textAlign: 'center', margin: '2rem 0' }}>
        <div className={`online-status ${isOnline ? 'online' : 'offline'}`}>
          {isOnline ? '✅ Online' : '❌ Offline'}
        </div>
      </div>

      <div style={{ fontSize: '0.85rem', color: '#666' }}>
        <p>
          <strong>Custom Hook Used:</strong> <code>useOnlineStatus()</code>
        </p>
        <p>
          This hook listens to the browser's online and offline events. Try
          disconnecting your internet to see it in action!
        </p>
        <p style={{ marginTop: '0.5rem', fontStyle: 'italic' }}>
          💡 Tip: Open DevTools → Network tab → Go offline to test
        </p>
      </div>
    </div>
  )
}

export default OnlineStatusDemo
