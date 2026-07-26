import { useState, useEffect } from 'react'
import { getDecoyReplay } from '../services/api'

function ReplayViewer({ sessionId }) {
  const [replay, setReplay] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchReplay = async () => {
      try {
        const data = await getDecoyReplay(sessionId)
        setReplay(data)
      } catch (err) {
        setError('Could not load replay data.')
      } finally {
        setLoading(false)
      }
    }

    if (sessionId) fetchReplay()
  }, [sessionId])

  if (loading) return (
    <div className="flex items-center justify-center py-10">
      <div className="w-8 h-8 border-4 border-brand border-t-transparent rounded-full animate-spin"></div>
    </div>
  )

  if (error) return (
    <div className="bg-red-100 text-red-600 rounded-lg px-4 py-3 text-sm">{error}</div>
  )

  if (!replay) return null

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-gray-800 font-semibold mb-4">Session Replay</h3>
      <div className="flex flex-col gap-3">
        {replay.events?.map((event, index) => (
          <div key={index} className="flex gap-4 items-start border-l-2 border-brand pl-4">
            <span className="text-xs text-gray-400 w-20 shrink-0">{event.timestamp}</span>
            <div>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium mr-2 ${
                event.type === 'page_visit' ? 'bg-blue-100 text-blue-700' :
                event.type === 'click' ? 'bg-yellow-100 text-yellow-700' :
                'bg-green-100 text-green-700'
              }`}>
                {event.type}
              </span>
              <span className="text-sm text-gray-700">{event.detail}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ReplayViewer