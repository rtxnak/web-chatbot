'use client'

import { redirect } from 'next/navigation';
import { useThisContext } from '../context/context';


export default async function Home({ params }) {
    const { user, loading } = useThisContext()
    if (!loading && !user) {
        return redirect('/login')
    } else if (!loading && user) {
        return redirect('/chatbot')
    }
}