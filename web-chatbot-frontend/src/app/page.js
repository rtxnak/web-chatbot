'use client'

import { redirect } from 'next/navigation';

export default function Home() {

    try {
        const user = localStorage.getItem('username');
        const token = localStorage.getItem('token');

        if (token && user) {
            return redirect('/chatbot')
        }
    } catch (err) {
        return redirect('/login')
    }
}