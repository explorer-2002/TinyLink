'use client';

import { useState } from 'react';
import { FaCheck, FaRegCopy } from 'react-icons/fa';

export default function CopyButton({ text, className = '' }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    return (
        <button
            onClick={handleCopy}
            className={`inline-flex items-center justify-center p-1 px-2 rounded bg-gray-50 cursor-pointer transition-colors ${className}`}
            title={copied ? 'Copied!' : 'Copy to clipboard'}
        >
            {copied ? (
                <FaCheck className="text-green-600" size={14} />
            ) : (
                <FaRegCopy className="text-gray-600" size={14} />
            )}
        </button>
    );
}