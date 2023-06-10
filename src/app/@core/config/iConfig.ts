const SERVER_MAIN = "http://192.168.38.123/api/"
const orders = "orders/"
const warehouses = "warehouses/"
const employees = "employees/"
const serviceShippings = "serviceshippings/"
const shipments = "shipments/"
const orderDetails = "orderdetails/"
const shippers = "shippers/"
export const URLs = {
    ORDER:{
        ADD: SERVER_MAIN + orders + "add/",
        GET_ALL_ORDERDETAIL: SERVER_MAIN + orderDetails,
        GET_ALL_ORDERDETAIL_BY_STATUS: SERVER_MAIN + orderDetails + "status",
        GET_MANY_ORDERDETAIL: SERVER_MAIN + orderDetails + "many",
        GET_ORDERDETAIL_BY_ID: SERVER_MAIN + orderDetails + "orderdetail/?orderDetailId=",
        
    },
    SHIPMENT:{
        ADD: SERVER_MAIN + shipments + "add",
        GET_ALL: SERVER_MAIN + shipments,
        GET_BY_ID: SERVER_MAIN + shipments + "shipmentdetail/?shipmentId="
    },
    WAREHOUSE: {
        ADD: SERVER_MAIN + warehouses + "add",
        GET_ALL: SERVER_MAIN + warehouses,
        DELETE: SERVER_MAIN + warehouses + "delete"
    },
    SHIPPER: {
        ADD: SERVER_MAIN + shippers + "add",
        GET_ALL: SERVER_MAIN + shippers,
        DELETE: SERVER_MAIN + shippers + "delete"
    },
    SERVICESHIPPING: {
        ADD: SERVER_MAIN + serviceShippings + "add",
        GET_ALL: SERVER_MAIN + serviceShippings,
        DELETE: SERVER_MAIN + serviceShippings + "delete"
    },
    EMPLOYEE:{
        ADD: SERVER_MAIN + employees + "add",
        GET_ALL: SERVER_MAIN + employees,
        DELETE: SERVER_MAIN + employees + "delete"
    }


}