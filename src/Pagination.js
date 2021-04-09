import React from 'react'

export default function Pagination({ getPrevPage, getNextPage }) {
    return (
        <div>
            <button onClick={getPrevPage}>Previous</button>
            <button onClick={getNextPage}>Next</button>
        </div>
    )
}
