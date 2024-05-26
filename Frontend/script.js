document.addEventListener('DOMContentLoaded', () => {
    // Function to fetch all bins data
    const fetchAllBins = async () => {
      try {
        const response = await axios.get('http://localhost:3000/store');
        const bins = response.data;
  
        // Populate all bins table
        populateTable(bins, 'all-bins-table');
  
        // Filter and populate filled bins table
        const filledBins = bins.filter(bin => bin.status.toLowerCase() === 'filled');
        populateTable(filledBins, 'filled-bins-table');
  
        // Filter and populate overflowed bins table
        const overflowedBins = bins.filter(bin => bin.status.toLowerCase() === 'overflowed');
        populateTable(overflowedBins, 'overflowed-bins-table');
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    // Function to populate the table with data
    const populateTable = (bins, tableId) => {
      const tableBody = document.querySelector(`#${tableId} tbody`);
      tableBody.innerHTML = '';
  
      bins.forEach(bin => {
        const row = document.createElement('tr');
  
        const idCell = document.createElement('td');
        idCell.textContent = bin.id;
        row.appendChild(idCell);
  
        const statusCell = document.createElement('td');
        statusCell.textContent = bin.status;
        row.appendChild(statusCell);
  
        const locationCell = document.createElement('td');
        locationCell.textContent = bin.location;
        row.appendChild(locationCell);
  
        tableBody.appendChild(row);
      });
    };
  
    // Fetch and display all bins data when the page loads
    fetchAllBins();
  });
  