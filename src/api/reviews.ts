import { apiClient } from './client';

export async function createReview(data: {
    bookingId: number;
    vendorId: number;
    rating: number;
    comment: string;
}): Promise<{ id: number; message: string }> {
    return apiClient('/reviews', {
        method: 'POST',
        body: JSON.stringify(data),
    });
}

export async function getCustomerReviews(): Promise<any[]> {
    return apiClient('/reviews/customer');
}

export async function getVendorReviews(): Promise<any[]> {
    return apiClient('/reviews/vendor');
}
