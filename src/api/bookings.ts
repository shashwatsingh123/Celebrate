import { apiClient } from './client';

export interface Booking {
    id: string;
    rawId: number;
    event: string;
    vendor: string;
    vendorId: number;
    date: string;
    status: string;
    amount: number;
    location: string;
    canReview: boolean;
}

export async function getCustomerBookings(): Promise<Booking[]> {
    return apiClient('/bookings/customer');
}

export interface VendorOrder {
    id: string;
    rawId: number;
    customer: string;
    event: string;
    date: string;
    amount: number;
    status: string;
    location: string;
}

export async function getVendorOrders(): Promise<VendorOrder[]> {
    return apiClient('/bookings/vendor');
}

export async function updateBookingStatus(id: number, status: string): Promise<{ message: string }> {
    return apiClient(`/bookings/${id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status }),
    });
}
