const Mapping = {
    statusColor: {
        'PENDING': 'rgb(240 235 30)',
        'ACCEPTED': 'rgb(199, 81, 189)',
        'IN-PROCESS': '#1d7cc9',
        'COMPLETED': 'rgb(100 231 45)',
        'CANCELLED': 'rgb(255, 49, 49)',
        'TERMINATED': 'rgb(255 0 0)',
    },
    typeList: [
        'SEDAN',
        'HATCHBACK',
        'CONVERTIBLE',
        'COUPE',
        'MINIVAN',
        'STATION_WAGON',
        'PICK_UP_TRUCK',
        'TRUCK',
        'OFF_ROAD',
        'VAN',
    ],
    genderList: ['GENDER', 'MALE', 'FEMALE', 'OTHER'],
    reportFields: [
        'date',
        'cars',
        'customers',
        'washers',
        'ordersPlaced',
        'revenue',
        'mostPopularPack',
        'mostPopularAddOn',
        'leastPopularPack',
        'leastPopularAddOn',
    ],
    orderActions: [
        {
            actionName: 'Cancel',
            color: 'danger',
            allowedStatus: ['PENDING', 'ACCEPTED'],
            allowedRoles: ['CUSTOMER'],
            modalState: {
                header: 'Cancel Order',
                body: 'Are you sure you want to cancel this order ?',
                task: 'cancelOrder',
            },
        },
        {
            actionName: 'Accept',
            color: 'success',
            allowedStatus: ['PENDING'],
            allowedRoles: ['WASHER'],
            modalState: {
                header: 'Accept Order',
                body: 'Are you sure you want to accept this order ?',
                task: 'acceptOrder',
            },
        },
        {
            actionName: 'Assign',
            color: 'success',
            allowedStatus: ['PENDING'],
            allowedRoles: ['ADMIN'],
            modalState: {
                header: 'Assign Order',
                body: 'Are you sure you want to manually assign this order to a washer of your choice ?',
                task: 'assignOrder',
            },
        },
        {
            actionName: 'Terminate',
            color: 'danger',
            allowedStatus: ['PENDING', 'ACCEPTED'],
            allowedRoles: ['ADMIN'],
            modalState: {
                header: 'Terminate Order',
                body: 'Are you sure you want to terminate this order ?',
                task: 'terminateOrder',
            },
        },
    ],
    userTabs: [
        {
            to: '/user/profile',
            name: 'Profile',
            visible: ['CUSTOMER', 'ADMIN', 'WASHER'],
        },
        {
            to: '/user/cars',
            name: 'Cars',
            visible: ['CUSTOMER'],
        },
        {
            to: '/user/myOrders',
            name: 'Orders',
            visible: ['CUSTOMER'],
        },
        {
            to: '/user/packs',
            name: 'Wash Packs',
            visible: ['ADMIN'],
        },
        {
            to: '/user/addons',
            name: 'Add Ons',
            visible: ['ADMIN'],
        },
        {
            to: '/user/allOrders',
            name: 'Orders',
            visible: ['ADMIN', 'WASHER'],
        },
        {
            to: '/user/report',
            name: 'Analysis',
            visible: ['ADMIN'],
        },
    ],
};

export default Mapping;
