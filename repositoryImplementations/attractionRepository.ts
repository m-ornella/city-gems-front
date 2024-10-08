import type { IAttractionRepository } from "~/repositoryInterfaces/attraction";

export class AttractionRepositoryExpressJs implements IAttractionRepository{
    private apiBaseUrl: string;

    constructor() {
        const runtimeConfig = useRuntimeConfig();
        this.apiBaseUrl = runtimeConfig.public.apiBaseUrl;
    }

    async createAttraction(data: FormData, refreshToken: string): Promise<any> {
        try {

            const response = await $fetch(`${this.apiBaseUrl}/attractions`, {
                method: 'POST',
                body: data,
                headers: {
                    Authorization: `Bearer ${refreshToken}`,
                  },
            });
            return response;
        } catch (error) {
            console.error('Failed to create attraction:', error);
            throw new Error('Failed to create attraction');
        }
    }
 
    async getAttractions(refreshToken: string): Promise<any> {
        try {
            const response = await $fetch(`${this.apiBaseUrl}/attractions`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${refreshToken}`
                }
            });
            if (response && Array.isArray(response)) {
                response.forEach((attraction: any) => {
                    if (attraction.images && Array.isArray(attraction.images)) {
                        attraction.images.forEach((image: any) => {
                            if (image.url) {
                                const url = new URL(image.url, this.apiBaseUrl);
                                console.log(`Image URL: ${url.href}`);
                            }
                        });
                    }
                });
            }
    
            return response;
        } catch (error) {
            console.error('Failed to fetch attractions:', error);
            throw new Error('Failed to fetch attractions');
        }
    }
    

    async getAttractionById(id: number): Promise<any> {
        try {
            const response = await $fetch(`${this.apiBaseUrl}/attractions/${id}`, {
                method: 'GET',
            });
            return response;
        } catch (error) {
            console.error(`Failed to fetch attraction with id ${id}:`, error);
            throw new Error('Failed to fetch attraction');
        }
    }

}