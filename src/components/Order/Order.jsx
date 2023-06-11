import React, { useState } from 'react';

const Order = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const items = 
    Array.from({ length: 25 }, (_, index) => `Item ${index + 1}`);
  
    // Calculate pagination information
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(items.length / itemsPerPage);
  
    // Handle page change
    const handlePageChange = (pageNumber) => {
      setCurrentPage(pageNumber);
    };


 
    return (
        <div>
          <table>
            <thead>
              <tr>
                <th>Item</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item, index) => (
                <tr key={index}>
                  <td>{item}</td>
                </tr>
              ))}
            </tbody>
          </table>
    
          <div>
            {/* Render pagination buttons */}
            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (pageNumber) => (
                <button
                  key={pageNumber}
                  onClick={() => handlePageChange(pageNumber)}
                >
                  {pageNumber}
                </button>
              )
            )}
          </div>
        </div>
      )
}

export default Order