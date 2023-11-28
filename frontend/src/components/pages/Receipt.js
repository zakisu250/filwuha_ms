export default function Receipt() {
  return (
    <div className="receipt">
      <div>
        <h1>Receipt</h1>
        <p>This is a receipt for your order.</p>
        <table className="receipt">
          <tbody>
            <tr>
              <th>First Name</th>
              <td>John</td>
            </tr>
            <tr>
              <th>Last Name</th>
              <td>Doe</td>
            </tr>
            <tr>
              <th>Phone</th>
              <td>123-456-7890</td>
            </tr>
            <tr>
              <th>Email</th>
              <td></td>
            </tr>
            <tr>
              <th>Service</th>
              <td>Bathing</td>
            </tr>
            <tr>
              <th>Date</th>
              <td>2021-08-01</td>
            </tr>
            <tr>
              <th>Time</th>
              <td>10:00</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
