import { apiClient } from './client';

export async function getVendorProfile(): Promise<any> {
    return apiClient('/vendors/profile');
}

export async function toggleAvailability(): Promise<{ available: boolean }> {
    return apiClient('/vendors/availability', { method: 'PATCH' });
}

export async function updateWorkingHours(workStart: string, workEnd: string): Promise<any> {
    return apiClient('/vendors/hours', {
        method: 'PATCH',
        body: JSON.stringify({ workStart, workEnd }),
    });
}

export async function addBlockedDate(date: string): Promise<any> {
    return apiClient('/vendors/blocked-dates', {
        method: 'POST',
        body: JSON.stringify({ date }),
    });
}

export async function getBlockedDates(): Promise<any[]> {
    return apiClient('/vendors/blocked-dates');
}

export async function getVendorStats(): Promise<{
    totalBookings: number;
    thisMonth: number;
    totalRevenue: number;
    avgRating: number;
}> {
    return apiClient('/vendors/stats');
}
