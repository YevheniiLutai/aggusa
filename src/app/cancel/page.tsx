'use client';

import { useRouter } from 'next/navigation';
import FallingLeaves from '../components/FallingLeaves';

export default function FailurePage() {
    return (
        <div className="cancel mx-auto">
            <FallingLeaves />
            <h1 className="cancel_title">Payment Failed ❌</h1>
            <p className="cancel_subtitle">Something went wrong. Please try again</p>
            <img src="/tired.png" alt="Payment Failed" />
            <button className="cancel_button" onClick={() => window.location.href = 'http://localhost:3000'}>
                Return Back
            </button>
        </div>
    );
  }
  