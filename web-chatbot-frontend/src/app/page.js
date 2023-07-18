'use client'

import { redirect } from 'next/navigation';

export default function Home() {

    const user = localStorage.getItem('username');
    const token = localStorage.getItem('token');

    if (!token && !user) {
        return redirect('/login')
    } else if (token && user) {
        return redirect('/chatbot')
    }
}