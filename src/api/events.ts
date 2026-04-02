import { apiClient } from './client';

export async function createEvent(data: {
    eventType: string;
    eventDate: string;
    guestCount: string;
    budget: string;
    address: string;
    city: string;
    pincode: string;
    services: string[];
    specialRequests: string;
}): Promise<{ id: number; message: string }> {
    return apiClient('/events', {
        method: 'POST',
        body: JSON.stringify(data),
    });
}

export async function getMyEvents(): Promise<any[]> {
    return apiClient('/events/my');
}
