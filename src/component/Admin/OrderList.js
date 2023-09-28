import React, { Fragment, useEffect } from "react";
import './ProductList.css'
import { useSelector, useDispatch } from "react-redux";
import { DataGrid } from '@mui/x-data-grid';
import {Link} from 'react-router-dom'
import {Button} from '@mui/material'
import Sidebar from './Sidebar'
import MetaData from '../layouts/MetaData'
import { useAlert } from "react-alert"; 
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import {
  deleteOrder,
  getAllOrders,
  clearErrors,
} from '../../actions/orderAction'
import { useNavigate } from 'react-router-dom'
import {DELETE_ORDER_RESET} from '../../consants/orderConsants'

function OrderList() {
    const dispatch = useDispatch();
    const alert = useAlert();
    const history = useNavigate(); 
    const { error, orders } = useSelector((state) => state.allOrders);
    const { error: deleteError, isDeleted } = useSelector((state) => state.order);


    const deleteOrderHandler = (id) => {
      dispatch(deleteOrder(id));
    };

    useEffect(()=> {
      if (error) {
        alert.error(error);
        dispatch(clearErrors());
      }
  
      if (deleteError) {
        alert.error(deleteError);
        dispatch(clearErrors());
      }

      if (isDeleted) {
        alert.success("Order Deleted Successfully");
        history("/admin/orders");
        dispatch({ type: DELETE_ORDER_RESET });
      }

      dispatch(getAllOrders());
  
    }, [dispatch, alert, error, deleteError, history, isDeleted]);

    const columns = [
      { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },
  
      {
        field: "status",
        headerName: "Status",
        minWidth: 150,
        flex: 0.5,
        cellClassName: (params) => {
          return params.getValue(params.id, "status") === "Delivered"
            ? "greenColor"
            : "redColor";
        },
      },
      {
        field: "itemsQty",
        headerName: "Items Qty",
        type: "number",
        minWidth: 150,
        flex: 0.4,
      },
  
      {
        field: "amount",
        headerName: "Amount",
        type: "number",
        minWidth: 270,
        flex: 0.5,
      },
  
      {
        field: "actions",
        flex: 0.3,
        headerName: "Actions",
        minWidth: 150,
        type: "number",
        sortable: false,
        renderCell: (params) => {
          return (
            <Fragment>
              <Link to={`/admin/order/${params.getValue(params.id, "id")}`}>
                <EditIcon />
              </Link>
  
              <Button
                onClick={() =>
                  deleteOrderHandler(params.getValue(params.id, "id"))
                }
              >
                <DeleteIcon />
              </Button>
            </Fragment>
          );
        },
      },
    ];

    const rows = [];

    orders && orders.forEach((item) => {
      rows.push({
        id: item._id,
        itemQty: item.orderItems.length,
        amount: item.totalPrice,
        status: item.orderStatus,
      });
    });

  return (
    <Fragment>
      <MetaData title={`ALL ORDERS - Admin`} />

      <div className="dashboard">
        <Sidebar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL ORDERS</h1>

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />
        </div>
      </div>
    </Fragment>
  )
}

export default OrderList