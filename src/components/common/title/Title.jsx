import React from 'react'

export default function Title({ children, className = '' }) {
    return (
        <h2 className={`text-xl sm:text-xl font-medium text-center dark:text-agro-light mb-3 sm:mb-0 ${className}`}>
            {children}
        </h2>
    )
}
