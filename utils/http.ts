
import axios, {
  AxiosError,
  AxiosHeaders,
  AxiosInstance,
  AxiosProgressEvent,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig
} from 'axios';
import * as SecureStore from 'expo-secure-store';
import { API_CONFIG } from '../app/config/index';
import { ApiResponse } from '../app/types';

declare module 'axios' {
  export interface AxiosRequestConfig {
    _retry?: boolean;
  }
}

// Create axios instance with base URL
const apiClient: AxiosInstance = axios.create({
  baseURL: API_CONFIG.API_BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Request interceptor for API calls
apiClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    try {
      // Get token from secure storage
      const userJson = await SecureStore.getItemAsync('user');
      const token = userJson ? JSON.parse(userJson).token : null;

      // Add auth token to headers if it exists
      if (token) {
        config.headers = config.headers || {} as AxiosHeaders;
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor for API calls
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // Handle successful responses
    return response.data;
  },
  async (error: AxiosError) => {
    // Handle errors
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      const { status, data } = error.response as { status: number; data: any };
      let errorMessage = 'An error occurred';
      let errorData: Record<string, any> = {};
      
      // Try to extract error message from response
      if (data) {
        if (typeof data === 'string') {
          errorMessage = data;
        } else if (typeof data === 'object') {
          errorMessage = data.message || errorMessage;
          errorData = data.errors || {};
        }
      }
      
      // Handle 401 Unauthorized (token expired, invalid, etc.)
      if (status === 401) {
        // Clear user data
        try {
          await SecureStore.deleteItemAsync('user');
        } catch (storageError) {
          console.error('Error clearing user data:', storageError);
        }
      }

      // Return error response
      return Promise.reject({
        status,
        message: errorMessage,
        errors: errorData,
      });
    } else if (error.request) {
      // The request was made but no response was received
      return Promise.reject({
        status: 0,
        message: 'No response from server. Please check your connection.',
      });
    } else {
      // Something happened in setting up the request that triggered an Error
      return Promise.reject({
        status: 0,
        message: error.message || 'An error occurred',
      });
    }
  }
);

/**
 * Make a GET request
 */
export const get = async <T>(
  url: string,
  params?: object,
  config?: AxiosRequestConfig
): Promise<ApiResponse<T>> => {
  return apiClient.get(url, { ...config, params });
};

/**
 * Make a POST request
 */
export const post = async <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<ApiResponse<T>> => {
  return apiClient.post(url, data, config);
};

/**
 * Make a PUT request
 */
export const put = async <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<ApiResponse<T>> => {
  return apiClient.put(url, data, config);
};

/**
 * Make a PATCH request
 */
export const patch = async <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<ApiResponse<T>> => {
  return apiClient.patch(url, data, config);
};

/**
 * Make a DELETE request
 */
export const del = async <T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<ApiResponse<T>> => {
  return apiClient.delete(url, config);
};

/**
 * Upload a file
 */
interface UploadProgressEvent {
  loaded: number;
  total?: number;
  progress?: number;
  bytes: number;
  rate?: number;
  estimated?: number;
  upload: boolean;
  download: boolean;
}

export const uploadFile = async <T>(
  url: string,
  file: { uri: string; name?: string; type?: string },
  fieldName: string = 'file',
  data: Record<string, any> = {},
  onUploadProgress?: (progressEvent: UploadProgressEvent) => void
): Promise<ApiResponse<T>> => {
  const formData = new FormData();
  
  // Extract file info
  const fileUri = file.uri;
  const fileName = file.name || fileUri.split('/').pop() || 'file.jpg';
  const fileType = file.type || 'image/jpeg';
  
  // @ts-ignore - FormData type definition doesn't include the correct type for file uploads
  formData.append(fieldName, {
    uri: fileUri,
    type: fileType,
    name: fileName,
  });
  
  // Append additional data
  Object.entries(data).forEach(([key, value]) => {
    formData.append(key, String(value));
  });
  
  const config: AxiosRequestConfig = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };
  
  if (onUploadProgress) {
    config.onUploadProgress = (progressEvent: AxiosProgressEvent) => {
      if (progressEvent.total) {
        const progress = (progressEvent.loaded / progressEvent.total) * 100;
        onUploadProgress({
          loaded: progressEvent.loaded,
          total: progressEvent.total,
          progress,
          bytes: progressEvent.bytes,
          rate: progressEvent.rate,
          estimated: progressEvent.estimated,
          upload: progressEvent.upload || false,
          download: progressEvent.download || false,
        });
      }
    };
  }
  
  return apiClient.post(url, formData, config);
};

export default apiClient;
