import { useEffect, useMemo, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import api from '../api/axios'

export default function UserProfilePanel() {
  const { user } = useAuth()

  const userKey = useMemo(() => user?.email ?? null, [user?.email])
  const [loading, setLoading] = useState(false)
  const [profile, setProfile] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    async function load() {
      if (!userKey) return
      setLoading(true)
      setError(null)
      try {
        const res = await api.get('/auth/me')
        if (cancelled) return
        setProfile(res.data)
      } catch (e) {
        if (cancelled) return
        setError(e?.response?.data?.error ?? 'Failed to load profile')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [userKey])

  if (!user) return null

  return 
    // <section className="gl-slice gl-profile-slice" id="profile">
    //   <div className="gl-inner gl-profile-inner">
    //     <h2 className="gl-h2-gl gl-h2-gl--center">Your Profile</h2>

    //     <div className="gl-profile-card">
    //       <div className="gl-profile-top">
    //         <img
    //           src={profile?.picture || user.picture}
    //           alt="user"
    //           className="gl-profile-dp"
    //           width={44}
    //           height={44}
    //         />
    //         <div>
    //           <div className="gl-profile-name">{profile?.name || user.name || 'User'}</div>
    //           <div className="gl-profile-email">{profile?.email || user.email}</div>
    //         </div>
    //       </div>

    //       <div className="gl-profile-cols">
    //         <div className="gl-profile-col">
    //           <div className="gl-profile-col__title">History</div>
    //           {loading ? (
    //             <div className="gl-profile-empty">Loading...</div>
    //           ) : error ? (
    //             <div className="gl-profile-empty">{error}</div>
    //           ) : profile?.history?.length ? (
    //             <ul className="gl-profile-list">
    //               {profile.history.slice(0, 6).map((h, idx) => (
    //                 <li key={`${h.createdAt}-${idx}`} className="gl-profile-list__item">
    //                   <span className="gl-profile-list__type">{h.type}</span>
    //                   <span className="gl-profile-list__date">
    //                     {h.createdAt ? new Date(h.createdAt).toLocaleString() : ''}
    //                   </span>
    //                 </li>
    //               ))}
    //             </ul>
    //           ) : (
    //             <div className="gl-profile-empty">No history yet.</div>
    //           )}
    //         </div>

    //         <div className="gl-profile-col">
    //           <div className="gl-profile-col__title">Subscription</div>
    //           {loading ? (
    //             <div className="gl-profile-empty">Loading...</div>
    //           ) : (
    //             <>
    //               <div className="gl-profile-row">
    //                 <span className="gl-profile-row__k">Plan</span>
    //                 <span className="gl-profile-row__v">{profile?.subscription?.plan || 'Free'}</span>
    //               </div>
    //               <div className="gl-profile-row">
    //                 <span className="gl-profile-row__k">Status</span>
    //                 <span className="gl-profile-row__v">
    //                   {profile?.subscription?.status || 'inactive'}
    //                 </span>
    //               </div>
    //               <div className="gl-profile-row">
    //                 <span className="gl-profile-row__k">Renews</span>
    //                 <span className="gl-profile-row__v">
    //                   {profile?.subscription?.currentPeriodEnd
    //                     ? new Date(profile.subscription.currentPeriodEnd).toLocaleDateString()
    //                     : '-'}
    //                 </span>
    //               </div>
    //             </>
    //           )}
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </section>
  
}

