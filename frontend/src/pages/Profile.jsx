useEffect(() => {
  const fetchProfile = async () => {
    try {
      const data = await getUserProfile(user)
      setProfile(data)
      setName(data.name)
      setEmail(data.email)
    } catch (err) {
      setError('Could not load profile. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  if (user) fetchProfile()
}, [])