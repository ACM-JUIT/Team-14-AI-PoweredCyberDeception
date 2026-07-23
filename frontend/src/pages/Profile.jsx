import { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import DashboardNavbar from '../components/DashboardNavbar'
import { getUserProfile, updateUserProfile } from '../services/api'

function Profile() {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [updateError, setUpdateError] = useState('')
  const [updateSuccess, setUpdateSuccess] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getUserProfile('user@example.com')
        setProfile(data)
        setName(data.name)
        setEmail(data.email)
      } catch (err) {
        setError('Could not load profile. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [])

  const handleSave = async (e) => {
    e.preventDefault()
    setUpdateError('')
    setUpdateSuccess('')
    setSaving(true)

    try {
      await updateUserProfile(profile.email, name, email)
      setUpdateSuccess('Profile updated successfully!')
      setProfile({ ...profile, name, email })
      setIsEditing(false)
    } catch (err) {
      setUpdateError('Could not update profile. Please try again later.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <DashboardNavbar />
        <main className="p-4 sm:p-6 bg-gray-50 flex-1">
          <h2 className="text-xl font-bold text-gray-800 mb-4">My Profile</h2>

          {loading && (
            <div className="flex items-center justify-center py-20">
              <div className="w-10 h-10 border-4 border-brand border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}

          {error && (
            <div className="bg-red-100 text-red-600 rounded-lg px-4 py-3">
              {error}
            </div>
          )}

          {!loading && !error && profile && (
            <div className="bg-white rounded-lg shadow p-6 max-w-md">
              {updateSuccess && (
                <div className="bg-green-100 text-green-700 text-sm rounded-lg px-4 py-2 mb-4">
                  {updateSuccess}
                </div>
              )}
              {updateError && (
                <div className="bg-red-100 text-red-700 text-sm rounded-lg px-4 py-2 mb-4">
                  {updateError}
                </div>
              )}

              {!isEditing ? (
                <div className="flex flex-col gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Full Name</p>
                    <p className="text-gray-800 font-medium">{profile.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="text-gray-800 font-medium">{profile.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Account Number</p>
                    <p className="text-gray-800 font-medium">{profile.account_number}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Balance</p>
                    <p className="text-gray-800 font-medium">
                      ₹{profile.balance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="bg-brand text-white py-2 rounded-lg hover:opacity-90 transition mt-2"
                  >
                    Edit Profile
                  </button>
                </div>
              ) : (
                <form className="flex flex-col gap-4" onSubmit={handleSave}>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand"
                    />
                  </div>

                  <div className="flex gap-3 mt-2">
                    <button
                      type="submit"
                      disabled={saving}
                      className="flex-1 bg-brand text-white py-2 rounded-lg hover:opacity-90 transition disabled:opacity-50"
                    >
                      {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default Profile