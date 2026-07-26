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

  const getEventStyle = (type) => {
    switch (type) {
      case 'page_visit': return 'bg-blue-100 text-blue-700'
      case 'click': return 'bg-yellow-100 text-yellow-700'
      case 'form_submission': return 'bg-green-100 text-green-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getEventLabel = (type) => {
    switch (type) {
      case 'page_visit': return '🔍 Page Visit'
      case 'click': return '🖱️ Click'
      case 'form_submission': return '📝 Form Submit'
      default: return type
    }
  }

  if (loading) return (
    <div className="flex items-center justify-center py-20">
      <div className="w-10 h-10 border-4 border-brand border-t-transparent rounded-full animate-spin"></div>
    </div>
  )

  if (error) return (
    <div className="bg-red-100 text-red-600 rounded-lg px-4 py-3 text-sm">{error}</div>
  )

  if (!replay || !replay.events?.length) return (
    <div className="bg-white rounded-lg shadow p-6 text-gray-400 text-center">
      No events found for this session.
    </div>
  )

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-gray-800 font-semibold mb-2">Session Replay</h3>
      <p className="text-sm text-gray-500 mb-6">
        {replay.events.length} events recorded
      </p>

      <div className="flex flex-col gap-4">
        {replay.events.map((event, index) => (
          <div key={index} className="flex gap-4 items-start border-l-2 border-brand pl-4 pb-4">
            <span className="text-xs text-gray-400 w-24 shrink-0 pt-1">{event.timestamp}</span>
            <div className="flex flex-col gap-1">
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium w-fit ${getEventStyle(event.type)}`}>
                {getEventLabel(event.type)}
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