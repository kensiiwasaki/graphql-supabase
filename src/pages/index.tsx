import { Session } from '@supabase/supabase-js'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { supabase } from '../constants'
import { LoginForm } from '../components/LoginFrom'
import { TodoList } from '../components/TodoList'
import { AppHeader } from '../components/AppHeader'

const Home: NextPage = () => {
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    const getInitialSession = async () => {
      const initialSession = (await supabase.auth.getSession())?.data.session
      setSession(initialSession)
    }

    getInitialSession()

    const authListener = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session)
      }
    )

    return () => {
      authListener.data.subscription.unsubscribe()
    }
  }, [])

  return (
    <div className="flex flex-col bg-black h-screen">
      <Head>
        <title>Supabase pg_graphql Example</title>
      </Head>

      <AppHeader isSignedIn={!!session} />

      <main className="text-white flex-grow max-w-4xl mx-auto min-h-0">
        {session ? <TodoList /> : <LoginForm />}
      </main>
    </div>
  )
}

export default Home
