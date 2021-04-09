import React from 'react'

export default function Pagination({ getPrevPage, getNextPage }) {
    return (
        <div>
            {getPrevPage && <button onClick={getPrevPage}>Previous</button>}
            {getNextPage && <button onClick={getNextPage}>Next</button>}
        </div>
    )
}
