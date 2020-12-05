import React from 'react';

const Pagination = ({postsPerpage, totalPosts, paginate}) => {
    const pageNumber = []

    for(let i = 1; i <= Math.ceil(totalPosts / postsPerpage); i++){
            pageNumber.push(i)  
    }

    return ( 
        <ul className="pagination">
            {pageNumber.map(number => (
                <li key={number} className={`page-item`}>
                    <button  className="page-link" onClick={() => paginate(number)}>{number}</button>
                </li>   
            ))}
        </ul>
     );
}
 
export default Pagination;