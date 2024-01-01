import React, { useEffect, useState } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
import { FaTimes } from 'react-icons/fa';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { useGetOrdersQuery } from '../../slices/ordersApiSlice';
import { Bar } from 'react-chartjs-2';
const OrderListScreen = () => {
  const { data: orders, isLoading, error, refetch } = useGetOrdersQuery();
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    // Create chart data
    const prepareChartData = (orders) => {
      const statusCount = {
        totalOrders: orders.length,
        ordersPaid: orders.filter((order) => order.isPaid).length,
        ordersDelivered: orders.filter((order) => order.isDelivered).length,
      };

      setChartData({
        labels: Object.keys(statusCount),
        datasets: [
          {
            label: 'Order Statistics',
            data: Object.values(statusCount),
            backgroundColor: [
              'rgba(75, 192, 192, 0.6)',
              'rgba(255, 99, 132, 0.6)',
              'rgba(255, 205, 86, 0.6)',
            ],
            borderColor: [
              'rgba(75, 192, 192, 1)',
              'rgba(255, 99, 132, 1)',
              'rgba(255, 205, 86, 1)',
            ],
            borderWidth: 1,
          },
        ],
      });
    };

    if (orders) {
      prepareChartData(orders);
    }
  }, [orders]);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <Message variant='danger'>
        {error?.data?.message || error.error}
      </Message>
    );
  }

  const ordersArray = Array.isArray(orders) ? orders : [];

  return (
    <>
      <h1>Orders</h1>
      {chartData && (
        <div>
          <h2>Order Statistics</h2>
          <Bar data={chartData} />
        </div>
      )}

      <h2>Order List</h2>
      <Table striped bordered hover responsive className='table-sm'>
        <thead>
          <tr>
            <th>ID</th>
            <th>User</th>
            <th>Date</th>
            <th>Total</th>
            <th>Payment Amount</th>
            <th>Payment Status</th>
            <th>Delivery Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {ordersArray.map((order) => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.user && order.user.name}</td>
              <td>{order.createdAt && order.createdAt.substring(0, 10)}</td>
              <td>${order.totalPrice}</td>
              <td>
                {order.isPaid ? (
                  order.paidAt && order.paidAt.substring(0, 10)
                ) : (
                  <FaTimes style={{ color: 'red' }} />
                )}
              </td>
              <td>
                {order.isDelivered ? (
                  order.deliveredAt && order.deliveredAt.substring(0, 10)
                ) : (
                  <FaTimes style={{ color: 'red' }} />
                )}
              </td>
              <td>
                <LinkContainer to={`/order/${order._id}`}>
                  <Button variant='light' className='btn-sm'>
                    Details
                  </Button>
                </LinkContainer>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default OrderListScreen;
