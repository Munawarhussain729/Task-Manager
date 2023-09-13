import Spinner from '@/components/Spinner'
import React from 'react'

function loading() {
    return (
        <div>
            <div className='bg-slate-700 h-[90vh] rounded-lg'>

                <Spinner />

            </div>
        </div>
    )
}

export default loading
